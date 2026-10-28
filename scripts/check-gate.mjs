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
    ["door PaperLab", ".door-feature .door-name"], ["door Living Mindmap", "a[href='/work/mindmap/'] .door-name"],
    ["door Slop Editorial", "a[href='/slop-editorial/'] .door-name"], ["door Online Paluwagan", "a[href='/paluwagan/'] .door-name"],
    ["Email", ".house-crumb a[href^='mailto:']"],
  ];
  for (const [label, sel] of checks) {
    const box = await page.locator(sel).first().boundingBox();
    const ok = box && box.x >= 0 && box.y >= 0 && box.x + box.width <= w && box.y + box.height <= h;
    console.log(`${ok ? "ok  " : "FAIL"} ${w}x${h} ${label}${box ? ` bottom ${Math.round(box.y + box.height)}` : " missing"}`);
    if (!ok) failed++;
  }
  const h1 = await page.locator("h1").first().textContent();
  if (!h1.trim().length) { console.log("FAIL H1 text empty"); failed++; }
  await ctx.close();
}
await b.close();
srv.close();
if (failed) { console.error(`gate: ${failed} failure(s)`); process.exit(1); }
console.log("gate: ok");
