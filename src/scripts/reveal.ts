// Scroll-reveal: replaces Framer Motion's `whileInView` + `viewport={{ once: true }}`.
// Elements carry `data-reveal="up|left|right|scale|fade"`; CSS holds the start state,
// this adds `.is-visible` once the element enters the viewport, then stops watching it.
const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

if (!('IntersectionObserver' in window)) {
  // No observer support: show everything rather than leaving the page blank.
  elements.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0 }
  );

  elements.forEach((el) => observer.observe(el));
}
