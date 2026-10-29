# Slop Editorial: UX and engineering strategy

Agent B, pass 2, 2026-10-29. Proposed, not adopted. Builds on the [B audit](../03-agent-b-ux-audit.md) (B-SE-01 to B-SE-04), B-X-02, and A-SE-01 to A-SE-10 in the [register](../pass-1-register.md). Visual identity is Agent A's. Stack stays Astro with ClientRouter, its own intent prefetch and service worker, all of which earned their place (repeat visit 125 KB and FCP 504 ms against 845 KB and 888 ms cold, local throttled).

## Who and what

Readers who come for the joke and stay for the issue. Later: video, small games and long-form pieces. The publication is already the fastest of the four on repeat visits. The work is cold-load speed on image pages, reading comfort, and an architecture ready for heavier media.

Headline: **read like a magazine, turn pages instantly, and give every future format its own lifecycle inside one fast shell.**

## Primary journeys

| Journey | Today (local, phone throttled) | Target |
| --- | --- | --- |
| Arrive from a shared link to a work | Fast | LCP 2.0 s cold on any work |
| Browse the exhibition | Works index cold LCP 3520 ms (B-SE-01), works to work 234 ms, Back 409 ms with scroll restored | Index cold LCP 2.0 s, page turn under 300 ms, Back restores scroll |
| Read the certificate and method, spend cap | Works | Same, spend cap reachable in two taps from any work |
| Follow releases | Tracker page | Same, with small link targets fixed (B-SE-03) |
| Future: watch, play, read long | Not built | See architecture below |

## Information architecture

- Keep the issue structure: Cover (home), Works (index and nine works with Previous, Index, Next), Certificate, Method and spend cap, Releases, About.
- Add, when they exist, three section types: Watch, Play, Read. Each a route family under `/slop-editorial/<section>/<slug>/`.
- Developer-facing items (release tracker detail, receipts) move to the hub case page or the footer of Releases only (A-SE-05). Wording is A's.

## Navigation and interaction patterns

- Page turns stay ClientRouter swaps with the existing intent prefetch. Add horizontal swipe between works on touch as a convenience, with the visible Previous and Next links kept, and never inside an image that can be zoomed.
- Rating and "views" stay local-only satire. Their controls are 44 px and announce their result.
- The parody cookie banner plays once per session, is styled as part of the magazine, dismisses on any button and never returns after a client navigation (B-SE-02, agreed with A).

## Responsive behaviour by device class

- **390**: full-bleed plates, caption below, Previous and Next as a bottom bar in thumb reach on work pages.
- **820**: plate and caption side by side in landscape, a two-column index.
- **1280**: index as a hung wall (three columns), work pages with the plate large and text in a margin column.
- Serve the plate width each class needs. The handover notes phones get the 640 w hero at full width on 3x screens. Add 960 and 1280 sources with `sizes` set per layout.

## Motion and gesture principles

- Page turn: the clicked plate morphs into the work's plate (same-document view transition through ClientRouter), interruptible by Back.
- Swipe follows the finger, settles on velocity and distance, cancels cleanly, and maps to the same navigation as the links.
- HUD notices and satirical tickers: none may move longer than 5 s without a pause control.
- Reduced motion: page turns are a 160 ms fade, swipe still works but snaps.

## Accessibility requirements

- WCAG 2.2 AA in both themes. Alt text on every plate that describes the image and, where the joke depends on it, the slop in it.
- Satire must not cost function: fake counters and banners never trap focus, never cover more than 15 percent of a 390 screen, and are skippable by keyboard.
- Video (future): captions required, no autoplay with sound, pause visible, poster image with dimensions.
- Games (future): playable by keyboard, pause on blur and on route swap, no flashing over 3 per second (WCAG 2.3.1).

## States

| State | Behaviour |
| --- | --- |
| Offline repeat visit | Service worker serves cached pages, a small "You are offline, showing a saved copy" line. |
| New build while a tab is open | Existing behaviour: new worker waits until old tabs close. Keep it. |
| Image slow | Sized placeholder in the plate's dominant colour, no layout shift. |
| Missing evidence | Network only, plain empty-state copy. |

