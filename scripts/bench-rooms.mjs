// Live gate (DIRECTION 4.5, 4.8, 8). Runs against the deployed host.
// Modes: pairs (per-pair doorway gate), smoke (every page, evidence.json, house 404), calm (reduced motion), phones (device profiles at 4x CPU).
// Usage: node scripts/bench-rooms.mjs <baseUrl> --mode pairs --browser chromium [--runs 20] [--out file.json]
// Prints ::notice per table row and ::error per failure (GitHub caps each at 10 per step, so run one mode per step). Exit 1 on any error.
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : d; };
const base = (args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--")) || "http://127.0.0.1:8000/").replace(/\/?$/, "/");
const MODE = opt("mode", "pairs"), BROWSER = opt("browser", "chromium");
const RUNS = Number(opt("runs", BROWSER === "firefox" ? 5 : 20));
const outFile = opt("out", `rooms-${MODE}-${BROWSER}.json`);
const ROOMS = [
  { slug: "paperlab", path: "paperlab/", name: "PaperLab", budget: { lcp: 2200, inp: 150, cls: 0.05 } },
  { slug: "paluwagan", path: "paluwagan/", name: "Paluwagan", budget: { lcp: 2000, inp: 150, cls: 0.05 } },
  { slug: "mindmap-mcp", path: "mindmap-mcp/", name: "Living Mindmap", budget: { lcp: 2000, inp: 200, cls: 0.05 } },
  { slug: "slop-editorial", path: "slop-editorial/", name: "Slop", budget: { lcp: 2000, inp: 150, cls: 0.02 } },
];
const HUB = { slug: "hub", path: "", name: "Hub", budget: { lcp: 1800, inp: 150, cls: 0.02 } };
const here = path.dirname(new URL(import.meta.url).pathname);

const playwright = await import("playwright");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const esc = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
let failures = 0;
const rows = [];
const notice = (title, msg) => { rows.push(`${title}: ${msg}`); console.log(`::notice title=${esc(title)}::${esc(msg)}`); };
const warn = (title, msg) => { rows.push(`WARN ${title}: ${msg}`); console.log(`::warning title=${esc(title)}::${esc(msg)}`); };
const fail = (title, msg) => { failures++; rows.push(`FAIL ${title}: ${msg}`); console.log(`::error title=${esc(title)}::${esc(msg)}`); };
const median = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor(s.length / 2)] : null; };

// Runs in every document before its own scripts: logs view-transition records and layout shift, LCP and event timing.
const INIT = `(() => {
  const LOG = "rooms.log";
  const log = (o) => { try { const l = JSON.parse(sessionStorage.getItem(LOG) || "[]"); l.push(o); sessionStorage.setItem(LOG, JSON.stringify(l)); } catch (e) {} };
  const m = window.__m = { cls: 0, lcp: 0, inp: 0, shifts: [] };
  const obs = (type, fn, extra) => { try { new PerformanceObserver((l) => l.getEntries().forEach(fn)).observe(Object.assign({ type, buffered: true }, extra)); } catch (e) {} };
  obs("layout-shift", (e) => {
    if (e.hadRecentInput) return;
    m.cls += e.value;
    const r = (x) => x ? [Math.round(x.x), Math.round(x.y), Math.round(x.width), Math.round(x.height)].join(",") : "-";
    const sel = (n) => { if (!n || !n.nodeType) return "?"; if (n.nodeType !== 1) n = n.parentElement; if (!n) return "?"; let t = n.tagName.toLowerCase(); if (n.id) t += "#" + n.id; else if (typeof n.className === "string" && n.className.trim()) t += "." + n.className.trim().split(/\\s+/).slice(0, 2).join("."); return t; };
    (e.sources || []).forEach((x) => m.shifts.push({ v: Number(e.value.toFixed(4)), t: Math.round(e.startTime), n: sel(x.node), from: r(x.previousRect), to: r(x.currentRect) }));
    if (!(e.sources || []).length) m.shifts.push({ v: Number(e.value.toFixed(4)), t: Math.round(e.startTime), n: "none", from: "-", to: "-" });
  });
  obs("largest-contentful-paint", (e) => { m.lcp = e.startTime; });
  obs("event", (e) => { if (e.interactionId) m.inp = Math.max(m.inp, e.duration); }, { durationThreshold: 16 });
  addEventListener("pagereveal", (e) => {
    const vt = e.viewTransition, act = window.navigation && navigation.activation;
    const rec = { ev: "pagereveal", path: location.pathname, hasVT: !!vt, navType: act ? act.navigationType : null, types: [], finished: false, anims: [] };
    if (!vt) { log(rec); return; }
    const snap = () => { rec.types = [...vt.types]; };
    vt.ready.then(() => { snap(); rec.anims = document.getAnimations().filter((a) => String((a.effect && a.effect.pseudoElement) || "").indexOf("::view-transition") === 0).map((a) => ({ pe: a.effect.pseudoElement, d: a.effect.getComputedTiming().duration })); }, () => {});
    vt.finished.then(() => { snap(); rec.finished = true; log(rec); }, (err) => { snap(); rec.error = String(err); log(rec); });
  });
  addEventListener("pageshow", (e) => { if (e.persisted) log({ ev: "bfcache", path: location.pathname }); });
})();`;

