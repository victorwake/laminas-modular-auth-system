// Script para verificar que el JS se carga correctamente
// document.addEventListener('DOMContentLoaded', function() {
//     console.log('Script cargado correctamente');
//     alert('Hola - Script funcionando');
// });

// const sideMenu = document.getElementById('side-menu');
// const toggleMenuButton = document.getElementById('toggle-menu');
// const topMenu = document.getElementById('top-menu');
// const mainContent = document.getElementById('main-content');

// let isSideMenuOpen = false;

// // Evento para abrir/cerrar el menú lateral
// toggleMenuButton.addEventListener('click', () => {
//     isSideMenuOpen = !isSideMenuOpen;
//     if (isSideMenuOpen) {
//         sideMenu.classList.add('open');
//         topMenu.classList.add('open');
//         mainContent.classList.add('open');
//     } else {
//         sideMenu.classList.remove('open');
//         topMenu.classList.remove('open');
//         mainContent.classList.remove('open');
//     }
// });

// // Controlar el comportamiento del menú lateral al pasar el mouse
// sideMenu.addEventListener('mouseenter', () => {
//     if (!isSideMenuOpen) {
//         sideMenu.classList.add('open');
//         // topMenu.classList.add('open');
//     }
// });

// sideMenu.addEventListener('mouseleave', () => {
//     if (!isSideMenuOpen) {
//         sideMenu.classList.remove('open');
//         // topMenu.classList.remove('open');
//     }
// });

