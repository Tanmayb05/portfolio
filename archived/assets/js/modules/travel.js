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

    // Desktop hover behavior
    card.addEventListener('mouseenter', function() {
      img.src = colorSrc;
    });

    card.addEventListener('mouseleave', function() {
      img.src = greyscaleSrc;
    });

    // Mobile touch behavior - two tap interaction
    card.addEventListener('touchstart', function(e) {
      // Check if card already has active state
      if (!card.classList.contains('touch-active')) {
        e.preventDefault(); // Prevent immediate navigation

        // Remove active state from all other cards
        document.querySelectorAll('.travel-card').forEach(function(otherCard) {
          if (otherCard !== card) {
            otherCard.classList.remove('touch-active');
            const otherImg = otherCard.querySelector('.travel-image');
            const otherGreyscaleSrc = otherImg.getAttribute('src').includes('travel-card-')
              ? otherImg.src
              : otherImg.src.replace(/travel-([^.]+)\.png/, 'travel-card-$1.jpg');
            otherImg.src = otherGreyscaleSrc;
          }
        });

        // Activate this card
        card.classList.add('touch-active');
        img.src = colorSrc;
      }
      // Second tap - allow default link behavior (no action needed, link will work)
    });

    // Remove active state when touching outside
    document.addEventListener('touchstart', function(e) {
      if (!card.contains(e.target) && card.classList.contains('touch-active')) {
        card.classList.remove('touch-active');
        img.src = greyscaleSrc;
      }
    });
  });
}
