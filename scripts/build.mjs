// Hub build (ADR 0007, 0011, 0015). Renders from projects.json, site.json, data/evidence/*.json and the house tokens:
//   index.html, 404.html, colophon/, changelog/, work/<slug>/ generated blocks, a plain-text twin (index.md) beside every page,
//   llms.txt, sitemap.xml and .nojekyll. The house crumb, footer and boot script are injected by house-sync (the hub is its own HOUSE_DIR).
// Usage: node scripts/build.mjs   (no dependencies, works from any cwd). CI runs it and fails if committed output differs.
// A slot with no evidence ({{fig:room/id}} and friends) fails the build.
// data/changelog.json is refreshed from sibling clones when they exist (CHANGELOG_DIR, default: the folder above the repo).
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { esc, loadEvidence, makeSlots } from "./lib/slots.mjs";
import { htmlToMd } from "./lib/md.mjs";
import { colophonBody } from "./lib/colophon.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://monsieurgregorio2001-coder.github.io";
const HOUSE = "2.0.1";
const H = `/house/${HOUSE}`;
const rd = (f) => fs.readFileSync(path.join(root, f), "utf8");
const wr = (f, s) => {
  const p = path.join(root, f);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  if (!fs.existsSync(p) || fs.readFileSync(p, "utf8") !== s) fs.writeFileSync(p, s);
};
const projects = JSON.parse(rd("projects.json")).slice().sort((a, b) => a.order - b.order);
const site = JSON.parse(rd("site.json"));
const evidence = loadEvidence(root);
const { render, missing } = makeSlots(evidence);
const houseJson = JSON.parse(rd(`house/${HOUSE}/house.json`));
const written = []; // html pages to sync
const twins = []; // [title, path, description] for llms.txt

const lines = (a) => a.filter((l) => l !== "" && l != null).join("\n");
const PROFILE = { linkedin: "https://www.linkedin.com/in/garfield-lim-8239242a9", github: "https://github.com/monsieurgregorio2001-coder", email: "lim.ggreg@outlook.com" };
const STATUS = { live: "Live", demo: "Recorded demo", local: "Runs locally" };
const roomPath = (p) => `/${p.room}/`;
const doorHref = (p) => (p.roomShipped ? roomPath(p) : `/work/${p.slug}/`);
const plain = (s) => render(s, false);
const lead = projects.find((p) => p.featured);
const rest = projects.filter((p) => p !== lead);
const resume = fs.existsSync(path.join(root, "resume.pdf"));

/* ---------- page shell ---------- */
function head({ title, desc, url, type = "website", image = `${SITE}/assets/og-image.png`, imageAlt = "", noindex = false, twin = true, extra = "" }) {
  return lines([
    `<meta charset="utf-8">`,
    `<meta name="viewport" content="width=device-width, initial-scale=1">`,
    `<title>${esc(title)}</title>`,
    `<meta name="description" content="${esc(desc)}">`,
    noindex ? `<meta name="robots" content="noindex">` : "",
    `<meta name="color-scheme" content="light dark">`,
    `<meta name="theme-color" content="#FAF8F4" media="(prefers-color-scheme: light)">`,
    `<meta name="theme-color" content="#0F0F12" media="(prefers-color-scheme: dark)">`,
    `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`,
    url ? `<link rel="canonical" href="${url}">` : "",
    twin ? `<link rel="alternate" type="text/markdown" href="index.md">` : "",
    `<!-- house:boot --><!-- /house:boot -->`,
    `<link rel="preload" href="${H}/fonts/fraunces-latin-opsz-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    `<link rel="preload" href="${H}/fonts/inter-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>`,
    ...(noindex ? [] : [
      `<meta property="og:type" content="${type}">`,
      `<meta property="og:title" content="${esc(title)}">`,
      `<meta property="og:description" content="${esc(desc)}">`,
      `<meta property="og:url" content="${url}">`,
      `<meta property="og:image" content="${image}">`,
      `<meta property="og:image:width" content="1200">`,
      `<meta property="og:image:height" content="630">`,
      `<meta property="og:image:alt" content="${esc(imageAlt)}">`,
      `<meta name="twitter:card" content="summary_large_image">`,
      `<meta name="twitter:title" content="${esc(title)}">`,
      `<meta name="twitter:description" content="${esc(desc)}">`,
      `<meta name="twitter:image" content="${image}">`,
      `<meta name="twitter:image:alt" content="${esc(imageAlt)}">`,
    ]),
    `<link rel="stylesheet" href="${H}/tokens.css">`,
    `<link rel="stylesheet" href="${H}/house.css">`,
    `<link rel="stylesheet" href="/hub.css">`,
    `<script src="${H}/doorway.js"></script>`,
    `<script type="module" src="${H}/house.js"></script>`,
    extra,
  ]);
}
const shell = (headHtml, main, { after = "" } = {}) => `<!doctype html>
<html lang="en">
<head>
${headHtml}
</head>
<body>
<a class="house-skip" href="#main">Skip to content</a>
<!-- house:crumb --><!-- /house:crumb -->
${main}
<!-- house:footer --><!-- /house:footer -->
${after}</body>
</html>
`;

