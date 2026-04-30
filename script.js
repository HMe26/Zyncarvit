/* ============================================================
   ZYNCARVIT™ — Premium Veterinary Pharmaceutical Landing Page
   script.js — Advanced Interactions & Animation Engine
   ============================================================ */

'use strict';

/* ─── Utility: requestAnimationFrame polyfill ─── */
const raf = window.requestAnimationFrame || (cb => setTimeout(cb, 16));

/* ─── 1. PRELOADER ─── */
(function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const onLoad = () => {
    setTimeout(() => {
      preloader.classList.add('loaded');
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
      }, { once: true });
      // Trigger hero entrance after preloader
      triggerHeroEntrance();
    }, 900);
  };

  if (document.readyState === 'complete') {
    onLoad();
  } else {
    window.addEventListener('load', onLoad);
  }
})();

/* ─── 2. HERO ENTRANCE ANIMATION ─── */
function triggerHeroEntrance() {
  const elements = [
    { selector: '.hero-badge',       delay: 100 },
    { selector: '.hero-title',       delay: 250 },
    { selector: '.hero-subtitle',    delay: 400 },
    { selector: '.hero-description', delay: 550 },
    { selector: '.hero-cta',         delay: 700 },
    { selector: '.hero-stats',       delay: 850 },
    { selector: '.hero-visual',      delay: 600 },
    { selector: '.scroll-indicator', delay: 1100 },
  ];

  elements.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1), transform 0.9s cubic-bezier(0.4, 0, 0.2, 1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, delay);
  });
}

/* ─── 3. PARTICLE SYSTEM ─── */
(function initParticles() {
  const container = document.getElementById('particles-container');
  if (!container) return;

  const PARTICLE_COUNT = 38;
  const particles = [];

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const p = document.createElement('div');
    p.className = 'particle';

    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 18 + 12;
    const delay = Math.random() * 20;
    const left = Math.random() * 100;
    const opacity = Math.random() * 0.25 + 0.05;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
      opacity: ${opacity};
    `;

    container.appendChild(p);
    particles.push(p);
  }
})();

/* ─── 4. NAVBAR ─── */
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let lastScrollY = 0;
  let ticking = false;

  const update = () => {
    const y = window.scrollY;
    if (y > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScrollY = y;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      raf(update);
      ticking = true;
    }
  }, { passive: true });

  // Smooth anchor scroll
  document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      const offset = navbar.offsetHeight + 12;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
      // Close mobile menu if open
      const menu = document.querySelector('.nav-menu');
      const toggle = document.querySelector('.mobile-menu-toggle');
      if (menu) menu.classList.remove('mobile-open');
      if (toggle) toggle.classList.remove('active');
    });
  });
})();

/* ─── 5. MOBILE MENU ─── */
(function initMobileMenu() {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('mobile-open');
    toggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
})();

/* ─── 6. THEME TOGGLE ─── */
(function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const icon = btn?.querySelector('.theme-icon');
  if (!btn) return;

  const saved = localStorage.getItem('zyncarvit-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('zyncarvit-theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (icon) icon.textContent = theme === 'light' ? '🌙' : '☀';
  }
})();

/* ─── 7. TYPING ANIMATION ─── */
(function initTyping() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Advanced Metabolic & Vitality Support',
    'Pharmaceutical-Grade Formula',
    'Powering Vitality. Supporting Life.',
    'Engineered for Dogs & Cats',
    'Next-Generation Veterinary Science',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let pauseTimer = null;

  const TYPING_SPEED   = 55;
  const DELETING_SPEED = 28;
  const PAUSE_AFTER    = 2200;
  const PAUSE_BEFORE   = 350;

  function type() {
    const phrase = phrases[phraseIndex];

    if (!isDeleting) {
      el.textContent = phrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === phrase.length) {
        isDeleting = true;
        pauseTimer = setTimeout(type, PAUSE_AFTER);
        return;
      }
    } else {
      el.textContent = phrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        pauseTimer = setTimeout(type, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(type, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  // Start after preloader
  setTimeout(type, 1600);
})();

/* ─── 8. SCROLL REVEAL ─── */
(function initScrollReveal() {
  const addReveal = (selector, cls) => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add(cls);
      el.style.transitionDelay = `${(i % 6) * 90}ms`;
    });
  };

  addReveal('.summary-card',     'reveal');
  addReveal('.ingredient-card',  'reveal');
  addReveal('.timeline-item',    'reveal-left');
  addReveal('.indication-card',  'reveal-scale');
  addReveal('.marketing-card',   'reveal');
  addReveal('.kpi-card',         'reveal-scale');
  addReveal('.highlight-item',   'reveal');
  addReveal('.section-header',   'reveal');
  addReveal('.positioning-text p', 'reveal');
  addReveal('.technical-table-container', 'reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
})();

/* ─── 9. ANIMATED COUNTERS ─── */
(function initCounters() {
  function easeOutQuart(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animateCounter(el, target, duration = 1800) {
    const start = performance.now();
    const isFloat = String(target).includes('.');
    const decimals = isFloat ? 1 : 0;

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);
      const current = eased * target;
      el.textContent = current.toFixed(decimals);
      if (progress < 1) raf(() => step(performance.now()));
      else el.textContent = target;
    };
    raf(() => step(performance.now()));
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.getAttribute('data-target'));
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter, .stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });
})();

/* ─── 10. PROGRESS BARS ─── */
(function initProgressBars() {
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const progress = bar.getAttribute('data-progress');
      if (progress) {
        setTimeout(() => {
          bar.style.width = `${progress}%`;
        }, 300);
      }
      barObserver.unobserve(bar);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar').forEach(bar => {
    barObserver.observe(bar);
  });
})();

/* ─── 11. RIPPLE EFFECT on buttons ─── */
(function initRipple() {
  document.querySelectorAll('.ripple-effect').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const size = Math.max(rect.width, rect.height) * 2;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-circle';
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `;
      this.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
})();

