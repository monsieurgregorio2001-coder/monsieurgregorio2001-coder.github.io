# Cross-project differentiation

Final form, Pass 2, 2026-10-29. Agent A. Compares the four final directions in the brand strategies ([portfolio](portfolio/brand-strategy.md), [paperlabs](paperlabs/brand-strategy.md), [slop-editorial](slop-editorial/brand-strategy.md), [online-paluwagan](online-paluwagan/brand-strategy.md)) with the UX strategies and the [joint calls](pass-2-joint-calls.md). All proposed, nothing accepted. "Today" is the Pass 1 state, kept short for contrast.

## The four in one line each

- **Portfolio:** a cool engineering instrument panel that shows the mechanism and the measurement.
- **PaperLabs:** a warm annotated notebook that you play with until the idea makes sense.
- **Slop Editorial:** a theatrical couture magazine that frames AI slop like haute couture.
- **Online Paluwagan:** a plain, large, white passbook that never surprises anyone.

## Test used

A dimension passes only if each project differs from the other three in at least two of: the face or form used, the role it plays, the treatment, and the feeling it is meant to produce. Swapping an accent colour does not count.

## Dimension by dimension

| Dimension | Today | Portfolio | PaperLabs | Slop Editorial | Online Paluwagan | Proof of difference |
| --- | --- | --- | --- | --- | --- | --- |
| Typography | Inter body and Fraunces crumb everywhere, JetBrains Mono figures everywhere | IBM Plex Mono display and labels, Plex Sans body. Mono leads | Recursive in three instances: linear sans, casual note hand, mono for maths | Bodoni Moda didone at 28 px and up, Newsreader body, Courier Prime typed cards, SVG masthead | Atkinson Hyperlegible Next for everything, money tabular | Four unrelated families, no face used by two products. Classes differ too: engineered mono, casual variable, high-contrast didone, legibility sans |
| Colour | Same warm paper and ink, one accent each | Cool grey paper #F4F5F2, near-black dark, signal orange for measured things, underlined blue links | Cream dot-grid #FFF9EE, violet-navy chalkboard dark, three meaning markers (marigold highlighter, teal reads, violet notes) | Bone #F3EDE4 and oxblood-black stage, lipstick #9E1030, gilt, sticker yellow fill | Pure white, very dark ink, ink-2 at 10:1, green, blue, amber and red only as statuses with icons | Different grounds (cool grey, cream, bone, white), different dark modes (instrument, chalkboard, stage, plain) and different colour logic (one signal, three markers, theatrical pair, status set) |
| Layout language | One centred 1120 column, hairline cards, same radii | Visible 8-column grid with faint guides, rows composed per project, diagram plus one number | Diagram as interface, controls on the drawing, margin notes, a shelf of paper covers | Full-bleed plates, one plate per screen on works, curtain covers, gilt-framed specimens | Single column on phones, ruled passbook rows, big buttons, two columns on tablet | Grid shown, margin used, page bled, rows ruled. No shared column, card or radius rule |
| Imagery and illustration | Room screenshots, one diagram, nine generated images, one donut | Hand-drawn SVG mechanism diagrams in ink, signature crops of each product | Redrawn paper figures, 2 px imperfect ink line, marker washes, circled step numbers | Labelled slop specimens plus a commissioned human-art-directed cover set and masthead | Initials avatars, one small line illustration for empty and success, the pot ring | Technical drawing, hand sketch, staged photography, near-none. Each answers a different job |
| Motion character | One house motion vocabulary and doorway | Precise and minimal: press response, the doorway handoff, a still glyph field unless it shows data | Drawing on: arcs retarget, notes write on in under 400 ms, no bounce on numbers | Theatrical: curtain covers, plate morphs, page turns, every long move pausable | Confirming only: the saved row enters, the ring fills, no bounce on money | Measure, draw, perform, confirm. Four different reasons to move |
| Content presentation | Every room ends with receipts and "How this was built" | Proof front and centre, receipts and commands in drawers, case pages | Lesson first, numbers one press away, process moved to the hub | Plate, caption, typed label, price. The joke is never explained | Group home, Record, Passbook, Who owes. Proof moved off the member path | Only the hub shows process. The other three show their own subject |
| Tone of voice | Plain and honest everywhere, same cadence | First person, mechanism and number, sourced | Second person invitation, plain then precise, jargon defined after the idea | Deadpan curator, dry, never explains | Plain, kind, always who, how much and which cycle, familiar Filipino words | Engineer, teacher, critic, kahera |
| Emotional impression | Calm, quiet, careful in all four | "This person builds hard things and shows the hard part" | "I want to try that" | "I should not laugh at this, and I am" | "My money is safe and I understand it" | Confidence, curiosity, amusement, safety |
| Interaction conventions | Same pills, switches, Menu and Email capsules | Plain links and underlines, drawers, one primary per screen | Direct manipulation: tap, scrub and keys on the sentence, switches on the formula | Page turns, Previous and Next as a programme strip, a once-per-session parody banner | Native-feeling lists, 56 px buttons, one confirmation naming member, amount and cycle, no gestures for money | Each product's primary input matches its job. No shared button or switch look |

## Leaks found in this review and fixed

| Leak | Where | Fix (now in the strategy) |
| --- | --- | --- |
| Red-orange emphasis on "the one element under discussion" | Portfolio signal #C2410C and PaperLabs "changed" marker #C2362B, same role, near-identical hue | PaperLabs replaced its red with a marigold highlighter wash and dashed underline. Signal orange is hub-only |
| Uppercase tracked mono labels | Portfolio labels and Slop museum labels (MEDIUM, EDITION in caps mono today) | Slop labels became sentence-case Courier Prime on typed cards with a gilt rule. Uppercase tracked mono is hub-only |
| Stamps and seals | Paluwagan "Recorded" stamp and Slop's certificate and seal imagery | Paluwagan confirms with a saved row, a check icon and the word "Saved". Stamps are Slop-only |
| Three mono faces | Plex Mono (hub), Recursive mono (PaperLabs), Courier Prime (Slop) | Kept, with separate roles: hub mono leads headings, PaperLabs mono sets maths only, Slop mono is a typewriter label only. Paluwagan has no mono at all |
| Yellow used twice | Slop sticker yellow and PaperLabs marigold highlighter | Kept with different treatment: Slop is a flat, hard-edged, saturated sticker with ink text for prices. PaperLabs is a translucent wash with rough edges behind words. Never a sticker shape in PaperLabs, never a wash in Slop |

No other leak found. The return link to the hub is the only visible element common to all four, and each product styles it.

## What stays shared (not visual)

- Accessibility floor: WCAG 2.2 AA contrast in both themes, focus visibility and focus return, skip link, landmarks, one H1, 44 px targets (48 px for Paluwagan money controls), never colour alone.
- Behaviour primitives, styled per product: dialog with unique names, status and alert regions, drawer, menu popover, the success and error contract (B-X-03).
- Motion contract: reduced motion and the Calm or Still setting, pause for anything over 5 s, business state before animation.
- Return link behaviour and position: header, trailing, 44 px, the doorway's exit target.
- Performance: budgets per route, measurement method, prefetch and cache policy, Back and scroll restoration.
- Honesty rules: every number sourced, demo labels on the first screen, receipts data and build checks.
- Font hosting rule: product faces in product repositories, the house hosts only faces two products share (none today), never a duplicate download.
- Privacy: no tracking, no third-party requests.
