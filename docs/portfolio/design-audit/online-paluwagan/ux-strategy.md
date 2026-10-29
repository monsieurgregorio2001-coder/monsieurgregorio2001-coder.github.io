# Online Paluwagan: UX and engineering strategy

Agent B, pass 2, 2026-10-29. Proposed, not adopted. Builds on the [B audit](../03-agent-b-ux-audit.md) (B-OP-01 to B-OP-11) and the [register](../pass-1-register.md). Visual identity is Agent A's. This file sets behaviour, structure and budgets that any identity must meet. Stack stays React 18, TypeScript, Vite, hash routes, localStorage (Gorges rule: no stack change without a demonstrated problem, and none was found).

## Who and what

The treasurer of a savings circle, often 45 to 70, on a mid-range Android phone, sometimes a shared family tablet, in Filipino or English. One job matters most: record who paid, correctly, and be sure it was recorded. Then: see who owes, release the pot, send a reminder.

Headline: **every money action is one explicit screen, one confirmation, one announced result.**

## Primary journeys and target interaction counts

| Journey | Today | Target |
| --- | --- | --- |
| Record a payment | Tap "Record a payment", land at top of a 12.9-screen ledger, scroll to the form, choose member, submit, no confirmation (B-OP-01, B-OP-02) | Tap, form is the screen with focus on Member, choose member, check amount, tap "Record ₱1,000.00 from Joel", see and hear "Recorded" with an Undo path (reversal) |
| Record from a member row | "Record" moves focus to the member select far below | Opens the same form with member pre-set |
| Correct a mistake | "Write a reversal" inline, reason, commit with no summary, focus lost (B-OP-04, B-OP-06) | "Correct this entry" opens a confirmation stating member, amount, cycle and effect, reason required, result announced, focus on the new reversal line |
| Release the pot | Dialog only when short | Always a confirmation: recipient, amount, short-by if any |
| Approve a reminder | Dialog with wrong accessible name for later cards (B-OP-03), focus lost after | Unique dialog names, focus moves to the approved message or the next draft |
| Check who owes | Risk tab | "Who owes" view, plain words, ordered by amount |

## Information architecture

- **Group home**: pot status, who paid this cycle (one row per member with a large status), the two actions "Record a payment" and "Who owes". Nothing else above the fold.
- **Record a payment**: its own route (`#/g/<id>/record`, optional `/<member>`). One form, one column.
- **Passbook** (the ledger): newest first, grouped by cycle, each line a 56 px row that opens a detail sheet with "Correct this entry".
- **Who owes**: arrears and reminders together, since reminders exist only because someone owes.
- **Proof and process** (books check, forge-a-line toy, receipts, How this was built): moves to the hub case page or a clearly separate "How this app checks itself" page. Off the member path. This also removes the "Edit entry" button that only refuses (B-OP-07).
- Demo honesty label stays on the first screen of every route, one line.

## Navigation and interaction patterns

- Bottom navigation is not needed for three destinations. Keep a top tab row on phones with 48 px targets and visible labels, no icons alone.
- Every money action is a dedicated screen or a modal sheet with a visible Cancel and a named primary button that repeats the amount ("Record ₱1,000.00").
- Confirmation states member, amount with ₱ and centavos, cycle and what changes. One confirmation per action, never two.
- Back always means "leave without saving" and warns only if the form has edits.
- No swipe, long-press or drag for any money action, approval or reversal. Swipes are allowed only for read-only movement (for example between cycles in the passbook), always with visible Previous and Next buttons.
- Amount input: in the money face, at the same size as the figure it produces, ₱ prefix inside the field, `inputmode="decimal"`, prefilled with the expected amount, grouped on blur, "short by" message live below.
- Double submit: the primary button disables for the duration of the write and the duplicate rule still returns a plain message.

## Responsive behaviour by device class

- **390 phone**: one column. The record form fits in one screen without the keyboard covering the primary button (use `scrollIntoView` on focus and `env(keyboard-inset-height)` fallback by padding).
- **820 tablet**: two columns. Group summary, actions and the trust cues (organiser, next payout) on the left, passbook on the right (B-OP-08). The gap is specific to 820: 1024 already has two columns. Forms open as a centred sheet, max 560 px.
- **1280 desktop**: three regions: summary, passbook, who owes. Tables become real tables with column headers.
- Text scales to 200 percent with no loss of the primary button or amounts. Test with Android font scale 1.3.

## Motion and gesture principles

- Motion only confirms: a recorded line slides into the passbook from the form direction, the pot ring fills. Both on transform and opacity, 200 to 320 ms, critically damped (no bounce on money).
- The bouncy spring allowed by DIRECTION for the RECONCILED stamp stays on the proof page only, not the member path.
- Business state commits before any animation. Cancelling or skipping an animation never changes the ledger.
- Reduced motion and Calm: instant state, a 160 ms fade at most.

## Accessibility requirements (WCAG 2.2 AA plus older users)