## Caching and prefetching (Gorges cache policy)

| Resource | Class | Treatment today | Change |
| --- | --- | --- | --- |
| `_astro/*` | Fingerprinted | Service worker cache first | Keep |
| Pages | Public | Stale while revalidate | Keep. Show "saved copy" only when offline. |
| `img/*`, fonts | Public static | Stale while revalidate | Add a byte cap and eviction before any video ships |
| House fonts | Shared static | Duplicated by local copies (B-X-02) | Load Inter and JetBrains Mono from `/house/<version>/fonts/`, keep only Bricolage local. About 90 KB saved on first visit. |
| `evidence.json` | Receipt | Network only | Keep |
| Video (future) | Large media | None | Never in the service worker. HTTP cache and range requests only (the worker already skips range requests). |

- Intent prefetch: keep its queue and limits. Do not prefetch video, game bundles or anything over 200 KB on intent. Respect Save-Data.

## Architecture for future formats

- **Video**: native `<video>` with `preload="none"` and a poster, files hosted where range requests and long cache work (GitHub Pages size limits are a dependency, see open decisions). No video in the precache.
- **Games**: each game a lazy island with its own bundle budget, mounted on the route only. Listen to `astro:before-swap` to pause and release pointer capture, or opt the route out of ClientRouter with `data-astro-reload` if its lifecycle is complex.
- **Long-form**: a reading layout with measure 60 to 75 characters, restored scroll position per article (sessionStorage), and a progress indicator that does not animate on its own.

## Rendering bottlenecks

- Works index first image (B-SE-01): give the first plate `fetchpriority="high"`, explicit dimensions, and a phone-sized source. Lazy-load the rest.
- Feed page script is 67.6 KB gz. Keep it off every route but the feed.
- 31 requests on the home page cold. Fold small scripts where Astro allows.

## Budgets and success criteria

Phone profile on the live host.

| Surface | Budget |
| --- | --- |
| Home, certificate | DIRECTION 8: JS 15 / 20 KB, fonts 129 KB, LCP 2.0 s, INP 150 ms, CLS 0.02 |
| Works index and work pages | LCP 2.0 s cold, 0.8 s warm, CLS 0.02 |
| Page turn (warm, prefetched) | Useful page in 300 ms |
| Fonts on first visit from the hub | No house font downloaded twice (0 duplicates) |
| Service worker storage | Bounded, for example 25 MB, oldest images evicted first |
| Future game route | Own budget set before build, game JS never loaded off its route |

## Component reuse and system boundaries

- Shared engineering layer: motion contract, focus rules, status region, fonts loader, budgets, the cross-room return link.
- Slop owns: masthead, issue layout, plate component, satire chrome, intent prefetch, service worker (scoped to `/slop-editorial/`).

## Risks and dependencies

- GitHub Pages limits for large media (file size, bandwidth) may force a separate media host. That is an owner decision.
- Swipe between works must not conflict with iOS back swipe or image zoom. Real device test needed.
- Service worker scope must stay inside `/slop-editorial/`, proved by the existing CI test.

## Changes after review

- Banner: plays once per session and looks deliberate (A's challenge to B-SE-02).
- Future media stays Medium for Slop only. The masthead, grid and caption system must already allow a video plate, a long-form measure and a game frame.
- Fonts: A's four-family plan measures about 386 KB on a work page against 129 KB. The strategy now assumes Bodoni Moda and Newsreader without the optical-size axis, the masthead as SVG, captions in Newsreader roman or italic after LCP: about 130 KB.
- Bodoni only at 28 px and above. Prices, captions and controls never set in the didone. Captions 16 px or more on phones.
- Colour scheme follows the OS by default with an edition toggle (B position, joint call with A's "evening edition" default).
- Sticker yellow is fill only, enforced by lint (1.31:1 as text on bone).
