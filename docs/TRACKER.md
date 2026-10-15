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
