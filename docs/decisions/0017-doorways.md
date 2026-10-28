# ADR 0017: Doorways

Status: proposed by Claude on the owner's delegation, 2026-10-20. Reversible.
Date: 2026-10-20

## Context

Earlier transition ideas stretched text in snapshots and raced with Back navigation.

## Decision

Cross-document view transitions open each room with a clip-path reveal. The new root is the live page, revealed from the clicked door's rect over 600 ms on `--h-spring-smooth`. No text is ever a scaled snapshot. Leave reverses it, or crossfades if the door is less than half visible. Room to room is a 240 ms crossfade. Hub doors are static HTML with `rel=expect`, and each SPA room ships a static `#room-hero` shell, which fixes the back race. Calm uses a 160 ms crossfade.

The signature is bench-gated. On the deployed host, 20 navigations each way must pass 20 of 20 in Chromium and at least 19 of 20 in Playwright WebKit. On failure the signature is dropped by ADR and the 160 ms crossfade ships as the design.

## Consequences

- Phase 0b runs the bench before any room depends on it.
- Firefox gets normal navigation.
- See DIRECTION.md 4.5.

Source: `docs/portfolio/design/DIRECTION.md`, section 9.