async function launch(name, extra = {}) {
  const o = { headless: true };
  if (name === "chromium" && process.env.CHROME) o.executablePath = process.env.CHROME;
  return playwright[name].launch({ ...o, ...extra });
}
async function newPage(browser, ctxOpts = {}) {
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 }, ...ctxOpts });
  await context.addInitScript(INIT);
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(`${m.text()} @ ${m.location().url || ""}`.slice(0, 220)); });
  page.on("pageerror", (e) => errors.push(String(e).slice(0, 220)));
  return { context, page, errors };
}
const readLog = (page) => page.evaluate(() => { try { return JSON.parse(sessionStorage.getItem("rooms.log") || "[]"); } catch { return []; } }).catch(() => []);
const count = async (page) => (await readLog(page)).filter((r) => r.ev === "pagereveal").length;
async function waitReveal(page, n) {
  for (let t = 0; t < 60; t++) { if ((await count(page)) >= n) break; await sleep(100); }
  await sleep(120);
}
const state = (page) => page.evaluate(() => ({ path: location.pathname, scroll: Math.round(scrollY), focus: document.activeElement ? (document.activeElement.dataset?.room || document.activeElement.tagName) : null, cls: Number((window.__m?.cls || 0).toFixed(4)) })).catch(() => ({}));

