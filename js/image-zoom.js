document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('imgLightbox');
  const lightboxImg = document.getElementById('imgLightboxImage');
  const closeBtn = document.getElementById('imgLightboxClose');

  if (!lightbox || !lightboxImg) return;

  function openLightbox(src, alt) {
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.classList.add('is-open');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightboxImg.src = '';
  }

  // todas as imagens clicáveis
  document.querySelectorAll('img.zoomable').forEach((img) => {
    img.addEventListener('click', () => {
      openLightbox(img.src, img.alt);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    // fecha só se clicar fora da imagem
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
});
