(function () {
  'use strict';

  const MODEL_SRC  = './skeleton_drgaon/scene.gltf';
  const WALK_ANIM  = 'animation.tvsc.skeleton_dragon.walk';
  const POSTER_SRC = './assets/portfolio/aeloria-a.webp';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let loaded = false;

  function loadScript(callback) {
    if (customElements.get('model-viewer')) { callback(); return; }
    const script = document.createElement('script');
    script.type   = 'module';
    script.src    = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.2.0/model-viewer.min.js';
    script.onload = callback;
    document.head.appendChild(script);
  }

  function buildViewer() {
    if (loaded) return;
    loaded = true;
    const container = document.getElementById('scene3d-mount');
    if (!container) return;

    /* Remove static HTML poster — model-viewer takes over */
    const staticPoster = container.querySelector('.scene3d-poster');
    if (staticPoster) staticPoster.remove();

    const viewer = document.createElement('model-viewer');
    viewer.setAttribute('src',    MODEL_SRC);
    viewer.setAttribute('poster', POSTER_SRC);
    viewer.setAttribute('alt',    'Skeleton Dragon — ARVO Studio');

    if (!prefersReducedMotion) {
      viewer.setAttribute('animation-name',               WALK_ANIM);
      viewer.setAttribute('autoplay',                     '');
      viewer.setAttribute('animation-crossfade-duration', '0');
    }

    viewer.setAttribute('camera-orbit',      '210deg 92deg 60%');
    viewer.setAttribute('camera-target',     '0.5m 1.7m auto');
    viewer.setAttribute('field-of-view',     '15deg');
    viewer.setAttribute('min-field-of-view', '0deg');
    viewer.setAttribute('max-field-of-view', '70deg');
    viewer.setAttribute('interaction-prompt', 'none');
    viewer.setAttribute('shadow-intensity',   '0');
    viewer.setAttribute('exposure',           '1');
    viewer.setAttribute('environment-image',  'neutral');
    viewer.setAttribute('max-pixel-ratio',    '1');

    Object.assign(viewer.style, {
      width:           '100%',
      height:          '100%',
      background:      'transparent',
      '--poster-color':'transparent',
      opacity:         '0',
      transition:      'opacity 0.8s ease',
      willChange:      'transform',
    });

    viewer.addEventListener('load', () => {
      viewer.style.opacity = '1';
      if (!prefersReducedMotion && typeof viewer.timeScale !== 'undefined') {
        viewer.timeScale = 0.5;
      }
    });
    viewer.addEventListener('error', () => { viewer.style.opacity = '1'; });

    container.appendChild(viewer);

    /* Pause animation + rendering when hero is off-screen */
    const visObs = new IntersectionObserver((entries) => {
      const visible = entries[0].isIntersecting;
      if (viewer.pause && viewer.play) {
        visible ? viewer.play() : viewer.pause();
      }
    }, { threshold: 0.05 });
    visObs.observe(container);
  }

  function initParallax() {
    const mount = document.getElementById('scene3d-mount');
    if (!mount || window.innerWidth < 768 || prefersReducedMotion) return;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0, interacting = false;
    let parallaxVisible = true, rafId = 0;

    document.addEventListener('mousemove', event => {
      if (interacting) return;
      targetX = ((event.clientX - window.innerWidth  / 2) / window.innerWidth)  * 10;
      targetY = ((event.clientY - window.innerHeight / 2) / window.innerHeight) * 7;
    }, { passive: true });

    mount.addEventListener('mousedown',  () => { interacting = true; });
    mount.addEventListener('touchstart', () => { interacting = true; }, { passive: true });
    window.addEventListener('mouseup',   () => { interacting = false; targetX = 0; targetY = 0; });
    window.addEventListener('touchend',  () => { interacting = false; targetX = 0; targetY = 0; });

    function lerp() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      mount.style.transform = `translate(${currentX.toFixed(2)}px,${currentY.toFixed(2)}px)`;
      if (parallaxVisible) rafId = requestAnimationFrame(lerp);
    }

    const pObs = new IntersectionObserver((entries) => {
      parallaxVisible = entries[0].isIntersecting;
      if (parallaxVisible && !rafId) rafId = requestAnimationFrame(lerp);
    }, { threshold: 0.05 });
    pObs.observe(mount);

    rafId = requestAnimationFrame(lerp);
  }

  function init() {
    const container = document.getElementById('scene3d-mount');
    if (!container) return;

    /* Load model-viewer when hero enters the viewport */
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        observer.disconnect();
        loadScript(buildViewer);
      }
    }, { threshold: 0.1 });

    observer.observe(container);
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
