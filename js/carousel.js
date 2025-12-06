// js/carousel.js
// Controle do carrossel principal + carrossel de stories

document.addEventListener("DOMContentLoaded", () => {
  // ==========================
  // CARROSSEL PRINCIPAL
  // ==========================
  const slidesContainer = document.getElementById("carouselSlides");
  const slides = slidesContainer ? Array.from(slidesContainer.querySelectorAll(".carousel-slide")) : [];
  const btnPrev = document.getElementById("carouselPrev");
  const btnNext = document.getElementById("carouselNext");
  const dotsContainer = document.getElementById("carouselDots");
  const currentSpan = document.getElementById("carouselCurrent");
  const totalSpan = document.getElementById("carouselTotal");

  let currentIndex = 0;

  function updateMainDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      if (index === currentIndex) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    if (!slides.length) return;
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    currentIndex = index;

    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`;

    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentIndex);
    });

    if (currentSpan) {
      const num = (currentIndex + 1).toString().padStart(2, "0");
      currentSpan.textContent = num;
    }
    if (totalSpan) {
      const totalNum = slides.length.toString().padStart(2, "0");
      totalSpan.textContent = totalNum;
    }

    if (dotsContainer) {
      [...dotsContainer.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }
  }

  if (slides.length) {
    updateMainDots();
    goToSlide(0);

    if (btnPrev) btnPrev.addEventListener("click", () => goToSlide(currentIndex - 1));
    if (btnNext) btnNext.addEventListener("click", () => goToSlide(currentIndex + 1));
  }

  // ==========================
  // CARROSSEL DE STORIES
  // ==========================
  const storiesTrack = document.getElementById("storiesTrack");
  const storySlides = storiesTrack ? Array.from(storiesTrack.querySelectorAll(".story-slide")) : [];
  const storiesPrev = document.getElementById("storiesPrev");
  const storiesNext = document.getElementById("storiesNext");
  const storiesDots = document.getElementById("storiesDots");

  let currentStory = 0;

  function updateStoriesDots() {
    if (!storiesDots) return;
    storiesDots.innerHTML = "";
    storySlides.forEach((_, index) => {
      const span = document.createElement("span");
      if (index === currentStory) span.classList.add("active");
      span.addEventListener("click", () => goToStory(index));
      storiesDots.appendChild(span);
    });
  }

  function goToStory(index) {
    if (!storySlides.length || !storiesTrack) return;
    if (index < 0) index = storySlides.length - 1;
    if (index >= storySlides.length) index = 0;
    currentStory = index;

    const offset = -index * 100;
    storiesTrack.style.transform = `translateX(${offset}%)`;

    if (storiesDots) {
      [...storiesDots.children].forEach((dot, i) => {
        dot.classList.toggle("active", i === currentStory);
      });
    }
  }

  if (storySlides.length) {
    updateStoriesDots();
    goToStory(0);

    if (storiesPrev) storiesPrev.addEventListener("click", () => goToStory(currentStory - 1));
    if (storiesNext) storiesNext.addEventListener("click", () => goToStory(currentStory + 1));
  }
});
