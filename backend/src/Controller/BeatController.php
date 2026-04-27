<?php

namespace App\Controller;

use App\Entity\Beat;
use App\Repository\BeatRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/beats', name: 'api_beats_')]
class BeatController extends AbstractController
{
    public function __construct(
        private BeatRepository $beatRepository,
        private EntityManagerInterface $em,
        private SerializerInterface $serializer,
        private string $uploadsDir,
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(Request $request): Response
    {
        $carousel = $request->query->getBoolean('carousel', false);
        $genre    = $request->query->get('genre');

        $beats = match(true) {
            $carousel      => $this->beatRepository->findCarouselBeats(),
            $genre !== null => $this->beatRepository->findByGenre($genre),
            default        => $this->beatRepository->findAllOrdered(),
        };

        $json = $this->serializer->serialize($beats, 'json', ['groups' => 'beat:read']);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/reorder', name: 'reorder', methods: ['POST', 'PATCH'])]
    public function reorder(Request $request): Response
    {
        $data = json_decode($request->getContent(), true) ?? [];
        foreach ($data as $item) {
            $beat = $this->beatRepository->find($item['id']);
            if ($beat) {
                $beat->setPosition((int) $item['position']);
            }
        }
        $this->em->flush();
        return new Response(null, 204);
    }

    #[Route('/{id}', name: 'show', methods: ['GET'], requirements: ['id' => '\d+'])]
    public function show(Beat $beat): Response
    {
        $json = $this->serializer->serialize($beat, 'json', ['groups' => 'beat:read']);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $beat = new Beat();

        // Nouveau beat en première position
        $minPos = $this->beatRepository->getMinPosition();
        $beat->setPosition($minPos - 1);

        $this->hydrate($beat, $request);
        $this->handleUploads($beat, $request);

        $this->em->persist($beat);
        $this->em->flush();

        $json = $this->serializer->serialize($beat, 'json', ['groups' => 'beat:read']);
        return new Response($json, 201, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}', name: 'update', methods: ['PUT', 'PATCH', 'POST'], requirements: ['id' => '\d+'])]
    public function update(Beat $beat, Request $request): Response
    {
        $this->hydrate($beat, $request);
        $this->handleUploads($beat, $request);
        $this->em->flush();

        $json = $this->serializer->serialize($beat, 'json', ['groups' => 'beat:read']);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(Beat $beat): Response
    {
        foreach ([$beat->getImagePath(), $beat->getAudioPath()] as $file) {
            if ($file && file_exists($this->uploadsDir . '/' . $file)) {
                unlink($this->uploadsDir . '/' . $file);
            }
        }
        $this->em->remove($beat);
        $this->em->flush();
        return new Response(null, 204);
    }

    private function hydrate(Beat $beat, Request $request): void
    {
        if (str_contains($request->headers->get('Content-Type', ''), 'application/json')) {
            $data = json_decode($request->getContent(), true) ?? [];
        } else {
            $data = $request->request->all();
        }

        if (isset($data['title']))       $beat->setTitle($data['title']);
        if (isset($data['genre']))       $beat->setGenre($data['genre']);
        if (isset($data['bpm']))         $beat->setBpm((int) $data['bpm']);
        if (isset($data['key']))         $beat->setKeySignature($data['key']);
        if (isset($data['duration']))    $beat->setDuration($data['duration']);
        if (isset($data['description'])) $beat->setDescription($data['description']);
        if (isset($data['price']))       $beat->setPrice($data['price']);
        if (isset($data['isFree']))      $beat->setIsFree(filter_var($data['isFree'], FILTER_VALIDATE_BOOLEAN));
        if (isset($data['inCarousel']))  $beat->setInCarousel(filter_var($data['inCarousel'], FILTER_VALIDATE_BOOLEAN));
        if (isset($data['position']))    $beat->setPosition((int) $data['position']);
    }

    private function handleUploads(Beat $beat, Request $request): void
    {
        if (!is_dir($this->uploadsDir)) {
            mkdir($this->uploadsDir, 0775, true);
        }

        $coverFile = $request->files->get('coverImage');
        if ($coverFile) {
            if ($beat->getImagePath() && !preg_match('/^\d+\.(png|jpg|jpeg)$/', $beat->getImagePath())) {
                @unlink($this->uploadsDir . '/' . $beat->getImagePath());
            }
            $ext      = $coverFile->guessExtension() ?: 'jpg';
            $filename = 'cover_' . uniqid() . '.' . $ext;
            $coverFile->move($this->uploadsDir, $filename);
            $beat->setImagePath($filename);
        }

        $audioFile = $request->files->get('audioFile');
        if ($audioFile) {
            if ($beat->getAudioPath()) {
                @unlink($this->uploadsDir . '/' . $beat->getAudioPath());
            }
            $ext      = $audioFile->guessExtension() ?: 'mp3';
            $filename = 'audio_' . uniqid() . '.' . $ext;
            $audioFile->move($this->uploadsDir, $filename);
            $beat->setAudioPath($filename);
        }
    }
}
