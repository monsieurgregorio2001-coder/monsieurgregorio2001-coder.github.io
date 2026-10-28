# ADR 0005 — Full-interactive glyph field behind the hero

Status: accepted
Date: 2026-10-15

## Context

The audit found the hero static and generic. The owner liked the ambient character field in the Claude desktop app (a sparse grid of glyphs with drifting density and a click ripple) and asked for the "full interactive" variant: field + ripple + the headline itself participating.

## Decision

A `<canvas>` sits behind the hero, drawing a sparse grid of JetBrains Mono glyphs whose density follows slow value noise. Three interactions:

1. **Ripple on click/tap.** A ring expands from the pointer at ~520 px/s, brightening, scrambling and nudging glyphs it passes. Up to six live ripples.
2. **Cursor glow.** A soft radius of raised density follows the pointer.
3. **Headline decode.** The `<h1>` renders as real text (for accessibility and SEO) but on first paint its characters are shown scrambled and resolve left-to-right into the final headline within ~1.1 s. A ripple that crosses the headline re-scrambles the letters it touches for ~300 ms; they re-resolve. Hovering a headline word scrambles and re-resolves it once.

Palette: `--muted` for the base glyphs at 10–40 % alpha, `--accent` for raised glyphs, in both themes. Font: JetBrains Mono 400 at 11 px on a 7 × 14 px cell.

Constraints:

- `prefers-reduced-motion: reduce` → static field, no ripple, headline shown resolved immediately.
- Touch devices get the ripple on tap; no glow.
- Frame budget: ≤ 4 ms per frame at 1440 × 900 on an M1 Air in Chrome; density update every third frame; glyph atlas pre-rendered once per theme.
- The field must not reduce headline contrast below AA: glyphs under the headline's bounding box are drawn at ≤ 15 % alpha.
- No library. ~250 lines of vanilla JS in `hero.js`, loaded `defer`.

## Alternatives considered

- Ambient only: safe but forgettable; rejected by owner.
- WebGL / shader: smoother at scale but heavier to maintain and overkill for a text grid.
- Pre-rendered video: no interaction, large asset, rejected.

## Consequences

- Adds ~8 KB of JS. No new fonts (JetBrains Mono already shipped).
- The OG image stays static; a separate screenshot of the resolved hero is used.
- The `Professionalism/portfolio/index.html` prototype is retired once this ships (see TRACKER).

> Amended by ADR 0012 (proposed 2026-10-20).
