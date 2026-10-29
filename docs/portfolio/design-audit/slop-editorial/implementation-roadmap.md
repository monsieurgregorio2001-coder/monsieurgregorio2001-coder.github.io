# Slop Editorial: implementation roadmap

Pass 2, step 3, 2026-10-29. Agent B. Combines [brand-strategy.md](brand-strategy.md) (Agent A) and [ux-strategy.md](ux-strategy.md) (Agent B) under the [joint calls](../pass-2-joint-calls.md). Finding IDs refer to the [register](../pass-1-register.md). Proposed, not adopted. Repo: `slop-editorial`, site in `site/` (Astro, ClientRouter, intent prefetch, scoped service worker). Stack stays.

Effort: S under a day, M one to three days, L more than three days. Phone profile: 390 x 844, 4x CPU, 1.6 Mbps, 150 ms RTT, live host, 3 runs, median.

## Phase 1: Foundation

**SE-F1 · No duplicate fonts** · S
- Rationale: B-X-02.
- Areas: `site/src/styles/`, `site/src/layouts/`.
- Prerequisites: none. Superseded in SE-C2 when Slop moves to its own faces, but it fixes the first visit now.
- Acceptance: no font file fetched twice on any page. Inter and JetBrains Mono come from `/house/2.0.1/fonts/` until SE-C2.

**SE-F2 · Works index cold load** · S
- Rationale: B-SE-01.
- Areas: `site/src/pages/works/index.astro`, image sources in `site/public/img/`.
- Prerequisites: H-F1 live number.
- Acceptance: first plate `fetchpriority="high"` with dimensions and a phone source. Works index LCP 2.0 s cold on the phone profile (local today 3520 ms). CLS 0.02.

**SE-F3 · Banner plays once** · S
- Rationale: B-SE-02, A's challenge.
- Acceptance: the parody banner shows once per session, any button dismisses it, it never returns after a client navigation, covers 15 percent or less of a 390 screen, and never traps focus.

**SE-F4 · Developer surfaces move to the hub** · S
- Rationale: A-SE-05, A-X-04.
- Prerequisites: PF-F6.
- Acceptance: release tracker detail and receipts on the hub case page. Releases page keeps only reader-facing release notes.

**SE-F5 · Small targets** · S
- Rationale: B-SE-03.
- Acceptance: probe reports 0 standalone links under 44 px on Releases and every work page.

**SE-F6 · Service worker storage bound** · S
- Rationale: B-SE-04, A-SE-09, cache policy.
- Areas: `site/public/sw.js`.
- Acceptance: image cache bounded (for example 25 MB), oldest evicted first. A test proves video paths and range requests are never cached. Scope test still green.

## Phase 2: Core redesign

**SE-C1 · Migrate to house 3.0.0** · M
- Rationale: A-X-01 to A-X-03. Slop moves first: it already owns most of its chrome and has the fewest shared components.
- Prerequisites: H-F4.
- Acceptance: house behaviour contract green. Doorway pair 20 of 20 Chromium, 19 of 20 WebKit with the hub still on 2.0.1. Cross-room links keep `data-astro-reload`.

**SE-C2 · Couture catalogue identity** · L
- Rationale: A-SE-01, A-SE-02, A-SE-06, A-SE-08.
- Areas: `site/src/styles/`, `site/src/layouts/`, `site/src/components/`, fonts in the slop repo (joint call 1).
- Prerequisites: SE-C1, owner commission decision for the masthead.
- Acceptance: fonts 129 KB or less on any page (Bodoni Moda without opsz, Courier Prime, masthead as inline SVG, Newsreader only with long-form). Bodoni only at 28 px and above. Captions 16 px or more on phones. A's palette ratios rechecked (ink 16.2 / 16.5, ink-2 6.8 / 8.7, lipstick 7.0 / 7.2, gilt 6.65 / 12.56). Sticker yellow never used as text (lint). Scheme follows the OS, Room toggle as override (joint call 2). axe 0 at 390 and 1280, both themes.

**SE-C3 · Art direction and lead image** · L (owner spend)
- Rationale: A-SE-03, A-SE-04.
- Acceptance: cover images 200 KB or less at 1000 px, phone sources at 640 and 960 w with `sizes`, every plate with alt text that names the slop. Home LCP stays 2.0 s or less.

**SE-C4 · Satire that does not cost function** · S
- Rationale: A-SE-07, A-SE-10.
- Acceptance: counters read as label copy, never trap focus or move longer than 5 s without a pause. Tagline replaced by the owner-approved line.

**SE-C5 · Per-device plates** · M
- Acceptance: 390 full-bleed plate with a bottom Previous and Next strip in thumb reach, 820 two-column index, 1280 hung wall of three. No overflow 360 to 1440.

## Phase 3: Polish

**SE-P1 · Plate morph page turns** · M
- Acceptance: the clicked plate morphs into the work's plate through ClientRouter, Back interrupts it, Calm and "Still" give a 160 ms fade. Warm page turn useful in 300 ms or less.

**SE-P2 · Swipe between works** · S
- Acceptance: swipe follows the finger, settles on velocity and distance, cancels cleanly, never inside a zoomable image. Visible Previous and Next stay primary. Tested on real iOS for back-swipe conflict.

**SE-P3 · Curtain cover** · S
- Acceptance: transform and opacity only, interruptible, finishes in 600 ms or less, end state in Calm.

## Phase 4: Future expansion

**SE-E1 · Media host decision and video plates** · L (owner)
- Acceptance before build: host chosen. Video `preload="none"` with poster and dimensions, captions, no autoplay with sound, never in the service worker.

**SE-E2 · Game frame** · L
- Acceptance: lazy island with its own JS budget set before build, pauses on blur and `astro:before-swap`, keyboard playable, no more than 3 flashes per second.

**SE-E3 · Long-form** · M
- Acceptance: Newsreader loads only on long-form routes, measure 60 to 75 characters, scroll restored per article, progress indicator that never animates on its own.

## Cross-project dependencies

- SE-C1 is the first product move after H-F4.
- SE-F2 uses H-F1's live baseline.
- SE-F4 waits for PF-F6.
- PF-C2 needs SE-C2 for Slop's signature crop.
