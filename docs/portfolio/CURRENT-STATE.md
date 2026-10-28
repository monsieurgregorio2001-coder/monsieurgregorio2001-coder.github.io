# Current state

Updated: 2026-10-28 (Asia/Manila)

## Now

Release V1, the Show Your Work launch, is built and waiting for the live gate and the owner checklist. The hub headline is "I build AI tools you can check." (hub ADR 0013). Living Mindmap is frozen at its wave 3 state. Gorges replaces it after V1, with its own plan and room. Handover: [2026-10-28 Release V1](handovers/2026-10-28-release-v1.md). Plan: [Release V1](plans/2026-10-28-release-v1.md). Direction: [Show Your Work](design/DIRECTION.md).

Job applications are parked. Their strategy and playbooks live in the private workspace `_career/strategy/`.

## What is live

All five sites run on house 2.0.1 (`/house/2.0.1/`, with 2.0.0 untouched beside it). Each room has one proof toy, a receipt, and a CI-written `evidence.json` that the hub reads into its figures.

| Surface | State |
| --- | --- |
| Hub | Foyer with four doors, receipts, case pages, colophon, changelog, 404, `llms.txt` and plain-text twins. Launch headline. Doorways between sites. Order from noise on the doors |
| PaperLab | `/paperlab/`: Attention toy, honest heads, break the math. v1 at `/paperlab/legacy/` |
| Online Paluwagan | `/paluwagan/`: check the books, forge a line, reminder inbox with a rubric eval |
| Slop Editorial | `/slop-editorial/`: spend cap toy with parity fixtures |
| Living Mindmap | `/mindmap-mcp/`: Recorded demo, scripted agent session, Ask the guard. Frozen, no more polish |
| Five Rooms | local prototype only, not versioned |

Evidence pipeline: each room's CI writes `evidence.json`, the "Refresh evidence" workflow runs `npm run evidence:pull` and opens a PR, and `build.mjs` fails on any empty slot.

## Known follow-ups

- Foyer page length at 390 is 4,207 px against the 3,800 px target.
- Inter re-cut with the peso sign (U+20B1). Recursive face for PaperLab.
- Firefox and WebKit findings from the live gate, to be added by the lead.
- Gorges plan and room, then retire the Living Mindmap room.

## Open owner decisions

Defaults are taken so work can continue. Each is reversible and logged in the direction's decisions log.

- Rename Living Mindmap to Kuru: not approved. Default: keep Living Mindmap.
- Public resume: deferred by the owner (hub ADR 0008). Default: keep deferred.
- About photo and career arc: deferred (hub ADR 0008).

## Structure

Shared documentation lives in this hub repository. Each project keeps local facts in `docs/CONTEXT.md` and agent rules in `AGENTS.md`. The private `_career/` workspace is outside every repository and is not backed up remotely. Five Rooms has no Git repository.
