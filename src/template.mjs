/**
 * template.mjs
 * ---------------------------------------------------------------------------
 * Turns the content of one language (content.mjs) into a full HTML page.
 * No framework: plain template strings, escaped where text is inserted.
 *
 * Page outline
 *   header   monogram, section links, language switch, dark-mode switch
 *   hero     name, one-line promise, intro, actions, and the "lead board"
 *            (a soft-plastic panel showing the route a lead takes)
 *   work     filter switches + nine case "keys" that press in to open
 *   toolbox  tools grouped in a recessed tray
 *   how      four working principles
 *   contact  email, copy address, GitHub
 * ---------------------------------------------------------------------------
 */

import { SITE_URL, EMAIL, GITHUB, LANGS, casesFor } from './content.mjs';

/* ===== Helpers ========================================================== */

/** Escapes text for safe use inside HTML. */
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/** Joins an array of strings produced by map(). */
const join = (arr) => arr.join('\n');

/* ===== Small icons (inline SVG, drawn for this site) ===================== */
const ICON_MOON = '<svg class="icon icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>';
const ICON_SUN = '<svg class="icon icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>';

/* ===== Sections ========================================================== */

function head(t, lang, root) {
  const url = SITE_URL + t.path;
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.description)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="en" href="${SITE_URL}/">
<link rel="alternate" hreflang="pt-BR" href="${SITE_URL}/pt/">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/">
<meta property="og:type" content="profile">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.description)}">
<meta property="og:url" content="${url}">
<meta property="og:locale" content="${lang === 'pt' ? 'pt_BR' : 'en_US'}">
<meta name="theme-color" content="#e2e8e4" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#262c29" media="(prefers-color-scheme: dark)">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400&family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&display=swap">
<link rel="stylesheet" href="${root}assets/site.css">
<script>
  /* Applies the saved theme before first paint, so the page never flashes. */
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') document.documentElement.dataset.theme = saved;
  } catch (e) {}
</script>
<script src="${root}assets/site.js" defer></script>
</head>`;
}

function header(t, lang, root) {
  const here = lang.toUpperCase();
  const other = t.langSwitch.other.toUpperCase();
  const otherHref = lang === 'en' ? 'pt/' : '../';
  const enFirst = lang === 'en';
  const current = `<a class="seg-btn" aria-current="page" href="./" lang="${t.htmlLang}">${here}</a>`;
  const alt = `<a class="seg-btn" href="${otherHref}" hreflang="${t.langSwitch.other === 'pt' ? 'pt-BR' : 'en'}" lang="${t.langSwitch.other === 'pt' ? 'pt-BR' : 'en'}" title="${esc(t.langSwitch.otherName)}">${other}</a>`;
  return `<header class="top glass">
  <a class="mark" href="./" aria-label="Igor Cruz">IC</a>
  <nav class="top-links" aria-label="${lang === 'pt' ? 'Seções' : 'Sections'}">
    <a href="#work">${esc(t.nav.work)}</a>
    <a href="#toolbox">${esc(t.nav.toolbox)}</a>
    <a href="#contact">${esc(t.nav.contact)}</a>
  </nav>
  <div class="top-controls">
    <nav class="seg" aria-label="${esc(t.langSwitch.label)}">
      ${enFirst ? current + alt : alt + current}
    </nav>
    <button class="switch theme-switch" type="button" aria-pressed="false" aria-label="${esc(t.theme.label)}">${ICON_MOON}${ICON_SUN}</button>
  </div>
