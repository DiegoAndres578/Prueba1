/* script.js */
// Espera a que el DOM se cargue completamente
document.addEventListener("DOMContentLoaded", function() {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  const closeModal = document.querySelector(".close");

  // Definición de contenido para cada sección
  const sections = {
    inicio: "<h2>Inicio</h2><p>Bienvenido a nuestra página de inicio.</p>",
    nosotros: "<h2>Nosotros</h2><p>Información sobre nuestra empresa.</p>",
    mision: "<h2>Misión</h2><p>Nuestra misión es brindar excelencia en nuestros servicios.</p>",
    vision: "<h2>Visión</h2><p>Nuestra visión es innovar y crecer continuamente.</p>",
    contacto: `<h2>Contacto</h2>
               <form id="contactForm">
                 <input type="text" name="nombre" placeholder="Nombre" required>
                 <input type="email" name="email" placeholder="Email" required>
                 <input type="text" name="asunto" placeholder="Asunto" required>
                 <textarea name="mensaje" placeholder="Mensaje" rows="5" required style="resize: vertical;"></textarea>
                 <button type="submit" >Enviar</button>
               </form>
               <div id="formResponse"></div>`,
    ubicacion: "<h2>Ubicación</h2><p>Estamos ubicados en la ciudad de ejemplo.</p>"
  };

  // Manejo de clics en el menú
  const menuButtons = document.querySelectorAll(".menu-btn");
  menuButtons.forEach(function(button) {
    button.addEventListener("click", function() {
      const section = this.getAttribute("data-section");
      if (sections[section]) {
        modalBody.innerHTML = sections[section];
        modal.style.display = "block";

        // Si es la sección de contacto, se añade el listener para el formulario
        if (section === "contacto") {
          const contactForm = document.getElementById("contactForm");
          contactForm.addEventListener("submit", function(e) {
            e.preventDefault();
            enviarFormulario(contactForm);
          });
        }
      }
    });
  });

  // Funcionalidad para cerrar el modal
  closeModal.addEventListener("click", function() {
    modal.style.display = "none";
  });

  // Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener("click", function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });

  // Función para enviar el formulario vía AJAX
  function enviarFormulario(form) {
    const formData = new FormData(form);
    fetch("contacto.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      document.getElementById("formResponse").innerHTML = 'Datos enviados con éxito';
      form.reset();
    })
    .catch(error => {
      document.getElementById("formResponse").innerHTML = "Error al enviar el formulario.";
      console.error("Error:", error);
    });
  }
});
