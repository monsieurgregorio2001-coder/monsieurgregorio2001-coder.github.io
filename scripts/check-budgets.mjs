// Hub budgets (DIRECTION 8) at 390 px: gzipped JS, CSS and fonts, and total first load. Usage: node check-budgets.mjs [--write]
// --write stores data/budgets.json, which the colophon shows beside the limits. Exits 1 when a budget is blown.
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const srv = await serve({ "/": root });
const b = await launch();
const sizes = { js: 0, css: 0, font: 0, img: 0, html: 0 };
const files = [];
const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, colorScheme: "light" });
const page = await ctx.newPage();
page.on("response", async (r) => {
  try {
    const body = await r.body();
    const gz = /font|image|avif|webp|png/.test(r.headers()["content-type"] || "") ? body.length : zlib.gzipSync(body, { level: 9 }).length;
    const ct = r.headers()["content-type"] || "";
    const k = ct.includes("javascript") ? "js" : ct.includes("css") ? "css" : ct.includes("font") ? "font" : ct.includes("html") ? "html" : "img";
    sizes[k] += gz; files.push([new URL(r.url()).pathname, k, gz]);
  } catch { /* aborted */ }
});
await page.goto(srv.base + "/", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
await b.close(); srv.close();
const total = Object.values(sizes).reduce((a, n) => a + n, 0);
const rows = [
  { id: "js", label: "JavaScript before interaction", limit: 20 * 1024, actual: sizes.js },
  { id: "css", label: "CSS", limit: 14 * 1024, actual: sizes.css },
  { id: "fonts", label: "Fonts", limit: 160 * 1024, actual: sizes.font },
  { id: "total", label: "First load at 390 px", limit: 300 * 1024, actual: total },
];
let commit = "uncommitted";
try { commit = execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: root }).toString().trim(); } catch { /* none */ }
for (const r of rows) console.log(`${r.label}: ${(r.actual / 1024).toFixed(1)} KB of ${(r.limit / 1024).toFixed(0)} KB`);
if (process.argv.includes("--write")) fs.writeFileSync(path.join(root, "data/budgets.json"), JSON.stringify({ date: new Date().toISOString().slice(0, 10), commit, rows }, null, 2) + "\n");
const over = rows.filter((r) => r.actual > r.limit);
if (over.length) { console.error("over budget: " + over.map((r) => r.label).join(", ")); process.exit(1); }
