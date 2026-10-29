# Changelog

All user-visible changes to the hub. Newest first. Follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

### Fixed
- Desktop door tiles show the full room name again. The phone no-wrap rule had squeezed the names to nothing beside the status chip from 1024 px up.

### Fixed
- The hero lede sets one sentence per line on phones, so a wide fallback font cannot add a line that the web font takes back. The live gate measured CLS 0.0304 on the Pixel 7 profile from this.

- Hub door rows no longer wrap the name and label line, which removed a phone layout shift when web fonts swapped in. Live gate bench now reads house versions from link/script attributes and logs layout-shift sources.

## House 2.0.1 / Release V1, 2026-10-28

### Fixed (live gate, phase 5)
- Hub CLS before any tap. Cause: the H1 wrapped by `ch` width, so the line count changed when the web font replaced the fallback (measured 0.18 Pixel 7 and 0.21 iPhone 13 with the font swap delayed, 4x CPU, 1.6 Mbps, 150 ms RTT). The H1 now sets two fixed `nowrap` lines (`headlineBreakAfter` in `site.json`, `.ln` spans), and `field.js` decodes inside them. After: 0.003 and 0.0045 with fonts delayed 0, 0.3, 1.5 and 3 s.
- Back from a room returns focus to the door the visitor left from (`field.js`, traversals only, also after a bfcache restore). Chromium 0 of 20 before, 20 of 20 after.
- `/changelog/` house links are 2.0.1 only. The 2.0.0 lines are history text.

### Launch (phase 5)
- Release V1, the Show Your Work launch. All five sites run on house 2.0.1: the hub and the four rooms (PaperLab, Online Paluwagan, Slop Editorial, Living Mindmap), each with a proof toy, a receipt and an `evidence.json` that the hub reads.
- New headline "I build AI tools you can check." with the subhead "Four projects. Each one lets you check its claim." (ADR 0013). The page title, Open Graph and Twitter copy and `og-image.png` carry the same line. The old line stays in `site.json` as `fallback`.
- The interim size cap on the H1 is gone, so it uses `--h-t-display`. `check-gate.mjs` now fails the build unless the H1 sets in exactly two lines at 360, 390 and 1440, with web fonts and with fallback fonts.
- Contact heading is now "Work with me". The word "messy" is retired from the hub. About is unchanged.
- Living Mindmap is frozen at its wave 3 state and stays up as a Recorded demo until Gorges replaces it. Gorges comes after V1.
- Handover: `docs/portfolio/handovers/2026-10-28-release-v1.md`. Screenshots in `docs/audits/shots/launch/`.
### Added (doorway gate, phase 4)
- `scripts/bench-rooms.mjs` and `.github/workflows/live-gate.yml`: per-pair doorway gate (hub to each room and Back, room to room via the Menu) in Chromium, WebKit and Firefox, live smoke, Calm pass and phone profiles at 4x CPU on the deployed host.

### Added (foyer polish, phase 4)
- Living Mindmap door, receipt and case CTA now open `/mindmap-mcp/` ("Open the room") with a "Recorded demo" chip. `build.mjs` knows a `demo` status.
- Order from noise (ADR 0012): on fine-pointer hover or keyboard focus of a door, the glyph cells nearest the door snap into that room's ASCII vocabulary from `house.json` in its hue over 320 ms, then relax after 1.2 s. Off in Calm. About 1.2 KB gz added to `field.js`.
- `scripts/check-keyboard.mjs`: skip link first, visible focus on every stop, no trap, Esc closes the menu and returns focus. In `npm run check` and `check.yml`.
- Screenshots in `docs/audits/shots/wave-3/`.

### Changed (foyer polish, phase 4)
- Receipts are compact slot rows. Problem and What I built are 120 characters or less. "How it is checked" sits in a drawer below 700 px and opens from 700 px up. The featured poster is hidden on phones because the hero door above shows it. Phone page length 6,471 px to 4,207 px.
- Try this lines match today's rooms. Slop door poster re-shot from the current Slop build.

