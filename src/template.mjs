/**
 * template.mjs
 * ---------------------------------------------------------------------------
 * Turns the content of one language (content.mjs) into a full HTML page.
 * No framework: plain template strings, escaped where text is inserted.
 *
 * Page outline
 *   header        floating glass ornament: monogram, links, language, theme
 *   hero          name in gold, intro, actions, facts, and the CONSOLE:
 *                 a machined-metal slab where a gold pulse runs through four
 *                 ruby gems (the route of a lead), with a glass read-out
 *   gauges        six machined dials that count up once on view
 *   capabilities  four metal modules
 *   work          three featured studies (always open) + filterable keys
 *   process       six steps on a gold rail
 *   toolbox       smoked-glass tray of metal parts
 *   principles    four short rules
 *   contact       glass window over ruby and gold objects
 * ---------------------------------------------------------------------------
 */

import { SITE_URL, EMAIL, GITHUB, LINKEDIN, LANGS, casesFor } from './content.mjs';

/* Real tool icons (local files from the taste-skill icon resolver, CC0/MIT).
 * Tools with no licensed icon (Elementor, GoHighLevel, Apps Script) stay text. */
const TOOL_ICONS = {
  'n8n': 'n8n', 'Zapier': 'zapier', 'Zoho CRM': 'zoho', 'Zoho Sign': 'zoho', 'Zoho Analytics': 'zoho',
  'Zoho Marketing Automation': 'zoho', 'WordPress': 'wordpress', 'Meta Ads': 'meta', 'TikTok Ads API': 'tiktok',
  'Google Tag Manager': 'google-tag-manager', 'Postgres': 'postgres', 'Claude and Claude Code': 'claude',
  'Claude e Claude Code': 'claude', 'MCP connectors': 'mcp', 'Conectores MCP': 'mcp', 'Python': 'python', 'Go': 'go',
  'Node.js': 'nodejs', 'Git': 'git-icon', 'PHP': 'php', 'JavaScript': 'javascript', 'HTML and CSS': 'html',
  'HTML e CSS': 'html', 'Twilio': 'twilio', 'WhatsApp gateways': 'whatsapp', 'Gateways de WhatsApp': 'whatsapp',
};
const INK_ICONS = new Set(['wordpress', 'mcp']); // black marks: turned light on the dark theme

/* ===== Helpers ========================================================== */

/** Escapes text for safe use inside HTML. */
const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;');

/* ===== Icons (inline SVG, drawn for this site) =========================== */
const ICON_SUN = '<svg class="icon icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>';
const ICON_MOON = '<svg class="icon icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></svg>';

/* ===== Head ============================================================= */

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
<meta property="og:image" content="${SITE_URL}/assets/share.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Igor Henrique de Oliveira Cruz',
    jobTitle: t.hero.kicker,
    url: url,
    email: `mailto:${EMAIL}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Jundiaí', addressRegion: 'SP', addressCountry: 'BR' },
    knowsLanguage: ['en', 'pt', 'es'],
    sameAs: [GITHUB, LINKEDIN],
  })}</script>
<meta name="theme-color" content="#09090b">
<link rel="icon" href="${root}assets/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800&family=Instrument+Sans:ital,wdth,wght@0,75..100,400..700;1,75..100,400&display=swap">
<link rel="stylesheet" href="${root}assets/site.css">
<script>
  /* Applies the saved theme before first paint, so the page never flashes. */
  try {
    var saved = localStorage.getItem('theme');
    if (saved === 'platinum') document.documentElement.dataset.theme = 'platinum';
  } catch (e) {}
</script>
<script src="${root}assets/site.js" defer></script>
</head>`;
}

/* ===== Header ornament ================================================== */

