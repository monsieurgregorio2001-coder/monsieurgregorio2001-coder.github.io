// npm run house:release <version>
// Writes the immutable folder /house/<version>/ from house/src/ (DIRECTION 4.2). Refuses to touch a folder that exists.
// Output: tokens.css house.css boot.js doorway.js house.js house.json demo.html fonts/ partials/ tools/ manifest.json.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "house", "src");
const version = process.argv[2];
if (!/^\d+\.\d+\.\d+$/.test(version || "")) { console.error("usage: npm run house:release <major.minor.patch>"); process.exit(2); }
const out = path.join(root, "house", version);
if (fs.existsSync(out)) { console.error(`house/${version} already exists. Released folders never change. Ship the fix as the next version.`); process.exit(1); }

const read = (p) => fs.readFileSync(path.join(src, p), "utf8");
const houseJson = JSON.parse(read("house.json"));
const tokens = read("tokens.css");
const errors = [];

// The release must agree with itself: hues in house.json match tokens.css, every room is in the menu.
for (const r of houseJson.rooms) {
  for (const mode of ["light", "dark"]) for (const hex of Object.values(r.hues[mode])) if (!tokens.includes(hex)) errors.push(`${r.slug} ${mode} ${hex} is not in tokens.css`);
  if (!read("partials/menu.html").includes(`href="${r.path}"`)) errors.push(`${r.slug}: ${r.path} is not in partials/menu.html`);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }

const bake = (s) => s.replaceAll("{{version}}", version);
const write = (rel, data) => { const p = path.join(out, rel); fs.mkdirSync(path.dirname(p), { recursive: true }); fs.writeFileSync(p, data); };

for (const f of ["tokens.css", "house.css", "boot.js", "house.js"]) write(f, read(f));
write("doorway.js", read("doorway.js").replace("/*house:rooms*/[]", JSON.stringify(houseJson.rooms.map((r) => [r.slug, r.path]))));
write("house.json", JSON.stringify({ ...houseJson, version }, null, 2) + "\n");
// The demo uses the partials themselves, so it cannot drift from them.
const menuOf = (room, links) => {
  const m = bake(read("partials/menu.html")).trim();
  if (!room || !links) return m.replace(/[ \t]*<!-- house:if-links -->[\s\S]*?<!-- \/house:if-links -->\n?/, "");
  return m.replace(/<!-- house:if-links -->|<!-- \/house:if-links -->/g, "").replaceAll("{{room.title}}", room.title)
    .replace("{{room.links}}", links.map(([label, href]) => `\n    <li><a href="${href}">${label}</a></li>`).join("") + "\n  ");
};
const menuHtml = menuOf();
const sampleLinks = [["Works", "/slop-editorial/works/"], ["Certificate", "/slop-editorial/authenticity/"], ["Releases", "/slop-editorial/releases/"], ["Method", "/slop-editorial/about/"]];
const crumbOf = ({ menu, room, glass, links }) => {
  let c = bake(read("partials/crumb.html"));
  c = menu ? c.replace("{{menu}}", menu === true ? menuHtml : menuOf(room, links)) : c.replace("{{menu}}", "").replace(/ popovertarget="[^"]*"| aria-controls="[^"]*"/g, "");
  c = room ? c.replace(/<!-- \/?house:if-room -->/g, "").replaceAll("{{room.path}}", room.path).replaceAll("{{room.title}}", room.title) : c.replace(/<!-- house:if-room -->[\s\S]*?<!-- \/house:if-room -->/, "");
  if (!menu) c = c.replace(/<nav class="house-crumb-links" aria-label="Sections">([\s\S]*?)<\/nav>/, '<div class="house-crumb-links">$1</div>');
  c = c.replace(/[ \t]+$/gm, "");
  return (glass ? c.replace('data-house-crumb', 'data-house-crumb data-glass') : c).trim();
};
const staticOf = (m) => m.replace(" popover>", ">").replace(' id="house-menu"', "").replace(/ id="house-menu-[a-z]+"/g, "").replace(/ aria-labelledby="[^"]*"/g, "").replace(/ data-house-calm/g, "").replace(/ data-house-plain/g, "");
const staticMenu = staticOf(menuHtml);
const fill = (html, name, body) => html.replace(new RegExp(`<!-- house:${name} --><!-- /house:${name} -->`), () => `<!-- house:${name} -->\n${body}\n<!-- /house:${name} -->`);
let demo = bake(read("demo.html"));
demo = fill(demo, "boot", "").replace("<!-- house:boot -->\n\n<!-- /house:boot -->", `<script>${read("boot.js").trim()}</script>`);
demo = fill(demo, "crumb", crumbOf({ menu: true }));
demo = fill(demo, "crumb-frame", crumbOf({}));
demo = fill(demo, "crumb-frame-glass", crumbOf({ glass: true }));
demo = fill(demo, "crumb-frame-room", crumbOf({ room: houseJson.rooms[0] }));
demo = fill(demo, "crumb-rooms", houseJson.rooms.map((r) => `<div>\n<div class="frame no-links" inert>${crumbOf({ room: r })}</div>\n<p class="cap">/ ${r.title}</p>\n</div>`).join("\n"));
demo = fill(demo, "menu-frame", staticMenu);
demo = fill(demo, "menu-frame-room", staticOf(menuOf(houseJson.rooms[2], sampleLinks)));
demo = fill(demo, "footer", bake(read("partials/footer.html")).trim());
write("demo.html", demo);
for (const f of fs.readdirSync(path.join(src, "partials"))) write(`partials/${f}`, bake(read(`partials/${f}`)));
for (const f of fs.readdirSync(path.join(src, "tools"))) write(`tools/${f}`, read(`tools/${f}`));
for (const f of fs.readdirSync(path.join(root, "assets", "fonts"))) fs.mkdirSync(path.join(out, "fonts"), { recursive: true }), fs.copyFileSync(path.join(root, "assets", "fonts", f), path.join(out, "fonts", f));

const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = {};
for (const f of walk(out).sort()) {
  const rel = path.relative(out, f).split(path.sep).join("/");
  const buf = fs.readFileSync(f);
  files[rel] = { sha256: crypto.createHash("sha256").update(buf).digest("hex"), bytes: buf.length };
}
const manifest = {
  schema: 1,
  version,
  files,
  contract: {
    tokens: ["--room-bg", "--room-fg", "--room-muted", "--room-rule", "--room", "--room-ink", "--room-wash"],
    elements: ["#main", "a.house-skip[href=#main] as the first link", "one h1", ".house-crumb", ".house-footer"],
    head: ["boot.js inline or blocking before the first stylesheet", "/house/" + version + "/tokens.css", "/house/" + version + "/house.css"],
    title: "{Room} · Garfield Lim",
    markers: ["house:boot", "house:crumb", "house:footer"],
    hub_markup: ["a[data-room=<slug>] with [data-door-poster]", "#room-hero in each room"],
  },
};
write("manifest.json", JSON.stringify(manifest, null, 2) + "\n");

const gz = (rel) => zlib.gzipSync(fs.readFileSync(path.join(out, rel)), { level: 9 }).length;
console.log(`house/${version}: ${Object.keys(files).length + 1} files`);
console.log(`  boot.js     ${files["boot.js"].bytes} bytes (budget 400)`);
console.log(`  doorway.js  ${gz("doorway.js")} bytes gz (budget 3072)`);
console.log(`  house.js    ${gz("house.js")} bytes gz`);
console.log(`  house.css   ${gz("house.css")} bytes gz   tokens.css ${gz("tokens.css")} bytes gz`);