/* ---------- doors ---------- */
const poster = (slug, kind, w, h, { eager = false, cls = "" } = {}) => {
  const dir = "/assets/posters/";
  const dark = fs.existsSync(path.join(root, "assets/posters", `${slug}-${kind}-dark.avif`));
  const set = (sfx, ext) => `${dir}${slug}-${kind}${sfx}.${ext}`;
  const src = [];
  if (dark) src.push(`<source media="(prefers-color-scheme: dark)" type="image/avif" srcset="${set("-dark", "avif")}">`, `<source media="(prefers-color-scheme: dark)" type="image/webp" srcset="${set("-dark", "webp")}">`);
  src.push(`<source type="image/avif" srcset="${set("", "avif")}">`);
  return `<picture${cls ? ` class="${cls}"` : ""} data-door-poster>${src.join("")}<img src="${set("", "webp")}" width="${w}" height="${h}" alt=""${eager ? ` fetchpriority="high"` : ` loading="lazy"`} decoding="async"></picture>`;
};
const chip = (p) => `<span class="house-label">${STATUS[p.status]}</span>`;
const doorAttrs = (p) => `href="${doorHref(p)}"${p.roomShipped ? ` data-room="${p.room}"` : ""}`;
const proves = (p) => `<span class="vh">Proves: ${esc(p.proves)}.</span>`;
function featureDoor(p) {
  return `<a class="door door-feature" ${doorAttrs(p)}>${poster(p.room, "door", 1176, 600, { eager: true, cls: "door-poster" })}<span class="door-body"><span class="door-top">${chip(p)}</span><span class="door-name">${esc(p.title)}</span><span class="door-proof">${esc(p.proof)}</span><span class="door-fig">${render(p.doorFig)}</span></span>${proves(p)}</a>`;
}
function rowDoor(p) {
  return `<a class="door door-row" ${doorAttrs(p)}>${poster(p.room, "thumb", 320, 204, { cls: "door-thumb" })}<span class="door-body"><span class="door-line"><span class="door-name">${esc(p.title)}</span>${chip(p)}</span><span class="door-proof">${esc(p.proof)}</span><span class="door-fig">${render(p.doorFig)}</span></span><span class="door-chev" aria-hidden="true"></span>${proves(p)}</a>`;
}
const doorList = () => `<ul class="door-list" role="list">\n${rest.map((p) => `      <li>${rowDoor(p)}</li>`).join("\n")}\n    </ul>`;

/* ---------- receipts ---------- */
const partial = rd(`house/${HOUSE}/partials/receipt.html`).replace(/<!--[\s\S]*?-->\s*/g, "").replace('<span class="house-fig">{{fig:room/id}}</span>', "{{fig:room/id}}");
function receipt(p, { drawer = false } = {}) {
  let checks = render(`{{checks:${p.evidence}}}`) + (p.noEvals ? `<p class="no-evals">${esc(p.noEvals)}</p>` : "");
  if (drawer) checks = `<details class="checks-drawer" data-open-wide><summary>Show the checks</summary>${checks}</details>`;
  const map = { slug: p.room, name: esc(p.title), status: STATUS[p.status], proves: esc(p.proves), problem: esc(p.problem), built: esc(p.built), try: esc(p.try), checks, "fig:room/id": render(p.result) };
  return partial.replace(/\{\{([^}]+)\}\}/g, (m, k) => (k in map ? map[k] : m)).trim();
}
const cta = (p) => {
  const room = p.roomShipped ? `<a class="house-capsule is-filled" href="${roomPath(p)}">Open the room<span class="vh"> for ${esc(p.title)}</span></a>` : `<a class="house-capsule is-filled" href="${esc(p.openUrl)}">${esc(p.openLabel)}<span class="vh"> for ${esc(p.title)}</span></a>`;
  return `<p class="work-actions">${room}<a class="house-capsule is-ghost" href="/work/${p.slug}/">Read the case<span class="vh"> for ${esc(p.title)}</span></a><a class="house-capsule is-text" href="${esc(p.repoUrl)}">Code<span class="vh"> for ${esc(p.title)}</span></a></p>`;
};
const workItem = (p) => lines([
  `<article class="work-item${p === lead ? " is-featured" : ""}" id="work-${p.slug}">`,
  p === lead ? `  <div class="work-poster">${poster(p.room, "door", 1176, 600, { cls: "" })}</div>` : "",
  `  <div class="work-main">`,
  `    ${receipt(p, { drawer: true })}`,
  `    ${cta(p)}`,
  `  </div>`,
  `</article>`,
]);

