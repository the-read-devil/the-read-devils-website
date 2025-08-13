// Accessibility and interaction enhancements

// Update year
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Hide/show floating CTA based on hero visibility
const fab = document.querySelector('.cta-fab');
const hero = document.querySelector('.hero');
if (window.IntersectionObserver && fab && hero) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      fab.style.display = entry.isIntersecting ? 'none' : 'block';
    });
  }, { threshold: 0.2 });
  observer.observe(hero);
}

// Respect reduced motion for anchor scrolling
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  document.documentElement.style.scrollBehavior = 'auto';
}

// Enhance anchor focus management
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    try {
      const target = id && id !== '#' ? document.querySelector(id) : null;
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
        if (!prefersReducedMotion) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          target.focus({ preventScroll: true });
        }
      }
    } catch { /* no-op */ }
  });
});

