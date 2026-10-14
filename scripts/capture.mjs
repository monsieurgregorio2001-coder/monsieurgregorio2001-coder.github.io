// Rerunnable screenshot pipeline for the hub case cards.
// Usage: cd scripts && npm install && node capture.mjs [paperlab|paluwagan|mindmap ...]
// Builds PaperLab and Paluwagan into a temp directory (their source trees are never modified),
// serves them under their real base paths, captures 1440x900 at deviceScaleFactor 1,
// and writes 1200x750 WebP and PNG files into ../assets/shots/.
import puppeteer from "puppeteer-core";
import sharp from "sharp";
import http from "node:http";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const portfolio = process.env.PORTFOLIO_DIR || path.resolve(root, "..");
const outDir = path.join(root, "assets", "shots");
const CHROME = process.env.CHROME || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const only = new Set(process.argv.slice(2));
const want = (n) => only.size === 0 || only.has(n);

fs.mkdirSync(outDir, { recursive: true });
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hub-shots-"));
const mounts = {};

function build(name) {
  const dir = path.join(portfolio, name);
  const out = path.join(tmp, name);
  console.log("building", name);
  execFileSync("npx", ["vite", "build", "--outDir", out, "--emptyOutDir", "--logLevel", "error"], { cwd: dir, stdio: "inherit" });
  mounts[`/${name}/`] = out;
}

const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json", ".ico": "image/x-icon" };
const server = http.createServer((req, res) => {
  const u = decodeURIComponent(req.url.split("?")[0]);
  for (const [m, d] of Object.entries(mounts)) {
    if (u.startsWith(m)) {
      let f = path.join(d, u.slice(m.length) || "index.html");
      if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) f = path.join(d, "index.html");
      res.setHeader("content-type", types[path.extname(f)] || "application/octet-stream");
      return res.end(fs.readFileSync(f));
    }
  }
  res.statusCode = 404;
  res.end();
});
await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

async function save(name, input) {
  const img = sharp(input).resize(1200, 750, { fit: "cover", position: "top" });
  await img.clone().webp({ quality: 82 }).toFile(path.join(outDir, `${name}.webp`));
  await img.clone().png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(path.join(outDir, `${name}.png`));
  console.log("wrote", name);
}

const clickText = (page, sel, re) =>
  page.evaluate((sel, src) => {
    const rx = new RegExp(src, "i");
    const el = [...document.querySelectorAll(sel)].reverse().find((e) => rx.test(e.textContent));
    if (!el) throw new Error("no element for " + src);
    el.click();
  }, sel, re.source);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
async function newPage() {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-color-scheme", value: "light" }, { name: "prefers-reduced-motion", value: "reduce" }]);
  return page;
}

try {
  if (want("paperlab")) {
    build("paperlab");
    const page = await newPage();
    await page.goto(`${base}/paperlab/`, { waitUntil: "networkidle0" });
    await clickText(page, "button,[role=tab],[role=button],a,li,label", /attention\s*$/);
    await new Promise((r) => setTimeout(r, 600));
    // Bring the heatmap into the viewport when one is present.
    await page.evaluate(() => {
      const h = document.querySelector("[class*=heat],[aria-label*=eatmap],table,canvas,svg[role=img]");
      if (h) { h.scrollIntoView({ block: "start" }); window.scrollBy(0, -300); }
    });
    await new Promise((r) => setTimeout(r, 400));
    await save("paperlab", await page.screenshot());
    await page.close();
  }
  if (want("paluwagan")) {
    build("paluwagan");
    const page = await newPage();
    await page.goto(`${base}/paluwagan/`, { waitUntil: "networkidle0" });
    await clickText(page, "button,a", /open group/);
    await new Promise((r) => setTimeout(r, 800));
    await save("paluwagan", await page.screenshot());
    await page.close();
  }
  if (want("mindmap")) {
    await save("mindmap", fs.readFileSync(path.join(portfolio, "mindmap-mcp", "docs", "screenshot.png")));
  }
} finally {
  await browser.close();
  server.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}
