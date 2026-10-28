// Keyboard pass on the hub pages (DIRECTION 8, item 4): skip link first, visible focus on every stop, Esc closes the menu and
// returns focus to its button, no trap, and focus never changes state on its own.
// Usage: node scripts/check-keyboard.mjs [path ...]   Exits 1 on any failure.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { serve, launch } from "./lib/serve.mjs";
import fs from "node:fs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const slugs = JSON.parse(fs.readFileSync(path.join(root, "projects.json"), "utf8")).map((p) => p.slug);
const pages = process.argv.slice(2).length ? process.argv.slice(2) : ["/", "/404.html", "/colophon/", "/changelog/", ...slugs.map((s) => `/work/${s}/`)];
const MAX_STOPS = 150;
const srv = await serve({ "/": root });
const browser = await launch();
let failed = 0;
const fail = (label, msg) => { failed++; console.error(`keyboard ${label}: ${msg}`); };

// What the focused element looks like: a name for messages and whether a focus ring is painted.
const probe = () => {
  const el = document.activeElement;
  if (!el || el === document.body || el === document.documentElement) return null;
  const cs = getComputedStyle(el), r = el.getBoundingClientRect();
  const outline = cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0 && cs.outlineColor !== "rgba(0, 0, 0, 0)";
  const shadow = cs.boxShadow && cs.boxShadow !== "none";
  return {
    name: `${el.tagName.toLowerCase()}${el.id ? "#" + el.id : ""}${el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/)[0] : ""} "${(el.textContent || el.getAttribute("href") || "").trim().slice(0, 30)}"`,
    ring: outline || !!shadow,
    focusVisible: el.matches(":focus-visible"),
    size: r.width > 0 && r.height > 0,
    skip: el.classList.contains("house-skip"),
    href: el.getAttribute("href") || "",
  };
};

try {
  for (const url of pages) for (const width of [390, 1440]) {
    const label = `${url} ${width}px`;
    const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(srv.base + url, { waitUntil: "networkidle" });
    const urlBefore = page.url();
    const scrollBefore = await page.evaluate(() => scrollY);

    // 1. Skip link is the first stop and is visible when focused.
    await page.keyboard.press("Tab");
    const first = await page.evaluate(probe);
    if (!first || !first.skip) fail(label, `first Tab stop is ${first ? first.name : "nothing"}, not the skip link`);
    else {
      const box = await page.evaluate(() => { const r = document.activeElement.getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right }; });
      if (box.bottom <= 0 || box.top >= 900 || box.right <= 0) fail(label, "skip link is focused but off screen");
      if (!first.ring) fail(label, "skip link shows no focus ring");
    }

    // 2. Walk every stop: each has a ring and a size, and the walk ends (no trap).
    const seen = new Set();
    let stops = 1, ended = false;
    for (let i = 0; i < MAX_STOPS; i++) {
      await page.keyboard.press("Tab");
      const s = await page.evaluate(probe);
      if (!s) { ended = true; break; }
      const key = s.name + "|" + s.href;
      if (seen.has(key) && s.skip) { ended = true; break; } // wrapped to the skip link
      seen.add(key); stops++;
      if (!s.size) fail(label, `focus landed on a zero-size element: ${s.name}`);
      if (!s.ring) fail(label, `no visible focus ring on ${s.name}`);
    }
    if (!ended) fail(label, `Tab did not leave the page within ${MAX_STOPS} stops (trap?)`);
    // Shift+Tab goes back to a page element, not into a loop.
    await page.keyboard.press("Shift+Tab");
    if (!(await page.evaluate(probe)) && !(await page.evaluate(() => document.activeElement === document.body))) fail(label, "Shift+Tab lost focus");

    // 3. Focus alone changes nothing: same URL, and the menu stayed closed.
    if (page.url() !== urlBefore) fail(label, "tabbing changed the URL");
    if (await page.evaluate(() => document.querySelector("#house-menu")?.matches(":popover-open"))) fail(label, "tabbing opened the menu");

    // 4. Menu: opens from the keyboard, Esc closes it and focus returns to the Menu button.
    await page.evaluate(() => { document.activeElement?.blur(); window.scrollTo(0, 0); });
    const btn = page.locator(".house-menu-btn");
    await btn.focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(300);
    if (!(await page.evaluate(() => document.querySelector("#house-menu").matches(":popover-open")))) fail(label, "Enter on Menu did not open it");
    else {
      await page.keyboard.press("Tab");
      const inMenu = await page.evaluate(() => !!document.activeElement?.closest("#house-menu"));
      if (!inMenu) fail(label, "after opening the menu, Tab did not move into it");
      await page.keyboard.press("Escape");
      await page.waitForTimeout(300);
      if (await page.evaluate(() => document.querySelector("#house-menu").matches(":popover-open"))) fail(label, "Esc did not close the menu");
      if (!(await page.evaluate(() => document.activeElement?.classList.contains("house-menu-btn")))) fail(label, "after Esc, focus did not return to the Menu button");
    }
    void scrollBefore;
    for (const e of errors) fail(label, `page error: ${e}`);
    if (!failed) console.log(`keyboard ${label}: ok (${stops} stops, skip link first, Esc returns focus)`);
    await page.close();
  }
} finally {
  await browser.close();
  srv.close();
}
if (failed) { console.error(`keyboard: ${failed} problem(s)`); process.exit(1); }
