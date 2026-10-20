// Tiny static file server for the tooling scripts. mounts: { "/prefix/": "/abs/dir" }.
// Falls back to the mount's index.html for SPA routes when spa is true.
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

export const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".avif": "image/avif",
  ".woff2": "font/woff2", ".json": "application/json", ".ico": "image/x-icon", ".txt": "text/plain", ".xml": "application/xml",
};

export async function serve(mounts, { spa = false } = {}) {
  const entries = Object.entries(mounts).sort((a, b) => b[0].length - a[0].length);
  const server = http.createServer((req, res) => {
    const u = decodeURIComponent(req.url.split("?")[0]);
    for (const [m, d] of entries) {
      if (!u.startsWith(m)) continue;
      let f = path.join(d, u.slice(m.length));
      if (!f.startsWith(d)) break;
      if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
      if (!fs.existsSync(f) && spa) f = path.join(d, "index.html");
      if (!fs.existsSync(f)) break;
      res.setHeader("content-type", types[path.extname(f)] || "application/octet-stream");
      return res.end(fs.readFileSync(f));
    }
    res.statusCode = 404;
    res.end("not found");
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  return { base: `http://127.0.0.1:${server.address().port}`, close: () => server.close() };
}

// Launches Chromium through Playwright. CHROME overrides the binary (e.g. a local Chrome);
// else the macOS Chrome when present, otherwise Playwright's own Chromium is used (PLAYWRIGHT_BROWSERS_PATH is honoured).
export async function launch() {
  const { chromium } = await import("playwright");
  const opts = { headless: true };
  const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  if (process.env.CHROME) opts.executablePath = process.env.CHROME;
  else if (fs.existsSync(mac)) opts.executablePath = mac;
  return chromium.launch(opts);
}
