// ===================== ELEMENTOS DEL DOM =====================
const imageModal = document.getElementById('imageModal'); // Contenedor del modal
const certImage = document.getElementById('certImage');   // Imagen dentro del modal
const imageClose = document.getElementById('imageClose'); // Botón de cerrar

// ===================== ABRIR MODAL =====================
// Selecciona todas las tarjetas de certificación
document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
        // Obtiene la URL de la imagen desde el atributo data-img de la tarjeta
        const imgSrc = card.dataset.img;

        // Asigna la imagen al modal
        certImage.src = imgSrc;

        // Muestra el modal configurando display
        imageModal.style.display = 'flex';

        // Pequeño delay para permitir que se aplique la animación de aparición
        setTimeout(() => {
            imageModal.classList.add('show'); // Agrega clase que activa la transición de escala y opacidad
        }, 10);
    });
});

// ===================== CERRAR MODAL =====================
function closeModal() {
    // Remueve la clase 'show' para iniciar animación de salida
    imageModal.classList.remove('show');

    // Espera a que termine la animación antes de ocultar completamente el modal
    setTimeout(() => {
        imageModal.style.display = 'none'; // Oculta el modal
        certImage.src = '';                 // Limpia la imagen para liberar memoria
    }, 300); // Duración igual a la animación CSS
}

// Cerrar modal al hacer click en el botón de cierre
imageClose.addEventListener('click', closeModal);

// Cerrar modal al hacer click fuera de la imagen (en el fondo)
imageModal.addEventListener('click', (e) => {
    if (e.target === imageModal) { // Solo si se clickeó el fondo
        closeModal();
    }
});

// ===================== CERRAR CON TECLA ESC =====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal.style.display === 'flex') {
        closeModal();
    }
});
