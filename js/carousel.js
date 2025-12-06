// js/carousel.js
// =======================================
// CARROSSEL PRINCIPAL + CARROSSEL STORIES
// =======================================

document.addEventListener("DOMContentLoaded", () => {
  // ==============================
  // 1) CARROSSEL PRINCIPAL
  // ==============================
  const container = document.getElementById("carouselSlides");
  const slides = container ? Array.from(container.querySelectorAll(".carousel-slide")) : [];

  const dotsContainer = document.getElementById("carouselDots");
  const currentEl = document.getElementById("carouselCurrent");
  const totalEl = document.getElementById("carouselTotal");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (
    container &&
    slides.length &&
    dotsContainer &&
    currentEl &&
    totalEl &&
    prevBtn &&
    nextBtn
  ) {
    let current = 0;
    const total = slides.length;

    // total formatado 01, 02, ...
    totalEl.textContent = String(total).padStart(2, "0");

    // cria dots
    slides.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.dataset.index = String(i);
      if (i === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll("div"));

    function updateMainCarousel() {
      container.style.transform = `translateX(-${current * 100}%)`;
      slides.forEach((s, i) => s.classList.toggle("active", i === current));
      dots.forEach((d, i) => d.classList.toggle("active", i === current));
      currentEl.textContent = String(current + 1).padStart(2, "0");
    }

    function next() {
      current = (current + 1) % total;
      updateMainCarousel();
    }

    function prev() {
      current = (current - 1 + total) % total;
      updateMainCarousel();
    }

    // botões
    nextBtn.addEventListener("click", next);
    prevBtn.addEventListener("click", prev);

    // click nos dots
    dots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.index || 0);
        current = idx;
        updateMainCarousel();
      });
    });

    // swipe em mobile
    let startX = null;

    container.addEventListener(
      "touchstart",
      e => {
        startX = e.touches[0].clientX;
      },
      { passive: true }
    );

    container.addEventListener(
      "touchend",
      e => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;

        if (Math.abs(dx) > 50) {
          if (dx < 0) next();
          else prev();
        }
        startX = null;
      },
      { passive: true }
    );

    // inicia no slide 1
    updateMainCarousel();
  }

  // ==============================
  // 2) CARROSSEL DE STORIES
  // ==============================
  const storiesTrack = document.getElementById("storiesTrack");
  const storiesDotsContainer = document.getElementById("storiesDots");
  const storiesPrev = document.getElementById("storiesPrev");
  const storiesNext = document.getElementById("storiesNext");

  const storySlides = storiesTrack
    ? Array.from(storiesTrack.querySelectorAll(".story-slide"))
    : [];

  if (
    storiesTrack &&
    storySlides.length &&
    storiesDotsContainer &&
    storiesPrev &&
    storiesNext
  ) {
    let currentStory = 0;
    const totalStories = storySlides.length;

    // cria dots dos stories
    for (let i = 0; i < totalStories; i++) {
      const span = document.createElement("span");
      span.dataset.index = String(i);
      if (i === 0) span.classList.add("active");
      storiesDotsContainer.appendChild(span);
    }

    const storiesDots = Array.from(storiesDotsContainer.querySelectorAll("span"));

    function updateStories() {
      storiesTrack.style.transform = `translateX(-${currentStory * 100}%)`;
      storiesDots.forEach((d, i) => d.classList.toggle("active", i === currentStory));
    }

    function nextStory() {
      currentStory = (currentStory + 1) % totalStories;
      updateStories();
    }

    function prevStory() {
      currentStory = (currentStory - 1 + totalStories) % totalStories;
      updateStories();
    }

    storiesNext.addEventListener("click", nextStory);
    storiesPrev.addEventListener("click", prevStory);

    storiesDots.forEach(dot => {
      dot.addEventListener("click", () => {
        const idx = Number(dot.dataset.index || 0);
        currentStory = idx;
        updateStories();
      });
    });

    // swipe nos stories (mobile)
    let sStartX = null;

    storiesTrack.addEventListener(
      "touchstart",
      e => {
        sStartX = e.touches[0].clientX;
      },
      { passive: true }
    );

    storiesTrack.addEventListener(
      "touchend",
      e => {
        if (sStartX === null) return;
        const dx = e.changedTouches[0].clientX - sStartX;

        if (Math.abs(dx) > 40) {
          if (dx < 0) nextStory();
          else prevStory();
        }
        sStartX = null;
      },
      { passive: true }
    );

    // inicia no story 1
    updateStories();
  }
});
