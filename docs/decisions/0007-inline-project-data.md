# ADR 0007 — Inline project data at build time instead of fetching `projects.json`

Status: accepted
Date: 2026-10-15

## Context

`main.js` fetches `projects.json` after load. For four items this costs a round trip, shows "Loading projects." for a moment, and leaves the noscript path as a plain list rather than real cards. Search engines and link-preview bots see no cards.

## Decision

Keep `projects.json` as the single source of truth. Add `scripts/build.mjs` that renders the cards into `index.html` between `<!-- cards:start -->` and `<!-- cards:end -->` markers, and renders the case-page headers from the same data. The script runs before commit (documented in README and `CLAUDE.md`) and in CI as a check that the committed HTML matches the data.

`main.js` keeps only the reveal-on-scroll behaviour.

## Consequences

- Cards exist in the HTML: no loading state, works without JS, indexable.
- One more step when editing projects: run `node scripts/build.mjs`. CI fails if forgotten.
- ADR 0001's "no build step" is softened to "no build step required to view or deploy"; the script is a generator, not a bundler.

> Amended by ADR 0011 (proposed 2026-10-20).
