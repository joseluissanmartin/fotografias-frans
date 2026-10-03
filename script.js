// === Año dinámico en el footer ===
document.getElementById('year').textContent = new Date().getFullYear();

// === Número de WhatsApp del negocio (cámbialo por el real) ===
// Formato internacional sin "+", sin espacios. Ej: 56912345678
const WHATSAPP_NUMERO = '56989048554';

// === Enviar formulario por WhatsApp ===
function enviarPorWhatsApp(event) {
  event.preventDefault();

  const nombre = document.getElementById('f-nombre').value.trim();
  const colegio = document.getElementById('f-colegio').value.trim();
  const curso = document.getElementById('f-curso').value.trim();
  const mensaje = document.getElementById('f-mensaje').value.trim();

  let texto = `Hola! Soy ${nombre}.`;
  if (colegio) texto += ` Del colegio ${colegio}`;
  if (curso) texto += `, curso ${curso}`;
  texto += `. Quiero información sobre los cuadros de graduación.`;
  if (mensaje) texto += ` ${mensaje}`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// === Visor de galería (lightbox) ===
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function abrirVisor(src) {
  lightboxImg.src = src;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
}

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => abrirVisor(item.getAttribute('data-full')));
});

function cerrarVisor() {
  lightbox.hidden = true;
  lightboxImg.src = '';
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', cerrarVisor);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) cerrarVisor();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !lightbox.hidden) cerrarVisor();
});

// === Carrusel del hero ===
// Usa las mismas fotos de la galería: para agregar o quitar un cuadro,
// basta con editar la galería en index.html.
const INTERVALO_CARRUSEL = 4000; // milisegundos entre fotos

(function iniciarCarrusel() {
  const carrusel = document.getElementById('hero-carousel');
  const escenario = carrusel.querySelector('.carousel-stage');
  const primera = escenario.querySelector('.carousel-slide');
  const puntos = carrusel.querySelector('.carousel-dots');
  const fotos = [...document.querySelectorAll('.gallery-item')].map((item) => ({
    src: item.getAttribute('data-full'),
    alt: item.querySelector('img').alt,
  }));
  if (fotos.length < 2) return;

  // La foto que ya viene en el HTML va primero
  const inicio = fotos.findIndex((f) => primera.getAttribute('src') === f.src);
  if (inicio > 0) fotos.unshift(...fotos.splice(inicio, 1));

  // Las imágenes se crean vacías y se cargan justo antes de mostrarse
  const slides = fotos.map((foto, i) => {
    if (i === 0) return primera;
    const img = document.createElement('img');
    img.className = 'carousel-slide';
    img.alt = foto.alt;
    escenario.appendChild(img);
    return img;
  });
  const cargar = (i) => {
    if (!slides[i].getAttribute('src')) slides[i].src = fotos[i].src;
  };

  const dots = fotos.map((foto, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', foto.alt);
    dot.addEventListener('click', () => { mostrar(i); reiniciar(); });
    puntos.appendChild(dot);
    return dot;
  });

  let actual = 0;
  function mostrar(i) {
    actual = (i + slides.length) % slides.length;
    cargar(actual);
    cargar((actual + 1) % slides.length); // precarga la siguiente
    slides.forEach((img, j) => img.classList.toggle('is-active', j === actual));
    dots.forEach((dot, j) => dot.setAttribute('aria-current', j === actual));
  }

  const reduceMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let timer = null;
  const detener = () => { clearInterval(timer); timer = null; };
  const arrancar = () => {
    if (reduceMovimiento || timer) return;
    timer = setInterval(() => mostrar(actual + 1), INTERVALO_CARRUSEL);
  };
  const reiniciar = () => { detener(); arrancar(); };

  const prev = carrusel.querySelector('.carousel-prev');
  const next = carrusel.querySelector('.carousel-next');
  prev.hidden = false;
  next.hidden = false;
  prev.addEventListener('click', () => { mostrar(actual - 1); reiniciar(); });
  next.addEventListener('click', () => { mostrar(actual + 1); reiniciar(); });

  // Clic en la foto: se abre en grande en el visor
  escenario.addEventListener('click', () => abrirVisor(fotos[actual].src));

  // Pausa mientras el mouse está encima o la pestaña no se ve
  carrusel.addEventListener('mouseenter', detener);
  carrusel.addEventListener('mouseleave', arrancar);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) detener(); else arrancar();
  });

  // Deslizar con el dedo en el celular
  let toqueX = null;
  escenario.addEventListener('touchstart', (e) => { toqueX = e.touches[0].clientX; }, { passive: true });
  escenario.addEventListener('touchend', (e) => {
    if (toqueX === null) return;
    const dx = e.changedTouches[0].clientX - toqueX;
    toqueX = null;
    if (Math.abs(dx) > 40) { mostrar(actual + (dx < 0 ? 1 : -1)); reiniciar(); }
  });

  mostrar(0);
  arrancar();
})();
