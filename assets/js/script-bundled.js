// ========================================
// PORTFOLIO SCRIPT - BUNDLED VERSION
// All modules combined for file:// protocol compatibility
// ========================================

'use strict';

// ========================================
// UTILITY FUNCTIONS
// ========================================

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(function() {
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

// ========================================
// SIDEBAR
// ========================================

function initSidebar() {
  const sidebar = document.querySelector("[data-sidebar]");
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }
}

function fixIonIconTooltips() {
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
}

// ========================================
// TESTIMONIALS MODAL
// ========================================

let testimonialsItem = null;
let modalContainer = null;
let modalCloseBtn = null;
let overlay = null;

function initTestimonials() {
  testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  modalContainer = document.querySelector("[data-modal-container]");
  modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  overlay = document.querySelector("[data-overlay]");

  const modalImg = document.querySelector("[data-modal-img]");
  const modalTitle = document.querySelector("[data-modal-title]");
  const modalText = document.querySelector("[data-modal-text]");

  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }

  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }
}

// ========================================
// CONTACT FORM VALIDATION
// ========================================

function initContactForm() {
  const form = document.querySelector("[data-form]");
  const formInputs = document.querySelectorAll("[data-form-input]");
  const formBtn = document.querySelector("[data-form-btn]");

  for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
      if (form.checkValidity()) {
        formBtn.removeAttribute("disabled");
      } else {
        formBtn.setAttribute("disabled", "");
      }
    });
  }
}

// ========================================
// PAGE NAVIGATION
// ========================================

let navigationLinks = null;

function initNavigation() {
  navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  console.log('Navigation initialized:', navigationLinks.length, 'links,', pages.length, 'pages');

  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
      const clickedPage = this.innerHTML.toLowerCase().trim();
      console.log('Clicked page:', clickedPage);

      // Remove active class from all pages and nav links
      for (let j = 0; j < pages.length; j++) {
        pages[j].classList.remove("active");
      }
      for (let j = 0; j < navigationLinks.length; j++) {
        navigationLinks[j].classList.remove("active");
      }

      // Add active class to matching page and clicked nav link
      let found = false;
      for (let j = 0; j < pages.length; j++) {
        console.log('Checking:', pages[j].dataset.page, '===', clickedPage);
        if (clickedPage === pages[j].dataset.page) {
          console.log('MATCH FOUND! Activating page:', pages[j].dataset.page);
          pages[j].classList.add("active");
          navigationLinks[i].classList.add("active");
          window.scrollTo(0, 0);
          found = true;
          break;
        }
      }
      if (!found) {
        console.log('NO MATCH FOUND for:', clickedPage);
      }
    });
  }
}

// ========================================
// ANIMATIONS
// ========================================

function initArticleTitleGlow() {
  document.querySelectorAll('.article-title').forEach(function(title) {
    let hasGlowed = false;

    title.addEventListener('mouseenter', function() {
      if (!hasGlowed) {
        this.classList.add('glow-active');
        hasGlowed = true;

        setTimeout(function() {
          title.classList.remove('glow-active');
          hasGlowed = false;
        }, 5000);
      }
    });
  });
}

// ========================================
// TYPEWRITER EFFECT
// ========================================

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