function header(t, lang) {
  const isEn = lang === 'en';
  const en = `<a class="seg-btn" href="${isEn ? './' : '../'}" lang="en" hreflang="en"${isEn ? ' aria-current="page"' : ''}>EN</a>`;
  const pt = `<a class="seg-btn" href="${isEn ? 'pt/' : './'}" lang="pt-BR" hreflang="pt-BR"${isEn ? '' : ' aria-current="page"'}>PT</a>`;
  return `<header class="top glass">
  <a class="mark" href="./" aria-label="Igor Cruz"><span>IC</span></a>
  <nav class="top-links" aria-label="${esc(t.nav.label)}">
    <a href="#work">${esc(t.nav.work)}</a>
    <a href="#process">${esc(t.nav.process)}</a>
    <a href="#toolbox">${esc(t.nav.toolbox)}</a>
    <a href="#contact">${esc(t.nav.contact)}</a>
  </nav>
  <div class="top-controls">
    <nav class="seg" aria-label="${esc(t.langSwitch.label)}">${en}${pt}</nav>
    <button class="switch theme-switch" type="button" aria-pressed="false" aria-label="${esc(t.theme.label)}">${ICON_SUN}${ICON_MOON}</button>
  </div>
</header>`;
}

/* ===== Hero console (SVG) ===============================================
 * The route is one smooth path through four gem positions. The pulse moves
 * along it with <animateMotion>; site.js times each gem's flash to the
 * moment the pulse reaches it. Text labels are SVG text, mirrored in a
 * visually hidden list for screen readers.
 * ======================================================================== */
/* Gem positions and their label anchors, placed where the channel never runs */
const GEMS = [
  { x: 92, y: 96, lx: 140, ly: 132, anchor: 'start' },
  { x: 448, y: 132, lx: 448, ly: 58, anchor: 'middle' },
  { x: 128, y: 306, lx: 176, ly: 298, anchor: 'start' },
  { x: 236, y: 404, lx: 236, ly: 466, anchor: 'middle' },
];
const ROUTE = 'M92 96 C196 34 344 66 448 132 C552 198 236 222 128 306 C20 390 120 474 236 404';

function consoleSvg(t) {
  const gems = GEMS.map((g, i) => `
      <g class="gem" data-i="${i}" transform="translate(${g.x} ${g.y})">
        <circle class="gem-bezel" r="34"/>
        <circle class="gem-seat" r="28"/>
        <circle class="gem-stone" r="24"/>
        <ellipse class="gem-shine" cx="-8" cy="-10" rx="9" ry="5" transform="rotate(-30)"/>
        <circle class="gem-glow" r="24"/>
      </g>
      <text class="gem-label" x="${g.lx}" y="${g.ly}" text-anchor="${g.anchor}">${esc(t.console.nodes[i])}</text>
      <text class="gem-note" x="${g.lx}" y="${g.ly + 22}" text-anchor="${g.anchor}">${esc(t.console.notes[i])}</text>`).join('');

  return `<svg class="console-svg" viewBox="0 0 540 500" role="img" aria-labelledby="console-title">
      <title id="console-title">${esc(t.console.label)}</title>
      <defs>
        <radialGradient id="ruby" cx="35%" cy="30%" r="75%">
          <stop offset="0" stop-color="#ffb3c2"/>
          <stop offset="0.28" stop-color="#ef2f5c"/>
          <stop offset="0.68" stop-color="#9c0b2f"/>
          <stop offset="1" stop-color="#3d0211"/>
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#fff0b8"/>
          <stop offset="0.35" stop-color="#d9ad4b"/>
          <stop offset="0.6" stop-color="#8f6620"/>
          <stop offset="1" stop-color="#f3d27c"/>
        </linearGradient>
        <radialGradient id="pulse" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#fff8dc"/>
          <stop offset="0.45" stop-color="#f6cf6a"/>
          <stop offset="1" stop-color="#f6cf6a" stop-opacity="0"/>
        </radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <!-- Machined channel: dark cut, inner bevel, faint gold inlay -->
      <path class="ch-cut" d="${ROUTE}"/>
      <path class="ch-bevel" d="${ROUTE}"/>
      <path class="ch-inlay" d="${ROUTE}"/>
      <path class="ch-flow" id="route" d="${ROUTE}"/>
      ${gems}

      <!-- The lead: a gold pulse with a short comet tail -->
      <g class="pulse" filter="url(#glow)">
        <circle r="13" fill="url(#pulse)"/>
        <circle r="4.5" fill="#fffbe8"/>
        <animateMotion id="pulse-motion" dur="5.2s" repeatCount="indefinite" rotate="auto" calcMode="linear" keyPoints="0;0.31;0.65;1;1" keyTimes="0;0.28;0.56;0.84;1">
          <mpath href="#route"/>
        </animateMotion>
      </g>
    </svg>`;
}

