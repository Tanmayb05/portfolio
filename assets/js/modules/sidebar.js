// ========================================
// SIDEBAR
// ========================================

import { elementToggleFunc } from './utils.js';

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
export function initSidebar() {
  if (sidebarBtn) {
    sidebarBtn.addEventListener("click", function () {
      elementToggleFunc(sidebar);
    });
  }
}

// Fix ionicon tooltips - remove internal SVG titles to show custom tooltips
export function fixIonIconTooltips() {
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