### Added (house 2.0.1)
- House 2.0.1, released as `/house/2.0.1/` from `house/src/`. 2.0.0 is untouched. The hub pages now run on 2.0.1 (`house.lock.json`).
- The room crumb fits at 360 and 390 for every room name, "Online Paluwagan" included, with no ellipsis: under 600 px the wordmark steps to 17 px and Email moves into the Menu. The row stays 52 px and targets stay 44 px.
- Room links in the Menu. `house-sync` takes `--links links.json` or `"links"` in `house.lock.json` and lists a room's own pages under its name. A room that passes nothing is unchanged.
- `doorway.js` swallows rejections of `viewTransition.ready`, `finished` and `updateCallbackDone`, so a skipped transition (InvalidStateError in fast keyboard navigation) never surfaces as an unhandled error.
- `house/MOTION.md` lists the Paluwagan and Living Mindmap animations. PaperLab and Slop Editorial still owe their lines.
- `check-house.mjs` checks the room crumb for all four names at 360, 390, 1024 and 1440, and runs the contract on every release's demo.

### Added (foyer, phase 2)
- Every hub page runs on house 2.0.0: house crumb, menu, footer (Calm switch, Plain text, live receipts), focus rules and 44 px targets. `hub.css` replaces `style.css` and `case.css`, and `main.js` is gone.
- First screen per DIRECTION 5.2 and 5.3 with the interim headline kept in `site.json`, four static doors (PaperLab featured and dark, a grouped list for the rest) with proof lines, status chips and hidden "Proves" text. Posters in AVIF with WebP fallback, captured by `scripts/posters.mjs`.
- Work as receipts on the house Receipt partial, one CTA set ("Open the room", "Read the case", "Code"). Case pages use the same Receipt.
- Evidence slots: `data/evidence/`, `npm run evidence:pull`, the "Refresh evidence" workflow. Typed figures are gone from `projects.json` and the case pages.
- `/colophon/` (tokens and springs computed from `tokens.css`), `/changelog/`, a static 404, `llms.txt`, an `index.md` twin beside every page, `.nojekyll`.
- Glyph field per ADR 0012: settles within 5 s of load or the last input, lighter on phones, weighted to the text column. The decode on load stays.
- CI: the 10-second gate, copy lint, budgets, axe on every page.

### Added (house 2.0.0, phase 1)
- The immutable `/house/2.0.0/` folder: tokens, house components (crumb, menu, footer, capsule, label, receipt, drawer, toast, Calm switch), the 210 byte `boot.js`, the head `doorway.js`, the deferred `house.js`, partials, `house.json`, self-hosted fonts, `manifest.json` and the room tools. No current hub page uses it yet.
- `/house/2.0.0/demo.html`: every component in every state, in light and dark. axe 0 violations at 390 and 1440, CLS 0.
- `npm run house:release <version>`, `house/MOTION.md`, `scripts/check-house.mjs` (immutability, token lint, budgets, room contract and CLS on the demo) and `scripts/shoot-house.mjs`. `check.yml` runs them.

### Fixed
- Hub figures follow the 2026-10-28 evidence runs: Paluwagan 56 tests, Slop 70 unit tests. The Mindmap card drops the 0.5 ms median, which today's run did not reproduce.

### Added (doorway bench)
- Unlinked, noindex `/lab/doorway/a/` and `/b/` fixtures and `scripts/bench-doorway.mjs`, which runs 20 navigations each way in Chromium and WebKit and probes how Pages resolves missing paths. A weekly `doorway-bench` workflow runs it against the live host.

### Fixed (honesty sweep)
- Living Mindmap shows "Runs locally" instead of "Live", since it has no hosted demo.
- Online Paluwagan copy says pre-written reminder templates a person approves, and a seeded payout draw.
- Lighthouse figures removed from the cards and case pages until CI measures them.
- The hero drops the "Now" line and the "8 developers" proof point. A Paluwagan ledger figure takes that slot.

