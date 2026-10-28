/* House behaviour (deferred module). Menu state, Calm switch, copy-address toast, crumb glass after 8 px,
   crumb hand-off, plain-text link, and live receipts after LCP. No network, no storage except house.motion. */
const root = document.documentElement;
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* Menu: the popover is native. We only mirror its state to aria-expanded. */
const menu = document.getElementById("house-menu");
const menuBtn = document.querySelector(".house-menu-btn");
if (menu && menuBtn) {
  menu.addEventListener("toggle", (e) => menuBtn.setAttribute("aria-expanded", String(e.newState === "open")));
  const here = location.pathname.replace(/index\.html$/, "");
  $$("a[href]", menu).forEach((a) => { if (a.pathname === here && !a.hash && here !== "/") a.setAttribute("aria-current", "page"); });
  menu.addEventListener("click", (e) => { if (e.target.closest("a[href]") && menu.matches(":popover-open")) menu.hidePopover(); });
}

/* Calm switch. aria-pressed true means Calm is on. One preference for the whole house. */
const calmOn = () => root.dataset.motion === "calm";
const syncCalm = () => $$("[data-house-calm]").forEach((b) => {
  b.setAttribute("aria-pressed", String(calmOn()));
  const s = b.querySelector("[data-state]");
  if (s) s.textContent = calmOn() ? "On" : "Off";
});
syncCalm();
$$("[data-house-calm]").forEach((b) => b.addEventListener("click", () => {
  const next = calmOn() ? "full" : "calm";
  root.dataset.motion = next;
  try { localStorage.setItem("house.motion", next); } catch { /* no storage */ }
  syncCalm();
}));
addEventListener("storage", (e) => { if (e.key === "house.motion" && (e.newValue === "calm" || e.newValue === "full")) { root.dataset.motion = e.newValue; syncCalm(); } });

/* Plain-text twin: the page's own index.md. */
$$("[data-house-plain]").forEach((a) => { a.href = location.pathname.replace(/[^/]*$/, "") + "index.md"; });

/* Toast: one at a time, role=status, 4 s, pauses on hover and focus. */
let region, timer, left, started;
const region_ = () => {
  if (region) return region;
  region = document.createElement("div");
  region.className = "house-toast-region";
  region.setAttribute("role", "status");
  document.body.append(region);
  return region;
};
const dismiss = () => {
  clearTimeout(timer);
  const t = region && region.firstElementChild;
  if (!t) return;
  t.dataset.leaving = "";
  const rm = () => t.remove();
  t.addEventListener("animationend", rm, { once: true });
  setTimeout(rm, 400);
};
const arm = (ms) => { left = ms; started = performance.now(); timer = setTimeout(dismiss, ms); };
export function toast(text) {
  const r = region_();
  clearTimeout(timer);
  r.replaceChildren();
  const t = document.createElement("div");
  t.className = "house-toast";
  t.textContent = text;
  const pause = () => { clearTimeout(timer); left -= performance.now() - started; };
  const resume = () => arm(Math.max(left, 1000));
  t.addEventListener("pointerenter", pause);
  t.addEventListener("pointerleave", resume);
  t.addEventListener("focusin", pause);
  t.addEventListener("focusout", resume);
  r.append(t);
  arm(4000);
}
region_();
$$("[data-house-copy]").forEach((b) => b.addEventListener("click", async () => {
  const text = b.dataset.houseCopy || document.querySelector('.house-crumb a[href^="mailto:"]')?.getAttribute("href").slice(7) || "";
  try { await navigator.clipboard.writeText(text); toast("Copied."); } catch { toast("Copy is blocked here. The address is in the Email link."); }
}));

/* Crumb: opaque, then glass after 8 px of scroll. Hand-off of a room's primary action once its hero has left. */
const crumb = document.querySelector(".house-crumb");
if (crumb) {
  let tick = false;
  const glass = () => { tick = false; crumb.toggleAttribute("data-glass", scrollY > 8); };
  addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(glass); } }, { passive: true });
  glass();
  const hero = document.querySelector("[data-hero]");
  if (hero && "IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => crumb.toggleAttribute("data-handoff", !en.isIntersecting), { rootMargin: "-52px 0px 0px 0px" }).observe(hero);
  }
}

/* Live receipts, after LCP. Never stored. A metric the browser does not report says so. */
const rec = document.querySelector("[data-house-receipts]");
if (rec && "PerformanceObserver" in window) {
  const m = { lcp: null, cls: 0, inp: null, shift: false, bytes: null };
  const watch = (type, fn, opts = {}) => { try { new PerformanceObserver((l) => l.getEntries().forEach(fn)).observe({ type, buffered: true, ...opts }); return true; } catch { return false; } };
  const hasLcp = watch("largest-contentful-paint", (e) => { m.lcp = e.startTime; });
  m.shift = watch("layout-shift", (e) => { if (!e.hadRecentInput) m.cls += e.value; });
  watch("event", (e) => { if (e.interactionId && (m.inp === null || e.duration > m.inp)) m.inp = e.duration; }, { durationThreshold: 16 });
  const set = (k, v) => { const d = rec.querySelector(`[data-r="${k}"]`); if (d && v != null) { d.textContent = v; d.setAttribute("data-r-ok", ""); } };
  const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.content;
  const render = () => {
    const res = performance.getEntriesByType("resource");
    const nav = performance.getEntriesByType("navigation")[0];
    const total = (nav ? nav.transferSize : 0) + res.reduce((s, r) => s + (r.transferSize || 0), 0);
    if (total > 0) set("bytes", (total / 1024).toFixed(1) + " KB");
    if (hasLcp && m.lcp !== null) set("lcp", Math.round(m.lcp) + " ms");
    if (m.shift) set("cls", m.cls.toFixed(3));
    if (m.inp !== null) set("inp", Math.round(m.inp) + " ms");
    set("version", rec.dataset.houseVersion);
    set("commit", meta("build-commit"));
    set("built", meta("build-date"));
  };
  rec.addEventListener("toggle", () => { if (rec.open) render(); });
  const after = () => { if (rec.open) render(); };
  if (document.readyState === "complete") setTimeout(after, 0); else addEventListener("load", () => setTimeout(after, 0), { once: true });
}
