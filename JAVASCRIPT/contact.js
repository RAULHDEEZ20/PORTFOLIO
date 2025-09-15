// ===================== ESPERAR A QUE EL DOM ESTÉ LISTO =====================
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form'); // Formulario de contacto
  const popup = document.getElementById('thankyou-popup'); // Popup de agradecimiento

  // ===================== ENVÍO DEL FORMULARIO =====================
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Evita que la página se recargue al enviar

    // ===================== MOSTRAR POPUP =====================
    popup.textContent = "😀 Thank you for your message! I’ll reply soon. 😊";
    popup.style.display = 'flex';
    popup.style.opacity = '1';

    // ===================== CREAR CANVAS PARA FUEGOS ARTIFICIALES =====================
    const fireworks = document.createElement('canvas');
    fireworks.id = 'fireworks-canvas';
    fireworks.style.position = 'fixed';
    fireworks.style.top = '0';
    fireworks.style.left = '0';
    fireworks.style.width = '100%';
    fireworks.style.height = '100%';
    fireworks.style.pointerEvents = 'none'; // No bloquea interacciones
    fireworks.style.zIndex = '10000'; // Sobre todos los elementos
    document.body.appendChild(fireworks);

    const ctx = fireworks.getContext('2d');
    fireworks.width = window.innerWidth;
    fireworks.height = window.innerHeight;

    // ===================== PARTICULAS DE FUEGOS ARTIFICIALES =====================
    const particles = []; // Array para almacenar cada partícula
    const colors = ['#ff6ec4', '#7873f5', '#00d4ff', '#ffdd00']; // Colores de explosión

    // Función para crear explosión central de partículas
    function createFirework() {
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      const count = 100; // Número de partículas por explosión
      for (let i = 0; i < count; i++) {
        particles.push({
          x: x,
          y: y,
          vx: (Math.random() - 0.5) * 12, // velocidad horizontal aleatoria
          vy: (Math.random() - 0.5) * 12, // velocidad vertical aleatoria
          alpha: 1,                       // opacidad inicial
          gravity: 0.05 + Math.random() * 0.05, // simulación de gravedad
          decay: 0.015 + Math.random() * 0.015, // velocidad de desaparición
          color: colors[Math.floor(Math.random() * colors.length)],
          radius: 2 + Math.random() * 2   // tamaño de partícula
        });
      }
    }

    // Función de animación que actualiza y dibuja las partículas
    function animate() {
      ctx.clearRect(0, 0, fireworks.width, fireworks.height); // Limpiar canvas
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Aplicar física
        p.vy += p.gravity; // gravedad
        p.x += p.vx;       // mover horizontal
        p.y += p.vy;       // mover vertical
        p.alpha -= p.decay; // reducir opacidad

        // Eliminar partículas invisibles
        if (p.alpha <= 0) particles.splice(i, 1);
        else {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (particles.length > 0) requestAnimationFrame(animate); // Continuar animación
    }

    // Crear y animar la explosión
    createFirework();
    animate();

    // ===================== ENVÍO DEL FORMULARIO A FORMSPREE =====================
    const formData = new FormData(form);
    try {
      const response = await fetch('https://formspree.io/f/xovlolda', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) form.reset(); // Limpiar formulario si todo salió bien
      else popup.textContent = 'Oops! Hubo un problema, intenta de nuevo.';
    } catch (error) {
      popup.textContent = 'Oops! Hubo un problema, intenta de nuevo.';
      console.error(error);
    }

    // ===================== OCULTAR POPUP Y CANVAS =====================
    setTimeout(() => {
      popup.style.opacity = '0'; // transición de desvanecimiento
      setTimeout(() => {
        popup.style.display = 'none';
        document.body.removeChild(fireworks); // eliminar canvas de fuegos artificiales
      }, 500);
    }, 4000); // popup visible por 4 segundos
  });
});