// ---- pairs ----
async function pairRun(browser, kind, A, B) {
  const { context, page, errors } = await newPage(browser);
  const vtBrowser = BROWSER !== "firefox";
  const scrollGates = vtBrowser;
  const out = { fwd: [], back: [] };
  await page.goto(base + A.path, { waitUntil: "load" });
  await page.evaluate(() => sessionStorage.removeItem("rooms.log"));
  const wantF = kind === "enter" ? "enter-room" : "room-to-room", wantB = kind === "enter" ? "leave-room" : "room-to-room";
  let streak = 0;
  for (let i = 0; i < RUNS; i++) {
    if (streak >= 3) { out.aborted = i; break; }
    await page.evaluate(() => scrollTo(0, 300)); await sleep(100);
    if (kind === "enter") {
      const door = page.locator(`a[data-room="${B.slug}"]`).first();
      await door.scrollIntoViewIfNeeded().catch(() => {});
      await door.focus().catch(() => {});
    } else {
      await page.click(".house-menu-btn").catch(() => {});
      await page.locator(`#house-menu a[href="/${B.path}"]`).focus().catch(() => {});
    }
    await sleep(80);
    const before = await state(page), n0 = await count(page);
    errors.length = 0;
    await page.keyboard.press("Enter");
    await page.waitForURL((u) => u.pathname.startsWith("/" + B.path), { timeout: 8000 }).catch(() => {});
    if (vtBrowser) await waitReveal(page, n0 + 1); else await sleep(400);
    let rec = (await readLog(page)).filter((r) => r.ev === "pagereveal").pop() || {};
    const sf = await state(page);
    out.fwd.push({ i: i + 1, reached: sf.path?.startsWith("/" + B.path), types: rec.types || [], hasVT: !!rec.hasVT, finished: !!rec.finished, cls: sf.cls, errors: [...errors], anims: rec.anims || [],
      ok: !!sf.path?.startsWith("/" + B.path) && !errors.length && (!vtBrowser || (rec.hasVT && rec.finished && rec.types?.includes(wantF))) });
    errors.length = 0;
    const n1 = await count(page);
    await page.goBack({ waitUntil: "load", timeout: 15000 }).catch(() => {});
    await sleep(150);
    let log = await readLog(page);
    const bf = log.some((r) => r.ev === "bfcache");
    if (vtBrowser && (await count(page)) <= n1 && !bf) await waitReveal(page, n1 + 1);
    log = await readLog(page);
    rec = log.filter((r) => r.ev === "pagereveal").pop() || {};
    const fresh = log.filter((r) => r.ev === "pagereveal").length > n1;
    let sb = await state(page);
    for (let t = 0; t < 15 && Math.abs((sb.scroll ?? -99) - before.scroll) > 2; t++) { await sleep(100); sb = await state(page); }
    const scrollOk = Math.abs((sb.scroll ?? -99) - before.scroll) <= 2;
    const focusOk = kind === "enter" ? sb.focus === B.slug : true;
    out.back.push({ i: i + 1, reached: sb.path === "/" + A.path, types: fresh ? rec.types || [] : [], hasVT: fresh && !!rec.hasVT, finished: fresh && !!rec.finished, bfcache: bf, scrollOk, scroll: sb.scroll, scrollBefore: before.scroll, focusOk, focus: sb.focus, cls: sb.cls, errors: [...errors], anims: fresh ? rec.anims || [] : [],
      ok: sb.path === "/" + A.path && !errors.length && (scrollOk || !scrollGates) && (!vtBrowser || bf || (fresh && rec.hasVT && rec.finished && rec.types?.includes(wantB))) });
    streak = out.fwd[i].ok && out.back[i].ok ? 0 : streak + 1;
    if (!out.fwd[i].reached || !out.back[i].reached) { await page.goto(base + A.path, { waitUntil: "load" }).catch(() => {}); await page.evaluate(() => sessionStorage.removeItem("rooms.log")).catch(() => {}); }
  }
  await context.close();
  return out;
}

async function modePairs() {
  const browser = await launch(BROWSER);
  const gate = BROWSER === "chromium" ? RUNS : BROWSER === "webkit" ? RUNS - 1 : RUNS;
  const pairs = ROOMS.map((r) => ({ kind: "enter", A: HUB, B: r, label: `hub <-> ${r.name}` }));
  for (let i = 0; i < ROOMS.length; i++) for (let j = i + 1; j < ROOMS.length; j++) pairs.push({ kind: "room", A: ROOMS[i], B: ROOMS[j], label: `${ROOMS[i].name} <-> ${ROOMS[j].name}` });
  const result = { base, browser: BROWSER, version: browser.version(), runs: RUNS, gate, pairs: [] };
  for (const p of pairs) {
    const r = await pairRun(browser, p.kind, p.A, p.B);
    const f = r.fwd.filter((x) => x.ok).length, b = r.back.filter((x) => x.ok).length;
    const sr = r.back.filter((x) => x.scrollOk).length, fr = r.back.filter((x) => x.focusOk).length;
    const cls = Math.max(0, ...[...r.fwd, ...r.back].map((x) => x.cls || 0));
    const ok = f >= gate && b >= gate;
    const types = [...new Set([...r.fwd, ...r.back].flatMap((x) => x.types))].join("+") || "none";
    result.pairs.push({ label: p.label, kind: p.kind, fwd: f, back: b, scrollRestored: sr, focusRestored: fr, maxCls: cls, ok, runs: r });
    const msg = `${r.aborted ? "aborted after " + r.aborted + " runs (3 failures in a row), " : ""}forward ${f}/${RUNS}, back ${b}/${RUNS}, gate ${gate}, scroll ${sr}/${RUNS}, focus ${p.kind === "enter" ? fr + "/" + RUNS : "n/a"}, max CLS ${cls}, types ${types}, ${ok ? "pass" : "FAIL"}`;
    if (ok) notice(`${BROWSER} ${p.label}`, msg);
    else {
      const bad = [...r.fwd.filter((x) => !x.ok).map((x) => ({ d: "fwd", ...x })), ...r.back.filter((x) => !x.ok).map((x) => ({ d: "back", ...x }))].slice(0, 2)
        .map((x) => `${x.d}#${x.i} reached=${x.reached} vt=${x.hasVT} fin=${x.finished} types=[${x.types}] scrollOk=${x.scrollOk ?? "-"} err=${JSON.stringify(x.errors).slice(0, 160)}`).join(" | ");
      fail(`${BROWSER} ${p.label}`, `${msg}. First failures: ${bad}`);
    }
    if (p.kind === "enter" && fr < RUNS && BROWSER !== "firefox") warn(`${BROWSER} ${p.label} focus`, `focus on the door after Back in ${fr} of ${RUNS} (info: not gated)`);
  }
  await browser.close();
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
}

