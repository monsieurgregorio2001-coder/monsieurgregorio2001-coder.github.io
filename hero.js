/* Hero glyph field and headline decode (ADR 0005).
   A sparse grid of JetBrains Mono glyphs whose density drifts with value noise.
   Clicks and taps send a ripple that brightens, scrambles and nudges glyphs; a
   mouse carries a soft glow. The h1 resolves from scrambled glyphs on load,
   re-scrambles a word on hover and any letter a ripple front crosses. */
(function () {
  "use strict";
  var hero = document.querySelector(".hero");
  var canvas = hero && hero.querySelector("canvas.field");
  var h1 = hero && hero.querySelector("h1");
  if (!canvas || !h1 || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var SCRAMBLE = "abcdeghknopqrsuvxyz"; // headline stand-ins: x-height letters of similar width
  var FONT = '11px "JetBrains Mono", ui-monospace, monospace';
  var CW = 7, CH = 14;
  var RIPPLE_SPEED = 520, RIPPLE_WIDTH = 34, RIPPLE_LIFE = 1.2, MAX_RIPPLES = 6;
  var GLOW_RADIUS = 70;
  var SPECKLE = 0.06;      // share of empty-density cells still drawn (prototype: 0.12; halved for the 4 ms budget)
  var BUDGET = 0.12;       // max share of cells drawn per frame; denser noise seeds get thinned toward it
  var thin = 1;            // adaptive multiplier on the presence threshold, 0.5..1
  var FIELD_ALPHA = 0.6;   // global damping so the headline reads first
  var GUARD_ALPHA = 0.15;  // cap for cells under the h1 (and the other hero text) box
  var DECODE_TOTAL = 1100, DECODE_HOLD = 300, CHAR_SCRAMBLE = 300, HOVER_DEBOUNCE = 600;

  var reduce = matchMedia("(prefers-reduced-motion: reduce)");
  var dark = matchMedia("(prefers-color-scheme: dark)");

  var dpr = 1, W = 0, H = 0, cols = 0, rows = 0;
  var glyph, present, jitter, accent, density, guard, atlas;
  var ripples = [], pointer = { x: -9999, y: -9999 };
  var chars = [], words = [];
  var frameN = 0, running = false, onScreen = true;

  /* ---------- value noise ---------- */
  var P = new Uint8Array(512);
  (function () {
    var p = [], i, j, t;
    for (i = 0; i < 256; i++) p[i] = i;
    for (i = 255; i > 0; i--) { j = (Math.random() * (i + 1)) | 0; t = p[i]; p[i] = p[j]; p[j] = t; }
    for (i = 0; i < 512; i++) P[i] = p[i & 255];
  })();
  function hash(x, y) { return P[P[x & 255] + (y & 255)] / 255; }
  function noise(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }
  function smoothstep(e0, e1, x) { var t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0))); return t * t * (3 - 2 * t); }
  function randChar() { return (Math.random() * CHARS.length) | 0; }
  function randScramble() { return SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0]; }

  /* ---------- atlas ----------
     One row per (colour, alpha level): --muted rows first, then --accent. Baking
     alpha in means draw() never touches globalAlpha, which halves its cost.
     Rebuilt when the colour scheme changes. */
  var LEVELS = 24;
  function buildAtlas() {
    var s = getComputedStyle(document.documentElement);
    var colors = [s.getPropertyValue("--muted").trim(), s.getPropertyValue("--accent").trim()];
    atlas = document.createElement("canvas");
    atlas.width = CHARS.length * CW * dpr;
    atlas.height = colors.length * LEVELS * CH * dpr;
    var a = atlas.getContext("2d");
    a.scale(dpr, dpr);
    a.font = FONT;
    a.textAlign = "center";
    a.textBaseline = "middle";
    colors.forEach(function (c, ci) {
      a.fillStyle = c;
      for (var l = 0; l < LEVELS; l++) {
        a.globalAlpha = (l + 1) / LEVELS * FIELD_ALPHA;
        var y = (ci * LEVELS + l) * CH + CH / 2;
        for (var i = 0; i < CHARS.length; i++) a.fillText(CHARS[i], i * CW + CW / 2, y);
      }
    });
  }

  /* ---------- layout ---------- */
  // The canvas spans the viewport width (scrollbar excluded) and exactly the
  // hero's height, so canvas x == clientX and canvas y == clientY - hero top.
  function layout() {
    var hr = hero.getBoundingClientRect();
    W = document.documentElement.clientWidth;
    H = Math.ceil(hr.height);
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.style.left = -hr.left + "px";
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    cols = Math.ceil(W / CW) + 1;
    rows = Math.ceil(H / CH) + 1;
    var n = cols * rows, i;
    if (!glyph || glyph.length !== n) {
      glyph = new Uint8Array(n); present = new Float32Array(n); jitter = new Float32Array(n);
      accent = new Uint8Array(n); density = new Float32Array(n); guard = new Uint8Array(n);
      for (i = 0; i < n; i++) { glyph[i] = randChar(); present[i] = Math.random(); jitter[i] = Math.random(); }
    }
    // Contrast guard: flag every cell overlapping the h1 box. The eyebrow and lead get
    // the same cap, since ripples otherwise run dark glyphs through their smaller text.
    guard.fill(0);
    hero.querySelectorAll("h1, .eyebrow, .lead").forEach(function (el) {
      var b = el.getBoundingClientRect();
      var c0 = Math.max(0, Math.floor(b.left / CW)), c1 = Math.min(cols - 1, Math.floor(b.right / CW));
      var r0 = Math.max(0, Math.floor((b.top - hr.top) / CH)), r1 = Math.min(rows - 1, Math.floor((b.bottom - hr.top) / CH));
      for (var r = r0; r <= r1; r++) for (var c = c0; c <= c1; c++) guard[r * cols + c] = 1;
    });
    // Headline character centres, read once per layout, compared to ripple radii per frame.
    chars.forEach(function (ch) {
      var cr = ch.el.getBoundingClientRect();
      ch.x = cr.left + cr.width / 2; ch.y = cr.top - hr.top + cr.height / 2;
    });
    buildAtlas();
    updateDensity(performance.now() / 1000);
  }

  function updateDensity(t) {
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        var n = 0.65 * noise(c * 0.035 + t * 0.03, r * 0.07 - t * 0.01) +
                0.35 * noise(c * 0.09 - t * 0.05, r * 0.16 + 7.3);
        var i = r * cols + c;
        density[i] = smoothstep(0.52, 0.85, n);
        accent[i] = noise(c * 0.02 + 40, r * 0.04 + t * 0.02) > 0.62 ? 1 : 0;
      }
    }
  }

  /* ---------- draw ---------- */
  function draw(t) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while (ripples.length && t - ripples[0].t > RIPPLE_LIFE) ripples.shift();
    var sw = CW * dpr, sh = CH * dpr, reach = RIPPLE_WIDTH * 3, w2 = RIPPLE_WIDTH * RIPPLE_WIDTH;
    var g2 = GLOW_RADIUS * GLOW_RADIUS, gReach = 9 * g2, nr = ripples.length;
    var drawn = 0;
    for (var r = 0; r < rows; r++) {
      var py = r * CH + CH / 2, gyRow = py - pointer.y;
      var glowRow = gyRow * gyRow < gReach;
      for (var c = 0; c < cols; c++) {
        var i = r * cols + c, px = c * CW + CW / 2, d = density[i];
        // Cheap reject: with no ripple or glow this cell would stay empty anyway.
        if (!nr && !glowRow && present[i] > (SPECKLE + 0.6 * d) * thin) continue;
        var wave = 0, dx = 0, dy = 0;
        for (var k = 0; k < nr; k++) {
          var rp = ripples[k], age = t - rp.t, ex = px - rp.x, ey = py - rp.y;
          var dist = Math.sqrt(ex * ex + ey * ey), off = dist - age * RIPPLE_SPEED;
          if (off > reach || off < -reach) continue;
          var q = Math.exp(-(off * off) / w2) * (1 - age / RIPPLE_LIFE);
          wave += q;
          var push = (q * 6) / (dist || 1);
          dx += ex * push; dy += ey * push;
        }
        var lift = wave;
        if (glowRow) { var gx = px - pointer.x, gg = gx * gx + gyRow * gyRow; if (gg < gReach) lift += 0.4 * Math.exp(-gg / g2); }
        if (present[i] > (SPECKLE + 0.6 * d) * thin + lift * 1.5) continue;
        if (wave > 0.4 && Math.random() < 0.15) glyph[i] = randChar();
        var alpha = Math.min(1, 0.05 + 0.35 * d + jitter[i] * 0.05 + lift * 0.9) * FIELD_ALPHA;
        if (guard[i] && alpha > GUARD_ALPHA) alpha = GUARD_ALPHA;
        // Level l is baked at alpha (l + 1) / LEVELS * FIELD_ALPHA; round up for faint
        // glyphs so they survive, but round down under the guard so it is never exceeded.
        var lv = guard[i] ? Math.floor(alpha / FIELD_ALPHA * LEVELS) - 1 : Math.ceil(alpha / FIELD_ALPHA * LEVELS) - 1;
        if (lv < 0) lv = 0;
        var row = ((d > 0.55 || lift > 0.25) ? accent[i] : 0) * LEVELS + lv;
        ctx.drawImage(atlas, glyph[i] * sw, row * sh, sw, sh,
                      Math.round((c * CW + dx) * dpr), Math.round((r * CH + dy) * dpr), sw, sh);
        drawn++;
      }
    }
    // Some noise seeds and moments are much denser than others; keep the glyph count near budget.
    if (drawn > BUDGET * cols * rows) thin = Math.max(0.5, thin * 0.96); else thin = Math.min(1, thin + 0.01);
  }

  /* ---------- headline ---------- */
  // Each letter keeps its real glyph in the layout (made transparent while
  // scrambled); the stand-in is painted over it by ::after, so widths never change.
  function splitHeadline() {
    var text = h1.textContent.replace(/\s+/g, " ").trim();
    h1.setAttribute("aria-label", text);
    h1.textContent = "";
    text.split(" ").forEach(function (word, wi) {
      if (wi) h1.appendChild(document.createTextNode(" "));
      var w = document.createElement("span");
      w.className = "w";
      w.setAttribute("aria-hidden", "true");
      var list = [];
      for (var i = 0; i < word.length; i++) {
        var s = document.createElement("span");
        s.setAttribute("aria-hidden", "true");
        s.textContent = word[i];
        w.appendChild(s);
        var ch = { el: s, until: 0, next: 0, x: 0, y: 0, letter: /[A-Za-z]/.test(word[i]) };
        chars.push(ch); list.push(ch);
      }
      words.push({ el: w, chars: list, last: 0 });
      h1.appendChild(w);
    });
  }

  function scramble(ch, until) {
    if (!ch.letter || ch.until >= until) return;
    ch.until = until;
    ch.el.classList.add("s");
  }

  function tickHeadline(now) {
    for (var k = 0; k < chars.length; k++) {
      var ch = chars[k];
      if (!ch.until) continue;
      if (now >= ch.until) { ch.until = 0; ch.el.classList.remove("s"); continue; }
      if (now >= ch.next) { ch.el.setAttribute("data-g", randScramble()); ch.next = now + 55; }
    }
  }

  function decodeAll(now) {
    // 47 characters at 40 ms each would take 1.9 s; the stagger is compressed to fit 1.1 s.
    var stagger = Math.min(40, (DECODE_TOTAL - DECODE_HOLD) / Math.max(1, chars.length));
    chars.forEach(function (ch, i) { scramble(ch, now + DECODE_HOLD + i * stagger); });
    tickHeadline(now);
  }

  function rippleHits(t) {
    var now = t * 1000, band = RIPPLE_WIDTH * 0.5;
    for (var k = 0; k < ripples.length; k++) {
      var rad = (t - ripples[k].t) * RIPPLE_SPEED;
      for (var j = 0; j < chars.length; j++) {
        var ch = chars[j];
        if (ch.until) continue;
        var ex = ch.x - ripples[k].x, ey = ch.y - ripples[k].y;
        if (Math.abs(Math.sqrt(ex * ex + ey * ey) - rad) < band) scramble(ch, now + CHAR_SCRAMBLE);
      }
    }
  }

  /* ---------- loop ---------- */
  function frame(now) {
    if (!running) return;
    var t = now / 1000;
    if (frameN++ % 3 === 0) updateDensity(t);
    var churn = (cols * rows * 0.004) | 0;
    for (var k = 0; k < churn; k++) glyph[(Math.random() * glyph.length) | 0] = randChar();
    rippleHits(t);
    draw(t);
    tickHeadline(now);
    requestAnimationFrame(frame);
  }
  function start() {
    if (running || reduce.matches || document.hidden || !onScreen) return;
    running = true; requestAnimationFrame(frame);
  }
  function stop() { running = false; }
  function redraw() { if (!running) draw(performance.now() / 1000); }

  /* ---------- events ---------- */
  function local(e) { var r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  hero.addEventListener("pointerdown", function (e) {
    if (reduce.matches || e.target.closest("a, button")) return;
    var p = local(e);
    ripples.push({ x: p.x, y: p.y, t: performance.now() / 1000 });
    if (ripples.length > MAX_RIPPLES) ripples.shift();
  });
  hero.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return; // no glow on touch or pen
    var p = local(e); pointer.x = p.x; pointer.y = p.y;
  });
  hero.addEventListener("pointerleave", function () { pointer.x = pointer.y = -9999; });

  splitHeadline();
  words.forEach(function (w) {
    w.el.addEventListener("pointerenter", function (e) {
      if (reduce.matches || e.pointerType !== "mouse") return;
      var now = performance.now();
      if (now - w.last < HOVER_DEBOUNCE) return;
      w.last = now;
      w.chars.forEach(function (ch, i) { scramble(ch, now + CHAR_SCRAMBLE + i * 30); });
    });
  });

  var resizeT;
  addEventListener("resize", function () { clearTimeout(resizeT); resizeT = setTimeout(function () { layout(); redraw(); }, 100); });
  document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (es) { onScreen = es[0].isIntersecting; if (onScreen) start(); else stop(); }).observe(hero);
  }
  dark.addEventListener("change", function () { buildAtlas(); redraw(); });
  reduce.addEventListener("change", function () {
    if (!reduce.matches) return start();
    stop(); ripples.length = 0;
    chars.forEach(function (ch) { ch.until = 0; ch.el.classList.remove("s"); });
    redraw();
  });

  /* ---------- boot ---------- */
  if (!reduce.matches) decodeAll(performance.now());
  layout();
  draw(performance.now() / 1000);
  start();
  // The atlas needs the real mono face; Fraunces swapping in moves the headline, so re-measure.
  if (document.fonts) {
    document.fonts.load(FONT).then(function () { buildAtlas(); redraw(); });
    document.fonts.ready.then(function () { layout(); redraw(); });
  }
  if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
    window.__hero = { draw: function () { draw(performance.now() / 1000); }, cells: function () { return cols * rows; } };
  }
})();
