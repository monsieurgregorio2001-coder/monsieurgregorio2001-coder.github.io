# Portfolio hub: Local context

Updated: 2026-10-20 (Asia/Manila).

## Implementation

Static HTML, CSS and vanilla JavaScript on GitHub Pages, served from `main` at the repository root. `index.html` is the page. `projects.json` holds the project data, and `scripts/build.mjs` renders it into `index.html` and into the case pages at `work/<slug>/index.html` (ADR 0007). `hero.js` draws the interactive glyph field and the headline decode (ADR 0005). `main.js` only adds reveal on scroll. `style.css` holds the tokens and the base styles, `case.css` the case pages. `scripts/lib/chrome.mjs` holds the shared header, footer and case-page head. Fonts (Fraunces, Inter, JetBrains Mono) are self-hosted in `assets/fonts/`.

See the [README](../README.md) for setup, editing and screenshots.

## Current context

The October 15 polish release (hub ADRs 0001 to 0008, `docs/plan/2026-10-15-polish.md`) is live. A new portfolio-wide initiative started on 2026-10-20. Its direction and plan live in [the shared memory](portfolio/README.md) and [current state](portfolio/CURRENT-STATE.md). The resume link remains deferred (ADR 0008).

## Verification entry points

- `python3 scripts/check-docs.py` for docs and the registry. Add `--workspace` with the sibling projects present.
- `cd scripts && npm ci && npm run check` for the build diff, html-validate, axe in both themes at 390 and 1280, and internal links. This is what CI runs.
- `node scripts/shoot.mjs <dir>` for review screenshots. Playwright needs Node 20 or newer.
- For UI changes, also review phone and desktop, keyboard and focus, reduced motion, and the case pages.

## Standalone checkout

Local facts are usable without sibling repositories. Sibling paths in docs are navigation aids for the full workspace.