/* ===== Hero ============================================================= */

function hero(t, root) {
  const facts = t.hero.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');
  const hud = t.console.hud.map((h, i) => `<li data-i="${i}">${esc(h)}</li>`).join('');
  const srList = t.console.nodes.map((n, i) => `<li>${esc(n)}: ${esc(t.console.notes[i])}</li>`).join('');
  return `<section class="hero" aria-labelledby="hero-name">
    <div class="hero-text">
      <p class="kicker">${esc(t.hero.kicker)}</p>
      <h1 id="hero-name"><span class="gold-text">${esc(t.hero.name)}</span></h1>
      <p class="hero-line">${esc(t.hero.line)}</p>
      ${t.hero.intro.map((p) => `<p class="hero-intro">${esc(p)}</p>`).join('\n      ')}
      <div class="actions">
        <a class="btn btn-ruby" href="mailto:${EMAIL}">${esc(t.hero.ctaEmail)}</a>
        <a class="btn btn-metal" href="${root}${t.hero.cvFile}" type="application/pdf">${esc(t.hero.ctaCv)}</a>
        <a class="btn btn-quiet" href="#work">${esc(t.hero.ctaWork)}</a>
      </div>
      <dl class="facts">${facts}</dl>
    </div>

    <div class="stage stage-hero">
      <span class="obj obj-ruby" aria-hidden="true"></span>
      <span class="obj obj-ring" aria-hidden="true"></span>
      <span class="obj obj-bead" aria-hidden="true"></span>
      <figure class="console metal">
        <span class="screw s1" aria-hidden="true"></span><span class="screw s2" aria-hidden="true"></span>
        <span class="screw s3" aria-hidden="true"></span><span class="screw s4" aria-hidden="true"></span>
        ${consoleSvg(t)}
        <ol class="sr-only">${srList}</ol>
        <button class="motion-toggle" type="button" aria-pressed="false" data-pause="${esc(t.hero.pause)}" data-play="${esc(t.hero.play)}">
          <span class="mt-icon" aria-hidden="true"></span><span class="mt-label">${esc(t.hero.pause)}</span>
        </button>
        <div class="hud glass" aria-hidden="true">
          <p class="hud-title"><span class="hud-dot"></span>${esc(t.console.hudTitle)}</p>
          <ol class="hud-steps">${hud}</ol>
        </div>
      </figure>
    </div>
  </section>`;
}

/* ===== Gauges =========================================================== */

function gauges(t) {
  const items = t.gauges.items.map(([value, label]) => `
      <li class="gauge">
        <span class="dial metal" aria-hidden="true">
          <svg viewBox="0 0 120 120"><circle class="dial-track" cx="60" cy="60" r="50"/><circle class="dial-arc" cx="60" cy="60" r="50"/></svg>
        </span>
        <strong class="gauge-value" data-value="${esc(value)}">${esc(value)}</strong>
        <span class="gauge-label">${esc(label)}</span>
      </li>`).join('');
  return `<section class="gauges" aria-labelledby="gauges-title">
    <h2 id="gauges-title" class="sr-only">${esc(t.gauges.title)}</h2>
    <ul class="gauge-row">${items}
    </ul>
  </section>`;
}

/* ===== Capabilities ===================================================== */

