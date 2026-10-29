# Online Paluwagan: audit slice

Pass 2, 2026-10-29. This project's slice of the [Pass 1 register](../pass-1-register.md), so this folder stands alone. Full evidence: [Agent A audit](../02-agent-a-brand-audit.md), [Agent B audit](../03-agent-b-ux-audit.md). Strategies: [brand](brand-strategy.md), [UX](ux-strategy.md). Severities are provisional until Garfield accepts them.

## Findings

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-OP-01 | Brand is a portfolio demo, not a product users would trust | High | OBSERVED | A | Open |
| A-OP-03 | Demo and dev sections make a 7000 px phone page | High | OBSERVED | A | Open |
| B-OP-01 | "Record a payment" lands above the form, focus on body | High | OBSERVED | B | Open |
| B-OP-02 | Recording a payment gives no confirmation | High | OBSERVED | B | Open |
| B-OP-03 | Confirm dialogs share one id and announce the wrong member | High | OBSERVED | B | Open |
| A-OP-02 | Fraunces for group names and pot total feels literary | Medium | HYPOTHESIS (on user effect) | A | Open |
| A-OP-04 | Mixed language register | Medium | OBSERVED | A | Open |
| A-OP-05 | Jargon: "Check the books", "Forge a line", "Risk" tab | Medium | OBSERVED | A | Open |
| A-OP-06 | Donut is the only visual, no warmth or community cue | Medium | OBSERVED | A | Open |
| A-OP-08 | Receipt shows "not measured yet" four times | Medium | HYPOTHESIS | A | Closed 2026-10-29, not reproducible on live (evidence.json returns 200 on every room, joint calls) |
| B-OP-04 | Focus drops to body after reversing or approving | Medium | OBSERVED | B | Open |
| B-OP-05 | Stale error stays after the situation changes | Medium | OBSERVED | B | Open |
| B-OP-06 | Reversal has the lightest confirmation | Medium | OBSERVED | B | Open |
| B-OP-07 | "Edit entry" button always refuses | Medium | OBSERVED | B | Open |
| B-OP-08 | Tablet layout is a widened phone | Medium | OBSERVED | B | Open |
| B-OP-09 | In-app Back always lands at the top | Medium | HYPOTHESIS | B | Open |
| A-OP-07 | Status dot and word are small for the audience | Low | OBSERVED | A | Open |
| B-OP-10 | "See all 25 lines" link 181 x 17 px | Low | OBSERVED | B | Open |
| B-OP-11 | Amount field format differs from displayed money | Low | OBSERVED | B | Open |

A-OP-02 spot-check: `paluwagan/src/styles.css` sets `.display` (group name) and `.dial-pot` (pot total) in the house display face (Fraunces). Ledger and passbook amounts use the body face with tabular figures. So A and B are each right about different numbers.

Cross-cutting findings that also apply here: A-X-01 to A-X-05 and B-X-01 to B-X-04 (see the register). The root cause, DIRECTION.md principle 7, is addressed by the draft ADR in [06](../06-open-decisions.md).

## Strengths to preserve

Clear first screen with the demo truth chip up front, large pot, two labelled actions. "Passbook" metaphor. Peso sign and centavos always. Consequences stated before commit. Duplicates refused with a plain reason. Reversal needs a reason. Native `<dialog>` with focus trap. Badges pair dot with text. "Check the books" responds in one press. No gestures for money. Best product-like layout at 1024.

## Validation needs

- Three to five sessions with treasurers aged 50 and over, English and Filipino: A-OP-02, A-OP-04, A-OP-05, A-OP-07, B-OP-07
- Real devices, WebKit, 200 percent zoom and Android font scale 1.3
- B-OP-03: screen reader check of dialog names
- Rendered check that ₱ comes from the Atkinson subset, and tabular figures on every amount
- Filipino copy native review if bilingual (owner decision)
