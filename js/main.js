// ============================================
// PENDIDIKAN INKLUSI — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ── NAVBAR SCROLL ──
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
  });

  // ── MOBILE NAV TOGGLE ──
  const navToggle = document.getElementById('navToggle');
  const navLinksMenu = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    navLinksMenu.classList.toggle('open');
    const isOpen = navLinksMenu.classList.contains('open');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── ACTIVE NAV LINK ──
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  // ── TABS ──
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;

      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const targetContent = document.getElementById(`tab-${target}`);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });

  // ── SCROLL REVEAL ──
  const revealElements = document.querySelectorAll(
    '.pillar-card, .comp-card, .tool-card, .peran-card, ' +
    '.sh-card, .pasal-card, .para-item, .ss-card, ' +
    '.lsm-card, .def-card, .fi, .hcard, .section-header'
  );

  revealElements.forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 6) * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => observer.observe(el));

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.offsetTop - navHeight;
        window.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    });
  });

  // ── NAV TOGGLE ANIMATION ──
  navToggle.addEventListener('click', () => {
    const spans = navToggle.querySelectorAll('span');
    const isOpen = navLinksMenu.classList.contains('open');
    
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // ── HERO CARD STAGGER ──
  const hcards = document.querySelectorAll('.hcard');
  hcards.forEach((card, i) => {
    card.style.animationDelay = `${0.4 + i * 0.1}s`;
    card.style.animation = 'fadeUp 0.6s ease both';
  });

  // ── PROGRESS INDICATOR ──
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position: fixed;
    top: 0; left: 0;
    height: 2px;
    background: linear-gradient(90deg, #C8731A, #1A6B5A);
    z-index: 2000;
    transition: width 0.1s linear;
    width: 0%;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / docHeight) * 100;
    progressBar.style.width = `${Math.min(progress, 100)}%`;
  });

});