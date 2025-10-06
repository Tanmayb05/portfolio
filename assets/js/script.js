// ========================================
// PORTFOLIO MAIN SCRIPT
// ========================================

'use strict';

// Import all modules
import { initSidebar, fixIonIconTooltips } from './modules/sidebar.js';
import { initTestimonials } from './modules/testimonials.js';
import { initContactForm } from './modules/contact-form.js';
import { initNavigation } from './modules/navigation.js';
import { initArticleTitleGlow } from './modules/animations.js';
import { initTypewriter } from './modules/typewriter.js';
import { initTravelCards } from './modules/travel.js';
import { initSoundSystem, initScrollSound } from './modules/sound-system.js';
import { initSoundTriggers } from './modules/sound-triggers.js';

// Initialize all features
function init() {
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
