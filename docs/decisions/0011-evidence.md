# ADR 0011: Evidence through evidence.json and typed slots

Status: proposed by Claude on the owner's delegation, 2026-10-20. Reversible.
Date: 2026-10-20

## Context

Figures on the hub went stale or could not be reproduced, such as the unverified Lighthouse scores and README byte claims.

## Decision

Each room's CI writes `evidence.json`, served at `/<room>/evidence.json`. The hub reads evidence only through typed slots such as `{{fig:paluwagan/ops}}`. `npm run evidence:pull` snapshots each room's live file into `data/evidence/<room>.json`, and `build.mjs` renders the slots. A missing slot renders "not measured yet" and fails CI. A scheduled hub workflow pulls every 6 hours and opens a "Refresh evidence" PR. Tests and evals render as separate rows.

This amends ADR 0003 and ADR 0007. The ADR 0003 Result figure comes from a slot. Project data in `projects.json` no longer carries measured figures by hand.

## Consequences

- No stale or invented figures reach `main`.
- Figures no CI step produces leave all copy.
- Room deploys never wait on the hub.
- See DIRECTION.md 4.4.

Source: `docs/portfolio/design/DIRECTION.md`, section 9.
