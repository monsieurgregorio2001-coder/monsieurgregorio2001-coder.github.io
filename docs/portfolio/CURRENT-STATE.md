# Current state

Updated: 2026-10-20 (Asia/Manila)

## Now

Garfield asked to finish the portfolio before the job search, with "the polish of Apple" and a willingness to "go a bit crazy", and delegated the whole portfolio to the agent ("do everything for the portfolio"). Job applications are parked. Their strategy and playbooks moved to the private workspace `_career/strategy/`.

The portfolio-finish initiative is in planning. Inputs gathered on 2026-10-20: hands-on audits of every project and the Five Rooms prototype, a live-route check of the public site, and web research on Apple's design language, standout portfolios, the web platform, tasteful experimental work, hiring signals, explainers and domain exemplars. A three-direction design panel is choosing the direction. The resulting direction and plan will be linked from [design/](design/README.md) and [plans/](plans/).

## What is live

| Surface | State |
| --- | --- |
| Hub | October 15 polish release (hub ADRs 0001 to 0008): glyph-field hero, featured PaperLab, four case pages at `/work/<slug>/`, CI with html-validate, axe and link checks |
| PaperLab | v1 live at `/paperlab/`. v2 "ladder" plan and tested maths kernels are open as PaperLab PRs #1 and #2 |
| Online Paluwagan | live at `/paluwagan/` |
| Living Mindmap | public repository, no hosted demo |
| Slop Editorial | live at `/slop-editorial/` |
| Five Rooms | local prototype only, not versioned |

## Known issues to fix in the initiative

- Hub: Living Mindmap card says Live without a hosted demo. Slop figure on the card (147 checks) matches neither its README (143 and 150) nor today's run (143).
- PaperLab: the attention view sits below the fold, and the coreference preset implies a pattern random weights cannot show. README still says the deploy workflow has not run.
- Paluwagan: desktop ledger table breaks words, phone schedule row is clipped, reminders quote the full contribution rather than the outstanding amount, and the AI boundary is hidden.
- Living Mindmap: phone map view is unusable, plain Tab is trapped, AI provenance and duplicate refusal are nearly invisible, and there is no hosted demo. Tests need Node 20 or newer.
- Slop Editorial: README check counts disagree, reduced-motion certificate page overflows, the 3D certificate reads weakly, and `npm run art` would overwrite the photographic set.

## Open owner decisions

Defaults are taken so work can continue. Each is reversible and logged in the direction's decisions log.

- Rename Living Mindmap to Kuru: not approved. Default: keep Living Mindmap.
- Public resume: deferred by the owner (hub ADR 0008). Default: keep deferred.
- About photo and career arc: deferred (hub ADR 0008).

## Structure

Shared documentation lives in this hub repository. Each project keeps local facts in `docs/CONTEXT.md` and agent rules in `AGENTS.md`. The private `_career/` workspace is outside every repository and is not backed up remotely. Five Rooms has no Git repository.
