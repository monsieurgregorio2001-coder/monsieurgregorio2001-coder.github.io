# Tracker

Live status of planned work. Update in the same commit that moves an item. Status values: `todo` · `doing` · `review` · `done` · `later` · `dropped`.

Plan: [`plan/2026-10-15-polish.md`](plan/2026-10-15-polish.md)

## Phase 0 — Foundation

| Item | Status | Notes |
| --- | --- | --- |
| `docs/` tree and ADRs 0001–0008 | review | this PR |
| `CLAUDE.md` conventions | review | this PR |
| CI: html-validate, axe, link check | review | `.github/workflows/check.yml`; `scripts/check-axe.mjs` (light+dark, 390+1280: 0 violations), `scripts/check-links.mjs` (0 errors; `/work/*` warn until Phase 3; external links warn only), `.htmlvalidate.json` (0 errors). Landed with Phase 2 branch |
| CI: build-output diff check | review | `node scripts/build.mjs` + diff step in `check.yml` |

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
| `scripts/build.mjs` renders cards into `index.html` | review | idempotent (second run: "already up to date"); also renders noscript list linking `/work/<slug>/` + demo |
| `projects.json`: `slug`, `featured`, `order`, `screens[]` | review | also `cardImage` (2x crop) and `figures` on PaperLab; existing fields and numbers unchanged |
| Featured PaperLab block | review | ADR 0004; 12-col 7/5 at ≥ 900 px; figures 19 · 58 KB · 96 / 100 / 100 / 100, build asserts each number appears in `result` |
| Card hover / reveal craft | review | lift via `translate` so the 60 ms stagger delay never applies to hover; off under reduced motion |
| `capture.mjs --crop` at 2× | review | Playwright Chromium; PNG ≤ 200 KB by palette/dither stepping (slop 196 KB, others 88–120 KB) |
| Re-shoot all four hero crops | review | all four built and captured live, no fallback: PaperLab (vite, Head 1 attention matrix filling ~80 % of the frame, 4×), Paluwagan (vite, dashboard tiles + schedule), Living Mindmap (vite build + tsx server, seeded sample map; zoomed on Self-Attention and its children plus inspector edge, 3×), Slop Editorial (astro build, cover). Owner legibility check pending |
| `main.js` reduced to reveal only | review | 1.0 KB. Page weight (Playwright resource timing, first load, DPR 1): before 271 KB @390 / 326 KB @1280; after Phase 2 alone 376 / 431 KB; after merging the Phase 1 hero (+15 KB `hero.js`, +21 KB mono 400) 393 KB @390 / 438 KB @820 and 1280 (≤ 450 KB), with crop WebP quality 74 (Slop 50). Chromium's lazy-load margin fetches all four card images at ≥ 820 px |

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