/* ---------- index ---------- */
const eyebrow = `Applied AI engineer &middot; Cebu, Philippines<span class="eb-sep" aria-hidden="true"> &middot; </span><span class="eb-line">Open to remote</span>`;
const quiet = `Every number here comes from a test run or from your own browser. <a href="#work">See the receipts</a>.`;
// Fixed line breaks so a font swap never changes the line count (CLS). Each .ln is nowrap.
function h1Lines() {
  const words = site.headline.split(" "), at = words.indexOf(site.headlineBreakAfter);
  if (at < 0) return esc(site.headline);
  const ln = (a) => `<span class="ln">${esc(a.join(" "))}</span>`;
  // The space between the block spans keeps the text "tools you" for screen readers, search and copy.
  return ln(words.slice(0, at + 1)) + " " + ln(words.slice(at + 1));
}

// The hero lede gets one span per sentence. On phones each is its own nowrap line, so a wide
// fallback font cannot wrap it to an extra line that the web font then takes back (CLS).
function ledeLines() {
  const parts = site.lede.match(/[^.]+\.(\s|$)/g);
  if (!parts || parts.length < 2) return esc(site.lede);
  return parts.map((s) => `<span class="ln">${esc(s.trim())}</span>`).join(" ");
}

function indexMain() {
  return `<main id="main">
  <section class="hero" aria-labelledby="hero-h">
    <div class="wrap hero-grid">
      <div class="hero-text" data-field-host>
        <canvas class="field" aria-hidden="true"></canvas>
        <p class="eyebrow">${eyebrow}</p>
        <h1 id="hero-h" class="display">${h1Lines()}</h1>
        <p class="lede">${ledeLines()}</p>
      </div>
      <div class="doors" id="doors">
    ${featureDoor(lead)}
    ${doorList()}
      </div>
      <div class="hero-actions">
        <p class="hero-caps"><a class="house-capsule is-filled" href="${roomPath(lead)}">Open ${esc(lead.title)}</a><a class="house-capsule is-ghost desk" href="mailto:${PROFILE.email}">Email me</a><button type="button" class="house-capsule is-text" data-house-copy="${PROFILE.email}">Copy address</button></p>
        <p class="hero-links desk"><a href="${PROFILE.linkedin}">LinkedIn</a><a href="${PROFILE.github}">GitHub</a>${resume ? `<a class="house-capsule is-ghost" href="/resume.pdf">Resume</a>` : ""}</p>
        <p class="quiet">${quiet}</p>
      </div>
    </div>
  </section>

  <section id="work" class="work wrap" aria-labelledby="work-h">
    <div class="section-head">
      <p class="eyebrow">Selected work</p>
      <h2 id="work-h" class="title">Four projects I built and tested.</h2>
    </div>
    <div class="work-list">
${[lead, ...rest].map((p) => workItem(p).split("\n").map((l) => "      " + l).join("\n")).join("\n")}
    </div>
  </section>

  <section id="how" class="how wrap" aria-labelledby="how-h">
    <div class="section-head">
      <h2 id="how-h" class="title">How I work</h2>
    </div>
    <ol class="rules" role="list">
      <li><strong>Spec first.</strong> I write down what done looks like before I build.</li>
      <li><strong>Measure everything.</strong> Tests and numbers settle the arguments.</li>
      <li><strong>Humans approve what matters.</strong> Agents draft and people decide.</li>
    </ol>
    <p class="more"><a href="/colophon/">Read the colophon</a> for how this site is built.</p>
  </section>

  <section id="about" class="about wrap" aria-labelledby="about-h">
    <div class="section-head">
      <p class="eyebrow">About</p>
      <h2 id="about-h" class="title">Agents that earn their place in real work.</h2>
    </div>
    <div class="prose">
      <p>I am an Applied AI Engineer in Cebu, Philippines, open to remote work, building LLM agents, RAG systems, MCP servers, and full-stack products.</p>
      <p>I am a Technical Director. I lead a team of developers across several products. Before that I built LLM agents for healthcare: patient intake, scheduling and insurance checks.</p>
      <p>I was the founding engineer of an AI recruitment CRM.</p>
      <p>I earned a BS in Computer Science, magna cum laude, and won the gSIC i-CREATe Gold Prize in 2024.</p>
    </div>
  </section>

  <section id="contact" class="contact wrap" aria-labelledby="contact-h">
    <div class="section-head">
      <p class="eyebrow">Contact</p>
      <h2 id="contact-h" class="title">Work with me</h2>
    </div>
    <p class="lede">I am open to remote roles and conversations about applied AI, so write to me or find me online.</p>
    <p class="contact-caps"><a class="house-capsule is-filled" href="mailto:${PROFILE.email}">Email me</a><button type="button" class="house-capsule is-text" data-house-copy="${PROFILE.email}">Copy address</button><a class="house-capsule is-ghost" href="${PROFILE.linkedin}">LinkedIn</a><a class="house-capsule is-ghost" href="${PROFILE.github}">GitHub</a></p>
  </section>
</main>`;
}
const SPEC = `<script type="speculationrules">{"prefetch":[{"where":{"selector_matches":"a[data-room]"},"eagerness":"moderate"}]}</script>`;
const FIELD = `<script src="/field.js" defer></script>`;
const hubDesc = `Applied AI engineer in Cebu, Philippines, open to remote. ${site.lede}`;
{
  const h = head({ title: `Garfield Lim · ${site.headline}`, desc: hubDesc, url: `${SITE}/`, imageAlt: `Garfield Lim. ${site.headline}`, extra: `<link rel="expect" href="#doors" blocking="render">\n${SPEC}` });
  const html = shell(h, indexMain(), { after: `${FIELD}\n` });
  wr("index.html", html);
  written.push("index.html");
  twins.push(["Home", "/", hubDesc]);
}

