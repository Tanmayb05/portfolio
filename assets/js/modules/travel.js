// ========================================
// TRAVEL CARD IMAGE SWAP (Greyscale to Color)
// ========================================

export function initTravelCards() {
  document.querySelectorAll('.travel-card').forEach(function(card) {
    const img = card.querySelector('.travel-image');
    const greyscaleSrc = img.src;
    const colorSrc = img.getAttribute('data-color-src');

    // Preload the color image for smooth transition
    const preloadImg = new Image();
    preloadImg.src = colorSrc;

    card.addEventListener('mouseenter', function() {
      img.src = colorSrc;
    });

    card.addEventListener('mouseleave', function() {
      img.src = greyscaleSrc;
    });
  });
}
