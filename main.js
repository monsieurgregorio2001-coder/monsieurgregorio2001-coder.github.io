(function () {
  "use strict";
  var list = document.getElementById("cards");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  // Wrap measured numbers in monospace spans. Text is inserted as text nodes only.
  function withNumbers(node, text) {
    var re = /\d[\d,.]*/g, last = 0, m;
    while ((m = re.exec(text))) {
      var end = re.lastIndex;
      if (/[.,]$/.test(m[0])) { end -= 1; re.lastIndex = end; }
      node.appendChild(document.createTextNode(text.slice(last, m.index)));
      node.appendChild(el("span", "num", text.slice(m.index, end)));
      last = end;
    }
    node.appendChild(document.createTextNode(text.slice(last)));
    return node;
  }

  function button(label, href, primary, name) {
    var a = el("a", primary ? "btn primary" : "btn", label);
    a.href = href;
    a.rel = "noopener";
    a.setAttribute("aria-label", label + " for " + name);
    return a;
  }

  function badge(live) {
    return el("span", live ? "badge live" : "badge", live ? "Live" : "Coming soon");
  }

  function meta(p, live) {
    var m = el("div", "meta");
    m.appendChild(badge(live));
    var pr = el("p", "proves");
    pr.appendChild(el("b", "", "Proves "));
    pr.appendChild(document.createTextNode(p.proves));
    m.appendChild(pr);
    return m;
  }

  function picture(p) {
    var fig = el("figure", "shot");
    var pic = document.createElement("picture");
    var src = el("source");
    src.type = "image/webp";
    src.srcset = p.image + ".webp";
    var img = el("img");
    img.src = p.image + ".png";
    img.width = 1200;
    img.height = 750;
    img.loading = "lazy";
    img.decoding = "async";
    img.alt = p.imageAlt || "";
    pic.appendChild(src);
    pic.appendChild(img);
    fig.appendChild(pic);
    return fig;
  }

  function full(p) {
    var card = el("article", "case reveal");
    if (p.image) card.appendChild(picture(p));
    var body = el("div", "body");
    body.appendChild(meta(p, true));
    body.appendChild(el("h3", "", p.title));
    body.appendChild(el("p", "pitch", p.pitch));

    var dl = el("dl", "pcr");
    [["Problem", p.problem], ["Build", p.build], ["Result", p.result]].forEach(function (row) {
      if (!row[1]) return;
      var d = el("div");
      d.appendChild(el("dt", "", row[0]));
      var dd = el("dd");
      if (row[0] === "Result") withNumbers(dd, row[1]); else dd.textContent = row[1];
      d.appendChild(dd);
      dl.appendChild(d);
    });
    if (dl.children.length) body.appendChild(dl);

    if (p.tags && p.tags.length) {
      var tags = el("ul", "tags");
      tags.setAttribute("role", "list");
      p.tags.forEach(function (t) { tags.appendChild(el("li", "", t)); });
      body.appendChild(tags);
    }
    var actions = el("p", "actions");
    if (p.demoUrl) actions.appendChild(button(p.demoLabel || "Live demo", p.demoUrl, true, p.title));
    if (p.repoUrl) actions.appendChild(button("Code", p.repoUrl, !p.demoUrl, p.title));
    if (actions.children.length) body.appendChild(actions);
    card.appendChild(body);
    return card;
  }

  function soon(p) {
    var card = el("article", "case soon reveal");
    card.appendChild(meta(p, false));
    card.appendChild(el("h3", "", p.title));
    card.appendChild(el("p", "pitch", p.pitch));
    card.appendChild(el("p", "note", "Case study and links to follow."));
    return card;
  }

  function render(items) {
    list.textContent = "";
    items.forEach(function (p) {
      var li = el("li");
      li.appendChild(p.status === "live" ? full(p) : soon(p));
      list.appendChild(li);
    });
    reveal();
  }

  function reveal() {
    var nodes = document.querySelectorAll(".reveal");
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
  }

  fetch("projects.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render)
    .catch(function () {
      list.textContent = "";
      list.appendChild(el("li", "", "Projects could not be loaded. Please visit my GitHub profile instead."));
    });
})();
