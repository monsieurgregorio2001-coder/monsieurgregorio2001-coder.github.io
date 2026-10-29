# Pass 2: Agent B review of Agent A's brand strategies

Agent B, 2026-10-29. Checks the four `brand-strategy.md` files and the draft ADR "Shared engineering, separate brands" for technical feasibility, performance cost, accessibility and maintainability, then answers [A's challenges](pass-2-a-challenges.md). I did not edit A's files.

## How this was measured

- Fonts: downloaded the Fontsource 5.3.0 packages with `npm pack` (IBM Plex Sans variable, IBM Plex Mono, Recursive variable, Bodoni Moda variable, Newsreader variable, Courier Prime, Atkinson Hyperlegible Next variable) and read them with fontTools: WOFF2 size of the Latin subset, cmap coverage (₱ U+20B1, minus, √, ×, Σ, ≈), `tnum` feature, default digit advances. Recursive was instanced with `fontTools.varLib.instancer` to measure each axis plan. Scripts: `/tmp/claude-0/-home-user/64d8fb9e-1614-54db-87bf-29b299ef88b5/scratchpad/agent-b/fonts/chk.py`, `chk2.py`, `chk3.py`.
- Contrast: WCAG 2.x relative luminance for every pair in A's palettes, plus pairs A did not list (marker on its own wash, accents against each other). Script `contrast.py` in the same folder.
- Fontsource subsets follow Google's unicode ranges. A glyph missing from both the Latin and Latin Extended subsets is very likely missing from the font. Upstream TTFs were not checked. Treat coverage as "verify upstream" where it matters.

## Headline results

- Every contrast ratio A printed is correct to within 0.05. All text pairs pass 4.5:1 in both themes. Two risks A did not list are below.
- Atkinson Hyperlegible Next has no ₱ in either subset, and its default figures are proportional (10 different digit widths). It does have `tnum`.
- House Inter 2.0.1 has no ₱ either. Today every peso sign in Paluwagan falls back to a system font. The planned re-cut never shipped (handover follow-up). This is a current defect, not only a planning note.
- Recursive with A's full axis plan is 187 KB, against the 70 KB file budget A cites. It fits only if the axes are split into instances.
- Slop's four-family plan is about 386 KB of fonts on a page that shows all of them, against a 129 KB budget. It fits at about 130 KB with variable-weight files and no optical-size axis on Newsreader.
- The Portfolio plan fits easily (about 89 KB).

## Portfolio: "instrument panel on drafting paper"

| Check | Result |
| --- | --- |
| Fonts | Plex Sans variable Latin 44 KB, Plex Mono 400 / 500 / 600 Latin 14 / 15 / 15 KB. About 89 KB for all four files against the hub's 160 KB budget. Two families. Plex Sans and Mono digits are tabular by default (single advance 600). Pass. |
| Contrast | ink 17.0 / 15.8, ink-2 7.4 / 7.5, signal 4.73 / 9.31, link 5.23 / 8.85. Pass. Signal orange in light mode is close to the floor: never use it on anything but `--bg` (no tinted panels). |
| Signal vs link | 1.11:1 luminance difference. They differ by hue only. Links also need an underline so they never rely on colour (WCAG 1.4.1). |
| H1 gate | A mono display face is wide. At 36 px, Plex Mono sets about 16 characters per line. "I build AI tools / you can check." fits two lines at 390 (358 px measure) with no slack, and breaks to three at 360. The CI gate (two lines at 360, 390, 1440) must be rerun, or the display size lowered at 360. HYPOTHESIS until rendered. |
| Usability | Mono uppercase labels at 13 px with tracking are slower to read. Keep them to labels, never to sentences. A already says "sparingly". |
| Scope | Hand-drawn SVG diagrams per project are content work, not infrastructure. Fine, one per case page. |

## PaperLabs: "annotated notebook"

| Check | Result |
| --- | --- |
| Fonts | Recursive Latin, all five axes: 297 KB. A's plan (MONO, CASL, wght 300 to 800, slnt 0 to -8, CRSV pinned): 187 KB. With slant pinned at 0: 107 KB. CASL 0 to 1 only, MONO 0: 84 KB. DIRECTION's plan (CASL 1, MONO 0): 50 KB. Measured split that delivers A's three voices: sans (CASL 0, MONO 0, wght 300 to 800) 45 KB, mono for numbers (MONO 1, wght 400 to 600) 40 KB, margin-note static (CASL 1, slnt -8, wght 500) 31 KB. |
| Budget fit | Sans plus mono is 85 KB, inside the 92 KB PaperLab font budget, with the note face loaded lazily after LCP (116 KB total). One variable file with every axis cannot meet the 70 KB per-file rule. |
| Maths glyphs | √, Σ (U+03A3 and U+2211) and ≈ are absent from every Fontsource subset of Recursive. Minus and × are present. Verify upstream. If missing, set formulas with a fallback that has them, metric-matched, or draw them in SVG. |
| Contrast | ink 16.2 / 15.5, ink-2 7.3 / 8.3, red 5.2 / 7.85, teal 5.46 / 9.38, violet 5.42 / 8.84. Pass as text on paper. |
| Risk 1 | Each marker on its own 20 percent wash is 3.85 (red), 4.12 (teal), 4.10 (violet). Fails 4.5:1 for marker-coloured text on a marker wash. Use ink on washes (11.98 to 12.22). |
| Risk 2 | The three markers are within 1.05:1 of each other in luminance. Their meaning is carried by hue only, which fails for many colour-blind readers (WCAG 1.4.1). Pair each with a second cue: line style for arcs (solid, dashed, dotted), shape for annotations. |
| Usability | Casual italic margin notes at small sizes read slower. Keep notes at 16 px or more. |

## Slop Editorial: "couture catalogue for garbage"

| Check | Result |
| --- | --- |
| Fonts as specified | Bodoni Moda opsz roman 45 KB plus italic 52 KB, Newsreader opsz roman 128 KB plus italic 143 KB, Courier Prime 18 KB. About 386 KB if a page uses them all (the work pages would: masthead italic, headline, body, italic caption, price label). Budget 129 KB. Fails by about 3x. |
| Fit | Bodoni wght-only roman 25 KB and italic 30 KB, Newsreader wght-only roman 57 KB, Courier 18 KB: 130 KB. Captions in Newsreader roman, or italic loaded after LCP (+63 KB). The masthead as an SVG (A's commission) costs a few KB and removes the Bodoni italic from the critical path. |
| Didone at small sizes | Bodoni Moda's hairlines thin out quickly below display size. Without the opsz axis, restrict Bodoni to 28 px and above. Nothing a reader must read (prices, captions, buttons) in Bodoni. |
| ₱ and figures | Bodoni has `tnum`, proportional by default. Courier Prime has no ₱. Slop prices are in USD today, so fine. |
| Contrast | ink 16.2 / 16.5, ink-2 6.8 / 8.7, lipstick 7.0 / 7.2, gilt 6.65 / 12.56, ink on sticker yellow 12.4. Pass. Sticker yellow as text on bone is 1.31: A already restricts it to fills. Keep that a lint rule. |
| Dark by default | "Evening edition" as default overrides `prefers-color-scheme`. That is a usability and accessibility choice (users who need light mode for glare or low vision get dark first). B's position: follow the OS, offer the edition toggle. Joint call. |
| Captions | Newsreader italic 15/22 on phones is below the 16 px floor used elsewhere. Use 16 px or more. |
| Scope | A commissioned masthead and re-art-directed plates are owner spend. Listed in open decisions already. |

## Online Paluwagan: "passbook"

| Check | Result |
| --- | --- |
| Fonts | Atkinson Hyperlegible Next variable Latin 33 KB. One family. Well inside 140 KB. |
| ₱ | Missing from Atkinson Next (both subsets) and from house Inter today. Needs a ₱ added in the subset step, drawn to Atkinson's stroke and metrics. Ship nothing until a rendered check shows the glyph comes from the product face. |
| Tabular figures | Default digits are proportional. `font-variant-numeric: tabular-nums` must be set on every amount, including the pot and the input, or columns will not align. Atkinson Hyperlegible Mono stays the fallback. |
| Contrast | ink 17.7 / 16.8, ink-2 10.3 / 11.6, green 6.6 / 9.9, blue 6.7 / 8.9, amber 6.3 / 11.1, red 6.6 / 8.1, white on green button 6.6. Pass with margin. Good for older readers. |
| Colour-only risk | Green, amber and red are within 1.04:1 of each other in luminance. A's icon-plus-word pills solve this. The icon set is required, not optional. |
| Sizes | 18 px body, 20 px amounts, 44 px pot, 56 px buttons, 28 px pills. All match B's strategy or exceed it. Pills are status, not controls, so 28 px is fine. Any pill that becomes tappable needs 48 px. |
| Scope | One line illustration on empty and success states: fine. Keep it under 3 KB SVG. |

## House 3.0.0 ("Shared engineering, separate brands")

- Support the split. It is B's boundary too.
- Maintainability risk: if every product face lives under `/house/<version>/fonts/`, a font tweak in one product forces a house release and a version bump in four repos. Since no faces are shared any more, the cross-site cache benefit disappears. B's position: product faces live in each product repo with hashed names. The house hosts only shared behaviour, shared tokens for focus and motion, and any face two products really share. Joint call.
- The doorway's named elements (`house-crumb`, `house-wordmark`) disappear with the crumb. The morph must be rebuilt around the door poster and the product's own mark, or it will silently fall back to a crossfade.
- The receipts drawer and Calm switch stay shared behaviour with per-product styling. The live gate and smoke tests must assert behaviour (focus return, Calm effect) instead of house markup.
- Version policy stays: immutable folders, smoke tests of all rooms before tagging.

## Response to A's challenges

| A's point | B's answer |
| --- | --- |
| B-PF-01: cause is identity, replace thumbnails with signature crops | Accept. Already fixed for width (hub#24). Signature crops also cut thumbnail weight, since they can be small single images. |
| B-PF-02: a drawer still leaves four identical forms | Accept. Density and sameness are one work item. |
| B-PF-04: doorway ends on the product's own colours and mark | Accept. Strategy updated. Timing stays B's: reveal must not swallow input. |
| B-PL-05: scrub is a brand question, raise to Medium | Accept. Strategy updated. |
| B-SE-02: banner plays once per session, styled as the magazine | Accept. Strategy updated. |
| B-OP-08: gap is specific to 820, tablet carries trust cues | Accept. Strategy updated. |
| B-OP-11: the money face must render in the input at the same size | Accept. Strategy updated. |
| Contrast must be rerun after implementation | Accept. Ratios above are for the drafts only. |
| Shared hosting is not shared faces | Accept the principle. Rebut the location: product faces belong in product repos (see House 3.0.0). |
| Conflict 1: credit line in the footer, first item | Accept with two conditions: every product's menu also has a "Garfield Lim" home link, so the way out is never a long scroll away on a 7000 px page, and the footer position is identical in all four. |
| Conflict 3: Atkinson for all money | Accept, conditional on the ₱ glyph and forced tabular figures above. |
| Conflict 4: 17 px word, shape per status, 28 px pill | Accept. |
| Conflicts 5 and 6 | Agree (High, Medium for Slop only). |

## Joint calls still open

1. Where product fonts live: house folder or product repo.
2. Slop dark by default or following the OS.
3. Slop font budget: drop Newsreader's optical-size axis and make the masthead an SVG, or raise the 129 KB budget.
4. PaperLabs: three Recursive instances (B) or one file with a raised budget.
5. Portfolio: rerun the H1 line gate with Plex Mono before the face is adopted.
