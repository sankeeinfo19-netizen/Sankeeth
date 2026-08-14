/* ============================================================
   SHARED DATA — used by script.js, portfolio.js, about.js
============================================================ */
const strapImages = [
  { label: 'Campaign 01', src: 'images/strap-left-1.jpg' },
  { label: 'Product Launch', src: 'images/strap-left-2.jpg' },
  { label: 'Vaccination Drive', src: 'images/strap-left-3.jpg' },
  { label: 'Fintech App', src: 'images/strap-left-4.jpg' },
  { label: 'NAVIS ARCA', src: 'images/strap-left-5.jpg' },
  { label: 'Trading Platform', src: 'images/strap-left-6.jpg' },
  { label: 'Oil & Gas', src: 'images/strap-left-7.jpg' },
  { label: 'Crypto Exchange', src: 'images/strap-left-8.jpg' },
];

const strapImagesRow2 = [
  { label: 'Ramadan Dates', src: 'images/strap-right-1.jpg' },
  { label: 'Mobile App UI', src: 'images/strap-right-2.jpg' },
  { label: 'Exhibition Stand', src: 'images/strap-right-3.jpg' },
  { label: 'Equine Brand', src: 'images/strap-right-4.jpg' },
  { label: 'Annual Report', src: 'images/strap-right-5.jpg' },
  { label: 'Healthcare', src: 'images/strap-right-6.jpg' },
  { label: 'E-commerce', src: 'images/strap-right-7.jpg' },
  { label: 'Brand Identity', src: 'images/strap-right-8.jpg' },
];

/* Each project can carry:
   img   — thumbnail/poster image (falls back to a placeholder if omitted)
   video — path to an mp4 (only used when filter === 'video'); leave unset
           until a real video file is added — the lightbox will fall back
           to showing the poster image large. */
const projects = [
  { title: 'FinTech Mobile App', tag: 'UI/UX Design', filter: 'uiux', img: 'images/projects/fintech-app.jpg' },
  { title: 'Wave Motion Reel', tag: 'Videos', filter: 'video', img: 'images/projects/wave-motion.jpg', video: 'videos/wave-motion.mp4' },
  { title: 'Aster Brand System', tag: 'Branding', filter: 'branding', img: 'images/projects/aster-brand.jpg' },
  { title: 'Navis Arca Website', tag: 'Web Design', filter: 'web', img: 'images/projects/navis-arca.jpg' },
  { title: 'Annual Report 2025', tag: 'Print Design', filter: 'print', img: 'images/projects/annual-report.jpg' },
  { title: 'Crypto Trading App', tag: 'UI/UX Design', filter: 'uiux', img: 'images/projects/crypto-app.jpg' },
  { title: 'Launch Film Edit', tag: 'Videos', filter: 'video', img: 'images/projects/launch-film.jpg', video: '/Users/sankeeth/Documents/Sankee/Portfolio-updated (1)/videos/DER_FPO.mp4' },
  { title: 'Oil & Gas Identity', tag: 'Branding', filter: 'branding', img: 'images/projects/oil-gas.jpg' },
  { title: 'Wellness App Redesign', tag: 'UI/UX Design', filter: 'uiux' },
  { title: 'Product Teaser Film', tag: 'Videos', filter: 'video', video: null },
  { title: 'Equine Brand Identity', tag: 'Branding', filter: 'branding' },
  { title: 'Exhibition Stand Design', tag: 'Web Design', filter: 'web' },
  { title: 'Investor Deck Print', tag: 'Print Design', filter: 'print' },
  { title: 'Trading Platform UI', tag: 'UI/UX Design', filter: 'uiux' },
];

const testimonials = [
  {
    text: "Working with Sanketh was an outstanding experience. His ability to transform ideas into clean, professional, and user-focused designs is exceptional. Every deliverable was thoughtfully crafted, delivered on time, and exceeded our expectations.",
    name: 'Arjun Reddy',
    role: 'Senior Product Manager, FinTech Company',
  },
  {
    text: "Sanketh brought a rare mix of strategic thinking and hands-on craft to our rebrand. He led the team through a tight deadline without ever compromising on quality, and the final identity system still holds up two years later.",
    name: 'Priya Nair',
    role: 'Marketing Director, Aster Health',
  },
  {
    text: "The motion work Sanketh delivered for our product launch was the best piece of creative we shipped that year. Clear direction, fast turnarounds, and a genuine understanding of what would make viewers stop scrolling.",
    name: 'Karthik Iyer',
    role: 'Founder, Navis Arca',
  },
  {
    text: "What stood out was how easily Sanketh moved between big-picture brand thinking and small details like spacing and type pairing. Our retail identity finally feels consistent across packaging, store signage, and the app.",
    name: 'Meera Krishnan',
    role: 'Creative Lead, Bloom Retail',
  }
];

