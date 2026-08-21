/* ═══════════════════════════════════════════════════════════════
   AYUSH SWAIN PORTFOLIO — script.js
   Cursor Spotlight · 3D Drag Orbit · Explode on Scroll · CountUp
═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. CURSOR SPOTLIGHT ─────────────────────────────────── */
  const glow = document.getElementById('cursor-glow');
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    cx += (mx - cx) * 0.08;
    cy += (my - cy) * 0.08;
    if (glow) glow.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  /* ── 2. 3D EXPLODED STACK — DRAG ORBIT ──────────────────── */
  const stage     = document.getElementById('stage');
  const orbit     = document.getElementById('orbitGroup');

  let dragging = false, ox = 0, oy = 0, rotX = 12, rotY = -18;

  function applyOrbit() {
    if (orbit) orbit.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }
  applyOrbit();

  if (stage) {
    stage.addEventListener('mousedown', e => {
      dragging = true; ox = e.clientX; oy = e.clientY;
    });
    window.addEventListener('mousemove', e => {
      if (!dragging) return;
      rotY += (e.clientX - ox) * 0.3;
      rotX -= (e.clientY - oy) * 0.3;
      rotX  = Math.max(-50, Math.min(50, rotX));
      rotY  = Math.max(-70, Math.min(70, rotY));
      ox = e.clientX; oy = e.clientY;
      applyOrbit();
    });
    window.addEventListener('mouseup', () => { dragging = false; });

    // Touch support
    let tx = 0, ty = 0;
    stage.addEventListener('touchstart', e => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; }, {passive:true});
    stage.addEventListener('touchmove', e => {
      rotY += (e.touches[0].clientX - tx) * 0.3;
      rotX -= (e.touches[0].clientY - ty) * 0.3;
      rotX  = Math.max(-50, Math.min(50, rotX));
      rotY  = Math.max(-70, Math.min(70, rotY));
      tx = e.touches[0].clientX; ty = e.touches[0].clientY;
      applyOrbit();
    }, {passive:true});
  }

  /* ── 3. AUTO-EXPLODE ON SCROLL INTO VIEW ────────────────── */
  if (stage) {
    const stackObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) stage.classList.add('exploded');
        else stage.classList.remove('exploded');
      });
    }, { threshold: 0.25 });
    stackObs.observe(stage);
  }

  /* ── 4. SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = document.querySelectorAll(
    '.timeline-item, .float-card, .about-right, .section-heading, .section-label, .tl-card'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revObs.observe(el));

  /* ── 5. METRICS COUNT-UP ─────────────────────────────────── */
  const metricCards = document.querySelectorAll('.metric-card');

  function buildMetricCard(card) {
    const val     = parseFloat(card.dataset.val);
    const suffix  = card.dataset.suffix || '';
    const label   = card.dataset.label  || '';
    const decimal = parseInt(card.dataset.decimal || '0', 10);

    const numEl = document.createElement('div');
    numEl.className = 'metric-number';
    numEl.textContent = '0' + suffix;

    const lblEl = document.createElement('div');
    lblEl.className = 'metric-label';
    lblEl.textContent = label;

    card.appendChild(numEl);
    card.appendChild(lblEl);
    card._numEl = numEl;
    card._val   = val;
    card._suffix = suffix;
    card._decimal = decimal;
    card._counted = false;
  }

  metricCards.forEach(buildMetricCard);

  function countUp(card) {
    if (card._counted) return;
    card._counted = true;
    const target = card._val;
    const steps  = 60;
    let current  = 0;
    const inc    = target / steps;
    const timer  = setInterval(() => {
      current += inc;
      if (current >= target) { current = target; clearInterval(timer); }
      card._numEl.textContent = (card._decimal ? current.toFixed(card._decimal) : Math.floor(current)) + card._suffix;
    }, 25);
  }

  const countObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) countUp(e.target); });
  }, { threshold: 0.4 });
  metricCards.forEach(c => countObs.observe(c));

  /* ── 6. HERO TITLE REVEAL ANIMATION ────────────────────── */
  const revealLines = document.querySelectorAll('.reveal-line');
  revealLines.forEach((line, i) => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(60px)';
    line.style.transition = `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`;
    setTimeout(() => {
      line.style.opacity = '1';
      line.style.transform = 'translateY(0)';
    }, 200 + i * 120);
  });

  /* ── 7. NAVBAR SCROLL OPACITY ───────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 60) {
      navbar.style.background = 'rgba(0,0,0,0.92)';
    } else {
      navbar.style.background = 'rgba(0,0,0,0.7)';
    }
  }, { passive: true });

})();