/* ─── 12. 3D TILT EFFECT on ingredient cards ─── */
(function initTilt() {
  const TILT_AMOUNT = 10;

  document.querySelectorAll('.tilt-effect').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rotX = -dy * TILT_AMOUNT;
      const rotY = dx * TILT_AMOUNT;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
      card.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
})();

/* ─── 13. PARALLAX SCROLL ─── */
(function initParallax() {
  const heroSection = document.querySelector('.hero-section');
  const shapes = document.querySelectorAll('.shape');
  const heroVisual = document.querySelector('.hero-visual');

  if (!heroSection) return;

  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const heroH = heroSection.offsetHeight;
    const progress = Math.min(scrollY / heroH, 1);

    // Parallax floating shapes
    shapes.forEach((shape, i) => {
      const speed = (i + 1) * 0.18;
      const dir = i % 2 === 0 ? 1 : -1;
      shape.style.transform = `translateY(${scrollY * speed * dir}px) rotate(${scrollY * 0.05 * dir}deg)`;
    });

    // Hero visual subtle parallax
    if (heroVisual) {
      heroVisual.style.transform = `translateY(${scrollY * 0.12}px)`;
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      raf(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── 14. SMOOTH SECTION TRANSITIONS (active nav link) ─── */
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));

  // Inject active nav link style
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--text-accent) !important;
      background: var(--accent-soft);
    }
    .nav-link.active::after {
      width: 60% !important;
    }
  `;
  document.head.appendChild(style);
})();

/* ─── 15. ANIMATED SECTION DIVIDERS (wave morph) ─── */
(function initWaveMorph() {
  const paths = document.querySelectorAll('.section-divider path');
  if (!paths.length) return;

  const wavePaths = [
    "M0,50 Q300,0 600,50 T1200,50 L1200,100 L0,100 Z",
    "M0,40 Q200,80 500,35 T1200,55 L1200,100 L0,100 Z",
    "M0,60 Q400,10 700,55 T1200,45 L1200,100 L0,100 Z",
  ];

  paths.forEach((path, i) => {
    let frame = i;
    setInterval(() => {
      frame = (frame + 1) % wavePaths.length;
      path.setAttribute('d', wavePaths[frame]);
    }, 3000 + i * 700);
  });
})();

/* ─── 16. MAGNETIC BUTTON EFFECT on CTA buttons ─── */
(function initMagneticButtons() {
  const btns = document.querySelectorAll('.btn-primary, .btn-secondary');
  const STRENGTH = 0.22;

  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * STRENGTH;
      const dy = (e.clientY - cy) * STRENGTH;
      btn.style.transform = `translate(${dx}px, ${dy}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
})();

