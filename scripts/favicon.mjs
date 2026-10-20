// Writes ../favicon.svg: "GL" in JetBrains Mono 500, converted to paths with fontkit, on an accent rounded square.
// Colours are read from the --accent / --accent-ink tokens in style.css, light and dark.
// Usage: node favicon.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as fontkit from "fontkit";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const font = fontkit.openSync(path.join(root, "assets/fonts/jetbrains-mono-latin-500-normal.woff2"));
const css = fs.readFileSync(path.join(root, "style.css"), "utf8");
const tok = (block, name) => block.match(new RegExp(`--${name}:(#[0-9A-Fa-f]{3,8})`))[1];
const [light, dark] = css.split("prefers-color-scheme:dark");

const run = font.layout("GL");
const size = 34, scale = size / font.unitsPerEm;
const width = run.positions.reduce((s, p) => s + p.xAdvance, 0) * scale;
const capH = font.capHeight * scale;
let x = (64 - width) / 2;
const base = (64 + capH) / 2;
let d = "";
run.glyphs.forEach((g, i) => {
  d += g.path.scale(scale, -scale).translate(x, base).toSVG();
  x += run.positions[i].xAdvance * scale;
});
d = d.replace(/-?\d+\.\d+/g, (n) => String(Math.round(+n * 10) / 10));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><style>rect{fill:${tok(light, "accent")}}path{fill:${tok(light, "accent-ink")}}@media (prefers-color-scheme:dark){rect{fill:${tok(dark, "accent")}}path{fill:${tok(dark, "accent-ink")}}}</style><rect width="64" height="64" rx="12"/><path d="${d}"/></svg>\n`;
fs.writeFileSync(path.join(root, "favicon.svg"), svg);
console.log("favicon.svg", svg.length, "bytes");
