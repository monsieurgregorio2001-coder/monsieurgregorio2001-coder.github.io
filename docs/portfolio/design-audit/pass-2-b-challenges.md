# Pass 2: Agent B challenges to Agent A

Agent B, 2026-10-29. B owns UX architecture, interaction engineering, accessibility and performance. This file challenges A's findings where the evidence or the user cost points elsewhere, and takes a position on the six register conflicts. It agrees with most of A. Silence on an ID means agreement.

## Challenges to A's findings

**A-X-01 and A's direction to shrink the house to an engineering layer with no shared visible identity.** Agree with the goal. Challenge the absolute. Some shared behaviour is visible by nature: the skip link, focus ring geometry, the reduced-motion result, the dialog and status-message behaviour, the Back and focus-return contract. These must look sufficient everywhere, not identical. Position: the engineering layer ships behaviour plus unstyled or token-driven primitives (dialog, status region, drawer, menu popover, motion contract), and each product styles them. The only shared visible element A proposes, a thin "by Garfield Lim" return link, is fine with B, if it stays a 44 px target and keeps the doorway return.

**A-X-03 (crumb makes every product a sub-page).** Agree on identity. Challenge on navigation cost. The crumb is today the only path back to the hub from every room and the doorway "leave" animation targets it. Removing it without a replacement creates a dead end on phones. Position: each product leads with its own wordmark and keeps one consistent, small return link in the same place in all four (top or bottom, decided once).

**A-X-02 (shared footer).** Agree for Paluwagan, where "llms.txt" and "House 2.0.1" are noise for older users. The Calm motion switch must stay reachable in every product (it is the motion pause for users who have not set the OS preference). It can move into each product's own settings or menu.

**A-X-04 (receipts and "How this was built" in every room).** Agree from a UX view too. They push the Paluwagan member view to 8.3 screens at 390 (B audit, `probes.json`). Moving proof to the hub case pages shortens every room. B adds one condition: each room keeps a one-line, linked honesty label in the first screen ("Demo group · No real money"), which is a principle, not decoration.

**A-PL-06 and A-OP-08 ("not measured yet").** Likely a local-build artefact, not a live defect. The rooms fetch `evidence.json` at runtime (`paluwagan/src/ui/Receipt.tsx`), CI writes it, and the hub holds live copies in `data/evidence/`. B's local runs also returned 404 for it. Severity should be "validate on live" before anyone designs around it. The real UX issue is the empty state copy, which should not mention a dev server on a public page.

**A-OP-02 (Fraunces for money).** Agree on the conclusion for a different reason. Fraunces old-style figures at display size are harder to read at a glance for older eyes, and its digits are not tabular, so totals do not align with ledger rows. Money should be one face everywhere in the product, lining tabular figures, large.

**A-OP-05 ("Check the books", "Forge a line", "Risk").** Agree. Add a UX reason: the "Edit entry" button that always refuses (B-OP-07) belongs to the same toy vocabulary and costs real users trust.

**A-OP-07 (badge "6 px dot").** The dot is 8 px and the word is 13 px at weight 500 (`paluwagan/src/styles.css` line 136 to 137). The conclusion still stands: 13 px is too small for this audience. Keep dot plus word, raise the word to body size.

**A-SE-07 (fake counters as dark pattern).** Agree it needs validation. Add B-SE-02: the parody cookie banner survives "Accept all" and returns on every client navigation, which is where satire becomes a usability cost on a phone.

**A-PF-06 (motion signature is faint).** Caution. The hub's glyph field already produced the only long tasks over budget in the audit: 262 ms on a throttled phone (local, `perf.json`) against DIRECTION's "no long task over 50 ms in the first 5 s". A stronger signature must be cheaper, not heavier.

## Position on the six register conflicts

1. **Shared chrome.** Split it. Infrastructure (shared, may look different): skip link, focus contract, motion contract and pause, dialog, status, menu popover behaviour, Back and focus return, the return-to-hub link position. Identity (per product): wordmark, header layout, footer content, Menu and button styling. B withdraws "one crumb, one menu, one footer" as a strength in its visual sense and keeps it as a behavioural one.
2. **Where shared patterns live.** Shared behaviour does not need a shared look. The success and error pattern (B-X-03) is a contract: announced through `role="status"` or `role="alert"`, names the object and amount, moves or keeps focus by rule, stays until dismissed or superseded. Each product draws it.
3. **Paluwagan money face.** One face for all money, lining tabular figures. Inter tabular is fine, or any product face A chooses that has tabular lining figures and an unambiguous ₱. Not Fraunces for amounts. Group names may stay expressive.
4. **Paluwagan badges.** Both are right. Keep dot plus word (never colour alone), raise text to body size (16 px or more), add a shape or icon per state for colour-blind users.
5. **Hub Work section.** Confirm High. B's density finding and A's sameness finding are the same section, and it is the main surface for the hiring journey.
6. **Future media.** Confirm Medium, on the condition that it is an architecture note, not a design task now. The decisions with lasting cost (service worker byte budget, ClientRouter lifecycle for games) are cheap to make before the first video ships and expensive after.
