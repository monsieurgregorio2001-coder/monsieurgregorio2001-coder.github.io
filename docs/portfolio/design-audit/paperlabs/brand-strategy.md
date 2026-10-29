# Brand strategy: PaperLabs

Agent A, Pass 2 draft, 2026-10-29. Proposed, not accepted. Implements against A-PL-01 to A-PL-09, B-PL-01 to B-PL-05, A-X-04. Name: the owner calls it PaperLabs, the repo is paperlab. Which one is public is an owner decision (see [06](../06-open-decisions-draft-a.md)).

## Positioning and personality

- Audience: curious learners, students, engineers who never read the paper. Secondary: the hub's reviewers.
- Promise: "Play with the idea from a famous paper until it makes sense." Each lab takes one paper, one idea, and lets you break it.
- Personality: a generous teacher with a marker in hand. Curious, warm, exact. Playful in the drawing, serious in the maths.
- Tension to preserve: playful curiosity with credibility. The sketch layer is casual, the numbers are never casual.

## Design philosophy

The diagram is the interface. Controls live on the drawing (heads as lenses over the sentence, switches as parts of the formula), not in a settings column (A-PL-04). Explanation arrives in the margin, handwritten-style, only after you act. A home page shows the papers as a shelf of explorable objects, even if one lab is live at first,. It shows only live labs unless the owner accepts listing unbuilt ones by title (DIRECTION principle 6, see 06 item 7).

## Visual identity direction

"Annotated notebook." Warm cream paper with a faint dot grid, ink-dark violet text, and three marker colours that each mean something. The arcs over giant words (already shipped) are the hero motif and the visual seed for everything: hand-drawn curves, margin notes, circled numbers.

## Typography

| Role | Face | Licence | Why |
| --- | --- | --- | --- |
| Everything | Recursive variable (axes MONO, CASL, wght 300 to 900, slnt) | SIL OFL 1.1 | Already chosen in ADR 0010 (proposed). One file gives a linear sans for UI and words, a casual style for margin notes, and a mono for numbers. The CASL axis is the brand: the same voice switches between "teacher writing on the board" and "exact maths" |

Settings: UI and body at CASL 0, MONO 0. Margin annotations at CASL 1, slnt -8, wght 500. Numbers and formulas at MONO 1, CASL 0, tabular. Sentence words in the diagram at wght 800 large (keep the current scale). Body 17/27. Subset Latin plus maths symbols (√, ×, Σ, ≈, minus). Retire house Inter and Fraunces here. Budget the variable file at 70 KB or less per DIRECTION.

## Colour

| Role | Light | Dark | Contrast on bg |
| --- | --- | --- | --- |
| paper bg | #FFF9EE | #16142A | |
| ink | #1D1A2E | #F2EEE3 | 16.2 / 15.5 |
| ink-2 | #55506B | #B3ADC6 | 7.3 / 8.3 |
| marker red: what you changed, the focus word | #C2362B | #FF8A7A | 5.2 / 7.9 |
| marker teal: what the model reads, attention arcs | #1F6E8C | #6CC7E6 | 5.5 / 9.4 |
| marker violet: annotations and explanations | #7A4FBF | #C4A7FF | 5.4 / 8.8 |
| dot grid | ink at 8 percent | paper at 8 percent | decoration |

One colour, one meaning, used the same way in every lab. This splits the current coral's many jobs (A-PL-07). Dark mode is a chalkboard, not a black app.

## Imagery and illustration

- Illustration language: single-weight ink line (2 px), slightly imperfect curves, marker fills at 20 percent behind words, circled step numbers. Drawn as SVG, no raster.
- Each lab gets a cover figure redrawn from the paper's own key diagram, simplified and annotated. Credit the paper beside it.
- No mascots, no cartoon characters, no stock photos, no badges or streaks (avoids childish and gamified).
- Motion: arcs draw in with a spring, margin notes write on (stroke reveal) in under 400 ms. Reduced motion shows them complete.

## Tone of voice

Second person invitation, then plain explanation. Jargon only after the idea lands, and always defined.

| Do (real copy) | Don't (real copy to change) |
| --- | --- |
| "Type a sentence. See what each word reads. Then break the math." | First chip "Real math · Designed heads · Toy size" before any welcome. Keep the truth, write it as a margin note: "Real maths, hand-set heads, toy size. Here is why." (A-PL-09) |
| "'sat' reads 'cat' most." | "Divides scores by √d_k" as the only switch label. Add the plain line first: "Keeps scores from blowing up", then the formula |
| "Without the scaling, 'sat' puts 97% of its attention on one word. With it, 79%." | "How this was built", ADR lists and "What AI did" on the lab page. Move to the hub case page (A-PL-05) |

## Distinctive motifs

1. Arcs over giant words (keep, and reuse for every lab where relations exist).
2. Margin notes in casual Recursive that appear after an action.
3. Marker highlights behind words, colour-coded.
4. Dot-grid paper.
5. The paper shelf on the home page: each lab as a paper cover with its key figure.

## Anti-patterns

LMS dashboards, progress bars and points, course-card grids, corporate SaaS cards and toggles in a side column, cluttered textbook pages with many boxes, cartoon mascots, gradient hero art, "unlock", "master", "level up".

## What distinguishes this brand from the other three

Only PaperLabs is warm, hand-drawn and annotated, with one variable face that shifts between casual and exact. The hub is cool and mechanical, Slop is theatrical and high-contrast, Paluwagan is plain and calm. PaperLabs is the one place that invites play.

## Signature cost budget

- Fonts: one Recursive variable Latin file with maths symbols, 70 KB or less.
- Arcs and margin notes are SVG on transform and opacity, retargeted from the current value on every input, never queued. Stroke reveals finish in 400 ms or less. Reduced motion shows them complete.

## Changes after review

- Paper shelf equals B's lesson map. Each card's still is the redrawn paper figure. Built only after a second lesson exists. Progress tracking deferred with it.
- Switches keep `role="switch"` and their keyboard behaviour while sitting on the formula. Their result sentence is the margin note.
- Added the return link rule (header, trailing, 44 px, product-styled) and Calm motion inside the PaperLabs menu.
- A-PL-06 closed as not reproducible on live. Kept one rule: no dev-server wording in any empty state.
