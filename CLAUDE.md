# Portfolio hub — conventions

This is the personal portfolio of Garfield Greg Lim III at https://monsieurgregorio2001-coder.github.io/. Plain HTML, CSS and vanilla JS on GitHub Pages. Read `docs/README.md` for where things are recorded and `docs/TRACKER.md` for what is in flight.

## Stack rules

- No framework, no bundler, no runtime dependencies. `scripts/` may use Node for tooling only (screenshots, OG images, the card generator).
- `projects.json` is the single source of truth for project data. After editing it run `node scripts/build.mjs` and commit the regenerated HTML. CI fails if they differ.
- Fonts are self-hosted in `assets/fonts/` under the OFL. Do not add Google Fonts or any third-party request.
- No analytics, no cookies, no tracking.

## Copy rules

- Voice: first person, plain, specific. Short sentences. No "passionate", "leverage", "cutting-edge".
- Every project `result` carries at least one measured number. A number must trace to a command, test run or tool output, and the source is recorded in an HTML comment beside it on case pages (`<!-- src: npm test, 2026-10-14, 19 passing -->`).
- Project card order and the flagship are decided in ADR 0004; do not reorder without a new ADR.
- Headline and OG copy change together.

## Design rules

- Tokens live in `:root` in `style.css`. New colours go there first; no hex values in component rules.
- Both themes, three widths (390, 820, 1280). Nothing visual merges without screenshots in the PR.
- `prefers-reduced-motion: reduce` must leave the page fully usable and intentional-looking.
- Numbers in running text are wrapped in `.num` (JetBrains Mono, tabular).
- Hover and transition timings: 180 ms ease-out for state changes; 200 ms for reveals. Nothing longer than 1.2 s anywhere.

## Process rules

- One phase of the current plan per branch and PR. Name branches `phase-N/short-name`.
- Every PR updates `docs/TRACKER.md` and adds a line to `docs/CHANGELOG.md` under Unreleased.
- A decision that changes structure, stack or the look gets an ADR in `docs/decisions/` (next number, short, dated).
- Before pushing: `node scripts/build.mjs && git diff --exit-code` (once Phase 2 lands), then the screenshot script, then axe.

## Checks

```
cd scripts && npm install
node build.mjs                 # regenerate cards (Phase 2+)
node shoot.mjs ../docs/audits/shots/<phase>   # review screenshots
```

CI runs html-validate, axe on `/` in both themes, and a link check on every push.
