/* ===========================
   PORTFOLIO SCRIPTS - Alex Rivera
=========================== */

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(8,11,20,0.97)';
    navbar.style.boxShadow = '0 4px 32px rgba(0,0,0,0.4)';
  } else {
    navbar.style.background = 'rgba(8,11,20,0.8)';
    navbar.style.boxShadow = 'none';
  }
});

// ---- Animated number counter ----
function animateCounter(el) {
  const isDecimal = el.getAttribute('data-decimal') === 'true';
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800;
  const start = performance.now();
  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = isDecimal ? (value / 100).toFixed(2) : value;
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isDecimal ? (target / 100).toFixed(2) : target;
  };
  requestAnimationFrame(step);
}

// ---- Scroll reveal observer ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

// ---- Proficiency bar observer ----
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.prof-fill').forEach(fill => {
        fill.classList.add('animated');
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// ---- Counter observer ----
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-num').forEach(animateCounter);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

// ---- Init on DOM ready ----
document.addEventListener('DOMContentLoaded', () => {

  // Add reveal class to animatable elements
  const animatables = [
    '#hero .hero-content',
    '#hero .hero-visual',
    '#about .about-text',
    '#about .about-card-stack',
    '#skills .section-tag',
    '#skills .section-title',
    '.skill-category',
    '.proficiency-section',
    '.project-card',
    '.contact-card',
    '.contact-form',
    'footer'
  ];

  document.querySelectorAll(animatables.join(', ')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    revealObserver.observe(el);
  });

  // Proficiency bars
  const profSection = document.querySelector('.proficiency-section');
  if (profSection) barObserver.observe(profSection);

  // Hero stats counter
  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) counterObserver.observe(heroStats);

  // ---- Active nav link highlight on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active-nav'));
        const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active-nav');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(sec => sectionObserver.observe(sec));

  // ---- Contact form ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = document.getElementById('submit-btn');
      btn.textContent = 'Sending… ✨';
      btn.disabled = true;
      btn.style.opacity = '0.7';

      setTimeout(() => {
        btn.textContent = 'Message Sent! 🎉';
        btn.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
        btn.style.opacity = '1';
        form.reset();

        setTimeout(() => {
          btn.textContent = 'Send Message 🚀';
          btn.style.background = '';
          btn.disabled = false;
        }, 3000);
      }, 1500);
    });
  }

  // ---- Tilt effect on project cards ----
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
      card.style.transform = `translateY(-6px) rotateX(${y}deg) rotateY(${x}deg)`;
      card.style.transition = 'transform 0.1s ease';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // ---- Avatar fallback if image missing ----
  const avatarImg = document.getElementById('avatar-img');
  if (avatarImg) {
    avatarImg.onerror = () => {
      avatarImg.style.display = 'none';
      const ring = avatarImg.closest('.avatar-ring');
      if (ring) {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          width:280px; height:280px; border-radius:50%;
          background: linear-gradient(135deg,#7c3aed,#06b6d4);
          display:flex; align-items:center; justify-content:center;
          font-size:5rem; position:relative; z-index:1;
        `;
        placeholder.textContent = 'AR';
        placeholder.style.fontFamily = 'Outfit, sans-serif';
        placeholder.style.fontWeight = '800';
        placeholder.style.color = '#fff';
        ring.appendChild(placeholder);
      }
    };
  }

  // ---- Cursor glow effect ----
  const glow = document.createElement('div');
  glow.style.cssText = `
    position:fixed; width:300px; height:300px;
    border-radius:50%; pointer-events:none; z-index:0;
    background:radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%);
    transform:translate(-50%,-50%);
    transition:left 0.15s ease, top 0.15s ease;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });

  // ---- Typewriter effect for subtitle ----
  const roles = [
    'ML & Data Science Enthusiast',
    'IIT Indore B.Tech Student',
    'Stock Market Analyst',
    'Deep Learning Developer',
    'Open-Source Builder',
  ];
  const typeEl = document.getElementById('typewriter-el');
  if (typeEl) {
    let roleIdx = 0;
    let charIdx = 0;
    let deleting = false;

    function type() {
      const current = roles[roleIdx];
      if (!deleting) {
        typeEl.textContent = current.slice(0, ++charIdx);
        if (charIdx === current.length) {
          deleting = true;
          setTimeout(type, 2200);
          return;
        }
      } else {
        typeEl.textContent = current.slice(0, --charIdx);
        if (charIdx === 0) {
          deleting = false;
          roleIdx = (roleIdx + 1) % roles.length;
        }
      }
      setTimeout(type, deleting ? 40 : 75);
    }
    type();
  }

});

// ---- Active nav style injection ----
const style = document.createElement('style');
style.textContent = `.nav-links a.active-nav { color: #f1f5f9 !important; }
.nav-links a.active-nav::after { transform: scaleX(1) !important; }`;
document.head.appendChild(style);
