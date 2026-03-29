<?php

declare(strict_types=1);

namespace Application\Controller;

use Laminas\Mvc\Controller\AbstractActionController;
use Laminas\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        // Obtener el módulo activo desde las variables de entorno
        $activeModule = $_ENV['APP_MODULE_TO_LOAD'] ?? 'Application';
        
        // Si es Application, mostrar su contenido normal
        if ($activeModule === 'Application') {
            return new ViewModel();
        }
        
        // Para otros módulos, cargar su vista directamente sin redirigir
        $moduleViews = [
            'MiApp1' => 'eprivacy/index/index',  // Eprivacy
            'MiApp2' => 'etime/index/index',     // Etime
            'MiApp3' => 'core/index/index',      // Core
        ];
        
        $template = $moduleViews[$activeModule] ?? 'application/index/index';
        
        // Crear ViewModel con la plantilla del módulo activo
        $viewModel = new ViewModel();
        $viewModel->setTemplate($template);
        
        return $viewModel;
    }
}
