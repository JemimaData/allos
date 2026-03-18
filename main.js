// ============================================
// ALLOS ANAGKAZO — Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ——— NAVBAR scroll effect ———
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  // ——— Mobile menu ———
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = navToggle.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = navToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ——— Particles ———
  const container = document.getElementById('particles');
  if (container) {
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.left = Math.random() * 100 + '%';
      p.style.animationDuration = (8 + Math.random() * 15) + 's';
      p.style.animationDelay = (Math.random() * 15) + 's';
      p.style.width = p.style.height = (1 + Math.random() * 3) + 'px';
      p.style.opacity = Math.random() * 0.5;
      container.appendChild(p);
    }
  }

  // ——— Reveal on scroll ———
  const reveals = document.querySelectorAll('.reveal, .vision-card, .prog-card, .media-card, .contact-item');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  reveals.forEach((el, i) => {
    if (!el.classList.contains('reveal')) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.7s ease ${i * 0.1}s, transform 0.7s ease ${i * 0.1}s`;
    }
    observer.observe(el);
  });

  // Trigger hero reveals immediately
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 200);

  // ——— Counter animation ———
  const counters = document.querySelectorAll('.stat-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            el.textContent = target.toLocaleString('fr-FR');
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current).toLocaleString('fr-FR');
          }
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ——— Contact form ———
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Message envoyé ! ✓';
      btn.style.background = '#25D366';
      setTimeout(() => {
        btn.textContent = 'Envoyer le Message ✦';
        btn.style.background = '';
        form.reset();
      }, 4000);
    });
  }

  // ——— Smooth active nav link ———
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 200) {
        current = section.id;
      }
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.style.color = '';
      if (a.getAttribute('href') === '#' + current) {
        a.style.color = 'var(--gold)';
      }
    });
  });

});
