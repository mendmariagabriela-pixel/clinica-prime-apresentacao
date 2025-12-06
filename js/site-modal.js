document.addEventListener('DOMContentLoaded', function () {
  const modalBackdrop = document.getElementById('siteModal');
  const closeBtn = document.getElementById('siteModalClose');
  const openButtons = document.querySelectorAll('.bio-link-site');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('is-open');
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});
