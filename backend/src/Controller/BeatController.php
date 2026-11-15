<?php

namespace App\Controller;

use App\Entity\Beat;
use App\Repository\BeatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\ResponseHeaderBag;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/beats', name: 'api_beats_')]
class BeatController extends AbstractController
{
    private const IMAGE_TYPES = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
    private const AUDIO_TYPES = ['audio/mpeg' => 'mp3', 'audio/wav' => 'wav', 'audio/x-wav' => 'wav', 'audio/ogg' => 'ogg'];
    private const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
    private const MAX_AUDIO_BYTES = 40 * 1024 * 1024;
    private const MAX_REORDER_ITEMS = 500;

    public function __construct(
        private BeatRepository $beatRepository,
        private EntityManagerInterface $em,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
        private RateLimiterFactory $beatLikeLimiter,
        private RateLimiterFactory $beatPlayLimiter,
        private string $uploadsDir,
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): Response
    {
        $carousel = $request->query->getBoolean('carousel', false);
        $genre    = $request->query->get('genre');

        $beats = match(true) {
            $carousel                          => $this->beatRepository->findCarouselBeats(),
            is_string($genre) && $genre !== '' => $this->beatRepository->findByGenre($genre),
            default                            => $this->beatRepository->findAllOrdered(),
        };

        return $this->serialized($beats);
    }

    #[Route('/reorder', name: 'reorder', methods: ['POST', 'PATCH'])]
    public function reorder(Request $request): Response
    {
        $data = $this->jsonBody($request);

        if (!is_array($data) || !array_is_list($data) || count($data) > self::MAX_REORDER_ITEMS) {
            return $this->error('Format invalide', 400);
        }

        foreach ($data as $item) {
            if (!is_array($item) || !isset($item['id'], $item['position'])) continue;
            if (!is_int($item['id']) && !(is_string($item['id']) && ctype_digit($item['id']))) continue;
            if (!is_numeric($item['position'])) continue;

            $beat = $this->beatRepository->find((int) $item['id']);
            if ($beat) {
                $beat->setPosition(max(0, (int) $item['position']));
            }
        }
        $this->em->flush();
        return new Response(null, 204);
    }

    #[Route('/{id}/play', name: 'play', methods: ['POST'], requirements: ['id' => '\d+'])]
    public function incrementPlay(Beat $beat, Request $request): Response
    {
        // Une écoute comptée par IP, par beat et par tranche de 30 minutes.
        $limit = $this->beatPlayLimiter->create($request->getClientIp() . ':' . $beat->getId())->consume();
        if ($limit->isAccepted()) {
            $beat->setPlayCount($beat->getPlayCount() + 1);
            $this->em->flush();
        }
        return new JsonResponse(['playCount' => $beat->getPlayCount()]);
    }

    #[Route('/{id}/like', name: 'like', methods: ['POST'], requirements: ['id' => '\d+'])]
    public function like(Beat $beat, Request $request): Response
    {
        $data = $this->jsonBody($request);
        $type = is_array($data) && ($data['type'] ?? 'up') === 'down' ? 'down' : 'up';

        // Un seul vote par IP et par beat, par jour.
        $limit   = $this->beatLikeLimiter->create($request->getClientIp() . ':' . $beat->getId())->consume();
        $counted = $limit->isAccepted();
        if ($counted) {
            $type === 'down'
                ? $beat->setLikesDown($beat->getLikesDown() + 1)
                : $beat->setLikesUp($beat->getLikesUp() + 1);
            $this->em->flush();
        }

        return new JsonResponse([
            'likesUp'      => $beat->getLikesUp(),
            'likesDown'    => $beat->getLikesDown(),
            'alreadyVoted' => !$counted,
        ]);
    }

    #[Route('/{id}/stream', name: 'stream', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function streamAudio(Beat $beat): Response
    {
        $name = $beat->getAudioPath() ? basename($beat->getAudioPath()) : null;
        if (!$name) {
            return new Response('Audio non disponible', 404);
        }

        $path = $this->uploadsDir . '/' . $name;
        if (!is_file($path)) {
            return new Response('Fichier introuvable', 404);
        }

        // BinaryFileResponse gère les requêtes Range (lecture / avance rapide).
        $response = new BinaryFileResponse($path);
        $mime = array_search(strtolower(pathinfo($name, PATHINFO_EXTENSION)), self::AUDIO_TYPES, true) ?: 'audio/mpeg';
        $response->headers->set('Content-Type', $mime);
        $response->setContentDisposition(ResponseHeaderBag::DISPOSITION_INLINE, $name);

        return $response;
    }

