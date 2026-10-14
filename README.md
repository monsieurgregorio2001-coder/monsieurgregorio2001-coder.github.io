# Portfolio hub

Source for the personal portfolio site of Garfield Greg Lim III, an Applied AI Engineer in Cebu, Philippines.

## Stack

Plain HTML, CSS, and a small amount of vanilla JavaScript. There is no build step, no framework, no tracking, and no cookies. Fonts are self-hosted in `assets/fonts/` under the SIL Open Font License.

## Structure

- `index.html` holds the page.
- `projects.json` holds the case card data, which `main.js` renders.
- `style.css` holds the design tokens and styles, with a dark theme through `prefers-color-scheme`.
- `assets/shots/` holds the card screenshots as 1200 by 750 WebP and PNG.
- `scripts/` holds the screenshot, Open Graph, and review tooling.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. The page must be served over HTTP because it loads `projects.json` with `fetch`.

## Editing projects

Edit `projects.json`. Each entry has `title`, `pitch`, `proves`, `problem`, `build`, `result`, `tags`, `image`, `imageAlt`, `demoUrl`, `demoLabel`, `repoUrl`, and `status` (`live` or `coming-soon`). Leave `problem`, `build`, and `result` empty for a coming-soon card.

## Refreshing screenshots

```
cd scripts
npm install
node capture.mjs
node og.mjs
```

`capture.mjs` builds PaperLab and Paluwagan into a temporary folder and captures them with headless Chrome. Rerun it whenever those projects change.

## License

MIT. See `LICENSE`. Font licenses are in `assets/fonts/`.
