# Personal Portfolio (hub) and house: implementation roadmap

Pass 2, step 3, 2026-10-29. Agent B. Combines [brand-strategy.md](brand-strategy.md) (Agent A) and [ux-strategy.md](ux-strategy.md) (Agent B) under the [joint calls](../pass-2-joint-calls.md). Finding IDs refer to the [register](../pass-1-register.md). Proposed, not adopted. Repo: `monsieurgregorio2001-coder.github.io` (static HTML, CSS, vanilla JS). The hub also owns the house, so the house 3.0.0 items (H-) live here.

Effort: S under a day, M one to three days, L more than three days. Phone profile: 390 x 844, 4x CPU, 1.6 Mbps, 150 ms RTT, live host, 3 runs, median.

## Phase 1: Foundation

**H-F1 · Live baseline** · S
- Rationale: B-X-01, B-PF-03, B-PF-04, B-PF-05, B-SE-01. Most perf findings are local only.
- Areas: `scripts/bench-rooms.mjs`, `.github/workflows/live-gate.yml`, new `scripts/bench-journeys.mjs`.
- Prerequisites: none.
- Impact: turns hypotheses into numbers before any redesign.
- Acceptance: a committed report with live `Cache-Control` and `ETag` per asset type, tap-to-useful-room cold and warm for all four doors, input delivered at 100, 300 and 500 ms after a doorway navigation (yes or no per engine), Chromium room-to-room CLS cause, Slop works index LCP.

**H-F2 · Accept the ADR "Shared engineering, separate brands"** · S (owner)
- Rationale: A-X-01. Draft in [06-open-decisions-draft-a.md](../06-open-decisions-draft-a.md).
- Areas: `docs/portfolio/decisions/` (next number), `docs/portfolio/design/DIRECTION.md` principle 7.
- Prerequisites: none.
- Acceptance: ADR merged as accepted by Garfield. Everything in phase 2 waits on it.

**H-F3 · House 2.1.0: shared behaviour, additive** · M
- Rationale: B-X-03, B-OP-03, B-OP-04, interface rules.
- Areas: `house/src/`, release `house/2.1.0/`.
- Prerequisites: none (additive, no visual change, rooms may adopt one piece at a time).
- Contents: result announcer (`role="status"` and `role="alert"` with the wording rule: who, what amount, which cycle or object), dialog helper with unique ids and focus return, focus-return-after-unmount helper, motion contract as a small JS API plus CSS custom properties, Calm state API so each product can put the switch in its own menu.
- Impact: one behaviour, four looks.
- Acceptance: unit tests for each primitive. axe 0 on `house/2.1.0/demo.html`. No style rules outside `:where()` so products can override at zero specificity. Mindmap untouched on 2.0.1.

