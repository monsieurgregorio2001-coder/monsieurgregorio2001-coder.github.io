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
| Owner content sign-off ×4 | review | numbers verified by re-running the suites (above); prose still open for the owner to edit |
| Lighthouse ≥ 95 per page | review | Lighthouse 12.2.1, mobile preset, Playwright Chromium 1194, served by `python3 -m http.server` (no compression), 2026-10-15. perf / a11y / best practices / SEO: `/` 98/100/100/100 · paperlab 99/100/100/100 · mindmap 99/100/100/100 · slop-editorial 99/100/100/100 · paluwagan 99/100/100/100 |
| Review screenshots | review | `docs/audits/shots/phase-3/<slug>-{390,1280}-{light,dark}.png`, full page |

Resolved on 2026-10-15 (by review, with evidence):

- **Slop Editorial hub card** now reads "68 unit tests across the pipeline and the site, 143 real-browser checks, 146 build gates, and Lighthouse 100 on accessibility, best practices, and SEO." 68 = 49 Python (`def test_` in `pipeline/tests`) + 19 Node (`node --test` in `site/test`, 19 pass, run 2026-10-15). 143 is the README summary figure; its results table says 150. Owner: re-run `npm run verify` in `site/` and fix the README.
- **Paluwagan reminders** are templates, not AI drafts (README). Card pitch now says "payment reminder drafts a human approves before anything is sent"; the Claude tag was dropped in Phase 4.
- **Paluwagan test count** confirmed: `npx vitest run` on a fresh clone, 2026-10-15: 6 files, 53 passed.
- Decisions on each page come from README sections; commit history was not read (shallow clones).

## Phase 4 — Craft pass

| Item | Status | Notes |
| --- | --- | --- |
| "Now" line from `site.json` | review | `projects.json` is an array, so the line lives in `site.json` (`now`); `build.mjs` fills `<!-- now:start/end -->` in the hero as `p.now` (`--muted`, .9375rem, between lead and actions). Draft copy: owner to edit |
| Proof points link to cards | review | "12 MCP tools" → `#work-mindmap`; magna cum laude replaced by "96 / 100 / 100 / 100 Lighthouse on PaperLab" → `#work-paperlab` (ADR 0004); still three items. Plain text, underline on hover, focus ring kept. Magna cum laude stays in About |
| Button / link states | review | `.btn:hover` border → `--muted` and primary `brightness(1.08)` kept; `:active { scale: .98 }` on `.btn` and `.case`, 180 ms ease-out. Under reduced motion transitions are off and `scale` is `none` (checked in Chromium: 0.98 vs none) |
| Tags: link or trim | review | Decision: trim to three per card, non-interactive. Linking tags to case sections adds anchors for little value. Dropped: PaperLab "Visualization", Living Mindmap "React", Slop Editorial "Three.js", Online Paluwagan "Claude". No number or claim added; dropping "Claude" also stops the tag implying an AI integration the Paluwagan README describes as templates (see Phase 3 notes) |
| Favicon monogram | review | "GL" in JetBrains Mono 500 converted to paths with `fontkit` (devDependency) by `scripts/favicon.mjs`; colours read from `--accent`/`--accent-ink` in `style.css`, dark swap via `prefers-color-scheme`. 764 bytes |
| Footer links + ADR 0001 line | review | `scripts/lib/chrome.mjs`: "Pages" nav with Work and the four case pages, and "Built without a framework" → ADR 0001 on GitHub. That URL returns 404 until this branch reaches `main` (link check warns only) |
| 404 gets static hero field | review | `<main class="hero wrap" data-static>` + canvas + `hero.js`; `hero.js` treats `data-static` as reduced motion (one frame, no loop, no ripple). 2-line change |
| Checks | review | `npm run check`: build up to date, html-validate 0 errors, axe 0 violations on all pages × light/dark × 390/1280, links 0 errors (10 warnings: offline hosts + ADR URL above) |
| Page weight | review | first load, Playwright resource timing: 439.6 KB @1280 (shoot.mjs, all four card images), 394.0 KB @390 and @820 without scrolling. ≤ 450 KB |
| Screenshots | review | `docs/audits/shots/phase-4/hub-{390,820,1280}-{light,dark}.png`, `hub-1280-light-full.png`, `404-1280-light.png` |

Notes for the owner:

- The PaperLab proof figure is long, so at ≥ 900 px its label wraps under the number while the other two sit on one line. Shorter alternative: "19 unit tests on PaperLab's math".

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

## Show Your Work, phase 0: honesty sweep (hub)

Plan: [`portfolio/design/DIRECTION.md`](portfolio/design/DIRECTION.md), section 10.

| Item | Status | Notes |
| --- | --- | --- |
| Living Mindmap badge "Live" to "Runs locally" | review | new `local` status in `projects.json`, rendered by `build.mjs` |
| Paluwagan copy: pre-written reminder templates, seeded payout draw | review | card, noscript list, case page |
| Lighthouse figures out of hub copy | review | cards and case pages. Return when CI measures them |
| "Now" line and "8 developers" out of the hero | review | `site.json` `now` empty; proof point swapped for the Paluwagan ledger figure. About unchanged (ADR 0008) |
| Slop figure 143 on the hub | done | already 143 on `main` |
| Section 9 ADRs (0009 to 0017) | review | branch `docs/show-your-work-adrs` |
| Cards never hidden by opacity | review | `style.css`, `main.js`. Above-fold and hash targets reveal at once |
| `src` comments beside home-page numbers | review | `source` on figures, `resultSource` per project, hero proof list by hand |
| Stale src: Slop 143, Paluwagan 53 (2026-10-28) | review | 150 and 42 notes removed |
| Slop diagram label, "Proves" lines, Work heading, shorter pitches | review | `projects.json`, regenerated |
| 44 px targets, 404 copy | review | wordmark, proof links, footer |
| About numbers cut | review | roles kept, owner decision 2026-10-28 |

## Release V1 — Wave 1

| Item | Status | Notes |
| --- | --- | --- |
| 0b: doorway bench fixtures `/lab/doorway/a/`, `/b/` | review | unlinked, noindex, not in the sitemap. DIRECTION 4.5 doorway, self-contained |
| 0b: `scripts/bench-doorway.mjs` | review | local Chromium 141: 20 of 20 each way, CLS 0, scroll and focus restored. WebKit not installed in the sandbox, skipped |
| 0b: `.github/workflows/doorway-bench.yml` | review | dispatch plus weekly. The real-host run and the Pages missing-path probe still wait for Actions after merge |
| 0b: gate result on github.io (ADR 0017) | todo | needs the workflow run |
