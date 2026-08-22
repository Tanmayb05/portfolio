// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================

export function initThemeToggle() {
  const themeToggleBtn = document.querySelector('#theme-toggle');
  const themeToggleMobileBtn = document.querySelector('#theme-toggle-mobile');
  const htmlElement = document.documentElement;

  // Get saved theme from localStorage or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  // Create theme toggle sound
  const themeSound = new Audio('./assets/sounds/click_button.wav');
  themeSound.volume = 0.35;

  // Toggle theme function
  function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Play sound
    const sound = themeSound.cloneNode();
    sound.volume = themeSound.volume;
    sound.play().catch(function(error) {
      console.log('Audio play prevented:', error);
    });
  }

  // Event listeners
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
  }

  if (themeToggleMobileBtn) {
    themeToggleMobileBtn.addEventListener('click', toggleTheme);
  }
}
