# Pass 2 joint calls

Recorded 2026-10-29 by the lead after both cross-reviews. These were left open between Agent A and Agent B. Each is an ordinary design or technical decision, so the lead decided it from the evidence in pass-2-a-review-of-b.md and pass-2-b-review-of-a.md. None needs the owner. Each can be reversed in the implementation PR that touches it.

| # | Question | Decision | Reason |
| --- | --- | --- | --- |
| 1 | Where do product-only fonts live? | In each product's own repository. The house keeps only faces that more than one product actually uses. | A product-only face is never downloaded twice, so a shared folder saves nothing. Keeping it in the product repo avoids a house release and four version bumps for every type change. The rule against duplicate downloads still holds for shared faces. |
| 2 | Slop default scheme | Follow the OS colour scheme. The Room toggle stays as the override, and the dark "evening edition" is one choice in it. | Keeps the accessibility default from DIRECTION and Slop's existing behaviour. |
| 3 | Slop font budget | Keep the 129 KB budget. Drop the optical size axis, draw the masthead as inline SVG, load Newsreader only when long-form ships. | B measured about 130 KB on this plan against 386 KB on the full plan. The look survives, the budget holds. |
| 4 | PaperLabs Recursive | Three static instances (sans, mono, casual notes). Sans and mono on first paint (85 KB of a 92 KB budget), notes after first paint. Check the maths glyphs (√, Σ, ≈) in the upstream files before adoption, and fall back to a system maths font for them if missing. | The only measured setup that fits. |
| 5 | Portfolio Plex Mono H1 | A Foundation gate: the two-line H1 check at 360, 390 and 1440 must pass with Plex Mono before it is adopted. If it fails, the H1 uses Commit Mono, then Plex Sans. | Decided by measurement, not taste. |

Also carried into the roadmaps from the reviews:

- The peso sign is missing from house Inter 2.0.1, so Paluwagan renders ₱ from a fallback font today, and from Atkinson Hyperlegible Next as well. A ₱ glyph drawn to the money face's metrics is a Foundation item.
- Hue-only pairs (Paluwagan status colours, PaperLabs markers, portfolio signal and link) always carry a second cue: an icon, a line style or an underline.
- House 3.0.0 must rebuild the doorway morph targets, because the crumb and wordmark elements it animates are removed.
- A-PL-06 and A-OP-08 ("not measured yet" receipts) are closed as not reproducible on the live host.