/* ============================================================
   IMAGE PLACEHOLDERS
   Generates a light, dashed "drop your image here" style box as
   an inline SVG data URI — no network request, easy to spot, and
   trivial to swap out later: just replace the <img src="..."> with
   your real image path.
============================================================ */
function imagePlaceholder(width, height, caption = '') {
  const iconW = Math.min(width, height) * 0.26;
  const iconX = (width - iconW) / 2;
  const iconY = caption ? (height - iconW) / 2 - height * 0.06 : (height - iconW) / 2;
  const fontSize = Math.max(11, Math.min(width, height) * 0.055);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#EEEFF9"/>
  <rect x="3" y="3" width="${width - 6}" height="${height - 6}" fill="none" stroke="#C9CBE6" stroke-width="2" stroke-dasharray="7 7" rx="12"/>
  <g transform="translate(${iconX}, ${iconY})" fill="none" stroke="#A9ABCB" stroke-width="${Math.max(1.5, iconW * 0.045)}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="0" y="0" width="${iconW}" height="${iconW * 0.78}" rx="${iconW * 0.08}"/>
    <circle cx="${iconW * 0.24}" cy="${iconW * 0.24}" r="${iconW * 0.1}"/>
    <path d="M0 ${iconW * 0.62} L${iconW * 0.32} ${iconW * 0.34} L${iconW * 0.55} ${iconW * 0.52} L${iconW * 0.74} ${iconW * 0.28} L${iconW} ${iconW * 0.62}"/>
  </g>
  ${caption ? `<text x="50%" y="${iconY + iconW + fontSize + 10}" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="${fontSize}" fill="#8385A6">${caption}</text>` : ''}
</svg>`.trim();

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function avatarPlaceholder(size = 120) {
  const iconW = size * 0.42;
  const iconPos = (size - iconW) / 2;
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1.5}" fill="#EEEFF9" stroke="#C9CBE6" stroke-width="2" stroke-dasharray="6 6"/>
  <g transform="translate(${iconPos}, ${iconPos})" fill="none" stroke="#A9ABCB" stroke-width="${Math.max(1.5, iconW * 0.07)}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="${iconW / 2}" cy="${iconW * 0.32}" r="${iconW * 0.22}"/>
    <path d="M${iconW * 0.06} ${iconW * 0.98} C ${iconW * 0.06} ${iconW * 0.68}, ${iconW * 0.94} ${iconW * 0.68}, ${iconW * 0.94} ${iconW * 0.98}"/>
  </g>
</svg>`.trim();

  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

/* ============================================================
   PROJECT CARDS + LIGHTBOX — shared across index.html and
   portfolio.html so both pages get identical card markup and
   the same "click to blow up" behaviour.
============================================================ */
function buildProjectCard(p) {
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.filter = p.filter;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View ${p.title}`);

  const thumbSrc = p.img || imagePlaceholder(480, 380, p.title);
  const isVideo = p.filter === 'video';

  card.innerHTML = `
    <div class="project-thumb-wrap">
      <img class="project-thumb" src="${thumbSrc}" alt="${p.img ? p.title : 'Placeholder — replace with ' + p.title + ' thumbnail'}" loading="lazy">
      ${isVideo ? `<span class="project-play" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      </span>` : ''}
    </div>
    <div class="project-meta">
      <h3>${p.title}</h3>
      <p>${p.tag}</p>
    </div>
  `;

  card.addEventListener('click', () => openLightbox(p));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(p); }
  });

  return card;
}

function renderProjectGrid(container, list) {
  list.forEach(p => container.appendChild(buildProjectCard(p)));
}

function wireFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        const match = filter === 'all' || card.dataset.filter === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });
}

/* ---- Lightbox: injected once, reused for every card on the page ---- */
let lightboxEl = null;

function ensureLightbox() {
  if (lightboxEl) return lightboxEl;
  lightboxEl = document.createElement('div');
  lightboxEl.className = 'lightbox';
  lightboxEl.innerHTML = `
    <div class="lightbox-backdrop"></div>
    <div class="lightbox-panel">
      <button class="lightbox-close" aria-label="Close">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
      <div class="lightbox-media"></div>
      <div class="lightbox-caption">
        <h3 class="lightbox-title"></h3>
        <p class="lightbox-tag"></p>
      </div>
    </div>
  `;
  document.body.appendChild(lightboxEl);

  const close = () => closeLightbox();
  lightboxEl.querySelector('.lightbox-backdrop').addEventListener('click', close);
  lightboxEl.querySelector('.lightbox-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxEl.classList.contains('is-open')) close();
  });

  return lightboxEl;
}

function openLightbox(p) {
  const box = ensureLightbox();
  const media = box.querySelector('.lightbox-media');
  const isVideo = p.filter === 'video';

  if (isVideo && p.video) {
    media.innerHTML = `<video src="${p.video}" controls autoplay playsinline></video>`;
  } else if (isVideo && !p.video) {
    // No video file supplied yet — show the poster large with a small notice
    // instead of pretending a video exists.
    const src = p.img || imagePlaceholder(900, 700, p.title);
    media.innerHTML = `
      <img src="${src}" alt="${p.title}">
      <p class="lightbox-note">Video file not added yet — this project's poster image is shown here. Drop an .mp4 into the images folder and set its path in common.js to enable playback.</p>
    `;
  } else {
    const src = p.img || imagePlaceholder(900, 700, p.title);
    media.innerHTML = `<img src="${src}" alt="${p.title}">`;
  }

  box.querySelector('.lightbox-title').textContent = p.title;
  box.querySelector('.lightbox-tag').textContent = p.tag;

  box.classList.add('is-open');
  document.body.classList.add('lightbox-locked');
  requestAnimationFrame(() => box.classList.add('is-visible'));
}

function closeLightbox() {
  if (!lightboxEl) return;
  lightboxEl.classList.remove('is-visible');
  document.body.classList.remove('lightbox-locked');
  const video = lightboxEl.querySelector('video');
  if (video) video.pause();
  setTimeout(() => {
    lightboxEl.classList.remove('is-open');
    lightboxEl.querySelector('.lightbox-media').innerHTML = '';
  }, 250);
}

/* ============================================================
   MOBILE NAV — shared across every page
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  menuToggle?.addEventListener('click', () => {
    header.classList.toggle('nav-open');
  });
  document.getElementById('nav')?.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') header.classList.remove('nav-open');
  });
});
