// Project Image Slider
export function initProjectSliders() {
  const sliders = document.querySelectorAll('[data-slider]');

  sliders.forEach(slider => {
    const sliderWrapper = slider.querySelector('.project-images-slider');
    const slides = slider.querySelectorAll('.project-images-slider img');
    const prevBtn = slider.querySelector('[data-slider-prev]');
    const nextBtn = slider.querySelector('[data-slider-next]');
    const dots = slider.querySelectorAll('[data-slider-dot]');

    let currentSlide = 0;
    const totalSlides = slides.length;

    function updateSlider() {
      // Move slider
      sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update dots
      dots.forEach((dot, index) => {
        if (index === currentSlide) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % totalSlides;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      updateSlider();
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
    }

    // Event listeners
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => goToSlide(index));
    });

    // Optional: Auto-play
    // let autoplayInterval = setInterval(nextSlide, 5000);

    // Pause autoplay on hover
    // slider.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
    // slider.addEventListener('mouseleave', () => {
    //   autoplayInterval = setInterval(nextSlide, 5000);
    // });
  });
}
