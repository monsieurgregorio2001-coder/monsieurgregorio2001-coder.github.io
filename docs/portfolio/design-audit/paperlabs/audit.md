# PaperLabs: audit slice

Pass 2, 2026-10-29. This project's slice of the [Pass 1 register](../pass-1-register.md), so this folder stands alone. Full evidence: [Agent A audit](../02-agent-a-brand-audit.md), [Agent B audit](../03-agent-b-ux-audit.md). Strategies: [brand](brand-strategy.md), [UX](ux-strategy.md). Severities are provisional until Garfield accepts them.

## Findings

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-PL-01 | No brand of its own, a tool page inside the house shell | Critical | OBSERVED | A | Open |
| A-PL-02 | Not visually rich, one diagram, no illustration language | High | OBSERVED | A | Open |
| A-PL-03 | Planned Recursive face not shipped, house Inter in use | High | OBSERVED | A | Open |
| A-PL-04 | Sidebar of cards and toggles reads as SaaS settings | High | OBSERVED | A | Open |
| A-PL-08, B-PL-01 | One lesson only, nothing to discover | Medium | OBSERVED | A, B | Open |
| A-PL-05 | "How this was built" and ADR lists on the learning page | Medium | OBSERVED | A | Open |
| A-PL-06 | "Receipt: not measured yet" on the built page | Medium | HYPOTHESIS | A | Closed 2026-10-29, not reproducible on live (evidence.json returns 200 on every room, joint calls) |
| A-PL-07 | Coral accent does every job | Medium | OBSERVED | A | Open |
| B-PL-02 | Two live regions speak on every keystroke | Medium | OBSERVED | B | Open |
| A-PL-09 | First chip is a jargon disclaimer | Low | OBSERVED | A | Open |
| B-PL-03 | Head rail tight at 390 | Low | OBSERVED | B | Open |
| B-PL-04 | Transformer chunk preloaded before first interaction | Low | OBSERVED | B | Open |
| B-PL-05 | No scrub gesture across the sentence | Medium (raised in Pass 2, A and B agreed: the signature interaction) | HYPOTHESIS | B | Open |

Cross-cutting findings that also apply here: A-X-01 to A-X-05 and B-X-01 to B-X-04 (see the register). The root cause, DIRECTION.md principle 7, is addressed by the draft ADR in [06](../06-open-decisions-draft-a.md).

## Strengths to preserve

Attention arcs over giant type. The callout "Without the scaling, 'sat' puts 97% of its attention on one word. With it, 79%." The invitation "Type a sentence. See what each word reads. Then break the math." No gamification. Fast input (max event 56 ms throttled). State in the URL by `replaceState`. Real radiogroup with roving tabindex. Tables mount only when opened. Truth label in the static shell.

## Validation needs

- Recursive upstream coverage of √, Σ, ≈ before adoption (joint call 4)
- B-PL-02: screen reader output with VoiceOver and NVDA
- B-PL-05: scrub against the iOS back swipe on a real device
- Marker second cues and wash contrast after implementation
