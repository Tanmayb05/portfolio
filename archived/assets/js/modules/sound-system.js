// ========================================
// SOUND SYSTEM
// ========================================

// Sound state management
let isMuted = localStorage.getItem('soundMuted') === 'true';
let audioUnlocked = false;

// Initialize different sounds for different interactions
const sectionSound = new Audio('./assets/sounds/click_spacey.wav');
sectionSound.volume = 0.4;

const skillSound = new Audio('./assets/sounds/click_glass.wav');
skillSound.volume = 0.3;

const sidebarSound = new Audio('./assets/sounds/click_button.wav');
sidebarSound.volume = 0.35;

const generalSound = new Audio('./assets/sounds/click_normal.wav');
generalSound.volume = 0.3;

const scrollSound = new Audio('./assets/sounds/scroll_mouse_wheel_trimmed.wav');
scrollSound.volume = 0.2;

const mobileScrollSound = new Audio('./assets/sounds/scroll_swipe_iphone.mp3');
mobileScrollSound.volume = 0.3;

// Unlock audio on first user interaction
function unlockAudio() {
  if (audioUnlocked) return;

  // Play and immediately pause all sounds to unlock them
  const sounds = [sectionSound, skillSound, sidebarSound, generalSound, scrollSound, mobileScrollSound];
  sounds.forEach(function(sound) {
    sound.play().then(function() {
      sound.pause();
      sound.currentTime = 0;
    }).catch(function() {
      // Silent fail
    });
  });

  audioUnlocked = true;
}

// Function to play sound
function playSound(audio) {
  if (isMuted) return;

  const sound = audio.cloneNode();
  sound.volume = audio.volume;
  sound.play().catch(function(error) {
    console.log('Audio play prevented:', error);
  });
}

// Update mute button state
function updateMuteButton() {
  const muteToggle = document.getElementById('mute-toggle');
  const muteToggleMobile = document.getElementById('mute-toggle-mobile');
  const muteToggleSidebar = document.getElementById('mute-toggle-mobile-sidebar');

  if (muteToggle) {
    const muteIcon = muteToggle.querySelector('ion-icon');
    if (isMuted) {
      muteToggle.classList.add('muted');
      muteIcon.setAttribute('name', 'volume-mute-outline');
    } else {
      muteToggle.classList.remove('muted');
      muteIcon.setAttribute('name', 'volume-high-outline');
    }
  }

  if (muteToggleMobile) {
    const muteIconMobile = muteToggleMobile.querySelector('ion-icon');
    if (isMuted) {
      muteToggleMobile.classList.add('muted');
      muteIconMobile.setAttribute('name', 'volume-mute-outline');
    } else {
      muteToggleMobile.classList.remove('muted');
      muteIconMobile.setAttribute('name', 'volume-high-outline');
    }
  }

  if (muteToggleSidebar) {
    if (isMuted) {
      muteToggleSidebar.classList.add('muted');
    } else {
      muteToggleSidebar.classList.remove('muted');
    }
  }
}

// Toggle mute function
function toggleMute(event) {
  event.stopPropagation(); // Prevent triggering general click sound
  isMuted = !isMuted;
  localStorage.setItem('soundMuted', isMuted);
  updateMuteButton();

  // Play sound as feedback when unmuting
  if (!isMuted) {
    playSound(sectionSound);
  }
}

// Initialize sound system
export function initSoundSystem() {
  // Add listeners to unlock audio on first interaction
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
  document.addEventListener('keydown', unlockAudio, { once: true });

  // Set sounds to unmuted by default (no toggle button)
  isMuted = false;
  localStorage.setItem('soundMuted', false);
}

// Initialize scroll sound effect
export function initScrollSound() {
  let lastScrollPosition = 0;
  let scrollAccumulator = 0;
  let lastScrollTime = 0;

  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

  // Adjust threshold and throttle based on device
  const scrollThreshold = isMobile ? 800 : 150;
  const scrollThrottle = isMobile ? 500 : 200;

  window.addEventListener('scroll', function() {
    // Skip scroll sound entirely on mobile devices
    if (isMobile) return;

    const now = Date.now();
    const currentScrollPosition = window.scrollY;
    const scrollDelta = Math.abs(currentScrollPosition - lastScrollPosition);

    // Accumulate scroll distance
    scrollAccumulator += scrollDelta;
    lastScrollPosition = currentScrollPosition;

    // Only play sound if accumulated scroll distance exceeds threshold AND enough time has passed
    if (scrollAccumulator >= scrollThreshold && now - lastScrollTime > scrollThrottle) {
      playSound(scrollSound);
      scrollAccumulator = 0;
      lastScrollTime = now;
    }

    // Reset accumulator if user stops scrolling for a moment
    clearTimeout(window.scrollResetTimeout);
    window.scrollResetTimeout = setTimeout(function() {
      scrollAccumulator = 0;
    }, 300);
  }, { passive: true });
}

export { playSound, sectionSound, skillSound, sidebarSound, generalSound };
