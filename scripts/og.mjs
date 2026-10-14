// Renders assets/og-image.svg to a 1200x630 PNG with the self-hosted fonts.
import puppeteer from "puppeteer-core";
import fs from "node:fs"; import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const f = (n) => pathToFileURL(path.join(root, "assets/fonts", n)).href;
const svg = fs.readFileSync(path.join(root, "assets/og-image.svg"), "utf8");
const html = `<style>@font-face{font-family:Fraunces;font-weight:100 900;src:url(${f("fraunces-latin-opsz-normal.woff2")})}
@font-face{font-family:Inter;font-weight:100 900;src:url(${f("inter-latin-wght-normal.woff2")})}
@font-face{font-family:"JetBrains Mono";src:url(${f("jetbrains-mono-latin-400-normal.woff2")})}
body{margin:0}</style>${svg}`;
const b = await puppeteer.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", headless: true });
const p = await b.newPage(); await p.setViewport({ width: 1200, height: 630 });
const tmp = path.join(root, "scripts", ".og.html"); fs.writeFileSync(tmp, html);
await p.goto(pathToFileURL(tmp).href, { waitUntil: "networkidle0" });
await p.evaluate(() => document.fonts.ready);
await p.screenshot({ path: path.join(root, "assets/og-image.png") });
fs.unlinkSync(tmp); await b.close();
