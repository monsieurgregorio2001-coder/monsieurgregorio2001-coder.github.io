// Copy lint (DIRECTION 7 and 8). Visible text of every page and plain-text twin: banned words, em dashes, semicolons.
// Code spans and the changelog's quoted history are exempt from the semicolon rule.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const banned = [/vibe coding/i, /prompt engineer/i, /ai-powered/i, /\bsemantic\b/i, /\bsmart\b/i, /\bfair\b/i, /\balways\b/i, /seamless/i, /cutting-edge/i, /revolutionary/i, /passionate/i, /coming soon/i, /\bkuru\b/i, /leverage/i, /\bwe\b/i, /real math/i, /i build llm agents/i, /!(?=\s|$)/];
const files = ["index.html", "404.html", "colophon/index.html", "changelog/index.html", "llms.txt", "index.md", "colophon/index.md", "changelog/index.md", ...fs.readdirSync(path.join(root, "work")).flatMap((s) => [`work/${s}/index.html`, `work/${s}/index.md`])];
const ent = (s) => s.replace(/&middot;/g, "·").replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, "&");
let bad = 0;
for (const f of files) {
  const raw = fs.readFileSync(path.join(root, f), "utf8");
  let text = raw;
  if (f.endsWith(".html")) text = ent(raw.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style|svg|code)[\s\S]*?<\/\1>/g, " ").replace(/<head[\s\S]*?<\/head>/, " ").replace(/<[^>]+>/g, " "));
  else text = text.replace(/`[^`]*`/g, " ");
  const isLog = f.startsWith("changelog");
  for (const re of banned) { const m = text.match(re); if (m && !(isLog && /\balways|fair|smart|!/.test(m[0]))) { console.error(`${f}: banned "${m[0]}"`); bad++; } }
  if (text.includes("—")) { console.error(`${f}: em dash`); bad++; }
  if (!isLog && /;/.test(text.replace(/https?:\/\/\S+/g, ""))) { console.error(`${f}: semicolon near "${text.slice(Math.max(0, text.indexOf(";") - 30), text.indexOf(";") + 20).replace(/\s+/g, " ")}"`); bad++; }
}
if (bad) { console.error(`copy: ${bad} problem(s)`); process.exit(1); }
console.log(`copy: ${files.length} files clean`);
