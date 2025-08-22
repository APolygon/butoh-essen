class SectionTransitions {
  constructor() {
    this.observer = null;
    this.init();
  }
  init() {
    if (!("IntersectionObserver" in window)) {
      this.fallback();
      return;
    }
    this.observer = new IntersectionObserver(
      (e) => {
        e.forEach((t) => {
          t.isIntersecting && t.target.classList.add("in-view");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    this.observeElements();
  }
  observeElements() {
    const e = document.querySelectorAll(".section-transition");
    e.forEach((t) => {
      this.observer.observe(t);
    });
  }
  fallback() {
    const e = document.querySelectorAll(".section-transition");
    e.forEach((t) => {
      t.classList.add("in-view");
    });
  }
  addElement(e) {
    this.observer ? this.observer.observe(e) : e.classList.add("in-view");
  }
  removeElement(e) {
    this.observer && this.observer.unobserve(e);
  }
  destroy() {
    this.observer && this.observer.disconnect();
  }
}
document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", () => {
      window.sectionTransitions = new SectionTransitions();
    })
  : (window.sectionTransitions = new SectionTransitions());
export default SectionTransitions;
