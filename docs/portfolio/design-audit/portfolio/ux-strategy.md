# Personal Portfolio (hub): UX and engineering strategy

Agent B, pass 2, 2026-10-29. Proposed, not adopted. Builds on the [B audit](../03-agent-b-ux-audit.md) (B-PF-01 to B-PF-06, B-X-01 to B-X-04) and A-PF and A-X findings in the [register](../pass-1-register.md). B-PF-01 (clipped door names) is already fixed (hub#24). Visual identity is Agent A's. Stack stays static HTML, CSS and vanilla JS on GitHub Pages (ADR 0001).

## Who and what

Hiring managers and engineers deciding in under a minute whether Garfield builds real things. Second audience: anyone arriving from a product who wants to know who made it.

Headline: **a fast developer front door: claim, four doors, proof one step away, and the hub becomes the one place that carries the engineering story for all four products.**

## Primary journeys

| Journey | Target |
| --- | --- |
| Ten-second read | Name, role, claim, four door names readable on the first screen at 390 and 1280, with JS off and fonts blocked (the existing gate). |
| Door to product and back | Tap a door, a useful product screen in 1.0 s warm on the phone profile, Back to the same scroll and focus (live gate already proves the return). |
| Inspect the engineering | One tap from a door to its case page, where tests, evals, budgets and commands live in disclosure, grouped by claim. |
| Contact | Email, copy address with toast, LinkedIn, GitHub, reachable from every screen. |
| From a product to the hub | Credit line "A Garfield Lim project" first in every product footer, same position in all four, and a home link in every product menu. |

## Information architecture

- Foyer: hero, four doors, short How I work, About, Contact. The Work section shrinks to one line and one headline figure per project, the receipts move to the case pages (B-PF-02, A-PF-01, A-PF-04). Target page height at 390: under 3800 px.
- Case pages `/work/<slug>/`: the proof. Each claim, its check, its number, its command in a drawer.
- Because A-X-04 moves receipts and process blocks out of the products, the case pages become the only proof surface. They must be complete before the products drop their blocks.
- Changelog, Colophon, llms.txt, plain-text twins stay, linked from the hub footer only.

## Navigation and interaction patterns

- Doors are single links with a separate "Read the case" link (DIRECTION 8). Keep.
- Menu: native popover, Esc returns focus (verified). Keep the behaviour, style is A's.
- Prefetch: keep Speculation Rules `prefetch` on door links. On touch, add viewport-based prefetch of the flagship door only, since `moderate` gives little lead time (B-PF-03). Never `prerender`.
- Copy address: immediate toast, `role="status"`.
- Interactive demos only where they prove something: the door "order from noise" effect stays optional and off on touch and in Calm.

## Responsive behaviour by device class

- **390**: hero, flagship door, three rows with full names (no ellipsis anywhere, a long-name screenshot case in CI), one primary capsule. Remove the duplicate primary that points where the flagship door already goes (B-PF-06).
- **820**: two-by-two doors under the hero, case pages in a single readable column with drawers.
- **1280**: hero left, doors right (current), case pages with a sticky claim index in a side column.

## Motion and gesture principles

- The doorway stays the hub-to-product handoff and ends on the product's own colours and mark, not house chrome. The named elements are the door poster and the product's mark (`house-crumb` and `house-wordmark` go with the crumb). It must never cost a tap. Validate that input during the 600 ms reveal reaches the new page (B-PF-04). If it does not, shorten the reveal or make the clip purely decorative over a live page.
- The glyph field must fit the budget it already has: no long task over 50 ms in the first 5 s. Today 262 ms locally on the phone profile. Move field work to idle time, cap glyph count by device class, draw one still frame on touch until first input.
- Reduced motion and Calm: current behaviour verified complete. Keep.

## Accessibility requirements

- WCAG 2.2 AA, both themes. Already 0 contrast failures and 0 unnamed controls in the audit. Keep axe, keyboard and gate checks in CI.
- Drawers on case pages are native `details` with named summaries.
- Door names never truncated. Long names wrap.

## States

| State | Behaviour |
| --- | --- |
| JS off | Complete foyer, doors work (existing gate). |
| Evidence slot missing | Build fails (existing rule). Never ships "not measured yet". |
| Copy fails (no clipboard) | Toast says the address and that it was not copied. |
| Room offline or 404 | The doorway falls back to a normal navigation and the browser error, no fake transition. |

## Caching and prefetching

| Resource | Class | Treatment |
| --- | --- | --- |
| `/house/<version>/` | Immutable versioned folder | HTTP cache. Pages sets a short max-age (to be confirmed live, B-X-01), so versioned paths still help by keeping one copy for all sites. |
| Hub HTML | Public | Revalidate every visit. |
| `data/evidence/*.json` | Public reference, snapshot | Baked into HTML at build. No runtime fetch. |
| Live receipts | Per visit, private to the browser | Computed in page, never stored. |

- No service worker on the hub. It is static, light (289 KB cold) and the risk of stale clients outweighs the gain.

## Rendering and transitions

- LCP is the door poster (1288 ms cold phone, local). Keep posters sized, preloaded only for the flagship.
- Cross-document view transitions stay with the current fallbacks. Confirm the Chromium room-to-room CLS (B-PF-05) before any change.

## Budgets and success criteria

Phone profile, live host, Chromium and WebKit.

| Metric | Budget |
| --- | --- |
| JS before interaction | 20 KB gz (DIRECTION 8) |
| Total first load at 390 | 300 KB (local 289 KB) |
| LCP cold | 1.8 s, warm 1.0 s |
| Long tasks in the first 5 s | None over 50 ms |
| INP | 150 ms |
| CLS | 0.02 |
| Door to useful product (warm) | 1.0 s from tap |
| Foyer height at 390 | Under 3800 px |

## Component reuse and system boundaries

The hub owns the shared engineering layer and publishes it as versioned files, as today:

- **Shared engineering (behaviour, token driven, unstyled or minimally styled)**: hosting of any face two products share (product-only faces live in the product repo), motion contract and Calm state, focus contract, dialog, status and alert regions, popover menu behaviour, drawer behaviour, doorway script, return-link position, budgets, checks, evidence pipeline.
- **Per product**: everything a visitor would call the look. Wordmark, header and footer content, type, palette, radii, motion character.
- The hub is also a product with its own look (A's developer direction).

## Risks and dependencies

- Splitting the house changes DIRECTION principle 7 and needs a portfolio ADR first.
- Each product depends on the shared layer's version pin. Keep immutable versions and the upgrade smoke test.
- Moving proof to case pages must happen before the products remove their receipts, or proof disappears for a while.

## Changes after review

- Doorway: now ends on the product's own brand. Its morph is rebuilt around the door poster and the product mark, because the crumb it used to target goes away (A, B-PF-04).
- Return path: A's footer credit line accepted, with a home link in every product menu.
- Door thumbnails: become each product's signature crop (A-PF-03). Budget them as small single images.
- Fonts: if Plex Sans and Plex Mono are adopted (about 89 KB measured), rerun the two-line H1 gate at 360 before shipping. Mono display text sets about 16 characters per line at 36 px.
- Links get an underline, because A's signal orange and link blue differ by hue only (1.11:1).
- Product-only faces live in product repos, not in `/house/` (open for a joint call).
