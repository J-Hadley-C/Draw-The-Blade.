<?php

use App\Kernel;

// Ne pas révéler la version de PHP.
header_remove('X-Powered-By');

require_once dirname(__DIR__).'/vendor/autoload_runtime.php';

return static function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
