# ADR 0009: The hub is the house

Status: proposed by Claude on the owner's delegation, 2026-10-20. Reversible.
Date: 2026-10-20

## Context

The Five Rooms prototype in `five-rooms-poc/` explored a shared house for all five sites. Research and audits converged on keeping one calm house layer and retiring the prototype into the real products.

## Decision

Five Rooms is retired into the products. The foyer becomes the hub. The Loom moves into PaperLab on the tested kernel. The passbook moves into the Paluwagan React app on its real domain layer. `house/v1` becomes `/house/2.0.0/`. `five-rooms-poc/` gets a README saying where each piece went. Its audit harness becomes the doorway bench and state-matrix tests. It is never deployed.

## Consequences

- The hub owns the house source at `house/src/`.
- Each room keeps its own tokens for its own content.
- See DIRECTION.md 5.8.

Source: `docs/portfolio/design/DIRECTION.md`, section 9.
