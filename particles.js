/**
 * ARVO Studio — Ash Particle Trail
 * Tiny ember/ash particles that appear only when the mouse moves.
 * Pure canvas, no dependencies, minimal performance footprint.
 */
(function () {
  'use strict';

  /* ── Canvas setup ── */
  const canvas = document.createElement('canvas');
  canvas.id = 'ash-canvas';
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    top:           '0',
    left:          '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '9997',   // below custom cursor rings (9998/9999)
    opacity:       '1',
  });
  document.body.appendChild(canvas);

  const ctx  = canvas.getContext('2d');
  let W = 0, H = 0;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── Particle pool ── */
  const POOL_SIZE  = 120;   // max alive particles
  const SPAWN_RATE = 2;     // particles per mousemove event
  const particles  = [];

  // Ash palette — muted grays + faint red ember
  const COLORS = [
    'rgba(180,180,170,',   // cool ash
    'rgba(200,190,180,',   // warm ash
    'rgba(160,155,150,',   // dark ash
    'rgba(212, 43, 43,',   // red ember (rare)
    'rgba(210,200,190,',   // light ash
  ];

  function spawnParticle(x, y) {
    if (particles.length >= POOL_SIZE) return;

    const isEmber  = Math.random() < 0.08;          // 8% chance of red ember
    const colorIdx = isEmber ? 3 : Math.floor(Math.random() * 4);
    const size     = isEmber
      ? 1 + Math.random() * 1.2                     // ember: 1–2.2px
      : 0.5 + Math.random() * 1.5;                  // ash:   0.5–2px

    particles.push({
      x,
      y,
      vx:      (Math.random() - 0.5) * 0.6,         // gentle horizontal drift
      vy:      -(0.3 + Math.random() * 0.7),         // float upward
      size,
      color:   COLORS[colorIdx],
      alpha:   0.55 + Math.random() * 0.35,
      decay:   0.012 + Math.random() * 0.018,        // fade speed
      wobble:  (Math.random() - 0.5) * 0.04,         // horizontal wobble
      life:    1.0,
    });
  }

  /* ── Mouse tracking — only spawn on movement ── */
  let lastX = -999, lastY = -999;
  let moving = false, moveTimer = null;

  window.addEventListener('mousemove', (e) => {
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Only spawn if mouse actually moved (avoids idle trembling)
    if (dist < 2) return;

    lastX = e.clientX;
    lastY = e.clientY;
    moving = true;

    clearTimeout(moveTimer);
    moveTimer = setTimeout(() => { moving = false; }, 80);

    for (let i = 0; i < SPAWN_RATE; i++) {
      spawnParticle(
        e.clientX + (Math.random() - 0.5) * 6,
        e.clientY + (Math.random() - 0.5) * 6
      );
    }
  }, { passive: true });

  /* ── Render loop ── */
  function tick() {
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];

      // Physics
      p.vx   += p.wobble;
      p.vy   -= 0.012;           // gentle upward acceleration (buoyancy)
      p.x    += p.vx;
      p.y    += p.vy;
      p.life -= p.decay;
      p.alpha = p.life * 0.7;

      // Prune dead particles
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      // Draw
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha.toFixed(3) + ')';
      ctx.fill();
    }

    requestAnimationFrame(tick);
  }

  tick();
})();
