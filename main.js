// Lift-in for the Work cards (including the featured block).
// Cards are rendered into index.html by scripts/build.mjs. Content is never hidden: the reveal is a small
// transform only. Anything already in view, or targeted by the URL hash, is revealed at once.
(function () {
  "use strict";
  var nodes = Array.prototype.slice.call(document.querySelectorAll(".reveal, .featured"));
  function show(n) { n.classList.add("in"); }
  function revealVisible() {
    nodes.forEach(function (n) {
      if (n.getBoundingClientRect().top < window.innerHeight) show(n);
    });
  }
  function revealHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var t = id && document.getElementById(id);
    if (!t) return;
    var host = t.closest(".reveal, .featured");
    if (host) show(host);
    t.querySelectorAll(".reveal, .featured").forEach(show);
    nodes.forEach(function (n) { if (t.contains(n)) show(n); });
  }
  revealVisible();
  revealHash();
  window.addEventListener("hashchange", revealHash);
  if (!("IntersectionObserver" in window)) { nodes.forEach(show); return; }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px 20% 0px" });
  nodes.forEach(function (n) { if (!n.classList.contains("in")) io.observe(n); });
})();
