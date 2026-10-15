// Shared page chrome for the hub and the case pages (ADR 0006, 0007).
// `home` is the path back to the hub's sections: "" on the hub itself ("#work"), "/" on a case page ("/#work").
export const SITE = "https://monsieurgregorio2001-coder.github.io";

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function header(home = "") {
  return `<header class="site-header">
  <div class="wrap bar">
    <a class="wordmark" href="/" aria-label="Garfield Lim, home">Garfield Lim</a>
    <nav aria-label="Primary">
      <ul class="nav" role="list">
        <li><a href="${home}#work">Work</a></li>
        <li><a href="${home}#about">About</a></li>
        <li><a href="${home}#contact">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>`;
}

export function footer() {
  return `<footer class="site-footer">
  <div class="wrap foot">
    <p>Built by Garfield Greg Lim III</p>
    <ul role="list">
      <li><a href="/">Portfolio</a></li>
      <li><a href="https://github.com/monsieurgregorio2001-coder" rel="noopener">GitHub</a></li>
      <li><a href="https://www.linkedin.com/in/garfield-lim-8239242a9" rel="noopener">LinkedIn</a></li>
      <li><a href="mailto:lim.ggreg@outlook.com">lim.ggreg@outlook.com</a></li>
    </ul>
  </div>
</footer>`;
}

// <head> contents after charset and viewport for a case page. `up` is the relative path to the repo root.
export function caseHead(p, up = "../../") {
  const url = `${SITE}/work/${p.slug}/`;
  const title = `${p.title} case study | Garfield Lim`;
  const img = `${SITE}/assets/og/${p.slug}.png`;
  const alt = `${p.title}. Proves ${p.proves}.`;
  return [
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(p.pitch)}">`,
    `<meta name="color-scheme" content="light dark">`,
    `<meta name="theme-color" content="#FAF8F4" media="(prefers-color-scheme: light)">`,
    `<meta name="theme-color" content="#0F0F12" media="(prefers-color-scheme: dark)">`,
    `<link rel="icon" href="${up}favicon.svg" type="image/svg+xml">`,
    `<link rel="canonical" href="${url}">`,
    `<link rel="preload" href="${up}assets/fonts/fraunces-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="preload" href="${up}assets/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    `<meta property="og:type" content="article">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(p.pitch)}">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${img}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="${esc(alt)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(p.pitch)}">`,
    `<meta name="twitter:image" content="${img}">`,
    `<meta name="twitter:image:alt" content="${esc(alt)}">`,
    `<link rel="stylesheet" href="${up}style.css">`,
    `<link rel="stylesheet" href="${up}case.css">`,
  ].join("\n");
}
