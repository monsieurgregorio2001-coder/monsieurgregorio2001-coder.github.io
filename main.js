// Reveal-on-scroll for the Work cards (including the featured block).
// Cards are rendered into index.html by scripts/build.mjs; this file only adds .in when they scroll into view.
(function () {
  "use strict";
  var nodes = document.querySelectorAll(".reveal, .featured");
  if (!("IntersectionObserver" in window)) {
    nodes.forEach(function (n) { n.classList.add("in"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px" });
  nodes.forEach(function (n) { io.observe(n); });
})();