function initTypewriter() {
  const typewriterObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
        const title = entry.target;
        const originalText = title.textContent;

        title.setAttribute('data-typed', 'true');
        typeWriter(title, originalText, 80);
      }
    });
  }, {
    threshold: 0.5
  });

  document.querySelectorAll('.article-title').forEach(function(title) {
    typewriterObserver.observe(title);
  });

  document.querySelectorAll('.h3').forEach(function(heading) {
    typewriterObserver.observe(heading);
  });

  const projectDetailsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting && !entry.target.hasAttribute('data-typed')) {
        const projectDetails = entry.target;
        const listItems = projectDetails.querySelectorAll('li');

        projectDetails.setAttribute('data-typed', 'true');

        function typeNextDetail(index) {
          if (index < listItems.length) {
            const item = listItems[index];
            const originalText = item.textContent;

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

  document.querySelectorAll('.project-details').forEach(function(details) {
    projectDetailsObserver.observe(details);
  });
}

// ========================================
// TRAVEL CARDS
// ========================================

function initTravelCards() {
  document.querySelectorAll('.travel-card').forEach(function(card) {
    const img = card.querySelector('.travel-image');
    const greyscaleSrc = img.src;
    const colorSrc = img.getAttribute('data-color-src');

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

// ========================================
// SOUND SYSTEM
// ========================================

let isMuted = localStorage.getItem('soundMuted') === 'true';
let audioUnlocked = false;

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

function unlockAudio() {
  if (audioUnlocked) return;

  const sounds = [sectionSound, skillSound, sidebarSound, generalSound, scrollSound, mobileScrollSound];
  sounds.forEach(function(sound) {
    sound.play().then(function() {
      sound.pause();
      sound.currentTime = 0;
    }).catch(function() {});
  });

  audioUnlocked = true;
}

function playSound(audio) {
  if (isMuted) return;

  const sound = audio.cloneNode();
  sound.volume = audio.volume;
  sound.play().catch(function(error) {
    console.log('Audio play prevented:', error);
  });
}

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

function toggleMute(event) {
  event.stopPropagation();
  isMuted = !isMuted;
  localStorage.setItem('soundMuted', isMuted);
  updateMuteButton();

  if (!isMuted) {
    playSound(sectionSound);
  }
}

function initSoundSystem() {
  document.addEventListener('click', unlockAudio, { once: true });
  document.addEventListener('touchstart', unlockAudio, { once: true });
  document.addEventListener('keydown', unlockAudio, { once: true });

  // Set sounds to unmuted by default (no toggle button)
  isMuted = false;
  localStorage.setItem('soundMuted', false);
}

function initScrollSound() {
  let lastScrollPosition = 0;
  let scrollAccumulator = 0;
  let lastScrollTime = 0;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

  const scrollThreshold = isMobile ? 800 : 150;
  const scrollThrottle = isMobile ? 500 : 200;

  window.addEventListener('scroll', function() {
    if (isMobile) return;

    const now = Date.now();
    const currentScrollPosition = window.scrollY;
    const scrollDelta = Math.abs(currentScrollPosition - lastScrollPosition);

    scrollAccumulator += scrollDelta;
    lastScrollPosition = currentScrollPosition;

    if (scrollAccumulator >= scrollThreshold && now - lastScrollTime > scrollThrottle) {
      playSound(scrollSound);
      scrollAccumulator = 0;
      lastScrollTime = now;
    }

    clearTimeout(window.scrollResetTimeout);
    window.scrollResetTimeout = setTimeout(function() {
      scrollAccumulator = 0;
    }, 300);
  }, { passive: true });
}

// ========================================
// SOUND TRIGGERS
// ========================================

function initSoundTriggers() {
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");

  if (navigationLinks) {
    for (let i = 0; i < navigationLinks.length; i++) {
      navigationLinks[i].addEventListener('click', function() {
        playSound(sectionSound);
      });
    }
  }

  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', function() {
      playSound(sidebarSound);
    });
  }

  if (testimonialsItem) {
    for (let i = 0; i < testimonialsItem.length; i++) {
      testimonialsItem[i].addEventListener('click', function() {
        playSound(generalSound);
      });
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', function() {
      playSound(generalSound);
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function() {
      playSound(generalSound);
    });
  }

  document.querySelectorAll('.skill-tag').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.tech-tag').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.project-item').forEach(function(item) {
    item.addEventListener('click', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.service-item').forEach(function(item) {
    item.addEventListener('click', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.social-link').forEach(function(link) {
    link.addEventListener('click', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.contact-item a').forEach(function(link) {
    link.addEventListener('click', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.contact-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.social-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.service-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.skill-category').forEach(function(item) {
    item.addEventListener('click', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.skill-category').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.project-item').forEach(function(item) {
    item.addEventListener('mouseenter', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.project-publication-link').forEach(function(link) {
    link.addEventListener('click', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.travel-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      playSound(generalSound);
    });
  });

  document.querySelectorAll('.travel-card').forEach(function(card) {
    card.addEventListener('click', function() {
      playSound(sidebarSound);
    });
  });

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

  document.querySelectorAll('.coursework-tag').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
      playSound(sidebarSound);
    });
  });

  document.querySelectorAll('.tech-stack-tag').forEach(function(tag) {
    tag.addEventListener('mouseenter', function() {
      playSound(sidebarSound);
    });
  });
}

// ========================================
// THEME TOGGLE (Dark/Light Mode)
// ========================================

function initThemeToggle() {
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

// ========================================
// INITIALIZE ALL FEATURES
// ========================================

function init() {
  // Theme (must be first to avoid flash)
  initThemeToggle();

  // Core functionality
  initSidebar();
  initTestimonials();
  initContactForm();
  initNavigation();

  // Visual effects
  initArticleTitleGlow();
  initTypewriter();
  initTravelCards();

  // Sound system
  initSoundSystem();
  initScrollSound();
  initSoundTriggers();

  // Fixes
  fixIonIconTooltips();
}

// Run initialization when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
