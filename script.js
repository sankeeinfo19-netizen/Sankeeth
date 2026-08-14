/* This file depends on common.js being loaded first (shared data,
   imagePlaceholder/avatarPlaceholder helpers, and the mobile nav toggle). */

/* ============================================================
   MARQUEE STRAPS — build tracks, duplicate for seamless loop
============================================================ */
function buildStrap(container, items) {
  const frag = document.createDocumentFragment();
  // duplicate the list once so translateX(-50%) loops seamlessly
  [...items, ...items].forEach(item => {
    const el = document.createElement('div');
    el.className = 'strap-item';
    const img = document.createElement('img');
    img.src = item.src || imagePlaceholder(400, 400, item.label);
    img.alt = item.src ? item.label : `Placeholder — replace with ${item.label} image`;
    img.loading = 'lazy';
    el.appendChild(img);
    frag.appendChild(el);
  });
  container.appendChild(frag);
}
buildStrap(document.getElementById('strapTrackLeft'), strapImages);
buildStrap(document.getElementById('strapTrackRight'), strapImagesRow2);

/* ============================================================
   HERO COUNTERS — animate on scroll into view
============================================================ */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const suffix = el.dataset.suffix || '';
  const duration = 1600;
  let startTime = null;

  function step(ts) {
    if (startTime === null) startTime = ts;
    const progress = Math.min((ts - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const value = Math.round(target * eased);
    el.textContent = value + suffix;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const heroStats = document.getElementById('heroStats');
if (heroStats) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        heroStats.querySelectorAll('.stat-number').forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(heroStats);
}

/* ============================================================
   PORTFOLIO GRID + FILTER
============================================================ */
const portfolioGrid = document.getElementById('portfolioGrid');
const homePreviewProjects = projects.slice(0, 8);
renderProjectGrid(portfolioGrid, homePreviewProjects);
wireFilters();

/* ============================================================
   TESTIMONIAL CAROUSEL
============================================================ */
const testimonialText = document.getElementById('testimonialText');
const testimonialName = document.getElementById('testimonialName');
const testimonialRole = document.getElementById('testimonialRole');
const testimonialDots = document.getElementById('testimonialDots');
let activeTestimonial = 0;
let testimonialTimer = null;

function renderTestimonial(index) {
  const t = testimonials[index];
  testimonialText.style.opacity = 0;
  setTimeout(() => {
    testimonialText.textContent = `"${t.text}"`;
    testimonialName.textContent = t.name;
    testimonialRole.textContent = t.role;
    testimonialText.style.opacity = 1;
  }, 150);

  testimonialDots.querySelectorAll('button').forEach((dot, i) => {
    dot.classList.toggle('is-active', i === index);
  });
}

testimonials.forEach((t, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Show testimonial from ${t.name}`);
  dot.addEventListener('click', () => {
    activeTestimonial = i;
    renderTestimonial(i);
    resetTestimonialTimer();
  });
  testimonialDots.appendChild(dot);
});

function resetTestimonialTimer() {
  clearInterval(testimonialTimer);
  testimonialTimer = setInterval(() => {
    activeTestimonial = (activeTestimonial + 1) % testimonials.length;
    renderTestimonial(activeTestimonial);
  }, 6000);
}

renderTestimonial(0);
resetTestimonialTimer();

/* ============================================================
   CONTACT FORM — lightweight client-side validation
============================================================ */
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('cf-submit');

function setFieldError(id, message) {
  const input = document.getElementById(id);
  const errorEl = document.querySelector(`.field-error[data-for="${id}"]`);
  if (message) {
    input.classList.add('is-invalid');
    errorEl.textContent = message;
  } else {
    input.classList.remove('is-invalid');
    errorEl.textContent = '';
  }
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const name = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const subject = document.getElementById('cf-subject').value.trim();
  const message = document.getElementById('cf-message').value.trim();

  if (!name) { setFieldError('cf-name', 'Please enter your name.'); valid = false; }
  else setFieldError('cf-name', '');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailPattern.test(email)) { setFieldError('cf-email', 'Enter a valid email address.'); valid = false; }
  else setFieldError('cf-email', '');

  if (!subject) { setFieldError('cf-subject', 'Please add a subject.'); valid = false; }
  else setFieldError('cf-subject', '');

  if (!message) { setFieldError('cf-message', 'Please write a message.'); valid = false; }
  else setFieldError('cf-message', '');

  if (!valid) {
    formStatus.textContent = 'Please fix the highlighted fields.';
    formStatus.className = 'form-status is-error';
    return;
  }

  submitBtn.disabled = true;
  submitBtn.querySelector('.btn-label').textContent = 'Sending...';
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  // Sends the form to FormSubmit, which emails it to sankeeinfo19@gmail.com.
  fetch(contactForm.action, {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(contactForm)
  })
    .then((res) => {
      if (!res.ok) throw new Error('Request failed');
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Send Message';
      formStatus.textContent = `Thanks ${name.split(' ')[0]}, your message has been sent!`;
      formStatus.className = 'form-status is-success';
      contactForm.reset();
    })
    .catch(() => {
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-label').textContent = 'Send Message';
      formStatus.textContent = 'Something went wrong. Please email sankeeinfo19@gmail.com directly.';
      formStatus.className = 'form-status is-error';
    });
});
