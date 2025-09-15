// ===================== CONFIGURACIÓN DEL CANVAS =====================
const canvas = document.getElementById('stars'); // Selecciona el canvas donde se dibujarán las estrellas
const ctx = canvas.getContext('2d');            // Obtiene el contexto 2D para dibujar

// ===================== VARIABLES =====================
let starsArray = [];        // Array que contendrá todas las estrellas
const numStars = 200;       // Número total de estrellas a dibujar

// ===================== FUNCIONES =====================

// Inicializa las estrellas y ajusta el tamaño del canvas
function init() {
  // Ajusta el tamaño del canvas al tamaño actual de la ventana
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  starsArray = []; // Reinicia el array de estrellas

  // Genera cada estrella con propiedades aleatorias
  for (let i = 0; i < numStars; i++) {
    starsArray.push({
      x: Math.random() * canvas.width,         // Posición horizontal aleatoria
      y: Math.random() * canvas.height,        // Posición vertical aleatoria
      radius: Math.random() * 0.8 + 0.2,       // Radio aleatorio entre 0.2 y 1 para estrellas finas
      vy: Math.random() * 0.3 + 0.05           // Velocidad vertical aleatoria entre 0.05 y 0.35
    });
  }
}

// Función de animación que dibuja y mueve las estrellas
function animate() {
  // Limpia el canvas antes de dibujar la nueva frame
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Recorre todas las estrellas
  starsArray.forEach(star => {
    // ===================== DIBUJAR ESTRELLA =====================
    ctx.beginPath();                        // Comienza un nuevo trazo
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2); // Dibuja un círculo
    ctx.fillStyle = '#fff';                 // Color blanco
    ctx.fill();                             // Rellena el círculo

    // ===================== MOVIMIENTO =====================
    star.y -= star.vy;                       // Mueve la estrella hacia arriba

    // Reinicia la estrella desde abajo si sale de la pantalla
    if (star.y < 0) {
      star.y = canvas.height;               // Posición vertical al fondo
      star.x = Math.random() * canvas.width; // Posición horizontal aleatoria
      star.radius = Math.random() * 0.8 + 0.2; // Radio aleatorio nuevo
      star.vy = Math.random() * 0.3 + 0.05;    // Velocidad aleatoria nueva
    }
  });

  // Llama a la función de animación en el siguiente frame
  requestAnimationFrame(animate);
}

// ===================== EVENTOS =====================
// Ajusta el canvas y reinicia las estrellas al cambiar el tamaño de la ventana
window.addEventListener('resize', init);

// ===================== INICIO =====================
init();    // Inicializa las estrellas
animate(); // Inicia la animación
