/* ════════════════════════════════════════════
   VheLostCity — index.js
   ════════════════════════════════════════════ */

/* ── LOADER ─────────────────────────────────── */
const siteLoader = document.getElementById('siteLoader');
document.body.classList.add('loading');

function hideLoader() {
  if (siteLoader) siteLoader.classList.add('hidden');
  document.body.classList.remove('loading');
}

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(hideLoader, 5000);
});

/* ── CUSTOM CURSOR ───────────────────────────── */
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  if (cursor) {
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  }
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  if (ring) {
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
  }
  requestAnimationFrame(animRing);
})();

function cursorGrow() {
  if (cursor) { cursor.style.width = '6px';  cursor.style.height = '6px'; }
  if (ring)   { ring.style.width   = '54px'; ring.style.height   = '54px'; ring.style.opacity = '0.2'; }
}

function cursorShrink() {
  if (cursor) { cursor.style.width = '10px'; cursor.style.height = '10px'; }
  if (ring)   { ring.style.width   = '36px'; ring.style.height   = '36px'; ring.style.opacity = '0.4'; }
}

function attachCursorHover(el) {
  el.addEventListener('mouseenter', cursorGrow);
  el.addEventListener('mouseleave', cursorShrink);
}

document.querySelectorAll('a, button').forEach(attachCursorHover);

/* ── CURSOR COLOR ON DARK SECTION ────────────── */
const darkSection = document.querySelector('.statement-section');

if (darkSection && cursor && ring) {
  darkSection.addEventListener('mouseenter', () => {
    cursor.style.background  = '#ffffff';
    ring.style.borderColor   = '#ffffff';
  });
  darkSection.addEventListener('mouseleave', () => {
    cursor.style.background  = 'var(--ink)';
    ring.style.borderColor   = 'var(--ink)';
  });
}

/* ── NAV COLOR ON DARK SECTION ───────────────── */
const nav         = document.getElementById('mainNav');
const musicWrap   = document.querySelector('.music-toggle-wrap');

function checkNavColor() {
  if (!nav || !darkSection) return;
  const navRect     = nav.getBoundingClientRect();
  const sectionRect = darkSection.getBoundingClientRect();
  const isOverDark  = navRect.bottom > sectionRect.top && navRect.top < sectionRect.bottom;

  nav.classList.toggle('nav-white', isOverDark);
  if (musicWrap) musicWrap.classList.toggle('audio-white', isOverDark);
}

window.addEventListener('scroll', checkNavColor, { passive: true });
checkNavColor();

/* ── ACTIVE NAV ON SCROLL ────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
let ticking = false;

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateActiveNav();
      checkNavColor();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

updateActiveNav();

/* ── MARQUEE ─────────────────────────────────── */
const marqueeItems = [
  'New Arrivals',
  'Free Shipping Over $150',
  'SS25 Collection Live',
  'Worldwide Shipping',
  'Handcrafted Quality',
  'Limited Runs'
];

const marqueeTrack = document.getElementById('marqueeTrack');
if (marqueeTrack) {
  const repeated = [...marqueeItems, ...marqueeItems, ...marqueeItems, ...marqueeItems];
  repeated.forEach((txt, i) => {
    const span = document.createElement('span');
    const isDot = i % 2 === 1;
    span.className   = 'marquee-item' + (isDot ? ' marquee-dot' : '');
    span.textContent = isDot ? '·' : txt;
    marqueeTrack.appendChild(span);
  });
}

