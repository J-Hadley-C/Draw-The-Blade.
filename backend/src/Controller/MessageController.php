<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/messages', name: 'api_messages_')]
class MessageController extends AbstractController
{
    public function __construct(
        private MessageRepository $repo,
        private EntityManagerInterface $em,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator,
        private RateLimiterFactory $contactFormLimiter,
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): Response
    {
        return new Response(
            $this->serializer->serialize($this->repo->findAllOrderedByDate(), 'json', ['groups' => 'message:read']),
            200,
            ['Content-Type' => 'application/json'],
        );
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $limit = $this->contactFormLimiter->create((string) $request->getClientIp())->consume();
        if (!$limit->isAccepted()) {
            return new JsonResponse(
                ['error' => 'Trop de messages envoyés. Réessaie plus tard.'],
                429,
                ['Retry-After' => (string) max(1, $limit->getRetryAfter()->getTimestamp() - time())],
            );
        }

        try {
            $data = json_decode($request->getContent(), true, 8, JSON_THROW_ON_ERROR);
        } catch (\JsonException) {
            return new JsonResponse(['error' => 'JSON invalide'], 400);
        }
        if (!is_array($data)) {
            return new JsonResponse(['error' => 'Format invalide'], 400);
        }

        // Champ piège : invisible pour un humain, rempli par les robots. On répond « succès » sans rien enregistrer.
        if (!empty($data['website'])) {
            return new JsonResponse(['ok' => true], 201);
        }

        $field = static fn(string $k): string => isset($data[$k]) && is_string($data[$k])
            ? trim(preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $data[$k]) ?? '')
            : '';

        $message = (new Message())
            ->setName($field('name'))
            ->setEmail($field('email'))
            ->setSubject($field('subject'))
            ->setBody($field('body'));

        $violations = $this->validator->validate($message);
        if (count($violations) > 0) {
            $errors = [];
            foreach ($violations as $v) {
                $errors[$v->getPropertyPath()] = $v->getMessage();
            }
            return new JsonResponse(['error' => 'Données invalides', 'details' => $errors], 422);
        }

        $this->em->persist($message);
        $this->em->flush();

        // Simple accusé de réception : on ne renvoie pas le message au visiteur.
        return new JsonResponse(['ok' => true], 201);
    }

    #[Route('/{id}/read', name: 'mark_read', methods: ['PATCH'], requirements: ['id' => '\d+'])]
    public function markRead(Message $message): Response
    {
        $message->setIsRead(true);
        $this->em->flush();
        return new Response(null, 204);
    }

    #[Route('/{id}', name: 'delete', methods: ['DELETE'], requirements: ['id' => '\d+'])]
    public function delete(Message $message): Response
    {
        $this->em->remove($message);
        $this->em->flush();
        return new Response(null, 204);
    }
}
