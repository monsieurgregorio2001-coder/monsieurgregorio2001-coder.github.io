// Foyer screenshots (wave 2). Usage: node scripts/shoot-foyer.mjs <outDir> [path ...]
// Each page at 360, 390, 1024 and 1440 in light, dark, Calm (reduced motion) and JS off. First screen only, plus a full page at 390 and 1440 in light.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(process.argv[2] || path.join(root, "docs/audits/shots/wave-2"));
const pages = process.argv.slice(3).length ? process.argv.slice(3) : ["/"];
fs.mkdirSync(out, { recursive: true });
const srv = await serve({ "/": root });
const b = await launch();
const heights = { 360: 640, 390: 664, 1024: 768, 1440: 900 };
for (const url of pages) {
  const name = url === "/" ? "hub" : url.replace(/\W+/g, "-").replace(/^-|-$/g, "");
  for (const width of [360, 390, 1024, 1440]) {
    for (const mode of ["light", "dark", "calm", "nojs"]) {
      const ctx = await b.newContext({ viewport: { width, height: heights[width] }, colorScheme: mode === "dark" ? "dark" : "light", reducedMotion: mode === "calm" || mode === "nojs" ? "reduce" : "no-preference", javaScriptEnabled: mode !== "nojs" });
      const page = await ctx.newPage();
      await page.goto(srv.base + url, { waitUntil: "networkidle" });
      if (mode === "light" || mode === "dark") await page.waitForTimeout(1800);
      await page.screenshot({ path: path.join(out, `${name}-${width}-${mode}.png`) });
      if (mode === "light" && (width === 390 || width === 1440)) await page.screenshot({ path: path.join(out, `${name}-${width}-${mode}-full.png`), fullPage: true });
      await ctx.close();
    }
  }
}
await b.close();
srv.close();
console.log("shots in", out);
