/* ═══════════════════════════════════════════════════════════════
   O3-BioTec — main.js
   Navbar scroll · Mobile menu · Scroll reveal · Counter animation
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll effect ──────────────────────────────────── */
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 40) {
        nav.classList.add('scrolled');
      } else {
        // Only remove on pages where nav starts transparent (hero page)
        if (document.querySelector('.hero')) {
          nav.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile hamburger menu ─────────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!nav.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  /* ── Scroll reveal (IntersectionObserver) ──────────────────── */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });
    reveals.forEach(el => observer.observe(el));
  }

  /* ── Counter animation for stat numbers ────────────────────── */
  const statNums = document.querySelectorAll('.stat-num span');
  if (statNums.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el    = entry.target;
          const target = parseInt(el.textContent, 10);
          const dur   = 1400;
          const step  = 16;
          const steps = dur / step;
          const inc   = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += inc;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = Math.floor(current);
            }
          }, step);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    statNums.forEach(el => counterObserver.observe(el));
  }

  /* ── Smooth scroll for anchor links ────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
        const top  = target.getBoundingClientRect().top + window.scrollY - navH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── Active nav link highlight ─────────────────────────────── */
  const sections = document.querySelectorAll('section[id]');
  if (sections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.querySelectorAll('.nav-links a').forEach(a => {
            a.classList.toggle('active',
              a.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => navObserver.observe(s));
  }

  /* ── Ferramenta card hover glow ────────────────────────────── */
  document.querySelectorAll('.ferramenta-card, .ferr-card-main').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ── Solucao card subtle parallax on hover ─────────────────── */
  document.querySelectorAll('.solucao-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-8px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform .4s ease, box-shadow .28s, border-color .28s';
    });
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform .15s ease, box-shadow .28s, border-color .28s';
    });
  });

  /* ── Step card stagger on scroll ───────────────────────────── */
  document.querySelectorAll('.step-card').forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.08}s`;
  });

  /* ── Hero badge pulse already handled in CSS ───────────────── */

  /* ── Hero title — keep 'transforma' static (no typing effect) ── */
  // Text is set in HTML, no JS manipulation needed.

});