function capabilities(t) {
  const mods = t.capabilities.items.map(([name, list], i) => `
      <li class="module metal spot">
        <span class="module-gem" aria-hidden="true"></span>
        <h3>${esc(name)}</h3>
        <ul>${list.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
      </li>`).join('');
  return `<section class="capabilities" aria-labelledby="cap-title">
    <div class="section-head">
      <h2 id="cap-title">${esc(t.capabilities.title)}</h2>
      <p>${esc(t.capabilities.lede)}</p>
    </div>
    <ul class="modules">${mods}
    </ul>
  </section>`;
}

/* ===== Work ============================================================= */

function statusBadge(t, status) {
  return `<span class="status" data-status="${status}"><span class="led" aria-hidden="true"></span>${esc(t.work.status[status])}</span>`;
}

function stepsList(items) {
  return `<ul class="did">${items.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>`;
}

/** A left-to-right flow of stages; a stage with several nodes is a branch. */
function flowLine(t, flow) {
  if (!flow) return '';
  const stages = flow.stages.map((nodes, i) => `
          <li class="stage${i === flow.gate ? ' is-gate' : ''}" style="--i:${i}">${nodes.map((n) => `<span class="fnode">${esc(n)}</span>`).join('')}</li>`).join('');
  return `
        <ol class="flowline" aria-label="${esc(t.hero.flowLabel)}">${stages}
        </ol>`;
}

function featuredCase(t, c, tagName) {
  return `
    <article class="feature metal spot" id="case-${c.id}" data-tag="${c.tag}">
      <div class="feature-main">
        <div class="case-meta">${statusBadge(t, c.status)}<span class="case-tag">${esc(tagName[c.tag])}</span></div>
        <h3 class="feature-title">${esc(c.title)}</h3>
        <p class="feature-summary">${esc(c.summary)}</p>${flowLine(t, c.flow)}
        <div class="feature-story">
          <section><h4>${esc(t.work.parts.problem)}</h4><p>${esc(c.problem)}</p></section>
          <section><h4>${esc(t.work.parts.did)}</h4>${stepsList(c.did)}</section>
          <section><h4>${esc(t.work.parts.result)}</h4><p>${esc(c.result)}</p></section>
        </div>
      </div>
      <aside class="spec glass">
        ${c.metric ? `<p class="spec-metric"><strong class="gold-text">${esc(c.metric.value)}</strong><span>${esc(c.metric.label)}</span></p>` : ''}
        <dl>
          <div><dt>${esc(t.work.parts.role)}</dt><dd>${esc(c.role)}</dd></div>
          <div><dt>${esc(t.work.parts.tools)}</dt><dd><ul class="chips">${c.tools.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></dd></div>
        </dl>
      </aside>
    </article>`;
}

function caseKey(t, c, tagName) {
  const bodyId = `case-${c.id}-body`;
  return `
    <article class="case metal spot" id="case-${c.id}" data-tag="${c.tag}">
      <div class="case-meta"><span class="case-tag">${esc(tagName[c.tag])}</span></div>
      <h3 class="case-title">
        <button class="case-toggle" type="button" aria-expanded="true" aria-controls="${bodyId}" data-open="${esc(t.work.open)}" data-close="${esc(t.work.close)}">
          <span class="case-title-text">${esc(c.title)}</span>
          <span class="case-knob" aria-hidden="true"></span>
        </button>
      </h3>
      <p class="case-summary">${esc(c.summary)}</p>
      <div class="case-body" id="${bodyId}">
        <div class="case-body-inner">
          <div class="story">
            <section><h4>${esc(t.work.parts.problem)}</h4><p>${esc(c.problem)}</p></section>
            <section><h4>${esc(t.work.parts.did)}</h4>${stepsList(c.did)}</section>
            <section><h4>${esc(t.work.parts.result)}</h4><p>${esc(c.result)}</p></section>
          </div>
          <ul class="chips" aria-label="${esc(t.work.parts.tools)}">${c.tools.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>
    </article>`;
}

