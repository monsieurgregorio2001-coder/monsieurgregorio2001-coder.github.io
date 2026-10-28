// Doorway bench (ADR 0017, DIRECTION 4.5 and 4.8). Runs against a deployed or local base URL.
// 20 navigations A -> B (door click via keyboard) and 20 B -> A (Back) in Chromium and Playwright WebKit.
// Per navigation: pagereveal fired with a viewTransition, types set, no console errors, scroll and focus restored, CLS.
// Also probes how GitHub Pages resolves missing project paths.
// Usage: node scripts/bench-doorway.mjs <baseUrl> [--runs 20] [--out bench.json] [--summary summary.md] [--browsers chromium,webkit]
// Exit 1 when the gate fails: Chromium 20 of 20, WebKit 19 of 20 or better, per direction. A browser that cannot launch is skipped and reported.
import fs from "node:fs";
import crypto from "node:crypto";

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : def; };
const base = (args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--")) || "http://127.0.0.1:8000/").replace(/\/?$/, "/");
const RUNS = Number(opt("runs", 20));
const outFile = opt("out", "doorway-bench.json");
const summaryFile = opt("summary", "");
const wanted = opt("browsers", "chromium,webkit").split(",");
const GATE = { chromium: RUNS, webkit: RUNS - 1 };
const PROBES = ["paperlab/does-not-exist", "nope/", "lab/doorway/zzz"];

const playwright = await import("playwright");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function launch(name) {
  const opts = { headless: true };
  if (name === "chromium" && process.env.CHROME) opts.executablePath = process.env.CHROME;
  return playwright[name].launch(opts);
}

// Wait until the page has logged its pagereveal record as finished (or give up after a bound).
async function waitForReveal(page, count) {
  await page.waitForFunction((n) => {
    try { return JSON.parse(sessionStorage.getItem("bench.log") || "[]").filter((r) => r.ev === "pagereveal").length >= n; } catch { return false; }
  }, count, { timeout: 5000 }).catch(() => {});
  await sleep(150);
}

async function readLog(page) {
  return page.evaluate(() => { try { return JSON.parse(sessionStorage.getItem("bench.log") || "[]"); } catch { return []; } });
}

async function measureCls(page) {
  return page.evaluate(() => new Promise((resolve) => {
    if (!PerformanceObserver.supportedEntryTypes?.includes("layout-shift")) return resolve(null);
    let v = 0;
    new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) v += e.value; }).observe({ type: "layout-shift", buffered: true });
    setTimeout(() => resolve(Number(v.toFixed(4))), 200);
  }));
}

async function runBrowser(name) {
  let browser;
  try { browser = await launch(name); } catch (e) { return { browser: name, skipped: true, reason: String(e.message).split("\n")[0] }; }
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  const forward = [], back = [];
  await page.goto(base + "lab/doorway/a/", { waitUntil: "load" });
  await page.evaluate(() => sessionStorage.removeItem("bench.log"));
  const SCROLL = 400;
  for (let i = 0; i < RUNS; i++) {
    // A -> B by keyboard (WebKit does not focus links on click).
    await page.evaluate((y) => { scrollTo(0, y); }, SCROLL);
    await sleep(100);
    await page.focus("#door");
    await sleep(50);
    const scrollBefore = await page.evaluate(() => Math.round(scrollY)); // after focus, which may scroll the door into view
    const before = (await readLog(page)).filter((r) => r.ev === "pagereveal").length;
    errors.length = 0;
    await page.keyboard.press("Enter");
    await page.waitForURL("**/lab/doorway/b/", { timeout: 10000 }).catch(() => {});
    await waitForReveal(page, before + 1);
    let log = await readLog(page);
    let rec = log.filter((r) => r.ev === "pagereveal").pop() || {};
    const swap = log.filter((r) => r.ev === "pageswap").pop() || {};
    const onB = await page.evaluate(() => !!document.getElementById("room-hero"));
    const clsB = await measureCls(page);
    forward.push({ i: i + 1, ok: onB && rec.hasVT && rec.types?.includes("enter-room") && rec.finished && !errors.length,
      reached: onB, pagereveal: !!rec.hasVT, types: rec.types || [], finished: !!rec.finished, swapHadVT: !!swap.hasVT, cls: clsB, errors: [...errors] });

    // B -> A by Back.
    errors.length = 0;
    const beforeA = (await readLog(page)).filter((r) => r.ev === "pagereveal").length;
    await page.goBack({ waitUntil: "load" }).catch(() => {});
    await sleep(100);
    log = await readLog(page);
    // A bfcache restore may not fire pagereveal at all; wait for it only if the page was reloaded.
    if (log.filter((r) => r.ev === "pagereveal").length <= beforeA) await waitForReveal(page, beforeA + 1);
    log = await readLog(page);
    rec = log.filter((r) => r.ev === "pagereveal").pop() || {};
    const bfcache = log.some((r) => r.ev === "pageshow-bfcache");
    const state = await page.evaluate(() => ({ onA: !!document.getElementById("door"), scroll: Math.round(scrollY), focus: document.activeElement?.id || null }));
    const clsA = await measureCls(page);
    const newRec = log.filter((r) => r.ev === "pagereveal").length > beforeA;
    back.push({ i: i + 1, ok: state.onA && newRec && rec.hasVT && rec.types?.includes("leave-room") && rec.finished && !errors.length && Math.abs(state.scroll - scrollBefore) <= 2 && state.focus === "door",
      reached: state.onA, pagereveal: newRec && !!rec.hasVT, types: newRec ? rec.types || [] : [], finished: newRec && !!rec.finished,
      scrollRestored: Math.abs(state.scroll - scrollBefore) <= 2, scroll: state.scroll, scrollBefore, focusRestored: state.focus === "door", cls: clsA, bfcacheSeen: bfcache, errors: [...errors] });
  }
  const version = browser.version();
  await browser.close();
  const pass = (rows) => rows.filter((r) => r.ok).length;
  return { browser: name, version, forward, back, passForward: pass(forward), passBack: pass(back), gate: GATE[name] };
}

