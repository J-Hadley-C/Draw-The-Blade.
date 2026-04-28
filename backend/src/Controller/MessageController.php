<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;

#[Route('/api/messages', name: 'api_messages_')]
class MessageController extends AbstractController
{
    public function __construct(
        private MessageRepository $repo,
        private EntityManagerInterface $em,
        private SerializerInterface $serializer,
    ) {}

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): Response
    {
        $messages = $this->repo->findAllOrderedByDate();
        $json = $this->serializer->serialize($messages, 'json', ['groups' => 'message:read']);
        return new Response($json, 200, ['Content-Type' => 'application/json']);
    }

    #[Route('', name: 'create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $data = json_decode($request->getContent(), true) ?? [];

        if (empty($data['name']) || empty($data['email']) || empty($data['subject']) || empty($data['body'])) {
            return new Response(json_encode(['error' => 'Champs manquants']), 400, ['Content-Type' => 'application/json']);
        }

        $message = (new Message())
            ->setName(trim($data['name']))
            ->setEmail(trim($data['email']))
            ->setSubject(trim($data['subject']))
            ->setBody(trim($data['body']));

        $this->em->persist($message);
        $this->em->flush();

        $json = $this->serializer->serialize($message, 'json', ['groups' => 'message:read']);
        return new Response($json, 201, ['Content-Type' => 'application/json']);
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
