// ===================================
// LithoQuant - Main Script (Bento Refactor - cleaned)
// ===================================
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  });

  // Mobile menu toggle (guard for pages without hamburger)
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', function () {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // Active link highlighting
  const sections = document.querySelectorAll('section[id]');
  function highlightNavLink() {
    const pos = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.clientHeight;
      const id = section.getAttribute('id');
      if (pos >= top && pos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}` || link.getAttribute('href') === `index.html#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  if (sections.length) window.addEventListener('scroll', highlightNavLink);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
      }
    });
  });

  // Newsletter form - prevent reload (demo)
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input[type="email"]');
      const btn = this.querySelector('button');
      if (!input || !input.value) return;
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-check"></i> Subscribed';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled = false;
        input.value = '';
      }, 2500);
    });
  }
});

// ===================================
// Scroll Animations (Bento)
// ===================================
const observerOptions = { threshold: 0.12, rootMargin: '0px 0px -60px 0px' };
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function () {
  const animated = document.querySelectorAll(
    '.feature-card, .feature-item, .pillar, .capability-category, .screenshot-card, .featured-screenshot, .news-card, .gallery-item, .team-member-card, .partner-card, .stat-item, .bento-item'
  );
  animated.forEach(el => observer.observe(el));
});

const animStyle = document.createElement('style');
animStyle.textContent = `
  .feature-card, .feature-item, .pillar, .capability-category, .screenshot-card, .featured-screenshot,
  .news-card, .gallery-item, .team-member-card, .partner-card, .stat-item, .bento-item {
    opacity: 0; transform: translateY(18px);
    transition: opacity .55s ease, transform .55s cubic-bezier(.16,1,.3,1);
  }
  .feature-card.animate-in, .feature-item.animate-in, .pillar.animate-in, .capability-category.animate-in, .screenshot-card.animate-in, .featured-screenshot.animate-in,
  .news-card.animate-in, .gallery-item.animate-in, .team-member-card.animate-in, .partner-card.animate-in, .stat-item.animate-in, .bento-item.animate-in {
    opacity: 1; transform: translateY(0);
  }
`;
document.head.appendChild(animStyle);

// ===================================
// Statistics Counter
// ===================================
function animateCounter(element, target, duration = 1600) {
  let current = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target + '+';
      clearInterval(timer);
    } else element.textContent = Math.floor(current) + '+';
  }, 16);
}
const statsObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      entry.target.querySelectorAll('.stat-item strong').forEach(stat => {
        if (stat.dataset.noAnimate) return;
        const value = parseInt(stat.textContent.trim());
        if (!isNaN(value)) animateCounter(stat, value);
      });
      entry.target.dataset.animated = 'true';
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) statsObserver.observe(heroStats);
});

// ===================================
// Dynamic Comfort - scroll progress, back to top, greeting, ticker, filter, calm
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  // Scroll progress
  const progress = document.getElementById('scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  const onScroll = () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    if (progress) progress.style.width = scrolled + '%';
    if (backToTop) {
      if (window.scrollY > 600) backToTop.classList.add('is-visible');
      else backToTop.classList.remove('is-visible');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Hero greeting (time-aware)
  const greetingEl = document.getElementById('hero-greeting');
  if (greetingEl) {
    const h = new Date().getHours();
    const greet = h < 11 ? 'Good morning' : h < 15 ? 'Good afternoon' : h < 19 ? 'Good evening' : 'Good evening';
    greetingEl.innerHTML = `${greet}, explorer - <span>ready to log today?</span>`;
  }

  // Live ticker (simulated depth stream)
  const ticker = document.getElementById('ticker-track');
  if (ticker) {
    let depth = 2314.5;
    const mk = () => {
      depth += (Math.random() * 2 + 0.3);
      const gr = (30 + Math.random()*40).toFixed(1);
      const nphi = (0.12 + Math.random()*0.12).toFixed(2);
      const rhob = (2.25 + Math.random()*0.25).toFixed(2);
      const span = document.createElement('span');
      span.textContent = `⭢ ${depth.toFixed(1)}m  GR:${gr}  NPHI:${nphi}  RHOB:${rhob}`;
      ticker.appendChild(span);
      // keep 4 visible
      while (ticker.children.length > 4) ticker.removeChild(ticker.firstChild);
    };
    mk(); mk();
    setInterval(mk, 1600);
    // respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // slower
    }
  }

  // Comfort toggle - reduce motion
  const comfortToggle = document.getElementById('comfort-toggle');
  const comfortBar = document.getElementById('comfort-bar');
  const applyCalm = (on) => {
    document.documentElement.classList.toggle('reduce-motion', on);
    if (comfortToggle) comfortToggle.classList.toggle('is-active', on);
    try { localStorage.setItem('litho-calm', on ? '1' : '0'); } catch(e){}
  };
  // restore from storage or prefers-reduced-motion
  let wantCalm = false;
  try { wantCalm = localStorage.getItem('litho-calm') === '1'; } catch(e){}
  if (!wantCalm && window.matchMedia('(prefers-reduced-motion: reduce)').matches) wantCalm = true;
  if (wantCalm) applyCalm(true);
  if (comfortToggle) comfortToggle.addEventListener('click', () => {
    const isCalm = document.documentElement.classList.contains('reduce-motion');
    applyCalm(!isCalm);
  });
  // keyboard k for comfort
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      const target = document.querySelector('#features');
      if (target) window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

// ===================================
// Console Easter Egg (kept)
// ===================================
console.log('%c🚀 LithoQuant', 'color: #2563eb; font-size: 24px; font-weight: bold;');
console.log('%cComfort • Live tick • Filter', 'color: #10b981; font-size: 12px;');