// // Ajustar el tamaño del menú superior cuando se desplaza
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 50) {
//         topMenu.style.marginTop = '-50px';
//     } else {
//         topMenu.style.marginTop = '0';
//     }
// });

const sideMenu = document.getElementById('side-menu');
const toggleMenuButton = document.getElementById('toggle-menu');
const topMenu = document.getElementById('top-menu');
const mainContent = document.getElementById('main-content');
const elementosTitleMenuLeft = document.querySelectorAll('.title-menu-left');
const menuLeftA = document.querySelectorAll('.menu-left-a');
const iconArrow = document.querySelectorAll('.arrow-icon');

let isSideMenuOpen = false;

// Evento para abrir/cerrar el menú lateral al hacer clic en el botón
toggleMenuButton.addEventListener('click', (event) => {
    event.stopPropagation(); // Evita que el clic afecte otros eventos
    isSideMenuOpen = !isSideMenuOpen;
    
    if (isSideMenuOpen) {
        sideMenu.classList.add('open');
        topMenu.classList.add('open');
        mainContent.classList.add('open');
        elementosTitleMenuLeft.forEach(elemento => {
            elemento.classList.remove('hidden'); // Remueve 'hidden'
        });   
        menuLeftA.forEach(elemento => {
            elemento.classList.remove('hidden-icon'); // Remueve 'hidden'
        }); 
        iconArrow.forEach(elemento => {
            elemento.classList.remove('hidden-icon'); // Remueve 'hidden'
        }); 
    } else {
        sideMenu.classList.remove('open');
        topMenu.classList.remove('open');
        mainContent.classList.remove('open');
        elementosTitleMenuLeft.forEach(elemento => {
            elemento.classList.add('hidden'); // Añade 'hidden'
        });
        menuLeftA.forEach(elemento => {
            elemento.classList.add('hidden-icon'); // Remueve 'hidden'
        }); 
        iconArrow.forEach(elemento => {
            elemento.classList.add('hidden-icon'); // Remueve 'hidden'
        }); 
    }
});

// Evento para abrir el menú al pasar el mouse (solo si no está sobre el botón)
sideMenu.addEventListener('mouseenter', (event) => {
    if (!isSideMenuOpen && !toggleMenuButton.contains(event.relatedTarget)) {
        sideMenu.classList.add('open');
        elementosTitleMenuLeft.forEach(elemento => {
            elemento.classList.remove('hidden'); // Remueve 'hidden'
        });  
        menuLeftA.forEach(elemento => {
            elemento.classList.remove('hidden-icon'); // Remueve 'hidden'
        });  
        iconArrow.forEach(elemento => {
            elemento.classList.remove('hidden-icon'); // Remueve 'hidden'
        }); 
        cerrarSubmenus();
    }
});

// Evento para cerrar el menú al salir del área del menú (solo si no está abierto)
sideMenu.addEventListener('mouseleave', (event) => {
    // Comprobamos que el mouse no esté sobre el contenedor del idioma antes de cerrar el menú lateral
    if (!isSideMenuOpen && (!languageContainer || !languageContainer.contains(event.relatedTarget))) {
        sideMenu.classList.remove('open');
        elementosTitleMenuLeft.forEach(elemento => {
            elemento.classList.add('hidden'); // Añade 'hidden'
        });
        menuLeftA.forEach(elemento => {
            elemento.classList.add('hidden-icon'); // Remueve 'hidden'
        }); 
        iconArrow.forEach(elemento => {
            elemento.classList.add('hidden-icon'); // Remueve 'hidden'
        }); 
        cerrarSubmenus();
    }
});

/////////////////////////////////////////////////////////////////////
// Función para cerrar todos los submenús abiertos
function cerrarSubmenus() {
    const submenus = document.querySelectorAll(".submenu");
    submenus.forEach(submenu => {
        submenu.style.maxHeight = null; // Ocultar con transición
    });

    const activeItems = document.querySelectorAll(".mouse-hover.icon-end.active");
    activeItems.forEach(item => {
        item.classList.remove("active"); // Remueve la clase activa
    });
}

toggleMenuButton.addEventListener('click', (event) => {
    if (!isSideMenuOpen) {
        cerrarSubmenus();
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".mouse-hover.icon-end");

    menuItems.forEach(item => {
        item.addEventListener("click", function () {
            this.classList.toggle("active");

            let submenu = this.nextElementSibling;

            if (submenu && submenu.classList.contains("submenu")) {
                if (submenu.style.maxHeight) {
                    submenu.style.maxHeight = null; // Ocultar con transición
                } else {
                    submenu.style.maxHeight = submenu.scrollHeight + "px"; // Mostrar con transición suave
                }
            }
        });
    });
});
const languageContainer = document.getElementById('leng-box');
const languageWindow = document.getElementById("language-window");
const languageToggleButton = document.getElementById("language-toggle");

// Variable global para el timeout de cierre
let closeLanguageWindowTimeout;

if (languageContainer && languageWindow && languageToggleButton) {
    // Evento para manejar la ventana de idioma
    languageToggleButton.addEventListener("click", function(event) {
        event.preventDefault(); // Evita que el enlace navegue

        // Si la ventana está abierta, cerrarla; si está cerrada, abrirla
        if (languageWindow.classList.contains("open")) {
            closeLanguageWindow();
        } else {
            openLanguageWindow();
        }
    });

    // Función para abrir la ventana de idioma
    function openLanguageWindow() {
        languageWindow.style.display = "block";
        setTimeout(function() {
            languageWindow.classList.add("open");
        }, 10); // Aplica la animación al mostrar
    }

    // Función para cerrar la ventana de idioma
    function closeLanguageWindow() {
        languageWindow.classList.remove("open");
        setTimeout(function() {
            languageWindow.style.display = "none"; // Esconde la ventana después de la animación
        }, 300); // El tiempo debe coincidir con la duración de la animación
    }

    // Detectar cuando el mouse sale del contenedor #leng-box (que incluye el <li> y la ventana de idioma)
    languageContainer.addEventListener('mouseleave', function() {
        // Usamos un pequeño retraso para evitar el cierre inmediato cuando se mueve rápido el mouse
        closeLanguageWindowTimeout = setTimeout(function() {
            if (!languageWindow.contains(document.querySelector(':hover')) && !languageContainer.contains(document.querySelector(':hover'))) {
                closeLanguageWindow();
            }
        }, 200); // Aumenta el tiempo si se sigue cerrando demasiado rápido
    });

    // Detectar cuando el mouse sale de la ventana de idioma
    languageWindow.addEventListener('mouseleave', function() {
        // Si el mouse sale de la ventana de idioma, cerramos la ventana
        closeLanguageWindowTimeout = setTimeout(function() {
            closeLanguageWindow();
        }, 200); // Asegura un pequeño retraso para el cierre
    });

    // Detectar cuando el mouse entra en el área del contenedor, para evitar el cierre
    languageContainer.addEventListener('mouseenter', function() {
        // Si el mouse entra en el contenedor, evitamos el cierre inmediato
        clearTimeout(closeLanguageWindowTimeout);
    });

    // Detectar cuando el mouse entra en la ventana de idioma, para evitar el cierre
    languageWindow.addEventListener('mouseenter', function() {
        // Si el mouse entra en la ventana, evitamos el cierre
        clearTimeout(closeLanguageWindowTimeout);
    });
}

//Menu desplegable
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionamos todos los botones
    const buttons = document.querySelectorAll('.dropdown-button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Encontramos el menú asociado a este botón
            const menu = this.nextElementSibling;
            
            // Cerramos otros menús abiertos
            document.querySelectorAll('.dropdown-menu').forEach(item => {
                if (item !== menu && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
            
            // Alternamos el menú actual
            menu.classList.toggle('active');
        });
    });
    
    // Cerrar menús al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (!e.target.classList.contains('dropdown-button')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                if (menu.classList.contains('active')) {
                    menu.classList.remove('active');
                }
            });
        }
    });
});