/* ── SCROLL REVEAL ───────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.15 });

function observeRevealEls() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

observeRevealEls();

/* ── PRODUCTS ────────────────────────────────── */
const products = [
  {
    name:        'Obsidian Hoodie',
    category:    'Outerwear',
    price:       125,
    image:       'https://via.placeholder.com/400x600',
    description: 'A heavyweight hoodie cut with a relaxed silhouette, dropped shoulders, and a washed obsidian tone designed for everyday wear.',
    fabric:      '100% Cotton Fleece',
    fit:         'Relaxed Fit',
    color:       'Obsidian Black',
    sizes:       'S, M, L, XL',
    code:        'VLC-OH-001'
  },
  {
    name:        'Ash Cargo Trousers',
    category:    'Bottoms',
    price:       95,
    image:       'https://via.placeholder.com/400x600',
    description: 'Structured cargo trousers with a straight-leg fit, utility pocket detailing, and a muted ash finish built for movement.',
    fabric:      'Cotton Twill Blend',
    fit:         'Straight Leg',
    color:       'Ash Grey',
    sizes:       '28, 30, 32, 34, 36',
    code:        'VLC-ACP-002'
  },
  {
    name:        'Noir Tee',
    category:    'Tops',
    price:       45,
    image:       'https://via.placeholder.com/400x600',
    description: 'A premium essential tee with a slightly oversized cut, soft hand feel, and deep noir tone for a minimal everyday look.',
    fabric:      '240 GSM Cotton Jersey',
    fit:         'Boxy Fit',
    color:       'Noir Black',
    sizes:       'S, M, L, XL',
    code:        'VLC-NT-003'
  }
];

function loadProducts() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  if (!products.length) {
    grid.innerHTML = '<p style="font-size:0.8rem;color:var(--ash);">No products available right now.</p>';
    return;
  }

  grid.innerHTML = products.map((p, i) => `
    <div class="collection-card reveal"
      style="transition-delay:${i * 0.1}s"
      data-name="${p.name}"
      data-category="${p.category}"
      data-price="${p.price}"
      data-image="${p.image}"
      data-description="${p.description}"
      data-fabric="${p.fabric}"
      data-fit="${p.fit}"
      data-color="${p.color}"
      data-sizes="${p.sizes}"
      data-code="${p.code}">
      <div class="card-img">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="card-overlay">
          <span class="card-overlay-text">Quick View</span>
        </div>
      </div>
      <div class="card-label">
        <div>
          <p class="card-name">${p.name}</p>
          <p class="card-tag">${p.category} · SS25</p>
        </div>
        <span class="card-price">$${p.price}</span>
      </div>
    </div>
  `).join('');

  observeRevealEls();

  document.querySelectorAll('.collection-card').forEach(card => {
    card.addEventListener('click', () => openProductModal({ ...card.dataset }));
    attachCursorHover(card);
  });
}

loadProducts();

