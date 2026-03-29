/**
 * ARVO Studio — lang.js
 * Dropdown language selector: EN (default) / ES
 */
(function () {
  'use strict';

  const FLAGS = {
    en: 'https://cdn-icons-png.flaticon.com/512/330/330425.png',
    es: 'https://cdn-icons-png.flaticon.com/128/330/330433.png',
  };
  const LABELS = { en: 'EN', es: 'ES' };

  /* ── English ────────────────────────────────────────────── */
  const en = {
    /* Nav */
    'nav.services': 'Services',
    'nav.process':  'Process',
    'nav.contact':  'Contact',
    'nav.hire':     'Hire',
    'ham.aria':     'Menu',

    /* Hero */
    'hero.badge':   'Available for projects',
    'hero.eyebrow': 'Minecraft Configuration Studio',
    'hero.sub':     'A studio specialized in MythicMobs, BetonQuest, Typewriter, and advanced Minecraft server configuration. Technical development, clear structure, and deliveries built for serious projects.',
    'hero.btn1':    'View portfolio',
    'hero.btn2':    'Services',
    'hero.stat1':   'Configs',
    'hero.stat2':   'Clients',
    'hero.stat3':   'Versions',
    'hero.aria':    '3D studio preview',
    'hero.prefix':  'We build',

    /* Services — header */
    'svc.eyebrow':      'What we do',
    'svc.head':         'SERVICES',
    'svc.sub':          'Advanced configuration, integration, and content layers built for projects that need a stronger technical foundation and a more polished presentation.',
    'svc.scroller.aria': 'Horizontal services carousel',

    /* Service 1 — MythicMobs */
    'svc1.sub':     'Bosses, skills, and advanced behavior',
    'svc1.preview': 'PvE combat-oriented configuration, difficulty scaling, and more solid encounters for projects that need memorable and technically consistent content.',
    'svc1.li1':     'Skills, targeters, and conditions with better internal structure',
    'svc1.li2':     'Phases, AI, and drops connected to server progression',
    'svc1.li3':     'Clean integration with ModelEngine, quests, and RPG systems',

    /* Service 2 — BetonQuest */
    'svc2.sub':     'Guided progression, dialogues, and narrative logic',
    'svc2.preview': 'Design and configuration of quest chains with clear progression, better-connected events, and a more organized structure for projects that need to grow without becoming unwieldy.',
    'svc2.li1':     'Quest chains, dialogues, and variables better resolved',
    'svc2.li2':     'Events, NPCs, and rewards linked with more coherence',
    'svc2.li3':     'Clean base to expand content over the long term',

    /* Service 3 — Typewriter */
    'svc3.sub':     'Scenes, presentation, and guided moments',
    'svc3.preview': 'Implementation of scenes and sequences designed to improve onboarding, reinforce server identity, and make the initial experience feel much more polished.',
    'svc3.li1':     'Cutscenes, guided sequences, and integrated storytelling',
    'svc3.li2':     'Applied in onboarding, missions, and key moments',
    'svc3.li3':     'More cinematic presentation without losing technical clarity',

    /* Service 4 — Custom Plugins */
    'svc4.title':   'CUSTOM PLUGINS',
    'svc4.sub':     'Compatibility, balance, and technical ecosystem',
    'svc4.preview': 'Advanced plugin integration focused on real compatibility, system balance, and an architecture that stays clean as the project grows.',
    'svc4.li1':     'Plugins aligned with each other and better connected',
    'svc4.li2':     'Less friction between mechanics, staff, and maintenance',
    'svc4.li3':     'Technical architecture ready for organized growth',

    /* Service 5 — Server Setup */
    'svc5.sub':     'Permissions, structure, and central organization',
    'svc5.preview': 'Base configuration for new servers or projects that need a cleaner structure, well-defined permissions, and an organization ready to scale.',
    'svc5.li1':     'LuckPerms, ranks, economy, and base configurations',
    'svc5.li2':     'Core modules better organized from the start',
    'svc5.li3':     'Clearer technical foundation for future expansions',

    /* Service 6 — Textures & 3D */
    'svc6.title':   'TEXTURES &amp; 3D',
    'svc6.sub':     'Assets, resource packs, and visual identity',
    'svc6.preview': 'Visual work for projects that need a more distinctive identity through items, iconography, textures, and 3D resources integrated with the server style.',
    'svc6.li1':     "Assets aligned with the project's visual direction",
    'svc6.li2':     'Compatibility with Oraxen, ItemsAdder, and resource packs',
    'svc6.li3':     'A visual layer that improves perception and consistency',

    /* Stack */
    'stack.eyebrow': 'Tools',
    'stack.col1':    'RPG Plugins',
    'stack.col2':    'Narrative & UX',

    /* Portfolio */
    'port.eyebrow': 'Work',
    'pf.all':       'All',
    'pf.textures':  'Textures',
    'pf.servers':   'Servers',
    'pc1.name':     'RPG World — Aeloria',
    'pc2.name':     'Ice Dragon Boss',
    'pc3.name':     'Quest — The Guardians',
    'pc4.name':     'Cinematic SkyBlock',
    'pc5.name':     'Medieval Resource Pack',
    'pc5.type':     'Textures · OptiFine',
    'pc6.name':     '3D Mob — Arcane Golem',
    'pc7.name':     'Survival + SkyBlock Network',
    'pc7.type':     'Velocity · Server Setup',

    /* Process */
    'proc.eyebrow': 'How we work',
    'proc.head':    'PROCESS',
    'proc1.name':   'Brief & Scope',
    'proc1.tag1':   '1–2 days',
    'proc1.desc':   'We review your idea, references, version, involved plugins, and real objectives to define a coherent and well-grounded scope.',
    'proc2.name':   'Architecture',
    'proc2.tag1':   'Plan',
    'proc2.tag2':   'Structure',
    'proc2.desc':   'The solution is organized: dependencies, quest flow, mob logic, permissions, files, and sensitive points before development begins.',
    'proc3.name':   'Development & Testing',
    'proc3.tag1':   'Build',
    'proc3.tag2':   'QA',
    'proc3.desc':   'Configuration, testing, adjustments, and validation in a real environment to reduce bugs, conflicts, and fragile deliveries.',
    'proc4.name':   'Delivery',
    'proc4.tag1':   'Delivery',
    'proc4.tag2':   'Docs',
    'proc4.desc':   'You receive organized files, installation notes, important observations, and initial support to get the project ready to deploy.',

    /* Contact */
    'contact.eyebrow': "Let's talk",
    'contact.head':    'START<br>PROJECT',
    'contact.intro':   'If you need to improve your server structure, organize complex configurations, or build a more robust experience, we can work through it together.',
    'contact.check1':  'You want a more serious and maintainable setup',
    'contact.check2':  'You need better-structured quests, bosses, or scenes',
    'contact.check3':  'Your current config works, but it feels disorganized',
    'contact.check4':  "You're looking for direct technical development, no middlemen",
    'contact.discord': 'dominik2581',
    'contact.bbb':     'dominika_19',

    /* Form */
    'form.eyebrow':     'Get in touch',
    'form.head':        'SEND A<br>MESSAGE',
    'form.lbl.name':    'Name / Nick',
    'form.lbl.contact': 'Contact',
    'form.lbl.service': 'Service',
    'form.lbl.version': 'Version',
    'form.lbl.budget':  'Budget',
    'form.lbl.timeline':'Ideal timeline',
    'form.lbl.desc':    'Project description',
    'form.ph.name':     'Your name',
    'form.ph.contact':  'Discord or email',
    'form.ph.budget':   'e.g. 150–300 USD',
    'form.ph.timeline': 'e.g. 2 weeks',
    'form.ph.desc':     "Tell me what you need, which plugins you want to integrate, references, current issues, and your server's goal.",
    'form.opt.default': 'Select a service...',
    'form.opt.mm':      'MythicMobs',
    'form.opt.bq':      'BetonQuest',
    'form.opt.tw':      'Typewriter',
    'form.opt.plugins': 'Advanced plugins',
    'form.opt.setup':   'Server setup',
    'form.opt.tex':     'Textures & 3D',
    'form.opt.bundle':  'Full bundle',
    'form.submit':      'Send message',

    /* Footer */
    'footer.copy':     '© 2026 ARVO Studio · Premium configuration for Minecraft servers',
    'footer.services': 'Services',
    'footer.contact':  'Contact',
  };

  /* ── Español ────────────────────────────────────────────── */
  const es = {
    /* Nav */
    'nav.services': 'Servicios',
    'nav.process':  'Proceso',
    'nav.contact':  'Contacto',
    'nav.hire':     'Contratar',
    'ham.aria':     'Menú',

    /* Hero */
    'hero.badge':   'Disponible para proyectos',
    'hero.eyebrow': 'Estudio de Configuración Minecraft',
    'hero.sub':     'Estudio especializado en MythicMobs, BetonQuest, Typewriter y configuración avanzada de servidores Minecraft. Desarrollo técnico, estructura clara y entregas pensadas para proyectos serios.',
    'hero.btn1':    'Ver portfolio',
    'hero.btn2':    'Servicios',
    'hero.stat1':   'Configs',
    'hero.stat2':   'Clientes',
    'hero.stat3':   'Versiones',
    'hero.aria':    'Vista previa 3D del estudio',
    'hero.prefix':  'Construimos',

    /* Services — header */
    'svc.eyebrow':      'Qué hacemos',
    'svc.head':         'SERVICIOS',
    'svc.sub':          'Configuración avanzada, integración y capas de contenido pensadas para proyectos que necesitan una base técnica más sólida y una presentación más cuidada.',
    'svc.scroller.aria': 'Carrusel horizontal de servicios',

    /* Service 1 — MythicMobs */
    'svc1.sub':     'Jefes, habilidades y comportamiento avanzado',
    'svc1.preview': 'Configuración orientada a combate PvE, escalado de dificultad y enfrentamientos más sólidos para proyectos que necesitan contenido memorable y técnicamente consistente.',
    'svc1.li1':     'Habilidades, objetivos y condiciones con mejor estructura interna',
    'svc1.li2':     'Fases, IA y drops conectados con la progresión del servidor',
    'svc1.li3':     'Integración limpia con ModelEngine, misiones y sistemas RPG',

    /* Service 2 — BetonQuest */
    'svc2.sub':     'Progresión guiada, diálogos y lógica narrativa',
    'svc2.preview': 'Diseño y configuración de cadenas de misiones con progresión clara, eventos mejor conectados y una estructura más ordenada para proyectos que necesitan crecer sin volverse inmanejables.',
    'svc2.li1':     'Cadenas de misiones, diálogos y variables mejor resueltos',
    'svc2.li2':     'Eventos, NPCs y recompensas enlazados con más coherencia',
    'svc2.li3':     'Base limpia para ampliar contenido a largo plazo',

    /* Service 3 — Typewriter */
    'svc3.sub':     'Escenas, presentación y momentos guiados',
    'svc3.preview': 'Implementación de escenas y secuencias diseñadas para mejorar la presentación inicial, reforzar la identidad del servidor y lograr una experiencia de entrada mucho más cuidada.',
    'svc3.li1':     'Cinemáticas, secuencias guiadas y narrativa integrada',
    'svc3.li2':     'Aplicación en entrada al servidor, misiones y momentos clave',
    'svc3.li3':     'Presentación más cinematográfica sin perder claridad técnica',

    /* Service 4 — Plugins a medida */
    'svc4.title':   'PLUGINS A MEDIDA',
    'svc4.sub':     'Compatibilidad, balance y ecosistema técnico',
    'svc4.preview': 'Integración de plugins avanzados con foco en compatibilidad real, balance de sistemas y una arquitectura que se mantenga clara cuando el proyecto crezca.',
    'svc4.li1':     'Plugins alineados entre sí y mejor conectados',
    'svc4.li2':     'Menos fricción entre mecánicas, administración y mantenimiento',
    'svc4.li3':     'Arquitectura técnica preparada para crecimiento ordenado',

    /* Service 5 — Server Setup */
    'svc5.sub':     'Permisos, estructura y organización central',
    'svc5.preview': 'Configuración base para servidores nuevos o proyectos que necesitan una estructura más limpia, permisos bien definidos y una organización preparada para escalar.',
    'svc5.li1':     'LuckPerms, rangos, economía y configuraciones base',
    'svc5.li2':     'Módulos centrales mejor organizados desde el inicio',
    'svc5.li3':     'Base técnica más clara para futuras expansiones',

    /* Service 6 — Texturas & 3D */
    'svc6.title':   'TEXTURAS &amp; 3D',
    'svc6.sub':     'Recursos visuales, paquetes de texturas e identidad visual',
    'svc6.preview': 'Trabajo visual para proyectos que necesitan una identidad más propia mediante ítems, iconografía, texturas y recursos 3D integrados con el estilo del servidor.',
    'svc6.li1':     'Recursos alineados con la dirección visual del proyecto',
    'svc6.li2':     'Compatibilidad con Oraxen, ItemsAdder y paquetes de texturas',
    'svc6.li3':     'Una capa visual que mejora la percepción y la coherencia',

    /* Stack */
    'stack.eyebrow': 'Herramientas',
    'stack.col1':    'Plugins RPG',
    'stack.col2':    'Narrativa y UX',

    /* Portfolio */
    'port.eyebrow': 'Trabajos',
    'pf.all':       'Todo',
    'pf.textures':  'Texturas',
    'pf.servers':   'Servidores',
    'pc1.name':     'Mundo RPG — Aeloria',
    'pc2.name':     'Boss Dragón de Hielo',
    'pc3.name':     'Misión — Los Guardianes',
    'pc4.name':     'Cinemática SkyBlock',
    'pc5.name':     'Paquete de texturas medieval',
    'pc5.type':     'Texturas · OptiFine',
    'pc6.name':     'Mob 3D — Gólem Arcano',
    'pc7.name':     'Red Survival + SkyBlock',
    'pc7.type':     'Velocity · Configuración de servidor',

    /* Process */
    'proc.eyebrow': 'Cómo trabajamos',
    'proc.head':    'PROCESO',
    'proc1.name':   'Resumen y alcance',
    'proc1.tag1':   '1–2 días',
    'proc1.desc':   'Revisamos tu idea, referencias, versión, plugins implicados y objetivos reales para definir un alcance coherente y bien fundamentado.',
    'proc2.name':   'Arquitectura',
    'proc2.tag1':   'Plan',
    'proc2.tag2':   'Estructura',
    'proc2.desc':   'Se ordena la solución: dependencias, flujo de misiones, lógica de mobs, permisos, archivos y puntos sensibles antes de desarrollar.',
    'proc3.name':   'Desarrollo y pruebas',
    'proc3.tag1':   'Construcción',
    'proc3.tag2':   'QA',
    'proc3.desc':   'Configuración, pruebas, ajustes y validación en entorno real para reducir errores, conflictos y entregas frágiles.',
    'proc4.name':   'Entrega',
    'proc4.tag1':   'Entrega',
    'proc4.tag2':   'Documentación',
    'proc4.desc':   'Recibes archivos organizados, notas de instalación, observaciones importantes y soporte inicial para dejar el proyecto listo para implementar.',

    /* Contact */
    'contact.eyebrow': 'Hablemos',
    'contact.head':    'INICIAR<br>PROYECTO',
    'contact.intro':   'Si necesitas mejorar la estructura de tu servidor, ordenar configuraciones complejas o desarrollar una experiencia más sólida, podemos revisarlo juntos.',
    'contact.check1':  'Quieres una configuración más seria y mantenible',
    'contact.check2':  'Necesitas misiones, jefes o escenas mejor estructuradas',
    'contact.check3':  'Tu configuración actual funciona, pero se siente desordenada',
    'contact.check4':  'Buscas desarrollo técnico directo, sin intermediarios',
    'contact.discord': 'dominik2581',
    'contact.bbb':     'dominika_19',

    /* Form */
    'form.eyebrow':     'Escríbenos',
    'form.head':        'ENVÍA UN<br>MENSAJE',
    'form.lbl.name':    'Nombre / Nick',
    'form.lbl.contact': 'Contacto',
    'form.lbl.service': 'Servicio',
    'form.lbl.version': 'Versión',
    'form.lbl.budget':  'Presupuesto',
    'form.lbl.timeline':'Plazo ideal',
    'form.lbl.desc':    'Descripción del proyecto',
    'form.ph.name':     'Tu nombre',
    'form.ph.contact':  'Discord o correo',
    'form.ph.budget':   'Ej. 150–300 USD',
    'form.ph.timeline': 'Ej. 2 semanas',
    'form.ph.desc':     'Cuéntame qué necesitas, qué plugins quieres integrar, referencias, problemas actuales y el objetivo de tu servidor.',
    'form.opt.default': 'Selecciona un servicio...',
    'form.opt.mm':      'MythicMobs',
    'form.opt.bq':      'BetonQuest',
    'form.opt.tw':      'Typewriter',
    'form.opt.plugins': 'Plugins avanzados',
    'form.opt.setup':   'Configuración de servidor',
    'form.opt.tex':     'Texturas y 3D',
    'form.opt.bundle':  'Paquete completo',
    'form.submit':      'Enviar mensaje',

    /* Footer */
    'footer.copy':     '© 2026 ARVO Studio · Configuración premium para servidores Minecraft',
    'footer.services': 'Servicios',
    'footer.contact':  'Contacto',
  };

  const TRANSLATIONS = { en, es };

  let currentLang = localStorage.getItem('arvo-lang') || 'en';
  let dropOpen = false;

  const TYPE_WORDS = {
    en: 'configs that last,structure that scales,your vision executed,projects that endure,results that hold',
    es: 'configs que duran,estructura que escala,tu visión ejecutada,proyectos que perduran,resultados sólidos',
  };

  function applyLang(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    currentLang = lang;
    localStorage.setItem('arvo-lang', lang);

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = t[el.getAttribute('data-i18n')];
      if (v !== undefined) el.innerHTML = v;
    });
    document.querySelectorAll('[data-i18n-ph]').forEach(el => {
      const v = t[el.getAttribute('data-i18n-ph')];
      if (v !== undefined) el.placeholder = v;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const v = t[el.getAttribute('data-i18n-aria')];
      if (v !== undefined) el.setAttribute('aria-label', v);
    });

    /* Update typewriter words and restart loop */
    const typeEl = document.getElementById('heroTypeText');
    if (typeEl && TYPE_WORDS[lang]) {
      typeEl.dataset.words = TYPE_WORDS[lang];
      if (typeof window.arvoRestartTypewriter === 'function') {
        window.arvoRestartTypewriter();
      }
    }

    document.documentElement.lang = lang;
    updateUI();
  }

  function updateUI() {
    const wrap = document.getElementById('langToggle');
    if (!wrap) return;
    wrap.querySelector('.lang-btn img').src = FLAGS[currentLang];
    wrap.querySelector('.lt-label').textContent = LABELS[currentLang];
    wrap.querySelectorAll('.lt-option').forEach(o =>
      o.classList.toggle('lt-active', o.dataset.lang === currentLang)
    );
  }

  function setDrop(state) {
    dropOpen = state;
    const wrap = document.getElementById('langToggle');
    if (wrap) wrap.classList.toggle('open', state);
  }

  function buildButton() {
    const navRight = document.querySelector('.nav-right');
    if (!navRight) return;

    const wrap = document.createElement('div');
    wrap.id = 'langToggle';
    wrap.className = 'lang-sw';
    wrap.innerHTML =
      `<button class="lang-btn" type="button">` +
        `<img src="${FLAGS[currentLang]}" alt="flag">` +
        `<span class="lt-label">${LABELS[currentLang]}</span>` +
        `<span class="lt-arrow">▼</span>` +
      `</button>` +
      `<div class="lang-drop">` +
        `<button class="lt-option" data-lang="en" type="button">` +
          `<img src="${FLAGS.en}" alt="EN">EN<span class="lt-check">✓</span>` +
        `</button>` +
        `<button class="lt-option" data-lang="es" type="button">` +
          `<img src="${FLAGS.es}" alt="ES">ES<span class="lt-check">✓</span>` +
        `</button>` +
      `</div>`;

    wrap.querySelector('.lang-btn').addEventListener('click', e => {
      e.stopPropagation();
      setDrop(!dropOpen);
    });
    wrap.querySelectorAll('.lt-option').forEach(opt => {
      opt.addEventListener('click', e => {
        e.stopPropagation();
        applyLang(opt.dataset.lang);
        setDrop(false);
      });
    });

    const themeSw = navRight.querySelector('.theme-sw');
    navRight.insertBefore(wrap, themeSw);
  }

  document.addEventListener('click', () => { if (dropOpen) setDrop(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') setDrop(false); });

  function init() { buildButton(); applyLang(currentLang); }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else { init(); }
})();
