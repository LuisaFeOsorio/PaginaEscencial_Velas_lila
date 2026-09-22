document.addEventListener('DOMContentLoaded', () => {
  // --- Menú Móvil ---
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // --- Header Sticky + Ocultar al hacer scroll hacia abajo ---
  const header = document.getElementById('header');
  let lastScrollTop = 0;
  const scrollThreshold = 50; // píxeles mínimos para activar el efecto

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    // Efecto de sombra al hacer scroll
    if (currentScroll > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Ocultar al bajar, mostrar al subir
    if (currentScroll > lastScrollTop && currentScroll > 200) {
      // Scroll hacia abajo
      header.classList.add('header-hidden');
    } else {
      // Scroll hacia arriba
      header.classList.remove('header-hidden');
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  });

  // --- Animación de aparición al hacer scroll ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const animatableElements = document.querySelectorAll(
    '.product-card, .category-card, .gallery-item, .about-images, .hero-image'
  );

  animatableElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
  });
});
