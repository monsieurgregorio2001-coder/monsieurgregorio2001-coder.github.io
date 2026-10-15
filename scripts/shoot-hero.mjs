// Usage: node scripts/shoot-hero.mjs [outDir] [--axe path/to/axe.min.js]
// Hero screenshots (390/820/1280 x light/dark, reduced motion, mid-ripple), frame timing and axe.
// Playwright is resolved from PLAYWRIGHT_PATH (default: the global install at /opt/node22).
import { createRequire } from "node:module";
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url";
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_PATH || "/opt/node22/lib/node_modules/playwright");
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const axeAt = args.indexOf("--axe"); const axePath = axeAt >= 0 ? args.splice(axeAt, 2)[1] : null;
const out = path.resolve(args[0] || path.join(root, "docs/audits/shots/phase-1")); fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json" };
const srv = http.createServer((q, r) => { let f = path.join(root, decodeURIComponent(q.url.split("?")[0])); if (!f.startsWith(root)) { r.statusCode = 403; return r.end(); } if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); if (!fs.existsSync(f)) { r.statusCode = 404; return r.end(); } r.setHeader("content-type", types[path.extname(f)] || "application/octet-stream"); r.end(fs.readFileSync(f)); }).listen(0);
const url = `http://localhost:${srv.address().port}/`;
const b = await chromium.launch();
const external = [];
let failed = false;

async function open(w, h, scheme, motion = "no-preference") {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1, colorScheme: scheme, reducedMotion: motion });
  const p = await ctx.newPage();
  p.on("request", rq => { if (!rq.url().startsWith(url)) external.push(rq.url()); });
  p.on("pageerror", e => { console.error("pageerror", e.message); failed = true; });
  await p.goto(url, { waitUntil: "networkidle" });
  return { ctx, p };
}
const wait = ms => new Promise(r => setTimeout(r, ms));
const heroH = 900;

for (const w of [390, 820, 1280]) for (const scheme of ["light", "dark"]) {
  const { ctx, p } = await open(w, heroH, scheme);
  await wait(1400); // decode finished
  // Jitter check: headline box must not change width while letters scramble.
  const jitter = await p.evaluate(async () => {
    const h = document.querySelector(".hero h1"), spans = [...h.querySelectorAll(".w > span")];
    const before = spans.map(s => s.getBoundingClientRect().left);
    spans.forEach(s => { s.classList.add("s"); s.dataset.g = "m"; });
    const during = spans.map(s => s.getBoundingClientRect().left);
    spans.forEach(s => s.classList.remove("s"));
    return Math.max(...before.map((x, i) => Math.abs(x - during[i])));
  });
  await p.mouse.move(-10, -10);
  await p.screenshot({ path: path.join(out, `hero-${w}-${scheme}.png`) });
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log(`hero-${w}-${scheme}  scrollWidth=${sw}  maxLetterShift=${jitter.toFixed(2)}px`);
  if (sw > w || jitter > 0.5) failed = true;
  await ctx.close();
}

{ // reduced motion
  const { ctx, p } = await open(1280, heroH, "light", "reduce");
  await wait(300);
  const s = await p.evaluate(() => ({ scrambled: document.querySelectorAll(".hero h1 .s").length, label: document.querySelector(".hero h1").getAttribute("aria-label") }));
  await p.screenshot({ path: path.join(out, "hero-1280-light-reduced.png") });
  console.log("reduced-motion scrambled letters:", s.scrambled, "| aria-label:", s.label);
  if (s.scrambled) failed = true;
  await ctx.close();
}

{ // decode then mid-ripple
  const { ctx, p } = await open(1280, heroH, "light");
  const early = await p.evaluate(() => document.querySelectorAll(".hero h1 .s").length);
  await wait(1250);
  const late = await p.evaluate(() => document.querySelectorAll(".hero h1 .s").length);
  console.log(`decode: scrambled letters after load=${early}, after 1.25 s=${late}`);
  if (!early || late) failed = true;
  await wait(150);
  await p.mouse.click(760, 330);
  await wait(350);
  await p.screenshot({ path: path.join(out, "hero-1280-light-ripple.png") });
  await ctx.close();
}

{ // touch: an 80 px drag starting in the hero must not ripple; a tap must
  const ctx = await b.newContext({ viewport: { width: 390, height: heroH }, hasTouch: true, isMobile: true, colorScheme: "light" });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: "networkidle" });
  await wait(1300);
  const cdp = await ctx.newCDPSession(p);
  const touch = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y }] });
  await touch("touchStart", 200, 560);
  for (let i = 1; i <= 8; i++) { await touch("touchMove", 200, 560 - i * 10); await wait(16); }
  await touch("touchEnd");
  await wait(50);
  const afterDrag = await p.evaluate(() => window.__hero.ripples());
  await p.evaluate(() => window.scrollTo(0, 0)); await wait(100);
  await touch("touchStart", 200, 560); await wait(60); await touch("touchEnd");
  await wait(50);
  const afterTap = await p.evaluate(() => window.__hero.ripples());
  console.log(`touch: ripples after 80 px drag=${afterDrag}, after tap=${afterTap}`);
  if (afterDrag !== 0 || afterTap !== 1) failed = true;
  await ctx.close();
}

{ // timing at 1440x900
  const { ctx, p } = await open(1440, 900, "light");
  await wait(1400);
  await p.mouse.click(700, 300); await p.mouse.move(500, 400);
  const t = await p.evaluate(async () => {
    const draws = []; for (let i = 0; i < 60; i++) { const a = performance.now(); window.__hero.draw(); draws.push(performance.now() - a); }
    draws.sort((x, y) => x - y);
    const frames = []; let last = performance.now(); const end = last + 2000;
    await new Promise(res => { const f = n => { frames.push(n - last); last = n; n < end ? requestAnimationFrame(f) : res(); }; requestAnimationFrame(f); });
    return { cells: window.__hero.cells(), drawMedian: draws[30], drawP95: draws[57], drawMean: draws.reduce((a, b) => a + b, 0) / draws.length, frameMean: frames.reduce((a, b) => a + b, 0) / frames.length, frames: frames.length };
  });
  console.log(`1440x900 cells=${t.cells} draw mean=${t.drawMean.toFixed(2)}ms median=${t.drawMedian.toFixed(2)}ms p95=${t.drawP95.toFixed(2)}ms | rAF interval mean=${t.frameMean.toFixed(2)}ms over ${t.frames} frames`);
  if (t.drawMedian > 4) failed = true;
  await ctx.close();
}

if (axePath) for (const scheme of ["light", "dark"]) {
  const { ctx, p } = await open(1280, 900, scheme);
  await wait(1400);
  await p.addScriptTag({ path: axePath });
  const v = await p.evaluate(async () => (await window.axe.run(document)).violations.map(x => `${x.id} (${x.nodes.length})`));
  console.log(`axe ${scheme}: ${v.length} violations`, v.join(", "));
  if (v.length) failed = true;
  await ctx.close();
}

console.log("external requests:", external.length ? external : "none");
if (external.length) failed = true;
await b.close(); srv.close();
if (failed) { console.error("FAILED"); process.exit(1); }
