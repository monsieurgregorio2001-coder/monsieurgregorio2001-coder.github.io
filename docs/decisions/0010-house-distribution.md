# ADR 0010: House distribution by immutable versions

Status: proposed by Claude on the owner's delegation, 2026-10-20. Reversible.
Date: 2026-10-20

## Context

Five sites share one origin and one house layer. One deploy must not break five sites. GitHub Pages caching and Slop's service worker also shape how shared files are served.

## Decision

`npm run house:release 2.0.0` writes the immutable folder `/house/2.0.0/`. Released folders are never edited, and hub CI enforces it. Fixes ship as `2.0.1`. There is no mutable `/house/v2/` alias. Each room commits `house.lock.json` and pins a version. `npm run house:sync` verifies hashes and injects partials at build. Drift fails CI. Rooms link `/house/2.0.0/` by absolute same-origin path. Upgrades are released, smoke-tested against all four rooms from hub CI, tagged, then bumped by each room in its own PR.

## Consequences

- One cached copy of house CSS and fonts serves all five sites.
- A room must stay readable if house CSS fails.
- See DIRECTION.md 4.2.

Source: `docs/portfolio/design/DIRECTION.md`, section 9.