// ---- smoke ----
async function modeSmoke() {
  const browser = await launch(BROWSER);
  const { context, page, errors } = await newPage(browser);
  let sitemap = [];
  try { const t = await (await fetch(base + "sitemap.xml")).text(); sitemap = [...t.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim()); } catch (e) { fail("smoke sitemap", String(e)); }
  const urls = new Set(sitemap.filter((u) => u.startsWith(base)).map((u) => u));
  for (const s of [HUB, ...ROOMS]) urls.add(base + s.path);
  const results = [];
  for (const u of urls) {
    errors.length = 0;
    let status = null;
    try { status = (await page.goto(u, { waitUntil: "load", timeout: 30000 })).status(); } catch (e) { errors.push(String(e).slice(0, 160)); }
    await sleep(500);
    const html = await page.content().catch(() => "");
    // House version: only href/src attributes of link and script tags (preloads are link tags), never page text.
    const refs = await page.evaluate(() => [...document.querySelectorAll("link[href], script[src]")].map((n) => n.getAttribute("href") || n.getAttribute("src"))).catch(() => []);
    const ver = [...new Set(refs.flatMap((h) => { const m = /\/house\/(\d+\.\d+\.\d+)\//.exec(h || ""); return m ? [m[1]] : []; }))];
    results.push({ url: u, status, errors: [...errors], versions: ver, doorway: /\/house\/\d+\.\d+\.\d+\/doorway\.js/.test(html) });
  }
  await browser.close();
  const group = (s) => results.filter((r) => { const rel = r.url.slice(base.length); return s.slug === "hub" ? !ROOMS.some((x) => rel.startsWith(x.path)) : rel.startsWith(s.path); });
  const liveVer = {};
  for (const v of new Set(results.flatMap((r) => r.versions))) { try { liveVer[v] = (await fetch(`${base}house/${v}/house.css`)).status; } catch { liveVer[v] = 0; } }
  const evidence = {}, missing = {};
  for (const s of ROOMS) {
    try { const r = await fetch(base + s.path + "evidence.json"); const j = r.ok ? await r.json() : null; evidence[s.slug] = { status: r.status, schema: j?.schema ?? null }; } catch (e) { evidence[s.slug] = { error: String(e) }; }
    try {
      const r = await fetch(base + s.path + "zz-missing-bench/"); const t = await r.text();
      const house = /\/house\/\d+\.\d+\.\d+\//.test(t), gh = /GitHub Pages|File not found/i.test(t) && !house;
      missing[s.slug] = { status: r.status, house, github: gh, title: (t.match(/<title>([^<]*)/i) || [])[1] || null };
    } catch (e) { missing[s.slug] = { error: String(e) }; }
  }
  for (const s of [HUB, ...ROOMS]) {
    const g = group(s), probs = [];
    for (const r of g) {
      if (r.status !== 200) probs.push(`${r.url} status ${r.status}`);
      if (r.errors.length) probs.push(`${r.url} console: ${r.errors[0]}`);
      if (!r.doorway && r.status === 200 && !/\/404/.test(r.url)) probs.push(`${r.url} does not load house doorway.js`);
      if (!r.versions.length) probs.push(`${r.url} no /house/x.y.z/ reference`);
      if (r.versions.length > 1) probs.push(`${r.url} references several house versions ${r.versions}`);
      for (const v of r.versions) if (liveVer[v] !== 200) probs.push(`${r.url} house ${v} asset status ${liveVer[v]}`);
    }
    const vers = [...new Set(g.flatMap((r) => r.versions))].join(",") || "none";
    let extra = "";
    if (s.slug !== "hub") {
      const e = evidence[s.slug], m = missing[s.slug];
      extra = `, evidence.json ${e.status ?? e.error} schema ${e.schema}, missing path ${m.status ?? m.error} house404=${m.house} title="${m.title}"`;
      if (e.status !== 200 || e.schema !== 1) probs.push(`evidence.json status ${e.status ?? e.error} schema ${e.schema}`);
      if (m.status !== 404 || !m.house) probs.push(`missing path does not serve the room house 404 (status ${m.status ?? m.error}, house=${m.house}, github=${m.github}, title ${m.title})`);
    }
    const msg = `${g.length} pages, doorway.js on ${g.filter((r) => r.doorway).length}, house ${vers}${extra}, ${probs.length ? probs.length + " problems" : "all ok"}`;
    if (probs.length) fail(`smoke ${s.name}`, msg + ". " + probs.slice(0, 6).join(" | "));
    else notice(`smoke ${s.name}`, msg);
  }
  fs.writeFileSync(outFile, JSON.stringify({ base, results, evidence, missing }, null, 2));
}

// ---- calm ----
async function modeCalm() {
  const browser = await launch(BROWSER);
  const { context, page, errors } = await newPage(browser, { reducedMotion: "reduce" });
  const out = { idle: [], transitions: [] };
  for (const s of [HUB, ...ROOMS]) {
    await page.goto(base + s.path, { waitUntil: "load" });
    const calm = await page.evaluate(() => document.documentElement.dataset.motion);
    await sleep(6000);
    const running = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").map((a) => {
      const t = a.effect?.getComputedTiming?.() || {};
      return `${a.effect?.target?.tagName?.toLowerCase() || "?"}${a.effect?.target?.className ? "." + String(a.effect.target.className).split(" ")[0] : ""}:${a.animationName || a.transitionProperty || "anim"} dur=${t.duration} iter=${t.iterations}`;
    }));
    out.idle.push({ s: s.name, calm, running });
    if (calm !== "calm") fail(`calm ${s.name}`, `data-motion is "${calm}" under prefers-reduced-motion`);
    if (running.length) fail(`calm ${s.name}`, `${running.length} animations still running 6 s after load: ${running.slice(0, 4).join("; ")}`);
  }
  // Doorway durations under Calm: every view-transition animation is the 160 ms crossfade.
  const durs = [];
  const check = async (label, go, wantPath) => {
    errors.length = 0;
    const n0 = await count(page);
    await go();
    await page.waitForURL((u) => u.pathname.startsWith(wantPath), { timeout: 15000 }).catch(() => {});
    if (BROWSER !== "firefox") await waitReveal(page, n0 + 1);
    const rec = (await readLog(page)).filter((r) => r.ev === "pagereveal").pop() || {};
    const ds = (rec.anims || []).map((a) => a.d);
    const max = ds.length ? Math.max(...ds) : null;
    out.transitions.push({ label, hasVT: rec.hasVT, types: rec.types, max, anims: rec.anims });
    const ok = rec.hasVT && max !== null && max <= 170 && !(rec.types || []).length && !errors.length;
    notice(`calm ${label}`, `view transition ${rec.hasVT ? "ran" : "did not run"}, types [${(rec.types || []).join(",")}], longest animation ${max} ms (want 160), errors ${errors.length}, ${ok ? "pass" : "FAIL"}`);
    if (!ok) fail(`calm ${label}`, `hasVT=${rec.hasVT} types=[${(rec.types || []).join(",")}] anims=${JSON.stringify(rec.anims).slice(0, 200)} errors=${JSON.stringify(errors).slice(0, 160)}`);
    durs.push(max);
  };
  await page.goto(base, { waitUntil: "load" });
  await page.evaluate(() => sessionStorage.removeItem("rooms.log"));
  await check("hub to PaperLab (enter)", async () => { const d = page.locator('a[data-room="paperlab"]').first(); await d.scrollIntoViewIfNeeded(); await d.focus(); await page.keyboard.press("Enter"); }, "/paperlab/");
  await check("PaperLab back to hub (leave)", () => page.goBack({ waitUntil: "load" }), "/");
  await page.goto(base + "paperlab/", { waitUntil: "load" });
  await check("PaperLab to Paluwagan (menu)", async () => { await page.click(".house-menu-btn"); await page.locator('#house-menu a[href="/paluwagan/"]').focus(); await page.keyboard.press("Enter"); }, "/paluwagan/");
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2));
  await browser.close();
}

