// Evidence slots (DIRECTION 4.4). Typed slots read data/evidence/<room>.json, the snapshot `npm run evidence:pull` takes.
//   {{fig:room/id}}      value and label, "19 unit tests on the attention math"
//   {{figs:room/id}}     value and unit, "19 tests" (doors)
//   {{test:room/id}}     "143 of 143" and the row label
//   {{figs-test:room/id}} "143 of 143 passed"
//   {{checks:room}}      every test and eval row with its command
//   {{limits:room}}      the room's limits
// A slot with no value renders "not measured yet" and is collected in `missing`, so the build fails and it never reaches main.
import fs from "node:fs";
import path from "node:path";

export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const num = (n) => n.toLocaleString("en-US");

export function loadEvidence(root) {
  const dir = path.join(root, "data", "evidence");
  const out = {};
  if (fs.existsSync(dir)) for (const f of fs.readdirSync(dir)) if (f.endsWith(".json")) out[f.slice(0, -5)] = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  return out;
}

export function makeSlots(evidence) {
  const missing = [];
  const src = (ev) => `<!-- src: data/evidence/${ev.room}.json, commit ${ev.commit}, ${ev.ran_at} -->`;
  const value = (f) => {
    if (f.unit === "bytes") return `${(f.value / 1024).toFixed(1)} KB`;
    if (f.unit === "ms") return `${f.value} ms`;
    return num(f.value);
  };
  const unitWord = (f) => (f.unit === "bytes" || f.unit === "ms" ? "" : ` ${f.unit}`);
  const gone = (key, html) => { missing.push(key); return html ? `<span class="house-fig is-missing">not measured yet</span>` : "not measured yet"; };

  function one(kind, arg, html) {
    const [room, id] = arg.split("/");
    const ev = evidence[room];
    if (!ev) return gone(`${kind}:${arg}`, html);
    if (kind === "checks") {
      const rows = [...ev.tests.map((t) => ["Test", t]), ...ev.evals.map((t) => ["Eval", t])];
      if (!rows.length) return gone(`checks:${arg}`, html);
      if (!html) return rows.map(([k, t]) => `${k}: ${t.label}, ${t.passed} of ${t.total} (${t.command})`).join(". ");
      return `<ul class="checks">${rows.map(([k, t]) => `<li><span class="house-fig">${t.passed} of ${t.total}</span> ${esc(t.label)}<span class="cmd"><code>${esc(t.command)}</code></span></li>`).join("")}</ul>${src(ev)}`;
    }
    if (kind === "limits") {
      if (!ev.limits.length) return gone(`limits:${arg}`, html);
      return html ? `<ul class="limits">${ev.limits.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>` : ev.limits.join(" ");
    }
    if (kind === "fig" || kind === "figs") {
      const f = ev.figures.find((x) => x.id === id);
      if (!f) return gone(`${kind}:${arg}`, html);
      const text = kind === "fig" ? `${value(f)} ${f.label}` : `${value(f)}${unitWord(f)}`;
      return html ? `<span class="house-fig">${esc(value(f))}</span>${esc(kind === "fig" ? " " + f.label : unitWord(f))}${src(ev)}` : text;
    }
    if (kind === "test" || kind === "figs-test") {
      const t = [...ev.tests, ...ev.evals].find((x) => x.id === id);
      if (!t) return gone(`${kind}:${arg}`, html);
      const head = `${t.passed} of ${t.total}`;
      if (kind === "figs-test") return html ? `<span class="house-fig">${head}</span> passed${src(ev)}` : `${head} passed`;
      return html ? `<span class="house-fig">${head}</span> ${esc(t.label)}${src(ev)}` : `${head} ${t.label}`;
    }
    throw new Error(`unknown slot kind ${kind}`);
  }
  // Replaces every slot in `text`. `html` true: the text is trusted HTML and slots become markup. false: plain text.
  const render = (text, html = true) => String(text).replace(/\{\{(fig|figs|test|figs-test|checks|limits):([^}]+)\}\}/g, (_, k, a) => one(k, a, html));
  return { render, missing };
}
