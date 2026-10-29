# Brand strategy: Personal Portfolio (hub)

Agent A, Pass 2 draft, 2026-10-29. Proposed by Claude, not accepted. Garfield owns the decision. Implements against findings A-PF-01 to A-PF-08, A-X-01 to A-X-05, B-PF-01, B-PF-02 and register conflict 5.

## Positioning and personality

- Audience: hiring engineers, technical founders, recruiters who forward links to engineers.
- Promise (kept from the shipped H1): "I build AI tools you can check." It is the one ownable line in the portfolio. It belongs to the hub only, not to the products (A-X-04).
- What the visitor should conclude: this person can design and build systems that are hard to get right, and shows the hard part.
- Personality: precise, curious, a little experimental, never showy. A lab notebook kept by a good engineer, not a pitch deck.
- Tension to preserve: experimental expression with engineering trust. The page may try one bold thing, and everything else stays exact.

## Design philosophy

Show the mechanism, not the scoreboard. Each project is presented by its hardest technical idea (the attention kernel, the append-only ledger, the spend cap, the guard threshold), drawn as a small diagram or trace, with one sourced number. Commands and test lists sit one press away. The page is the case pages' evidence (Architecture, Decisions "Chose X over Y because", What this does not do) promoted to the front, at a glance.

## Visual identity direction

"Instrument panel on drafting paper." Cool neutral paper, a visible 8-column grid with hairline column guides shown faintly behind section heads, mono-led headings, and one signal colour used only to mark measured things. Diagrams are line drawings in ink with the signal colour on the one element under discussion.

The hub leaves the editorial serif behind. Fraunces goes (it now belongs to nobody, which is the point).

## Typography

| Role | Face | Licence | Why |
| --- | --- | --- | --- |
| Display and section heads | IBM Plex Mono 500 and 600 | SIL OFL 1.1 | A mono-led head says "engineer" without a fake terminal. Plex Mono has real italics and a humanist shape, so large sizes stay warm |
| Body and UI | IBM Plex Sans variable (wght 300 to 700) | SIL OFL 1.1 | Same skeleton as the mono, so headings and body read as one engineered family. Not the Inter or Geist default of every AI startup |
| Figures and code | IBM Plex Mono 400 | SIL OFL 1.1 | One family for prose numbers, code and figures. Keep `.num` as the class |

Scale: display clamp(36px, 22px + 3.6vw, 72px) / 1.05, tracking -0.02em. Section head 28 to 40 px. Body 17/27. Labels 13 px Plex Mono uppercase with +0.06em tracking, labels only, never sentences. Uppercase tracked mono labels belong to the hub alone. Self-host as Latin WOFF2 subsets in the hub repository (joint call 1: product-only faces live with the product). Retire Fraunces and Inter from the hub once shipped. Mindmap is frozen and keeps house 2.0.1.

Risk to check: Plex can read corporate (IBM). The mono-led headings and the grid motif are what keep it from that. If a review says "IBM", fall back to Commit Mono (OFL) for display and keep Plex Sans.

## Colour

| Token role | Light | Dark | Contrast on bg |
| --- | --- | --- | --- |
| bg | #F4F5F2 | #0B0D10 | |
| ink | #101316 | #E6E8EA | 17.0 / 15.8 |
| ink-2 secondary | #4A5058 | #9AA1AA | 7.4 / 7.5 |
| signal (measured values, the one element under discussion, focus) | #C2410C | #FF9A62 | 4.7 / 9.3 |
| link (always underlined) | #1F5FD6 | #7FB0FF | 5.2 / 8.9 |
| grid guide (decoration only) | ink at 6 percent | ink at 8 percent | not text |

Ratios computed for this draft with the WCAG formula. Rule: signal orange marks a number or element that was measured. No gradients. No purple. Products' colours never appear on the hub except inside their own thumbnails.

## Imagery and media

