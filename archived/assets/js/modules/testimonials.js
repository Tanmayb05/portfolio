// ========================================
// TESTIMONIALS MODAL
// ========================================

let testimonialsItem = null;
let modalContainer = null;
let modalCloseBtn = null;
let overlay = null;
let modalImg = null;
let modalTitle = null;
let modalText = null;

// Initialize testimonials modal
export function initTestimonials() {
  // Testimonials variables
  testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
  modalContainer = document.querySelector("[data-modal-container]");
  modalCloseBtn = document.querySelector("[data-modal-close-btn]");
  overlay = document.querySelector("[data-overlay]");

  // Modal variables
  modalImg = document.querySelector("[data-modal-img]");
  modalTitle = document.querySelector("[data-modal-title]");
  modalText = document.querySelector("[data-modal-text]");

  // Modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // Add click event to all modal items
  for (let i = 0; i < testimonialsItem.length; i++) {
    testimonialsItem[i].addEventListener("click", function () {
      modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
      modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
      modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
      modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

      testimonialsModalFunc();
    });
  }

  // Add click event to modal close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }

  if (overlay) {
    overlay.addEventListener("click", testimonialsModalFunc);
  }
}

export function getModalCloseBtn() {
  return modalCloseBtn;
}

export function getOverlay() {
  return overlay;
}

export function getTestimonialsItem() {
  return testimonialsItem;
}
