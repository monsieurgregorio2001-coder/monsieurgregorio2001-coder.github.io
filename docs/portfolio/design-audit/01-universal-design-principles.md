# Universal design principles

Pass 1 consolidation, 2026-10-29. These are the owner's mandatory principles for all four projects (hub, PaperLab, Slop Editorial, Online Paluwagan). Each is stated so it can be tested. Garfield owns them. Nothing here is a design proposal.

## 1. McMaster-Carr speed, without its density

- Every press gives visible feedback within 100 ms on a 4x throttled phone.
- Warm navigation shows useful content with no blank flash and no needless spinner.
- Cold loads stay inside the DIRECTION section 8 budgets (LCP, CLS, INP) on the live host, per route, not only per home page.
- Speed never comes from packing the screen. A first screen offers one clear primary task and few choices (Hick index is measured, not guessed).

Test: tap-to-useful-content timings, cold and warm, on the live host. Count primaries and targets on the first screen at 390.

## 2. Minimal text and progressive disclosure

- The first screen says what the product is and what to do, in a few words.
- Detail (commands, process notes, raw numbers) sits one deliberate step away, in a drawer, a case page or a "show more".
- Disclosure never hides errors, consequences, labels or accessible names.

Test: page height in screens at 390, words above the fold, and whether every hidden item is reachable by keyboard and named.

## 3. Apple polish and physicality

- Motion is spring based, interruptible and never locks input.
- A gesture follows the finger and has a visible or keyboard equivalent.
- Press, release, loading, success and error states exist for every control that does something.
- `prefers-reduced-motion: reduce` and Calm mode leave a complete page. Anything moving longer than 5 seconds has a pause.

Test: tap during a transition, gesture with keyboard only, reduced-motion screenshots, a state inventory per control.

## 4. Combined philosophy

Fast like a catalogue, quiet like a well-edited page, tactile like a native app. When they conflict: correctness, then speed, then clarity, then ornament.

## 5. Additional priorities

- Accessibility at WCAG 2.2 AA is a release gate, not polish.
- Honesty: every number has a source, demo data and simulated actions are labelled.
- Distinct brands: each product looks and sounds like itself (see [cross-project differentiation](04-cross-project-differentiation.md)).
- Responsive layouts are conceived per device class (390, 820, 1280), not scaled.
- No tracking, no third-party requests, self-hosted fonts.

## How the Gorges Native UX safeguards apply

| Safeguard | Hub | PaperLab | Slop Editorial | Paluwagan |
| --- | --- | --- | --- | --- |
| Measure cold and warm separately before changing anything | Door to room timing | Lesson input timing | Works index cold load | Ledger journeys |
| Immediate local feedback, never fake completion | Copy and drawer actions | Live readout | Rating and spend cap | Every money write confirms from the ledger itself |
| Predictive work is bounded, read-only | Door prefetch | Per-lab chunks | Intent prefetch, service worker | Never prefetch or speculate a write |
| Restore place after a route or sheet | Back to door (works) | URL state | Back restores scroll (works) | Focus and list scroll after actions (gaps) |
| Financial values and approvals are correctness-sensitive | Not applicable | Not applicable | Not applicable | Highest bar: confirm, announce, state member, amount and cycle |
| Minimal text without hiding consequences | Work section receipts | Process blocks | Metadata blocks | Demo and process sections on the member view |
| Every gesture has a button | Hover glyph field | Any future scrub | Any future game input | No gestures for money, by design |
| No service worker or stack change without a demonstrated problem | Applies | Applies | Already justified | Applies |

The skill's "implement when requested" clause is out of scope for this audit. Nothing is deployed from it.
