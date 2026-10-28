/* House doorways (DIRECTION 4.5). Loaded in <head> so pagereveal is never missed.
   The type (enter-room, leave-room, room-to-room) comes from the two URLs and the room list in house.json, which
   `house:release` inlines below. Names exist only during a transition: door, house-crumb, house-wordmark.
   Markup it relies on: hub doors are a[data-room="<slug>"] holding [data-door-poster]; a room's static hero is #room-hero.
   Calm (data-motion="calm") adds no type and no names, so the root crossfade in house.css is the whole transition. */
(() => {
  const ROOMS = /*house:rooms*/[];
  const KEY = "house.door", root = document.documentElement, named = [];
  const slugOf = (url) => {
    try {
      const u = new URL(url, location.href), p = u.pathname;
      if (u.origin !== location.origin) return null;
      for (const [slug, base] of ROOMS) if (p === base.slice(0, -1) || p.startsWith(base)) return slug;
      return p.startsWith("/house/") ? null : "foyer";
    } catch { return null; }
  };
  const typeOf = (from, to) => !from || !to || from === to ? null : from === "foyer" ? "enter-room" : to === "foyer" ? "leave-room" : "room-to-room";
  const name = (el, n) => { if (el) { el.style.viewTransitionName = n; named.push(el); } };
  const clear = () => { root.classList.remove("h-door-offscreen"); while (named.length) named.pop().style.viewTransitionName = ""; };
  const common = (vt, type) => {
    vt.types.add(type);
    name(document.querySelector(".house-crumb"), "house-crumb");
    name(document.querySelector(".house-wordmark"), "house-wordmark");
    vt.finished.then(clear, clear);
  };
  const doorOf = (slug) => document.querySelector(`a[data-room="${slug}"]`);
  const poster = (door) => door && (door.querySelector("[data-door-poster]") || door);
  const inset = (r) => [["t", r.top], ["r", innerWidth - r.right], ["b", innerHeight - r.bottom], ["l", r.left]];
  let last = null;
  addEventListener("click", (e) => { last = e.target.closest?.("a[data-room]") || null; }, true);

  addEventListener("pageswap", (e) => {
    const vt = e.viewTransition, from = slugOf(location.href), to = e.activation && slugOf(e.activation.entry.url), type = typeOf(from, to);
    if (!vt || !type || root.dataset.motion === "calm") return;
    common(vt, type);
    if (type === "enter-room") {
      const door = last && last.dataset.room === to ? last : doorOf(to);
      if (door) {
        const o = {};
        for (const [k, v] of inset(door.getBoundingClientRect())) o[k] = v;
        try { sessionStorage.setItem(KEY, JSON.stringify(o)); } catch { /* no storage */ }
        name(poster(door), "door");
      }
    } else if (type === "leave-room") name(document.getElementById("room-hero"), "door");
  });

  addEventListener("pagereveal", (e) => {
    const vt = e.viewTransition, act = window.navigation && navigation.activation;
    const from = act && act.from && slugOf(act.from.url), at = slugOf(location.href), type = typeOf(from, at);
    if (!vt || !type || root.dataset.motion === "calm") return;
    common(vt, type);
    const set = (k, v) => root.style.setProperty("--door-" + k, v + "px");
    if (type === "enter-room") {
      try { const o = JSON.parse(sessionStorage.getItem(KEY) || "null"); if (o) for (const k in o) set(k, o[k]); } catch { /* no storage */ }
      name(document.getElementById("room-hero"), "door");
    } else if (type === "leave-room") {
      const door = doorOf(from);
      if (door) {
        const r = door.getBoundingClientRect();
        for (const [k, v] of inset(r)) set(k, v);
        const w = Math.max(0, Math.min(r.right, innerWidth) - Math.max(r.left, 0)), h = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, 0));
        if (w * h < 0.5 * r.width * r.height) root.classList.add("h-door-offscreen"); else name(poster(door), "door");
      } else root.classList.add("h-door-offscreen");
    }
    vt.finished.then(() => ["t", "r", "b", "l"].forEach((k) => root.style.removeProperty("--door-" + k)), () => {});
  });
})();
