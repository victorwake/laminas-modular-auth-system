<?php

declare(strict_types=1);

namespace Core\Controller;

use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        // Layout vacío (pantalla inicial)
        $this->layout('layout/empty');

        // 👇 Simulación (después esto va con sesión)
        $logged = false;

        if (!$logged) {
            return $this->redirect()->toUrl('/login');
        }

        // 👇 Simulación de módulo
        return $this->redirect()->toUrl('/etime');
    }
}