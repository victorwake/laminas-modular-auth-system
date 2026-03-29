<?php

declare(strict_types=1);

use Laminas\Mvc\Application;
use Laminas\Stdlib\ArrayUtils;
session_start();

/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
chdir(dirname(__DIR__));

// Decline static file requests back to the PHP built-in webserver
if (php_sapi_name() === 'cli-server') {
    $path = realpath(__DIR__ . parse_url($_SERVER['REQUEST_URI'] ?? '', PHP_URL_PATH));
    if (is_string($path) && __FILE__ !== $path && is_file($path)) {
        return false;
    }
    unset($path);
}

// Composer autoloading
include __DIR__ . '/../vendor/autoload.php';

if (! class_exists(Application::class)) {
    throw new RuntimeException(
        "Unable to load application.\n"
        . "- Type `composer install` if you are developing locally.\n"
        . "- Type `docker-compose run laminas composer install` if you are using Docker.\n"
    );
}

$container = require __DIR__ . '/../config/container.php';

// --- INICIO DE CAMBIO: Cargar .env ---
// Cargamos las variables de entorno antes de iniciar la aplicación
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->safeLoad();

if (isset($_GET['set_module']) && is_string($_GET['set_module']) && $_GET['set_module'] !== '') {
    $requestedModule = preg_replace('/[^a-zA-Z0-9_]/', '', $_GET['set_module']);
    if ($requestedModule !== '') {
        setcookie('active_module', $requestedModule, [
            'expires' => time() + 60 * 60 * 24 * 30,
            'path' => '/',
            'samesite' => 'Lax',
        ]);

        $uri = $_SERVER['REQUEST_URI'] ?? '/';
        $path = parse_url($uri, PHP_URL_PATH) ?: '/';
        header('Location: ' . $path);
        exit;
    }
}

$activeModule = $_COOKIE['active_module'] ?? ($_ENV['APP_MODULE_TO_LOAD'] ?? 'Application');
$_ENV['APP_MODULE_TO_LOAD'] = $activeModule;

$apiBase = rtrim($_ENV['APP_MODULE_API_BASE'] ?? 'http://localhost:3000', '/');
$apiPath = $_ENV['APP_MODULE_API_PATH'] ?? '/api';
$apiModule = strtolower($activeModule);
$apiUrl = $apiBase . rtrim($apiPath, '/') . '/' . $apiModule;

$menuJson = null;

if (function_exists('curl_init')) {
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT_MS, 700);
    curl_setopt($ch, CURLOPT_TIMEOUT_MS, 1500);
    $responseBody = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if (is_string($responseBody) && $httpCode >= 200 && $httpCode < 300) {
        $menuJson = $responseBody;
    }
} else {
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'timeout' => 1.5,
        ],
    ]);

    $responseBody = @file_get_contents($apiUrl, false, $context);
    if (is_string($responseBody)) {
        $menuJson = $responseBody;
    }
}

if (is_string($menuJson) && $menuJson !== '') {
    $_ENV['APP_MENU_JSON'] = $menuJson;
}

if (! class_exists(Application::class)) {
    throw new RuntimeException(
        "Unable to load application.\n"
        . "- Type `composer install` if you are developing locally.\n"
        . "- Type `vagrant ssh -c 'composer install'` if you are using Vagrant.\n"
        . "- Type `docker-compose run laminas composer install` if you are using Docker.\n"
    );
}

// Retrieve configuration
$appConfig = require __DIR__ . '/../config/application.config.php';
if (file_exists(__DIR__ . '/../config/development.config.php')) {
    $appConfig = ArrayUtils::merge($appConfig, require __DIR__ . '/../config/development.config.php');
}

// Run the application!
/** @var Application $app */
$app = $container->get('Application');
$app->run();
