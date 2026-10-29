# Cross-project differentiation

Pass 1 consolidation, 2026-10-29. Merges Agent A's brand comparison ([02](02-agent-a-brand-audit.md) section 5) and Agent B's interaction comparison ([03](03-agent-b-ux-audit.md), cross-project UX comparison). It records where the four converge today and why. It does not propose a new direction.

## The root cause

[DIRECTION.md](../design/DIRECTION.md) principle 7 reads: "One vocabulary. Type, colour, radii, and motion live once, in the house." The house is called "quiet and identical everywhere". The owner's new goal is four unmistakably different products. The two cannot both hold. Most convergence below is the direction working as written, not drift (A-X-01). Any redesign under principle 7 would be another skin. A superseding portfolio ADR is needed before Pass 2 designs anything.

## Convergence by dimension

| Dimension | Hub | PaperLab | Slop Editorial | Paluwagan | Where they converge | Why |
| --- | --- | --- | --- | --- | --- | --- |
| Typography | Fraunces, Inter, JetBrains Mono | Inter, JBM (Recursive planned, not shipped) | Bricolage, Inter, JBM | Fraunces headings and pot, Inter body and rows | Inter body everywhere, Fraunces crumb on all, JBM figures on all | House type ramp by rule. ADR 0010 for Recursive is pending |
| Palette | Warm paper, ink, blue links | Same paper, coral | Same paper or graphite, yellow fill | Same paper, green | Identical neutrals, one accent each | Rooms may change only seven colour tokens (`house/2.0.1/tokens.css`) |
| Layout language | Centred 1120 column, hairline cards | Same column, bordered tiles | Same column, framed grid | Same column, list rows | Same max width, radii, hairlines, gutters | House radii and spacing tokens |
| Chrome | Crumb, Email, Menu | Same | Same | Same | Identical header and footer, "Garfield Lim / Room" crumb, developer footer links | House components |
| Imagery and illustration | Room screenshots | One live arc diagram | Nine generated images | One donut | No shared imagery, but none is art-directed except Slop's content | No illustration language exists for any product |
| Motion character | Glyph field, doorway clip reveal | Arc transitions | HUD notices | Ring | One motion vocabulary, one Calm toggle, same springs | House springs and the doorway are shared by rule |
| Content presentation | Label grids, receipts | Receipt, How this was built | Tracker, footer receipts | Receipt, How this was built | Every room ends with the same process and receipt blocks | The hub's thesis ("tools you can check") is reused as each room's positioning (A-X-04) |
| Tone of voice | Plain, honest | Plain, curious | Dry satire | Plain, careful | Honesty labels shared, same short cadence | One author, one copy rule set (DIRECTION section 7) |
| Emotional impression | Calm credibility | Tidy tool | Polite gallery | Calm app | All four feel calm, quiet, careful | Same neutrals, type and chrome |
| Interaction conventions | Static pages, view transitions, pills | Single page, URL state, switches, chips | Astro ClientRouter, caps toggles, intent prefetch, service worker | Hash routes, tabs, dialogs | Same pills, switches, focus style, menu. But Back, prefetch, caching and success feedback each solved per repo | House components converge on purpose. Engineering patterns diverge by accident (B cross-project comparison) |

The only true visual divergence today is Slop's image content and PaperLab's arc diagram.

## Shared infrastructure vs shared identity

Keep shared, and make more consistent where it diverges by accident:

- Accessibility floor: contrast, focus visibility, skip link, accessible names, one H1, 44 px targets, status-message pattern.
- Reduced-motion and pause contract.
- Font hosting and the cached `/house/` distribution (Slop currently duplicates fonts, B-X-02).
- Performance budgets, measurement method, prefetch policy, cache policy (B-X-01, B-X-04).
- Back and focus restoration rules.
- One success and one error feedback behaviour (B-X-03). The behaviour is shared, its look can be per product.
- Receipts data and build checks. Honesty labelling rules.

Shared visual identity that conflicts with the goal (per Agent A):

- The common type ramp and the Fraunces crumb on every room.
- Identical neutrals with only an accent swapped.
- Identical header, footer, Menu and Email capsules, Calm toggle and Live receipts drawer styling.
- Shared radii, hairlines, column and card treatment.
- One motion character for a lab, a satire magazine and a savings app.
- Portfolio process blocks (How this was built, ADR lists, receipts) as the ending of each product.

Open question for Pass 2: Agent B lists "one crumb, one menu, one footer, one focus style" as a strength. Agent A lists the same crumb, menu and footer as the main identity problem. Focus style is infrastructure in both readings. Crumb, menu and footer are the disputed middle (see the [register](pass-1-register.md), conflicts).
