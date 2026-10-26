/* ==========================================================
   1. CANVAS EFECTO MATRIX TRANSLÚCIDO
========================================================== */
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネハヒフヘホマミムメモヤユヨラリルレロワヲンABCDEF<>/{}=+*~#';
const fontSize = 16;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  const isLight = document.documentElement.getAttribute('data-bs-theme') === 'light';
  ctx.fillStyle = isLight ? 'rgba(244, 246, 250, 0.08)' : 'rgba(7, 9, 14, 0.08)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = isLight ? 'rgba(0, 143, 57, 0.22)' : 'rgba(0, 255, 102, 0.25)';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 40);

/* ==========================================================
   2. MODO DARK / LIGHT INTERACTIVO
========================================================== */
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-bs-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', newTheme);
  
  if (newTheme === 'light') {
    themeIcon.className = 'fa-solid fa-moon me-1 text-primary';
    themeText.textContent = 'Modo Oscuro';
  } else {
    themeIcon.className = 'fa-solid fa-sun me-1 text-warning';
    themeText.textContent = 'Modo Claro';
  }
}
themeToggleBtn.addEventListener('click', toggleTheme);

/* ==========================================================
   3. FILTRO DINÁMICO DE PROYECTOS (WEB, APP, DISEÑO)
========================================================== */
const filterButtons = document.querySelectorAll('.filter-btn');
const projectItems = document.querySelectorAll('.project-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    projectItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ==========================================================
   4. FORMULARIO DE CONTACTO & VALIDACIÓN & ENVÍO
========================================================== */
const contactForm = document.getElementById('contactForm');
const contactAlert = document.getElementById('contactAlert');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  if (!contactForm.checkValidity()) {
    e.stopPropagation();
    contactForm.classList.add('was-validated');
    return;
  }

  const formData = {
    name: document.getElementById('userName').value,
    email: document.getElementById('userEmail').value,
    phone: document.getElementById('userPhone').value,
    message: document.getElementById('userMessage').value,
    to_email: 'canibalherrera23@gmail.com'
  };

  console.log('Datos preparados para canibalherrera23@gmail.com:', formData);

  // Mostrar confirmación
  contactAlert.classList.remove('d-none');
  contactForm.reset();
  contactForm.classList.remove('was-validated');

  setTimeout(() => {
    contactAlert.classList.add('d-none');
  }, 6000);
});

/* ==========================================================
   5. BOTÓN VOLVER ARRIBA
========================================================== */
const btnBackToTop = document.getElementById('btnBackToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 350) {
    btnBackToTop.style.display = 'block';
  } else {
    btnBackToTop.style.display = 'none';
  }
});

btnBackToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});