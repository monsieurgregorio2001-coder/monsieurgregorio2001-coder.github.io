// Screenshots of the house demo page: 390 and 1440, light and dark, plus reduced motion, a scrolled glass crumb and the open menu.
// Usage: node scripts/shoot-house.mjs <outdir> [version]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.resolve(process.argv[2] || path.join(root, "docs/audits/shots/phase-1-house"));
const version = process.argv[3] || "2.0.1";
fs.mkdirSync(out, { recursive: true });
const srv = await serve({ "/": root });
const browser = await launch();
try {
  for (const colorScheme of ["light", "dark"]) for (const width of [390, 1440]) {
    for (const reducedMotion of ["no-preference", "reduce"]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, reducedMotion });
      await page.goto(`${srv.base}/house/${version}/demo.html`, { waitUntil: "networkidle" });
      const tag = `${colorScheme}-${width}${reducedMotion === "reduce" ? "-calm" : ""}`;
      await page.screenshot({ path: path.join(out, `demo-${tag}.png`), fullPage: true });
      if (reducedMotion === "no-preference") {
        await page.evaluate(() => window.scrollTo(0, 700));
        await page.waitForTimeout(300);
        await page.screenshot({ path: path.join(out, `demo-${tag}-scrolled.png`) });
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.click(".house-menu-btn");
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(out, `demo-${tag}-menu.png`) });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(400);
        await page.keyboard.press("Shift+Tab");
        await page.screenshot({ path: path.join(out, `demo-${tag}-focus.png`), clip: { x: 0, y: 0, width, height: 200 } });
      }
      await page.close();
    }
  }
} finally { await browser.close(); srv.close(); }
console.log("wrote screenshots to " + out);
