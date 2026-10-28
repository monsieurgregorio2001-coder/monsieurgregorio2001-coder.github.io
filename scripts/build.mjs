// Renders the Work section of index.html and the generated blocks of each case page from projects.json (ADR 0006, 0007).
// Usage: node scripts/build.mjs   (no dependencies; works from any cwd)
// index.html: header, now (from site.json), cards, noscript and footer markers.
// work/<slug>/index.html: head, header, case-head, screens, case-nav and footer markers. Prose outside markers is hand-written.
// Idempotent: the output depends only on projects.json, so a second run changes nothing.
// CI runs it and fails if the committed index.html differs from the output.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { esc, header, footer, caseHead } from "./lib/chrome.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");
const projects = JSON.parse(fs.readFileSync(path.join(root, "projects.json"), "utf8"))
  .slice()
  .sort((a, b) => a.order - b.order);


// Port of the old main.js withNumbers: wrap measured numbers in .num, never a trailing , or .
function withNumbers(text) {
  const re = /\d[\d,.]*/g;
  let out = "", last = 0, m;
  while ((m = re.exec(text))) {
    let end = re.lastIndex;
    if (/[.,]$/.test(m[0])) { end -= 1; re.lastIndex = end; }
    out += esc(text.slice(last, m.index)) + `<span class="num">${esc(text.slice(m.index, end))}</span>`;
    last = end;
  }
  return out + esc(text.slice(last));
}

const caseUrl = (p) => `/work/${p.slug}/`;
const btn = (label, href, primary, name) =>
  `<a class="${primary ? "btn primary" : "btn"}" href="${esc(href)}" rel="noopener" aria-label="${esc(label + " for " + name)}">${esc(label)}</a>`;
const caseLink = (p) =>
  `<a class="case-link" href="${esc(caseUrl(p))}" aria-label="${esc("Read the case for " + p.title)}">Read the case</a>`;

// cardImage is the 1600x1000 2x crop; fall back to the old 1200x750 shot.
function picture(p) {
  const img = p.cardImage || p.image;
  const [w, h] = p.cardImage ? [1600, 1000] : [1200, 750];
  return `<figure class="shot"><picture><source type="image/webp" srcset="${esc(img)}.webp"><img src="${esc(img)}.png" width="${w}" height="${h}" loading="lazy" decoding="async" alt="${esc(p.imageAlt || "")}"></picture></figure>`;
}

// Badge per status: "live" is hosted, "local" runs from the repository, anything else is not out yet.
const BADGES = { live: "Live", local: "Runs locally" };
const meta = (p, live) =>
  `<div class="meta"><span class="${p.status === "live" ? "badge live" : "badge"}">${live ? BADGES[p.status] : "Coming soon"}</span><p class="proves"><b>Proves </b>${esc(p.proves)}</p></div>`;

function pcr(p) {
  const rows = [["Problem", p.problem], ["Build", p.build], ["Result", p.result]]
    .filter((r) => r[1])
    .map(([k, v]) => `<div><dt>${k}</dt><dd>${k === "Result" ? withNumbers(v) + (p.resultSource ? `<!-- src: ${esc(p.resultSource)} -->` : "") : esc(v)}</dd></div>`);
  return rows.length ? `<dl class="pcr">${rows.join("")}</dl>` : "";
}

const tags = (p) =>
  p.tags && p.tags.length ? `<ul class="tags" role="list">${p.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>` : "";

// Proof figures must come from the Result text: every number in a figure has to appear there.
const numbersIn = (s) => s.match(/\d(?:[\d,.]*\d)?/g) || [];
function figures(p) {
  if (!p.figures || !p.figures.length) return "";
  const nums = new Set(numbersIn(p.result));
  for (const f of p.figures) {
    if (!f.source) throw new Error(`${p.title}: figure ${f.value} has no source`);
    for (const n of numbersIn(f.value)) {
      if (!nums.has(n)) throw new Error(`${p.title}: figure number ${n} does not appear in result`);
    }
  }
  const items = p.figures.map((f) => `<li><span class="fig num">${esc(f.value)}</span><span class="fig-label">${esc(f.label)}</span>${f.source ? `<!-- src: ${esc(f.source)} -->` : ""}</li>`);
  return `<ul class="figures" role="list" aria-label="${esc(p.title + " in numbers")}">${items.join("")}</ul>`;
}

const lines = (arr) => arr.filter((l) => l.trim()).join("\n");

function featured(p, i) {
  const actions = [];
  if (p.demoUrl) actions.push(btn("Open the demo", p.demoUrl, true, p.title));
  actions.push(`<a class="btn" href="${esc(caseUrl(p))}" aria-label="${esc("Read the case for " + p.title)}">Read the case</a>`);
  if (p.repoUrl) actions.push(`<a class="case-link" href="${esc(p.repoUrl)}" rel="noopener" aria-label="${esc("Code for " + p.title)}">Code</a>`);
  return lines([
    `<article class="case featured reveal" id="work-${esc(p.slug)}" style="--i:${i}">`,
    `  ${picture(p)}`,
    `  <div class="body">`,
    `    ${meta(p, true)}`,
    `    <h3 class="display">${esc(p.title)}</h3>`,
    `    <p class="pitch">${esc(p.pitch)}</p>`,
    `    ${figures(p)}`,
    `    ${pcr(p)}`,
    `    ${tags(p)}`,
    `    <p class="actions">${actions.join("")}</p>`,
    `  </div>`,
    `</article>`,
  ]);
}

