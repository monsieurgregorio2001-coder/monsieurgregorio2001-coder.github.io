// Snapshots each room's live evidence.json into data/evidence/<room>.json (DIRECTION 4.4). Usage: node scripts/evidence-pull.mjs
// A room that does not answer keeps its committed snapshot and the script exits 1, so a refresh PR never hides a failure.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://monsieurgregorio2001-coder.github.io";
const projects = JSON.parse(fs.readFileSync(path.join(root, "projects.json"), "utf8"));
let failed = 0;
for (const p of projects) {
  const url = `${SITE}/${p.room}/evidence.json`;
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(20000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const ev = await res.json();
    if (ev.schema !== 1 || !Array.isArray(ev.tests) || !Array.isArray(ev.figures)) throw new Error("not evidence schema 1");
    fs.mkdirSync(path.join(root, "data/evidence"), { recursive: true });
    fs.writeFileSync(path.join(root, "data/evidence", `${p.evidence}.json`), JSON.stringify(ev, null, 2) + "\n");
    console.log(`${p.room}: ${ev.commit} ${ev.ran_at}`);
  } catch (e) { console.error(`${p.room}: ${url} failed (${e.message})`); failed++; }
}
process.exit(failed ? 1 : 0);
