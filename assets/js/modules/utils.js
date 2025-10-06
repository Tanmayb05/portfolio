// ========================================
// UTILITY FUNCTIONS
// ========================================

// Element toggle function
export const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

// Copy to clipboard function
export function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    // Show a temporary notification
    const notification = document.createElement('div');
    notification.textContent = 'Copied to clipboard!';
    notification.style.cssText = 'position: fixed; top: 20px; right: 20px; background: #4CAF50; color: white; padding: 15px; border-radius: 5px; z-index: 10000; font-family: Poppins, sans-serif;';
    document.body.appendChild(notification);

    setTimeout(function() {
      notification.remove();
    }, 2000);
  }).catch(function(err) {
    console.error('Failed to copy text: ', err);
  });
}
