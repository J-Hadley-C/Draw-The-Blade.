<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

#[AsEventListener(event: KernelEvents::REQUEST, priority: 10)]
class AdminAuthListener
{
    private array $protectedRoutes = [
        'api_beats_create',
        'api_beats_update',
        'api_beats_delete',
        'api_beats_reorder',
        'api_messages_list',
        'api_messages_mark_read',
        'api_messages_delete',
    ];

    public function __construct(private string $adminToken) {}

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) return;

        $request = $event->getRequest();
        $route   = $request->attributes->get('_route');

        if (!in_array($route, $this->protectedRoutes, true)) return;

        $token = $request->headers->get('X-Admin-Token');
        if (!$token || !hash_equals($this->adminToken, $token)) {
            $event->setResponse(new JsonResponse(['error' => 'Non autorisé'], 401));
        }
    }
}