- Project thumbnails: one tight crop of each product's signature moment in that product's own look (PaperLabs arcs, a Paluwagan ledger catch, a Slop plate, the Mindmap refusal), never a full-page screenshot (A-PF-03).
- Diagrams: one per project, drawn in SVG by hand from the real architecture (the case page already has PaperLab's). Ink lines, 1.5 px, signal on the highlighted node. Each diagram has a text alternative.
- No stock, no AI images, no neural-net art, no code-rain backgrounds. The glyph field behind the H1 either becomes information (for example the real token stream of the PaperLab sentence) or goes (A-PF-06).

## Tone of voice

First person, plain, specific. Every claim names a mechanism or a number with a source.

| Do (real copy to keep) | Don't (real copy to change) |
| --- | --- |
| "I build AI tools you can check." | "Agents that earn their place in real work." (portable metaphor, A-PF-08) |
| "No evals. Nothing here is model output to score." | "Spec first. Measure everything. Humans approve what matters." as three slogans. Replace with one example each or cut |
| "Chose a pure math module over math inside components, because..." (case page) | "Generation is cheap. Spend is capped." (borrows Slop's slogan shape) |
| "Every number here comes from a test run or from your own browser." | Card labels repeated four times: Proves, Problem, What I built, Result, Try this |

## Distinctive motifs

1. The grid guide: faint column hairlines visible behind section heads, aligned to content.
2. The measured mark: a small signal-orange tick and the number in mono, with a hover or press that reveals its source command.
3. The mechanism diagram: one hand-drawn SVG per project.
4. Mono headings at large size.

## Anti-patterns for this brand

Purple-blue gradients, neural-net or circuit graphics, fake terminals and typing effects, code rain, counters that animate up, identical project cards, badges above the hero, "passionate", "leverage", "cutting-edge", "vibe coding". Motion longer than a press response except the one doorway.

## Layout for the Work section

Each project gets its own row composition, not a shared form: name, one-line problem, the diagram, one sourced number, two actions (Open, Read the case). The full "How it is checked" list moves into the existing drawer (B-PF-02). Names never truncate (B-PF-01).

## What distinguishes this brand from the other three

The hub is the only one that is mono-led, cool grey and diagrammatic. It speaks about engineering. PaperLabs is warm and illustrated, Slop is theatrical and serif, Paluwagan is plain and large. The hub is the only place where receipts, commands and process are front and centre.

## Signature cost budget

- Fonts: IBM Plex Sans variable Latin plus Plex Mono 400 and 500, 130 KB or less in total, only the display weight preloaded.
- Grid guides and diagrams are static SVG or CSS. No script.
- The glyph field: one still frame by default, live only for a desktop pointer and never in Calm, with no long task over 50 ms in the first 5 s. If it cannot show real data within that, remove it.

## Changes after review

- Return link to the hub: every product's header carries a 44 px "Garfield Lim" link, top and trailing, before its menu, styled by the product. The doorway "leave" targets it. The footer credit is a second path. The hub's own doorway reveal ends on the product's colours and wordmark.
- Added the signature cost budget above (B-PF-04 caution, B audit long tasks).
- The hub's font host serves every product's families under one cached path. The hub page itself loads only Plex.
- Sticky claim index on case pages deferred.

### After B's review and the joint calls

- Fonts measured by B: Plex Sans variable 44 KB plus Plex Mono 400, 500, 600 at 14 to 15 KB each, about 89 KB against a 160 KB hub budget. Plex digits are tabular by default.
- The Plex Mono H1 is a Foundation gate (joint call 5): the two-line check at 360, 390 and 1440 must pass. If it fails, the H1 uses Commit Mono, then Plex Sans. Lowering the display size at 360 is allowed inside the gate.
- Signal and link differ by hue only (1.11:1). Links are always underlined. Signal orange marks a measured value and is always paired with the measured tick, so neither relies on colour.
- Signal orange in light mode sits at 4.7:1. It is used only on `bg`, never on a tinted panel.
- Fonts live in the hub repository, not the house folder (joint call 1).
- Differentiation review: uppercase tracked mono labels are reserved for the hub. Slop's labels changed so they no longer echo them (see 04).
