<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Attribute\Route;

class AdminController extends AbstractController
{
    /** Vérifie un jeton admin (l'accès est contrôlé par AdminAuthListener). */
    #[Route('/api/admin/check', name: 'api_admin_check', methods: ['GET'])]
    public function check(): JsonResponse
    {
        return new JsonResponse(['ok' => true]);
    }
}
