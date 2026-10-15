// Link check for every HTML file in the repo (outside node_modules, docs and .git).
// Internal href/src/srcset values must resolve to a file in the repo: failure exits 1.
// `#id` fragments on the same page must match an element id.
// External http(s) links get a HEAD request (GET on 405); failures are warnings only.
// Usage: node scripts/check-links.mjs [--offline]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const offline = process.argv.includes("--offline");
const skipDirs = new Set(["node_modules", ".git", "docs", ".claude", ".github"]);

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) return skipDirs.has(e.name) ? [] : htmlFiles(path.join(dir, e.name));
    return e.name.endsWith(".html") ? [path.join(dir, e.name)] : [];
  });
}

const errors = [], warnings = [], external = new Map();

for (const file of htmlFiles(root)) {
  const rel = path.relative(root, file);
  // Ignore anything inside HTML comments.
  const html = fs.readFileSync(file, "utf8").replace(/<!--[\s\S]*?-->/g, "");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const refs = [];
  for (const m of html.matchAll(/\s(href|src)="([^"]*)"/g)) refs.push(m[2]);
  for (const m of html.matchAll(/\ssrcset="([^"]*)"/g)) for (const part of m[1].split(",")) refs.push(part.trim().split(/\s+/)[0]);
  for (const raw of refs) {
    const ref = raw.replace(/&amp;/g, "&");
    if (!ref || /^(mailto:|tel:|data:|javascript:)/.test(ref)) continue;
    if (/^https?:\/\//.test(ref)) {
      if (!external.has(ref)) external.set(ref, rel);
      continue;
    }
    if (ref.startsWith("#")) {
      if (ref.length > 1 && !ids.has(ref.slice(1))) errors.push(`${rel}: missing anchor ${ref}`);
      continue;
    }
    const clean = ref.split(/[?#]/)[0];
    const target = clean.startsWith("/") ? path.join(root, clean) : path.join(path.dirname(file), clean);
    const ok = fs.existsSync(target) && (!fs.statSync(target).isDirectory() || fs.existsSync(path.join(target, "index.html")));
    if (ok) continue;
    errors.push(`${rel}: ${ref} does not resolve`);
  }
}

if (!offline) {
  await Promise.all([...external].map(async ([url, rel]) => {
    try {
      let r = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(10000) });
      if (r.status === 405 || r.status === 403) r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(10000) });
      if (r.status >= 400) warnings.push(`${rel}: ${url} returned ${r.status}`);
    } catch (e) {
      warnings.push(`${rel}: ${url} failed (${e.cause?.code || e.name})`);
    }
  }));
}

for (const w of warnings) console.warn("warn ", w);
for (const e of errors) console.error("error", e);
console.log(`links: ${errors.length} errors, ${warnings.length} warnings, ${external.size} external ${offline ? "skipped" : "checked"}`);
process.exit(errors.length ? 1 : 0);
