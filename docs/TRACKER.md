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
| Port glyph field to `hero.js` with site tokens | todo | prototype in `Professionalism/portfolio/index.html` |
| Clip canvas to hero, bottom fade | todo | |
| Headline decode on first paint | todo | |
| Ripple scrambles headline characters | todo | |
| Word hover scramble | todo | |
| Reduced-motion static frame | todo | |
| Frame-time measurement recorded | todo | target ≤ 4 ms at 1440×900 |
| Contrast guard under headline | todo | ≤ 15 % alpha |
| Screenshots ×6 + reduced-motion | todo | `docs/audits/shots/phase-1/` |
| Retire the Professionalism prototype | todo | |

## Phase 2 — Build script and featured PaperLab

| Item | Status | Notes |
| --- | --- | --- |
| `scripts/build.mjs` renders cards into `index.html` | review | idempotent (second run: "already up to date"); also renders noscript list linking `/work/<slug>/` + demo |
| `projects.json`: `slug`, `featured`, `order`, `screens[]` | review | also `cardImage` (2x crop) and `figures` on PaperLab; existing fields and numbers unchanged |
| Featured PaperLab block | review | ADR 0004; 12-col 7/5 at ≥ 900 px; figures 19 · 58 KB · 96 / 100 / 100 / 100, build asserts each number appears in `result` |
| Card hover / reveal craft | review | lift via `translate` so the 60 ms stagger delay never applies to hover; off under reduced motion |
| `capture.mjs --crop` at 2× | review | Playwright Chromium; PNG ≤ 200 KB by palette/dither stepping (slop 196 KB, others 88–120 KB) |
| Re-shoot all four hero crops | review | all four built and captured live, no fallback: PaperLab (vite, attention step heatmap), Paluwagan (vite, dashboard tiles + schedule), Living Mindmap (vite build + tsx server, seeded sample map, canvas + side panel), Slop Editorial (astro build, cover). Owner legibility check pending; Mindmap node text is small at card size |
| `main.js` reduced to reveal only | review | 1.0 KB. Page weight (Playwright resource timing, first load, DPR 1): before 271 KB @390 / 326 KB @1280; after 376 KB @390 / 431 KB @820 and 1280 (≤ 450 KB). Chromium's lazy-load margin fetches all four card images at ≥ 820 px |

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
