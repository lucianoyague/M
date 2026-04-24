/* =============================================
   app.js — Para Milagros
   Interactividad: pétalos, cursor, galería,
   razones flip, juego, modal de fotos
   ============================================= */

// ── 1. Cursor personalizado ───────────────────
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  setTimeout(() => {
    cursorTrail.style.left = e.clientX + 'px';
    cursorTrail.style.top  = e.clientY + 'px';
  }, 80);
});


// ── 2. Latas de Coca-Cola flotantes ──────────
const petalsContainer = document.getElementById('petals');

const COKE_GIFS = [
  'https://www.gifsanimados.org/data/media/433/coca-cola-imagen-animada-0001.gif" border="0" alt="coca-cola-imagen-animada-0001',
  'https://www.gifsanimados.org/data/media/433/coca-cola-imagen-animada-0001.gif" border="0" alt="coca-cola-imagen-animada-0001',
  'https://www.gifsanimados.org/data/media/433/coca-cola-imagen-animada-0001.gif" border="0" alt="coca-cola-imagen-animada-0001',
];

function createCan() {
  const el = document.createElement('img');
  el.classList.add('petal');
  el.src = COKE_GIFS[Math.floor(Math.random() * COKE_GIFS.length)];
  el.style.left     = Math.random() * 100 + 'vw';
  el.style.width    = (40 + Math.random() * 30) + 'px';
  el.style.opacity  = 0.6 + Math.random() * 0.3;
  const duration = 6 + Math.random() * 10;
  el.style.animationDuration = duration + 's';
  el.style.animationDelay   = Math.random() * 5 + 's';
  petalsContainer.appendChild(el);
  setTimeout(() => el.remove(), (duration + 5) * 1000);
}

setInterval(createCan, 800);
for (let i = 0; i < 6; i++) createCan();
// ── 3. Scroll reveal ─────────────────────────
const revealEls = document.querySelectorAll(
  '.photo-card, .reason-card, .letter, .game-wrap, .section-title, .section-label'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = (i * 0.06) + 's';
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));


// ── 4. Botón entrar (scroll suave) ───────────
document.getElementById('enterBtn').addEventListener('click', () => {
  document.getElementById('galeria').scrollIntoView({ behavior: 'smooth' });
});


// ── 5. Modal de fotos ─────────────────────────
const photoModal      = document.getElementById('photoModal');
const photoModalImg   = document.getElementById('photoModalImg');
const photoModalMsg   = document.getElementById('photoModalMsg');
const photoModalClose = document.getElementById('photoModalClose');

document.querySelectorAll('.photo-card').forEach(card => {
  card.addEventListener('click', () => {
    const img = card.querySelector('img');
    const msg = card.dataset.msg;

    // Solo abrir si hay foto real cargada
    if (img && !card.querySelector('.photo-frame').classList.contains('no-photo')) {
      photoModalImg.src = img.src;
      photoModalMsg.textContent = msg;
      photoModal.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  });
});

photoModalClose.addEventListener('click', closePhotoModal);
photoModal.addEventListener('click', e => {
  if (e.target === photoModal) closePhotoModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closePhotoModal();
});

function closePhotoModal() {
  photoModal.classList.remove('show');
  document.body.style.overflow = '';
}


// ── 6. Flip de razones ────────────────────────
document.querySelectorAll('.reason-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('flipped');
  });
});


// ── 7. Ramo de flores ─────────────────────────
const bouquetSvg = document.getElementById('bouquetSvg');
const bouquetBtn = document.getElementById('bouquetBtn');
const bouquetMsg = document.getElementById('bouquetMsg');

const flowerMsgs = [
  'Pedacito de mierda',
  'Te amo wey',
  'Re gay 🌹',
];

bouquetBtn.addEventListener('click', () => {
  // Forzar visibilidad de todos los pétalos directamente
  document.querySelectorAll('.flower .petals-group').forEach((g, i) => {
    setTimeout(() => {
      g.style.transform = 'scale(1)';
      g.style.transition = 'transform 0.6s cubic-bezier(0.34,1.56,0.64,1)';
    }, 500 + i * 150);
  });

  document.querySelectorAll('.flower circle').forEach((c, i) => {
    setTimeout(() => {
      c.style.transform = 'scale(1)';
      c.style.transition = 'transform 0.4s ease';
    }, 900 + i * 150);
  });

  document.querySelectorAll('.stem').forEach((s, i) => {
    setTimeout(() => {
      s.style.strokeDashoffset = '0';
      s.style.transition = 'stroke-dashoffset 0.8s ease';
    }, i * 100);
  });

  document.querySelectorAll('.leaf').forEach((l, i) => {
    setTimeout(() => {
      l.style.transform = 'scale(1)';
      l.style.transition = 'transform 0.5s ease';
    }, 400 + i * 100);
  });

  bouquetBtn.disabled = true;
  bouquetBtn.innerHTML = '<span>💐 ¡Florecido!</span>';

  setTimeout(() => {
    const msgs = ['Re putete', 'Wooooots', 'Ahi va'];
    bouquetMsg.textContent = msgs[Math.floor(Math.random() * msgs.length)];
    bouquetMsg.classList.add('show');
    for (let i = 0; i < 15; i++) setTimeout(() => spawnHeart(), i * 120);
  }, 1800);
});

// ── Consola ───────────────────────────────────
console.log('%c Mila & Luchi', 'color: #c8607a62; font-size: 14px; font-style: italic;');

// ── SUBIR FOTOS DESDE EL DISPOSITIVO ─────────
const photoUpload = document.getElementById('photoUpload');
const gallery     = document.getElementById('gallery');

const CAPTIONS = [
  '',
  '🌹',
  '✨',
  '💖',
  '🌸',
];

photoUpload.addEventListener('change', (e) => {
  const files = Array.from(e.target.files).slice(0, 5);

  files.forEach((file, i) => {
    if (!file.type.startsWith('image/')) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      const card = document.createElement('div');
      card.classList.add('photo-card', 'uploaded');
      card.dataset.msg = 'Muy buena';
      card.style.animationDelay = `${i * 0.1}s`;

      card.innerHTML = `
        <div class="photo-frame">
          <img src="${ev.target.result}" alt="Nuestra foto" />
        </div>
        <div class="photo-caption">${CAPTIONS[i % CAPTIONS.length]}</div>
      `;

      // Click para abrir modal
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        photoModalImg.src = img.src;
        photoModalMsg.textContent = card.dataset.msg;
        photoModal.classList.add('show');
        document.body.style.overflow = 'hidden';
      });

      gallery.appendChild(card);

      // Aplicar scroll reveal
      observer.observe(card);
    };

    reader.readAsDataURL(file);
  });

  // Limpiar input para poder subir las mismas fotos de nuevo
  photoUpload.value = '';
});