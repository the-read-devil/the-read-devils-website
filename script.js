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
  primaryMenu.setAttribute('aria-hidden', 'true');
  applyHiddenForViewport();

  const setMenuA11y = () => {
    const isMobile = media.matches;
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    primaryMenu.setAttribute('aria-hidden', String(isMobile ? !isOpen : false));
    try { primaryMenu.inert = isMobile ? !isOpen : false; } catch { /* inert not supported */ }
  };

  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.setAttribute('aria-label', expanded ? 'Open menu' : 'Close menu');
    applyHiddenForViewport();
    setMenuA11y();
  });

  media.addEventListener('change', applyHiddenForViewport);
  document.addEventListener('keydown', closeOnEscape);

  // Close menu when clicking outside the nav on mobile
  const navEl = document.querySelector('nav[aria-label="Primary"]');
  document.addEventListener('click', (event) => {
    if (!media.matches) return; // only on mobile/tablet widths
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (!isOpen) return;
    if (navEl && !navEl.contains(event.target)) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      applyHiddenForViewport();
    }
  });

  // Close menu when a link is clicked
  primaryMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
      applyHiddenForViewport();
      setMenuA11y();
    });
  });

  // Initialize a11y state once
  setMenuA11y();
}

// Ensure only one CTA is visible: hide header CTA while hero or invite CTA is in view
const hero = document.querySelector('.hero');
const invite = document.querySelector('#invite');
const navCta = document.querySelector('nav .menu-items .btn');
if (window.IntersectionObserver && navCta && (hero || invite)) {
  let heroInView = false;
  let inviteInView = false;
  const applyCtaVisibility = () => {
    const contentCtaVisible = heroInView || inviteInView;
    navCta.style.display = contentCtaVisible ? 'none' : '';
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.target === hero) heroInView = entry.isIntersecting;
      if (entry.target === invite) inviteInView = entry.isIntersecting;
    });
    applyCtaVisibility();
  }, { threshold: 0.2 });
  if (hero) observer.observe(hero);
  if (invite) observer.observe(invite);
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

// Keep title-wrap height equal to hero height and sync main padding to header
const heroSection = document.querySelector('.hero');
const titleWrap = document.querySelector('.hero .title-wrap');
const headerEl = document.querySelector('header');
const mainEl = document.querySelector('main');
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

// Sync --header-h CSS var and main padding to actual header height
if (headerEl && mainEl) {
  let rafId2 = 0;
  const syncHeaderSize = () => {
    const h = Math.round(headerEl.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-h', `${h}px`);
    mainEl.style.paddingTop = `${h}px`;
  };
  const schedule2 = () => {
    if (rafId2) cancelAnimationFrame(rafId2);
    rafId2 = requestAnimationFrame(syncHeaderSize);
  };
  schedule2();
  window.addEventListener('load', schedule2, { passive: true });
  window.addEventListener('resize', schedule2, { passive: true });
  window.addEventListener('orientationchange', schedule2, { passive: true });
  if (window.ResizeObserver) {
    const ro2 = new ResizeObserver(schedule2);
    ro2.observe(headerEl);
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(schedule2).catch(() => {});
  }
}

// Invite modal: open from any ".btn-invite" and provide copy + mailto actions
(() => {
  const EMAIL = 'support@thereaddevils.com';
  const DEFAULT_MAILTO = 'mailto:support@thereaddevils.com?subject=Request%20Invite%20-%20Read%20Devils&body=Name%3A%0ACity%3A%0AWhy%20I%20want%20to%20join%3A%0AFavorite%20book%20or%20film%3A%0AReferrer%20(if%20any)%3A';

  const modalOverlay = document.getElementById('invite-modal');
  if (!modalOverlay) return;
  const modal = modalOverlay.querySelector('.modal');
  const closeBtn = modalOverlay.querySelector('.modal-close');
  const copyBtn = modalOverlay.querySelector('.btn-copy-email');
  const sendLink = modalOverlay.querySelector('.btn-send-email');

  let previouslyFocused = null;

  const openModal = (mailtoHref) => {
    // Update mailto target
    sendLink.setAttribute('href', mailtoHref || DEFAULT_MAILTO);
    // Show modal
    previouslyFocused = document.activeElement;
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    // Focus first interactive element
    (copyBtn || closeBtn || modal).focus({ preventScroll: true });
    // Trap focus inside modal (basic)
    document.addEventListener('keydown', onKeyDown);
  };

  const closeModal = () => {
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onKeyDown);
    if (previouslyFocused && previouslyFocused.focus) {
      previouslyFocused.focus({ preventScroll: true });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
    }
    if (e.key === 'Tab') {
      // very small focus trap
      const focusables = modal.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // Wire openers
  document.querySelectorAll('.btn-invite').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      // Respect reduced motion users: no animation either way, but we still open modal
      e.preventDefault();
      const mailto = btn.getAttribute('data-mailto') || btn.getAttribute('href') || DEFAULT_MAILTO;
      openModal(mailto);
    });
  });

  // Close actions
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // Copy email address
  copyBtn && copyBtn.addEventListener('click', async () => {
    const email = copyBtn.getAttribute('data-email') || EMAIL;
    let copied = false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch { /* ignore */ }
    if (!copied) {
      const ta = document.createElement('textarea');
      ta.value = email;
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); copied = true; } catch { /* no-op */ }
      document.body.removeChild(ta);
    }
    const originalHTML = copyBtn.innerHTML;
    const originalAria = copyBtn.getAttribute('aria-label') || '';
    copyBtn.innerHTML = copied ? 'Copied!' : 'Copy failed';
    copyBtn.setAttribute('aria-label', copied ? 'Copied!' : 'Copy failed');
    setTimeout(() => {
      copyBtn.innerHTML = originalHTML;
      if (originalAria) copyBtn.setAttribute('aria-label', originalAria);
    }, 1500);
  });
})();

