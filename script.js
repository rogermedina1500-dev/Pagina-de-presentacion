/* ==========================================================================
   PORTFOLIO EXPRESS - JAVASCRIPT
   Interactividad, menú móvil, scroll suave y feedback de formulario
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Actualizar año en el pie de página automáticamente
  const currentYearSpan = document.getElementById('currentYear');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Control de menú de navegación móvil (hamburguesa)
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Cerrar menú al hacer clic en cualquier enlace
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // 3. Resaltar enlace activo según la sección visible al hacer scroll
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 4. Manejo del formulario de contacto y botón "Contactar"
  const contactForm = document.getElementById('contactForm');
  const contactBtn = document.getElementById('contactBtn');
  const formFeedback = document.getElementById('formFeedback');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const name = nameInput ? nameInput.value.trim() : '';

      // Simulación de envío con feedback visual profesional
      if (contactBtn) {
        contactBtn.disabled = true;
        contactBtn.textContent = 'Enviando...';
      }

      setTimeout(() => {
        if (formFeedback) {
          formFeedback.className = 'form-feedback success';
          formFeedback.textContent = `¡Gracias por tu mensaje, ${name || 'amigo/a'}! Me pondré en contacto contigo lo antes posible.`;
        }

        // Limpiar campos del formulario
        contactForm.reset();

        if (contactBtn) {
          contactBtn.disabled = false;
          contactBtn.textContent = 'Contactar';
        }

        // Ocultar mensaje tras 6 segundos
        setTimeout(() => {
          if (formFeedback) {
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';
          }
        }, 6000);
      }, 700);
    });
  }
});
