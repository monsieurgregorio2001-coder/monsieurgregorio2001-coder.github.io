// Vite plugin: /house/ is external at build and served from HOUSE_DIR in dev, never from the live origin.
//   import house from "../house-tools/vite-plugin.mjs";  plugins: [house()]
import fs from "node:fs";
import path from "node:path";

const types = { ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".woff2": "font/woff2", ".html": "text/html; charset=utf-8", ".md": "text/markdown", ".txt": "text/plain" };

export default function house({ houseDir = process.env.HOUSE_DIR } = {}) {
  return {
    name: "house",
    enforce: "pre",
    resolveId(id) { if (id.startsWith("/house/")) return { id, external: true }; },
    config() { return { build: { rollupOptions: { external: [/^\/house\//] } } }; },
    configureServer(server) {
      if (!houseDir) { console.warn("house: set HOUSE_DIR to serve /house/ in dev"); return; }
      const base = path.resolve(houseDir);
      server.middlewares.use((req, res, next) => {
        const url = (req.url || "").split("?")[0];
        if (!url.startsWith("/house/")) return next();
        const f = path.join(base, decodeURIComponent(url));
        if (!f.startsWith(base) || !fs.existsSync(f) || !fs.statSync(f).isFile()) return next();
        res.setHeader("content-type", types[path.extname(f)] || "application/octet-stream");
        res.end(fs.readFileSync(f));
      });
    },
  };
}
