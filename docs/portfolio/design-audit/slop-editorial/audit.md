# Slop Editorial: audit slice

Pass 2, 2026-10-29. This project's slice of the [Pass 1 register](../pass-1-register.md), so this folder stands alone. Full evidence: [Agent A audit](../02-agent-a-brand-audit.md), [Agent B audit](../03-agent-b-ux-audit.md). Strategies: [brand](brand-strategy.md), [UX](ux-strategy.md). Severities are provisional until Garfield accepts them.

## Findings

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-SE-01 | Sterile gallery frame, only the images carry the camp | High | OBSERVED | A | Open |
| A-SE-02 | Wordmark is a weight change, not a masthead | High | OBSERVED | A | Open |
| A-SE-03 | All images share one model look, no art direction | High | OBSERVED | A | Open |
| A-SE-04 | Weakest image leads as hero | High | OBSERVED | A | Open |
| A-SE-09, B-SE-04 | No layout or architecture for future video, games, long-form | Medium | HYPOTHESIS | A, B | Open |
| A-SE-05 | Release tracker styled as a product dashboard | Medium | OBSERVED | A | Open |
| A-SE-06 | Mono metadata block pushes the caption joke below the fold | Medium | OBSERVED | A | Open |
| A-SE-07 | Fake counters may read as dark pattern | Medium | HYPOTHESIS | A | Open |
| A-SE-10 | Tagline is stock AI cadence | Medium | OBSERVED | A | Open |
| B-SE-01 | Works index cold LCP 3520 ms throttled (local) | Medium | OBSERVED (local) | B | Open |
| A-SE-08 | Caps mono room toggles feel like a dev HUD | Low | OBSERVED | A | Open |
| B-SE-02 | Parody cookie banner returns on every client navigation | Low | OBSERVED | B | Open |
| B-SE-03 | "Approval queue" link 109 x 17 px | Low | OBSERVED | B | Open |

A-SE-09 vs B-SE-04: A Medium, B Low. Consolidated Medium because the system must be designed with these media in mind before it is rebuilt, or each becomes another skin.

Cross-cutting findings that also apply here: A-X-01 to A-X-05 and B-X-01 to B-X-04 (see the register). The root cause, DIRECTION.md principle 7, is addressed by the draft ADR in [06](../06-open-decisions-draft-a.md).

## Strengths to preserve

The concepts (Tokenmaxxer, Certificate of Human Touch, Delve tapestry, "Certainly!") and the dry caption voice. The honesty footer. Near-instant repeat visits via service worker. Quick in-room navigation with scroll restored. Touch-aware intent prefetch. Service worker scoped and never caches `evidence.json`. Previous, Index, Next on every work.

## Validation needs

- B-SE-01: works index LCP on the live host
- A-SE-07: whether fake counters read as satire, a few unbriefed readers
- B-SE-02: banner persistence intent (owner)
- Six-finger joke legible at 480 px after the re-crop
- Media host before any video (owner decision)
- Font total at or under 129 KB in a built page
