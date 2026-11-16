<?php

namespace App\EventListener;

use Symfony\Component\EventDispatcher\Attribute\AsEventListener;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

/** Ajoute les en-têtes de sécurité standard à toutes les réponses de l'API. */
#[AsEventListener(event: KernelEvents::RESPONSE, priority: -10)]
class SecurityHeadersListener
{
    public function onKernelResponse(ResponseEvent $event): void
    {
        if (!$event->isMainRequest()) return;

        $headers = $event->getResponse()->headers;
        $headers->set('X-Content-Type-Options', 'nosniff');
        $headers->set('X-Frame-Options', 'DENY');
        $headers->set('Referrer-Policy', 'no-referrer');
        $headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
        $headers->set('Cross-Origin-Resource-Policy', 'cross-origin'); // l'API est lue depuis le front (autre port)
        $headers->set('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'");

        if ($event->getRequest()->isSecure()) {
            $headers->set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        }
        if (!$headers->has('Cache-Control') || $headers->get('Cache-Control') === 'no-cache, private') {
            // Les réponses JSON ne doivent pas être mises en cache par un proxy partagé.
            $headers->set('Cache-Control', 'no-store');
        }
        $headers->remove('X-Powered-By');
    }
}
