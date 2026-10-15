// Rerunnable screenshot pipeline for the hub case cards.
//
// Usage (from scripts/, after npm install):
//   node capture.mjs [paperlab|paluwagan|mindmap ...]   full 1440x900 shots -> assets/shots/<name>.{webp,png} (1200x750)
//   node capture.mjs --crop [name ...]                  2x hero crops -> assets/shots/<name>-hero.{webp,png} (1600x1000)
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
// captured at deviceScaleFactor 2 (or the crop's own `scale`) and at least 1600 device px wide, downsized to 1600x1000 (never upscaled). The PNG fallback steps palette size and compression until it is <= 200 KB.
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
const only = new Set(cropMode ? args.slice(1) : args);
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
  // Attention step: the Head 1 matrix with its token labels fills the frame. The table is only
  // ~380 CSS px wide, so this crop is shot at deviceScaleFactor 4 to stay above 1600 device px.
  paperlab: {
    scale: 4,
    page: (s) => `${s}/paperlab/`,
    build: () => viteBuild("paperlab"),
    async setup(page) {
      await page.getByRole("button", { name: /Step 3: Attention/ }).first().click();
      await page.evaluate(() => {
        const r = document.querySelector("figure.matrix.heat").getBoundingClientRect();
        window.scrollBy(0, r.top - 300);
      });
      await sleep(400);
      const t = await rectOf(page, "figure.matrix.heat table");
      const w = Math.round(t.width / 0.8);
      const box = box16x10(Math.round(t.x - (w - t.width) / 2), 0, w);
      box.y = Math.round(t.y + t.height / 2 - box.height / 2);
      return box;
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
  // Canvas zoomed in on Self-Attention and its children, with the left edge of the inspector.
  // Shot at deviceScaleFactor 3 so the narrower region still yields more than 1600 device px.
  mindmap: {
    scale: 3,
    page: () => mindmapBase(),
    build: () => {},
    async setup(page) {
      await sleep(1500);
      const zoomIn = page.locator(".react-flow__controls-zoomin");
      if (await zoomIn.count()) { await zoomIn.click(); await sleep(600); }
      const node = await rectOf(page, ".react-flow__node:has-text('Self-Attention')");
      const panel = await page.getByText(/Select a node to read/).first().boundingBox();
      const x = Math.round(node.x - 24);
      const w = Math.round(panel.x + 120 - x);
      const box = box16x10(x, 0, w);
      box.y = Math.max(0, Math.round(node.y + node.height / 2 - box.height / 2));
      console.log("mindmap node", node, "panel x", panel.x, "clip", box);
      return box;
    },
  },
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

const browser = await launch();
let srv;
const newPage = (scale) =>
  browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: scale, colorScheme: "light", reducedMotion: "reduce" });

try {
  if (cropMode) {
    const names = Object.keys(crops).filter(want);
    for (const n of names) crops[n].build();
    srv = await serve(mounts, { spa: true });
    for (const n of names) {
      const c = crops[n];
      const scale = c.scale || 2;
      const page = await newPage(scale);
      await page.goto(await c.page(srv.base), { waitUntil: "networkidle" });
      const clip = await c.setup(page);
      if (clip.width * scale < 1600) throw new Error(`${n}: clip of ${clip.width} CSS px at ${scale}x would be upscaled`);
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
