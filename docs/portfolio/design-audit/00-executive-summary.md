# Design audit: executive summary

2026-10-29. For Garfield Lim. Summarizes the two-pass audit of the hub, PaperLabs, Slop Editorial and Online Paluwagan. Everything is proposed, nothing is accepted. Living Mindmap is out of scope: it is frozen at its wave 3 state pending Gorges, and stays on house 2.0.1.

## 1. Overall health

The engineering floor is strong. Across 44 probe runs: 0 contrast failures, 0 unnamed controls, no horizontal overflow from 390 to 1440, one H1 and a skip link on every page, nothing animating after 6.5 s. The V1 live gate passed phone budgets on all five sites. The weakness is identity and the moments after an action.

The register holds 67 findings after merging 70 source findings (A 40, B 30): 2 Critical, 20 High, 29 Medium, 16 Low. One is resolved (B-PF-01, door names truncated, hub#24).

- Hub: credible and specific, but shows evidence as test-count tables. 13 findings.
- PaperLabs: one strong idea (attention arcs) inside a generic app shell, one lesson only. 13 findings, 1 Critical.
- Slop Editorial: the best raw material, framed by a neutral house gallery. 13 findings.
- Online Paluwagan: closest to its brief, but the weakest feedback loop for the least confident users. 19 findings.
- Cross-cutting: 9 findings, 1 Critical.

## 2. Biggest weaknesses

Brand. The four sites read as one website with four accent colours. That is by design: DIRECTION.md principle 7 ("One vocabulary") forbids the goal of distinct brands (A-X-01, Critical). The same crumb, menu, footer, Calm toggle and receipts drawer end every room. The hub's "checkable" thesis has become every product's positioning (A-X-04).

UX. Paluwagan gives no confirmation after recording a payment, drops focus to the page body after a reversal or approval, and its dialogs announce the wrong member to screen readers (B-OP-02, B-OP-03, B-OP-04). The primary job is buried on a 12.9-screen page (B-OP-01). PaperLabs has two live regions speaking on every keystroke (B-PL-02). The hub Work section is a dense repeated grid (4151 px at 390 against 3800).

## 3. Recommended creative direction

**Hub: "instrument panel on drafting paper."** A cool engineering panel that shows the mechanism and the measurement. IBM Plex Mono leads the headings, Plex Sans body, cool grey paper, one signal orange reserved for measured things, hand-drawn SVG mechanism diagrams. The only site that shows process.

**PaperLabs: "annotated notebook."** You play with the paper until the idea makes sense. Recursive in three instances (sans, casual notes, maths mono), cream dot grid, three meaning markers, controls on the drawing, a scrub across the sentence as the signature interaction.

**Slop Editorial: "couture catalogue for garbage."** AI slop framed like haute couture, deadpan and never explained. Bodoni Moda at 28 px and up, bone paper or an oxblood-black stage, lipstick and gilt, full-bleed plates, typed Courier Prime labels, curtain covers.

**Online Paluwagan: "passbook."** Plain, large, white, never surprising. Atkinson Hyperlegible Next for everything including money, ruled passbook rows, 56 px buttons, status colours only with icons, treasurer-first IA (Group home, Record, Passbook, Who owes).

No face is shared by two products. The only common visible element is the way home to the hub: a header link in the same place on every product, styled by each one, with a footer credit as a second path.

## 4. Most impactful performance and usability improvements

1. Paluwagan money writes: unique dialog names, an announced result after every write, "Record a payment" opens the form, true errors and a confirmed reversal, Back keeps your place (OP-F1 to OP-F5).
2. PaperLabs: one calm live region (PL-F1).
3. Slop: stop downloading fonts the house already serves, about 90 KB per first visit (SE-F1). Banner plays once (SE-F3).
4. Hub: bring the glyph field inside its budget (262 ms long task against 50 ms, PF-F1).
5. A live-host baseline (H-F1) before any other performance work, since most timings are local.

## 5. Implementation order

72 roadmap items: 28 Foundation, 22 Core, 13 Polish, 9 Future. Full order in [05](05-consolidated-priorities.md).

Starts today, no decision needed, on house 2.0.1: items 1 to 10 above plus the live baseline, then PF-F6 case pages and house 2.1.0 shared behaviour (H-F3).

Critical path: owner accepts the ADR (H-F2), then house 2.1.0 primitives, then house 3.0.0 with the doorway rebuilt, then migrations one product per PR (Slop, PaperLabs, Paluwagan), then product identities, then the hub moves last (PF-C1), then the signature-crop doors (PF-C2). Proof moves to case pages before any product drops it. The ADR is the longest wait, so it is requested on day one while the fixes run.

## 6. Tradeoffs needing approval

Ten decisions, ordered by what they block, in [06](06-open-decisions.md). The first two (the ADR and the four directions) gate all Core work. The rest are product-scoped: process on the hub, Paluwagan audience and language, names, the PaperLabs map, the Slop commission and media host, the doorway.

## How this was done

Two independent Opus agents. Agent A audited brand, creative direction and anti-slop. Agent B audited UI/UX, interaction and performance without reading A. Pass 1 produced the audits and a merged [register](pass-1-register.md). Pass 2 had each agent challenge and review the other, the lead settled six calls the agents left open ([joint calls](pass-2-joint-calls.md)), and the agents wrote per-project strategies, roadmaps and one order.

Skills: the owner's Gorges Native UX skill (B's primary lens), ux-ui-audit probes, design accessibility-review and design-critique, uxkin no-ui-slop, slop-patterns check-ui, slop-stopper final-review, unslop, and brand-studio brand-review and brand-strategy. The slop-patterns and uxkin MCP servers did not connect, so their rules were applied by hand.

Limits: all four sites were built locally from origin/main and measured in headless Chromium with a throttled phone profile. Live numbers are quoted from the V1 live gate. No real screen readers, no real devices, no WebKit or Firefox device pass, no user testing. Those validations are listed in each project's audit slice.
