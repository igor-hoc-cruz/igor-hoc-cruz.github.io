/**
 * site.js — Igor Cruz portfolio
 * ---------------------------------------------------------------------------
 * Small, dependency-free behaviour. The page works without it: every case is
 * open, gauges show their values and the console is a still picture.
 *
 *   1. Theme switch: Obsidian (default) or Platinum, remembered locally
 *   2. "Copy address" buttons with a confirmation state
 *   3. Case keys: close on load, open smoothly when pressed
 *   4. Filters: show one area of work at a time
 *   5. Console: gems flash and the read-out advances as the pulse passes
 *   6. Gauges: arcs sweep and numbers count up the first time they appear
 *   7. Spatial: tilt toward the pointer, and light that follows it on metal
 * ---------------------------------------------------------------------------
 */
(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js');

  const motionOk = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;

  /* ===== 1. Theme ===== */

  const themeSwitch = document.querySelector('.theme-switch');
  const syncTheme = () => {
    if (themeSwitch) themeSwitch.setAttribute('aria-pressed', String(root.dataset.theme === 'platinum'));
  };
  if (themeSwitch) {
    themeSwitch.addEventListener('click', () => {
      const next = root.dataset.theme === 'platinum' ? 'obsidian' : 'platinum';
      if (next === 'platinum') root.dataset.theme = 'platinum';
      else delete root.dataset.theme;
      try { localStorage.setItem('theme', next); } catch (e) { /* storage blocked: fine for this visit */ }
      syncTheme();
    });
    syncTheme();
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
        const field = Object.assign(document.createElement('textarea'), { value: email });
        field.style.cssText = 'position:fixed;opacity:0';
        document.body.append(field);
        field.select();
        ok = Boolean(document.execCommand && document.execCommand('copy'));
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

  /** Opens or closes one case, keeping its accessible state in sync. */
  const setOpen = (card, open) => {
    const toggle = card.querySelector('.case-toggle');
    const body = document.getElementById(toggle.getAttribute('aria-controls'));
    const inner = body.querySelector('.case-body-inner');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', `${open ? toggle.dataset.close : toggle.dataset.open}: ${toggle.textContent.trim()}`);
    body.classList.toggle('is-closed', !open);
    inner.inert = !open;
    card.classList.toggle('is-open', open);
  };

  cases.forEach((card) => {
    setOpen(card, false);
    card.querySelector('.case-toggle').addEventListener('click', (event) => {
      setOpen(card, event.currentTarget.getAttribute('aria-expanded') !== 'true');
    });
  });

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
      showing.textContent = showing.dataset.template.replace('{n}', visible).replace('{total}', cases.length);
    }
  };
  filterButtons.forEach((b) => b.addEventListener('click', () => applyFilter(b.dataset.filter)));
  applyFilter('all');

  /* ===== 5. Console ===== */
  /*
   * The pulse follows the route in 5.2 s. To make it reach each gem at an even
   * beat, keyPoints are set to the true length fraction of each gem along the
   * path; then a frame loop reads the SVG clock and flashes gem i (and lights
   * read-out line i) whenever the pulse passes it.
   */
  const svg = document.querySelector('.console-svg');
  const motion = document.getElementById('pulse-motion');
  const route = document.getElementById('route');
  const gems = [...document.querySelectorAll('.gem')];
  const hudLines = [...document.querySelectorAll('.hud-steps li')];

  if (svg && motion && route && gems.length === 4) {
    // Length fraction of each gem along the path (segments end at the gems).
    const d = route.getAttribute('d');
    const segs = d.match(/C[^C]+/g) || [];
    const start = d.match(/^M\s*[\d.]+\s+[\d.]+/)[0];
    const probe = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svg.append(probe);
    const fractions = [0];
    const total = route.getTotalLength();
    for (let i = 1; i <= segs.length; i += 1) {
      probe.setAttribute('d', start + ' ' + segs.slice(0, i).join(' '));
      fractions.push(probe.getTotalLength() / total);
    }
    probe.remove();
    // The pulse rests on the last gem for the final beat, then starts again.
    motion.setAttribute('keyPoints', [...fractions, 1].map((f) => f.toFixed(4)).join(';'));

    const DURATION = 5.2;
    const beats = [0, 0.28, 0.56, 0.84]; // must match keyTimes in template.mjs
    let last = -1;

    const hit = (i) => {
      const gem = gems[i];
      gem.classList.remove('is-hit');
      void gem.getBoundingClientRect(); // restart the flash animation
      gem.classList.add('is-hit');
      hudLines.forEach((li, j) => li.classList.toggle('is-on', j <= i));
    };

    if (motionOk) {
      const tick = () => {
        const phase = (svg.getCurrentTime() % DURATION) / DURATION;
        let current = 0;
        beats.forEach((b, i) => { if (phase >= b) current = i; });
        if (current !== last) { hit(current); last = current; }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    } else {
      svg.pauseAnimations();
      hudLines.forEach((li) => li.classList.add('is-on'));
    }
  }

  /* ===== 6. Gauges ===== */

  /** Reads "130k", "12,034", "12.034", "60+", "130 mil" into parts we can count. */
  const parseValue = (text) => {
    const m = text.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m) return null;
    const digits = m[2];
    const sep = /[.,]\d{3}$/.test(digits) ? digits.match(/[.,]/)[0] : '';
    return { prefix: m[1], target: Number(digits.replace(/[.,]/g, '')), sep, suffix: m[3] };
  };
  const format = (n, sep) => (sep ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) : String(n));

  const gaugeEls = [...document.querySelectorAll('.gauge')];
  const runGauge = (g) => {
    g.classList.add('is-on');
    const el = g.querySelector('.gauge-value');
    const original = el.dataset.value;
    const p = parseValue(original);
    if (!p || !motionOk) return;
    const t0 = performance.now();
    const dur = 1600;
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      el.textContent = p.prefix + format(Math.round(p.target * eased), p.sep) + p.suffix;
      if (k < 1) requestAnimationFrame(step);
      else el.textContent = original;
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const i = gaugeEls.indexOf(e.target);
        setTimeout(() => runGauge(e.target), Math.max(0, i) * 110);
        io.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    gaugeEls.forEach((g) => io.observe(g));
  } else {
    gaugeEls.forEach((g) => g.classList.add('is-on'));
  }

  /* ===== 7. Spatial: tilt and moving light ===== */

  if (motionOk && finePointer) {
    document.querySelectorAll('.stage').forEach((stage) => {
      let frame = 0;
      stage.addEventListener('pointermove', (event) => {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const box = stage.getBoundingClientRect();
          stage.style.setProperty('--px', (((event.clientX - box.left) / box.width) * 2 - 1).toFixed(3));
          stage.style.setProperty('--py', (((event.clientY - box.top) / box.height) * 2 - 1).toFixed(3));
        });
      });
      stage.addEventListener('pointerleave', () => {
        cancelAnimationFrame(frame);
        stage.style.setProperty('--px', '0');
        stage.style.setProperty('--py', '0');
      });
    });

    document.querySelectorAll('.spot').forEach((el) => {
      el.addEventListener('pointermove', (event) => {
        const box = el.getBoundingClientRect();
        el.style.setProperty('--mx', `${event.clientX - box.left}px`);
        el.style.setProperty('--my', `${event.clientY - box.top}px`);
      });
    });
  }
})();