// ---- phones ----
async function modePhones() {
  const profiles = [["iPhone 13", "iPhone 13"], ["Pixel 7", "Pixel 7"]];
  const browser = await launch("chromium");
  const result = [];
  for (const [label, dev] of profiles) {
    const d = playwright.devices[dev];
    for (const s of [HUB, ...ROOMS]) {
      const runs = [];
      for (let k = 0; k < 3; k++) {
        const { context, page, errors } = await newPage(browser, { ...d, defaultBrowserType: undefined });
        const cdp = await context.newCDPSession(page);
        await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
        await cdp.send("Network.enable");
        await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
        await page.goto(base + s.path, { waitUntil: "load", timeout: 60000 });
        await sleep(2500);
        const m0 = await page.evaluate(() => ({ ...window.__m }));
        const btn = page.locator(".house-menu-btn").first();
        if (await btn.count()) { await btn.tap().catch(() => btn.click().catch(() => {})); await sleep(400); }
        await sleep(1500);
        const m = await page.evaluate(() => window.__m || {});
        runs.push({ lcp: m.lcp, cls: m0.cls, clsAfterTap: m.cls, inp: m.inp, errors: errors.length, shifts: (m.shifts || []).filter((x) => x.t <= 99999) });
        await context.close();
      }
      const lcp = Math.round(median(runs.map((r) => r.lcp))), cls = Number(median(runs.map((r) => r.cls)).toFixed(4)), inp = Math.round(median(runs.map((r) => r.inp)));
      const b = s.budget;
      result.push({ profile: label, surface: s.name, lcp, cls, inp, budget: b, runs });
      const msg = `LCP ${lcp} ms (budget ${b.lcp}), CLS ${cls} (${b.cls}), INP-ish ${inp} ms (${b.inp}), median of 3, 4x CPU, 1.6 Mbps, 150 ms RTT, console errors ${runs.reduce((a, r) => a + r.errors, 0)}`;
      notice(`phone ${label} ${s.name}`, msg);
      if (s === HUB) {
        const all = runs.flatMap((r, i) => r.shifts.map((x) => ({ ...x, run: i })));
        all.sort((a, b) => b.v - a.v).slice(0, 8).forEach((x, i) => notice(`shift ${label} #${i + 1}`, `${x.v} at ${x.t} ms run ${x.run} ${x.n} ${x.from} -> ${x.to} (x,y,w,h)`));
      }
      if (!lcp) fail(`phone ${label} ${s.name}`, "no LCP entry recorded");
      if (lcp > b.lcp) fail(`phone ${label} ${s.name}`, `LCP ${lcp} ms over budget ${b.lcp} ms`);
      if (cls > b.cls) fail(`phone ${label} ${s.name}`, `CLS ${cls} over budget ${b.cls}`);
      if (inp > b.inp) warn(`phone ${label} ${s.name}`, `INP-ish ${inp} ms over budget ${b.inp} ms`);
    }
  }
  await browser.close();
  fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
}

try {
  if (MODE === "pairs") await modePairs();
  else if (MODE === "smoke") await modeSmoke();
  else if (MODE === "calm") await modeCalm();
  else if (MODE === "phones") await modePhones();
  else throw new Error("unknown mode " + MODE);
} catch (e) { fail(`${MODE} ${BROWSER}`, `bench crashed: ${String(e.stack || e).split("\n").slice(0, 3).join(" / ")}`); }
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### ${MODE} ${BROWSER}\n\n` + rows.map((r) => `- ${r}`).join("\n") + "\n");
process.exit(failures ? 1 : 0);
