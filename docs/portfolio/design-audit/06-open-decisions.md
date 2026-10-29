# Open decisions for the owner

Pass 2, final, 2026-10-29. Merged from the Agent A and Agent B drafts. Only decisions that are subjective, change scope, or are expensive to reverse. Anything settled in the [joint calls](pass-2-joint-calls.md) or resolvable from evidence is left out. Ordered by how much work each one blocks. Item IDs refer to the roadmaps listed in [05](05-consolidated-priorities.md).

Nothing here blocks the harm fixes. Items 1 to 10 of the cross-project order in 05 can start today on house 2.0.1.

## 1. Accept the ADR "Shared engineering, separate brands"

- Question: replace DIRECTION.md principle 7 ("One vocabulary") with a house that is an engineering layer only, and give each product its own visible identity?
- Options: accept as drafted, accept with edits, reject and keep one house look.
- Recommendation (A and B agree): accept. The current principle forbids the owner's goal of four distinct brands (A-X-01, Critical).
- Blocks: the whole critical path. H-F3, H-F4 house 3.0.0, every migration (SE-C1, PL-C1, OP-C1), every product identity and PF-C1.
- Reversibility: cheap now, expensive once 3.0.0 ships and products migrate.

Proposed text, for `docs/portfolio/decisions/` at the next number:

> **7. Shared engineering, separate brands.** The house becomes an engineering layer, not a look. It keeps, once, for every product: font hosting and caching under one path, the accessibility floor (WCAG 2.2 AA contrast, focus visibility, skip link, landmarks, 44 px targets, status and alert behaviour), the reduced-motion and pause contract, performance budgets and their measurement, prefetch, cache and Back-restoration rules, the receipts data with its build checks, and the honesty labelling rules. Each product owns everything a visitor sees and hears: wordmark, typefaces, palette and both themes, shape and radii, layout grid, imagery, motion character, chrome (header, menu, footer), and voice. Shared behaviour may have a shared spec but never a shared look. The only visible element common to all products is a small credit line with a link home, in the same reading position in each footer. A house component that sets a visual value a product cannot override fails CI.

Consequences: house 3.0.0 is a breaking version. Mindmap stays on 2.0.1 while frozen. DIRECTION section 3 (house type and colour) becomes the hub's own brand spec. The 90/10 "calm house, lit rooms" principle is retired for products and kept for the hub. Joint call 1 amends the font clause: product-only faces live in each product repository, the house hosts only faces two products share.

Interaction with the V1 owner checklist: "Accept or reverse ADRs 0009 to 0017 and the room ADRs" still stands. Any of those that encode the shared look (the house vocabulary, the doorway, the hub headline) should be read alongside this ADR, so both can be decided in one sitting.

## 2. Approve the four directions

- Question: adopt the four headline directions in the brand strategies?
- Options: approve all, approve some, ask for alternatives per product.
  - Hub: "instrument panel on drafting paper" ([portfolio](portfolio/brand-strategy.md))
  - PaperLabs: "annotated notebook" ([paperlabs](paperlabs/brand-strategy.md))
  - Slop Editorial: "couture catalogue for garbage" ([slop-editorial](slop-editorial/brand-strategy.md))
  - Paluwagan: "passbook" ([online-paluwagan](online-paluwagan/brand-strategy.md))
- Recommendation (A and B agree): approve all four. They pass the differentiation test in [04](04-cross-project-differentiation.md) on every dimension and each fits its budget after the joint calls.
- Blocks: adoption of OP-F6, PL-F2 and PF-F2 results, and all Core identity work (SE-C2, PL-C2, OP-C2, PF-C1, PF-C2).
- Reversibility: subjective and expensive once built. Cheap before Core starts.

## 3. Process and AI credit move to hub case pages

- Question: move "How this was built", ADR lists, receipts and developer surfaces off product pages and onto the hub case pages at `/work/<room>/`?
- Options: move all, move some (keep a short receipt line in each product), keep as today.
- Recommendation (A and B agree): move all, after PF-F6 makes the case pages carry the full proof. Products then show their own subject and the hub shows process.
- Blocks: OP-F7, PL-F4, SE-F4, PF-F3, and with them the shorter product pages.
- Reversibility: easy technically. It changes what the portfolio says about AI-assisted work (DIRECTION principle 8), which is why it needs the owner.

## 4. Online Paluwagan: demo or product, and backend