function card(p, i) {
  if (!BADGES[p.status]) {
    return lines([
      `<article class="case soon reveal" id="work-${esc(p.slug)}" style="--i:${i}">`,
      `  ${meta(p, false)}`,
      `  <h3>${esc(p.title)}</h3>`,
      `  <p class="pitch">${esc(p.pitch)}</p>`,
      `  <p class="note">Case study and links to follow.</p>`,
      `</article>`,
    ]);
  }
  const actions = [];
  if (p.demoUrl) actions.push(btn(p.demoLabel || "Live demo", p.demoUrl, true, p.title));
  if (p.repoUrl) actions.push(btn("Code", p.repoUrl, !p.demoUrl, p.title));
  actions.push(caseLink(p));
  return lines([
    `<article class="case reveal" id="work-${esc(p.slug)}" style="--i:${i}">`,
    p.image ? `  ${picture(p)}` : "",
    `  <div class="body">`,
    `    ${meta(p, true)}`,
    `    <h3>${esc(p.title)}</h3>`,
    `    <p class="pitch">${esc(p.pitch)}</p>`,
    `    ${pcr(p)}`,
    `    ${tags(p)}`,
    `    <p class="actions">${actions.join("")}</p>`,
    `  </div>`,
    `</article>`,
  ]);
}

const indent = (s, n) => s.split("\n").map((l) => " ".repeat(n) + l).join("\n");

const lead = projects.find((p) => p.featured);
const rest = projects.filter((p) => p !== lead);
let cards = "";
if (lead) cards += indent(featured(lead, 0), 4) + "\n";
cards += `    <ul id="cards" class="cards" role="list">\n`;
rest.forEach((p, i) => {
  cards += `      <li>\n${indent(card(p, i + (lead ? 1 : 0)), 8)}\n      </li>\n`;
});
cards += `    </ul>`;

const noscript =
  `      <ul class="plain">\n` +
  projects
    .map((p) => {
      const links = [`<a href="${esc(caseUrl(p))}">Read the case</a>`];
      if (p.demoUrl) links.push(`<a href="${esc(p.demoUrl)}">${esc(p.demoLabel || "Live demo")}</a>`);
      return `        <li><strong>${esc(p.title)}</strong>. ${esc(p.pitch)} ${links.join(" &middot; ")}.</li>`;
    })
    .join("\n") +
  `\n      </ul>`;

function between(html, name, body, file = "index.html") {
  const re = new RegExp(`(<!-- ${name}:start -->)[\\s\\S]*?(\\n[ \\t]*<!-- ${name}:end -->)`);
  if (!re.test(html)) throw new Error(`markers for ${name} not found in ${file}`);
  return html.replace(re, (_, a, b) => a + "\n" + body + b);
}

function update(file, blocks) {
  const rel = path.relative(root, file);
  const before = fs.readFileSync(file, "utf8");
  const after = blocks.reduce((h, [name, body]) => between(h, name, body, rel), before);
  if (after !== before) fs.writeFileSync(file, after);
  console.log(rel, after !== before ? "updated" : "already up to date");
}

// Hero "Now" line from site.json, so it can be updated without touching the HTML. An empty line renders nothing.
const site = JSON.parse(fs.readFileSync(path.join(root, "site.json"), "utf8"));
const now = site.now ? `    <p class="now">${esc(site.now)}</p>` : "";

update(indexPath, [["header", header("")], ["now", now], ["cards", cards], ["noscript", noscript], ["footer", footer()]]);

// Case pages (ADR 0006). The header block, screens and prev/next nav come from projects.json so cards and pages agree.
const up = "../../";
function caseHeader(p) {
  const links = [];
  if (p.demoUrl) links.push(btn(p.demoLabel || "Live demo", p.demoUrl, true, p.title));
  if (p.repoUrl) links.push(btn("Code", p.repoUrl, !p.demoUrl, p.title));
  return lines([
    `<p class="eyebrow">Case study</p>`,
    `<h1 id="case-h" class="display">${esc(p.title)}</h1>`,
    `<p class="lead">${esc(p.pitch)}</p>`,
    `<p class="proves"><b>Proves </b>${esc(p.proves)}</p>`,
    `<p class="actions">${links.join("")}</p>`,
    tags(p),
  ]);
}
function screens(p) {
  if (!p.screens || !p.screens.length) throw new Error(`${p.title}: screens[] is empty`);
  return p.screens
    .map((s) => `<figure class="screen"><picture><source type="image/webp" srcset="${up}${esc(s.file)}.webp"><img src="${up}${esc(s.file)}.png" width="1600" height="1000" loading="lazy" decoding="async" alt="${esc(s.alt)}"></picture><figcaption>${esc(s.caption)}</figcaption></figure>`)
    .join("\n");
}
function caseNav(p) {
  const i = projects.indexOf(p);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  return lines([
    `<nav class="case-nav wrap" aria-label="More case studies">`,
    `  <a class="prev" href="/work/${esc(prev.slug)}/"><span class="eyebrow">Previous</span><span class="t">${esc(prev.title)}</span></a>`,
    `  <a class="back" href="/#work-${esc(p.slug)}">Back to work</a>`,
    `  <a class="next" href="/work/${esc(next.slug)}/"><span class="eyebrow">Next</span><span class="t">${esc(next.title)}</span></a>`,
    `</nav>`,
  ]);
}
for (const p of projects) {
  const file = path.join(root, "work", p.slug, "index.html");
  if (!fs.existsSync(file)) continue;
  update(file, [
    ["head", caseHead(p, up)],
    ["header", header("/")],
    ["case-head", caseHeader(p)],
    ["screens", screens(p)],
    ["case-nav", caseNav(p)],
    ["footer", footer()],
  ]);
}
