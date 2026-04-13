/**
 * ARVO Studio — arvo.js
 * Nav scroll · Mobile side panel · Counter animation · Reveal · Portfolio filter · Type effects
 */

(function () {
  'use strict';

  const root = document.documentElement;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';

  /* NAV */
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const navToggle = document.getElementById('ham');
  const navLinks  = document.getElementById('navLinks');
  const overlay   = document.getElementById('nav-overlay');

  function openMenu() {
    if (!navToggle || !navLinks || !overlay) return;
    navToggle.classList.add('active');
    navLinks.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!navToggle || !navLinks || !overlay) return;
    navToggle.classList.remove('active');
    navLinks.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  navToggle && navToggle.addEventListener('click', () => {
    navLinks && navLinks.classList.contains('open') ? closeMenu() : openMenu();
  });
  navLinks && navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  overlay && overlay.addEventListener('click', closeMenu);

  /* NAV ACTIVE */
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      if (window.scrollY >= section.offsetTop - 110) current = section.id;
    });
    navAnchors.forEach(anchor => {
      anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  /* COUNTERS */
  function animateCounter(el) {
    const target = parseFloat(el.dataset.target || '0');
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const decimals = parseInt(el.dataset.decimal || '0', 10);
    const useComma = el.dataset.comma === 'true';
    const duration = 1800;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      let value = eased * target;
      value = decimals > 0 ? value.toFixed(decimals) : Math.round(value);
      if (useComma) value = Number(value).toLocaleString();
      el.textContent = prefix + value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  /* TYPE LABELS */
  function typeText(el, text, speed = 45) {
    if (!el) return;
    el.classList.add('is-typing');
    el.textContent = '';
    let index = 0;
    function step() {
      el.textContent = text.slice(0, index + 1);
      index += 1;
      if (index < text.length) {
        setTimeout(step, speed);
      }
    }
    step();
  }

  function initHeroTypedLoop() {
    const target = document.getElementById('heroTypeText');
    const cursor = document.getElementById('heroTypeCursor');
    if (!target) return;

    if (prefersReducedMotion) {
      const w = (target.dataset.words || '').split(',')[0] || '';
      target.textContent = w.trim();
      cursor && cursor.classList.add('done');
      return;
    }

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timer = null;
    let active = true;

    function getWords() {
      return (target.dataset.words || '')
        .split(',')
        .map(w => w.trim())
        .filter(Boolean);
    }

    function loop() {
      if (!active) return;
      const words = getWords();
      if (!words.length) return;
      wordIndex = wordIndex % words.length;
      const word = words[wordIndex];

      if (!deleting) {
        target.textContent = word.slice(0, charIndex + 1);
        charIndex += 1;
        if (charIndex === word.length) {
          deleting = true;
          timer = setTimeout(loop, 1100);
          return;
        }
        timer = setTimeout(loop, 70);
      } else {
        target.textContent = word.slice(0, charIndex - 1);
        charIndex -= 1;
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timer = setTimeout(loop, 160);
          return;
        }
        timer = setTimeout(loop, 40);
      }
    }

    loop();

    /* Expose global restart — called by lang.js on language change */
    window.arvoRestartTypewriter = function () {
      clearTimeout(timer);
      active = false;
      setTimeout(() => {
        active = true;
        wordIndex = 0;
        charIndex = 0;
        deleting = false;
        target.textContent = '';
        loop();
      }, 80);
    };
  }

  /* REVEAL + COUNTERS + STAT LABELS */
  const counterEls = document.querySelectorAll('.stat-number[data-target]');
  const statLabels = document.querySelectorAll('.type-label');
  const revealEls = document.querySelectorAll('.fade-up');

  if (!prefersReducedMotion && !hasGsap) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const siblings = entry.target.parentElement?.querySelectorAll('.fade-up:not(.visible)') || [entry.target];
        const idx = Array.from(siblings).indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), Math.max(0, idx) * 90);
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });
    counterEls.forEach(el => counterObserver.observe(el));

    const statsWrap = document.getElementById('heroStats');
    if (statsWrap) {
      const labelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          statLabels.forEach((label, index) => {
            const finalText = label.dataset.text || label.textContent.trim();
            setTimeout(() => typeText(label, finalText, 38), index * 180);
          });
          labelObserver.unobserve(entry.target);
        });
      }, { threshold: 0.55 });
      labelObserver.observe(statsWrap);
    }
  } else if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('visible'));
    counterEls.forEach(el => {
      const target = parseFloat(el.dataset.target || '0');
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      el.textContent = prefix + target + suffix;
    });
    statLabels.forEach(label => {
      label.textContent = label.dataset.text || label.textContent.trim();
    });
  }

  function initGsapEnhancements() {
    if (!hasGsap || prefersReducedMotion) return;

    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo('#hero .fade-up',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
        delay: 0.08,
      }
    );

    gsap.fromTo('.hero-right',
      { x: 32, opacity: 0, scale: 0.98 },
      { x: 0, opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.18 }
    );

    gsap.to('.hero-glow', {
      yPercent: 6,
      xPercent: -3,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });

    gsap.utils.toArray('.stack-col').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 84%' },
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: index * 0.05,
      });
    });

    gsap.utils.toArray('#portfolioGrid .pc').forEach((card, index) => {
      gsap.from(card, {
        scrollTrigger: { trigger: card, start: 'top 88%' },
        y: 42,
        opacity: 0,
        duration: 0.72,
        ease: 'power3.out',
        delay: index * 0.03,
      });
    });

    gsap.utils.toArray('.proc-row').forEach((row, index) => {
      gsap.from(row, {
        scrollTrigger: { trigger: row, start: 'top 88%' },
        x: index % 2 === 0 ? -22 : 22,
        opacity: 0,
        duration: 0.75,
        ease: 'power2.out',
      });
    });

    gsap.from('.contact-l', {
      scrollTrigger: { trigger: '#contacto', start: 'top 78%' },
      y: 36,
      opacity: 0,
      duration: 0.82,
      ease: 'power3.out',
    });

    gsap.from('.c-form', {
      scrollTrigger: { trigger: '.c-form', start: 'top 84%' },
      y: 36,
      opacity: 0,
      duration: 0.82,
      ease: 'power3.out',
    });
  }

  initHeroTypedLoop();
  initGsapEnhancements();

  /* PORTFOLIO FILTER */
  const filterButtons = document.querySelectorAll('.pf[data-filter]');
  const cards = document.querySelectorAll('#portfolioGrid .pc[data-category]');
  const hideTimers = new WeakMap();
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      cards.forEach(card => {
        const timer = hideTimers.get(card);
        if (timer) {
          clearTimeout(timer);
          hideTimers.delete(card);
        }
        const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
        const show = filter === 'all' || categories.includes(filter);
        if (show) {
          card.classList.remove('is-hidden');
          requestAnimationFrame(() => card.classList.remove('is-leaving'));
          return;
        }

        card.classList.add('is-leaving');
        const hideTimer = window.setTimeout(() => {
          card.classList.add('is-hidden');
          hideTimers.delete(card);
        }, 220);
        hideTimers.set(card, hideTimer);
      });
    });
  });