**H-F4 · House 3.0.0: remove the shared look** · L
- Rationale: A-X-01, A-X-02, A-X-03, joint calls (doorway morph targets).
- Areas: `house/src/`, release `house/3.0.0/`, `house/2.0.1/tools/` successor, `scripts/check-house.mjs`, `scripts/check-gate.mjs`.
- Prerequisites: H-F2, H-F3.
- Contents: drop crumb, footer and menu styling, keep their behaviour as primitives. Rebuild the doorway with named elements `door` (poster) and `product-mark` (each product's wordmark), and a crossfade fallback when the other side has no `product-mark`. Contract check asserts behaviour (skip link, focus return, Calm effect, credit and return link present) instead of house markup. Fonts folder keeps only faces used by more than one product (joint call 1).
- Migration order, so nothing breaks: release 3.0.0 beside 2.0.1 (immutable). Products move one at a time: Slop (SE-C1), PaperLabs (PL-C1), Paluwagan (OP-C1), hub last (PF-C1). Mindmap stays on 2.0.1. The live gate runs every hub and product pair in both versions until the last move.
- Acceptance: doorway gate 20 of 20 Chromium and 19 of 20 WebKit for every mixed-version pair (hub 2.0.1 with a product on 3.0.0, and the reverse). No released folder edited (CI). Each product smoke test green against 3.0.0 before tagging.

**PF-F1 · Glyph field inside its budget** · S
- Rationale: A-PF-06, B audit long task 262 ms, DIRECTION section 8 ("no long task over 50 ms in the first 5 s").
- Areas: `field.js`, `hub.css`.
- Prerequisites: none.
- Acceptance: on the phone profile, no long task over 50 ms in the first 5 s (3 of 3 runs). One still frame on touch until first input. If it cannot pass, it is removed (A's signature cost budget).

**PF-F2 · Plex Mono H1 measurement gate** · S
- Rationale: joint call 5, A-PF-02.
- Areas: `scripts/check-gate.mjs`, a branch with Plex fonts in the hub repo.
- Prerequisites: none.
- Acceptance: the launch H1 sets in two lines at 360, 390 and 1440 with Plex Mono. If it fails, rerun with Commit Mono, then Plex Sans. The result is recorded and decides the H1 face.

**PF-F3 · Work section to one line per project** · M
- Rationale: A-PF-04, B-PF-02 (High, conflict 5), A-PF-01.
- Areas: `projects.json`, `scripts/build.mjs`, `index.html` (regenerated), `hub.css`.
- Prerequisites: PF-F6 (the commands move to case pages first).
- Acceptance: foyer 3800 px or less at 390 (today 4151 local, 4207 live). One headline figure per project, each with its slot source. Build diff check green.

**PF-F4 · One primary per first screen, labels never truncated** · S
- Rationale: B-PF-06, B-PF-01 (resolved, keep the guard).
- Areas: `index.html` via `scripts/build.mjs`, `scripts/shoot.mjs`.
- Acceptance: probe reports 1 primary on the 390 first screen. A long-name screenshot case at 1024, 1280 and 1440 shows every door name in full.

**PF-F5 · Underlined links** · S
- Rationale: A-PF-07, hue-only pair signal and link (1.11:1).
- Acceptance: every in-text link underlined in both themes. One link style in the hero.

**PF-F6 · Case pages carry all the proof** · M
- Rationale: A-X-04, A-PF-01. Products remove their receipts only after this.
- Areas: `work/<slug>/`, `projects.json`, `data/evidence/`.
- Prerequisites: none.
- Acceptance: each case page shows every test, eval, budget and command the product page shows today, in native `details` drawers with named summaries. Slots resolve (build fails otherwise).

## Phase 2: Core redesign

**PF-C1 · Hub on house 3.0.0 with its own brand** · L
- Rationale: A-PF-02, A-X-01.
- Areas: `hub.css` (tokens on `:root`), `index.html`, `work/`, `colophon/`, `changelog/`, `404.html`, fonts in the hub repo.
- Prerequisites: H-F4, PF-F2, all products migrated (hub moves last).
- Acceptance: Plex fonts 130 KB or less total, only the display weight preloaded. A's palette ratios rechecked on the built page (ink 17.0 / 15.8, ink-2 7.4 / 7.5, signal 4.73 / 9.31 only on `--bg`, link 5.23 / 8.85). Hub budgets hold: JS 20 KB gz, LCP 1.8 s cold, CLS 0.02, total first load 300 KB.

**PF-C2 · Doors as signature crops** · M
- Rationale: A-PF-03.
- Prerequisites: each product's phase 2 look exists.
- Acceptance: each door image 40 KB or less, sized, with alt text. Flagship poster is the only preloaded image.

**PF-C3 · Mechanism diagrams on case pages** · M
- Rationale: A-PF-01, A's motif 3.
- Acceptance: one SVG per project, text alternative, both themes, no script.

**PF-C4 · Touch prefetch for the flagship door** · S
- Rationale: B-PF-03, B-X-04.
- Prerequisites: H-F1 shows a measured gap.
- Acceptance: warm tap-to-useful-PaperLab 1.0 s or less on the phone profile. Speculation never `prerender`, skipped on Save-Data.

**PF-C5 · "How I work" rewritten with evidence** · S
- Rationale: A-PF-05, A-PF-08.
- Acceptance: copy lint green. Each claim links to a case page.

## Phase 3: Polish

**PF-P1 · Doorway that never costs a tap** · M
- Rationale: B-PF-04, A's challenge (ends on the product's brand).
- Prerequisites: H-F1 result, H-F4.
- Acceptance: a tap 100 ms after navigation reaches the new page in Chromium and WebKit. Reveal 600 ms or less, ends on the product's colours and mark. Calm: 160 ms fade.

**PF-P2 · Measured-mark microinteraction** · S
- Rationale: A's motif 2.
- Acceptance: hover, focus or press reveals the source command. Keyboard reachable, no hover-only content on touch.

**PF-P3 · Room-to-room CLS** · S
- Rationale: B-PF-05.
- Prerequisites: H-F1 cause.
- Acceptance: Chromium CLS 0.02 or less during room-to-room transitions on the live host.

## Phase 4: Future expansion

**PF-E1 · Gorges room and Mindmap retirement** · L
- Rationale: handover follow-up.
- Acceptance: Mindmap removed from 2.0.1 dependence only when Gorges ships. 2.0.1 folder stays (immutable).

**PF-E2 · Sticky claim index on case pages** · S
- Deferred by A. Acceptance when built: keyboard reachable, no CLS.

## Cross-project dependencies

- H-F4 blocks SE-C1, PL-C1, OP-C1 and PF-C1. Products move in that order, the hub last.
- PF-F6 blocks OP-F7, PL-F4 and SE-F4 (products drop proof only after the case pages hold it).
- PF-C2 needs every product's phase 2 identity.
- H-F1 feeds PF-C4, PF-P1, PF-P3 and SE-F2.