/* ─── 17. GRADIENT TEXT SHIMMER on hero title ─── */
(function initHeroShimmer() {
  const title = document.querySelector('.hero-title');
  if (!title) return;

  let angle = 135;
  const step = () => {
    angle = (angle + 0.15) % 360;
    title.style.backgroundImage = `linear-gradient(${angle}deg, #ffffff 0%, #a8d8f0 50%, #00d4ff 100%)`;
    raf(step);
  };
  raf(step);
})();

/* ─── 18. KPI CARD GLOW TRAIL on mouse move ─── */
(function initCardGlow() {
  const cards = document.querySelectorAll('.kpi-card, .summary-card, .marketing-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // Inject CSS for glow trail
  const style = document.createElement('style');
  style.textContent = `
    .kpi-card, .summary-card, .marketing-card {
      --mouse-x: 50%;
      --mouse-y: 50%;
    }
    .kpi-card::after,
    .summary-card::after,
    .marketing-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(
        circle 180px at var(--mouse-x) var(--mouse-y),
        rgba(0, 212, 255, 0.07),
        transparent 70%
      );
      border-radius: inherit;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 0;
    }
    .kpi-card:hover::after,
    .summary-card:hover::after,
    .marketing-card:hover::before {
      opacity: 1;
    }
  `;
  document.head.appendChild(style);
})();

/* ─── 19. STAGGER INGREDIENT CARD REVEAL ─── */
(function initIngredientStagger() {
  const cards = document.querySelectorAll('.ingredient-card');
  const observed = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed.has(entry.target)) {
        observed.add(entry.target);
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 55);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px) scale(0.96)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(card);
  });
})();

/* ─── 20. TIMELINE STEP-BY-STEP REVEAL ─── */
(function initTimelineReveal() {
  const items = document.querySelectorAll('.timeline-item');
  const seen = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        const idx = Array.from(items).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, idx * 120);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'opacity 0.7s ease, transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(item);
  });
})();

