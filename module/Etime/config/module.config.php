<?php

declare(strict_types=1);

namespace Etime;

use Laminas\Router\Http\Literal;

return [

    'router' => [
        'routes' => [
            'etime' => [
                'type' => Literal::class,
                'options' => [
                    'route' => '/etime',
                    'defaults' => [
                        'controller' => Controller\IndexController::class,
                        'action' => 'index',
                    ],
                ],
            ],
        ],
    ],

    'controllers' => [
        'factories' => [
            Controller\IndexController::class => function($container) {
                return new Controller\IndexController();
            },
        ],
    ],

    'view_manager' => [
        'template_path_stack' => [
            __DIR__ . '/../view',
        ],
    ],

];