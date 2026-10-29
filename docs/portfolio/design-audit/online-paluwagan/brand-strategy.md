# Brand strategy: Online Paluwagan

Agent A, Pass 2 draft, 2026-10-29. Proposed, not accepted. Implements against A-OP-01 to A-OP-08, B-OP-01 to B-OP-11, register conflicts 3 and 4. UX behaviour (confirmations, focus, layouts) is Agent B's. This file sets the look and voice that behaviour uses.

## Positioning and personality

- Audience: members and organisers of a paluwagan (rotating savings group) in the Philippines, many on phones, many not tech-confident, including people in their 60s.
- Promise: "Your group's money, written down where everyone can see it." Like the paper notebook the organiser keeps, but nobody can quietly change a line.
- Personality: a careful, kind kahera. Calm, clear, never clever. Warm without being cute.
- Tension to preserve: friendly and credible. Warmth comes from people and plain words, credibility from large exact figures and nothing hidden.

## Design philosophy

One screen, one question. The home answers "How much is in the pot, whose turn is it, and did I pay?" Everything else is one press away. The portfolio material (How this was built, Receipt, Forge a line) moves out of the member view into a clearly separate "Demo: test the books" mode and the hub case page (A-OP-01, A-OP-03, A-OP-05).

## Visual identity direction

"Passbook." The bank passbook and the organiser's ledger notebook, made digital: white page, firm dark text, ruled rows, one dependable green, and the member's name always next to the amount. Large sizes. Familiar patterns only: lists, big buttons, clear headings.

## Typography

| Role | Face | Licence | Why |
| --- | --- | --- | --- |
| Everything, including all money | Atkinson Hyperlegible Next variable (wght 200 to 800) | SIL OFL 1.1 | Designed by the Braille Institute for low-vision readers. Distinct letterforms (l, I, 1, 0, O). Resolves register conflict 3: one sturdy face for amounts, names and UI, no serif |
| Optional amount figures | Atkinson Hyperlegible Mono | SIL OFL 1.1 | Only if tabular figures in Next prove insufficient. Prefer one family |

Verify before shipping: the peso sign U+20B1 and tabular figures in the chosen file. If ₱ is missing, add it in the subset step from a metrics-matched source, the same way the hub re-cut Inter.

Scale (phone first): body 18/28, amounts in rows 20 px semibold, pot total 44 px bold, headings 24 px bold. Never below 16 px for anything a member must read. Retire Fraunces and Inter here.

## Colour

| Role | Light | Dark | Contrast on bg |
| --- | --- | --- | --- |
| bg | #FFFFFF | #101418 | |
| ink | #111827 | #F3F4F6 | 17.7 / 16.8 |
| ink-2 | #374151 | #C7CDD4 | 10.3 / 11.5 |
| primary green (main action, paid) | #0B6B3A | #5FD39A | 6.6 / 9.9 |
| info blue (links, your turn) | #1D4ED8 | #8DB4FF | 6.7 / 8.9 |
| late or short (amber) | #8A5300 | #F5C060 | 6.3 / 11.1 |
| error or reversal (red) | #B42318 | #FF8A80 | 6.6 / 8.1 |

Higher contrast than the current house (ink-2 at 10:1, not 5.9:1), because the audience needs it. White page in light mode, not warm paper, so it reads as a bank document. Buttons are solid fills with text, at least 56 px tall on phones.

## Status badges (conflict 4)

Pill, at least 28 px tall, word at 16 to 17 px semibold, icon plus word plus colour. Paid: check icon, green. Late: clock icon, amber. Short: exclamation icon, amber. Paid out: arrow icon, green. Reversed: undo icon, red. Never colour alone, never a dot alone.

## Imagery

- No stock photos of smiling families, no charts beyond the pot ring.
- Each member has an initials avatar in a soft tint, so people are faces, not rows.
- One small line illustration on empty and success states: an envelope or a notebook. Simple, adult, not cartoon.
- The pot ring stays, thicker, with the amount inside at 44 px.

## Tone of voice

Plain English by default, with familiar Filipino words where members use them: paluwagan, ipon, hulog (contribution), kahera if adopted. Offer a Tagalog version as an owner decision (06). Short sentences. Always say who, how much, which cycle.

| Do (real copy) | Don't (real copy to change) |
| --- | --- |
| "₱4,000.00 in the pot of ₱6,000.00" | "Check the books, then try to cheat them" on the member view. Move to the demo mode |
| "Demo group · No real money · Sends are simulated" | "Forge a line" (developer joke). In demo mode: "Try changing a past payment" |
| "Record a payment" | "Risk" as a tab name. Use "Who owes" |
| "Barkada Weekly Ipon" (real local warmth) | "E25, cycle 4, Oct 24, 2026" as the line under a name. Lead with "Paid Oct 24", put the entry id in the detail view |
| Confirmation pattern to adopt: "Liza Mercado paid ₱1,000.00 for cycle 4. Saved." | "Edit entry" button that always refuses (B-OP-07) |

## Distinctive motifs

1. Passbook rows: name, date, amount right-aligned, ruled hairline, status pill.
2. The thick pot ring with the total inside.
3. Initials avatars.
4. A printed-stamp look for confirmed entries ("Recorded" stamp in green outline) that appears on save.

## Anti-patterns

Crypto or trading aesthetics, dark neon, charts and graphs, dashboards with many tiles, swipe-to-confirm or any hidden gesture for money, toasts that vanish before an older reader finishes, jargon (ledger, reconcile, arrears) on the member view, serif money, playful animation around amounts.

## What distinguishes this brand from the other three

Only Paluwagan is white-page, large-type, high-contrast and built from familiar banking patterns, with the Atkinson face designed for legibility. The hub is a cool engineering panel, PaperLabs a warm notebook to play in, Slop a theatrical magazine. Paluwagan is the one that must never surprise anyone.

## Signature cost budget

- Fonts: Atkinson Hyperlegible Next variable Latin with ₱ and tabular figures, 80 KB or less.
- Motion only confirms: the recorded line enters, the ring fills, the "Recorded" stamp fades in at 160 ms with no bounce, always after the ledger has committed.

## Changes after review

- Primary user is the treasurer (B). Members are the second audience. IA follows B: Group home, Record a payment, Passbook, Who owes. "Who is behind" becomes "Who owes".
- Money screens follow B's pattern: one screen, a primary button that repeats the amount ("Record ₱1,000.00 from Joel"), one confirmation naming member, amount and cycle, and an announced result. This file sets their look: Atkinson Next, 56 px buttons, status pills.
- "Edit entry" that always refuses is removed with the proof toy (B-OP-07).
- Status word size confirmed at body size. The current dot is 8 px and the word 13 px (my earlier "6 px" was wrong).
- A-OP-08 closed as not reproducible on live. The empty state must not mention a dev server.
- Return link rule added (header, trailing, 44 px). Calm motion lives in the app's settings.
- Language stays an owner decision. If bilingual, Filipino copy gets a native review before any user session.
