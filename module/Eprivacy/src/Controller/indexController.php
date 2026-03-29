<?php

declare(strict_types=1);

namespace Eprivacy\Controller;

use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        // Obtener el módulo activo desde las variables de entorno
        $activeModule = $_ENV['APP_MODULE_TO_LOAD'] ?? 'Application';
        
        // Si es Eprivacy (MiApp1), mostrar su contenido normal
        if ($activeModule === 'MiApp1') {
            return new ViewModel();
        }
        
        // Para otros módulos, cargar su vista directamente sin redirigir
        $moduleViews = [
            'MiApp1' => 'eprivacy/index/index',  // Eprivacy
            'MiApp2' => 'etime/index/index',     // Etime
            'MiApp3' => 'core/index/index',      // Core
            'Application' => 'application/index/index',
        ];
        
        $template = $moduleViews[$activeModule] ?? 'eprivacy/index/index';
        
        // Crear ViewModel con la plantilla del módulo activo
        $viewModel = new ViewModel();
        $viewModel->setTemplate($template);
        
        return $viewModel;
    }
}