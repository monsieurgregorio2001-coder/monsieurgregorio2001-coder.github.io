# Consolidated priorities

Pass 2, step 3, 2026-10-29. Agent B. One implementation order across the four roadmaps: [portfolio and house](portfolio/implementation-roadmap.md), [PaperLabs](paperlabs/implementation-roadmap.md), [Slop Editorial](slop-editorial/implementation-roadmap.md), [Online Paluwagan](online-paluwagan/implementation-roadmap.md). Proposed, not adopted. Item IDs are defined in those files.

## Ordering rules

1. Harm first. Defects that give users wrong or missing information about money, or break assistive technology, ship before anything visual. They need no decision and run on house 2.0.1.
2. Measure before redesign. Local numbers become live numbers before any performance work is scheduled.
3. Ask the owner early. The ADR is on the critical path, so it is requested on day one, in parallel with the fixes.
4. Proof moves before it is removed. Case pages hold the receipts before any product drops them.
5. The house split never breaks a product. 3.0.0 ships beside 2.0.1, products move one at a time, the hub last, Mindmap never.
6. Brand after structure. Each product's new identity lands after its migration and its IA changes, so each PR is reviewable and reversible alone.

## Item counts

| Project | Foundation | Core | Polish | Future | Total |
| --- | --- | --- | --- | --- | --- |
| Portfolio and house | 10 (4 house) | 5 | 3 | 2 | 20 |
| PaperLabs | 5 | 5 | 3 | 3 | 16 |
| Slop Editorial | 6 | 5 | 3 | 3 | 17 |
| Online Paluwagan | 7 | 7 | 4 | 1 | 19 |
| Total | 28 | 22 | 13 | 9 | 72 |

## Cross-project order

| # | Item | Why here |
| --- | --- | --- |
| 0 | H-F2 Owner accepts or rejects the ADR | Critical path. Requested now, runs in parallel with 1 to 10. |
| 1 | OP-F1 Unique dialog names | Screen readers hear the wrong member on approve (B-OP-03). S. |
| 2 | H-F1 Live baseline | Turns local perf findings into live numbers. Feeds SE-F2, PF-C4, PF-P1, PF-P3. S. |
| 3 | OP-F2 Announced result after every money write | No confirmation on record, focus to body (B-OP-02, B-OP-04). |
| 4 | OP-F3 "Record a payment" opens the form | Primary job buried on a 12.9-screen page (B-OP-01). |
| 5 | OP-F4 True errors, confirmed reversal | Contradictory error, lightest confirmation on the strongest action (B-OP-05, B-OP-06). S. |
| 6 | PL-F1 One calm live region | Screen readers chatter on every keystroke (B-PL-02). S. |
| 7 | SE-F1 No duplicate fonts | About 90 KB saved on every first Slop visit (B-X-02). S. |
| 8 | SE-F3 Banner plays once | Satire that costs reading space on phones (B-SE-02). S. |
| 9 | PF-F1 Glyph field inside its budget | Only measured budget miss (262 ms long task against 50 ms). S. |
| 10 | OP-F5 Back keeps your place | B-OP-09. S. |
| 11 | PF-F6 Case pages carry all the proof | Unblocks OP-F7, PL-F4, SE-F4 and PF-F3. |
| 12 | H-F3 House 2.1.0 shared behaviour | Additive. Gives every product the result, dialog, focus and Calm primitives before the split. |
| 13 | OP-F6 Peso sign and tabular figures | ₱ renders from a fallback font today. Needed before OP-C2. |
| 14 | PL-F2 Recursive instances and maths glyphs | Measurement and build. Needed before PL-C2. |
| 15 | PF-F2 Plex Mono H1 gate | Decides the hub face before PF-C1. S. |
| 16 | SE-F2 Works index cold load | After H-F1 confirms the live number. |
| 17 | OP-F7, PL-F4, SE-F4 Process blocks leave the products | After PF-F6. Shortens every product page. |
| 18 | PF-F3, PF-F4, PF-F5 Hub Work section, one primary, underlined links | After PF-F6. |
| 19 | PL-F3, PL-F5, SE-F5, SE-F6 Remaining small Foundation items | Any time in Foundation. |
| 20 | H-F4 House 3.0.0 | After H-F2 and H-F3. L. |
| 21 | SE-C1, then PL-C1, then OP-C1 Migrations | One product per PR, mixed-version doorway gate green each time. |
| 22 | OP-C2 to OP-C6, PL-C2 to PL-C4, SE-C2, SE-C4, SE-C5 Product identities and IA | Paluwagan first among them: highest user stakes. |
| 23 | PF-C1 Hub on 3.0.0 with its own brand | Hub moves last. Needs PF-F2. |
| 24 | PF-C2 to PF-C5 Doors, diagrams, prefetch, copy | Doors need every product's new look. |
| 25 | Phase 3 polish, each product | Motion and gestures only on finished structure. |
| 26 | Phase 4 items | Each gated by an owner decision or a finished prerequisite (second lesson, media host, backend protocol). |

SE-C3 (art direction) and OP-C7 (language) start whenever the owner decides their spend and scope. They are not on the critical path.

## Critical path

```
H-F2 ADR accepted (owner)
  -> H-F3 house 2.1.0 primitives (M)
  -> H-F4 house 3.0.0, doorway rebuilt on door + product-mark, behaviour contract (L)
  -> SE-C1 -> PL-C1 -> OP-C1 migrations (M each)
  -> SE-C2, PL-C2, OP-C2 product identities (L each, can overlap)
  -> PF-C1 hub on 3.0.0 (L, also needs PF-F2)
  -> PF-C2 signature-crop doors (M)
```

Parallel branch that must finish before PF-F3 and the product proof removals: PF-F6 case pages, then OP-F7, PL-F4, SE-F4.

The longest single dependency is the owner's ADR decision. Items 1 to 10 deliver most of the user-facing value without it, so nothing waits idle.

## Gates that apply to every item

- axe 0 at 390 and 1280 in both themes, keyboard script green, Calm and reduced-motion screenshots reviewed.
- Budgets from DIRECTION section 8 on the phone profile, live host, both engines.
- Doorway live gate for every hub and product pair, including mixed house versions during migration.
- Contrast rerun on the built page for every new palette. Hue-only pairs always carry a second cue.
