# Personal Portfolio (hub): audit slice

Pass 2, 2026-10-29. This project's slice of the [Pass 1 register](../pass-1-register.md), so this folder stands alone. Full evidence: [Agent A audit](../02-agent-a-brand-audit.md), [Agent B audit](../03-agent-b-ux-audit.md). Strategies: [brand](brand-strategy.md), [UX](ux-strategy.md). Severities are provisional until Garfield accepts them.

## Findings

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| B-PF-01 | Three of four door names truncated on desktop | High | OBSERVED | B | Resolved 2026-10-29, hub#24 |
| A-PF-04, B-PF-02 | Work section is a repeated dense label grid (4151 px at 390, target 3800) | High | OBSERVED | A, B | Open |
| A-PF-01 | Evidence shown as test-count tables, not engineering | High | OBSERVED | A | Open |
| A-PF-02 | Editorial-serif look, not developer or experimental | High | OBSERVED | A | Open |
| A-PF-03 | Thumbnails are miniature screenshots of the same house | High | OBSERVED | A | Open |
| A-PF-05 | "How I work" is three generic claims | Medium | OBSERVED | A | Open |
| A-PF-06 | Glyph field behind the H1 reads as texture | Medium | HYPOTHESIS | A | Open |
| A-PF-08 | Slogan cadence and portable lines in headings | Medium | OBSERVED | A | Open |
| B-PF-03 | Door to room is the slowest step (2301 ms local, cold) | Medium | OBSERVED (local) | B | Open |
| B-PF-04 | 600 ms clip reveal may swallow early taps | Medium | HYPOTHESIS | B | Open |
| A-PF-07 | Three link styles in the hero | Low | OBSERVED | A | Open |
| B-PF-05 | Chromium CLS 0.12 to 0.31 in room-to-room transitions | Low | OBSERVED (live, handover) | B | Open |
| B-PF-06 | Two primaries on the first phone screen go to PaperLab | Low | OBSERVED | B | Open |

A-PF-04 vs B-PF-02: A High, B Medium. Consolidated High because it is the hub's main content block and fails both the brand and the minimal-text principle.

Cross-cutting findings that also apply here: A-X-01 to A-X-05 and B-X-01 to B-X-04 (see the register). The root cause, DIRECTION.md principle 7, is addressed by the draft ADR in [06](../06-open-decisions.md).

## Strengths to preserve

The H1 "I build AI tools you can check." Plain first-person copy with no slop words. Honest labels ("Recorded demo"). Case pages at `/work/<room>/` (architecture diagram, "Chose X over Y because", "What this does not do"). First screen at 390 has 10 targets, all 44 px or larger. Back restores scroll and focus to the door. Menu closes on Esc and returns focus.

## Validation needs

- B-PF-03, B-X-01: live-host timings and cache headers
- B-PF-04: input during the doorway reveal
- B-PF-05: transition CLS trace
- A-PF-06: screen-record the glyph field
- Foundation gate: Plex Mono H1 sets in two lines at 360, 390, 1440 (joint call 5)
- Contrast and axe rerun after the new palette ships
