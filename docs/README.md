# Docs map

This folder holds two scopes. The root README explains how to run the site.

## The hub site

Records about this website only.

| Path | What goes there |
| --- | --- |
| [plan/](plan/) | Implementation plans for the hub. One dated file per initiative. A plan is a contract: scope, phases, acceptance checks. |
| [decisions/](decisions/) | The hub's ADRs, numbered `0001` and up. Never edited after acceptance. A superseded ADR points to its replacement. |
| [audits/](audits/) | Dated reviews of the site with screenshots and ranked recommendations. |
| [TRACKER.md](TRACKER.md) | Live status of every planned hub item. |
| [CHANGELOG.md](CHANGELOG.md) | User-visible changes, newest first. |
| [CONTEXT.md](CONTEXT.md) | Local implementation facts for agents. |

## The whole portfolio

[portfolio/](portfolio/README.md) is the shared memory for the hub and every project: current state, the active cross-project plan and design direction, specs, cross-project ADRs (`ADR-0001` and up), the project registry, research and inspirations, journal and handovers.

## Conventions

- Dates are ISO (`2026-10-20`). Times are Asia/Manila.
- Numbers in copy come from a reproducible check. Record the command beside the number.
- A decision that changes the look of the site gets before and after screenshots.
- Plans are not rewritten after work starts. Progress goes in the tracker. A material change of course gets a new ADR.
- Private career material lives outside this public repository, in the workspace `_career/` folder.