- Question: is Paluwagan designed for real treasurers or does it stay a portfolio demo read mainly by reviewers? If real, does it ever get a backend?
- Options: (a) demo, local-only, (b) product for real treasurers, still local-only, with user sessions, native-reviewed Filipino copy and proof off the member path, (c) product with a planned backend.
- Recommendation: no joint pick. The UX strategy is written treasurer-first and the Foundation fixes help either way. A backend is the most expensive choice to reverse, so B advises not to plan one until the audience is settled.
- Blocks: how far OP-C3 simplifies the member path, OP-P4 usability sessions, OP-E1 backend protocol (server-authoritative writes, idempotency, pending states).
- Reversibility: (a) and (b) are cheap to switch. (c) is expensive.

## 5. Online Paluwagan language

- Question: English with familiar Filipino words, or a full bilingual product with a visible switch?
- Options: English with Filipino words (A's default), bilingual Filipino and English with a switch (B's assumption), full Tagalog or Taglish.
- Recommendation: agents split. A defaults to English with Filipino words because it is in scope today. B assumes a switch for the treasurer audience. Either way, Filipino copy needs a native-speaker review.
- Blocks: OP-C7 only. Not on the critical path. Depends partly on decision 4.
- Reversibility: adding a switch later is moderate work. Removing one is cheap.

## 6. Product names

- Question: is the public name "PaperLabs" or "PaperLab" (the repo is `paperlab`)? Does "Online Paluwagan" stay the product name or get a proper name?
- Options: per product, keep the current name or pick a new one.
- Recommendation: none from the agents. This is the owner's naming call.
- Blocks: the PaperLabs and Paluwagan wordmarks (PL-C2, OP-C2), Open Graph copy, case page titles.
- Reversibility: cheap before the wordmarks ship, costly after (links, images, copy everywhere).

## 7. PaperLabs lesson map and shelf

- Question: build the lesson map (the "paper shelf") now with one lesson, or wait for a second lesson? May it list unbuilt labs by title?
- Options: map now with one live lesson, map after a second lesson, map listing unbuilt titles.
- Recommendation (A and B agree): show only live labs, as DIRECTION principle 6 ("finished or absent") requires. B would build the map now so the scrub ships with it. A's strategy builds the shelf after a second lesson. The owner picks the timing. Either way Attention moves to `/paperlab/attention/`.
- Blocks: PL-C5 and PL-E1.
- Reversibility: cheap.

## 8. Slop Editorial commission and masthead line

- Question: what budget, and who makes the masthead and the cover set (a human photographer or illustrator, or human-art-directed generation, credited)? What line replaces "Generation is cheap. Taste is not."?
- Options: commission a human maker, human-art-directed generation, or no commission (re-crop existing plates).
- Recommendation: none on spend. A's direction assumes a commissioned, credited cover set. Not on the critical path.
- Blocks: SE-C3, the masthead part of SE-C2, and the tagline acceptance in SE-C4.
- Reversibility: money spent is not recoverable. The line is cheap to change.

## 9. Slop Editorial media host, only if video ships

- Question: if video plates ship, accept a separate media host, or keep video short and few on GitHub Pages?
- Options: separate host (a third-party request, against the current privacy rule), short and few videos on Pages, no video.
- Recommendation (A and B agree): commission no video until this is decided. The service worker byte budget is cheap to set before the first video and expensive after.
- Blocks: SE-E1 only.
- Reversibility: moving media later means re-linking every plate.

## 10. The doorway as the shared signature

- Question: keep the doorway animation as the portfolio's shared signature under the new ADR?
- Options: keep, rebuilt in 3.0.0 on `door` and `product-mark` with a crossfade fallback, or retire it for plain navigation.
- Recommendation (A and B agree): keep. The return path is settled by the agents: a 44 px "Garfield Lim" home link in every product header, top and trailing, before the menu, same position in all four, styled by the product and used as the doorway exit target, plus the "A Garfield Lim project" credit line first in every product footer as a second path (joint call 6).
- Blocks: the doorway part of H-F4 and PF-C2.
- Reversibility: moderate. It was adopted as the signature, so dropping it is a public change.

## Still open on the V1 owner checklist, and how they interact

- Accept or reverse ADRs 0009 to 0017 and the room ADRs: decide together with decision 1.
- Test on real iOS Safari 26 with VoiceOver and a mid-range Android: also validates B-OP-03 and B-PL-02, the top harm fixes.
- Sign off the Paluwagan reminder rubric: read alongside decision 4.
