// Theme toggle
const btn = document.getElementById('themeBtn');
const icon = document.getElementById('themeIcon');
const moon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>';
const sun = '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';

btn.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  icon.innerHTML = isDark ? moon : sun;
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));

function closeMobile() { 
  mobileMenu.classList.remove('open'); 
}

// Form submission
const form = document.getElementById('contactForm');
const status = document.getElementById('form-status');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn2 = form.querySelector('.form-submit');
    const originalText = btn2.textContent;
    btn2.textContent = 'Enviando...';
    btn2.disabled = true;
    
    try {
      const r = await fetch(form.action, {
        method: 'POST', 
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (r.ok) {
        status.style.color = 'var(--accent)';
        status.textContent = '✓ Mensaje enviado. Te contactamos pronto.';
        form.reset();
      } else {
        status.style.color = '#ef4444';
        status.textContent = 'Error al enviar. Intentá de nuevo.';
      }
    } catch {
      status.style.color = '#ef4444';
      status.textContent = 'Error de conexión.';
    }
    
    btn2.textContent = originalText;
    btn2.disabled = false;
    
    // Clear status message after 5 seconds
    setTimeout(() => {
      status.textContent = '';
    }, 5000);
  });
}

// Nav active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => {
        a.style.color = '';
      });
      const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
      if (active && !active.classList.contains('nav-cta')) {
        active.style.color = 'var(--accent)';
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// Set initial theme icon based on data-theme
document.addEventListener('DOMContentLoaded', () => {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  icon.innerHTML = isDark ? sun : moon;
});