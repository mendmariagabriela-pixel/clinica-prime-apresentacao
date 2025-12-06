document.addEventListener("DOMContentLoaded", () => {
  const zoomables = document.querySelectorAll("img.zoomable");
  const backdrop = document.getElementById("imgLightbox");
  const imgEl = document.getElementById("imgLightboxImage");
  const closeBtn = document.getElementById("imgLightboxClose");

  if (!backdrop || !imgEl) return;

  function openLightbox(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || "Imagem ampliada";
    backdrop.classList.add("open");
  }

  function closeLightbox() {
    backdrop.classList.remove("open");
    imgEl.src = "";
  }

  zoomables.forEach(img => {
    img.addEventListener("click", () => {
      openLightbox(img.src, img.alt);
    });
  });

  closeBtn.addEventListener("click", closeLightbox);

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeLightbox();
    }
  });
});
