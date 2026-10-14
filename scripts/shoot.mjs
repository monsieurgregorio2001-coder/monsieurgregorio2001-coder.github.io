// Usage: node shoot.mjs <outDir>   Screenshots the hub at 1280 and 375, light and dark.
import puppeteer from "puppeteer-core";
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
import { fileURLToPath } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = process.argv[2]; fs.mkdirSync(out, { recursive: true });
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".json": "application/json" };
const srv = http.createServer((q, r) => { let f = path.join(root, q.url.split("?")[0]); if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html"); if (!fs.existsSync(f)) { r.statusCode = 404; return r.end(); } r.setHeader("content-type", types[path.extname(f)] || "application/octet-stream"); r.end(fs.readFileSync(f)); }).listen(0);
const url = `http://localhost:${srv.address().port}/`;
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
for (const [w, h] of [[1280, 800], [375, 812]]) for (const scheme of ["light", "dark"]) {
  const p = await b.newPage(); await p.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  await p.emulateMediaFeatures([{ name: "prefers-color-scheme", value: scheme }, { name: "prefers-reduced-motion", value: "reduce" }]);
  await p.goto(url, { waitUntil: "networkidle0" });
  await p.evaluate(() => document.querySelectorAll("img").forEach(i => i.loading = "eager"));
  await new Promise(r => setTimeout(r, 800));
  const sw = await p.evaluate(() => document.documentElement.scrollWidth);
  console.log(w, scheme, "scrollWidth", sw);
  await p.screenshot({ path: path.join(out, `hub-${w}-${scheme}.png`), fullPage: true });
  await p.close();
}
await b.close(); srv.close();
