document.addEventListener('DOMContentLoaded', () => {
  // Nav scroll background transition
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // Hero subtle parallax
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = `translateY(${y * 0.22}px)`;
      }
    }, { passive: true });
  }

  // Reveal elements on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

  // Hamburger Mobile Menu
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function toggleMenu(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle('active', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileMenu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      toggleMenu(!mobileMenu.classList.contains('open'));
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => toggleMenu(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // Fullscreen Intro Splash Transition (4-second duration)
  const splash = document.getElementById('intro-splash');
  if (splash) {
    document.body.style.overflow = 'hidden';
    function dismissSplash() {
      if (!splash.classList.contains('fade-out')) {
        splash.classList.add('fade-out');
        document.body.style.overflow = '';
      }
    }
    splash.addEventListener('click', dismissSplash);
    splash.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') dismissSplash();
    });
    window.addEventListener('wheel', dismissSplash, { once: true, passive: true });
    window.addEventListener('touchmove', dismissSplash, { once: true, passive: true });
    setTimeout(dismissSplash, 4000);
  }
});