- Body 18 px on phones, amounts 20 px semibold in rows, 44 px for the pot, buttons 56 px tall (A's scale, adopted). Status pills 28 px tall with icon, word at 17 px and colour (conflict 4).
- Targets 56 px for every money button, 48 px for any other control, 8 px apart. No standalone text links under 44 px (B-OP-10).
- Status by word plus dot plus shape. Never colour alone.
- Unique accessible names for every dialog (`useId`) (B-OP-03).
- Every write ends with a `role="status"` message naming member, amount and cycle, and focus moves to it or to the new line (B-OP-02, B-OP-04). Errors use `role="alert"` and clear when the ledger changes (B-OP-05).
- Plain labels in both languages: "Paid", "Paid late", "Missed", "Owes ₱500.00". A visible language switch, not hidden in a menu, with `lang` on every Filipino run.
- No timeouts on forms. No hover-only information.
- Contrast: 4.5:1 text, 3:1 for field borders and the ring.

## States

| State | Behaviour |
| --- | --- |
| Empty group | "No payments yet for cycle 1." plus "Record the first payment". |
| Loading | None visible. Data is local and renders in the first frame. If storage is unavailable, the existing in-memory notice stays. |
| Validation error | Inline under the field, plain fix ("Enter the amount in pesos, for example 1,000.00."). Focus moves to the field. |
| Refused action | Says why and the next step ("This cycle already has a payment from Joel. To change it, correct that entry."). |
| Success | Status line with member, amount, cycle, a link to the line and "Correct this entry". Persists until the next action. |
| Storage full or blocked | Explicit warning before the write, never a silent loss. |

## Caching, prefetching and data classes (Gorges cache policy)

| Data | Class | Treatment |
| --- | --- | --- |
| Hashed JS and CSS | Fingerprinted static | HTTP cache. Pages limits headers (B-X-01). No service worker: the app is 67 KB gz and renders from local data, so there is no demonstrated problem. |
| House fonts | Fingerprinted static, shared | From `/house/<version>/fonts/` only, shared with the other sites. |
| Ledger, groups, drafts | Balances and approvals | localStorage `online-paluwagan:v2`, the single source of truth in the demo. Read synchronously, write then re-read and render from the stored value, so the screen shows what was saved, not what was intended. |
| `evidence.json` | Public reference | Network only, never cached by the app, empty state wording without "dev server". |

- Never prefetch or speculate anything that writes. Hash routes need no prefetch.
- Multi-tab: listen to `storage` events and re-render, so two tabs never show different balances.
- If a real backend ever arrives, this becomes a new protocol (idempotency keys, pending state, server confirmation). That is an owner decision, not part of this strategy.

## Rendering, navigation and transitions

- Keep the static `#room-hero` shell for LCP (local 1112 ms phone throttled, desktop 36 to 60 ms).
- Route change: scroll to top on forward navigation only, restore scroll on Back (B-OP-09). Move focus to the new view's H1 on forward navigation so screen readers hear the change.
- Same-document view transitions for record to passbook are optional polish, behind the motion contract.
- Likely bottleneck: the ledger page renders 76 interactive elements and long tables at 390. Splitting into Record, Passbook and Who owes removes it. No virtualisation needed at demo sizes.

## Budgets and success criteria

Phone profile: 390 x 844, 4x CPU, 1.6 Mbps, 150 ms RTT, Chromium and WebKit, live host.

| Metric | Budget |
| --- | --- |
| JS before interaction | 70 KB gz (today 67.0 KB, keep headroom by moving the proof toy into a lazy chunk) |
| LCP cold | 2.0 s, warm 1.0 s |
| INP on record and confirm | 150 ms (today max event 112 ms local) |
| CLS | 0.05 |
| Record a payment | 4 taps or fewer from group home, 1 screen at 390, 0 scrolls before submit |
| Result feedback | Announced status within 100 ms of submit |
| Keyboard | Record, correct, approve all completable by keyboard alone with focus never on body |
| Usability | 3 to 5 sessions with treasurers aged 50 and over: record and correct a payment unaided |

## Component reuse and system boundaries

- Shared engineering layer: dialog behaviour with unique names, status and alert regions, focus-return rule, motion contract, font hosting, budgets and checks.
- Paluwagan owns: its money component, amount input, status badge, passbook row, confirmation sheet look, its palette and type.

## Risks and dependencies

- Removing the proof toy from the member path depends on the hub case page carrying it (Agent A, A-X-04).
- Filipino copy needs a native-speaker review before any user session.
- localStorage is per origin and shared by five sites. Keep the `online-paluwagan:` prefix rule.
- Real-device checks (mid-range Android, iOS Safari with VoiceOver) are still owner items.

## Changes after review

- Type scale and sizes: A's passbook scale adopted (18 px body, 44 px pot, 56 px buttons, 28 px icon-plus-word pills).
- Money face: Atkinson Hyperlegible Next, conditional on two measured gaps. It has no ₱ (neither does house Inter today, so every peso sign now renders from a fallback font), and its default digits are proportional. The build adds a ₱ drawn to its metrics and sets `tabular-nums` on every amount, including the pot and the input.
- Status colours differ by hue only (green, amber, red within 1.04:1). The icons in the pills are required, not optional.
- Tablet: the 820 layout carries the trust cues (A's challenge to B-OP-08).
- Amount input renders in the money face at the size of the figure it produces (A's challenge to B-OP-11).
