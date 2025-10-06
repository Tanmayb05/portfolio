// ========================================
// SOUND TRIGGERS
// ========================================

import { playSound, sectionSound, skillSound, sidebarSound, generalSound } from './sound-system.js';
import { getNavigationLinks } from './navigation.js';
import { getModalCloseBtn, getOverlay, getTestimonialsItem } from './testimonials.js';

export function initSoundTriggers() {
  const sidebarBtn = document.querySelector("[data-sidebar-btn]");
  const navigationLinks = getNavigationLinks();
  const modalCloseBtn = getModalCloseBtn();
  const overlay = getOverlay();
  const testimonialsItem = getTestimonialsItem();

  // Navigation button clicks (Section Sound - Spacey)
  for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
      playSound(sectionSound);
    });
  }

  // Sidebar toggle (Sidebar Sound - Button)
  if (sidebarBtn) {
    sidebarBtn.addEventListener('click', function() {
      playSound(sidebarSound);
    });
  }

  // Modal open/close (General Sound)
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener('click', function() {
      playSound(generalSound);
    });
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

  // Travel card hovers (General Sound)
  document.querySelectorAll('.travel-card').forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      playSound(generalSound);
    });
  });

  // Travel card clicks (Sidebar Sound - Button)
  document.querySelectorAll('.travel-card').forEach(function(card) {
    card.addEventListener('click', function() {
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
}
