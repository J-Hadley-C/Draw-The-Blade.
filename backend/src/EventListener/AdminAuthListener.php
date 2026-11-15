<?php

namespace App\EventListener;

use Psr\Cache\CacheItemPoolInterface;
use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Event\RequestEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/**
 * Protège les routes d'administration par un jeton (en-tête X-Admin-Token).
 *
 * - Échoue en mode fermé : jeton absent, trop court ou « placeholder » => tout est refusé.
 * - Anti force brute : après MAX_FAILURES échecs depuis une même IP, l'IP est bloquée
 *   pendant LOCK_SECONDS, même si elle présente ensuite le bon jeton.
 */
#[AsEventListener(event: KernelEvents::REQUEST, priority: 10)]
class AdminAuthListener
{
    private const MIN_TOKEN_LENGTH = 32;
    private const MAX_FAILURES     = 8;
    private const LOCK_SECONDS     = 900;

    private const PROTECTED_ROUTES = [
        'api_beats_create',
        'api_beats_update',
        'api_beats_delete',
        'api_beats_reorder',
        'api_messages_list',
        'api_messages_mark_read',
        'api_messages_delete',
        'api_admin_check',
    ];

    public function __construct(
        private string $adminToken,
        private CacheItemPoolInterface $cache,
    ) {}

    public function onKernelRequest(RequestEvent $event): void
    {
        if (!$event->isMainRequest()) return;

        $request = $event->getRequest();
        if ($request->isMethod('OPTIONS')) return; // pré-vol CORS

        if (!in_array($request->attributes->get('_route'), self::PROTECTED_ROUTES, true)) return;

        if (!$this->isTokenConfigured()) {
            $event->setResponse(new JsonResponse(['error' => 'Administration non configurée'], 503));
            return;
        }

        $item = $this->cache->getItem('admin_fail_' . hash('sha256', (string) $request->getClientIp()));
        $failures = (int) ($item->isHit() ? $item->get() : 0);

        if ($failures >= self::MAX_FAILURES) {
            $event->setResponse(new JsonResponse(['error' => 'Trop de tentatives'], 429, ['Retry-After' => (string) self::LOCK_SECONDS]));
            return;
        }

        $token = (string) $request->headers->get('X-Admin-Token', '');
        if ($token === '' || !hash_equals($this->adminToken, $token)) {
            $item->set($failures + 1)->expiresAfter(self::LOCK_SECONDS);
            $this->cache->save($item);
            $event->setResponse(new JsonResponse(['error' => 'Non autorisé'], 401));
            return;
        }

        if ($failures > 0) {
            $this->cache->deleteItem($item->getKey());
        }
    }

    private function isTokenConfigured(): bool
    {
        return strlen($this->adminToken) >= self::MIN_TOKEN_LENGTH
            && !in_array(strtoupper($this->adminToken), ['CHANGE_ME', 'CHANGEME'], true);
    }
}
