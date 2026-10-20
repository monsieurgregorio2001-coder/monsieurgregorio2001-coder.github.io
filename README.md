# Portfolio hub

Source for the personal portfolio site of Garfield Greg Lim III, an Applied AI Engineer in Cebu, Philippines.

## Start here

- [Docs map](docs/README.md): where plans, decisions, audits, the tracker and the shared portfolio memory live.
- [Contribution conventions](CONTRIBUTING.md) and [agent conventions](CLAUDE.md): copy, design, process and checks.
- [Agent context](docs/CONTEXT.md): local implementation facts.

## Stack

Plain HTML, CSS, and a small amount of vanilla JavaScript. There is no build step needed to view or deploy, no framework, no tracking, and no cookies. Fonts are self-hosted in `assets/fonts/` under the SIL Open Font License.

## Structure

- `index.html` holds the page.
- `projects.json` holds the case card data. `scripts/build.mjs` renders it into `index.html`.
- `main.js` only adds the reveal-on-scroll effect.
- `style.css` holds the design tokens and styles, with a dark theme through `prefers-color-scheme`.
- `work/<slug>/index.html` holds one case-study page per project (ADR 0006), styled by `style.css` plus `case.css`.
- `scripts/lib/chrome.mjs` holds the shared header, footer and case-page `<head>`.
- `assets/shots/<slug>/` holds the case-page detail crops; `assets/og/<slug>.png` the case-page Open Graph images.
- `assets/shots/` holds the card crops (`<name>-hero`, 1600 by 1000, shot at 2x) and the older 1200 by 750 full shots, as WebP and PNG.
- `scripts/` holds the build, screenshot, Open Graph, review and documentation-check tooling.
- `docs/` holds the hub's plans, decisions, audits, tracker and changelog; `docs/portfolio/` holds the shared memory for all portfolio projects.
- `.github/` holds the site and documentation CI and the pull request template.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. The cards are plain HTML, so opening `index.html` directly also works.

## Editing projects

Edit `projects.json`, then regenerate the Work section and commit both files:

```
node scripts/build.mjs
```

The script rewrites only what sits between marker pairs: `header`, `cards`, `noscript` and `footer` in `index.html`, and `head`, `header`, `case-head`, `screens`, `case-nav` and `footer` in each `work/<slug>/index.html`. Running it twice changes nothing. CI fails when the committed HTML does not match the data.

Each entry has `slug` (used for `id="work-<slug>"` and `/work/<slug>/`), `order` (card order, see ADR 0004), `featured` (true for the one lead project), `title`, `pitch`, `proves`, `problem`, `build`, `result`, `tags`, `image` (full shot), `cardImage` (2x crop), `imageAlt`, `demoUrl`, `demoLabel`, `repoUrl`, `status` (`live` or `coming-soon`), `screens` (case-page screenshots, `{file, alt, caption}`, `file` without extension) and, on the featured entry, `figures` (the large proof numbers). Every number in `figures` must appear in `result`; the build stops otherwise. Leave `problem`, `build`, and `result` empty for a coming-soon card.

## Adding a case page

1. Copy `work/paperlab/index.html` to `work/<slug>/index.html`, where `<slug>` matches the entry in `projects.json`.
2. Keep the marker pairs (`head`, `header`, `case-head`, `screens`, `case-nav`, `footer`) and write the prose between them in the ADR 0006 order: Problem, Approach, Architecture, Decisions, Results, Screens, What I'd do next.
3. Every number gets a source comment beside it, for example `<!-- src: paperlab/README.md "Tests and measured results", 2026-10-14 -->`. No source, no number.
4. Draw the architecture as one inline SVG with at most eight boxes, using the `.box`, `.box.hl`, `.edge`, `.lbl` and `.sub` classes from `case.css`, so it follows the theme.
5. Add 2 to 4 detail crops under `details` in `scripts/capture.mjs`, run `node capture.mjs --detail <slug>`, and list them in the entry's `screens`.
6. Run `node scripts/build.mjs` (fills the markers), `node scripts/og.mjs <slug>`, add the URL to `sitemap.xml`, then the checks below.

## Refreshing screenshots

```
cd scripts
npm install
node capture.mjs            # 1200x750 full shots
node capture.mjs --crop     # 1600x1000 hero crops at 2x (PNG <= 200 KB)
node capture.mjs --detail   # case-page detail crops, assets/shots/<slug>/NN-name
node og.mjs                 # hub and per-project Open Graph images
```

`capture.mjs` expects clones of paperlab, paluwagan, mindmap-mcp and slop-editorial (with `npm ci` run in each) next to this repo, or in `PORTFOLIO_DIR`. It uses Playwright's Chromium; set `CHROME` to use another browser.

It builds the projects into a temporary folder and never touches their source trees. Rerun it whenever those projects change.

## Checks

CI (`.github/workflows/check.yml`) runs on every push and pull request with Node 22:

1. `node scripts/build.mjs`, then `git diff --exit-code` (committed HTML matches `projects.json`).
2. `html-validate index.html 404.html work/*/index.html` (rules in `.htmlvalidate.json`).
3. `scripts/check-axe.mjs` serves the repo and runs axe-core on `/` and every case page in light and dark, at 390 and 1280 px. Any violation fails.
4. `scripts/check-links.mjs` checks that every internal `href`, `src` and `srcset` resolves to a file. External links get a HEAD request and only warn.

Run them locally:

```
cd scripts
npm ci
npm run check
node shoot.mjs ../docs/audits/shots/<phase>   # review screenshots and page weight
node shoot.mjs ../docs/audits/shots/<phase> /work/<slug>/   # case pages, full page
```

## License

MIT. See `LICENSE`. Font licenses are in `assets/fonts/`.
