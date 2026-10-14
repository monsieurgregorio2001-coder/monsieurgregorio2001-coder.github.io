# Portfolio hub

Source for the personal portfolio site of Garfield Greg Lim III, an Applied AI Engineer in Cebu, Philippines.

## Stack

Plain HTML, CSS, and a small amount of vanilla JavaScript. There is no build step, no framework, no tracking, and no cookies.

## Structure

- `index.html` holds the page.
- `projects.json` holds the project card data, which `main.js` renders.
- `style.css` holds the styles, with a dark theme through `prefers-color-scheme`.
- `assets/` holds the social preview image.

## Preview locally

```
python3 -m http.server 8000
```

Then open http://localhost:8000. The page must be served over HTTP because it loads `projects.json` with `fetch`.

## Editing projects

Edit `projects.json`. Each entry has `title`, `pitch`, `proves`, `tags`, `demoUrl`, `repoUrl`, and `status` (`live` or `coming-soon`). Set a link to `null` to hide or disable it.

## License

MIT. See `LICENSE`.
