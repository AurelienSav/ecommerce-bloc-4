<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        // Middleware global pour les requêtes frontend sécurisées (Sanctum)
        $middleware->prependToGroup('web', \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class);

        // Alias de middlewares pour les routes (authentification, vérification d’email)
        $middleware->alias([
            'auth' => \App\Http\Middleware\Authenticate::class,
            'auth:sanctum' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);
        
        $middleware->prependToGroup('web', \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Ici tu pourras gérer les rapports et logs si besoin
    })
    ->create();