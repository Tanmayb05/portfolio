'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Sidebar Email and Number Copy to Clipboard
// copy to clipboard function
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
    // Optional: Show a temporary notification
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



// Fix Sidebar Social Links Hover Titles Issue
// Fix ionicon tooltips - remove internal SVG titles to show custom tooltips
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    document.querySelectorAll('ion-icon[title]').forEach(function(icon) {
      const shadowRoot = icon.shadowRoot;
      if (shadowRoot) {
        const svgTitle = shadowRoot.querySelector('title');
        if (svgTitle) {
          svgTitle.remove();
        }
      }
    });
  }, 100);
});



// Article title glow animation on hover
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

// Add listeners to unlock audio on first interaction
document.addEventListener('click', unlockAudio, { once: true });
document.addEventListener('touchstart', unlockAudio, { once: true });
document.addEventListener('keydown', unlockAudio, { once: true });

// Function to play sound
function playSound(audio) {
  if (isMuted) return;

  const sound = audio.cloneNode();
  sound.volume = audio.volume;
  sound.play().catch(function(error) {
    console.log('Audio play prevented:', error);
  });
}

// Mute toggle button functionality
const muteToggle = document.getElementById('mute-toggle');
const muteToggleMobile = document.getElementById('mute-toggle-mobile');
const muteIcon = muteToggle.querySelector('ion-icon');
const muteIconMobile = muteToggleMobile.querySelector('ion-icon');

// Set initial state
function updateMuteButton() {
  if (isMuted) {
    muteToggle.classList.add('muted');
    muteToggleMobile.classList.add('muted');
    muteIcon.setAttribute('name', 'volume-mute-outline');
    muteIconMobile.setAttribute('name', 'volume-mute-outline');
  } else {
    muteToggle.classList.remove('muted');
    muteToggleMobile.classList.remove('muted');
    muteIcon.setAttribute('name', 'volume-high-outline');
    muteIconMobile.setAttribute('name', 'volume-high-outline');
  }
}

updateMuteButton();

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

// Add event listeners to both buttons
muteToggle.addEventListener('click', toggleMute);
muteToggleMobile.addEventListener('click', toggleMute);

// ========================================
// SOUND TRIGGERS
// ========================================

// Navigation button clicks (Section Sound - Spacey)
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener('click', function() {
    playSound(sectionSound);
  });
}

// Sidebar toggle (Sidebar Sound - Button)
sidebarBtn.addEventListener('click', function() {
  playSound(sidebarSound);
});

// Modal open/close (General Sound)
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener('click', function() {
    playSound(generalSound);
  });
}

modalCloseBtn.addEventListener('click', function() {
  playSound(generalSound);
});

overlay.addEventListener('click', function() {
  playSound(generalSound);
});

// Skill tag hovers (Sidebar Sound - Button)
document.querySelectorAll('.skill-tag').forEach(function(tag) {
  tag.addEventListener('mouseenter', function() {
    playSound(sidebarSound);
  });
});

// Tech tag hovers (Sidebar Sound - Button)
document.querySelectorAll('.tech-tag').forEach(function(tag) {
  tag.addEventListener('mouseenter', function() {
    playSound(sidebarSound);
  });
});

// Project card clicks (General Sound)
document.querySelectorAll('.project-item').forEach(function(item) {
  item.addEventListener('click', function() {
    playSound(generalSound);
  });
});

// Service item clicks (General Sound)
document.querySelectorAll('.service-item').forEach(function(item) {
  item.addEventListener('click', function() {
    playSound(generalSound);
  });
});

// Social links (Sidebar Sound - Button)
document.querySelectorAll('.social-link').forEach(function(link) {
  link.addEventListener('click', function() {
    playSound(sidebarSound);
  });
});

// Contact items (Sidebar Sound - Button)
document.querySelectorAll('.contact-item a').forEach(function(link) {
  link.addEventListener('click', function() {
    playSound(sidebarSound);
  });
});

// Contact items hover (Sidebar Sound - Button)
document.querySelectorAll('.contact-item').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    playSound(sidebarSound);
  });
});

// Social links hover (Sidebar Sound - Button)
document.querySelectorAll('.social-item').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    playSound(sidebarSound);
  });
});

// Service items hover (General Sound)
document.querySelectorAll('.service-item').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    playSound(generalSound);
  });
});

// Skill category clicks (General Sound)
document.querySelectorAll('.skill-category').forEach(function(item) {
  item.addEventListener('click', function() {
    playSound(generalSound);
  });
});

// Skill category hover (General Sound)
document.querySelectorAll('.skill-category').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    playSound(generalSound);
  });
});

