document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("siteModal");
  const closeBtn = document.getElementById("siteModalClose");
  const triggers = document.querySelectorAll(".bio-link-site");

  function openModal() {
    modal.classList.add("open");
  }

  function closeModal() {
    modal.classList.remove("open");
  }

  triggers.forEach(btn => {
    btn.addEventListener("click", openModal);
  });

  closeBtn.addEventListener("click", closeModal);

  modal.addEventListener("click", e => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
});
