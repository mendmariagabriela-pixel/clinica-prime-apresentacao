document.addEventListener('DOMContentLoaded', function () {
  /* =====================================
     CARROSSEL PRINCIPAL
  ===================================== */

  const slidesContainer = document.getElementById('carouselSlides');
  const slides = slidesContainer ? slidesContainer.querySelectorAll('.carousel-slide') : [];
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDots');
  const currentSpan = document.getElementById('carouselCurrent');
  const totalSpan = document.getElementById('carouselTotal');

  let currentIndex = 0;

  if (slides.length) {
    if (totalSpan) totalSpan.textContent = String(slides.length).padStart(2, '0');

    // cria dots
    const dots = [];
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    function updateUI() {
      const offset = -currentIndex * 100;
      slidesContainer.style.transform = `translateX(${offset}%)`;

      slides.forEach((s, idx) => {
        s.classList.toggle('active', idx === currentIndex);
      });

      dots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentIndex);
      });

      if (currentSpan) {
        currentSpan.textContent = String(currentIndex + 1).padStart(2, '0');
      }
    }

    function goToSlide(index) {
      if (index < 0) index = slides.length - 1;
      if (index >= slides.length) index = 0;
      currentIndex = index;
      updateUI();
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
    }

    // swipe em mobile (opcional)
    let startX = null;

    slidesContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    slidesContainer.addEventListener('touchend', (e) => {
      if (startX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          goToSlide(currentIndex + 1);
        } else {
          goToSlide(currentIndex - 1);
        }
      }
      startX = null;
    });

    updateUI();
  }

  /* =====================================
     CARROSSEL DE STORIES
  ===================================== */

  const storiesTrack = document.getElementById('storiesTrack');
  const storySlides = storiesTrack ? storiesTrack.querySelectorAll('.story-slide') : [];
  const storiesPrev = document.getElementById('storiesPrev');
  const storiesNext = document.getElementById('storiesNext');
  const storiesDotsContainer = document.getElementById('storiesDots');

  let currentStory = 0;

  if (storySlides.length) {
    const storyDots = [];

    // cria dots de stories
    storySlides.forEach((_, idx) => {
      const dot = document.createElement('span');
      if (idx === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToStory(idx));
      storiesDotsContainer.appendChild(dot);
      storyDots.push(dot);
    });

    function updateStoriesUI() {
      const offset = -currentStory * 100;
      storiesTrack.style.transform = `translateX(${offset}%)`;

      storyDots.forEach((d, idx) => {
        d.classList.toggle('active', idx === currentStory);
      });
    }

    function goToStory(index) {
      if (index < 0) index = storySlides.length - 1;
      if (index >= storySlides.length) index = 0;
      currentStory = index;
      updateStoriesUI();
    }

    if (storiesPrev) {
      storiesPrev.addEventListener('click', () => goToStory(currentStory - 1));
    }

    if (storiesNext) {
      storiesNext.addEventListener('click', () => goToStory(currentStory + 1));
    }

    // swipe mobile
    let startStoriesX = null;

    storiesTrack.addEventListener('touchstart', (e) => {
      startStoriesX = e.touches[0].clientX;
    });

    storiesTrack.addEventListener('touchend', (e) => {
      if (startStoriesX === null) return;
      const endX = e.changedTouches[0].clientX;
      const diff = endX - startStoriesX;
      if (Math.abs(diff) > 50) {
        if (diff < 0) {
          goToStory(currentStory + 1);
        } else {
          goToStory(currentStory - 1);
        }
      }
      startStoriesX = null;
    });

    updateStoriesUI();
  }
});