/* ─── 21. CURSOR GLOW FOLLOWER ─── */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

  const cursor = document.createElement('div');
  cursor.id = 'cursor-glow';
  cursor.style.cssText = `
    position: fixed;
    width: 280px;
    height: 280px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9997;
    transform: translate(-50%, -50%);
    transition: left 0.12s ease, top 0.12s ease;
    mix-blend-mode: screen;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
})();

/* ─── 22. NAVBAR LOGO PULSE on load ─── */
(function initLogoPulse() {
  const logo = document.querySelector('.logo-text');
  if (!logo) return;

  setTimeout(() => {
    logo.style.transition = 'filter 0.4s ease';
    logo.style.filter = 'drop-shadow(0 0 14px rgba(0,212,255,0.7))';
    setTimeout(() => {
      logo.style.filter = '';
    }, 600);
  }, 1200);
})();

/* ─── 23. SMOOTH SCROLL CTA BUTTONS ─── */
(function initCtaButtons() {
  const discoverBtn = document.querySelector('.btn-primary');
  const clinicalBtn = document.querySelector('.btn-secondary');

  if (discoverBtn) {
    discoverBtn.addEventListener('click', () => {
      const target = document.querySelector('#summary');
      if (target) {
        const offset = (document.getElementById('navbar')?.offsetHeight || 70) + 12;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  }

  if (clinicalBtn) {
    clinicalBtn.addEventListener('click', () => {
      const target = document.querySelector('#mechanism');
      if (target) {
        const offset = (document.getElementById('navbar')?.offsetHeight || 70) + 12;
        window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
      }
    });
  }
})();

/* ─── 24. SECTION BACKGROUND PARALLAX TINT ─── */
(function initSectionTints() {
  const sections = document.querySelectorAll('.section');
  let ticking = false;

  const update = () => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const progress = 1 - (rect.top / vh);
      const clamped = Math.max(0, Math.min(1, progress));
      // Very subtle luminance shift based on scroll position
      section.style.setProperty('--scroll-progress', clamped);
    });

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { raf(update); ticking = true; }
  }, { passive: true });
})();

/* ─── 25. INGREDIENT CARD ICON BOUNCE on hover ─── */
(function initIconBounce() {
  document.querySelectorAll('.ingredient-card').forEach(card => {
    const icon = card.querySelector('.ingredient-icon');
    if (!icon) return;

    card.addEventListener('mouseenter', () => {
      icon.style.animation = 'none';
      raf(() => {
        icon.style.animation = 'icon-bounce 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
      });
    });
  });

  const style = document.createElement('style');
  style.textContent = `
    @keyframes icon-bounce {
      0%   { transform: scale(1) translateY(0); }
      40%  { transform: scale(1.22) translateY(-6px); }
      70%  { transform: scale(0.95) translateY(2px); }
      100% { transform: scale(1.15) translateY(-4px); }
    }
  `;
  document.head.appendChild(style);
})();

/* ─── 26. TABLE ROW STAGGER ANIMATION ─── */
(function initTableAnimation() {
  const rows = document.querySelectorAll('.technical-table tbody tr');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        rows.forEach((row, i) => {
          row.style.opacity = '0';
          row.style.transform = 'translateX(-18px)';
          row.style.transition = `opacity 0.45s ease ${i * 60}ms, transform 0.45s ease ${i * 60}ms`;
          setTimeout(() => {
            row.style.opacity = '1';
            row.style.transform = 'translateX(0)';
          }, 100 + i * 60);
        });
        observer.disconnect();
      }
    });
  }, { threshold: 0.15 });

  const table = document.querySelector('.technical-table-container');
  if (table) observer.observe(table);
})();

/* ─── 27. FOOTER LINK HOVER FX ─── */
(function initFooterFx() {
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.letterSpacing = '0.06em';
    });
    link.addEventListener('mouseleave', () => {
      link.style.letterSpacing = '';
    });
  });
})();

/* ─── 28. SCROLL PROGRESS INDICATOR ─── */
(function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(90deg, #00d4ff, #0077ff);
    z-index: 9999;
    transition: width 0.1s linear;
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
  `;
  document.body.appendChild(bar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      raf(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        bar.style.width = `${progress}%`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── 29. DYNAMIC YEAR in footer ─── */
(function initFooterYear() {
  const yearEls = document.querySelectorAll('.footer-bottom p');
  yearEls.forEach(el => {
    el.innerHTML = el.innerHTML.replace(/2024/, new Date().getFullYear());
  });
})();

/* ─── 30. PERFORMANCE: Pause animations when tab is hidden ─── */
(function initVisibilityOptimization() {
  document.addEventListener('visibilitychange', () => {
    const particleContainer = document.getElementById('particles-container');
    if (!particleContainer) return;
    particleContainer.style.animationPlayState = document.hidden ? 'paused' : 'running';
  });
})();

/* ─── 31. INDICATION CARDS stagger reveal ─── */
(function initIndicationStagger() {
  const cards = document.querySelectorAll('.indication-card');
  const seen = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        const idx = Array.from(cards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, idx * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px) scale(0.95)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(card);
  });
})();

/* ─── 32. HIGHLIGHT ITEMS counter reveal in positioning section ─── */
(function initHighlightReveal() {
  const items = document.querySelectorAll('.highlight-item');
  const seen = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        const idx = Array.from(items).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, idx * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  items.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(16px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(item);
  });
})();

/* ─── END OF SCRIPT ─── */
console.log('%cZYNCARVIT™ — Script Engine Loaded', 'color: #00d4ff; font-family: monospace; font-size: 13px; font-weight: bold;');