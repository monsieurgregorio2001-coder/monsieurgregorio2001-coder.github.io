# PaperLabs: UX and engineering strategy

Agent B, pass 2, 2026-10-29. Proposed, not adopted. Builds on the [B audit](../03-agent-b-ux-audit.md) (B-PL-01 to B-PL-05) and A-PL-01 to A-PL-09 in the [register](../pass-1-register.md). Visual identity is Agent A's. Stack stays React 18, TypeScript, Vite. The repo is `paperlab`, the product name in this folder follows the owner's brief.

## Who and what

Curious learners and technical reviewers who want to see how a paper's idea works by touching it. The current lesson (Attention) is fast and keyboard complete. What is missing is a place to discover more and to come back to.

Headline: **a map of lessons you can open in one tap, each lesson a direct-manipulation instrument whose state lives in the URL.**

## Primary journeys

| Journey | Target |
| --- | --- |
| First visit | Lands on the lesson index (or straight into a lesson from a shared link). One tap opens a lesson. Under 2 s to an interactive lesson on the phone profile. |
| Play | Type or pick a sentence, select a word by tap, scrub or arrow keys, switch heads, break the math. Every change visible in the next frame. |
| Go deeper | "Show the numbers" opens in place, mounts only when opened (today 187 ms throttled). |
| Share | The URL already carries the state (`?q=&head=&off=&mask=`). Add a visible "Copy link" with a toast. |
| Return | The index shows which lessons were opened (local, per browser) and resumes the last state. |
| Next | The end of each lesson links to the next one in the map. No dead end. |

## Information architecture

- `/paperlab/` becomes the lesson map: one card per lesson, a still of its key visual, one line on what you will see. Today one entry, Attention. Others appear only when finished (DIRECTION principle 6, A-PL-08).
- `/paperlab/<lesson>/` per lesson. Attention moves to `/paperlab/attention/`, the old URL redirects in place by rendering the same lesson, so shared links keep working.
- `/paperlab/legacy/` stays reachable from the map footer, not from the main menu.
- Process material (How this was built, ADRs, receipts) leaves the lesson page for the hub case page (A-PL-05).

## Navigation and interaction patterns

- Lesson map to lesson: same-document navigation (client route) with a shared-element morph of the lesson card still into the lesson's hero visual, interruptible.
- In a lesson: tap a word, scrub across words with a pointer, arrows to move, Home and End. The scrub is the brand's signature interaction (B-PL-05 raised to Medium with A), so it ships with the first lesson map, not later. The head rail keeps its roving tabindex radiogroup.
- Switches stay real `role="switch"` buttons. Their result is described in one sentence below.
- The truth label stays, reworded so it welcomes before it warns (A-PL-09). Wording is A's.

## Responsive behaviour by device class

- **390**: the visual first, controls below in thumb reach. Head rail wraps to two rows when labels do not fit (B-PL-03). Scrub region gets `touch-action: pan-y` so vertical page scroll still works.
- **820**: visual and controls side by side in landscape, stacked in portrait with the rail as a horizontal segmented control.
- **1280**: visual large and central, controls in a column beside it, numbers drawer opens as a side panel instead of pushing content down.

## Motion and gesture principles

- Attention arcs animate on transform and opacity, retargeted from the current value on every input (no restart), so fast typing or scrubbing never queues animations.
- Springs: snappy for selection, smooth for the morph. No bounce on numbers.
- Scrub follows the pointer directly. Pointer capture on down, release on up or cancel. A second pointer cancels the scrub.
- Every gesture has a keyboard path (arrows) and a tap path.
- Reduced motion: arcs jump to the new state, the morph becomes a 160 ms fade.

## Accessibility requirements

- WCAG 2.2 AA in both themes.
- Live regions: one polite status, updated after input settles (about 400 ms) or on discrete actions only (B-PL-02).
- The visual has a text equivalent: the top reads list already exists and stays.
- Targets 44 px for words, chips and switches (today words 61 x 49).
- Scrub never required: tap and keys reach every state.

## States

| State | Behaviour |
| --- | --- |
| Empty sentence | Existing "Nothing to read yet. Type a sentence or pick an example." stays. |
| Too long | Existing truncation message stays. |
| Lesson loading | Static shell with the lesson title and still image, then the instrument. No spinner. |
| Engine error | A plain message, the still image, and a link to the numbers in text. |
| Receipts missing | Never show dev-server wording on the public page (A-PL-06). |

## Caching and prefetching

| Resource | Class | Treatment |
| --- | --- | --- |
| Lesson chunks | Fingerprinted static | One chunk per lesson, HTTP cache. |
| Shared engine (`transformer`) | Fingerprinted static | One chunk shared by lessons that need it. |
| Lesson stills | Static images | Sized, `fetchpriority="high"` for the LCP still, AVIF or WebP with dimensions. |
| Progress (which lessons were opened, last state) | Private convenience | localStorage with `paperlab.` prefix, try/catch, never required. |

- Prefetch the lesson chunk on hover or focus of a map card, and the next lesson's chunk when the learner reaches the end of a lesson. At most one speculative request at a time, skipped on Save-Data.
- No service worker. Lessons are small and the HTTP cache suffices. Revisit only if the map grows past a measured cold-load problem.

## Rendering and transitions

- Keep the static `#room-hero` shell as LCP (today 928 ms phone throttled, local).
- Move `modulepreload` of the engine from the map to the lesson route, so the map stays light (B-PL-04).
- Watch long tasks during typing as lessons get heavier. Today one 217 ms task after load. Run heavy kernels off the main thread (worker) only when a lesson measures an input event over 100 ms.

## Budgets and success criteria

Phone profile on the live host, cold and warm.

| Metric | Budget |
| --- | --- |
| Map: JS before interaction | 30 KB gz |
| Lesson: JS before interaction | 120 KB gz (DIRECTION 8), today about 55 KB |
| LCP cold | Map 1.8 s, lesson 2.2 s. Warm 1.0 s |
| INP while typing or scrubbing | 100 ms (today typing max event 56 ms local) |
| Frame budget during scrub | No dropped frames over 3 in a 2 s scrub at 4x CPU |
| CLS | 0.05 |
| Map to lesson (warm chunk) | Useful lesson within 300 ms of tap |

## Component reuse and system boundaries

- Shared engineering layer: motion contract, focus rules, drawer behaviour, status region, fonts loader, budgets.
- PaperLabs owns: the lesson map, the instrument components, its type (Recursive is planned), palette and diagram language.

## Risks and dependencies

- New lessons are content work. The map is only worth building when a second lesson is finished. Until then the map is one card and the strategy still holds.
- Moving Attention to `/paperlab/attention/` must keep the doorway target and the live gate's PaperLab pair green.
- Scrub on iOS Safari must be tested on a real device for conflict with the system back swipe.

## Changes after review

- Scrub raised from optional to the signature interaction, with tap and arrow keys kept (A's challenge to B-PL-05).
- Fonts: A's Recursive plan is 187 KB as one file. The strategy now assumes three measured instances: sans 45 KB and mono 40 KB on first paint (85 KB, inside the 92 KB budget), margin-note static 31 KB after LCP.
- Maths glyphs (√, Σ, ≈) are missing from every Fontsource subset of Recursive. Formulas need a verified upstream file, a metric-matched fallback or SVG.
- Marker colours: text in a marker colour never sits on that marker's 20 percent wash (3.85 to 4.12:1). Arcs and annotations add a non-colour cue (line style or shape), because the three markers differ by hue only.
- Margin notes at 16 px or more.
