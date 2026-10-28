// The 10-second gate (DIRECTION 2.5 and 5.2). At 390 x 664 and 360 x 640, with JavaScript off, reduced motion on and fonts blocked,
// the wordmark, the role, the H1, the four door names and Email must sit inside the viewport.
import { serve, launch } from "./lib/serve.mjs";

const srv = await serve({ "/": new URL("..", import.meta.url).pathname });
const b = await launch();
let failed = 0;
for (const [w, h] of [[390, 664], [360, 640]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, javaScriptEnabled: false, reducedMotion: "reduce" });
  await ctx.route("**/*.woff2", (r) => r.abort());
  const page = await ctx.newPage();
  await page.goto(srv.base + "/", { waitUntil: "load" });
  const checks = [
    ["wordmark", ".house-wordmark"], ["role", ".hero .eyebrow"], ["H1", "h1"],
    ["door PaperLab", ".door-feature .door-name"], ["door Living Mindmap", "a[href='/mindmap-mcp/'] .door-name"],
    ["door Slop Editorial", "a[href='/slop-editorial/'] .door-name"], ["door Online Paluwagan", "a[href='/paluwagan/'] .door-name"],
    ["Email", ".house-crumb a[href^='mailto:']"],
  ];
  for (const [label, sel] of checks) {
    const box = await page.locator(sel).first().boundingBox();
    const ok = box && box.x >= 0 && box.y >= 0 && box.x + box.width <= w && box.y + box.height <= h;
    const line = `${ok ? "ok  " : "FAIL"} ${w}x${h} ${label}${box ? ` bottom ${Math.round(box.y + box.height)}` : " missing"}`;
    console.log(line);
    // In Actions, a failing row is also an annotation so it can be read without the log.
    if (!ok && process.env.GITHUB_ACTIONS) console.log(`::error title=ten-second gate::${line}`);
    if (!ok) failed++;
  }
  const h1 = await page.locator("h1").first().textContent();
  if (!h1.trim().length) { console.log("FAIL H1 text empty"); failed++; }
  await ctx.close();
}
// DIRECTION 3.1: the launch H1 sets in exactly two lines at 360, 390 and 1440, with the real fonts and with fallback fonts.
for (const [w, h] of [[360, 640], [390, 664], [1440, 900]]) {
  for (const fonts of [true, false]) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, reducedMotion: "reduce" });
    if (!fonts) await ctx.route("**/*.woff2", (r) => r.abort());
    const page = await ctx.newPage();
    await page.goto(srv.base + "/", { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    const n = await page.evaluate(() => {
      const el = document.querySelector("h1");
      return Math.round(el.getBoundingClientRect().height / parseFloat(getComputedStyle(el).lineHeight));
    });
    const line = `${n === 2 ? "ok  " : "FAIL"} ${w} H1 lines ${n} (${fonts ? "web fonts" : "fallback fonts"})`;
    console.log(line);
    if (n !== 2) { failed++; if (process.env.GITHUB_ACTIONS) console.log(`::error title=H1 lines::${line}`); }
    await ctx.close();
  }
}
await b.close();
srv.close();
if (failed) { console.error(`gate: ${failed} failure(s)`); process.exit(1); }
console.log("gate: ok");
