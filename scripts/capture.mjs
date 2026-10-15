// Rerunnable screenshot pipeline for the hub case cards.
//
// Usage (from scripts/, after npm install):
//   node capture.mjs [paperlab|paluwagan|mindmap ...]   full 1440x900 shots -> assets/shots/<name>.{webp,png} (1200x750)
//   node capture.mjs --crop [name ...]                  2x hero crops -> assets/shots/<name>-hero.{webp,png} (1600x1000)
//   node capture.mjs --detail [slug ...]                2x detail crops for case pages -> assets/shots/<slug>/NN-name.{webp,png}
//
// Sources: PORTFOLIO_DIR (default: the folder that contains this repo) must hold clones of
// paperlab, paluwagan, mindmap-mcp and slop-editorial with their npm dependencies installed.
// Their source trees are never modified: vite/astro builds go to a temp directory, which is
// served under each project's real base path. Living Mindmap runs its own server (tsx) against a
// throwaway SQLite file seeded with the bundled sample map.
//
// Browser: Playwright's Chromium (devDependency, PLAYWRIGHT_BROWSERS_PATH honoured). Set CHROME to
// use another binary; the macOS Chrome path is used automatically when it exists. See lib/serve.mjs.
//
// Crops: each entry in `crops` names a page, a setup step, and a CSS-pixel clip with a 16:10 ratio
// that is at least 800 px wide, captured at deviceScaleFactor 2 and downsized to 1600x1000 (never
// upscaled). The PNG fallback steps palette size and compression until it is <= 200 KB.
import sharp from "sharp";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const portfolio = process.env.PORTFOLIO_DIR || path.resolve(root, "..");
const outDir = path.join(root, "assets", "shots");
const args = process.argv.slice(2);
const cropMode = args[0] === "--crop";
const detailMode = args[0] === "--detail";
const only = new Set(cropMode || detailMode ? args.slice(1) : args);
const want = (n) => only.size === 0 || only.has(n);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PNG_MAX = 200 * 1024;

fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hub-shots-"));
const mounts = {};

function viteBuild(name) {
  const out = path.join(tmp, name);
  console.log("building", name);
  execFileSync("npx", ["vite", "build", "--outDir", out, "--emptyOutDir", "--logLevel", "error"], { cwd: path.join(portfolio, name), stdio: "inherit" });
  mounts[`/${name}/`] = out;
}
function astroBuild() {
  const out = path.join(tmp, "slop-editorial");
  console.log("building slop-editorial");
  execFileSync("npx", ["astro", "build", "--outDir", out, "--silent"], { cwd: path.join(portfolio, "slop-editorial", "site"), stdio: "inherit" });
  mounts["/slop-editorial/"] = out;
}

let mindmapServer;
async function mindmapBase() {
  const dir = path.join(portfolio, "mindmap-mcp");
  console.log("building mindmap-mcp");
  execFileSync("npm", ["run", "build", "--silent"], { cwd: dir, stdio: "inherit" });
  const port = 4398;
  const base = `http://127.0.0.1:${port}`;
  mindmapServer = spawn("npx", ["tsx", "src/server/index.ts"], {
    cwd: dir, stdio: "ignore", env: { ...process.env, PORT: String(port), MINDMAP_DB: path.join(tmp, "shot.db") },
  });
  for (let i = 0; i < 80; i++) {
    try { if ((await fetch(base + "/api/maps")).ok) break; } catch { /* not up yet */ }
    await sleep(250);
  }
  await fetch(base + "/api/seed", { method: "POST" });
  const maps = await (await fetch(base + "/api/maps")).json();
  const list = Array.isArray(maps) ? maps : maps.maps;
  const sample = list.find((m) => /Transformers/.test(m.title || m.name || "")) || list[0];
  return `${base}/#/map/${sample.id}`;
}

async function pngUnder(input, w, h) {
  // [palette colours, dither]. libimagequant gains little below 64 colours, so the last steps trade dither.
  const steps = [[256, 1], [128, 1], [96, 1], [64, 1], [64, 0.5], [64, 0.25], [64, 0]];
  let buf;
  for (const [colours, dither] of steps) {
    buf = await sharp(input).resize(w, h).png({ compressionLevel: 9, palette: true, colours, dither, effort: 10 }).toBuffer();
    if (buf.length <= PNG_MAX) return buf;
  }
  console.warn(`PNG still ${Math.round(buf.length / 1024)} KB after the last step`);
  return buf;
}

async function save(name, input, w, h, fit = { fit: "cover", position: "top" }, quality = 82) {
  const img = sharp(input).resize(w, h, fit);
  fs.mkdirSync(path.dirname(path.join(outDir, name)), { recursive: true });
  await img.clone().webp({ quality, effort: 6 }).toFile(path.join(outDir, `${name}.webp`));
  const png = w === 1600 ? await pngUnder(await img.clone().png().toBuffer(), w, h)
    : await img.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
  fs.writeFileSync(path.join(outDir, `${name}.png`), png);
  console.log("wrote", name, `${Math.round(fs.statSync(path.join(outDir, `${name}.webp`)).size / 1024)} KB webp`, `${Math.round(png.length / 1024)} KB png`);
}