// How does GitHub Pages resolve missing paths? Record status, which 404 body served and whether it is the hub's 404.html.
async function probe404() {
  const sha = (s) => crypto.createHash("sha1").update(s).digest("hex").slice(0, 10);
  const title = (s) => ((s.match(/<title>([^<]*)/i) || [])[1] || null)?.replace(/\|/g, "/") ?? null;
  const get = async (path) => {
    try {
      const r = await fetch(base + path, { redirect: "follow", signal: AbortSignal.timeout(15000) });
      const body = await r.text();
      return { path, status: r.status, finalUrl: r.url, bytes: body.length, sha1: sha(body), title: title(body), server: r.headers.get("server"), contentType: r.headers.get("content-type") };
    } catch (e) { return { path, error: e.cause?.code || e.name }; }
  };
  const hub404 = await get("404.html");
  const rows = [];
  for (const p of PROBES) { const r = await get(p); r.sameAsHub404 = !!hub404.sha1 && r.sha1 === hub404.sha1; rows.push(r); }
  return { hub404, probes: rows };
}

const result = { base, runs: RUNS, date: new Date().toISOString(), browsers: [] };
for (const name of wanted) result.browsers.push(await runBrowser(name));
result.pages404 = await probe404();

let pass = true;
const lines = ["| Browser | A to B | Back (B to A) | Gate | Scroll restored | Focus restored | Max CLS | Result |", "| --- | --- | --- | --- | --- | --- | --- | --- |"];
for (const b of result.browsers) {
  if (b.skipped) { lines.push(`| ${b.browser} | skipped | skipped | ${GATE[b.browser]} of ${RUNS} | | | | skipped: ${b.reason} |`); continue; }
  const sr = b.back.filter((r) => r.scrollRestored).length, fr = b.back.filter((r) => r.focusRestored).length;
  const cls = [...b.forward, ...b.back].map((r) => r.cls).filter((v) => v !== null);
  const ok = b.passForward >= b.gate && b.passBack >= b.gate;
  if (!ok) pass = false;
  lines.push(`| ${b.browser} ${b.version} | ${b.passForward} of ${RUNS} | ${b.passBack} of ${RUNS} | ${b.gate} of ${RUNS} | ${sr} of ${RUNS} | ${fr} of ${RUNS} | ${cls.length ? Math.max(...cls) : "n/a"} | ${ok ? "pass" : "FAIL"} |`);
}
lines.push("", "Missing path resolution:", "", "| Path | Status | Same body as /404.html | Title | Bytes |", "| --- | --- | --- | --- | --- |");
lines.push(`| 404.html (hub) | ${result.pages404.hub404.status ?? result.pages404.hub404.error} | | ${result.pages404.hub404.title ?? ""} | ${result.pages404.hub404.bytes ?? ""} |`);
for (const p of result.pages404.probes) lines.push(`| /${p.path} | ${p.status ?? p.error} | ${p.sameAsHub404 ? "yes" : "no"} | ${p.title ?? ""} | ${p.bytes ?? ""} |`);
result.pass = pass;
fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
const table = `Doorway bench against ${base} (${result.date})\n\n` + lines.join("\n") + "\n";
if (summaryFile) fs.writeFileSync(summaryFile, table);
console.log(table);
console.log(`JSON written to ${outFile}`);
process.exit(pass ? 0 : 1);
