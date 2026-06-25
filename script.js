const themeToggle = document.querySelector('.theme-toggle');
const themeLabel = document.querySelector('.theme-toggle__label');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;



function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
}

function loadTheme() {
  const stored = localStorage.getItem('preferred-theme');
  if (stored) {
    applyTheme(stored);
    return;
  }
  applyTheme(prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const nextTheme = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem('preferred-theme', nextTheme);
  applyTheme(nextTheme);
}

function initReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  reveals.forEach((item) => observer.observe(item));
}

themeToggle.addEventListener('click', toggleTheme);
loadTheme();
initReveal();