// Clip helpers: a 16:10 box of width w whose top-left sits relative to an element's box.
const box16x10 = (x, y, w) => ({ x, y, width: w, height: Math.round((w * 10) / 16) });
async function rectOf(page, sel) {
  const r = await page.locator(sel).first().boundingBox();
  if (!r) throw new Error("no element " + sel);
  return r;
}

const crops = {
  // Attention step: head toggles above the first per-head heatmap.
  paperlab: {
    page: (s) => `${s}/paperlab/`,
    build: () => viteBuild("paperlab"),
    async setup(page) {
      await page.getByRole("button", { name: /Step 3: Attention/ }).first().click();
      await page.locator("figure.matrix.heat").first().scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        const r = document.querySelector("figure.matrix.heat").getBoundingClientRect();
        window.scrollBy(0, r.top - 190);
      });
      await sleep(400);
      const r = await rectOf(page, "figure.matrix.heat");
      return box16x10(Math.round(r.x - 30), Math.round(r.y - 140), 880);
    },
  },
  // Group dashboard: summary tiles and the cycle schedule.
  paluwagan: {
    page: (s) => `${s}/paluwagan/`,
    build: () => viteBuild("paluwagan"),
    async setup(page) {
      await page.locator("a.btn.primary", { hasText: "Open group" }).first().click();
      await sleep(800);
      const tiles = await page.locator("section.card").first().boundingBox();
      await page.evaluate((y) => window.scrollTo(0, y), Math.max(0, Math.round(tiles.y) - 300));
      await sleep(300);
      const r = await page.locator("section.card").first().boundingBox();
      r.y -= 151;
      return box16x10(Math.round(r.x - 72), Math.round(r.y - 24), 1040);
    },
  },
  // Canvas with the sample graph and the side panel.
  mindmap: {
    page: () => mindmapBase(),
    build: () => {},
    async setup(page) {
      await sleep(1500);
      return box16x10(0, 0, 1440);
    },
  },
  // Cover: masthead, the hero still and its sticker.
  // A busy photographic image: lower WebP quality keeps the page under its 450 KB budget.
  slop: {
    webpQuality: 60,
    page: (s) => `${s}/slop-editorial/`,
    build: () => astroBuild(),
    async setup(page) {
      await page.getByRole("button", { name: /^Accept all$/ }).first().click().catch(() => {});
      await sleep(1200);
      const r = await rectOf(page, "section.cover");
      return box16x10(Math.round(r.x), Math.round(r.y), Math.round(r.width));
    },
  },
};

// Detail crops for the case pages (ADR 0006): 2-4 named regions per project, same 16:10 / 2x rules.
// near() scrolls an element so its top sits `top` px below the viewport edge and returns a clip around it.
// sel is a CSS selector or a Playwright locator.
async function near(page, sel, { top = 96, dx = -24, dy = -24, w = 944 } = {}) {
  const loc = (typeof sel === "string" ? page.locator(sel) : sel).first();
  await loc.scrollIntoViewIfNeeded();
  await loc.evaluate((el, t) => window.scrollBy(0, el.getBoundingClientRect().top - t), top);
  await sleep(400);
  const r = await loc.boundingBox();
  return box16x10(Math.round(r.x + dx), Math.round(r.y + dy), w);
}
const step = (page, n) => page.getByRole("button", { name: new RegExp(`Step ${n}:`) }).first().click();
const openGroup = async (page, tab) => {
  await page.locator("a.btn.primary", { hasText: "Open group" }).first().click();
  await sleep(800);
  if (tab) { await page.locator("a.tab", { hasText: tab }).first().click(); await sleep(600); }
};
const dismissCookies = async (page) => {
  await sleep(2800);
  await page.getByRole("button", { name: /^Accept all$/ }).first().click({ timeout: 2000 }).catch(() => {});
  await sleep(400);
};