/* SERVICES X SLIDER */
  const servicesViewport = document.querySelector('.svcx-viewport');
  const servicesScroller = document.getElementById('servicesScroller');
  const servicesTrack = document.getElementById('servicesTrack');

  const isTouchDevice = window.matchMedia('(max-width: 960px)').matches;

  if (servicesScroller && servicesTrack) {
    servicesScroller.tabIndex = 0;
    const originals = Array.from(servicesTrack.children).map((card) => card.cloneNode(true));
    const originalCount = originals.length;
    const repeatSets = isTouchDevice ? 1 : 3;
    const middleSet = Math.floor(repeatSets / 2);
    let allCards = [];
    let activeAbsIndex = middleSet * originalCount;
    let snapTimer = null;
    let wheelLock = false;
    let wheelResetTimer = null;
    let wheelBuffer = 0;
    let pointerActive = false;
    let dragStartX = 0;
    let dragStartScroll = 0;

    servicesTrack.innerHTML = '';
    for (let setIndex = 0; setIndex < repeatSets; setIndex += 1) {
      const fragment = document.createDocumentFragment();
      originals.forEach((card, logicalIndex) => {
        const clone = card.cloneNode(true);
        clone.dataset.logicalIndex = String(logicalIndex);
        clone.dataset.setIndex = String(setIndex);
        if (setIndex !== middleSet) clone.setAttribute('aria-hidden', 'true');
        fragment.appendChild(clone);
      });
      servicesTrack.appendChild(fragment);
    }

    allCards = Array.from(servicesTrack.querySelectorAll('.svcx-card'));

    function getCardCenterLeft(card) {
      return card.offsetLeft - ((servicesScroller.clientWidth - card.offsetWidth) / 2);
    }

    function getNearestAbsIndex() {
      const viewportCenter = servicesScroller.scrollLeft + servicesScroller.clientWidth / 2;
      let nearestIndex = activeAbsIndex;
      let nearestDist = Infinity;

      allCards.forEach((card, index) => {
        const center = card.offsetLeft + card.offsetWidth / 2;
        const dist = Math.abs(center - viewportCenter);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIndex = index;
        }
      });

      return nearestIndex;
    }

    function recenterWithoutVisualJump() {
      const currentIndex = getNearestAbsIndex();
      const logicalIndex = Number(allCards[currentIndex]?.dataset.logicalIndex || 0);
      const currentSet = Number(allCards[currentIndex]?.dataset.setIndex || middleSet);
      const targetIndex = middleSet * originalCount + logicalIndex;

      if (currentSet === middleSet || !allCards[targetIndex] || !allCards[currentIndex]) {
        activeAbsIndex = currentIndex;
        return;
      }

      const currentLeft = getCardCenterLeft(allCards[currentIndex]);
      const targetLeft = getCardCenterLeft(allCards[targetIndex]);
      servicesScroller.scrollLeft += targetLeft - currentLeft;
      activeAbsIndex = targetIndex;
    }

    function goToAbsIndex(absIndex, behavior = 'smooth') {
      const target = allCards[absIndex];
      if (!target) return;
      activeAbsIndex = absIndex;
      servicesScroller.scrollTo({ left: getCardCenterLeft(target), behavior });
    }

    function syncToNearestCard(behavior = 'smooth') {
      activeAbsIndex = getNearestAbsIndex();
      goToAbsIndex(activeAbsIndex, behavior);
      window.setTimeout(recenterWithoutVisualJump, behavior === 'smooth' ? 420 : 0);
    }

    function goStep(direction) {
      activeAbsIndex = getNearestAbsIndex();
      const nextIndex = direction === 'next' ? activeAbsIndex + 1 : activeAbsIndex - 1;
      if (!allCards[nextIndex]) return;
      goToAbsIndex(nextIndex, 'smooth');
      window.setTimeout(recenterWithoutVisualJump, 420);
    }

    function normalizedWheel(event) {
      let delta = event.deltaY;
      if (Math.abs(event.deltaX) > Math.abs(delta)) delta = event.deltaX;
      if (event.deltaMode === 1) delta *= 16;
      if (event.deltaMode === 2) delta *= window.innerHeight;
      if (!delta) return 0;
      return Math.sign(delta);
    }

    function initPosition() {
      allCards = Array.from(servicesTrack.querySelectorAll('.svcx-card'));
      activeAbsIndex = middleSet * originalCount;
      goToAbsIndex(activeAbsIndex, 'auto');
    }

    requestAnimationFrame(initPosition);
    window.addEventListener('resize', () => requestAnimationFrame(() => syncToNearestCard('auto')));

    /*
     * On touch/mobile (≤960px): CSS scroll-snap handles everything natively.
     * On desktop: custom wheel + pointer drag with infinite loop recentering.
     */
    if (!isTouchDevice) {
      servicesScroller.addEventListener('scroll', () => {
        clearTimeout(snapTimer);
        if (!pointerActive) recenterWithoutVisualJump();
        snapTimer = setTimeout(() => { if (!pointerActive) syncToNearestCard('smooth'); }, 120);
      }, { passive: true });

      const wheelTarget = servicesViewport || servicesScroller;
      wheelTarget.addEventListener('wheel', (event) => {
        const mostlyVertical = Math.abs(event.deltaY) >= Math.abs(event.deltaX);
        if (!mostlyVertical) return;

        event.preventDefault();
        const delta = normalizedWheel(event);
        if (!delta) return;

        wheelBuffer += delta;
        clearTimeout(wheelResetTimer);
        wheelResetTimer = setTimeout(() => { wheelBuffer = 0; }, 120);
        if (wheelLock) return;

        if (wheelBuffer < 0) {
          goStep('next');
          wheelLock = true;
          wheelBuffer = 0;
        } else if (wheelBuffer > 0) {
          goStep('prev');
          wheelLock = true;
          wheelBuffer = 0;
        }

        if (wheelLock) {
          setTimeout(() => { wheelLock = false; }, 430);
        }
      }, { passive: false });

      servicesScroller.addEventListener('pointerdown', (event) => {
        pointerActive = true;
        dragStartX = event.clientX;
        dragStartScroll = servicesScroller.scrollLeft;
        servicesScroller.setPointerCapture(event.pointerId);
        servicesScroller.classList.add('is-dragging');
      });

      servicesScroller.addEventListener('pointermove', (event) => {
        if (!pointerActive) return;
        const delta = event.clientX - dragStartX;
        servicesScroller.scrollLeft = dragStartScroll - delta;
      });

      const stopPointer = () => {
        if (!pointerActive) return;
        pointerActive = false;
        servicesScroller.classList.remove('is-dragging');
        syncToNearestCard('smooth');
      };

      servicesScroller.addEventListener('pointerup', stopPointer);
      servicesScroller.addEventListener('pointercancel', stopPointer);
      servicesScroller.addEventListener('pointerleave', stopPointer);
      servicesScroller.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
          event.preventDefault();
          goStep('next');
        } else if (event.key === 'ArrowLeft') {
          event.preventDefault();
          goStep('prev');
        }
      });
    }
  }

  /* THEME */
  const themeToggle = document.getElementById('themeToggle');
  const navLogo = document.getElementById('navLogo');
  const footerLogo = document.getElementById('footerLogo');

  function applyTheme(theme) {
    const isLight = theme === 'light';
    if (isLight) {
      root.setAttribute('data-theme', 'light');
      localStorage.setItem('arvo-theme', 'light');
    } else {
      root.removeAttribute('data-theme');
      localStorage.setItem('arvo-theme', 'dark');
    }
    const logoSrc = isLight ? 'logo_positive.svg' : 'logo_negative.svg';
    if (navLogo) navLogo.src = logoSrc;
    if (footerLogo) footerLogo.src = logoSrc;
    if (themeToggle) themeToggle.checked = isLight;
  }

  applyTheme(localStorage.getItem('arvo-theme') === 'light' ? 'light' : 'dark');
  themeToggle && themeToggle.addEventListener('change', () => {
    applyTheme(themeToggle.checked ? 'light' : 'dark');
  });

  /* CONTACT SHORTCUTS */
  document.querySelectorAll('.cc-copy[data-copy]').forEach(button => {
    button.addEventListener('click', async () => {
      const value = button.dataset.copy || '';
      if (!value) return;
      const lang = document.documentElement.lang || 'en';
      const label = button.querySelector('.cc-val');
      const original = button.dataset.originalValue || label?.textContent || value;
      button.dataset.originalValue = original;

      try {
        await navigator.clipboard.writeText(value);
        button.classList.add('is-copied');
        if (label) label.textContent = lang === 'es' ? 'Copiado al portapapeles' : 'Copied to clipboard';
      } catch {
        if (label) label.textContent = value;
      }

      window.setTimeout(() => {
        button.classList.remove('is-copied');
        if (label) label.textContent = original;
      }, 1800);
    });
  });

  /* FORM — fetch-based submit with loading / success / error states */
  const form = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const submitBtn = form && form.querySelector('.f-sub');

  form && form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!formSuccess) return;
    const lang = document.documentElement.lang || 'en';

    /* Disable button + show loading */
    if (submitBtn) { submitBtn.disabled = true; submitBtn.classList.add('is-loading'); }
    formSuccess.className = 'f-success';
    formSuccess.textContent = lang === 'es' ? 'Enviando mensaje…' : 'Sending message…';

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' },
      });
      if (res.ok) {
        formSuccess.classList.add('f-success--ok');
        formSuccess.textContent = lang === 'es' ? '¡Mensaje enviado! Te responderé pronto.' : "Message sent! I'll get back to you soon.";
        form.reset();
      } else {
        throw new Error(res.status);
      }
    } catch {
      formSuccess.classList.add('f-success--err');
      formSuccess.textContent = lang === 'es' ? 'Error al enviar. Inténtalo de nuevo o contáctame por Discord.' : 'Failed to send. Please try again or reach me on Discord.';
    } finally {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.classList.remove('is-loading'); }
    }
  });
})();