- Cards are never hidden by opacity. The reveal is a small lift only, and anything above the fold or targeted by the URL hash shows at once.
- `src` comments beside every home-page number, generated from `source` on figures and `resultSource` in `projects.json`.
- Slop (143 browser checks) and Paluwagan (53 tests) sources updated to runs on 2026-10-28. Notes mentioning 150 and 42 removed.
- Slop diagram label reads "mock or paid, then ledger".
- "Proves" lines: Paluwagan "Money logic you can check", Slop "A paid pipeline that asks before it spends". Work heading reads "Four projects I built and tested."
- Shorter Mindmap and Slop pitches, in cards, noscript, case leads, meta, og and twitter.
- 44 px tap targets on the wordmark, hero proof links and footer links.
- 404 copy reads "That page does not exist."
- About keeps the roles and drops the numbers (amends ADR 0008 for these figures).

### Added
- A "Now" line under the hero lead, from `site.json`.
- Hero proof points link to their cards; a PaperLab Lighthouse figure replaces the degree line.
- Footer links to Work and the four case pages, and to ADR 0001 ("Built without a framework").
- The 404 page shows a static frame of the hero glyph field.
- Pressed state (`scale(.98)`) on buttons and cards, off under reduced motion.

### Changed
- Favicon is a "GL" monogram in JetBrains Mono on the accent colour, flipping with the theme.
- Tags trimmed to three per project.
- `docs/` with audit, ADRs 0001–0008, the October 2026 polish plan, this changelog and a tracker.
- `CLAUDE.md` with site conventions.
- `scripts/build.mjs` renders the Work cards and the noscript list into `index.html` from `projects.json`; cards are now in the HTML with no loading state (ADR 0007).
- Featured PaperLab block leads Work with large proof figures, "Open the demo" and "Read the case" (ADR 0004).
- "Read the case" link and `id="work-<slug>"` on every card.
- 2x hero crops (1600x1000) for all four projects via `capture.mjs --crop`.
- CI: build-output check, html-validate, axe in light and dark, link check.
- Case-study pages for PaperLab, Living Mindmap, Slop Editorial and Online Paluwagan at `/work/<slug>/`, each with an architecture diagram, decisions, sourced results, detail screenshots and prev/next navigation (ADR 0006).
- `case.css`, shared header/footer partials (`scripts/lib/chrome.mjs`), and case-page header blocks, screens and navigation rendered from `projects.json`.
- Detail crops per project via `capture.mjs --detail`; an Open Graph image per case page in `assets/og/`.
- Sitemap lists the five URLs.
- Interactive hero: a glyph field behind the hero with click ripples and cursor glow, and a headline that decodes on load (`hero.js`, ADR 0005). Static under reduced motion.

### Changed
- Slop Editorial card result updated to the README's current figures; Paluwagan pitch says template drafts, not AI drafts; PaperLab proof point reads "19 tests on PaperLab's attention math".
- Card order follows ADR 0004: PaperLab, Living Mindmap, Slop Editorial, Online Paluwagan.
- Cards lift 2 px with an accent-tinted border on hover, the screenshot scales to 1.02, and cards reveal with a 60 ms stagger; all off under reduced motion.
- `main.js` only handles reveal-on-scroll.
- Screenshot and review scripts use Playwright.
- `og.mjs` uses the shared Playwright launcher instead of puppeteer-core; `check-axe.mjs` covers every case page; the link check no longer treats `/work/` as pending.

## 2026-10-14

### Added
- Portfolio hub: hero, four case cards rendered from `projects.json`, About, Contact.
- Editorial design with self-hosted Fraunces, Inter and JetBrains Mono; dark theme via `prefers-color-scheme`.
- Screenshot pipeline (`scripts/capture.mjs`), OG image render (`scripts/og.mjs`), review shots (`scripts/shoot.mjs`).
- Slop Editorial card marked live with measured results.

### Changed
- Contact email switched to Outlook address.
- Living Mindmap pitch corrected to match the shipped tool count.
