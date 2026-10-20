# Direction: Show Your Work

Final direction for Garfield Lim's portfolio, 2026-10-20. Produced by a three-direction design panel (Precision, The House, Instrument) judged through hiring, design-director, and staff-engineer lenses, then synthesized and adopted by the lead agent under Garfield's delegation. Status: adopted; proposed by Claude, reversible. Binding for the build: every project plan follows this file, and only a new ADR changes it.

Base: the precision direction (judges' tally 169, instrument 160, house 151). Grafted from instrument: immutable house versions, `evidence.json`, an L-sized Mindmap room, a ledger check that can fail. Grafted from house: the clip-path doorway, static doors, the doorway bench first. Every judge must-fix is applied or explicitly overruled in section 9.

Rules for readers: "must" and "never" are rules. Numbers inside sample copy show format only; the page prints what the code computes or what `evidence.json` holds. Hex values and contrast ratios in section 3 are computed.

## 1. Name, thesis, story

**Show Your Work.** One calm house, four lit rooms. Each room ships the thing and the check: one object that lets a visitor test the project's central claim with their own hands.

**Hub H1 at launch:** "I build AI tools you can check."

The four projects share no domain (the audit found "messy operations" fits only Paluwagan), but they share a habit. PaperLab shows its numbers. Paluwagan reconciles its ledger. Living Mindmap marks every agent edit and refuses duplicates. Slop Editorial's pipeline refuses to spend past a cap. That habit is the "taste and judgment shown through the work" positioning, said once and proven four times. The honesty rules become the brand.

**What a reviewer should leave with:** Garfield Lim is an applied AI engineer in Cebu, open to remote work, who builds AI tools and ships the proof with them. In PaperLab you switch off the scaling in attention, watch one word take everything, and open the numbers that prove it. In Online Paluwagan you forge a line in a savings circle's ledger and the books catch you, to the centavo. In Living Mindmap you watch a recorded agent extend a map through MCP, see a near-duplicate refused, and move the guard's threshold to read an eval of what it gets wrong. In Slop Editorial you laugh at a gallery of AI slop, then find its pipeline will not spend past a cap. Every number comes from a test run, an eval, or your own browser, and every toy says what it is not. The house is quiet and identical everywhere. Its one wild beat is the doorway that opens each room.

## 2. Principles

1. **Ship the thing and the check.** One proof toy per room. If it does not prove the room's claim in one sentence, it does not ship.
2. **Every number has a source.** Computed live in the browser, or read from `evidence.json` through a typed slot. Nothing else.
3. **Label the truth in the first screen.** Toy size, designed heads, demo group, simulated send, recorded demo, sample content. Never dismissible.
4. **Calm house, lit rooms (90/10).** Reading, navigation, and contact never move on their own. The wild 10 percent is the doorway, the field's door effect, and one toy per room.
5. **Phone and Calm first.** The 10-second test runs in CI at 390 x 664 with JavaScript off and reduced motion on.
6. **Finished or absent.** No "coming soon" rungs, no stubs. Cut before you stub.
7. **One vocabulary.** Type, colour, radii, and motion live once, in the house. Ad-hoc curves or colours in house components fail CI.
8. **Owner authority is explicit.** Agent decisions are logged as proposed and reversible. Public "How this was built" blocks never credit Garfield with a decision Garfield has not accepted.

## 3. House layer spec

House tokens use the `--h-` prefix so they never collide with room tokens. House components read only `--h-*` and the room contract `--room-*` (4.3). Rooms keep their own tokens for their own content (PaperLab ADR 0004 holds).

### 3.1 Type

All self-hosted WOFF2, SIL OFL 1.1, already shipped by the hub (ADR 0002):

| Family | Axes and file | Use |
| --- | --- | --- |
| Fraunces | variable `opsz` 9 to 144 (auto), `wght` 100 to 900, Latin, 67 KB, the only preload | wordmark, H1, section titles |
| Inter | variable `wght` 100 to 900, Latin re-cut to add U+20B1 (₱), U+2212, U+2009, about 49 KB | UI, body, all money (tabular) |
| JetBrains Mono | static 400 (glyph field only, after LCP, 21 KB) and 500 (figures, 22 KB) | figures, code, the field |

Fallbacks use `size-adjust` metrics on local Georgia and Arial. Room faces: PaperLab uses **Recursive** (OFL, instanced to `CASL` 1, `MONO` 0, `slnt` 0, `wght` 300 to 800, Latin, 70 KB or less) with JetBrains Mono, which settles PaperLab ADR 0004's face. Bricolage Grotesque stays Slop's alone. Paluwagan and Living Mindmap use house faces only.

| Token | Family | Size / line height | Weight, tracking | Use |
| --- | --- | --- | --- | --- |
| `--h-t-display` | Fraunces | clamp(40px, 24px + 4.4vw, 88px) / 1.02 | 560, -0.025em | hub H1 |
| `--h-t-title` | Fraunces | clamp(30px, 22px + 2vw, 52px) / 1.06 | 560, -0.02em | section titles, case H1 |
| `--h-t-heading` | Inter | 20/26 (17/22 under 600 px) | 600, -0.014em | door and receipt names |
| `--h-t-lede` | Inter | clamp(17px, 15.5px + 0.5vw, 22px) / 1.4 | 400, -0.012em | ledes |
| `--h-t-body` | Inter | 16/25 (17/26 from 900 px) | 400, -0.011em | body |
| `--h-t-callout` | Inter | 15/21 | 500, -0.006em | proof lines, crumb links |
| `--h-t-label` | Inter | 14/20, sentence case | 600, 0 | eyebrows, chips |
| `--h-t-caption` | Inter | 13/18 | 400, 0 | captions, small print |
| `--h-t-figure` | JetBrains Mono 500 | inherits, `tabular-nums` | 500 | figures |

Nothing below 13 px (the field's 11 px canvas glyphs are decorative and `aria-hidden`). `text-wrap: balance` on headings, `pretty` on body. Money is Inter tabular, never mono. CI asserts the launch H1 sets in two lines at 360, 390, and 1440 px, and the interim H1 in three (the interim line caps `--h-t-display` at 72 px on desktop).

### 3.2 Colour

Neutrals keep the hub's shipped warm paper. Ratios against `--h-bg`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--h-bg` | #FAF8F4 | #0F0F12 | page |
| `--h-surface` / `--h-surface-2` | #FFFFFF / #F2EFE9 | #17171C / #1F1F25 | tiles / grouped lists |
| `--h-ink` | #17171B (16.9:1) | #ECEAE5 (15.9:1) | text |
| `--h-ink-2` | #5F5F6B (5.9:1) | #A3A1AA (7.5:1) | secondary text |
| `--h-ink-3` | #8C8B94 (3.2:1) | #6C6B74 (3.6:1) | decoration only, never text |
| `--h-rule` | #E6E2DA | #2A2A31 | hairlines |
| `--h-accent` | #2340B8 (7.9:1) | #9DB0FF (9.2:1) | links, hub focus |
| `--h-positive` / `--h-warning` / `--h-negative` | #1E7A4F / #9A6200 / #B42318 (5.0, 4.8, 6.2:1) | #6FD3A0 / #F2C46B / #FF8A80 | states |

The filled capsule is `--h-ink` with `--h-bg` text. On the hub, the only chroma belongs to rooms and focus.

Room hues: `--room` for fills, rings, and posters (non-text, 3:1 or better, except Slop's yellow, which is fill only); `--room-ink` for text; `--room-wash` for tiles.

| Room | `--room` light | `--room-ink` light | Dark (fill and ink) | Wash light / dark |
| --- | --- | --- | --- | --- |
| PaperLab | oklch(0.62 0.19 32) #E14C33 (3.8:1) | oklch(0.53 0.17 32) #BA3822 (5.4:1) | oklch(0.74 0.15 32) #FB836D (7.8:1) | #FFEBE6 / #2F1C19 |
| Online Paluwagan | oklch(0.55 0.10 160) #31835D (4.4:1) | oklch(0.50 0.09 160) #2B7351 (5.4:1) | oklch(0.76 0.10 160) #75C59B (9.3:1) | #E3F6EA / #14261D |
| Living Mindmap | oklch(0.55 0.19 292) #7853D5 (5.0:1) | oklch(0.52 0.19 292) #6F49CA (5.7:1) | oklch(0.74 0.14 292) #AD99FB (8.0:1) | #F0EEFF / #221F2F |
| Slop Editorial | oklch(0.86 0.16 95) #F2CF3B (ink on it 11.7:1) | oklch(0.50 0.10 85) #7D5E07 (5.7:1) | oklch(0.88 0.15 95) #F6D653 (13.4:1) | #F5F0DE / #262210 |

Room ink on its wash is 5.0:1 or better. The PaperLab door is dark in both themes: #0C0D0F canvas, #EFEFEA text (16.9:1), #FB836D threads (7.9:1). Colour is never the only signal.

### 3.3 Space, grid, breakpoints

Spacing 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Breakpoints 360 (minimum, no horizontal scroll), 600, 1024, 1440 (reference). Grid: 4 columns with 16 px gutters under 600; 6 columns with 24 px to 1023; 12 columns with 24 px gutters from 1024, max content 1200 px centred (78 px columns, 120 px margins at 1440). Doors and receipts use container queries.

### 3.4 Shape and material

Radii: `--h-r-xs` 8 (chips), `--h-r-sm` 12 (inputs, thumbnails), `--h-r-md` 18 (panels, grouped lists), `--h-r-lg` 28 (doors, sheets), `--h-r-pill` 999. Concentric rule: inner radius equals outer radius minus inset (a 28 px door with a 10 px inset holds an 18 px poster). `@supports (corner-shape: squircle)` adds squircles and raises each radius by 6 px. At most three radii per screen. Elevation: none at rest; door lift on fine pointers only (`translate: 0 -2px`, `0 12px 32px -12px rgb(23 23 27 / .18)`, 200 ms); dark mode uses surface steps, no shadows.

Glass on exactly two things: the crumb after 8 px of scroll, and popovers (Menu, toast). Never on content, never stacked.

```css
--h-glass-fill: color-mix(in oklab, var(--room-bg) 78%, transparent); /* dark: 72% */
--h-glass-filter: blur(20px) saturate(180%);
--h-glass-edge: inset 0 -1px 0 color-mix(in oklab, var(--room-fg) 8%, transparent);
@media (prefers-reduced-transparency: reduce), (prefers-contrast: more), (forced-colors: active) {
  :root { --h-glass-fill: var(--room-bg); --h-glass-filter: none; } /* plus a solid 1px rule */
}
@supports not (backdrop-filter: blur(1px)) { :root { --h-glass-fill: var(--room-bg); } }
```

### 3.5 Motion

CI fails on `cubic-bezier(` or `linear(` outside `tokens.css`. Animate transform, opacity, and clip-path only.

| Token | Value | Use |
| --- | --- | --- |
| `--h-dur-press` / `quick` / `ui` / `page` | 120ms / 200ms / 320ms / 600ms | press / hover, crossfade / popover, drawer / doorway, sheet |
| `--h-ease-standard` | cubic-bezier(.4, 0, .6, 1) | colour, opacity |
| `--h-ease-out` | cubic-bezier(.2, 0, 0, 1) | enter |
| `--h-ease-in` | cubic-bezier(.4, 0, 1, 1) | exit |
| `--h-spring-smooth` (590 ms) | `linear(0, 0.08 6.25%, 0.238 12.5%, 0.406 18.75%, 0.554 25%, 0.674 31.25%, 0.766 37.5%, 0.835 43.75%, 0.885 50%, 0.921 56.25%, 0.946 62.5%, 0.963 68.75%, 0.975 75%, 0.983 81.25%, 0.989 87.5%, 0.992 93.75%, 1)` | doorway, sheets |
| `--h-spring-snappy` (430 ms) | `linear(0, 0.07 6.25%, 0.221 12.5%, 0.393 18.75%, 0.552 25%, 0.687 31.25%, 0.791 37.5%, 0.868 43.75%, 0.923 50%, 0.959 56.25%, 0.982 62.5%, 0.995 68.75%, 1.002 75%, 1.005 81.25%, 1.006 87.5%, 1.006 93.75%, 1)` | toggles, chips, press release |
| `--h-spring-bouncy` (560 ms) | `linear(0, 0.077 6.25%, 0.249 12.5%, 0.447 18.75%, 0.633 25%, 0.785 31.25%, 0.898 37.5%, 0.973 43.75%, 1.018 50%, 1.04 56.25%, 1.046 62.5%, 1.043 68.75%, 1.035 75%, 1.026 81.25%, 1.017 87.5%, 1.01 93.75%, 1)` | two moments only |

Springs are sampled from a damped spring (no overshoot, 0.6 percent, 4.6 percent; settle to 0.5 percent at 591, 431, 556 ms), each with a `cubic-bezier` fallback first. Bouncy is allowed in exactly two places: the Paluwagan RECONCILED stamp and the Mindmap agent node landing. Press is `scale: .97` over 120 ms, release on snappy. `house/MOTION.md` lists every animation in every repo with a one-line purpose, token, and Calm behaviour; an animation without a line is cut.

**Calm** (Motion off, or OS reduced motion with no stored choice): every transition becomes a 160 ms opacity fade on `--h-ease-out`, springs jump to end states, the glyph field draws one still frame, scroll-linked effects show their end state, and doorways become a 160 ms root crossfade with no named elements. Every toy still works.

### 3.6 Shared controls and components

| Component | Behaviour |
| --- | --- |
| `house-crumb` | 52 px. Wordmark "Garfield Lim" (Fraunces 19/600, 44 px target, links home). In a room, "/ Room" with `aria-current="page"`. Right: "Email" (a `mailto:` link styled as a ghost capsule, works without JS) and a 44 px Menu button. Opaque, then glass after 8 px. A room may hand its primary action into the crumb once its hero scrolls away. |
| `house-menu` | Native `popover`, anchor-positioned, fixed top-right fallback: the four rooms, Work, About, Contact, LinkedIn, GitHub, Calm motion, Plain text. Esc closes and returns focus. |
| `house-footer` | Calm motion switch (`aria-pressed`), Plain text, "House 2.0.0" (to Changelog), Colophon, llms.txt, live Receipts. |
| Motion state | `localStorage["house.motion"]` in try/catch; a 400-byte head-blocking boot script sets `data-motion` before first paint. Default from `prefers-reduced-motion`. |
| Plain-text twin | Build-time `index.md` beside every page, linked by `rel="alternate" type="text/markdown"`; `llms.txt` lists them with absolute URLs; `.nojekyll` at the hub root. |
| Live receipts | Footer `<details>`: bytes (Resource Timing), largest paint, layout shift, slowest interaction (Event Timing), house version, commit, build date. A missing metric reads "not reported by this browser". Never stored. About 1 KB, after LCP. |
| Small parts | `house-capsule` (44 px, pill, filled or ghost), `house-label` (truth chip, 13/600, `--h-surface-2`, never dismissible), `house-receipt` (4.4, same partial in rooms and case pages), `house-drawer` (native `details`), `house-toast` (one at a time, `role="status"`, 4 s, pauses on hover and focus). |

No Sound control and no Appearance control: the house follows `prefers-color-scheme`. Rooms keep existing theme controls (PaperLab's dark default, Slop's Room toggle).

**Focus:** `:focus-visible` only, 2 px solid, 3 px offset, `--room-ink` in rooms and `--h-accent` on the hub, 3:1 or better. Forced colours use `Highlight`. Focus never changes state: tab previews, Enter commits.

## 4. Architecture

### 4.1 Repos and paths

One origin: `https://monsieurgregorio2001-coder.github.io/`.

| Repo | Path | Stack | Deploy |
| --- | --- | --- | --- |
| `monsieurgregorio2001-coder.github.io` | `/`, `/house/` | static, `scripts/build.mjs` generator (ADR 0001, 0007) | Pages from branch, committed output |
| `paperlab` | `/paperlab/` | React 18, TS, Vite | Actions |
| `paluwagan` | `/paluwagan/` | React 18, TS, Vite | Actions |
| `mindmap-mcp` | `/mindmap-mcp/` | new `demo/` workspace package, Vite, no native modules | new Actions deploy (Pages enabled under the owner's delegation) |
| `slop-editorial` | `/slop-editorial/` | Astro 7, ClientRouter kept | Actions |

### 4.2 House distribution

- Source in the hub at `house/src/`. `npm run house:release 2.0.0` writes the immutable folder `/house/2.0.0/`: `tokens.css`, `house.css`, `boot.js`, `doorway.js` (head, 3 KB gz or less), `house.js` (deferred module), `fonts/`, `partials/` (crumb, menu, footer, receipt), `house.json` (rooms, paths, titles, hues, posters, field vocabulary), `manifest.json` (sha256 per file plus the room contract), and `tools/` (sync, contract check, Vite plugin, Astro integration).
- Released folders are never edited (hub CI enforces it). Fixes ship as `2.0.1`. No mutable `/house/v2/` alias.
- Each room commits `house.lock.json`. `npm run house:sync` reads `HOUSE_DIR` (the sibling hub checkout locally; in CI, a checkout of the public hub repo at tag `house-2.0.0`, no secret), verifies hashes, and injects partials and `boot.js` at build between `<!-- house:crumb -->` and `<!-- house:footer -->` markers. Drift fails CI.
- Rooms link `/house/2.0.0/…` by absolute same-origin path, so one cached copy of house CSS and fonts serves all five sites. The Vite plugin and Astro integration mark `/house/` external at build and serve it in dev from `HOUSE_DIR`, never the live origin.
- Upgrades: release `2.x.y`, run all four rooms' smoke tests against it from hub CI, tag, then each room bumps its pin in its own PR.
- A room must stay readable if house CSS fails. House CSS styles only house components.

### 4.3 Room contract

Every page sets `--room-bg`, `--room-fg`, `--room-muted`, `--room-rule`, `--room`, `--room-ink`, `--room-wash` for light and dark, and has `#main`, a skip link, one `h1`, `house-crumb`, and `house-footer`. `house.css` supplies hub defaults. `house-contract.mjs` checks each room's deployed page in CI.

### 4.4 Evidence contract

Each room's CI writes `dist/evidence.json`, served at `/<room>/evidence.json` (values show format only):

```json
{ "schema": 1, "room": "paluwagan", "commit": "a1b2c3d", "ran_at": "2026-10-21T03:12:00Z",
  "runner": "GitHub Actions ubuntu-24.04, Node 22",
  "tests": [{ "id": "unit", "label": "Unit and property tests", "passed": 53, "total": 53, "command": "npx vitest run" }],
  "evals": [{ "id": "reminder-rubric", "label": "Reminder drafts scored on four rules", "passed": 0, "total": 0,
              "command": "npm run eval:reminders", "labelled_by": "evals/reminders.md", "limits": "Tone is not scored." }],
  "figures": [{ "id": "ops", "value": 12000, "unit": "operations", "label": "random ledger operations, 0 mismatches", "source": "src/domain/ledger.property.test.ts" }],
  "budgets": [{ "id": "js-gz", "limit": 70000, "actual": 61060 }],
  "limits": ["No real money moves. Sends are simulated."] }
```

Tests check code behaviour. Evals score output quality against labelled examples or a rubric. They render as separate rows.

The hub reads evidence only through typed slots (`{{fig:paluwagan/ops}}`, `{{test:paperlab/unit}}`, `{{eval:mindmap/guard-pairs}}`). `npm run evidence:pull` snapshots each room's live file into `data/evidence/<room>.json`, and `build.mjs` renders slots into doors, receipts, and case pages. A missing slot renders "not measured yet" and fails CI, so it never reaches `main`. The hub references a slot only after its room publishes it. A scheduled hub workflow (every 6 hours, plus manual dispatch) pulls, rebuilds, and opens a "Refresh evidence" PR with the repo's own token. Room deploys never wait on the hub. Figures no CI step produces leave all copy (the unverified Lighthouse scores, README byte claims that did not reproduce).

### 4.5 Doorways

`house.css` sets `@view-transition { navigation: auto; }`. `doorway.js` derives a type from the two URLs via `house.json` and adds it in `pageswap` and `pagereveal`: `enter-room`, `leave-room`, `room-to-room`. At most three names, set just in time, cleared on `finished`: `door` (the clicked door poster; the room's static hero poster), `house-crumb`, `house-wordmark`.

- **Enter:** `pageswap` stores the door's viewport rect in `sessionStorage["house.door"]`; `pagereveal` sets `--door-t/r/b/l`. The old root stays opaque underneath. The new root is the live page, revealed by `clip-path: inset(var(--door-t) var(--door-r) var(--door-b) var(--door-l) round 28px)` growing to `inset(0 round 0)` over 600 ms on `--h-spring-smooth`. The `door` group morphs on the same timing and its old image fades out by 45 percent. No text is ever a scaled snapshot. The crumb crossfades in 200 ms; the wordmark has zero duration.
- **Leave** (Back or wordmark): reversed, the room clipping down into the live rect of `[data-room=<from>]` measured after scroll restoration. If that door is less than half visible, a 200 ms crossfade runs instead.
- **Room to room** (Menu): 240 ms root crossfade, crumb and wordmark named.
- **Back-race fix:** hub doors are static HTML with `<link rel="expect" href="#doors" blocking="render">`. Each SPA room ships a static `#room-hero` shell in `index.html` (crumb plus sized poster), which is the LCP element and morph target, with `rel=expect` pointing only at it. React mounts into a sibling `#app` and crossfades over the shell, so LCP does not re-fire and CLS stays 0.
- **Slop** keeps ClientRouter; cross-room links carry `data-astro-reload` so the browser navigates.
- **Prefetch:** Speculation Rules `prefetch` (never `prerender`), `moderate`, door links only. **bfcache:** no `unload` handlers or open sockets anywhere.
- **Gate:** on the deployed host, 20 navigations each way: 20 of 20 in Chromium, at least 19 of 20 in Playwright WebKit. On failure the signature is dropped by ADR and the 160 ms crossfade ships as the design. Real iOS Safari 26 with VoiceOver is an owner checklist item.

### 4.6 Same-origin rules

One `localStorage` for five sites: the house owns `house.*` only; existing keys stay (`online-paluwagan:v2`, `slop.session`); new keys start with the room slug. Slop's service worker returns early for every URL outside `/slop-editorial/`, proved by a CI test. No cookies, analytics, or third-party requests anywhere; the prototype's Google Fonts are gone.

### 4.7 CI checks

Every repo, every PR: tests and evals, `evidence.json`, type check and lint, house contract, token lint, links, axe-core (both themes, 390 and 1440), keyboard script, overflow at 360, Calm and JS-off screenshots, a state-matrix set per toy (default, hover, focus, pressed, loading, empty, error, Calm, no JS, dark, 360, keyboard), zero console errors, budgets, copy lint (section 7). Hub only: html-validate, the 10-second gate, the doorway gate (weekly and per house release), house immutability, evidence freshness.

### 4.8 Browser matrix

| Feature | Chrome, Edge | Safari 26 (macOS, iOS) | Firefox 158 | Fallback |
| --- | --- | --- | --- | --- |
| Cross-document view transitions, `pageswap`, `pagereveal`, `rel=expect` | yes | yes (18.2+) | no | normal navigation |
| Same-document view transitions | yes | yes | yes (144+) | instant swap |
| `linear()`, popover, anchor positioning, `backdrop-filter` | yes | yes | yes | cubic-bezier, fixed position, opaque crumb |
| Scroll-driven animations | yes | yes | behind a pref | IntersectionObserver or end state |
| `interpolate-size` | yes | no | no | instant `details` |
| Speculation Rules | yes | off by default | no | normal fetch |
| WebGPU (PaperLab Line, after launch) | yes | yes | partial | WebGL2, then poster |
| `corner-shape`, `contrast-color()` | partial | partial | no | `border-radius`, `--room-ink` |

Unsettled points (Firefox cross-document behaviour, Safari `rel=expect` timing) are settled by the phase 0b bench on the real host before any room depends on them.

## 5. Hub

### 5.1 Information architecture

`/` becomes a short foyer, about 3,800 px at 390 (6,464 today): **Hero** with four doors; **Work** (receipts, 5.6); **How I work** (the three existing rules unchanged, plus a Colophon link); **About** (owner text verbatim, ADR 0008); **Contact** (existing lead, "Email me" mailto, "Copy address" with a "Copied." toast, LinkedIn, GitHub); **Footer**. Also: `/work/<slug>/` case pages (ADR 0006) restyled with the Receipt; `/colophon/`; `/changelog/`; `/404.html`; `/llms.txt`; `/lab/doorway/a/` and `/b/` as unlinked, `noindex` fixtures outside the sitemap.

### 5.2 First screen at 390 (designed to 664 px)

| y (px) | Element |
| --- | --- |
| 0 to 52 | Crumb: wordmark; "Email" capsule and Menu. |
| 64 to 104 | Eyebrow 14/20 `--h-ink-2`, two lines: "Applied AI engineer · Cebu, Philippines" / "Open to remote". |
| 112 to 196 | H1 about 41 px, two lines: "I build AI tools / you can check." Decodes once (ADR 0005). |
| 208 to 256 | Lede 17/24: "Four projects. Each one lets you check its claim." |
| 272 to 396 | PaperLab door, 358 x 124, radius 28, dark: static Loom poster, name 17/600 and proof line 14 on its lower left. |
| 404 to 596 | Grouped list (radius 18), three 64 px rows: 44 px thumbnail (radius 10), name 17/600, proof line 14, chevron. Living Mindmap, Slop Editorial, Online Paluwagan (ADR 0004 order). |
| 612 to 656 | "Open PaperLab" (filled), "Copy address" (ghost). |

Interim (until launch): the owner's H1 "I turn messy operations into working AI systems." in three lines; everything below shifts 40 px and the last row still ends by 636. The 10-second gate asserts wordmark, role, H1, four door names, and Email inside 390 x 664 and 360 x 640, with JS off, reduced motion on, and fonts blocked. The glyph field draws behind eyebrow, H1, and lede only, at about 30 percent density, ripple on tap.

### 5.3 First screen at 1440 x 900

| Region | Spec |
| --- | --- |
| Crumb | Wordmark left. Right: Work, About, Contact (15/500), "Email" capsule, Menu. |
| Columns 1 to 6 (x 120 to 708) | Eyebrow at y 136: "Applied AI engineer · Cebu, Philippines · Open to remote". H1 88/90, y 168 to 348, two lines. Lede 22/30, y 380 to 440. Capsules at y 476: "Open PaperLab" (filled), "Email me" (ghost, mailto), "Copy address" (text button). LinkedIn and GitHub links at y 540. A "Resume" capsule renders here and in the footer only when `/resume.pdf` exists (ADR 0008). |
| Columns 7 to 12 (x 732 to 1320) | PaperLab door 588 x 300 from y 120: dark live-state poster, name 20/600, proof line 15, one slot figure in mono 15. From y 444, three doors 180 x 236 with 24 px gaps: poster 160 x 102 (radius 18), name 17/600, proof line 15, slot figure mono 13. |
| y 812 to 852 | Quiet line, 14 `--h-ink-2`: "Every number here comes from a test run or from your own browser. See the receipts." |

The field is weighted to the text column, so the right half carries real work (the audit called the old right-side scatter noise).

### 5.4 Signature moment

The hub's signature is the **doorway** (4.5). The owner's glyph hero (ADR 0005) stays as the ambient identity, amended by hub ADR 0012. Field, ripple, cursor glow, decode, and the 15 percent alpha guard all stay. Drift settles to a still frame within 5 s of load or the last input (so no pause control is needed) and stops when hidden or off screen. Calm draws one still frame.

**Order from noise:** on fine-pointer hover or keyboard focus of a door, glyphs within 160 px snap into a 7 x 14 grid in that room's hue over 320 ms, spelling the room's ASCII vocabulary from `house.json` (PaperLab "Q K V softmax", Paluwagan "+1,000.00 = 0.00", Mindmap "add_node()", Slop "$ 4.2"), then relax after 1.2 s. ASCII only, because the atlas is Latin JetBrains Mono 400. Off in Calm, 3 KB gz or less, timeboxed to one day or cut.

### 5.5 Doors

Each door is one static link with visible name, proof line, and (desktop) one slot figure. Its accessible name comes from visible text plus visually hidden "Proves: {proves}." from `projects.json` (no `aria-label`, so WCAG 2.5.3 holds). Status chips: Live, Recorded demo, Runs locally; never "Live" for a recording. Order everywhere (doors, receipts, case navigation) follows ADR 0004: PaperLab first and largest, then Living Mindmap, Slop Editorial, Online Paluwagan. Posters are AVIF with WebP fallback, captured by script from each room's real first state: 40 KB or less for PaperLab, 8 KB or less for thumbnails.

### 5.6 Work: the receipts

ADR 0003 holds (Proves, Problem, Build, Result with a measured figure), shown as receipts (hub ADR 0015). PaperLab gets a featured full-width receipt (poster in columns 1 to 7, rows in 8 to 12), as ADR 0004 asks. The other three sit in three columns from 1024 px and stack below that. No segmented control. Rows: **Proves** · **Problem** (120 characters or less) · **What I built** (120 or less) · **Result** (slot figure) · **Try this** (one action) · **How it is checked** (test and eval slots) · "Open the room", "Read the case", "Code".

### 5.7 Colophon, changelog, 404, lab

- **Colophon:** token tables and spring plots rendered at build from `tokens.css` (inline SVG, so the spec cannot drift), fonts with licences and bytes, stack per room, browser matrix, budgets beside the last CI run. AI policy: "Built with AI-assisted development in Claude Code and Cursor. Garfield sets the brief and accepts or rejects each decision. Decisions still waiting for review are marked." Then "No analytics. No requests to any other server."
- **Changelog:** generated from each repo's `docs/CHANGELOG.md`, dated, grouped by room, one problem line and one change line per entry.
- **404:** static at launch: "This room is not built." decodes once over a still field, then the four doors and "Back to the house". Phase 0b checks how Pages resolves missing project paths, and each room ships a tiny `404.html` loading the house partial. The guard-powered finder comes after launch, with a vendored, parity-tested `similar.ts` pinned by commit and hash.
- **Lab:** none.

### 5.8 Five Rooms

Retired into the products: the foyer becomes the hub, the Loom moves into PaperLab on the tested kernel, the passbook moves into the Paluwagan React app on its real domain layer, and `house/v1` becomes `/house/2.0.0/`. `five-rooms-poc/` gets a README saying where each piece went. Its audit harness becomes the doorway bench and state-matrix tests. It is never deployed.

## 6. The rooms

Common to all four: house crumb and footer pinned to house 2.0.0, a static `#room-hero` shell (4.5), one truth label, one proof toy finished to every state, a Receipt (Tests, Evals, Budgets, "What this does not do"), and **How this was built** in three columns: "What AI did", "What I decided", "What I rejected or corrected" (including what AI got wrong that was caught). Entries come only from that repo's ADRs, commits, and PR reviews (for example PaperLab's accuracy policy, Paluwagan's integer centavos over floats, Mindmap's lexical guard wording, the audit's designed-heads correction). Thin history says "Not recorded for this project yet." Agent-proposed decisions show as "Proposed by Claude, waiting for Garfield's review" and never under "What I decided" until Garfield accepts them.

### 6.1 PaperLab (flagship)

- **Purpose and audience:** make attention legible: type a sentence, see what each word reads, break the math to see why. For hiring engineers, then AI-curious leaders.
- **First screen:** PaperLab's dark tokens, Recursive, label chip. At 390: "The cat sat on the mat." at about 36 px in wrapped rows, threads above from the query word (a column only under 340 px), a live readout ("‘sat’ reads ‘cat’ most."), a 44 px head rail (Previous word, Same word, Punctuation, Next word), and switches for Position, Scaling, Causal mask. At 1440: the sentence at 96 px across columns 1 to 9, word weight following attention received (variable `wght`, no reflow), controls in 10 to 12.
- **Proof toy and signature, "Break the math":** switch one off and the old threads stay as a ghost while new ones settle (snappy; PaperLab's identity is "ease, settle, glow"). A computed sentence states the change: "Without the scaling, ‘sat’ puts {p}% of its attention on one word. With it, {p}%." A row-sum line always reads "each row sums to 1.000". "Show the numbers" opens Q, K, V, scores, softmax, weights times V, concat, and W_O live, with "Paper: d_model 512, 8 heads, d_k 64. Here: 16, 4, 4." A Tour (5 steps or fewer, ADR 0006) never locks the sandbox.
- **Honest heads first (ADR 0009):** designed heads become true `softmax(QKᵀ/√d_k)` with hand-set W_Q and W_K on the tested `transformer.ts`. Toy embeddings may carry labelled designed features.
- **Labels:** "Real math · Designed heads · Toy size", shown only while a test asserts each designed head equals the kernel's output for its stated weights. Until then: "Designed patterns · Toy size", with Scaling hidden. Random weights mode (v1's engine): "Real math · Random weights · Toy size".
- **Receipt:** Tests: the 19 kernel tests, NumPy fixture fidelity at 1e-6, designed-head tests (head 1 puts at least 0.5 on the previous token in every preset). Evals: "None. Nothing here is model output to score." Limits: "Does not train anything. One layer. Hand-set heads, not learned ones."
- **Keep and fix:** keep `transformer.ts`, URL state (`?q=`, `head=`, `off=`), the data lens, ghost compare, roving tabindex; merge the kernels PR without UI. Move v1 intact to `/paperlab/legacy/`, linked from the drawer as "The whole layer, step by step (first version)". Drop the "it / animal" preset, fix the token-id copy and paper section links, and never rewrite the URL on Tab. The prototype's `model.js` is retired: one attention kernel exists, and the hub never ports it.
- **Ladder (ADR 0008, amends the plan):** v2.0 ships Attention only. Line (3D loss bowl, three.js WebGPU with WebGL2 fallback and poster) follows after launch if it passes the bar. Boundary, Net, Memory, Space, Sight, Noise, Block, and Frontier wait; ADR 0005 stays accepted but unscheduled. No rungs are drawn. The lab switcher appears at two labs.
- **Not now:** three.js, model downloads. **Size:** L.

### 6.2 Online Paluwagan

- **Purpose and audience:** money in a savings circle tracked to the centavo, a person approving every reminder, books that catch tampering. For solutions and GTM managers (business workflow, human in the loop) and engineers (correctness).
- **First screen:** at 390, H1 "Barkada Weekly Ipon" (Fraunces 28), "Cycle {n} of {m}. Dates follow today in Manila.", a 220 px dial reading "₱{pot} in the pot of ₱{target}" from the seed, "Record a payment" (filled) and "Check the books" (ghost), then ruled passbook lines in Inter tabular. At 1440, a passbook spread: dial and members left, ruled entries with stamps right.
- **Proof toy, "Check the books, then try to cheat them":** the check reconciles three independent records (ledger entries, the cycle state machine, each member's stub), strikes each cycle as it matches, and counts to ₱0.00. The RECONCILED stamp lands on bouncy, the room's one expressive moment. "Forge a line" edits a past entry on a copy, in a second ink marked "Forged, on your copy only"; the check then stops with "Short by ₱{x} in cycle {n}", icon and word. "Edit entry" on a real line refuses ("Entries cannot be edited. Write a reversal.") and offers a reversal. No shake. Undo restores the books. The check can now fail, which fixes the audit finding.
- **Reminder inbox:** Draft, Approved, Sent (simulated), with a plain Approve button and a confirm dialog. Reminders quote the outstanding amount. Filipino text has `lang="fil"`.
- **Labels:** "Demo group · No real money · Sends are simulated". Reminders: "Pre-written reminder templates. You edit and approve. Sending is simulated." It becomes "Templates drafted by Claude on {date}, edited by Garfield" only when `reminders/PROVENANCE.md` records prompt, model, and date.
- **Receipt:** Tests: the 53 tests with the 12,000-operation property test, plus "any single forged line is caught" (including a forged reversal) and "nothing sends without approval". Evals: the reminder rubric scores every draft the app can produce (seeded groups plus randomized member states) on four rules: amount equals the outstanding amount, language tag matches the text, no fact beyond the member record, correct name and cycle. Limits: "No real money. No real group has used this yet."
- **Fix:** "Reve / rse" wrap, clipped phone schedule row, empty sixth stat cell, skip-link focus theft (no `focus()` on mount), stale error banner, a confirm before releasing a short pot, shortfalls in `outstandingCycle`, arrears as "Short by ₱{x}" with no public late list. House fonts with ₱ in the Latin subset end the 318 KB latin-ext load. No Doto.
- **Not now:** a server, real sends, a model call, visible checksums. **Size:** L.

### 6.3 Living Mindmap

- **Name:** "Living Mindmap" everywhere; Kuru is not approved.
- **Purpose and audience:** people and an AI agent editing one map through MCP, every agent edit marked, near-duplicates refused, and the guard's limits measured. For AI-engineer and solutions hiring managers.
- **How it is real (L scope):** a `demo/` workspace package with its own `package.json`, so Pages never compiles better-sqlite3. It imports the repo's pure modules (`src/core/similar.ts`, types, seed spec) over an in-memory store. A parity test proves the demo guard scores match the server's `findSimilar` on every fixture and labelled pair. `scripts/record-session.ts` runs the real stdio MCP server on a temp database behind a logging proxy and writes `demo/session.json` with client name and date (preferred: a real Claude Code session; fallback: scripted). The replay applies recorded results; handlers do not run in the browser.
- **Sample map:** "Planning a support-inbox assistant", labelled "Sample content. Not a real project." It avoids PaperLab's topic and never implies Garfield shipped that system.
- **First screen:** at 390, the label, then the proof toy, then an outline view (no graph, so the 553 px overflow cannot happen) with "Hand" and "Agent" chips (word and shape, 13 px or more); "Replay the agent" opens a bottom-sheet feed. At 1440, an SVG graph with precomputed positions (no React Flow), titles 14 px or more, in columns 1 to 8; toy and feed in 9 to 12.
- **Proof toy, "Ask the guard":** type a title and the real `findSimilar` runs per keystroke: "Close to ‘{title}’, {score}. The guard refuses at 0.85." Add it to see the refusal with candidates, or a new Hand node. "Move the line" (0.50 to 0.99) shows which labelled pairs flip and the eval at that threshold. Fixed line: "The guard compares words, not meaning."
- **Signature, "Hand and agent":** a scrubber steps through recorded calls, each a feed line (tool, inputs, result) and an accessible log entry. Agent nodes land beside their parent, violet with a dashed border and an "Agent · {tool}" chip, on bouncy. The near-duplicate drifts toward its twin, shows its score, and is refused. Then "Your turn": Keep or Undo each agent node.
- **The eval:** 60 labelled title pairs (duplicate or not) covering synonyms ("Tokenization" vs "Token splitting"), plurals, reorderings, and near-miss different ideas. The Receipt shows precision and recall per threshold against an exact-match baseline, why 0.85, and what it misses.
- **Labels:** "Recorded demo · Sample content · No model runs here". Session: "Recorded from a real session: Claude Code used these tools through MCP on {date}. Unedited except timestamps." or "The agent's moves were scripted, not chosen by a model." Replay: "Replayed from the recording. The tool handlers do not run in your browser." Eval: "Labels drafted by Claude Code. Garfield has not reviewed them yet." until Garfield signs off.
- **Receipt:** Tests: 42 tests on Node 20 or newer, `verify:mcp` (12 tools), the 160-call benchmark on the named CI runner, the parity test. Evals: the guard pairs. Limits: lexical matching only, no model in the browser, a recorded session.
- **Hub door:** "Runs locally" from phase 0, "Recorded demo" when the room ships, never "Live". If 3c slips, ship the guard and outline first and the replay second.
- **Not now:** an LLM, embeddings, a hosted server, in-browser MCP, the app redesign (Tab trap, 9.5 px chip, node placement, reduced motion, 611 KB bundle), all after launch (section 10). **Size:** L.

### 6.4 Slop Editorial

- **Purpose and audience:** a satire of AI slop that is itself made with care, and a pipeline that cannot spend past a cap or run without approval. For design-minded leaders (taste, voice) and GTM and solutions managers (controlled spend).
- **First screen:** "A satire of AI slop, hung like an exhibition." under the wordmark. At 1440 the wall label sits above the fold beside the plate (image max height 62vh). At 390 the label sits under the plate, the crop keeps the spheres and sign, and the header is one row with 44 px targets.
- **Proof toy, "The spend cap",** on the Method page (`/slop-editorial/about/`), never on wall labels, so the gallery stays deadpan. Set plates, rerolls, model (from the pipeline's price table), and cap. A TypeScript port of the pipeline's estimate and cap check refuses with the CLI's exact string, values substituted, and under the cap shows the CLI's own approval requirement. Parity fixtures come from the Python package in CI. Beside it, the committed record of a mock-provider run (plan, estimate, cap, approval reference, ledger line).
- **Labels:** "Runs the pipeline's cost check in your browser. Generates nothing." and "Mock provider run. No images were generated."
- **Receipt:** Tests: 19 Node and 49 Python tests, 146 build gates, the browser checks (143 in the 2026-10-20 run, rendered from the slot), the parity test. Evals: none. Limits: "Paid providers were tested against fakes only. The current nine plates have no generation record."
- **Honesty fixes:** reword `/about/` ("The briefs, the checks and the rejects are in the repository") to what exists: one prompt pack and a mock run, no brief or review notes for the nine plates. Reconcile the README's `make-art.mjs` claim with the model-made images. One browser-check count everywhere. Remove or re-measure Lighthouse, CLS, and JS-size claims. Unlink `/review/`.
- **The nine images** are already live (the webps match the `incoming/` masters). Their human review is unrecorded, so it is an owner checklist item. Masters stay out of git (22 MB) with a committed manifest (name, size, sha256). No new images.
- **Fix:** replace the three.js certificate rosette with the generated certificate photograph and a CSS light sweep, and remove three.js (about 300 KB on that page). Fix the `.rule` margin, make the cookie sheet an overlay (CLS 0.034 today), raise 34 px nav targets to 44, fix reduced-motion overflow on `/authenticity/`, make currencies consistent, follow the OS colour scheme with the Room toggle as override, and fence `make-art.mjs` away from `public/img`.
- **Not now:** "Behind the frame" (until per-plate records exist), leaving ClientRouter (needs its own ADR), paid runs, new images, 3D. **Size:** M (join, fixes, honesty) plus M (spend cap).

## 7. Copy

**Voice:** plain words, short sentences, no em dashes, no semicolons, Oxford comma, sentence case, no exclamation marks. Buttons are verbs. Labels say what a thing is not. Measured numbers only through slots. "I" for Garfield, never "we". Process is "AI-assisted development with Claude Code and Cursor".

**Avoid:** vibe coding; Prompt Engineer as a headline; AI-powered (for deterministic code); live (for a recording); semantic or smart (for the guard); fair (say "seeded payout draw"); always (for test runs, say "in every run so far"); seamless, cutting-edge, revolutionary, passionate; coming soon; Kuru; "Drafted by Claude" without a provenance record; "Real math" without its green test; "I build LLM agents" on new surfaces (no agent runs in the portfolio, say MCP tools and AI workflows).

| Surface | Headline | Subhead |
| --- | --- | --- |
| Hub (launch) | I build AI tools you can check. | Four projects. Each one lets you check its claim. |
| Hub (interim and fallback in `site.json`) | I turn messy operations into working AI systems. | same |
| PaperLab | Attention | Type a sentence. See what each word reads. Then break the math. |
| Online Paluwagan | Barkada Weekly Ipon | A demo savings circle. Every peso is a line in the passbook. |
| Living Mindmap | Living Mindmap | People and an agent edit one map. Every agent edit is marked, and near-duplicates are refused. |
| Slop Editorial | (wordmark) | A satire of AI slop, hung like an exhibition. |

Door proof lines (40 characters or less, each names the skill): PaperLab "Break the attention math." · Living Mindmap "Agents edit through MCP. You review." · Slop Editorial "Generation is cheap. Spend is capped." · Online Paluwagan "Try to cheat the ledger."

Small copy: "Copied." · "Calm motion" · "Show the numbers" · "Forge a line" · "Ask the guard" · "Move the line" · "Replay the agent" · "Your turn" · "not measured yet" · "not reported by this browser" · "This room is not built." · "Back to the house".

## 8. Accessibility, performance, verification

**Accessibility (WCAG 2.2 AA, every page, both themes):** skip link first on every page; no app calls `focus()` on mount. Order: crumb, content, footer. Doors are single links; "Read the case" is separate, never nested. Toys use roving tabindex (words, nodes, ledger lines), a native control per action, and one `role="status"` region ("Difference: ₱0.00. The books balance."). Canvases are `aria-hidden` with a text equivalent; every chart has a table in its drawer. 44 px targets everywhere, including the wordmark and footer links (both fail today). No hover-only information. No global key handler touches Tab. Text scales to 200 percent. View transitions are visual only and never move focus. Titles read "{Room} · Garfield Lim".

**Budgets** (gzip, CI profile 4x CPU, 1.6 Mbps, 150 ms RTT):

| Surface | JS before interaction | CSS | Fonts | LCP | INP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| Hub | 20 KB (house 6, field and doors 10, receipts 1, doorway 3) | 14 KB | 160 KB (Mono 400 after LCP) | 1.8 s | 150 ms | 0.02 |
| PaperLab Attention | 120 KB | 10 KB | 92 KB | 2.2 s | 150 ms | 0.05 |
| Online Paluwagan | 70 KB | 8 KB | 140 KB | 2.0 s | 150 ms | 0.05 |
| Living Mindmap demo | 90 KB, `session.json` 40 KB lazy | 8 KB | house | 2.0 s | 200 ms | 0.05 |
| Slop home / certificate | 15 KB / 20 KB | own gates | 129 KB | 2.0 s | 150 ms | 0.02 |

Hub first load at 390 is 300 KB or less in total (394 KB today). The crazy layer loads after LCP. No long task over 50 ms in the hub's first 5 s.

**Verification protocol** (every PR, and in full at launch):

1. Tests, property tests, and evals green; `evidence.json` produced; slots resolve.
2. Playwright screenshots at 360, 390, 1024, 1440 in light, dark, Calm, and JS off, plus each toy's state matrix, reviewed against this file.
3. axe-core: 0 violations at 390 and 1440, both themes, every page type and toy state.
4. Keyboard script: skip link first, visible focus, Esc closes, no traps, focus never changes state.
5. Reduced motion on: nothing animates longer than 5 s; Calm screenshots match.
6. Three engines per PR: Chromium, Playwright WebKit, Firefox. Doorway gate on the deployed host weekly and per house release.
7. Phone emulation: Playwright iPhone and Pixel profiles at 4x CPU. Real iOS Safari 26 with VoiceOver and a mid-range Android are owner checklist items before launch is announced.
8. Performance: budgets from build output, LCP, CLS, INP from throttled traces, a live-receipts spot check on the deployed site.
9. After every deploy: live URL returns 200, zero console errors, correct house version.
10. Copy lint: banned words, em dashes, semicolons, required labels present.

## 9. Decisions log

Every ADR written in this initiative says "Status: proposed by Claude on the owner's delegation, 2026-10-20. Reversible." until Garfield accepts it. Rows without a number become ADRs in the owning repo's `docs/decisions/` at its next free number. Each default can be reversed by an ADR or a one-file edit.

| Decision | Default | Reason |
| --- | --- | --- |
| Kuru rename | "Living Mindmap" everywhere | Not approved |
| Resume | Deferred (ADR 0008); capsule appears when `/resume.pdf` exists | Owner's call |
| About photo, career arc | Deferred; About verbatim | ADR 0008 |
| Job-search docs | Moved out of the public hub repo to a private location; any history exposure flagged to the owner | Brief: no job-search ops in public repos |
| Hub headline (hub ADR 0013) | New line ships at launch, once all four toys are live; owner's line until then and as fallback | Old line fits one project; the new one is true only when every room is checkable |
| Hero claims (hub ADR 0014) | "Now" line and "8 developers" leave the first screen; About unchanged | Unverified career claims stay off new surfaces |
| "Open to remote" | Kept (overrules a judge) | It is the owner's own published copy in the eyebrow, About, and Contact |
| Hub is the house (hub ADR 0009) | Five Rooms retired into the products | Research and audits converge |
| House distribution (hub ADR 0010) | Immutable `/house/x.y.z/`, pinned per room, no mutable alias | One deploy cannot break five sites; Pages cache; Slop's worker |
| Evidence (hub ADR 0011, amends 0003, 0007) | `evidence.json` and typed slots | No stale or invented figures |
| Glyph hero (hub ADR 0012, amends 0005) | Kept: 5 s settle, phone density, order from noise | Owner asked for it; WCAG 2.2.2 |
| Work section (hub ADR 0015) | ADR 0003 fields as receipts, PaperLab featured | Shorter phone page, faster proof |
| Sound, Lab (hub ADR 0016) | Neither | Proves nothing (all three judges) |
| Doorways (hub ADR 0017) | Clip-path reveal, bench-gated | Fixes stretched text and the back race |
| Appearance control | None; follow the OS | Fewer controls |
| Lighthouse figures | Out of copy unless CI measures them | Unverified today |
| PaperLab face (ADR 0010) | Recursive | Bricolage is Slop's |
| PaperLab ladder (ADR 0008) | Attention now, Line after launch, no rungs | Finished or absent |
| PaperLab heads (ADR 0009) | Real scaled dot-product attention before any "Real math" label | Audit honesty defect |
| PaperLab v1 | Kept at `/paperlab/legacy/` | Finished, tested, shows the whole layer |
| Paluwagan wording | "Seeded payout draw"; "templates" until provenance exists | Matches code and records |
| Paluwagan UI | Passbook is the React app's front door; admin screens are drill-downs | Audit plus prototype |
| Mindmap room | L demo at `/mindmap-mcp/`; Pages enabled under the owner's delegation of 2026-10-20 | Most relevant room, invisible today |
| Mindmap sample | "Planning a support-inbox assistant", labelled sample | No PaperLab overlap, not self-referential |
| Eval labels | Agent-drafted, marked pending owner review | Owner is away |
| Slop router | Keep ClientRouter plus `data-astro-reload` | Firefox, custom transitions, worker |
| Slop certificate | Photograph and CSS sweep; three.js removed | Weakest page, heaviest JS |
| Slop toy | Spend cap on Method page; Behind the frame deferred | Records missing; gallery tone |
| Slop images | Already live; review is an owner item; masters out of git | Site's own rule |
| Slop theme | Follow the OS, Room toggle overrides | Audit |

## 10. Build order

Each lane starts from remote `main` and its open PRs (PaperLab #1 ladder plan, #2 kernels), so plans build on the latest state. Every PR updates its repo's TRACKER, CHANGELOG, ADRs, README, and CLAUDE.md or AGENTS.md where present. The hub plan lives at `docs/plan/2026-10-20-house.md`. Phases 0 to 2 come first: the hub goes live on the house while rooms still link out normally. Phases 3a to 3d run in parallel, one lane per repo.

| Phase | When | Work | Size | Repo | Needs |
| --- | --- | --- | --- | --- | --- |
| 0 | Week 1, day 1 | Honesty sweep on live surfaces: Mindmap "Live" to "Runs locally"; Paluwagan to "pre-written reminder templates a person approves" and "seeded payout draw"; Slop count to 143 on hub and README; Slop `/about/` and README claims; "Now" line and "8 developers" out of the hero; unverified Lighthouse figures out; job-search docs out of the public repo. Write the section 9 ADRs and the plan. | S | all | none |
| 0b | Week 1 | Doorway bench on the deployed hub (4.5 gate); check Pages 404 resolution. Decides whether the signature ships. | S | hub | 0 |
| 1 | Week 1 | House 2.0.0 as specified in 3 and 4.2 to 4.3, `MOTION.md`, and `/house/2.0.0/demo.html` passing axe with CLS 0. | M | hub | 0b |
| 1b | Week 1 | `evidence.json` CI step in all four rooms; Mindmap gets `.nvmrc`, `engines` (Node 20+), and a native rebuild in CI. | S each | rooms | 0 |
| 2 | Week 1 | Hub foyer (section 5) on house 2.0.0 with the interim headline, posters from today's rooms, case pages with the Receipt, CI gates. Deploy alone. | L | hub | 1, 1b |
| 3a | After 1 and 1b | PaperLab v2.0 (6.1), honest heads with tests first. | L | paperlab | 1, 1b |
| 3b | After 1 and 1b | Paluwagan (6.2). | L | paluwagan | 1, 1b |
| 3c | After 1 and 1b | Living Mindmap room (6.3) and its Pages deploy. | L | mindmap-mcp | 1, 1b |
| 3d | After 1 and 1b | Slop (6.4): house join and fixes first, then the spend cap. | M + M | slop-editorial | 1, 1b |
| 4 | Week 4 | Doorways wired across hub and rooms, per-pair gate on the deployed host, Firefox and Calm passes, order from noise (one-day timebox), posters re-shot from live rooms. | M | all | 2, 3a to 3d |
| 5 | Week 4 | Launch: switch the headline (gate: four toys live, all slots green), Mindmap door to "Recorded demo", full verification with the w1 harness, changelog "House 2.0.0", owner checklist (iOS Safari and VoiceOver, mid Android, eval labels, the nine Slop images, ADR acceptance). | M | all | 4 |

**After launch, in order:** PaperLab Line lab (L), Mindmap app fixes (M), 404 guard finder (S), Slop "Behind the frame" once records exist (S to M), optional in-browser MCP for Mindmap (XL), more PaperLab labs one at a time.

**Out of scope for this initiative:** Sound in any form; a `/lab/` page; the WebGPU 100k-point field; the headline that reads itself; SHA-256 checksums in the passbook; press-and-hold Approve; a 900 ms story-beat token; proof figures in the hero; the "Now" line; long room chapters under the doors; a segmented specs control; resume and About photo; the Kuru rename; PaperLab labs beyond Attention before launch, and Qwen3 here at all; any live model call; paid generation runs and new images; analytics; a custom domain; an appearance control; moving Slop off ClientRouter; the full Living Mindmap app redesign; any number not computed live or read from `evidence.json`.
