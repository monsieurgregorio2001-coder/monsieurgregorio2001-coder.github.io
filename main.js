(function () {
  "use strict";
  var list = document.getElementById("cards");

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text) n.textContent = text;
    return n;
  }

  function button(label, href, enabled, name) {
    var a = el(enabled ? "a" : "span", "btn", label);
    if (enabled) {
      a.href = href;
      a.rel = "noopener";
      a.setAttribute("aria-label", label + " for " + name);
    } else {
      a.setAttribute("aria-disabled", "true");
      a.setAttribute("aria-label", label + " for " + name + " (not available yet)");
    }
    return a;
  }

  function render(items) {
    list.textContent = "";
    items.forEach(function (p) {
      var soon = p.status !== "live";
      var li = el("li");
      var card = el("article", "card");
      card.appendChild(el("h3", "", p.title));
      if (soon) card.appendChild(el("span", "badge", "Coming soon"));
      else card.appendChild(el("span", "badge live", "Live"));
      card.appendChild(el("p", "", p.pitch));
      card.appendChild(el("p", "proves", "Proves: " + p.proves));
      if (p.tags && p.tags.length) {
        var tags = el("ul", "tags");
        tags.setAttribute("role", "list");
        p.tags.forEach(function (t) { tags.appendChild(el("li", "", t)); });
        card.appendChild(tags);
      }
      var actions = el("p", "actions");
      if (p.demoUrl !== null && p.demoUrl !== undefined) {
        actions.appendChild(button("Demo", p.demoUrl, !soon, p.title));
      }
      var hasRepo = !!p.repoUrl;
      actions.appendChild(button("Code", p.repoUrl, hasRepo && !soon, p.title));
      card.appendChild(actions);
      li.appendChild(card);
      list.appendChild(li);
    });
  }

  fetch("projects.json")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(render)
    .catch(function () {
      list.textContent = "";
      list.appendChild(el("li", "", "Projects could not be loaded. Please visit my GitHub profile instead."));
    });
})();