/* ── PRODUCT MODAL ───────────────────────────── */
const productModal  = document.getElementById('productModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose    = document.getElementById('modalClose');
const modalInquireBtn = document.getElementById('modalInquireBtn');

function openProductModal(p) {
  if (!productModal) return;

  document.getElementById('modalImage').src         = p.image;
  document.getElementById('modalImage').alt         = p.name;
  document.getElementById('modalName').textContent  = p.name;
  document.getElementById('modalCategory').textContent = p.category;
  document.getElementById('modalPrice').textContent = '$' + p.price;
  document.getElementById('modalDescription').textContent = p.description || '';
  document.getElementById('modalFabric').textContent = p.fabric || '';
  document.getElementById('modalFit').textContent   = p.fit || '';
  document.getElementById('modalColor').textContent = p.color || '';
  document.getElementById('modalSizes').textContent = p.sizes || '';
  document.getElementById('modalCode').textContent  = p.code || '';

  productModal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeProductModal() {
  if (!productModal) return;
  productModal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

if (modalBackdrop) modalBackdrop.addEventListener('click', closeProductModal);
if (modalClose)    modalClose.addEventListener('click', closeProductModal);

// Close modal when clicking Inquire link
if (modalInquireBtn) {
  modalInquireBtn.addEventListener('click', closeProductModal);
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeProductModal();
});

/* ── MUSIC PLAYER ────────────────────────────── */
const siteAudio      = document.getElementById('siteAudio');
const playPauseBtn   = document.getElementById('playPauseTrack');
const songPopup      = document.getElementById('songPopup');
const songPopupTitle = document.getElementById('songPopupTitle');

const playlist = [
  { title: 'Treasure In The Hills — Leon Thomas',     src: 'music/track1.mp3' },
  { title: 'Friends Again — Baby Rose & Leon Thomas', src: 'music/track2.mp3' },
  { title: 'Track Three',                             src: 'music/track3.mp3' }
];

let currentTrackIndex = parseInt(localStorage.getItem('vlc_music_index'), 10) || 0;
let isPlaying    = false;
let popupTimeout = null;
let fadeInterval = null;

function loadTrack(index) {
  const track = playlist[index];
  if (!track || !siteAudio) return;
  siteAudio.src = track.src;
  if (songPopupTitle) songPopupTitle.textContent = 'Now Playing — ' + track.title;
}

function showSongPopup() {
  if (!songPopup) return;
  songPopup.classList.remove('hide');
  songPopup.classList.add('show');
  clearTimeout(popupTimeout);
  popupTimeout = setTimeout(() => {
    songPopup.classList.remove('show');
    songPopup.classList.add('hide');
  }, 2600);
}

function fadeInAudio(targetVolume = 0.7, duration = 1200) {
  if (!siteAudio) return;
  clearInterval(fadeInterval);
  siteAudio.volume = 0;
  const stepTime   = 50;
  const volumeStep = targetVolume / (duration / stepTime);
  fadeInterval = setInterval(() => {
    if (siteAudio.volume < targetVolume) {
      siteAudio.volume = Math.min(siteAudio.volume + volumeStep, targetVolume);
    } else {
      clearInterval(fadeInterval);
    }
  }, stepTime);
}

function fadeOutAudio(duration = 800) {
  if (!siteAudio) return;
  clearInterval(fadeInterval);
  const stepTime   = 50;
  const startVol   = siteAudio.volume || 0.7;
  const volumeStep = startVol / (duration / stepTime);
  fadeInterval = setInterval(() => {
    if (siteAudio.volume > volumeStep) {
      siteAudio.volume = Math.max(siteAudio.volume - volumeStep, 0);
    } else {
      clearInterval(fadeInterval);
      siteAudio.volume = 0;
      siteAudio.pause();
    }
  }, stepTime);
}

function playTrack() {
  if (!siteAudio) return;
  siteAudio.play()
    .then(() => {
      isPlaying = true;
      if (playPauseBtn) {
        playPauseBtn.textContent = '⏸';
        playPauseBtn.classList.add('playing');
      }
      fadeInAudio();
      showSongPopup();
      localStorage.setItem('vlc_music_playing', 'true');
      localStorage.setItem('vlc_music_index', currentTrackIndex);
    })
    .catch(err => console.warn('Playback blocked:', err));
}

function pauseTrack() {
  isPlaying = false;
  if (playPauseBtn) {
    playPauseBtn.textContent = '▶';
    playPauseBtn.classList.remove('playing');
  }
  fadeOutAudio();
  localStorage.setItem('vlc_music_playing', 'false');
}

function playNextTrack() {
  currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
  loadTrack(currentTrackIndex);
  playTrack();
}

if (playPauseBtn) {
  playPauseBtn.addEventListener('click', () => {
    isPlaying ? pauseTrack() : playTrack();
  });
}

if (siteAudio) {
  siteAudio.addEventListener('ended', playNextTrack);
}

// Restore last track from localStorage
loadTrack(currentTrackIndex);
if (playPauseBtn) playPauseBtn.textContent = '▶';

const savedPlaying = localStorage.getItem('vlc_music_playing');
if (savedPlaying === 'true' && songPopupTitle) {
  songPopupTitle.textContent = 'Ready — ' + playlist[currentTrackIndex].title;
}