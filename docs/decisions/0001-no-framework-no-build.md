# ADR 0001 — Plain HTML, CSS and JS; no framework, no build step

Status: accepted (retroactive, documents the state at `13640e3`)
Date: 2026-10-14

## Context

The hub is a single page with four case cards, an about block and a contact block. It needs to load fast on a phone in the Philippines, be editable in any text editor, and stay deployable on GitHub Pages with zero configuration.

## Decision

Author the site as static HTML, one CSS file and one small vanilla JS file. No bundler, no framework, no CSS preprocessor, no analytics. Project data lives in `projects.json` and is rendered by `main.js`.

## Consequences

- Deploy is `git push`. Nothing to install to edit copy.
- First load is ~350 KB including fonts and screenshots; no JS framework cost.
- Interactive features (the hero field, case pages) must be written by hand. That is acceptable at this size.
- Case-study pages (ADR 0006) are additional static HTML files, not routes.
- Reconsidered in ADR 0007: the client-side fetch of `projects.json` is being replaced with build-time inlining via a tiny Node script, which keeps "no framework" but adds one optional script to run before commit.
