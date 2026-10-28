#!/usr/bin/env node
// house-contract: checks one page against the room contract (DIRECTION 4.3).
//
//   node tools/house-contract.mjs <url | file.html> [--room <slug>] [--root <dir>] [--static]
//
// A file is served from --root (default: the current directory) so absolute /house/... links resolve.
// Static checks read the HTML. Unless --static is given, a rendered check also runs in Chromium through Playwright
// (CHROME overrides the binary, PLAYWRIGHT_MODULE the import specifier): the seven --room-* tokens resolve in light and dark, and the text pairs keep contrast.
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i < 0 ? null : args[i + 1]; };
const target = args.find((a, i) => !a.startsWith("--") && !["--room", "--root"].includes(args[i - 1]));
if (!target) { console.error("usage: house-contract <url|file> [--room slug] [--root dir] [--static]"); process.exit(2); }
const slug = opt("--room");
const root = path.resolve(opt("--root") || ".");
const TOKENS = ["--room-bg", "--room-fg", "--room-muted", "--room-rule", "--room", "--room-ink", "--room-wash"];
const errors = [];
const need = (ok, msg) => { if (!ok) errors.push(msg); };

let server, url = target;
if (!/^https?:\/\//.test(target)) {
  const types = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".md": "text/markdown" };
  server = http.createServer((req, res) => {
    let f = path.join(root, decodeURIComponent(req.url.split("?")[0]));
    if (!f.startsWith(root)) { res.statusCode = 403; return res.end(); }
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!fs.existsSync(f)) { res.statusCode = 404; return res.end("not found"); }
    res.setHeader("content-type", types[path.extname(f)] || "application/octet-stream");
    res.end(fs.readFileSync(f));
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const abs = path.resolve(target);
  url = `http://127.0.0.1:${server.address().port}/${path.relative(root, abs).split(path.sep).join("/")}`;
}

const html = await (await fetch(url)).text();
const body = html.replace(/<!--[\s\S]*?-->/g, "");
const head = (body.match(/<head[\s\S]*?<\/head>/i) || [""])[0];

// Static contract
need(/<html[^>]*\slang="[a-z]/i.test(body), "html has no lang");
need(/<meta[^>]*name="viewport"/i.test(head), "no viewport meta");
need(/\sid="main"/.test(body), "no #main");
need((body.match(/<h1[\s>]/gi) || []).length === 1, `expected exactly one h1, found ${(body.match(/<h1[\s>]/gi) || []).length}`);
const firstLink = body.slice(body.search(/<body/i)).match(/<a\b[^>]*>/i);
need(firstLink && /class="[^"]*house-skip/.test(firstLink[0]) && /href="#main"/.test(firstLink[0]), "the skip link (a.house-skip href=#main) is not the first link");
need(/class="[^"]*\bhouse-crumb\b/.test(body), "no house-crumb");
need(/class="[^"]*\bhouse-footer\b/.test(body), "no house-footer");
need(/<link[^>]*href="\/house\/\d+\.\d+\.\d+\/house\.css"/.test(head), "house.css is not linked by absolute /house/x.y.z/ path");
need(/<link[^>]*href="\/house\/\d+\.\d+\.\d+\/tokens\.css"/.test(head), "tokens.css is not linked by absolute /house/x.y.z/ path");
const boot = head.search(/house\.motion|\/boot\.js/);
need(boot >= 0, "boot.js is not in the head");
const firstCss = head.search(/<link[^>]*rel="stylesheet"/i);
need(boot < 0 || firstCss < 0 || boot < firstCss, "boot.js comes after the first stylesheet");
need(!/<script[^>]*\/boot\.js[^>]*\s(async|defer)\b/.test(head), "boot.js must block the head");
need(!/fonts\.(googleapis|gstatic)\.com/.test(body), "a third-party font request");
if (slug) need(new RegExp(`<title>[^<]*· Garfield Lim</title>`).test(head), "title does not end with · Garfield Lim");

// Rendered contract
if (!args.includes("--static")) {
  const pw = await import(process.env.PLAYWRIGHT_MODULE || "playwright");
  const chromium = pw.chromium || pw.default.chromium;
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME ? { executablePath: process.env.CHROME } : {}) });
  try {
    for (const colorScheme of ["light", "dark"]) {
      const page = await browser.newPage({ colorScheme });
      await page.goto(url, { waitUntil: "networkidle" });
      const r = await page.evaluate((tokens) => {
        const cs = getComputedStyle(document.documentElement);
        const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
        const rgb = (v) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = "#000"; ctx.fillStyle = v; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data]; };
        const out = {};
        for (const t of tokens) out[t] = cs.getPropertyValue(t).trim();
        const lum = (c) => { const f = c.slice(0, 3).map((x) => { x /= 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; }); return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2]; };
        const ratio = (a, b) => { const [x, y] = [lum(rgb(a)), lum(rgb(b))].sort((p, q) => q - p); return (x + 0.05) / (y + 0.05); };
        out.fg = out["--room-bg"] && out["--room-fg"] ? ratio(out["--room-bg"], out["--room-fg"]) : 0;
        out.muted = out["--room-bg"] && out["--room-muted"] ? ratio(out["--room-bg"], out["--room-muted"]) : 0;
        out.ink = out["--room-wash"] && out["--room-ink"] ? ratio(out["--room-wash"], out["--room-ink"]) : 0;
        out.h1 = document.querySelectorAll("h1").length;
        out.skipFirst = document.querySelector("a[href], button")?.classList.contains("house-skip") ?? false;
        out.overflow = document.documentElement.scrollWidth > innerWidth;
        return out;
      }, TOKENS);
      for (const t of TOKENS) need(r[t], `${colorScheme}: ${t} is empty`);
      need(r.fg >= 4.5, `${colorScheme}: --room-fg on --room-bg is ${r.fg.toFixed(2)}:1, needs 4.5`);
      need(r.muted >= 4.5, `${colorScheme}: --room-muted on --room-bg is ${r.muted.toFixed(2)}:1, needs 4.5`);
      need(r.ink >= 4.5, `${colorScheme}: --room-ink on --room-wash is ${r.ink.toFixed(2)}:1, needs 4.5`);
      need(r.h1 === 1, `${colorScheme}: rendered page has ${r.h1} h1`);
      need(r.skipFirst, `${colorScheme}: the skip link is not the first focusable element`);
      await page.close();
    }
  } finally { await browser.close(); }
}
server?.close();
if (errors.length) { console.error(`house-contract: ${target}`); for (const e of errors) console.error("  - " + e); process.exit(1); }
console.log(`house-contract: ${target} passes${args.includes("--static") ? " (static)" : ""}`);