/* ---------- 404 ---------- */
{
  const main = `<main id="main">
  <section class="hero hero-404" aria-labelledby="hero-h">
    <div class="wrap">
      <div class="hero-text" data-field-host data-field="still">
        <canvas class="field" aria-hidden="true"></canvas>
        <h1 id="hero-h" class="display">This room is not built.</h1>
        <p class="lede">The address you followed does not lead anywhere. These four rooms do.</p>
      </div>
      <ul class="door-list door-list-404" role="list">
${[lead, ...rest].map((p) => `        <li>${rowDoor(p)}</li>`).join("\n")}
      </ul>
      <p class="hero-caps"><a class="house-capsule is-filled" href="/">Back to the house</a></p>
    </div>
  </section>
</main>`;
  const h = head({ title: "This room is not built · Garfield Lim", desc: "This room is not built.", noindex: true, twin: false });
  wr("404.html", shell(h, main, { after: `${FIELD}\n` }));
  written.push("404.html");
}

/* ---------- case pages ---------- */
function between(html, name, body, file) {
  const re = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(\\n[ \\t]*<!-- ${name}:end -->)`);
  if (!re.test(html)) throw new Error(`markers for ${name} not found in ${file}`);
  return html.replace(re, (_, a, b) => a + "\n" + body + b);
}
const up = "../../";
const caseHead = (p) => head({ title: `${p.title} case study · Garfield Lim`, desc: plain(p.pitch), url: `${SITE}/work/${p.slug}/`, type: "article", image: `${SITE}/assets/og/${p.slug === "mindmap" ? "mindmap" : p.slug}.png`, imageAlt: `${p.title}. Proves ${p.proves}.` });
const caseHero = (p) => lines([
  `<p class="eyebrow">Case study</p>`,
  `<h1 id="case-h" class="display">${esc(p.title)}</h1>`,
  `<p class="lede">${esc(plain(p.pitch))}</p>`,
  `<p class="proves-line"><b>Proves </b>${esc(p.proves)}</p>`,
  cta(p),
  `<ul class="tags" role="list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>`,
]);
const caseReceipt = (p) => lines([
  `<h2 class="vh">Receipt</h2>`,
  receipt(p),
  `<h2 class="cs-h limits-h">What this does not do</h2>`,
  render(`{{limits:${p.evidence}}}`),
]);
const screens = (p) => p.screens.map((s) => `<figure class="screen"><picture><source type="image/webp" srcset="${up}${esc(s.file)}.webp"><img src="${up}${esc(s.file)}.png" width="1600" height="1000" loading="lazy" decoding="async" alt="${esc(s.alt)}"></picture><figcaption>${esc(s.caption)}</figcaption></figure>`).join("\n");
function caseNav(p) {
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return lines([
    `<nav class="case-nav wrap" aria-label="More case studies">`,
    `  <a class="prev" href="/work/${prev.slug}/"><span class="cn-l">Previous</span><span class="t">${esc(prev.title)}</span></a>`,
    `  <a class="back" href="/#work-${p.slug}">Back to work</a>`,
    `  <a class="next" href="/work/${next.slug}/"><span class="cn-l">Next</span><span class="t">${esc(next.title)}</span></a>`,
    `</nav>`,
  ]);
}
for (const p of projects) {
  const file = `work/${p.slug}/index.html`;
  let html = rd(file);
  html = between(html, "head", caseHead(p), file);
  html = between(html, "case-head", caseHero(p), file);
  html = between(html, "receipt", caseReceipt(p), file);
  html = between(html, "screens", screens(p), file);
  html = between(html, "case-nav", caseNav(p), file);
  // Slots written by hand in the prose.
  html = html.replace(/\{\{(?:fig|figs|test|figs-test|checks|limits):[^}]+\}\}/g, (m) => render(m));
  wr(file, html);
  written.push(file);
  twins.push([`${p.title} case study`, `/work/${p.slug}/`, plain(p.pitch)]);
}

