# Tracker

Live status of planned work. Update in the same commit that moves an item. Status values: `todo` · `doing` · `review` · `done` · `later` · `dropped`.

Plan: [`plan/2026-10-15-polish.md`](plan/2026-10-15-polish.md)

## Phase 0 — Foundation

| Item | Status | Notes |
| --- | --- | --- |
| `docs/` tree and ADRs 0001–0008 | review | this PR |
| `CLAUDE.md` conventions | review | this PR |
| CI: html-validate, axe, link check | review | `.github/workflows/check.yml`; `scripts/check-axe.mjs` (light+dark, 390+1280: 0 violations), `scripts/check-links.mjs` (0 errors; external links warn only), `.htmlvalidate.json` (0 errors). Landed with Phase 2 branch |
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
| `work/paperlab/` (template) | review | ADR 0006 section order; every figure has a `<!-- src: -->` comment beside it |
| `work/mindmap/` | review | |
| `work/slop-editorial/` | review | uses the Slop README's current figures (68 unit tests, 146 gates, 143 browser checks, Lighthouse 93/91 perf). See notes below |
| `work/paluwagan/` | review | |
| Shared chrome partials in `build.mjs` | review | `scripts/lib/chrome.mjs` (header, footer, case `<head>`); `build.mjs` fills `head`, `header`, `case-head`, `screens`, `case-nav`, `footer` markers in each page and `header`/`footer` in `index.html`. Idempotent; CI diffs `index.html` and `work/**/index.html` |
| Architecture SVG ×4 | review | hand-drawn inline SVG, 5–8 boxes, redrawn from each README's mermaid diagram. Box strokes `--rule`, highlights `--accent`, text `currentColor`; edges use `--muted` so arrows stay visible on `--surface`. Subtitles render at about 10–11 px at 390 px: owner legibility check |
| Detail screenshots ×4 | review | `capture.mjs --detail`, 3 per project, all built and captured live (no fallback): PaperLab and Paluwagan (vite), Living Mindmap (build + tsx server, seeded sample), Slop Editorial (astro). PNG 56–168 KB, all ≤ 200 KB. Paluwagan ledger table wraps entry numbers at 1440 px viewport |
| OG image per page | review | `og.mjs` loops over projects, now on Playwright via `lib/serve.mjs`; `puppeteer-core` dropped. Title replaces headline line 1, "Proves: …" replaces line 2 at 40 px Inter |
| Sitemap + canonical + prev/next | review | five URLs; prev/next wraps around in card order; "Back to work" → `/#work-<slug>` |
| Checks | review | html-validate 0 errors on all five pages; axe 0 violations on all five pages × light/dark × 390/1280 (20 runs); link check 0 errors, 0 warnings (the `/work/` pending rule is removed) |
| Owner content sign-off ×4 | todo | gate before merge |
| Lighthouse ≥ 95 per page | review | Lighthouse 12.2.1, mobile preset, Playwright Chromium 1194, served by `python3 -m http.server` (no compression), 2026-10-15. perf / a11y / best practices / SEO: `/` 98/100/100/100 · paperlab 99/100/100/100 · mindmap 99/100/100/100 · slop-editorial 99/100/100/100 · paluwagan 99/100/100/100 |
| Review screenshots | review | `docs/audits/shots/phase-3/<slug>-{390,1280}-{light,dark}.png`, full page |

Notes for the owner:

- **Hub card for Slop Editorial is stale.** `projects.json` `result` says "49 pipeline tests, 147 real-browser checks, 0 accessibility violations, Lighthouse 100 on accessibility, best practices, and SEO". The Slop README (2026-10-15) now says 68 unit tests (49 Python + 19 Node), 146 build gates, 143 real-browser checks and Lighthouse mobile performance 93 / 91. The case page uses the README. The card text was not changed: owner decides.
- **Slop README disagrees with itself.** Its "In 30 seconds" says 143 real-browser checks; its results table says "150 pass, 0 fail". The page publishes 143 with both in the source comment. Re-run `npm run verify` and fix the README.
- **Paluwagan "AI-drafted" reminders.** The hub card pitch says "AI-drafted payment reminders" and tags Claude; the Paluwagan README says drafts are pre-written templates. The case page describes templates. Owner to reconcile the card.
- **Paluwagan test count.** README says 53; a grep finds 42 top-level `it(` (rest from `it.each`/loops). Not re-run here.
- Decisions on each page come from README sections (design decisions, features, architecture notes). The project repos are shallow clones, so commit history was not read for decisions.

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