// Project items hover (General Sound)
document.querySelectorAll('.project-item').forEach(function(item) {
  item.addEventListener('mouseenter', function() {
    playSound(generalSound);
  });
});

// Project publication link click (Sidebar Sound - Button)
document.querySelectorAll('.project-publication-link').forEach(function(link) {
  link.addEventListener('click', function() {
    playSound(sidebarSound);
  });
});

// Highlight words hover - trigger on paragraph hover (Skill Sound - Glass)
document.querySelectorAll('.about-text p').forEach(function(paragraph) {
  let soundPlayed = false;

  paragraph.addEventListener('mouseenter', function() {
    if (!soundPlayed && this.querySelector('.highlight-word')) {
      playSound(skillSound);
      soundPlayed = true;
    }
  });

  paragraph.addEventListener('mouseleave', function() {
    soundPlayed = false;
  });
});

// Highlight words in experience achievements - trigger on list item hover (Skill Sound - Glass)
document.querySelectorAll('.timeline-achievements li').forEach(function(listItem) {
  let soundPlayed = false;

  listItem.addEventListener('mouseenter', function() {
    if (!soundPlayed && this.querySelector('.highlight-word')) {
      playSound(skillSound);
      soundPlayed = true;
    }
  });

  listItem.addEventListener('mouseleave', function() {
    soundPlayed = false;
  });
});

// Coursework tag hovers (Sidebar Sound - Button)
document.querySelectorAll('.coursework-tag').forEach(function(tag) {
  tag.addEventListener('mouseenter', function() {
    playSound(sidebarSound);
  });
});

// Tech stack tag hovers (Sidebar Sound - Button)
document.querySelectorAll('.tech-stack-tag').forEach(function(tag) {
  tag.addEventListener('mouseenter', function() {
    playSound(sidebarSound);
  });
});



// ========================================
// TYPEWRITER EFFECT FOR SECTION TITLES
// ========================================

// Function to create typewriter effect
function typeWriter(element, text, speed, callback) {
  let i = 0;
  element.setAttribute('data-original-text', text);
  element.textContent = '';

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  type();
}

// Intersection Observer to trigger typewriter when section is visible
const typewriterObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
      const title = entry.target;
      const originalText = title.textContent;

      // Mark as typed to prevent re-typing
      title.setAttribute('data-typed', 'true');

      // Start typewriter effect
      typeWriter(title, originalText, 80);
    }
  });
}, {
  threshold: 0.5 // Trigger when 50% of the title is visible
});

// Observe all article titles
document.querySelectorAll('.article-title').forEach(function(title) {
  typewriterObserver.observe(title);
});

// Observe section headings (Education, Experience, etc.)
document.querySelectorAll('.h3').forEach(function(heading) {
  typewriterObserver.observe(heading);
});

// Typewriter for About section paragraphs (sequential) - REMOVED

// Typewriter for project details
const projectDetailsObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
      const projectDetails = entry.target;
      const listItems = projectDetails.querySelectorAll('li');

      // Mark as typed
      projectDetails.setAttribute('data-typed', 'true');

      // Type each detail item sequentially
      function typeNextDetail(index) {
        if (index < listItems.length) {
          const item = listItems[index];
          const originalText = item.textContent;

          // Make item visible before typing
          item.classList.add('typing');

          typeWriter(item, originalText, 5, function() {
            typeNextDetail(index + 1);
          });
        }
      }

      typeNextDetail(0);
    }
  });
}, {
  threshold: 0.3
});

// Observe project details
document.querySelectorAll('.project-details').forEach(function(details) {
  projectDetailsObserver.observe(details);
});

// Typewriter for timeline text (Education coursework & Experience details) - REMOVED


// ========================================
// SCROLL SOUND EFFECT
// ========================================

let lastScrollPosition = 0;
let scrollAccumulator = 0;
let lastScrollTime = 0;

// Detect if device is mobile
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

// Adjust threshold and throttle based on device
// Mobile needs much higher threshold to prevent multiple sounds per swipe
const scrollThreshold = isMobile ? 800 : 150; // Minimum scroll distance (pixels) to trigger sound
const scrollThrottle = isMobile ? 500 : 200; // Minimum time between scroll sounds in milliseconds

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
    scrollAccumulator = 0; // Reset accumulator
    lastScrollTime = now;
  }

  // Reset accumulator if user stops scrolling for a moment
  clearTimeout(window.scrollResetTimeout);
  window.scrollResetTimeout = setTimeout(function() {
    scrollAccumulator = 0;
  }, 300);
}, { passive: true });