/* ---------- changelog ---------- */
function mdItems(s) {
  return esc(s).replace(/`([^`]+)`/g, "<code>$1</code>").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
}
function parseChangelog(text) {
  const sections = [];
  let cur = null, sub = null;
  for (const line of text.split("\n")) {
    let m;
    if ((m = line.match(/^## (.+)/))) { cur = { title: m[1].trim(), groups: [] }; sections.push(cur); sub = null; }
    else if ((m = line.match(/^### (.+)/)) && cur) { sub = { title: m[1].trim(), items: [] }; cur.groups.push(sub); }
    else if ((m = line.match(/^- (.+)/)) && cur) { if (!sub) { sub = { title: "Changes", items: [] }; cur.groups.push(sub); } sub.items.push(m[1].trim()); }
    else if (/^\s+\S/.test(line) && sub && sub.items.length) sub.items[sub.items.length - 1] += " " + line.trim();
  }
  return sections.slice(0, 3);
}
{
  const dir = process.env.CHANGELOG_DIR || path.resolve(root, "..");
  const rooms = [["hub", "Hub and house", root], ["paperlab", "PaperLab", path.join(dir, "paperlab")], ["mindmap-mcp", "Living Mindmap", path.join(dir, "mindmap-mcp")], ["slop-editorial", "Slop Editorial", path.join(dir, "slop-editorial")], ["paluwagan", "Online Paluwagan", path.join(dir, "paluwagan")]];
  const file = path.join(root, "data", "changelog.json");
  const prev = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : { rooms: {} };
  const out = { rooms: {} };
  for (const [slug, title, base] of rooms) {
    const src = path.join(base, "docs", "CHANGELOG.md");
    if (fs.existsSync(src)) {
      // A sibling's published changelog is its origin/main copy, so a branch in progress never leaks onto this page.
      let date = "", text = fs.readFileSync(src, "utf8");
      const git = (...a) => execFileSync("git", a, { cwd: base, stdio: ["ignore", "pipe", "ignore"] }).toString();
      try {
        if (base !== root) { text = git("show", "origin/main:docs/CHANGELOG.md"); date = git("log", "-1", "--format=%cs", "origin/main", "--", "docs/CHANGELOG.md").trim(); }
        else date = git("log", "-1", "--format=%cs", "--", "docs/CHANGELOG.md").trim();
      } catch { /* not a git checkout, or the file is not on main yet */ }
      const entry = { title, date, sections: parseChangelog(text) };
      // Keep the committed date when the sibling has uncommitted changes only.
      out.rooms[slug] = entry.date || !prev.rooms[slug] ? entry : prev.rooms[slug];
    } else if (prev.rooms[slug]) out.rooms[slug] = prev.rooms[slug];
  }
  wr("data/changelog.json", JSON.stringify(out, null, 2) + "\n");
  const groups = Object.entries(out.rooms).map(([slug, r]) => `    <section class="log-room" aria-labelledby="log-${slug}">
      <h2 id="log-${slug}" class="cs-h">${esc(r.title)}</h2>