function work(t, lang) {
  const all = casesFor(lang);
  const tagName = Object.fromEntries(t.filters);
  const featured = all.filter((c) => c.featured);
  const rest = all.filter((c) => !c.featured);
  const filters = t.filters.map(([key, label]) =>
    `<button class="chip-switch" type="button" data-filter="${key}" aria-pressed="${key === 'all'}">${esc(label)}</button>`).join('\n      ');

  return `<section class="work" id="work" aria-labelledby="work-title">
    <div class="section-head">
      <h2 id="work-title">${esc(t.work.title)}</h2>
      <p>${esc(t.work.lede)}</p>
    </div>
    <div class="features" aria-label="${esc(t.work.featuredLabel)}">${featured.map((c) => featuredCase(t, c, tagName)).join('')}
    </div>

    <h3 class="more-title">${esc(t.work.moreTitle)}</h3>
    <div class="filters" role="group" aria-label="${esc(t.work.filterLabel)}">
      ${filters}
    </div>
    <p class="showing" aria-live="polite" data-template="${esc(t.work.showing('{n}', '{total}'))}"></p>
    <div class="cases">${rest.map((c) => caseKey(t, c, tagName)).join('')}
    </div>
  </section>`;
}

/* ===== Process, toolbox, principles, contact ============================ */

function processSection(t) {
  const steps = t.process.steps.map(([h, p], i) => `
      <li class="step" style="--i:${i}">
        <span class="stud" aria-hidden="true"><span>${i + 1}</span></span>
        <h3>${esc(h)}</h3>
        <p>${esc(p)}</p>
      </li>`).join('');
  return `<section class="process" id="process" aria-labelledby="process-title">
    <div class="section-head">
      <h2 id="process-title">${esc(t.process.title)}</h2>
      <p>${esc(t.process.lede)}</p>
    </div>
    <ol class="rail">${steps}
    </ol>
  </section>`;
}

function toolbox(t, root) {
  const groups = t.toolbox.groups.map(([name, items]) => `
      <div class="tool-group">
        <h3>${esc(name)}</h3>
        <ul>${items.map((i) => {
          const ic = TOOL_ICONS[i];
          const img = ic ? `<img class="tool-ic${INK_ICONS.has(ic) ? ' is-ink' : ''}" src="${root}assets/icons/${ic}.svg" alt="" width="18" height="18" loading="lazy">` : '';
          return `<li>${img}${esc(i)}</li>`;
        }).join('')}</ul>
      </div>`).join('');
  return `<section class="toolbox" id="toolbox" aria-labelledby="toolbox-title">
    <div class="section-head">
      <h2 id="toolbox-title">${esc(t.toolbox.title)}</h2>
      <p>${esc(t.toolbox.lede)}</p>
    </div>
    <div class="tray glass">${groups}
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

function contact(t, root) {
  return `<section class="stage stage-contact" id="contact" aria-labelledby="contact-title">
    <span class="obj obj-ruby" aria-hidden="true"></span>
    <span class="obj obj-ring" aria-hidden="true"></span>
    <div class="contact glass">
      <h2 id="contact-title">${esc(t.contact.title)}</h2>
      <p>${esc(t.contact.text)}</p>
      <div class="actions">
        <a class="btn btn-ruby" href="mailto:${EMAIL}">${EMAIL}</a>
        <button class="btn btn-metal copy-email" type="button" data-email="${EMAIL}" data-done="${esc(t.hero.ctaCopied)}">${esc(t.hero.ctaCopy)}</button>
        <a class="btn btn-metal" href="${root}${t.hero.cvFile}" type="application/pdf">${esc(t.hero.ctaCv)}</a>
      </div>
      <p class="contact-links">
        <a href="${LINKEDIN}" rel="me">${esc(t.hero.linkedin)}</a>
        <a href="${GITHUB}" rel="me">${esc(t.contact.github)}</a>
      </p>
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
${header(t, lang)}
<main id="main">
  ${hero(t, root)}
  ${gauges(t)}
  ${capabilities(t)}
  ${work(t, lang)}
  ${processSection(t)}
  ${toolbox(t, root)}
  ${principles(t)}
  ${contact(t, root)}
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
