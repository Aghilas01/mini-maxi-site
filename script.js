/* ================================================
   MINI MAXI — script.js
   Carrousel avec indicateurs + transition fluide
   ================================================ */

const images = [
  "https://via.placeholder.com/600x350/1e3a4f/ffffff?text=Mini+Maxi",
  "https://via.placeholder.com/600x350/c9833a/ffffff?text=Activit%C3%A9s",
  "https://via.placeholder.com/600x350/2d5269/ffffff?text=%C3%89v%C3%A9nements"
];

let index = 0;
let autoTimer = null;

/* --- Initialisation --- */
function initCarousel() {
  const dotsContainer = document.createElement('div');
  dotsContainer.id = 'carousel-dots';

  images.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  const carousel = document.querySelector('.carousel');
  if (carousel) carousel.insertAdjacentElement('afterend', dotsContainer);

  showImage();
  startAuto();
}

/* --- Affichage avec fondu --- */
function showImage() {
  const img = document.getElementById('carousel-img');
  if (!img) return;

  img.style.opacity = '0';
  setTimeout(() => {
    img.src = images[index];
    img.alt = 'Photo ' + (index + 1);
    img.style.opacity = '1';
  }, 200);

  updateDots();
}

function updateDots() {
  const dots = document.querySelectorAll('#carousel-dots span');
  dots.forEach((d, i) => d.classList.toggle('active', i === index));
}

/* --- Navigation --- */
function goTo(i) {
  index = (i + images.length) % images.length;
  showImage();
  resetAuto();
}

function nextSlide() { goTo(index + 1); }
function prevSlide()  { goTo(index - 1); }

/* --- Défilement automatique --- */
function startAuto() {
  autoTimer = setInterval(() => goTo(index + 1), 4000);
}
function resetAuto() {
  clearInterval(autoTimer);
  startAuto();
}

/* --- Swipe tactile --- */
(function () {
  let startX = 0;
  document.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  document.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 50) dx < 0 ? nextSlide() : prevSlide();
  });
})();

/* --- Lancement --- */
document.addEventListener('DOMContentLoaded', initCarousel);
