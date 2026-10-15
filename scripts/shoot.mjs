// Review screenshots of the hub. Usage: node shoot.mjs <outDir>
// Writes hub-<width>-<scheme>.png (viewport-sized, top of page) at 390, 820 and 1280 in light and dark,
// plus hub-1280-light-full.png (full page). Reduced motion is emulated so reveals are settled.
// Also prints first-load transfer weight from Playwright resource timing at each width.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(process.argv[2] || path.join(root, "docs/audits/shots/latest"));
fs.mkdirSync(out, { recursive: true });
const MAX = 400 * 1024;
const srv = await serve({ "/": root });
const b = await launch();

// Keep review PNGs under 400 KB: palette-quantise when the raw capture is larger.
async function write(file, buf) {
  if (buf.length > MAX) {
    for (const colours of [256, 128, 64]) {
      buf = await sharp(buf).png({ palette: true, colours, compressionLevel: 9, effort: 10 }).toBuffer();
      if (buf.length <= MAX) break;
    }
  }
  fs.writeFileSync(file, buf);
  console.log(path.basename(file), Math.round(buf.length / 1024) + " KB");
}

// Sums every resource fetched on first load (no scrolling), with the document itself.
async function weight(page) {
  return page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const res = performance.getEntriesByType("resource");
    const size = (e) => e.transferSize || e.encodedBodySize || 0;
    return { bytes: size(nav) + res.reduce((s, e) => s + size(e), 0), requests: res.length + 1, files: res.map((e) => [new URL(e.name).pathname, size(e)]) };
  });
}

for (const [w, h] of [[390, 844], [820, 1180], [1280, 800]]) {
  for (const colorScheme of ["light", "dark"]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, colorScheme, reducedMotion: "reduce" });
    await p.goto(srv.base + "/", { waitUntil: "networkidle" });
    await p.evaluate(() => document.fonts.ready);
    if (colorScheme === "light") {
      const wt = await weight(p);
      console.log(`${w}px first load: ${(wt.bytes / 1024).toFixed(1)} KB in ${wt.requests} requests`);
      for (const [f, s] of wt.files) console.log(`   ${f} ${(s / 1024).toFixed(1)} KB`);
    }
    const sw = await p.evaluate(() => document.documentElement.scrollWidth);
    if (sw > w) console.warn(`${w} ${colorScheme}: horizontal overflow, scrollWidth ${sw}`);
    await write(path.join(out, `hub-${w}-${colorScheme}.png`), await p.screenshot());
    if (w === 1280 && colorScheme === "light") {
      await p.evaluate(() => document.querySelectorAll("img").forEach((i) => (i.loading = "eager")));
      for (let y = 0; y < (await p.evaluate(() => document.body.scrollHeight)); y += 600) {
        await p.evaluate((y) => window.scrollTo(0, y), y);
        await p.waitForTimeout(100);
      }
      await p.evaluate(() => window.scrollTo(0, 0));
      await p.waitForLoadState("networkidle");
      await p.waitForTimeout(500);
      await write(path.join(out, `hub-1280-light-full.png`), await p.screenshot({ fullPage: true }));
    }
    await p.close();
  }
}
await b.close();
srv.close();
