// Serves the repo and runs axe-core on each page in light and dark at 390 and 1280. Exits 1 on any violation.
// Usage: node scripts/check-axe.mjs [path ...]   (default: / and every /work/<slug>/ in projects.json)
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const axeSource = fs.readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");
const slugs = JSON.parse(fs.readFileSync(path.join(root, "projects.json"), "utf8")).map((p) => p.slug);
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ["/", ...slugs.map((s) => `/work/${s}/`)];
const srv = await serve({ "/": root });
const browser = await launch();
let failed = 0;
try {
  for (const url of pages) for (const colorScheme of ["light", "dark"]) {
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme, reducedMotion: "reduce" });
      await page.goto(srv.base + url, { waitUntil: "networkidle" });
      // Reveal everything so axe sees the final colours, not mid-fade opacity.
      await page.evaluate(() => document.querySelectorAll(".reveal").forEach((n) => n.classList.add("in")));
      await page.addScriptTag({ content: axeSource });
      const res = await page.evaluate(() => window.axe.run(document, { resultTypes: ["violations"] }));
      const label = `${url} ${colorScheme} ${width}px`;
      if (res.violations.length) {
        failed += res.violations.length;
        for (const v of res.violations) {
          console.error(`axe ${label}: ${v.id} (${v.impact}) ${v.help}`);
          for (const n of v.nodes.slice(0, 5)) console.error("   ", n.target.join(" "), n.failureSummary?.split("\n")[1] || "");
        }
      } else {
        console.log(`axe ${label}: 0 violations (${res.passes ? res.passes.length + " rules passed" : "ok"})`);
      }
      await page.close();
    }
  }
} finally {
  await browser.close();
  srv.close();
}
process.exit(failed ? 1 : 0);
