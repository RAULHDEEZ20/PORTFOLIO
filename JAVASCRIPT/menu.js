// ===================== MENÚ HAMBURGUESA RESPONSIVE =====================
document.addEventListener('DOMContentLoaded', function() {
  // Selecciona el navbar principal y su lista de enlaces
  const navbar = document.getElementById('navbar');
  const navList = navbar.querySelector('ul');
  
  // ===================== CREAR BOTÓN HAMBURGUESA SI NO EXISTE =====================
  let hamburger = navbar.querySelector('.hamburger');
  if (!hamburger) {
    hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    // Estructura visual del botón (tres barras)
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    navbar.appendChild(hamburger);
  }
  
  // ===================== TOGGLE DEL MENÚ =====================
  hamburger.addEventListener('click', function(e) {
    e.stopPropagation(); // Evita que el click se propague y cierre el menú inmediatamente
    hamburger.classList.toggle('active'); // Animación del botón
    navList.classList.toggle('active');   // Mostrar/ocultar menú
  });
  
  // ===================== CERRAR MENÚ AL HACER CLICK EN UN ENLACE =====================
  const navLinks = navList.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active'); // Reset animación botón
      navList.classList.remove('active');   // Ocultar menú
    });
  });
  
  // ===================== CERRAR MENÚ AL HACER CLICK FUERA =====================
  document.addEventListener('click', function(e) {
    // Si el click no fue dentro del navbar y el menú está abierto, cerrarlo
    if (!navbar.contains(e.target) && navList.classList.contains('active')) {
      hamburger.classList.remove('active');
      navList.classList.remove('active');
    }
  });
  
  // ===================== CERRAR MENÚ AL REDIMENSIONAR =====================
  window.addEventListener('resize', function() {
    // Si la ventana es mayor a 768px, quitar clases para evitar bugs
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navList.classList.remove('active');
    }
  });
});
