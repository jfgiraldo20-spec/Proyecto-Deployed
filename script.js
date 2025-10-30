document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightbox = document.getElementById('lightbox-close');
  const productButtons = document.querySelectorAll('.product-card .buy');

  if (localStorage.getItem('theme') === 'dark' || 
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    body.setAttribute('data-theme', 'dark');
    themeToggles.forEach(btn => btn.textContent = 'Modo Claro');
  } else {
    body.setAttribute('data-theme', 'light');
    themeToggles.forEach(btn => btn.textContent = 'Modo Oscuro');
  }

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = body.getAttribute('data-theme') === 'dark';
      body.setAttribute('data-theme', isDark ? 'light' : 'dark');
      themeToggles.forEach(toggle => toggle.textContent = isDark ? 'Modo Oscuro' : 'Modo Claro');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  });

  productButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.product-card');
      const imgSrc = card.querySelector('img').src;
      const caption = card.dataset.name;
      lightboxImg.src = imgSrc;
      lightboxCaption.textContent = caption;
      lightbox.classList.remove('hidden');
    });
  });

  closeLightbox.addEventListener('click', () => {
    lightbox.classList.add('hidden');
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      lightbox.classList.add('hidden');
    }
  });
});