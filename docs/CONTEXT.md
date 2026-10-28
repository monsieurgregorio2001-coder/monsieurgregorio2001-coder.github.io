# Portfolio hub: Local context

Updated: 2026-10-20 (Asia/Manila).

## Implementation

Static HTML, CSS and vanilla JavaScript on GitHub Pages, served from `main` at the repository root. Every page is built on house 2.0.1 (`/house/2.0.1/`, same origin). `scripts/build.mjs` writes `index.html`, `404.html`, `colophon/`, `changelog/` and the generated blocks of `work/<slug>/index.html` from `projects.json`, `site.json`, `data/evidence/*.json` and the house tokens (ADR 0007, 0011, 0015), then runs `house-sync` (the hub is its own `HOUSE_DIR`, pinned by `house.lock.json`) and writes an `index.md` twin beside every page, `llms.txt`, `sitemap.xml` and `.nojekyll`. `hub.css` holds the hub's styles on house tokens, `field.js` the glyph field and headline decode (ADR 0005, 0012). Fonts come from the house folder. `assets/fonts/` stays only for the Open Graph script.

Evidence: `npm run evidence:pull` (in `scripts/`) snapshots each room's live `evidence.json` into `data/evidence/`. Slots such as `{{fig:paluwagan/ops}}` in `projects.json` and case pages render from those files, and a missing slot fails the build. `.github/workflows/evidence.yml` refreshes them every 6 hours through a "Refresh evidence" PR. `data/changelog.json` is refreshed from the sibling repositories' `origin/main` changelogs when they exist. `data/budgets.json` is written by `npm run budgets`. `scripts/posters.mjs` captures door posters into `assets/posters/` from room builds.

`house/` holds the shared house layer (ADR 0009, 0010). `house/src/` is the source, `house/MOTION.md` lists every animation, and `house/<x.y.z>/` is an immutable release written by `npm run house:release <x.y.z>` in `scripts/`. A released folder never changes: `scripts/check-house.mjs` compares it with its `manifest.json` and with `origin/main`. House 2.0.0 and 2.0.1 are released and the hub pages use 2.0.1. `scripts/check-links.mjs` skips `house/` and treats room paths as other repositories.

See the [README](../README.md) for setup, editing and screenshots.

## Current context

The October 15 polish release (hub ADRs 0001 to 0008, `docs/plan/2026-10-15-polish.md`) is live. A new portfolio-wide initiative started on 2026-10-20. Its direction and plan live in [the shared memory](portfolio/README.md) and [current state](portfolio/CURRENT-STATE.md). The resume link remains deferred (ADR 0008).

## Verification entry points

- `python3 scripts/check-docs.py` for docs and the registry. Add `--workspace` with the sibling projects present.
- `cd scripts && npm ci && npm run check` for the build diff, html-validate, copy lint, the 10-second gate, axe in both themes at 390 and 1440, internal links, house checks and budgets. This is what CI runs.
- `node scripts/shoot-foyer.mjs <dir> [paths]` for review screenshots at 360, 390, 1024 and 1440 in light, dark, Calm and JS off. Playwright needs Node 20 or newer.
- For UI changes, also review phone and desktop, keyboard and focus, reduced motion, and the case pages.

## Standalone checkout

Local facts are usable without sibling repositories. Sibling paths in docs are navigation aids for the full workspace.
