/**
 * ARVO Studio — particles.js
 * Optimized: disabled on mobile, paused on hidden tab, reduced pool
 */
(function () {
  'use strict';

  /* Disable entirely on mobile — saves battery and eliminates lag */
  if (window.innerWidth < 768) return;

  /* Reduce pool if user prefers reduced motion */
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ash-canvas';
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '9997',
    opacity:       '1',
  });
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Reduced pool — keep it light alongside 3D model and CSS animations */
  const POOL      = 35;
  const particles = [];

  const TRAIL_COLORS  = ['rgba(180,174,164,','rgba(200,192,178,','rgba(160,152,140,','rgba(212,133,58,','rgba(210,198,182,'];
  const AMBIENT_COLOR = 'rgba(212,133,58,';

  function spawn(x, y, ambient) {
    if (particles.length >= POOL) return;
    if (ambient) {
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -(0.15 + Math.random() * 0.35),
        size: 0.6 + Math.random() * 1.1,
        color: AMBIENT_COLOR,
        alpha: 0.08 + Math.random() * 0.12,
        decay: 0.003 + Math.random() * 0.004,
        wobble: (Math.random() - 0.5) * 0.02,
        life: 1.0, ambient: true,
      });
    } else {
      const ember = Math.random() < 0.08;
      particles.push({
        x, y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -(0.3 + Math.random() * 0.7),
        size: ember ? 1 + Math.random() * 1.2 : 0.5 + Math.random() * 1.5,
        color: ember ? TRAIL_COLORS[3] : TRAIL_COLORS[Math.floor(Math.random() * 4)],
        alpha: 0.55 + Math.random() * 0.35,
        decay: 0.012 + Math.random() * 0.018,
        wobble: (Math.random() - 0.5) * 0.04,
        life: 1.0, ambient: false,
      });
    }
  }

  /* Ambient: reduce frequency — every 400ms instead of 200ms */
  let lastAmbient = 0;
  function spawnAmbient(now) {
    if (now - lastAmbient < 400) return;
    lastAmbient = now;
    const heroH = window.innerHeight;
    spawn(Math.random() * W, heroH * 0.3 + Math.random() * heroH * 0.7, true);
  }

  /* Mouse trail */
  let lx = -999, ly = -999;
  window.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lx, dy = e.clientY - ly;
    if (dx * dx + dy * dy < 9) return;
    lx = e.clientX; ly = e.clientY;
    /* Spawn 1 particle instead of 2 */
    spawn(e.clientX + (Math.random() - 0.5) * 6, e.clientY + (Math.random() - 0.5) * 6, false);
  }, { passive: true });

  /* Pause loop when tab is hidden — saves CPU entirely */
  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(tick);
  });

  /* Throttle to ~30fps — half the GPU cost, visually identical for slow particles */
  let lastFrame = 0;
  const FRAME_INTERVAL = 33; /* ms ≈ 30fps */

  function tick(now) {
    if (!running) return;
    if (now - lastFrame < FRAME_INTERVAL) { requestAnimationFrame(tick); return; }
    lastFrame = now;
    ctx.clearRect(0, 0, W, H);
    spawnAmbient(now);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.vx   += p.wobble;
      p.vy   -= 0.008;
      p.x    += p.vx;
      p.y    += p.vy;
      p.life -= p.decay;

      if (p.life <= 0 || p.y < -10) { particles.splice(i, 1); continue; }

      const a = p.ambient ? p.life * p.alpha * 1.5 : p.life * 0.7;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + Math.min(a, 0.9).toFixed(3) + ')';
      ctx.fill();
    }
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
})();