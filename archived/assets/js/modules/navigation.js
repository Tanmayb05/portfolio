// ========================================
// PAGE NAVIGATION
// ========================================

let navigationLinks = null;

// Initialize page navigation
export function initNavigation() {
  // Page navigation variables
  navigationLinks = document.querySelectorAll("[data-nav-link]");
  const pages = document.querySelectorAll("[data-page]");

  console.log('Navigation initialized:', navigationLinks.length, 'links,', pages.length, 'pages');

  // Add event to all nav links
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

export function getNavigationLinks() {
  return navigationLinks || document.querySelectorAll("[data-nav-link]");
}
