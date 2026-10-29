# Open decisions for the owner (Agent B draft)

Agent B, pass 2, 2026-10-29. Only decisions that are subjective, change scope, or are expensive to reverse. Everything else in the B strategies can be decided by the agents and recorded as proposed and reversible.

1. **Paluwagan audience: demo or product.** Is Paluwagan designed for real Filipino treasurers (user sessions with people aged 50 and over, Filipino copy reviewed by a native speaker, proof moved off the member path), or does it stay a portfolio demo whose main reader is a reviewer? This sets how far the member path is simplified and whether the proof toy leaves the room.
2. **Paluwagan backend.** Stay local-only (current) or plan a real backend later. A backend changes the cache policy to server-authoritative writes with idempotency and pending states. It is the most expensive choice to reverse.
3. **Return link to the hub.** One consistent "by Garfield Lim" link in every product (B and A agree), but its place (top or bottom) and whether the doorway animation is kept as the shared signature are owner calls, because the doorway was adopted as the portfolio's signature.
4. **PaperLabs lesson map.** Build the map now with one lesson, or wait until a second lesson is finished. Also confirms moving Attention to `/paperlab/attention/`.
5. **Slop media hosting.** If video ships, accept a separate media host (GitHub Pages limits) or keep video short and few. Affects cost and the "no third-party requests" rule.
6. **Supersede DIRECTION principle 7.** Approve a portfolio ADR that splits the house into a shared engineering layer and per-product identity. Agent A owns the visual side of this ADR. Agent B's boundary is in each ux-strategy file under "Component reuse and system boundaries".
