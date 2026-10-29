# Online Paluwagan: implementation roadmap

Pass 2, step 3, 2026-10-29. Agent B. Combines [brand-strategy.md](brand-strategy.md) (Agent A) and [ux-strategy.md](ux-strategy.md) (Agent B) under the [joint calls](../pass-2-joint-calls.md). Finding IDs refer to the [register](../pass-1-register.md). Proposed, not adopted. Repo: `paluwagan` (React 18, TypeScript, Vite, hash routes, localStorage). Stack stays.

Effort: S under a day, M one to three days, L more than three days. Every item is its own PR and can be reverted alone.

Phone profile for every budget: 390 x 844, 4x CPU, 1.6 Mbps, 150 ms RTT, live host, Chromium and WebKit, 3 runs, median reported.

## Phase 1: Foundation

Items OP-F1 to OP-F5 run on house 2.0.1 and need nothing from the house split. They fix the High accessibility and feedback defects now.

**OP-F1 · Unique dialog names** · S
- Rationale: B-OP-03 (screen readers hear the wrong member's name on approve).
- Areas: `src/ui/shared.tsx` (`ConfirmDialog`), `src/ui/ReminderInbox.tsx`, `src/ui/LedgerTab.tsx`.
- Prerequisites: none.
- Impact: High. Correct names on every confirmation.
- Acceptance: each open dialog's accessible name equals its visible heading for all 4 Risk tab cards and the payout dialog (Playwright accessibility snapshot). 0 duplicate ids on any route (axe `duplicate-id-aria` 0).

**OP-F2 · Announced result after every money write** · M
- Rationale: B-OP-02, B-OP-04, B-X-03.
- Areas: `src/ui/LedgerTab.tsx`, `src/ui/ReminderInbox.tsx`, new `src/ui/Result.tsx`.
- Prerequisites: none. Uses the shared result contract once house 3.0.0 ships (H-F4), drawn by Paluwagan.
- Impact: High. Users know the write happened.
- Acceptance: after record, arrears, reversal, payout and approve, a `role="status"` line appears within 100 ms naming member, amount with ₱ and centavos, and cycle. Focus is never on `<body>` after any of these actions (keyboard script). The line persists until the next action.

**OP-F3 · "Record a payment" opens the form** · M
- Rationale: B-OP-01, A-OP-03.
- Areas: `src/ui/App.tsx` (new route `#/g/<id>/record[/<member>]`), `src/ui/Hero.tsx`, `src/ui/LedgerTab.tsx` (form extracted to `src/ui/RecordForm.tsx`).
- Prerequisites: none.
- Impact: High. The primary job takes one screen.
- Acceptance: from group home, recording a payment takes 4 taps or fewer and 0 scrolls at 390 (Playwright count). Focus lands on Member on arrival. Row "Record" buttons open the same route with the member set.

**OP-F4 · Errors that stay true, and a confirmed reversal** · S
- Rationale: B-OP-05, B-OP-06.
- Areas: `src/ui/LedgerTab.tsx`.
- Prerequisites: OP-F2.
- Impact: Medium. No contradictions, consistent consequence model.
- Acceptance: any ledger change clears form errors (test). Reversal opens the same confirmation as payout, stating member, amount, cycle and effect. Reason still required.

**OP-F5 · Back keeps your place** · S
- Rationale: B-OP-09.
- Areas: `src/ui/App.tsx`.
- Prerequisites: none.
- Impact: Medium.
- Acceptance: group list, open group, Back restores scrollY within 10 px (Playwright). Forward navigation scrolls to top and moves focus to the H1.

**OP-F6 · Peso sign and tabular figures in the money face** · M
- Rationale: joint calls (₱ missing from house Inter 2.0.1 and from Atkinson Hyperlegible Next), A-OP-02, conflict 3.
- Areas: new `fonts/` in the paluwagan repo (joint call 1), a subset script in `scripts/`, `src/styles.css`.
- Prerequisites: owner accepts the passbook direction (decision 2 in 06). The glyph work itself is reversible.
- Impact: High. Every amount renders from the product face.
- Acceptance: the subset WOFF2 contains U+20B1 (fontTools cmap check in CI). A rendered check shows ₱ from the product face, not a fallback. Font file 80 KB or less. Every amount, the pot and the amount input use `font-variant-numeric: tabular-nums` (lint).

**OP-F7 · Move proof and process off the member path** · M
- Rationale: A-X-04, A-OP-03, A-OP-05, B-OP-07.
- Areas: `src/ui/App.tsx`, `src/ui/BooksToy.tsx`, `src/ui/Receipt.tsx`, `src/ui/GroupView.tsx`. A new route `#/how-it-checks` holds the books toy, forge a line and receipts.
- Prerequisites: PF-F6 (the hub case page carries the proof first).
- Impact: High. Member view shrinks toward 3 screens at 390.
- Acceptance: group home 4 screens or fewer at 390 (today 8.3). "Edit entry" no longer on member routes. The proof page is linked once from the footer.

## Phase 2: Core redesign

**OP-C1 · Migrate to house 3.0.0** · M
- Rationale: A-X-01 to A-X-03.
- Areas: `house.lock.json`, `index.html` markers, `vite.config.ts`.
- Prerequisites: H-F4 released, OP-F1 to OP-F5 merged.
- Impact: unblocks the brand.
- Acceptance: house contract (behaviour version) green. Live gate doorway pair hub and Paluwagan 20 of 20 Chromium, 19 of 20 WebKit, also while the hub is still on 2.0.1.

**OP-C2 · Passbook identity** · L
- Rationale: A-OP-01, A-OP-02, A-OP-06.
- Areas: `src/styles.css` (tokens on `:root`), `src/ui/Hero.tsx`, header and footer partials owned by the room.
- Prerequisites: OP-C1, OP-F6.
- Impact: High.
- Acceptance: A's palette ratios rechecked on the built page (ink 17.7 / 16.8, ink-2 10.3 / 11.6, states 6.3 or more). 18 px body, 20 px amounts, 44 px pot, 56 px buttons measured by probe. axe 0 at 390 and 1280, both themes. Fonts 80 KB or less.

**OP-C3 · New IA: Group home, Record, Passbook, Who owes** · L
- Rationale: B-OP-01, A-OP-05, ux-strategy IA.
- Areas: `src/ui/*`.
- Prerequisites: OP-F3, OP-F7.
- Impact: High.
- Acceptance: four routes. Each money action is one screen with one confirmation naming member, amount and cycle. 0 interactive elements below 48 px (probe).

**OP-C4 · Status pills** · S
- Rationale: A-OP-07, conflict 4, hue-only status colours (1.04:1 between them).
- Areas: `src/ui/shared.tsx` (`Badge`), icons as inline SVG.
- Prerequisites: OP-C2.
- Acceptance: pill 28 px tall, word 17 px, icon on every state. A greyscale screenshot still distinguishes every status.

**OP-C5 · Tablet and desktop layouts** · M
- Rationale: B-OP-08.
- Areas: `src/styles.css`.
- Prerequisites: OP-C3.
- Acceptance: at 820 two columns with trust cues on the left. At 1280 three regions. No horizontal overflow at 360 to 1440. Android font scale 1.3 keeps the primary button on screen.

**OP-C6 · Amount input** · S
- Rationale: B-OP-11.
- Areas: `src/ui/RecordForm.tsx`.
- Prerequisites: OP-F6.
- Acceptance: ₱ prefix in the field, money face at the figure's size, grouping on blur, `inputmode="decimal"`. Invalid input message names the fix.

**OP-C7 · Language** · M (only if the owner chooses bilingual)
- Rationale: A-OP-04.
- Acceptance: visible language switch, `lang` on every Filipino run, native-speaker review recorded before any user session.

## Phase 3: Polish

**OP-P1 · Confirming motion** · S
- Rationale: A "Recorded" stamp, B motion rules.
- Acceptance: the stamp and the new line animate only after the ledger write returns. 200 to 320 ms, no overshoot. Calm and reduced motion show the end state instantly. INP on confirm 150 ms or less.

**OP-P2 · Multi-tab consistency** · S
- Acceptance: a write in one tab updates the other within one `storage` event. No stale balance shown.

**OP-P3 · Empty and success illustrations** · S
- Acceptance: one SVG per state, 3 KB or less each, `aria-hidden` with text beside it.

**OP-P4 · Usability sessions** · M
- Acceptance: 3 to 5 treasurers aged 50 and over record and correct a payment unaided. Findings logged.

## Phase 4: Future expansion

**OP-E1 · Backend protocol** · L (owner decision)
- Acceptance before any build: a written protocol for idempotency keys, pending state and server confirmation. Never queue offline money movements.

## Cross-project dependencies

- OP-F7 waits for PF-F6 (proof on the hub case page).
- OP-C1 waits for H-F4 (house 3.0.0).
- OP-F2 adopts the shared result contract from H-F3 when it ships, without changing behaviour.
