/**
══════════════════════════════════════════════════════ 
 *
 * ARVO Studio — scene3d.js
 * Docs: https://modelviewer.dev/docs
 *    archive - scene3d.js
 * 
══════════════════════════════════════════════════════ 
 */

(function () {
  'use strict';

  const MODEL_SRC  = './skeleton_drgaon/scene.gltf';
  const WALK_ANIM  = 'animation.tvsc.skeleton_dragon.walk';
  const POSTER_SRC = './logo.jpg'; // imagen que se muestra si el modelo falla

  function loadScript(cb) {
    if (customElements.get('model-viewer')) { cb(); return; }
    const s   = document.createElement('script');
    s.type    = 'module';
    s.src     = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.2.0/model-viewer.min.js';
    s.onload  = cb;
    document.head.appendChild(s);
  }

  function buildViewer() {
    const container = document.getElementById('scene3d-mount');
    if (!container) return;

    /* Eliminar cubo CSS fallback directamente — no se necesita */
    const fb = container.querySelector('.mc-css-fallback');
    if (fb) fb.remove();

    const mv = document.createElement('model-viewer');

    /* ── Modelo + poster de respaldo si falla ── */
    mv.setAttribute('src',                         MODEL_SRC);
    mv.setAttribute('poster',                      POSTER_SRC);
    mv.setAttribute('alt',                         'Skeleton Dragon — ARVO Studio');

    /* ── Animación ── */
    mv.setAttribute('animation-name',              WALK_ANIM);
    mv.setAttribute('autoplay',                    '');
    mv.setAttribute('animation-crossfade-duration','0');

    /* ── Cámara — más cerca para verse grande, sin auto-rotate ── */
    // mv.setAttribute('camera-controls',             '');
    // mv.setAttribute('disable-pan',                 '');
    mv.setAttribute('camera-orbit',               '210deg 98deg 60%');
    mv.setAttribute('camera-target',              '0.5m 1.7m auto');
    mv.setAttribute('field-of-view',              '15deg');
    mv.setAttribute('min-field-of-view',          '0deg');
    mv.setAttribute('max-field-of-view',          '70deg');
    mv.setAttribute('interaction-prompt',         'none');

    /* ── Sin auto-rotate ── */
    // auto-rotate eliminado intencionalmente

    /* ── Sombra y entorno ── */
    mv.setAttribute('shadow-intensity',            '1');
    mv.setAttribute('shadow-softness',             '0.5');
    mv.setAttribute('exposure',                    '1');
    mv.setAttribute('environment-image',           'neutral');

    /* ── Tamaño ── */
    Object.assign(mv.style, {
      width:            '100%',
      height:           '100%',
      background:       'transparent',
      '--poster-color': 'transparent',
      opacity:          '0',
      transition:       'opacity 0.8s ease',
    });

    mv.addEventListener('load', () => {
      mv.style.opacity = '1';

      /* Velocidad de animación al 50% */
      mv.timeScale = 0.5;

      console.log('[ARVO] Animaciones disponibles:', mv.availableAnimations);
      console.log('[ARVO] Reproduciendo:', mv.animationName);
      console.log('[ARVO] timeScale:', mv.timeScale);
    });

    mv.addEventListener('error', () => {
      console.warn('[ARVO] Modelo no encontrado — mostrando poster.');
      mv.style.opacity = '1'; // mostrar el poster
    });

    container.appendChild(mv);
  }

  /* ── Parallax suave — se pausa al interactuar con el modelo ── */
  function initParallax() {
    const mount = document.getElementById('scene3d-mount');
    if (!mount || window.innerWidth < 768) return;

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let interacting = false;

    document.addEventListener('mousemove', (e) => {
      if (interacting) return;
      tx = ((e.clientX - window.innerWidth  / 2) / window.innerWidth)  * 10;
      ty = ((e.clientY - window.innerHeight / 2) / window.innerHeight) * 7;
    }, { passive: true });

    /* Detectar cuando el usuario toca/arrastra el model-viewer */
    mount.addEventListener('mousedown',  () => { interacting = true;  });
    mount.addEventListener('touchstart', () => { interacting = true;  }, { passive: true });
    window.addEventListener('mouseup',   () => { interacting = false; tx = 0; ty = 0; });
    window.addEventListener('touchend',  () => { interacting = false; tx = 0; ty = 0; });

    (function lerp() {
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      mount.style.transform = `translate(${cx.toFixed(2)}px,${cy.toFixed(2)}px)`;
      requestAnimationFrame(lerp);
    })();
  }

  function init() {
    loadScript(buildViewer);
    initParallax();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();