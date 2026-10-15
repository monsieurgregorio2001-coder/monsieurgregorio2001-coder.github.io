// Renders Open Graph images (1200x630 PNG) with the self-hosted fonts, through the shared Playwright launcher.
//   assets/og-image.png        the hub, from assets/og-image.svg as is
//   assets/og/<slug>.png       one per project in projects.json: the same template with the eyebrow,
//                              the two headline lines replaced by the title and the Proves line (ADR 0006)
// Usage: node scripts/og.mjs [slug ...]   (no slugs: hub and every project)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";
import { esc } from "./lib/chrome.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const only = new Set(process.argv.slice(2));
const svg = fs.readFileSync(path.join(root, "assets/og-image.svg"), "utf8");
const projects = JSON.parse(fs.readFileSync(path.join(root, "projects.json"), "utf8"));

function forProject(p) {
  const out = svg
    .replace(/aria-label="[^"]*"/, `aria-label="${esc(`${p.title}. Proves ${p.proves}.`)}"`)
    .replace(/>APPLIED AI ENGINEER[^<]*</, ">CASE STUDY  ·  APPLIED AI ENGINEER<")
    .replace(/<tspan x="96" y="345">[^<]*<\/tspan>/, `<tspan x="96" y="345">${esc(p.title)}</tspan>`)
    .replace(/<tspan x="96" y="441">[^<]*<\/tspan>/,
      `<tspan x="96" y="425" font-family="Inter, Helvetica, Arial, sans-serif" font-size="40" letter-spacing="0" fill="#5F5F6B">Proves: ${esc(p.proves)}</tspan>`);
  if (out.includes("I turn messy")) throw new Error("og-image.svg layout changed: update the substitutions in og.mjs");
  return out;
}

const page = (body) => `<!doctype html><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;font-weight:100 900;src:url(/assets/fonts/fraunces-latin-opsz-normal.woff2)}
@font-face{font-family:Inter;font-weight:100 900;src:url(/assets/fonts/inter-latin-wght-normal.woff2)}
@font-face{font-family:"JetBrains Mono";src:url(/assets/fonts/jetbrains-mono-latin-400-normal.woff2)}
body{margin:0}svg{display:block}</style>${body}`;

const jobs = [];
if (!only.size) jobs.push(["assets/og-image.png", svg]);
for (const p of projects) if (!only.size || only.has(p.slug)) jobs.push([`assets/og/${p.slug}.png`, forProject(p)]);

fs.mkdirSync(path.join(root, "assets/og"), { recursive: true });
const tmp = fs.mkdtempSync(path.join(root, "scripts", ".og-"));
const srv = await serve({ "/assets/": path.join(root, "assets"), "/og/": tmp });
const browser = await launch();
try {
  for (const [i, [out, body]] of jobs.entries()) {
    fs.writeFileSync(path.join(tmp, `${i}.html`), page(body));
    const p = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await p.goto(`${srv.base}/og/${i}.html`, { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path: path.join(root, out) });
    await p.close();
    console.log("wrote", out);
  }
} finally {
  await browser.close();
  srv.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}
