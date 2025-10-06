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

// Initialize typewriter effects
export function initTypewriter() {
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
}
