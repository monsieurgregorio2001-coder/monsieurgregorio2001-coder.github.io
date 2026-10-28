// House checks (DIRECTION 4.7): immutability, token lint, budgets, room contract and CLS on the demo page.
// Usage: node scripts/check-house.mjs
import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const houseRoot = path.join(root, "house");
const errors = [];
const fail = (m) => errors.push(m);
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const versions = fs.readdirSync(houseRoot).filter((n) => /^\d+\.\d+\.\d+$/.test(n)).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
if (!versions.length) fail("no released house folder");

// 1. Immutability: every file hashes to its manifest entry, no file is extra or missing, and a folder already on origin/main has no diff.
for (const v of versions) {
  const dir = path.join(houseRoot, v);
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
  const seen = new Set();
  for (const f of walk(dir)) {
    const rel = path.relative(dir, f).split(path.sep).join("/");
    if (rel === "manifest.json") continue;
    seen.add(rel);
    const entry = manifest.files[rel];
    if (!entry) { fail(`house/${v}/${rel} is not in the manifest`); continue; }
    if (crypto.createHash("sha256").update(fs.readFileSync(f)).digest("hex") !== entry.sha256) fail(`house/${v}/${rel} changed since release. Released folders never change: ship a new version.`);
  }
  for (const rel of Object.keys(manifest.files)) if (!seen.has(rel)) fail(`house/${v}/${rel} is in the manifest but missing`);
  if (manifest.version !== v) fail(`house/${v}/manifest.json says version ${manifest.version}`);
  try {
    const onMain = execFileSync("git", ["ls-tree", "-r", "--name-only", "origin/main", `house/${v}/`], { cwd: root, stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
    if (onMain) {
      const diff = execFileSync("git", ["diff", "--name-status", "origin/main", "--", `house/${v}`], { cwd: root }).toString().trim();
      if (diff) fail(`house/${v} is released on origin/main and differs from it:\n${diff}`);
    }
  } catch { /* no origin/main in this checkout: the manifest comparison above still holds */ }
}

// 2. Token lint over the house source and the latest release.
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/url\([^)]*\)/g, "url()");
const lintTargets = [path.join(houseRoot, "src"), ...(versions.length ? [path.join(houseRoot, versions.at(-1))] : [])];
for (const base of lintTargets) {
  for (const f of walk(base)) {
    const rel = path.relative(root, f);
    if (!/\.(css|js|mjs|html)$/.test(f) || path.basename(f) === "tokens.css" || rel.includes("/tools/")) continue;
    const text = fs.readFileSync(f, "utf8");
    const code = f.endsWith(".css") ? strip(text) : text.replace(/<!--[\s\S]*?-->/g, "").replace(/\/\*[\s\S]*?\*\//g, "");
    if (/cubic-bezier\(|[^-\w]linear\(/.test(code)) fail(`${rel}: cubic-bezier( or linear( outside tokens.css`);
    const colourScope = f.endsWith(".css") ? code : (code.match(/<style[\s\S]*?<\/style>/g) || []).join("\n");
    if (/#[0-9a-fA-F]{3,8}\b/.test(colourScope)) fail(`${rel}: hex colour in a component rule (add a token to tokens.css)`);
    if (f.endsWith("house.css") && /\b(rgb|rgba|hsl|oklch|oklab)\(/.test(code)) fail(`${rel}: colour function in a component rule (add a token to tokens.css)`);
  }
}

// 3. Budgets.
const gz = (f) => zlib.gzipSync(fs.readFileSync(f), { level: 9 }).length;
const latest = versions.at(-1);
if (latest) {
  const d = path.join(houseRoot, latest);
  const boot = fs.statSync(path.join(d, "boot.js")).size, door = gz(path.join(d, "doorway.js"));
  console.log(`house ${latest}: boot.js ${boot} B (400), doorway.js ${door} B gz (3072), house.css ${gz(path.join(d, "house.css"))} B gz, house.js ${gz(path.join(d, "house.js"))} B gz`);
  if (boot > 400) fail(`boot.js is ${boot} bytes, budget 400`);
  if (door > 3072) fail(`doorway.js is ${door} bytes gzipped, budget 3072`);
}

// 4. Contract on every release's demo, then CLS and the room crumb on the latest (both themes, 360, 390 and 1440).
for (const v of versions) {
  const d = `house/${v}/demo.html`;
  try {
    execFileSync("node", [path.join(houseRoot, v, "tools", "house-contract.mjs"), d, "--root", root], { cwd: root, stdio: "pipe", env: { ...process.env, PLAYWRIGHT_MODULE: pathToFileURL(createRequire(import.meta.url).resolve("playwright")).href } });
    console.log(`house contract: ${d} passes`);
  } catch (e) { fail(`house contract on ${d}:\n${e.stderr?.toString() || e.message}`); }
}
if (latest) {
  const demo = `house/${latest}/demo.html`;
  const srv = await serve({ "/": root });
  const browser = await launch();
  try {
    for (const colorScheme of ["light", "dark"]) for (const width of [360, 390, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, colorScheme });
      await page.addInitScript(() => { window.__cls = 0; new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true }); });
      await page.goto(`${srv.base}/${demo}`, { waitUntil: "networkidle" });
      await page.mouse.wheel(0, 600);
      await page.waitForTimeout(400);
      const cls = await page.evaluate(() => window.__cls);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      console.log(`demo ${colorScheme} ${width}px: CLS ${cls}, horizontal overflow ${overflow}px`);
      if (cls !== 0) fail(`${demo} ${colorScheme} ${width}px: CLS ${cls}`);
      if (overflow > 0) fail(`${demo} ${colorScheme} ${width}px: horizontal overflow ${overflow}px`);
      // The room crumb (2.0.1): every room name fits on one 52 px row with no ellipsis and no horizontal overflow, 44 px targets.
      if (!/^2\.0\.0$/.test(latest)) for (const w of [360, 390, 1024, 1440]) {
        await page.setViewportSize({ width: w, height: 900 });
        for (const r of JSON.parse(fs.readFileSync(path.join(houseRoot, latest, "house.json"), "utf8")).rooms) {
          const m = await page.evaluate((title) => {
            const c = document.querySelector("[data-house-crumb]"), old = c.querySelector(".house-crumb-sep, .house-crumb-room");
            c.querySelectorAll(".house-crumb-sep, .house-crumb-room").forEach((e) => e.remove());
            c.querySelector(".house-wordmark").insertAdjacentHTML("afterend", `<span class="house-crumb-sep" aria-hidden="true">/</span><a class="house-crumb-room" href="/x/">${title}</a>`);
            const room = c.querySelector(".house-crumb-room"), btn = c.querySelector(".house-menu-btn").getBoundingClientRect();
            const targets = [...c.querySelectorAll(".house-crumb-inner > a, .house-crumb-inner > button")].filter((e) => e.offsetParent);
            return { cut: room.scrollWidth > room.clientWidth, h: c.getBoundingClientRect().height, over: document.documentElement.scrollWidth - innerWidth, edge: btn.right <= innerWidth, small: targets.filter((e) => e.getBoundingClientRect().height < 44).length };
          }, r.title);
          if (m.cut || m.h !== 52 || m.over > 0 || !m.edge || m.small) fail(`${demo} ${colorScheme} ${w}px room crumb "${r.title}": ${JSON.stringify(m)}`);
        }
      }
      await page.close();
    }
  } finally { await browser.close(); srv.close(); }
}

if (errors.length) { for (const e of errors) console.error("house: " + e); process.exit(1); }
console.log("house checks: ok");
