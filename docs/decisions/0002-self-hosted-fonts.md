# ADR 0002 — Self-hosted Fraunces, Inter and JetBrains Mono

Status: accepted (retroactive, documents the state at `3f90e8e`)
Date: 2026-10-14

## Context

The editorial look depends on a high-contrast serif for display, a neutral sans for body, and a mono for measured numbers. Google Fonts would add a third-party request, a privacy footprint, and a render-blocking round trip.

## Decision

Ship Latin subsets of Fraunces (variable optical size), Inter (variable weight) and JetBrains Mono (400, 500) as WOFF2 in `assets/fonts/`, under the SIL OFL, with `font-display: swap` and preloads for the two above-the-fold faces.

## Consequences

- 160 KB of fonts on first load, cached after.
- No external requests at all; the site works offline once cached.
- Any new weight or script must be subset and added by hand.
- JetBrains Mono is the voice of "measured things" on the site: numbers, code, and now the hero glyph field (ADR 0005).