    #[Route('/{id}', name: 'show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(Beat $beat): Response
    {
        return $this->serialized($beat);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $beat = new Beat();
        $beat->setPosition($this->beatRepository->getMinPosition() - 1);
        $beat->setDescription('');
        $beat->setDuration('0:00');

        $this->hydrate($beat, $request);

        if ($errors = $this->validationErrors($beat)) {
            return $this->error('Données invalides', 422, $errors);
        }
        if ($uploadError = $this->handleUploads($beat, $request)) {
            return $this->error($uploadError, 422);
        }

        $this->em->persist($beat);
        $this->em->flush();

        return $this->serialized($beat, 201);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH', 'POST'], requirements: ['id' => '\d+'])]
    public function update(Beat $beat, Request $request): Response
    {
        $this->hydrate($beat, $request);

        if ($errors = $this->validationErrors($beat)) {
            $this->em->refresh($beat);
            return $this->error('Données invalides', 422, $errors);
        }
        if ($uploadError = $this->handleUploads($beat, $request)) {
            $this->em->refresh($beat);
            return $this->error($uploadError, 422);
        }

        $this->em->flush();
        return $this->serialized($beat);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(Beat $beat): Response
    {
        foreach ([$beat->getImagePath(), $beat->getAudioPath()] as $file) {
            $this->removeUpload($file);
        }
        $this->em->remove($beat);
        $this->em->flush();
        return new Response(null, 204);
    }

    // ───────────────────────── helpers ─────────────────────────

    private function hydrate(Beat $beat, Request $request): void
    {
        $data = str_contains((string) $request->headers->get('Content-Type', ''), 'application/json')
            ? $this->jsonBody($request)
            : $request->request->all();
        if (!is_array($data)) return;

        // Seuls les scalaires sont acceptés (un tableau provoquerait une erreur 500).
        $text = static fn(string $k): ?string => isset($data[$k]) && is_scalar($data[$k]) ? trim((string) $data[$k]) : null;

        if (($v = $text('title'))       !== null) $beat->setTitle($v);
        if (($v = $text('genre'))       !== null) $beat->setGenre($v);
        if (($v = $text('key'))         !== null) $beat->setKeySignature($v);
        if (($v = $text('duration'))    !== null) $beat->setDuration($v);
        if (($v = $text('description')) !== null) $beat->setDescription($v);
        if (($v = $text('price'))       !== null) $beat->setPrice($v);
        if (($v = $text('bpm'))         !== null) $beat->setBpm((int) $v);
        if (($v = $text('position'))    !== null) $beat->setPosition(max(0, (int) $v));
        if (isset($data['isFree']))     $beat->setIsFree(filter_var($data['isFree'], FILTER_VALIDATE_BOOLEAN));
        if (isset($data['inCarousel'])) $beat->setInCarousel(filter_var($data['inCarousel'], FILTER_VALIDATE_BOOLEAN));
    }

    /** @return array<string,string>|null */
    private function validationErrors(Beat $beat): ?array
    {
        $violations = $this->validator->validate($beat);
        if (count($violations) === 0) return null;

        $errors = [];
        foreach ($violations as $v) {
            $errors[$v->getPropertyPath()] = $v->getMessage();
        }
        return $errors;
    }

    /** Retourne un message d'erreur, ou null si tout est bon. */
    private function handleUploads(Beat $beat, Request $request): ?string
    {
        $cover = $request->files->get('coverImage');
        $audio = $request->files->get('audioFile');

        // 1) Tout valider avant d'écrire quoi que ce soit.
        $coverExt = $cover ? $this->checkUpload($cover, self::IMAGE_TYPES, self::MAX_IMAGE_BYTES, 'Image') : null;
        $audioExt = $audio ? $this->checkUpload($audio, self::AUDIO_TYPES, self::MAX_AUDIO_BYTES, 'Audio') : null;
        foreach ([$coverExt, $audioExt] as $result) {
            if ($result !== null && str_starts_with($result, '!')) return substr($result, 1);
        }

        if (!is_dir($this->uploadsDir) && !mkdir($this->uploadsDir, 0775, true) && !is_dir($this->uploadsDir)) {
            return 'Dossier de dépôt indisponible';
        }

        // 2) Écrire avec des noms aléatoires (jamais le nom fourni par le client).
        if ($cover && $coverExt) {
            $this->removeUpload($beat->getImagePath());
            $name = 'cover_' . bin2hex(random_bytes(12)) . '.' . $coverExt;
            $cover->move($this->uploadsDir, $name);
            $beat->setImagePath($name);
        }
        if ($audio && $audioExt) {
            $this->removeUpload($beat->getAudioPath());
            $name = 'audio_' . bin2hex(random_bytes(12)) . '.' . $audioExt;
            $audio->move($this->uploadsDir, $name);
            $beat->setAudioPath($name);
        }

        return null;
    }

    /** Retourne l'extension sûre, ou "!message" si le fichier est refusé. */
    private function checkUpload(mixed $file, array $allowed, int $maxBytes, string $label): string
    {
        if (!$file instanceof UploadedFile || !$file->isValid()) {
            return "!$label : envoi échoué";
        }
        if ($file->getSize() > $maxBytes) {
            return sprintf('!%s : fichier trop lourd (%d Mo max)', $label, $maxBytes / 1048576);
        }
        // Type réel déterminé par le contenu (finfo), pas par l'en-tête envoyé par le client.
        $mime = $file->getMimeType();
        if (!isset($allowed[$mime])) {
            return "!$label : format non autorisé";
        }
        return $allowed[$mime];
    }

    private function removeUpload(?string $file): void
    {
        if (!$file) return;
        // basename() : empêche toute sortie du dossier de dépôt. Les images d'exemple n'y sont pas, elles ne sont donc jamais supprimées.
        $path = $this->uploadsDir . '/' . basename($file);
        if (is_file($path)) {
            @unlink($path);
        }
    }

    private function jsonBody(Request $request): mixed
    {
        $content = $request->getContent();
        if ($content === '') return [];
        try {
            return json_decode($content, true, 16, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            return null;
        }
    }

    private function serialized(mixed $data, int $status = 200): Response
    {
        return new Response(
            $this->serializer->serialize($data, 'json', ['groups' => 'beat:read']),
            $status,
            ['Content-Type' => 'application/json'],
        );
    }

    private function error(string $message, int $status, array $details = []): JsonResponse
    {
        return new JsonResponse(['error' => $message] + ($details ? ['details' => $details] : []), $status);
    }
}
