# PaperLabs: implementation roadmap

Pass 2, step 3, 2026-10-29. Agent B. Combines [brand-strategy.md](brand-strategy.md) (Agent A) and [ux-strategy.md](ux-strategy.md) (Agent B) under the [joint calls](../pass-2-joint-calls.md). Finding IDs refer to the [register](../pass-1-register.md). Proposed, not adopted. Repo: `paperlab` (React 18, TypeScript, Vite). Stack stays. The public name (PaperLabs or PaperLab) is an owner decision.

Effort: S under a day, M one to three days, L more than three days. Phone profile: 390 x 844, 4x CPU, 1.6 Mbps, 150 ms RTT, live host, 3 runs, median.

## Phase 1: Foundation

**PL-F1 · One calm live region** · S
- Rationale: B-PL-02.
- Areas: `src/attention/App.tsx`.
- Prerequisites: none.
- Impact: Medium. Screen reader users can type.
- Acceptance: while typing 20 characters, the status region updates at most once after typing settles (about 400 ms) and on each discrete action. One `role="status"` on the page besides the house toast.

**PL-F2 · Recursive instances and maths glyphs** · M
- Rationale: A-PL-03, joint call 4.
- Areas: new `fonts/` and `scripts/subset-fonts.mjs` in the paperlab repo (joint call 1), `src/attention/room.css`.
- Prerequisites: none for the measurement. Adoption waits for owner acceptance of the notebook direction.
- Acceptance: three instances built from the upstream file: sans (CASL 0, MONO 0, wght 300 to 800), mono (MONO 1, wght 400 to 600), notes (CASL 1, slnt -8, wght 500). Sans plus mono 92 KB or less on first paint (measured plan 85 KB), notes loaded after LCP. A cmap check reports √, Σ and ≈. If missing, they render from a system maths font, recorded in the ADR 0010 follow-up.

**PL-F3 · Head rail fits at 390** · S
- Rationale: B-PL-03.
- Acceptance: no chip label touches its edge at 360 and 390 (probe overflow 0). Rail wraps or shortens labels.

**PL-F4 · Process blocks leave the lesson** · S
- Rationale: A-PL-05, A-X-04.
- Areas: `src/attention/Built.tsx`, `src/attention/Receipt.tsx`, `src/attention/App.tsx`.
- Prerequisites: PF-F6 (case page holds the proof).
- Acceptance: the lesson page ends with the paper source and a link to the case page. No dev-server wording in any empty state.

**PL-F5 · Truth label that welcomes** · S
- Rationale: A-PL-09.
- Acceptance: label still states real math, designed heads and toy size in the first screen. Wording from A, copy lint green.

## Phase 2: Core redesign

**PL-C1 · Migrate to house 3.0.0** · M
- Rationale: A-PL-01, A-X-01 to A-X-03.
- Prerequisites: H-F4, SE-C1 done (second product to move).
- Acceptance: house behaviour contract green. Doorway pair hub and PaperLabs 20 of 20 Chromium, 19 of 20 WebKit in both mixed-version states.

**PL-C2 · Annotated notebook identity** · L
- Rationale: A-PL-01, A-PL-02, A-PL-04, A-PL-07.
- Areas: `src/attention/room.css` (tokens on `:root`), `src/attention/*.tsx`, `index.html` shell.
- Prerequisites: PL-C1, PL-F2.
- Acceptance: A's palette ratios rechecked on the built page (ink 16.2 / 15.5, ink-2 7.3 / 8.3, markers 5.2 to 5.5 light, 7.85 to 9.38 dark). No marker-coloured text on its own wash (measured 3.85 to 4.12). Every marker meaning has a second cue (line style or shape), checked by a greyscale screenshot. axe 0 at 390 and 1280, both themes.

**PL-C3 · Scrub across the sentence** · M
- Rationale: B-PL-05 (raised to Medium with A).
- Areas: `src/attention/Sentence.tsx`.
- Prerequisites: PL-C2.
- Acceptance: pointer scrub selects words continuously, `touch-action: pan-y` on the sentence only, pointer capture with cancel on a second pointer. Tap and arrow keys reach every state. INP while scrubbing 100 ms or less. 3 dropped frames or fewer in a 2 s scrub at 4x CPU.

**PL-C4 · Per-device layouts** · M
- Rationale: ux-strategy responsive plan.
- Acceptance: 390 visual first with controls in thumb reach, 820 side by side in landscape, 1280 numbers as a side panel. No horizontal overflow 360 to 1440.

**PL-C5 · Lesson URL `/paperlab/attention/`** · S
- Prerequisites: owner choice on the map (B open decision 4).
- Acceptance: old links render the same lesson. Doorway target and live gate pair unchanged.

## Phase 3: Polish

**PL-P1 · Retargeted arcs and margin notes** · M
- Rationale: A's motion budget.
- Acceptance: arcs and notes on transform and opacity, retargeted from the current value, never queued during typing or scrubbing. Stroke reveals 400 ms or less. Calm shows them complete.

**PL-P2 · Copy link with toast** · S
- Acceptance: one press copies the URL state, a `role="status"` toast confirms, clipboard failure says so.

**PL-P3 · Lazy engine on lesson routes** · S
- Rationale: B-PL-04.
- Acceptance: map route JS 30 KB gz or less. Lesson LCP 2.2 s cold, 1.0 s warm.

## Phase 4: Future expansion

**PL-E1 · Lesson map (paper shelf)** · M
- Rationale: A-PL-08, B-PL-01.
- Prerequisites: a second finished lesson.
- Acceptance: map to lesson in 300 ms or less with a warm chunk. Chunk prefetch on hover or focus and at the end of a lesson, one request at a time, skipped on Save-Data.

**PL-E2 · Further labs from `src/labs/`** · L each
- Acceptance per lab: lesson budgets (120 KB JS gz, LCP 2.2 s), a finished state matrix, the case page updated. Worker only if a lesson measures an input event over 100 ms.

**PL-E3 · Progress and resume** · S
- Prerequisites: PL-E1.
- Acceptance: `paperlab.` localStorage keys in try/catch, the page works without them.

## Cross-project dependencies

- PL-C1 waits for H-F4 and follows SE-C1 in the migration order.
- PL-F4 waits for PF-F6.
- PF-C2 (hub doors) needs PL-C2 for the PaperLabs signature crop.
