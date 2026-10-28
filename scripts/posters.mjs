// Captures door and thumbnail posters from each room's real first state (DIRECTION 5.5).
// Usage: node scripts/posters.mjs --paperlab <dist> --paluwagan <dist> --slop-editorial <dist> --mindmap-mcp <repo>
//   <dist> is a room's production build (served under /<room>/). The Mindmap repo is started with its own server on a temp database.
// Output in assets/posters/: <slug>-door.{avif,webp}, <slug>-thumb.{avif,webp} (light or the room's only theme)
// and <slug>-door-dark / <slug>-thumb-dark for rooms that follow the OS scheme. PaperLab is dark in both themes, so it has one set.
// Limits: door AVIF 40 KB, thumbnail AVIF 8 KB. The script fails over the limit.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { serve, launch } from "./lib/serve.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "assets", "posters");
fs.mkdirSync(out, { recursive: true });
const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf("--" + n); return i < 0 ? null : path.resolve(args[i + 1]); };
const LIMIT = { door: 40 * 1024, thumb: 8 * 1024 };
const W = 1176, H = 600, TW = 320, TH = 204;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await launch();
const problems = [];

async function save(slug, kind, suffix, png) {
  const [w, h] = kind === "door" ? [W, H] : [TW, TH];
  const base = sharp(png).resize(w, h, { fit: "cover", position: "top" });
  // Quality steps down until the AVIF fits the limit.
  let q = 56, avif;
  do { avif = await base.clone().avif({ quality: q, effort: 6 }).toBuffer(); q -= 6; } while (avif.length > LIMIT[kind] && q > 10);
  const webp = await base.clone().webp({ quality: kind === "door" ? 62 : 58, effort: 6 }).toBuffer();
  fs.writeFileSync(path.join(out, `${slug}-${kind}${suffix}.avif`), avif);
  fs.writeFileSync(path.join(out, `${slug}-${kind}${suffix}.webp`), webp);
  console.log(`${slug}-${kind}${suffix}: avif ${avif.length} B, webp ${webp.length} B`);
  if (avif.length > LIMIT[kind]) problems.push(`${slug}-${kind}${suffix}.avif is ${avif.length} B, limit ${LIMIT[kind]}`);
}

async function shoot(slug, url, schemes, ready) {
  for (const scheme of schemes) {
    const page = await browser.newPage({ viewport: { width: 1100, height: 561 }, colorScheme: scheme, reducedMotion: "reduce" });
    await page.goto(url, { waitUntil: "networkidle" });
    if (ready) await ready(page);
    await sleep(600);
    const png = await page.screenshot();
    await page.close();
    const suffix = schemes.length > 1 && scheme === "dark" ? "-dark" : "";
    await save(slug, "door", suffix, png);
    await save(slug, "thumb", suffix, png);
  }
}

const jobs = [];
// Mindmap's room is the static demo build once it ships (--mindmap-demo <dist>); --mindmap-mcp starts the app instead.
const dists = { paperlab: opt("paperlab"), paluwagan: opt("paluwagan"), "slop-editorial": opt("slop-editorial"), "mindmap-mcp": opt("mindmap-demo") };
// Rooms link the house by absolute path, so serve it from this checkout.
const mounts = { "/house/": path.join(root, "house") };
for (const [slug, dir] of Object.entries(dists)) if (dir) mounts[`/${slug}/`] = dir;
const srv = await serve(mounts);
try {
  if (dists.paperlab) await shoot("paperlab", `${srv.base}/paperlab/`, ["dark"]);
  if (dists.paluwagan) await shoot("paluwagan", `${srv.base}/paluwagan/`, ["light", "dark"]);
  if (dists["slop-editorial"]) await shoot("slop-editorial", `${srv.base}/slop-editorial/`, ["light", "dark"]);
  if (dists["mindmap-mcp"]) await shoot("mindmap-mcp", `${srv.base}/mindmap-mcp/`, ["light", "dark"]);
  const mm = opt("mindmap-mcp");
  if (mm) {
    const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mm-poster-"));
    const port = 4399, base = `http://127.0.0.1:${port}`;
    const server = spawn("npx", ["tsx", "src/server/index.ts"], { cwd: mm, env: { ...process.env, MINDMAP_DB: path.join(tmp, "p.db"), PORT: String(port) }, stdio: "ignore" });
    try {
      for (let i = 0; i < 80; i++) { try { if ((await fetch(base + "/api/maps")).ok) break; } catch { /* not up yet */ } await sleep(250); }
      await fetch(base + "/api/seed", { method: "POST" });
      const maps = await (await fetch(base + "/api/maps")).json();
      const id = (Array.isArray(maps) ? maps : maps.maps)[0].id;
      await shoot("mindmap-mcp", base, ["light", "dark"], async (page) => { await page.evaluate((i) => { location.hash = "#/map/" + i; }, id); await sleep(1500); });
    } finally { server.kill(); fs.rmSync(tmp, { recursive: true, force: true }); }
  }
} finally { await browser.close(); srv.close(); }
if (problems.length) { console.error(problems.join("\n")); process.exit(1); }
