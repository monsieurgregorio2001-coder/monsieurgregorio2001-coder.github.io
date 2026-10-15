# Portfolio hub

Source for the personal portfolio site of Garfield Greg Lim III, an Applied AI Engineer in Cebu, Philippines.

## Stack

Plain HTML, CSS, and a small amount of vanilla JavaScript. There is no build step needed to view or deploy, no framework, no tracking, and no cookies. Fonts are self-hosted in `assets/fonts/` under the SIL Open Font License.

## Structure

- `index.html` holds the page.
- `projects.json` holds the case card data. `scripts/build.mjs` renders it into `index.html`.
- `main.js` only adds the reveal-on-scroll effect.
- `style.css` holds the design tokens and styles, with a dark theme through `prefers-color-scheme`.
- `assets/shots/` holds the card crops (`<name>-hero`, 1600 by 1000, shot at 2x) and the older 1200 by 750 full shots, as WebP and PNG.
- `scripts/` holds the screenshot, Open Graph, and review tooling.

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

The script rewrites only what sits between `<!-- cards:start -->`/`<!-- cards:end -->` and `<!-- noscript:start -->`/`<!-- noscript:end -->` in `index.html`. Running it twice changes nothing. CI fails when the committed HTML does not match the data.

Each entry has `slug` (used for `id="work-<slug>"` and `/work/<slug>/`), `order` (card order, see ADR 0004), `featured` (true for the one lead project), `title`, `pitch`, `proves`, `problem`, `build`, `result`, `tags`, `image` (full shot), `cardImage` (2x crop), `imageAlt`, `demoUrl`, `demoLabel`, `repoUrl`, `status` (`live` or `coming-soon`), `screens` (for case pages, Phase 3) and, on the featured entry, `figures` (the large proof numbers). Every number in `figures` must appear in `result`; the build stops otherwise. Leave `problem`, `build`, and `result` empty for a coming-soon card.

## Refreshing screenshots

```
cd scripts
npm install
node capture.mjs            # 1200x750 full shots
node capture.mjs --crop     # 1600x1000 hero crops at 2x (PNG <= 200 KB)
node og.mjs
```

`capture.mjs` expects clones of paperlab, paluwagan, mindmap-mcp and slop-editorial (with `npm ci` run in each) next to this repo, or in `PORTFOLIO_DIR`. It uses Playwright's Chromium; set `CHROME` to use another browser.

It builds the projects into a temporary folder and never touches their source trees. Rerun it whenever those projects change.

## Checks

CI (`.github/workflows/check.yml`) runs on every push and pull request with Node 22:

1. `node scripts/build.mjs`, then `git diff --exit-code` (committed HTML matches `projects.json`).
2. `html-validate index.html 404.html` (rules in `.htmlvalidate.json`).
3. `scripts/check-axe.mjs` serves the repo and runs axe-core on `/` in light and dark, at 390 and 1280 px. Any violation fails.
4. `scripts/check-links.mjs` checks that every internal `href`, `src` and `srcset` resolves to a file. External links get a HEAD request and only warn. Links to `/work/` pages warn until Phase 3 builds them.

Run them locally:

```
cd scripts
npm ci
npm run check
node shoot.mjs ../docs/audits/shots/<phase>   # review screenshots and page weight
```

## License

MIT. See `LICENSE`. Font licenses are in `assets/fonts/`.