const details = {
  paperlab: {
    build: () => viteBuild("paperlab"),
    url: (s) => `${s}/paperlab/`,
    shots: [
      { name: "01-input", setup: (p) => near(p, "section.intro", { top: 72 }) },
      { name: "02-embeddings", async setup(p) { await step(p, 2); await p.mouse.move(0, 0); await sleep(400); return near(p, "figure.matrix"); } },
      { name: "03-feed-forward", async setup(p) { await step(p, 4); await sleep(400); return near(p, "section.card.stage"); } },
    ],
  },
  mindmap: {
    build: () => {},
    url: () => mindmapBase(),
    shots: [
      { name: "01-graph", async setup(p) { await sleep(1500); return box16x10(96, 120, 900); } },
      { name: "02-inspector", async setup(p) {
        await sleep(1200);
        await p.locator(".react-flow__node", { hasText: "Self-Attention" }).first().click();
        await sleep(800);
        return box16x10(560, 52, 880);
      } },
      { name: "03-search", async setup(p) {
        await sleep(1200);
        await p.keyboard.press("/");
        await sleep(300);
        await p.keyboard.type("attention");
        await sleep(800);
        return box16x10(520, 0, 920);
      } },
    ],
  },
  "slop-editorial": {
    build: () => astroBuild(),
    url: (s) => `${s}/slop-editorial/releases/`,
    webpQuality: 70,
    shots: [
      { name: "01-releases", async setup(p) { await dismissCookies(p); return near(p, "section.run h1", { top: 140, dy: -60, w: 1072 }); } },
      { name: "02-gift-shop", async setup(p, s) {
        await p.goto(`${s}/slop-editorial/authenticity/`, { waitUntil: "networkidle" });
        await dismissCookies(p);
        return near(p, "figure.receipt", { top: 120, dx: -20, dy: -60, w: 1000 });
      } },
      { name: "03-works", async setup(p, s) {
        await p.goto(`${s}/slop-editorial/works/`, { waitUntil: "networkidle" });
        await dismissCookies(p);
        return near(p, "section.ex h1", { top: 140, dy: -60, w: 1072 });
      } },
    ],
  },
  paluwagan: {
    build: () => viteBuild("paluwagan"),
    url: (s) => `${s}/paluwagan/`,
    shots: [
      { name: "01-contributions", async setup(p) { await openGroup(p, "Ledger"); return near(p, "section.card"); } },
      { name: "02-ledger-entries", async setup(p) { await openGroup(p, "Ledger"); return near(p, p.locator("section.card", { hasText: "Ledger entries" })); } },
      { name: "03-risk", async setup(p) { await openGroup(p, "Risk and reminders"); return near(p, "section.risk-card.wide"); } },
    ],
  },
};

const browser = await launch();
let srv;
const newPage = (scale) =>
  browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: scale, colorScheme: "light", reducedMotion: "reduce" });

try {
  if (detailMode) {
    const names = Object.keys(details).filter(want);
    for (const n of names) details[n].build();
    srv = await serve(mounts, { spa: true });
    for (const n of names) {
      const d = details[n];
      for (const shot of d.shots) {
        const page = await newPage(2);
        await page.goto(await d.url(srv.base), { waitUntil: "networkidle" });
        const clip = await shot.setup(page, srv.base);
        if (clip.width < 800) throw new Error(`${n}/${shot.name}: clip narrower than 800 CSS px would be upscaled`);
        await save(`${n}/${shot.name}`, await page.screenshot({ clip }), 1600, 1000, { fit: "fill" }, d.webpQuality || 82);
        await page.close();
      }
    }
  } else if (cropMode) {
    const names = Object.keys(crops).filter(want);
    for (const n of names) crops[n].build();
    srv = await serve(mounts, { spa: true });
    for (const n of names) {
      const c = crops[n];
      const page = await newPage(2);
      await page.goto(await c.page(srv.base), { waitUntil: "networkidle" });
      const clip = await c.setup(page);
      if (clip.width < 800) throw new Error(`${n}: clip narrower than 800 CSS px would be upscaled`);
      const shot = await page.screenshot({ clip });
      await save(`${n}-hero`, shot, 1600, 1000, { fit: "fill" }, c.webpQuality || 82);
      await page.close();
    }
  } else {
    if (want("paperlab")) viteBuild("paperlab");
    if (want("paluwagan")) viteBuild("paluwagan");
    srv = await serve(mounts, { spa: true });
    if (want("paperlab")) {
      const page = await newPage(1);
      await page.goto(`${srv.base}/paperlab/`, { waitUntil: "networkidle" });
      await page.getByRole("button", { name: /Step 3: Attention/ }).first().click();
      await sleep(600);
      await page.evaluate(() => {
        const h = document.querySelector("figure.matrix.heat");
        if (h) { h.scrollIntoView({ block: "start" }); window.scrollBy(0, -300); }
      });
      await sleep(400);
      await save("paperlab", await page.screenshot(), 1200, 750);
      await page.close();
    }
    if (want("paluwagan")) {
      const page = await newPage(1);
      await page.goto(`${srv.base}/paluwagan/`, { waitUntil: "networkidle" });
      await page.locator("a.btn.primary", { hasText: "Open group" }).first().click();
      await sleep(800);
      await save("paluwagan", await page.screenshot(), 1200, 750);
      await page.close();
    }
    if (want("mindmap")) {
      await save("mindmap", fs.readFileSync(path.join(portfolio, "mindmap-mcp", "docs", "screenshot.png")), 1200, 750);
    }
  }
} finally {
  await browser.close();
  srv?.close();
  mindmapServer?.kill();
  fs.rmSync(tmp, { recursive: true, force: true });
}
