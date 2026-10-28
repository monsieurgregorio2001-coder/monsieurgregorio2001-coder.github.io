#!/usr/bin/env node
// house-sync: injects the house partials and boot.js into a room's HTML at build time (DIRECTION 4.2).
//
//   HOUSE_DIR=../monsieurgregorio2001-coder.github.io node tools/house-sync.mjs [--check] [--room <slug>] <file.html ...>
//   HOUSE_DIR=... node tools/house-sync.mjs --lock 2.0.0          write house.lock.json from the hub's released folder
//   HOUSE_DIR=... node tools/house-sync.mjs --404 dist/404.html --room paperlab
//
// HOUSE_DIR is a checkout of the public hub repo (a sibling folder locally, a checkout at tag house-<version> in CI).
// house.lock.json in the working directory pins { version, manifest } (manifest is the sha256 of manifest.json).
// Every file in the pinned folder is hashed against the manifest before anything is injected.
// Markers in a page: <!-- house:boot -->, <!-- house:crumb -->, <!-- house:footer -->, each closed by <!-- /house:name -->.
// --check writes nothing and exits 1 when a page differs from what sync would write (drift fails CI).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const sha = (buf) => crypto.createHash("sha256").update(buf).digest("hex");
const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i < 0 ? null : args[i + 1]; };
const fail = (m) => { console.error(`house-sync: ${m}`); process.exit(1); };

const houseDir = process.env.HOUSE_DIR;
if (!houseDir) fail("set HOUSE_DIR to a checkout of the hub repo");

function load(version) {
  const dir = path.resolve(houseDir, "house", version);
  const mf = path.join(dir, "manifest.json");
  if (!fs.existsSync(mf)) fail(`${mf} not found`);
  const manifestBuf = fs.readFileSync(mf);
  const manifest = JSON.parse(manifestBuf);
  return { dir, manifest, manifestHash: sha(manifestBuf) };
}

if (flag("--lock")) {
  const version = opt("--lock");
  const { manifestHash } = load(version);
  fs.writeFileSync("house.lock.json", JSON.stringify({ version, manifest: manifestHash }, null, 2) + "\n");
  console.log(`house.lock.json: ${version} ${manifestHash.slice(0, 12)}`);
  process.exit(0);
}

if (!fs.existsSync("house.lock.json")) fail("house.lock.json not found. Run with --lock <version> first.");
const lock = JSON.parse(fs.readFileSync("house.lock.json", "utf8"));
const { dir, manifest, manifestHash } = load(lock.version);
if (manifestHash !== lock.manifest) fail(`manifest hash ${manifestHash.slice(0, 12)} does not match house.lock.json ${String(lock.manifest).slice(0, 12)}`);
for (const [rel, info] of Object.entries(manifest.files)) {
  const p = path.join(dir, rel);
  if (!fs.existsSync(p)) fail(`missing ${rel} in ${dir}`);
  if (sha(fs.readFileSync(p)) !== info.sha256) fail(`${rel} does not match its manifest hash`);
}

const read = (rel) => fs.readFileSync(path.join(dir, rel), "utf8");
const houseJson = JSON.parse(read("house.json"));
const roomOf = (html, slug) => {
  const s = slug || (html.match(/<html[^>]*\sdata-room="([^"]+)"/) || [])[1];
  return houseJson.rooms.find((r) => r.slug === s) || null;
};

function parts(html, slug) {
  const room = roomOf(html, slug);
  let crumb = read("partials/crumb.html").replace("{{menu}}", read("partials/menu.html").trim());
  crumb = room
    ? crumb.replace(/<!-- house:if-room -->|<!-- \/house:if-room -->/g, "").replaceAll("{{room.path}}", room.path).replaceAll("{{room.title}}", room.title)
    : crumb.replace(/<!-- house:if-room -->[\s\S]*?<!-- \/house:if-room -->/, "");
  return { boot: `<script>${read("boot.js").trim()}</script>`, crumb: crumb.trim(), footer: read("partials/footer.html").trim() };
}

function inject(html, slug) {
  const p = parts(html, slug);
  let out = html;
  for (const name of ["boot", "crumb", "footer"]) {
    const re = new RegExp(`(<!-- house:${name} -->)[\\s\\S]*?(<!-- /house:${name} -->)`);
    if (!re.test(out)) fail(`marker <!-- house:${name} --> ... <!-- /house:${name} --> not found`);
    out = out.replace(re, (_, a, b) => `${a}${name === "boot" ? "" : "\n"}${p[name]}${name === "boot" ? "" : "\n"}${b}`);
  }
  return out;
}

const slug = opt("--room");
if (flag("--404")) {
  const out = opt("--404");
  const room = houseJson.rooms.find((r) => r.slug === slug);
  let html = read("partials/404.html").replaceAll("{{room.slug}}", slug && room ? slug : "");
  fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true });
  fs.writeFileSync(out, inject(html, slug));
  console.log(`house-sync: wrote ${out}`);
  process.exit(0);
}

const files = args.filter((a, i) => !a.startsWith("--") && args[i - 1] !== "--room");
if (!files.length) fail("no HTML files given");
let drift = 0;
for (const f of files) {
  const before = fs.readFileSync(f, "utf8");
  const after = inject(before, slug);
  if (before === after) { console.log(`house-sync: ${f} in sync with ${lock.version}`); continue; }
  if (flag("--check")) { drift++; console.error(`house-sync: ${f} drifts from house ${lock.version}`); continue; }
  fs.writeFileSync(f, after);
  console.log(`house-sync: ${f} updated to ${lock.version}`);
}
process.exit(drift ? 1 : 0);
