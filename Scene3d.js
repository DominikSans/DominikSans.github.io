/**
 * ARVO Studio — scene3d.js
 * Maneja el elemento 3D del hero usando Google model-viewer.
 *
 * CÓMO USAR UN MODELO PROPIO:
 * 1. Descarga un modelo .glb de https://sketchfab.com (filtrar "Downloadable" + "Free")
 *    Busca "minecraft grass block" o "minecraft creeper" etc.
 * 2. Pon el archivo .glb en la misma carpeta que index.html
 * 3. Cambia MODEL_SRC abajo por el nombre de tu archivo: './tu-modelo.glb'
 *
 * MODELO POR DEFECTO:
 * Si no tienes modelo propio, se usa un cubo Minecraft CSS como fallback
 * hasta que agregues tu archivo .glb.
 */

(function () {
  'use strict';

  /* ── Configuración ── */
  const MODEL_SRC         = './modelo.glb';   // ← cambia esto por tu archivo
  const SHADOW_INTENSITY  = 1.2;
  const SHADOW_SOFTNESS   = 0.6;
  const AUTO_ROTATE_DELAY = 0;                // ms antes de rotar solo
  const ROTATION_PER_SEC  = '12deg';          // velocidad de rotación

  /* ── Insertar script de model-viewer si no está cargado ── */
  function loadModelViewerScript(cb) {
    if (customElements.get('model-viewer')) return cb();
    const s = document.createElement('script');
    s.type = 'module';
    s.src  = 'https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js';
    s.onload = cb;
    document.head.appendChild(s);
  }

  /* ── Construir el elemento model-viewer ── */
  function buildViewer() {
    const container = document.getElementById('scene3d-mount');
    if (!container) return;

    const mv = document.createElement('model-viewer');

    /* Atributos del modelo */
    mv.setAttribute('src',              MODEL_SRC);
    mv.setAttribute('alt',              'ARVO Studio — Elemento 3D interactivo');
    mv.setAttribute('shadow-intensity', SHADOW_INTENSITY);
    mv.setAttribute('shadow-softness',  SHADOW_SOFTNESS);
    mv.setAttribute('auto-rotate',      '');
    mv.setAttribute('rotation-per-second', ROTATION_PER_SEC);
    mv.setAttribute('auto-rotate-delay',   AUTO_ROTATE_DELAY);
    mv.setAttribute('camera-controls', '');   // permite arrastrar con mouse
    mv.setAttribute('interaction-prompt', 'none'); // sin tooltip "Use fingers..."

    /* Ángulo de cámara inicial — vista isométrica Minecraft */
    mv.setAttribute('camera-orbit',  '45deg 65deg 4m');
    mv.setAttribute('min-camera-orbit', 'auto auto 2m');
    mv.setAttribute('max-camera-orbit', 'auto auto 8m');

    /* Exposición y entorno */
    mv.setAttribute('exposure',         '0.85');
    mv.setAttribute('environment-image','neutral');

    /* Estilos inline del elemento */
    Object.assign(mv.style, {
      width:           '100%',
      height:          '100%',
      background:      'transparent',
      '--poster-color': 'transparent',
    });

    /* Mostrar fallback CSS mientras carga el modelo */
    mv.addEventListener('load', () => {
      const fb = container.querySelector('.mc-css-fallback');
      if (fb) fb.style.display = 'none';
      mv.style.opacity = '1';
    });

    /* Si el modelo no existe o falla, mantener fallback CSS visible */
    mv.addEventListener('error', () => {
      console.info('[ARVO scene3d] Modelo .glb no encontrado — usando cubo CSS como fallback.\nDescarga un modelo de sketchfab.com y ponlo como ./modelo.glb');
      mv.remove();
    });

    mv.style.opacity = '0';
    mv.style.transition = 'opacity 0.8s ease';

    container.appendChild(mv);
  }

  /* ── Parallax suave al mover el mouse — solo en desktop ── */
  function initParallax() {
    const mount = document.getElementById('scene3d-mount');
    if (!mount || window.innerWidth < 768) return;

    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

    document.addEventListener('mousemove', (e) => {
      const cx  = window.innerWidth  / 2;
      const cy  = window.innerHeight / 2;
      targetX   = ((e.clientX - cx) / cx) * 12;   // ±12px
      targetY   = ((e.clientY - cy) / cy) * 8;    // ±8px
    }, { passive: true });

    (function lerp() {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
      mount.style.transform = `translate(${currentX.toFixed(2)}px, ${currentY.toFixed(2)}px)`;
      requestAnimationFrame(lerp);
    })();
  }

  /* ── Init ── */
  function init() {
    loadModelViewerScript(buildViewer);
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
