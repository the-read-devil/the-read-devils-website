// Accessibility and interaction enhancements

// Update year
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const primaryMenu = document.getElementById('primary-menu');
if (navToggle && primaryMenu) {
  const media = window.matchMedia('(max-width: 1200px)');

  const applyHiddenForViewport = () => {
    const isMobile = media.matches;
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    if (isMobile) {
      // Drive visibility via CSS; keep hidden attribute off to avoid layout jumps
      document.body.classList.toggle('menu-open', expanded);
    } else {
      // On desktop, ensure menu is always visible and toggle is reset
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      document.body.classList.remove('menu-open');
    }
  };

  const closeOnEscape = (e) => {
    if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      applyHiddenForViewport();
      navToggle.focus();
    }
  };

  // Initialize state
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
  applyHiddenForViewport();

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    applyHiddenForViewport();
  });

  media.addEventListener('change', applyHiddenForViewport);
  document.addEventListener('keydown', closeOnEscape);

  // Close menu when a link is clicked
  primaryMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      applyHiddenForViewport();
    });
  });
}

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

// Keep title-wrap height equal to hero height
const heroSection = document.querySelector('.hero');
const titleWrap = document.querySelector('.hero .title-wrap');
if (heroSection && titleWrap) {
  let rafId = 0;
  const setTitleWrapHeight = () => {
    const height = Math.round(heroSection.getBoundingClientRect().height);
    titleWrap.style.minHeight = `${height}px`;
  };
  const schedule = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(setTitleWrapHeight);
  };

  // Initial sync after layout and when fonts/images finish loading
  schedule();
  window.addEventListener('load', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });

  if (window.ResizeObserver) {
    const ro = new ResizeObserver(schedule);
    ro.observe(heroSection);
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule).catch(() => {});
  }
}