${r.sections.map((s) => `      <div class="log-entry">
        <h3>${esc(s.title)}${r.date ? ` <span class="log-date">${esc(r.date)}</span>` : ""}</h3>
${s.groups.map((g) => `        <h4>${esc(g.title)}</h4>\n        <ul>${g.items.map((i) => `<li>${mdItems(i)}</li>`).join("")}</ul>`).join("\n")}
      </div>`).join("\n")}
    </section>`).join("\n");
  const main = `<main id="main">
  <div class="wrap doc">
    <p class="eyebrow">Changelog</p>
    <h1 class="title">What changed</h1>
    <p class="lede">Each repository keeps its own changelog. This page reads them at build time, newest first. The dates are when each file last changed.</p>
${groups}
  </div>
</main>`;
  const h = head({ title: "Changelog · Garfield Lim", desc: "What changed in the house and in each room.", url: `${SITE}/changelog/`, imageAlt: "Garfield Lim changelog." });
  wr("changelog/index.html", shell(h, main));
  written.push("changelog/index.html");
  twins.push(["Changelog", "/changelog/", "What changed in the house and in each room."]);
}

/* ---------- colophon ---------- */
{
  const main = `<main id="main">
  <div class="wrap doc">
    <p class="eyebrow">Colophon</p>
    <h1 class="title">How this site is made</h1>
${colophonBody({ root, house: HOUSE, houseJson, esc })}
  </div>
</main>`;
  const h = head({ title: "Colophon · Garfield Lim", desc: "Tokens, springs, fonts, stack, budgets and the AI policy behind this site.", url: `${SITE}/colophon/`, imageAlt: "Garfield Lim colophon." });
  wr("colophon/index.html", shell(h, main));
  written.push("colophon/index.html");
  twins.push(["Colophon", "/colophon/", "Tokens, springs, fonts, stack, budgets and the AI policy behind this site."]);
}

/* ---------- house sync, twins, llms.txt, sitemap ---------- */
execFileSync("node", [`house/${HOUSE}/tools/house-sync.mjs`, ...written], { cwd: root, env: { ...process.env, HOUSE_DIR: root }, stdio: "inherit" });
for (const f of written) {
  if (f === "404.html") continue;
  const html = rd(f);
  const main = (html.match(/<main[\s\S]*<\/main>/) || [""])[0];
  wr(f.replace(/index\.html$/, "index.md"), htmlToMd(main));
}
const abs = (p) => `${SITE}${p}`;
wr("llms.txt", `# Garfield Lim

> Applied AI engineer in Cebu, Philippines, open to remote. ${site.lede} Every number on these pages comes from a test run or from your own browser.

## Pages

${twins.map(([t, p, d]) => `- [${t}](${abs(p)}index.md): ${d}`).join("\n")}

## Rooms

${[lead, ...rest].map((p) => `- [${p.title}](${abs(p.roomShipped ? roomPath(p) : `/work/${p.slug}/`)}): ${p.proof}`).join("\n")}

## Contact

- Email: ${PROFILE.email}
- [LinkedIn](${PROFILE.linkedin})
- [GitHub](${PROFILE.github})
`);
wr("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${twins.map(([, p]) => `  <url><loc>${abs(p)}</loc></url>`).join("\n")}\n</urlset>\n`);
wr(".nojekyll", "");
console.log(`build: ${written.length} pages, ${twins.length} twins`);
if (missing.length) {
  console.error(`build: ${missing.length} evidence slot(s) not measured yet:\n  ${[...new Set(missing)].join("\n  ")}`);
  process.exit(1);
}
