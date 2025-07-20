// Section Transition Utility
// This file handles the intersection observer for smooth section transitions

class SectionTransitions {
  constructor() {
    this.observer = null;
    this.init();
  }

  init() {
    // Check if IntersectionObserver is supported
    if (!("IntersectionObserver" in window)) {
      this.fallback();
      return;
    }

    // Create intersection observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px", // Start animation slightly before element comes into view
      }
    );

    // Observe all elements with section-transition class
    this.observeElements();
  }

  observeElements() {
    const elements = document.querySelectorAll(".section-transition");
    elements.forEach((element) => {
      this.observer.observe(element);
    });
  }

  // Fallback for browsers without IntersectionObserver
  fallback() {
    const elements = document.querySelectorAll(".section-transition");
    elements.forEach((element) => {
      element.classList.add("in-view");
    });
  }

  // Method to add transition to new elements (for dynamic content)
  addElement(element) {
    if (this.observer) {
      this.observer.observe(element);
    } else {
      element.classList.add("in-view");
    }
  }

  // Method to remove element from observation
  removeElement(element) {
    if (this.observer) {
      this.observer.unobserve(element);
    }
  }

  // Destroy observer
  destroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    window.sectionTransitions = new SectionTransitions();
  });
} else {
  window.sectionTransitions = new SectionTransitions();
}

// Export for use in other modules
export default SectionTransitions;
