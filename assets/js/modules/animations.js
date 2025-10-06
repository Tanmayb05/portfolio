// ========================================
// ANIMATIONS
// ========================================

// Article title glow animation on hover
export function initArticleTitleGlow() {
  document.querySelectorAll('.article-title').forEach(function(title) {
    let hasGlowed = false;

    title.addEventListener('mouseenter', function() {
      if (!hasGlowed) {
        this.classList.add('glow-active');
        hasGlowed = true;

        // Remove class after animation completes to allow it to trigger again
        setTimeout(function() {
          title.classList.remove('glow-active');
          hasGlowed = false;
        }, 5000);
      }
    });
  });
}
