<?php

declare(strict_types=1);

namespace Auth\Controller;

use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;
use Laminas\Http\Request;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        $this->layout('layout/empty');

        $request = $this->getRequest();

        if ($request instanceof Request && $request->isPost()) {

            $data = $request->getPost();

            $email = $data['email'] ?? '';
            $password = $data['password'] ?? '';

            // 🔹 Llamada a tu API
            $apiUrl = "http://localhost:8080/auth/login";

            $payload = json_encode([
                "email" => $email,
                "password" => $password
            ]);

            $ch = curl_init($apiUrl);

            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, [
                'Content-Type: application/json'
            ]);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);

            $response = curl_exec($ch);

            curl_close($ch);

            $result = json_decode($response, true);

            // 🔥 Si la API devuelve token
            if (!empty($result['token'])) {

                $_SESSION['token'] = $result['token'];
                $_SESSION['user'] = $email;

                return $this->redirect()->toUrl('/etime');
            }

            return new ViewModel([
                'error' => 'Login incorrecto'
            ]);
        }

        return new ViewModel();
    }

    public function logoutAction()
    {
        session_destroy();
        unset($_SESSION['token']);
        unset($_SESSION['user']);

        return $this->redirect()->toUrl('/login');
    }
}
