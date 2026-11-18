/**
 * site.js — Igor Cruz portfolio
 * ---------------------------------------------------------------------------
 * Small, dependency-free behaviour. The page works without it: every case is
 * open and every filter is just a label. With it:
 *   1. Dark-mode switch (remembers the choice in this browser only)
 *   2. "Copy address" buttons with a confirmation state
 *   3. Cases close on load and open when pressed
 *   4. Filter switches show one area of work at a time
 *   5. Spatial depth: glass windows tilt toward the pointer
 * ---------------------------------------------------------------------------
 */
(() => {
  'use strict';

  const root = document.documentElement;

  /* ===== 1. Dark mode ===== */

  const themeSwitch = document.querySelector('.theme-switch');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  /** True when the page is currently showing the dark palette. */
  const isDark = () => root.dataset.theme
    ? root.dataset.theme === 'dark'
    : prefersDark.matches;

  const syncThemeSwitch = () => {
    if (themeSwitch) themeSwitch.setAttribute('aria-pressed', String(isDark()));
  };

  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      root.dataset.theme = next;
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: fine for this visit */ }
      syncThemeSwitch();
    });
    prefersDark.addEventListener('change', syncThemeSwitch);
    syncThemeSwitch();
  }

  /* ===== 2. Copy email address ===== */

  document.querySelectorAll('.copy-email').forEach((btn) => {
    const label = btn.textContent;
    btn.addEventListener('click', async () => {
      const email = btn.dataset.email;
      let ok = false;
      try {
        await navigator.clipboard.writeText(email);
        ok = true;
      } catch (e) {
        // Older browsers: copy through a temporary, off-screen field.
        const field = Object.assign(document.createElement('textarea'), { value: email });
        field.style.cssText = 'position:fixed;opacity:0';
        document.body.append(field);
        field.select();
        ok = document.execCommand && document.execCommand('copy');
        field.remove();
      }
      if (!ok) { window.location.href = `mailto:${email}`; return; }
      btn.textContent = btn.dataset.done;
      btn.classList.add('is-done');
      setTimeout(() => { btn.textContent = label; btn.classList.remove('is-done'); }, 2200);
    });
  });

  /* ===== 3. Case keys ===== */

  const cases = [...document.querySelectorAll('.case')];

  /** Opens or closes one case and keeps its accessible state in sync. */
  const setOpen = (card, open) => {
    const toggle = card.querySelector('.case-toggle');
    const body = document.getElementById(toggle.getAttribute('aria-controls'));
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', `${open ? toggle.dataset.close : toggle.dataset.open}: ${toggle.textContent.trim()}`);
    body.hidden = !open;
    card.classList.toggle('is-open', open);
  };

  cases.forEach((card) => {
    setOpen(card, false);
    card.querySelector('.case-toggle').addEventListener('click', (event) => {
      const open = event.currentTarget.getAttribute('aria-expanded') !== 'true';
      setOpen(card, open);
    });
  });

  // A link straight to a case (#case-id) opens it.
  const fromHash = document.getElementById(decodeURIComponent(location.hash.slice(1)));
  if (fromHash && fromHash.classList.contains('case')) setOpen(fromHash, true);

  /* ===== 4. Filters ===== */

  const filterButtons = [...document.querySelectorAll('.chip-switch')];
  const showing = document.querySelector('.showing');

  const applyFilter = (key) => {
    let visible = 0;
    cases.forEach((card) => {
      const match = key === 'all' || card.dataset.tag === key;
      card.hidden = !match;
      if (match) visible += 1;
    });
    filterButtons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === key)));
    if (showing) {
      showing.textContent = showing.dataset.template
        .replace('{n}', visible)
        .replace('{total}', cases.length);
    }
  };

  filterButtons.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
  applyFilter('all');

  /* ===== 5. Spatial depth ===== */
  /*
   * Each .stage reports where the pointer is (--px, --py from -1 to 1).
   * CSS turns that into a gentle tilt of the glass window and parallax of the
   * clay shapes. Only with a fine pointer and when motion is allowed.
   */
  const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  if (motionOk && finePointer) {
    document.querySelectorAll('.stage').forEach((stage) => {
      let frame = 0;
      stage.addEventListener('pointermove', (event) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const box = stage.getBoundingClientRect();
          const px = ((event.clientX - box.left) / box.width) * 2 - 1;
          const py = ((event.clientY - box.top) / box.height) * 2 - 1;
          stage.style.setProperty('--px', px.toFixed(3));
          stage.style.setProperty('--py', py.toFixed(3));
        });
      });
      stage.addEventListener('pointerleave', () => {
        cancelAnimationFrame(frame);
        stage.style.setProperty('--px', '0');
        stage.style.setProperty('--py', '0');
      });
    });
  }
})();
