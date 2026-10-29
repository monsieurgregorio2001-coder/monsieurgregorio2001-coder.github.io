# Open decisions, Agent A draft

Agent A, Pass 2, 2026-10-29. Every item is a proposal for Garfield. Nothing is accepted.

## Draft ADR: replace DIRECTION.md principle 7

Status: proposed by Claude, waiting for Garfield's review. Supersedes principle 7 ("One vocabulary") of [DIRECTION.md](../design/DIRECTION.md). Goes in `docs/portfolio/decisions/` at the next number if accepted.

Proposed text:

> **7. Shared engineering, separate brands.** The house becomes an engineering layer, not a look. It keeps, once, for every product: font hosting and caching under one path, the accessibility floor (WCAG 2.2 AA contrast, focus visibility, skip link, landmarks, 44 px targets, status and alert behaviour), the reduced-motion and pause contract, performance budgets and their measurement, prefetch, cache and Back-restoration rules, the receipts data with its build checks, and the honesty labelling rules. Each product owns everything a visitor sees and hears: wordmark, typefaces, palette and both themes, shape and radii, layout grid, imagery, motion character, chrome (header, menu, footer), and voice. Shared behaviour may have a shared spec but never a shared look. The only visible element common to all products is a small credit line with a link home, in the same reading position in each footer. A house component that sets a visual value a product cannot override fails CI.

Consequences: house 3.0.0 is a breaking version. Mindmap stays on 2.0.1 while frozen. Section 3 of DIRECTION (house type and colour) becomes the hub's own brand spec. The 90/10 "calm house, lit rooms" principle is retired for products and kept for the hub.

## Decisions only the owner can make

1. **Accept or reject the draft ADR above.** Everything else depends on it.
2. **The four headline directions.** Hub "instrument panel on drafting paper", PaperLabs "annotated notebook", Slop "couture catalogue for garbage", Paluwagan "passbook". Subjective and expensive to reverse once built.
3. **Public names.** "PaperLabs" or "PaperLab". Whether "Online Paluwagan" stays the product name or gets a proper name.
4. **Slop commission.** Budget and who makes the masthead and cover set (human photographer or illustrator, or human-art-directed generation, credited). Also the final masthead line replacing "Generation is cheap. Taste is not."
5. **Paluwagan language.** English with Filipino words (default in this draft), or a full Tagalog or Taglish version. Scope-changing.
6. **Process blocks leave the products.** Moving "How this was built", ADR lists and receipts from product pages to hub case pages changes what the portfolio says about AI-assisted work (DIRECTION principle 8). The owner must accept that the credit lives on the hub.
7. **PaperLabs shelf.** Whether the PaperLabs home may list unbuilt labs by title. DIRECTION principle 6 ("finished or absent") forbids stubs. The default in this draft is to show only live labs.
