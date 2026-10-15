# Tracker

Live status of planned work. Update in the same commit that moves an item. Status values: `todo` · `doing` · `review` · `done` · `later` · `dropped`.

Plan: [`plan/2026-10-15-polish.md`](plan/2026-10-15-polish.md)

## Phase 0 — Foundation

| Item | Status | Notes |
| --- | --- | --- |
| `docs/` tree and ADRs 0001–0008 | review | this PR |
| `CLAUDE.md` conventions | review | this PR |
| CI: html-validate, axe, link check | todo | |
| CI: build-output diff check | todo | after Phase 2 |

## Phase 1 — Interactive hero

| Item | Status | Notes |
| --- | --- | --- |
| Port glyph field to `hero.js` with site tokens | review | `--muted`/`--accent` via getComputedStyle, JetBrains Mono 11 px on 7×14; atlas rebuilt on scheme change |
| Clip canvas to hero, bottom fade | review | full viewport width, hero height; CSS mask fades bottom 20 % |
| Headline decode on first paint | review | resolves within 1.1 s; stagger compressed to ~17 ms (47 chars × 40 ms would be 1.9 s); letter shift while scrambled 0.00 px |
| Ripple scrambles headline characters | review | 300 ms per letter; touch/pen ripple only on tap (< 10 px, < 400 ms) so scrolls do not ripple, checked in `shoot-hero.mjs`; ripple life cut 2.4 s → 1.2 s for the 1.2 s timing rule |
| Word hover scramble | review | mouse only, 600 ms debounce per word |
| Reduced-motion static frame | review | one frame, no loop/ripple/hover, headline resolved |
| Frame-time measurement recorded | review | headless Chromium 1440×900, 10 143 cells, `scripts/shoot-hero.mjs`: one `draw()` median 1.6–3.0 ms, p95 2.2–4.6 ms over 3 runs; rAF interval 16.4–16.7 ms. First cut was 4.0–5.8 ms; fixed by alpha-baked atlas (no globalAlpha), halved background speckle, adaptive thinning to ≤ 12 % of cells drawn |
| Contrast guard under headline | review | ≤ 15 % alpha under h1, also eyebrow, lead and proof points; axe 0 violations light and dark (axe-core 4.10) |
| Screenshots ×6 + reduced-motion | review | `docs/audits/shots/phase-1/`, plus mid-ripple |
| Retire the Professionalism prototype | todo | separate repo; after merge |

Deliberate deviations from ADR 0005, accepted in review:

- Decode stagger compressed from 40 ms to ~17 ms so 47 characters resolve within 1.1 s.
- Ripple life 1.2 s (prototype 2.4 s) to honour the 1.2 s timing rule.
- Contrast guard widened from the h1 to eyebrow, lead and proof points.
- Field alpha damped to 0.6 so the headline reads first.
- Bottom fade is a CSS `mask-image`, so `--paper` is not read by `hero.js`.

## Phase 2 — Build script and featured PaperLab

| Item | Status | Notes |
| --- | --- | --- |
| `scripts/build.mjs` renders cards into `index.html` | todo | |
| `projects.json`: `slug`, `featured`, `order`, `screens[]` | todo | |
| Featured PaperLab block | todo | ADR 0004 |
| Card hover / reveal craft | todo | |
| `capture.mjs --crop` at 2× | todo | PNG ≤ 200 KB |
| Re-shoot all four hero crops | todo | |
| `main.js` reduced to reveal only | todo | |

## Phase 3 — Case-study pages

| Item | Status | Notes |
| --- | --- | --- |
| `work/paperlab/` (template) | todo | |
| `work/mindmap/` | todo | |
| `work/slop-editorial/` | todo | |
| `work/paluwagan/` | todo | |
| Shared chrome partials in `build.mjs` | todo | |
| Architecture SVG ×4 | todo | |
| Detail screenshots ×4 | todo | |
| OG image per page | todo | |
| Sitemap + canonical + prev/next | todo | |
| Owner content sign-off ×4 | todo | gate before merge |
| Lighthouse ≥ 95 per page | todo | paste scores here |

## Phase 4 — Craft pass

| Item | Status | Notes |
| --- | --- | --- |
| "Now" line from `projects.json` | todo | |
| Proof points link to cards | todo | |
| Button / link states | todo | |
| Tags: link or trim | todo | decide during pass |
| Favicon monogram | todo | |
| Footer links + ADR 0001 line | todo | |
| 404 gets static hero field | todo | |

## Phase 5 — Verification

| Item | Status | Notes |
| --- | --- | --- |
| Live checks (Pages headers, subpaths, OG previews) | todo | needs live URL |
| Post-polish audit | todo | |

## Later

| Item | Notes |
| --- | --- |
| About photo + career arc | ADR 0008 |
| Resume PDF link | ADR 0008; resume lives in `Professionalism` |
| Writing section | |
| Custom domain | |
| Filipino translation | |