</header>`;
}

function hero(t) {
  const nodes = t.board.nodes.map((n, i) => `
        <li class="node" style="--i:${i}">
          <span class="knob" aria-hidden="true"><span class="led"></span></span>
          <span class="node-text"><strong>${esc(n.name)}</strong><span>${esc(n.note)}</span></span>
        </li>`).join('');
  return `<section class="hero" aria-labelledby="hero-name">
    <div class="hero-text">
      <h1 id="hero-name">${esc(t.hero.name)}</h1>
      <p class="hero-line">${esc(t.hero.line)}</p>
      ${join(t.hero.intro.map((p) => `<p class="hero-intro">${esc(p)}</p>`))}
      <div class="actions">
        <a class="btn btn-primary" href="mailto:${EMAIL}">${esc(t.hero.ctaEmail)}</a>
        <button class="btn copy-email" type="button" data-email="${EMAIL}" data-done="${esc(t.hero.ctaCopied)}">${esc(t.hero.ctaCopy)}</button>
        <a class="btn btn-quiet" href="#work">${esc(t.hero.ctaWork)}</a>
      </div>
      <p class="hero-facts">${esc(t.hero.facts)}</p>
    </div>
    <div class="stage">
      <span class="clay-shape clay-orb" aria-hidden="true"></span>
      <span class="clay-shape clay-pill" aria-hidden="true"></span>
      <span class="clay-shape clay-dot" aria-hidden="true"></span>
      <figure class="board glass">
        <div class="board-track">
          <div class="groove" aria-hidden="true"><span class="lead"></span></div>
          <ol class="nodes">${nodes}
          </ol>
        </div>
        <figcaption>${esc(t.board.label)}</figcaption>
      </figure>
    </div>
  </section>`;
}

function work(t, lang) {
  const cases = casesFor(lang);
  const tagName = Object.fromEntries(t.filters);
  const filters = t.filters.map(([key, label]) =>
    `<button class="chip-switch" type="button" data-filter="${key}" aria-pressed="${key === 'all'}">${esc(label)}</button>`).join('\n        ');

  const cards = cases.map((c) => {
    const bodyId = `case-${c.id}-body`;
    const steps = [['problem', c.problem], ['did', c.did], ['result', c.result]]
      .map(([k, txt]) => `<li><h4>${esc(t.work.parts[k])}</h4><p>${esc(txt)}</p></li>`).join('\n            ');
    const tools = c.tools.map((x) => `<li>${esc(x)}</li>`).join('');
    return `
    <article class="case${c.size === 'wide' ? ' case-wide' : ''}" id="case-${c.id}" data-tag="${c.tag}">
      <div class="case-meta">
        <span class="status" data-status="${c.status}"><span class="led" aria-hidden="true"></span>${esc(t.work.status[c.status])}</span>
        <span class="case-tag">${esc(tagName[c.tag])}</span>
      </div>
      <h3 class="case-title">
        <button class="case-toggle" type="button" aria-expanded="true" aria-controls="${bodyId}" data-open="${esc(t.work.open)}" data-close="${esc(t.work.close)}">
          <span class="case-title-text">${esc(c.title)}</span>
          <span class="case-knob" aria-hidden="true"></span>
        </button>
      </h3>
      <p class="case-summary">${esc(c.summary)}</p>
      <div class="case-body" id="${bodyId}">
        <ol class="steps">
            ${steps}
        </ol>
        <ul class="tools" aria-label="${esc(t.work.toolsLabel)}">${tools}</ul>
      </div>
    </article>`;
  }).join('');

  return `<section class="work" id="work" aria-labelledby="work-title">
    <div class="section-head">
      <h2 id="work-title">${esc(t.work.title)}</h2>
      <p>${esc(t.work.lede)}</p>
    </div>
    <div class="filters" role="group" aria-label="${esc(t.work.filterLabel)}">
        ${filters}
    </div>
    <p class="showing" aria-live="polite" data-template="${esc(t.work.showing('{n}', '{total}'))}"></p>
    <div class="cases">${cards}
    </div>
  </section>`;
}

function toolbox(t) {
  const groups = t.toolbox.groups.map(([name, items]) => `
      <div class="tool-group">
        <h3>${esc(name)}</h3>
        <ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`).join('');
  return `<section class="toolbox" id="toolbox" aria-labelledby="toolbox-title">
    <div class="section-head">
      <h2 id="toolbox-title">${esc(t.toolbox.title)}</h2>
      <p>${esc(t.toolbox.lede)}</p>
    </div>
    <div class="tray">${groups}
    </div>
  </section>`;
}

function principles(t) {
  const items = t.principles.items.map(([h, p]) => `
      <li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('');
  return `<section class="principles" aria-labelledby="how-title">
    <h2 id="how-title">${esc(t.principles.title)}</h2>
    <ul>${items}
    </ul>
  </section>`;
}

function contact(t) {
  return `<section class="stage stage-contact" id="contact" aria-labelledby="contact-title">
    <span class="clay-shape clay-orb" aria-hidden="true"></span>
    <span class="clay-shape clay-pill" aria-hidden="true"></span>
    <div class="contact glass">
      <h2 id="contact-title">${esc(t.contact.title)}</h2>
      <p>${esc(t.contact.text)}</p>
      <div class="actions">
        <a class="btn btn-primary" href="mailto:${EMAIL}">${EMAIL}</a>
        <button class="btn copy-email" type="button" data-email="${EMAIL}" data-done="${esc(t.hero.ctaCopied)}">${esc(t.hero.ctaCopy)}</button>
        <a class="btn btn-quiet" href="${GITHUB}">${esc(t.contact.github)}</a>
      </div>
    </div>
  </section>`;
}

/* ===== Page ============================================================= */

/** Builds the whole page for 'en' or 'pt'. `root` is the path back to the site root. */
export function renderPage(lang, root) {
  const t = LANGS[lang];
  return `<!doctype html>
<html lang="${t.htmlLang}">
${head(t, lang, root)}
<body>
<a class="skip" href="#main">${esc(t.skip)}</a>
<div class="page">
${header(t, lang, root)}
<main id="main">
  ${hero(t)}
  ${work(t, lang)}
  ${toolbox(t)}
  ${principles(t)}
  ${contact(t)}
</main>
<footer class="foot">
  <p>${esc(t.footer)}</p>
  <p>Igor Henrique de Oliveira Cruz</p>
</footer>
</div>
</body>
</html>
`;
}
