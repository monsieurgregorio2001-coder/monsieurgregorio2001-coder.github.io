# Pass 2: Agent A review of Agent B's strategies

Agent A, 2026-10-29. Reviews [portfolio](portfolio/ux-strategy.md), [paperlabs](paperlabs/ux-strategy.md), [slop-editorial](slop-editorial/ux-strategy.md) and [online-paluwagan](online-paluwagan/ux-strategy.md) UX strategies, and answers [pass-2-b-challenges.md](pass-2-b-challenges.md). B's files are not edited. Most of B's work fits the brand direction. Items below are the exceptions.

## Responses to B's challenges

| B challenge | Response | What changes |
| --- | --- | --- |
| A-X-01, primitives must look sufficient everywhere, not identical | Accept | Draft ADR wording holds: shared behaviour and token-driven primitives, styled per product |
| A-X-03, removing the crumb leaves no way back on phones | Accept | Return link goes in the header, not only the footer. Same position in all four: top, trailing end, before the menu, 44 px, styled by the product. The doorway "leave" targets it. Footer credit stays as a second path |
| A-X-02, Calm motion must stay reachable | Accept | Each product puts Calm motion in its own menu or settings, under its own name (Slop: "Still"), with the shared behaviour |
| A-X-04, keep a one-line honesty label on every first screen | Accept | Already in all four strategies. Made explicit as a rule |
| A-PL-06 and A-OP-08, "not measured yet" is a local artefact | Accept. Close both as not reproducible on live (the live gate shows `evidence.json` returns 200 for every room). Keep one copy fix: the empty state must not mention a dev server | Removed from the brand-strategy copy tables as live defects |
| A-OP-02, reason is old-style, non-tabular figures | Accept the added reason | None. Atkinson Hyperlegible Next with lining tabular figures satisfies B's rule |
| A-OP-05, "Edit entry" belongs to the same toy vocabulary | Accept | Added to the Paluwagan do and don't table |
| A-OP-07, dot is 8 px, word 13 px weight 500 | Accept the correction. My "6 px" was wrong | Conclusion unchanged |
| A-SE-07, cookie banner (B-SE-02) is the usability cost | Accept | Banner plays once per session, styled as part of the magazine |
| A-PF-06, a stronger signature must be cheaper | Accept | Added a signature cost budget to every brand strategy |

## Portfolio ux-strategy

- **Fits:** foyer IA, one headline figure per door, receipts to case pages, doors 2 by 2 at 820. These are the same work item as A-PF-01 and A-PF-04.
- **Contradiction, small:** "Component reuse" says the hub publishes the shared layer including "font hosting". Fine, but it must host every product's families, not one set (see Slop below).
- **Character vs usability:** B keeps the doorway as the signature. Agree, with one brand condition: the reveal ends on the product's own colours and wordmark. A doorway that shows house chrome first undoes the four-brand goal.
- **Glyph field:** B proposes caps and idle scheduling. My strategy asks it to become information or go. Joint position: one still frame by default, live only on desktop pointer and off in Calm, under the 50 ms long-task rule. If it cannot show real data within that budget, remove it.
- **Unnecessary scope:** the sticky claim index on case pages at 1280. Case pages are short enough to scan. Defer until one has more than five claims.

## PaperLabs ux-strategy

- **Fits:** the lesson map is my paper shelf. Map card still = the redrawn paper figure. Scrub, URL state and "numbers as side panel" at 1280 all fit "the diagram is the interface".
- **Character vs usability:** "Switches stay real role=switch buttons. Their result is described below." I asked for switches to sit on the formula. Both hold: keep the role and the keyboard, place the control on the drawing, keep the result sentence as the margin note.
- **Motion:** B's "no bounce on numbers" agrees with the notebook voice. Margin notes writing on (my stroke reveal) must also obey "retarget, never queue". Added.
- **Unnecessary scope:** progress tracking and resume per lesson, and the map's prefetch rules, while only one lesson exists. B already says the map is worth building only after a second lesson. Same for progress. Defer.
- **Feasibility:** none suspected. The shared-element morph needs a fallback in Firefox (no same-document view transitions in older versions). Use a plain fade there.

## Slop Editorial ux-strategy

- **Contradiction, needs a joint call:** the cache table keeps Bricolage local and loads Inter and JetBrains Mono from the house. My strategy retires all three for Slop (Bodoni Moda, Newsreader, Courier Prime). The dedup goal (B-X-02) still holds: Slop's faces live under the shared font host, Slop loads none of the other products' faces. This is wording, not a disagreement on principle.
- **Character vs usability:** B's 1280 index is a three-column "hung wall". My direction puts one plate per screen on work pages and keeps the index as a wall. These agree. Phone bottom bar for Previous and Next is fine if styled as a programme strip, not an app tab bar.
- **Swipe between works:** acceptable as a convenience. It weakens the theatrical page turn if it is the main path. Keep visible Previous and Next as primary, swipe as secondary. Lower priority.
- **Feasibility:** video on GitHub Pages (file size and bandwidth limits) is the real constraint. Agree it is an owner decision. No video should be commissioned until the host is chosen.
- **Character vs speed:** Bodoni Moda variable with italics plus Newsreader is heavy. I now cap Slop fonts and defer Newsreader until long-form ships (see my changes).

## Online Paluwagan ux-strategy

- **B is right on the primary user.** The treasurer records payments. My strategy wrote for "members". I adopt B's treasurer-first IA (Group home, Record, Passbook, Who owes) and B's money-screen pattern ("Record ₱1,000.00 from Joel", one confirmation, announced result).
- **Contradiction, small:** my "Recorded" stamp motif. B allows a bouncy stamp only on the proof page. I keep the stamp but static: an outline stamp that fades in at 160 ms, no bounce, after the ledger has committed.
- **Tabs vs IA:** B keeps a top tab row with 48 px targets. Agree. My "Who is behind" becomes B's "Who owes", which is plainer.
- **Unnecessary scope:** none. Multi-tab `storage` sync is small and protects money correctness.
- **Feasibility:** `env(keyboard-inset-height)` works only with the VirtualKeyboard API in Chromium. B already names a padding fallback. Test on WebKit.
- **Needs an owner call:** B assumes a visible language switch with Filipino labels. My draft made full Filipino an owner decision. The type choice (Atkinson Next) must then cover Filipino text, which it does for Latin, and copy needs native review (B's own risk).

## Unresolved items for a joint call

1. Language for Paluwagan: bilingual with a visible switch (B) or English with Filipino words (A's default). Owner decision, item 5 in [06](06-open-decisions-draft-a.md).
2. Slop font hosting wording: align B's cache table with the new faces before implementation. Expected to resolve without the owner.
