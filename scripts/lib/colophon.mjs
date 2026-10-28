// Colophon body (DIRECTION 5.7). Token tables and spring plots are computed from the house tokens.css, so the spec cannot drift.
import fs from "node:fs";
import path from "node:path";

const lum = (hex) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
};
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return ((x + 0.05) / (y + 0.05)).toFixed(1); };
const decls = (block) => Object.fromEntries([...block.matchAll(/(--h-[\w-]+):\s*([^;]+);/g)].map((m) => [m[1], m[2].trim()]));

export function colophonBody({ root, house, houseJson, esc }) {
  const css = fs.readFileSync(path.join(root, "house", house, "tokens.css"), "utf8");
  const light = decls(css.match(/:root \{([\s\S]*?)\n\}/)[1]);
  const dark = decls(css.match(/prefers-color-scheme: dark\) \{\s*:root \{([\s\S]*?)\n  \}/)[1]);
  const swatch = (hex) => `<svg class="sw" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><rect width="20" height="20" rx="6" fill="${hex}" stroke="currentColor" stroke-opacity=".25"/></svg>`;
  const colours = ["bg", "surface", "surface-2", "ink", "ink-2", "ink-3", "rule", "accent", "positive", "warning", "negative"];
  const colourRows = colours.map((n) => {
    const l = light[`--h-${n}`], d = dark[`--h-${n}`] || l;
    const rl = ratio(l, light["--h-bg"]), rd = ratio(d, dark["--h-bg"] || light["--h-bg"]);
    return `<tr><th scope="row"><code>--h-${n}</code></th><td>${swatch(l)} <code>${l}</code> <span class="muted">${rl}:1</span></td><td>${swatch(d)} <code>${d}</code> <span class="muted">${rd}:1</span></td></tr>`;
  }).join("");
  const typeNames = ["display", "title", "heading", "lede", "body", "callout", "label", "caption", "figure", "wordmark"];
  const typeRows = typeNames.map((n) => `<tr><th scope="row"><code>--h-t-${n}</code></th><td><code>${esc(light[`--h-t-${n}`].replace(/var\(--h-font-(\w+)\)/, "$1"))}</code></td></tr>`).join("");
  const list = (re) => Object.entries(light).filter(([k]) => re.test(k)).map(([k, v]) => `<tr><th scope="row"><code>${k}</code></th><td><code>${esc(v)}</code></td></tr>`).join("");

  // Springs: sample points from each linear() easing, drawn as inline SVG.
  const spring = (name, ms) => {
    const m = css.match(new RegExp(`--h-spring-${name}:\\s*linear\\(([^)]*)\\)`));
    const raw = m[1].split(",").map((s) => s.trim().split(/\s+/));
    const pts = raw.map((r, i) => [r[1] ? parseFloat(r[1]) / 100 : i === 0 ? 0 : 1, parseFloat(r[0])]);
    const w = 240, h = 110, top = 14, bot = 96;
    const y = (v) => bot - (v / 1.1) * (bot - top);
    const d = pts.map(([x, v], i) => `${i ? "L" : "M"}${(x * w).toFixed(1)} ${y(v).toFixed(1)}`).join("");
    return `<figure class="plot"><svg viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="sp-${name}"><title id="sp-${name}">Spring ${name}, ${ms} milliseconds, ${pts.length} sampled points</title><line x1="0" x2="${w}" y1="${y(1)}" y2="${y(1)}" stroke="currentColor" stroke-opacity=".3" stroke-dasharray="4 4"/><path d="${d}" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/></svg><figcaption><code>--h-spring-${name}</code>, ${ms} ms, ${pts.length} points</figcaption></figure>`;
  };

  const fdir = path.join(root, "house", house, "fonts");
  const fonts = [
    ["Fraunces", "wordmark, H1, section titles", "fraunces-latin-opsz-normal.woff2", "LICENSE-Fraunces.txt"],
    ["Inter", "UI, body, money", "inter-latin-wght-normal.woff2", "LICENSE-Inter.txt"],
    ["JetBrains Mono 400", "the glyph field, after the first paint", "jetbrains-mono-latin-400-normal.woff2", "LICENSE-JetBrainsMono.txt"],
    ["JetBrains Mono 500", "figures and code", "jetbrains-mono-latin-500-normal.woff2", "LICENSE-JetBrainsMono.txt"],
  ].map(([n, use, f, lic]) => `<tr><th scope="row">${n}</th><td>${use}</td><td class="num-cell">${(fs.statSync(path.join(fdir, f)).size / 1024).toFixed(1)} KB</td><td><a href="/house/${house}/fonts/${lic}">SIL Open Font License 1.1</a></td></tr>`).join("");

  const stack = [
    ["Hub", "Static HTML, CSS and vanilla JavaScript. Node only for the build and checks."],
    ["PaperLab", "React, TypeScript, Vite."],
    ["Online Paluwagan", "React, TypeScript, Vite."],
    ["Living Mindmap", "TypeScript, SQLite, a stdio MCP server, Vite for the browser demo."],
    ["Slop Editorial", "Astro, with a Python pipeline behind it."],
  ].map(([n, s]) => `<tr><th scope="row">${n}</th><td>${s}</td></tr>`).join("");

  const matrix = [
    ["Cross-document view transitions", "yes", "yes", "no", "Normal navigation"],
    ["Same-document view transitions", "yes", "yes", "yes", "Instant swap"],
    ["linear() easing, popover, anchor positioning", "yes", "yes", "yes", "Cubic curves, fixed position"],
    ["Scroll-driven animations", "yes", "yes", "behind a setting", "End state"],
    ["Speculation rules", "yes", "off by default", "no", "Normal fetch"],
  ].map((r) => `<tr><th scope="row">${r[0]}</th><td>${r[1]}</td><td>${r[2]}</td><td>${r[3]}</td><td>${r[4]}</td></tr>`).join("");

  const bfile = path.join(root, "data", "budgets.json");
  let budgets = `<p>Not measured yet. Run <code>npm run budgets</code>.</p>`;
  if (fs.existsSync(bfile)) {
    const b = JSON.parse(fs.readFileSync(bfile, "utf8"));
    const kb = (n) => `${(n / 1024).toFixed(1)} KB`;
    budgets = `<table><thead><tr><th scope="col">Budget</th><th scope="col">Limit</th><th scope="col">Last run</th></tr></thead><tbody>${b.rows.map((r) => `<tr><th scope="row">${esc(r.label)}</th><td class="num-cell">${kb(r.limit)}</td><td class="num-cell">${kb(r.actual)}</td></tr>`).join("")}</tbody></table><p class="muted">Measured on ${esc(b.date)} at commit ${esc(b.commit)}, at 390 px, gzipped.</p>`;
  }

  const rows = (t) => `<table><tbody>${t}</tbody></table>`;
  return `
    <p class="lede">Every colour, curve and size below is read from the house tokens when the site is built, so this page cannot disagree with the code.</p>

    <section aria-labelledby="c-colour"><h2 id="c-colour" class="cs-h">Colour</h2>
    <p>Contrast is measured against the page background in each theme.</p>
    <div class="table-wrap"><table><thead><tr><th scope="col">Token</th><th scope="col">Light</th><th scope="col">Dark</th></tr></thead><tbody>${colourRows}</tbody></table></div></section>

    <section aria-labelledby="c-type"><h2 id="c-type" class="cs-h">Type</h2>
    <div class="table-wrap">${rows(typeRows)}</div></section>

    <section aria-labelledby="c-shape"><h2 id="c-shape" class="cs-h">Space, shape and time</h2>
    <div class="table-wrap">${rows(list(/^--h-(sp|r|dur)-/))}</div></section>

    <section aria-labelledby="c-spring"><h2 id="c-spring" class="cs-h">Springs</h2>
    <p>Each easing is sampled from a damped spring. The dashed line is the end value.</p>
    <div class="plots">${spring("smooth", 590)}${spring("snappy", 430)}${spring("bouncy", 560)}</div></section>

    <section aria-labelledby="c-fonts"><h2 id="c-fonts" class="cs-h">Fonts</h2>
    <p>All fonts are self-hosted and served from the same origin.</p>
    <div class="table-wrap"><table><thead><tr><th scope="col">Family</th><th scope="col">Use</th><th scope="col">Size</th><th scope="col">Licence</th></tr></thead><tbody>${fonts}</tbody></table></div></section>

    <section aria-labelledby="c-stack"><h2 id="c-stack" class="cs-h">Stack</h2>
    <div class="table-wrap">${rows(stack)}</div></section>

    <section aria-labelledby="c-browsers"><h2 id="c-browsers" class="cs-h">Browsers</h2>
    <div class="table-wrap"><table><thead><tr><th scope="col">Feature</th><th scope="col">Chrome and Edge</th><th scope="col">Safari</th><th scope="col">Firefox</th><th scope="col">Fallback</th></tr></thead><tbody>${matrix}</tbody></table></div></section>

    <section aria-labelledby="c-budgets"><h2 id="c-budgets" class="cs-h">Budgets</h2>
    <div class="table-wrap">${budgets}</div></section>

    <section aria-labelledby="c-ai"><h2 id="c-ai" class="cs-h">How AI is used</h2>
    <p>Built with AI-assisted development in Claude Code and Cursor. Garfield sets the brief and accepts or rejects each decision. Decisions still waiting for review are marked.</p>
    <p>No analytics. No requests to any other server.</p></section>`;
}
