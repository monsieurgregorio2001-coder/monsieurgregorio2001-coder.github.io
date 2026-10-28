# ADR 0012: Glyph hero kept and amended

Status: proposed by Claude on the owner's delegation, 2026-10-20. Reversible.
Date: 2026-10-20

## Context

The owner asked for the glyph hero (ADR 0005). WCAG 2.2.2 requires a pause control for motion longer than 5 seconds, and the field was dense on phones.

## Decision

The glyph hero stays as the ambient identity. Field, ripple, cursor glow, decode, and the 15 percent alpha guard all stay. Drift settles to a still frame within 5 s of load or the last input, so no pause control is needed. It stops when hidden or off screen. Calm draws one still frame. On phones the field draws behind eyebrow, H1, and lede only, at about 30 percent density, with ripple on tap. Order from noise is added: on door hover or focus, nearby glyphs snap into the room's ASCII vocabulary in its hue, then relax. It is off in Calm, 3 KB gz or less, and timeboxed to one day or cut.

This amends ADR 0005.

## Outcome (2026-10-28)

Order from noise shipped inside the one-day timebox. It adds about 1.2 KB gz to `field.js`, reads the vocabulary from `house.json`, takes the room hue from the house tokens, avoids cells under the headline, and is off in Calm. It was not cut.

## Consequences

- The doorway is the hub's signature. The glyph field is ambient.
- See DIRECTION.md 5.4.

Source: `docs/portfolio/design/DIRECTION.md`, section 9.
