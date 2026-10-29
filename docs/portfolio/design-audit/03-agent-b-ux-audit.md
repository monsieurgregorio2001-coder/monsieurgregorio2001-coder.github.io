# Agent B audit: UI/UX, interaction and performance

Pass 1. Audit only. No production code was changed. Written 2026-10-29 by Agent B without reading Agent A's file.

Scope: Personal Portfolio hub, PaperLab, Slop Editorial, Online Paluwagan, each at origin/main (hub c831674, paperlab 97496f6, slop-editorial ca11efd, paluwagan 51a11c3). Living Mindmap is out of scope.

## Framework

| Source | What it contributed |
| --- | --- |
| Gorges Native UX (owner skill, SKILL.md and references/) | The primary lens. The measurement boundaries (input feedback, warm navigation, cold load, separate cold and warm runs), the cache policy table, the rule that financial writes and approvals must confirm success and never fake it, the rule that focus and place are restored after a sheet or route, and the gesture rules (no gesture-only money actions, every gesture has a button). Its "implement when requested" clause was not applied. |
| ux-ui-audit:ux-ui-audit | `probe-core.js` and `probe-heuristics.js` run on 11 routes, 2 themes, 2 widths (44 runs). Contrast, tap targets, accessible names, Hick and Fitts indices, interaction-state coverage, helper text. The rule that every finding carries a number or a quote. |
| design:accessibility-review | The WCAG checklist used for keyboard, focus order, dialog names and status messages (cited against WCAG 2.2). |
| design:design-critique | First-impression and hierarchy pass on screenshots at 390, 820, 1024 and 1440. |
| uxkin:no-ui-slop | The "design every state" check (empty, success, error, long names) and the review at phone and desktop widths. Its MCP server did not connect, so no external references were used. |
| Project rules | Hub AGENTS.md, DIRECTION.md (house tokens, motion, doorways, budgets), ADR list, and the release V1 handover for live-host numbers. Where they set a standard, findings were judged against it. |

## Method and what the numbers mean

- All four sites were built locally (`npm ci && npm run build` with `HOUSE_DIR` set to the hub) and served at their real paths with `/house/` from the hub, using `scripts/lib/serve.mjs` from the hub. Chromium 1194 headless via Playwright.
- "Phone throttled" means 390 x 844, touch, CPU 4x, 1.6 Mbps down, 150 ms RTT via CDP. This matches the live gate profile in the handover.
- The local server sends no cache headers, so "warm" runs for the hub, PaperLab and Paluwagan re-download everything. Only Slop's warm numbers reflect real caching, because its service worker does the caching. GitHub Pages headers could not be observed from this sandbox.
- Every number marked "local" is from this sandbox. Numbers marked "live" are quoted from `docs/portfolio/handovers/2026-10-28-release-v1.md`.
- Evidence folder: `/tmp/claude-0/-home-user/64d8fb9e-1614-54db-87bf-29b299ef88b5/scratchpad/agent-b/` (scripts `perf.mjs`, `probes.mjs`, `journeys.mjs`, `journeys2.mjs`, `j3.mjs` to `j6.mjs`, outputs `perf.json`, `probes.json`, `journeys.log`, `journeys2.log`, screenshots in `shots/`). Paths below are relative to that folder.

Each finding is marked OBSERVED (measured or seen in a running build) or HYPOTHESIS (inferred from code or from platform behaviour, not measured here).

## Summary

The four sites share a strong floor. Across 44 probe runs there were 0 contrast failures, 0 unnamed controls, 0 horizontal overflow at 390, 820, 1024 and 1440, one H1 per page and a skip link everywhere. Nothing animates after 6.5 s in any room at any width, with or without reduced motion. The slowest input event measured on a 4x throttled phone was 112 ms. Slop's service worker and intent prefetch make repeat visits feel near-instant.

The problems are mostly about the moments after an action, not about speed. Paluwagan, the product for the least confident users, has the weakest feedback loop: recording a payment gives no confirmation, focus drops to the page body after a reversal or approval, and its confirmation dialogs announce the wrong member's name to screen readers. The hub truncates three of four project names at every desktop width. PaperLab is fast and keyboard-complete but offers one lesson, which limits the "discovery and exploration" goal.

| Project | Critical | High | Medium | Low |
| --- | --- | --- | --- | --- |
| Hub (B-PF) | 0 | 1 | 3 | 2 |
| PaperLab (B-PL) | 0 | 0 | 2 | 3 |
| Slop Editorial (B-SE) | 0 | 0 | 1 | 3 |
| Online Paluwagan (B-OP) | 0 | 3 | 6 | 2 |
| Cross-cutting (B-X) | 0 | 0 | 3 | 1 |

## Performance baseline (local)

From `perf.json`. LCP and FCP in ms. KB is transfer size on a cold load.

| Page | Phone throttled LCP (cold) | LCP element | CLS | Long tasks (ms) | Requests | KB |
| --- | --- | --- | --- | --- | --- | --- |
| `/` | 1288 | door poster img | 0 | 262, 76, 131 | 16 | 289 |
| `/work/paperlab/` | 1064 | lede | 0 | 158, 59 | 10 | 210 |
| `/paperlab/` | 928 | lede | 0 | 68, 217 | 13 | 377 |
| `/paluwagan/` | 1112 | lead | 0 | 69, 143, 94, 101 | 10 | 386 |
| `/slop-editorial/` | 1228 (warm 504) | hero img | 0 | 135, 56 | 31 | 845 (warm 125) |
| `/slop-editorial/works/` | 3520 (warm 468) | work img | 0 | 124 | 24 | 744 (warm 125) |
| `/slop-editorial/releases/` | 880 | H1 | 0 | 114 | 19 | 369 |

Desktop unthrottled LCP was 36 to 156 ms everywhere. JS gzip sizes (local `gzip -9`): Paluwagan single bundle 67.0 KB, PaperLab main 8.6 KB plus transformer 46.9 KB, Slop feed page script 67.6 KB (feed route only). Live: the handover reports LCP, CLS and INP inside DIRECTION section 8 budgets on all five sites for iPhone 13 and Pixel 7 profiles, and Slop home LCP fixed from 3.6 s to about 1.6 s.

## Personal Portfolio (hub)

### B-PF-01 · High · OBSERVED · Three of four project names are truncated on desktop
- Condition: the three small doors under the PaperLab door clip their names with an ellipsis at 1024, 1280 and 1440. At 1024 "Living Mindmap" has 0 px of visible width. At 1440 it shows "Li...".
- Evidence: `j6.mjs` output. Name scrollWidth / clientWidth: 1024 px: Living Mindmap 127/0, Slop Editorial 104/66, Online Paluwagan 144/66. 1440 px: 127/31, 104/103, 144/103. Screenshots `shots/v-1024-no-preference-_.png`, `shots/full-light-1440-_.png` ("Li...", "Slop Editor...", "Online Pal...").
- Why it matters: the doors are the hub's primary navigation and the first thing a reviewer reads. A name that cannot be read is a door that cannot be chosen with confidence. The status chip ("Recorded demo", "Live") is taking the width the name needs.
- Affected: every desktop and laptop visitor, the hiring-manager journey.
- Principle: recognition over recall, readable labels (interface.md: "keep labels explicit"). DIRECTION 5.3 specifies name 17/600 in these doors.
- Opportunity: put the chip on its own line or over the poster so the name owns the row, and add a long-name case to the 1440 and 1024 screenshot checks.

### B-PF-02 · Medium · OBSERVED · The Work section is the dense text the owner wants to avoid
- Condition: each of the four receipts shows Proves, Problem, What I built, Result, Try this and a "How it is checked" list with up to five test commands. The foyer is 4151 px at 390 (4.9 screens) against the 3800 px target in DIRECTION 5.1. The handover records 4207 px live.
- Evidence: `probes.json` key `light-390-/` layout.pageHeight 4151. Screenshot `shots/full-light-1440-_.png`.
- Why it matters: the evidence is the brand, but showing every command at once reads like a spec sheet. It is McMaster's density without McMaster's scanning aids.
- Affected: first-time visitors on phones, non-engineering reviewers.
- Principle: progressive disclosure (interface.md), owner goal of minimal on-screen text.
- Opportunity: keep the one headline figure per project visible and move the command list into the existing `house-drawer`.

### B-PF-03 · Medium · OBSERVED (local) and live pass · Door to room is the slowest step a visitor takes
- Condition: on a throttled phone, tapping the PaperLab door took 2301 ms until `#room-hero` existed in the room (local, cold, no HTTP cache). On desktop the cross-document view transition was active right after navigation and finished after about 451 ms. Back to the hub took 496 ms, restored scroll (scrollY 192) and returned focus to the door.
- Evidence: `journeys.log` lines "door->room hero visible ms 2301", "back to hub ms 496 scrollY 192", "focus after back: door door-feature". `j5.mjs` "VT ended after ~ 451 ms". Speculation Rules on the hub: `{"prefetch":[{"where":{"selector_matches":"a[data-room]"},"eagerness":"moderate"}]}`.
- Why it matters: the doorway is the signature and must never feel like a wait. On touch, `moderate` eagerness gives little lead time, so a cold room fetch happens after the tap. The local number is an upper bound because the local server has no cache, and the live gate says LCP is inside budget, so this is a perceived-latency risk, not a measured budget miss.
- Affected: first visit from the hub to any room on phones.
- Principle: performance.md "known adjacent views for touch", measurement.md warm navigation target.
- Opportunity: measure tap-to-useful-room on the live host with a warm and cold HTTP cache, and consider viewport-based prefetch for the single most likely door (PaperLab) on touch.

### B-PF-04 · Medium · HYPOTHESIS · The 600 ms clip reveal may swallow early taps
- Condition: during a cross-document view transition the page is covered by the transition pseudo-elements. DIRECTION 4.5 sets the enter reveal at 600 ms on `--h-spring-smooth`.
- Evidence: transition measured active right after navigation in `j5.mjs`. Whether input is delivered to the new page during those frames was not measured.
- Why it matters: motion must never add friction. A visitor who taps the sentence field in PaperLab during the reveal could lose that tap.
- Principle: motion.md "an animation never locks input".
- Opportunity: test a tap and a keypress at 100, 300 and 500 ms after navigation in Chromium and WebKit on the live host.

### B-PF-05 · Low · OBSERVED (live) · Chromium reports layout shift during room-to-room transitions
- Condition and evidence: handover "Known follow-ups": CLS 0.12 to 0.31 in Chromium during room-to-room view transitions, 0 in WebKit and Firefox. Not reproduced here.
- Principle: no visual jumps during continuity moments.
- Opportunity: confirm whether it is the snapshot or a real shift before treating it as a defect.

### B-PF-06 · Low · OBSERVED · Two primaries on the first phone screen go to the same place
- Condition: the PaperLab door and the "Open PaperLab" capsule both open PaperLab. `probe-heuristics` flags 2 competing primaries.
- Evidence: `probes.json` `light-390-/` fitts.competingPrimaries count 2 (door 358 x 112 at 444 px from the thumb, capsule 160 x 44 at 191 px).
- Why it matters: small, but each duplicate costs first-screen space that the other three projects could use.
- Opportunity: keep the capsule for thumb reach or the door for the poster, not both on the same screen at 390.

### Hub strengths to preserve
- First screen at 390 has 10 interactive targets (Hick index 3.46) and every target is 44 px or larger.
- Keyboard: 5 Tab presses reach the first door. The Menu popover closes on Esc and returns focus to the Menu button.
- Back restores scroll and focus to the door (live gate confirms 20 of 20 in Chromium).
- Calm mode and reduced motion leave a complete page. Nothing runs after 6.5 s.

## PaperLab

### B-PL-01 · Medium · OBSERVED · One lesson limits discovery and exploration
- Condition: the room has one interactive lesson (Attention). The Menu lists "Attention" and "First version". Math and tests exist for four more labs in `src/labs/boundary`, `line`, `memory`, `net`, and the case page says "99 of 99 Kernels for later labs, not shown in this room", but none of them has a route or UI.
- Evidence: `paperlab/dist/index.html` menu markup, `find src -name "*.ts*"` listing, screenshot `shots/full-light-1440-_.png` (receipt text).
- Why it matters: the owner goal for PaperLab is visual-first learning with easy discovery. With one lesson there is nothing to discover after the first visit, and the next-best action is to leave.
- Affected: learners and returning visitors.
- Principle: owner goal, DIRECTION principle 6 ("finished or absent"), which correctly keeps unfinished labs hidden.
- Opportunity: plan the lesson index as an IA question now (how a learner sees what exists, what is next, and where they left off), even before more labs ship.

### B-PL-02 · Medium · OBSERVED · Two live regions speak on every keystroke
- Condition: `.read` and `.computed` both carry `role="status"` and change on every input event while the visitor types. The house toast region is a third live region.
- Evidence: `journeys.log` "live regions: read: 'by' reads 'bank' most. / computed: Without the causal mask, ..." after typing. Source `paperlab/src/attention/App.tsx` (`<p className="read" role="status">`, `<p className="computed" role="status">`).
- Why it matters: a screen reader user hears a stream of partial results for each letter, which buries what they typed. WCAG 4.1.3 asks for status messages, not a running commentary.
- Affected: screen reader users typing a sentence.
- Principle: accessibility-review (status messages), interface.md "keep status understandable".
- Opportunity: announce after typing settles, or only on discrete actions (head, switch, word).

### B-PL-03 · Low · OBSERVED · The head rail is tight at 390
- Condition: the "3 Punctuation" chip's text runs to its right edge at 390. The second preset chip is clipped by the screen edge (a scroll affordance, acceptable).
- Evidence: `shots/j-pl-typed.png`.
- Opportunity: allow the rail to wrap to two rows or shorten the label at narrow widths.

### B-PL-04 · Low · OBSERVED · The transformer chunk loads before the first interaction
- Condition: `transformer-*.js` (142 KB, 46.9 KB gz) is `modulepreload`ed on first paint. LCP is unaffected (928 ms phone throttled, the static lede), with one 217 ms long task after load.
- Evidence: `perf.json` `/paperlab/` phone cold, `paperlab/dist/index.html`.
- Why it matters: little today. It becomes a cost when more labs share the shell.
- Opportunity: keep the static shell pattern and split per lab when labs arrive.

### B-PL-05 · Low · HYPOTHESIS · A scrub gesture would suit the sentence
- Condition: a word is selected by tapping it (61 x 49 px targets). There is no way to sweep across words and watch attention move.
- Why it matters: direct manipulation is where PaperLab could feel native. A pointer scrub across the words, with tap and arrow keys kept, would make the comparison continuous.
- Principle: motion.md gestures with keyboard and button equivalents.
- Opportunity: prototype and test with touch-action limited to the sentence region so page scroll still works.

### PaperLab strengths to preserve
- Input is fast on a 4x throttled phone: typing max event 56 ms, head switch 16 ms, three switch taps max 88 ms (`journeys.log`).
- State lives in the URL by `replaceState` (`?q=...&head=2&off=position%2Cscaling&mask=on`), so a broken state can be shared and Back is not polluted.
- The head rail is a real radiogroup with roving tabindex and arrow, Home and End keys.
- "Show the numbers" mounts its tables only when opened (187 ms to open throttled).
- The truth label is in the static shell, so it is visible before React mounts.

## Slop Editorial

### B-SE-01 · Medium · OBSERVED (local) · The works index is the slowest cold page in the audit
- Condition: `/slop-editorial/works/` has an LCP of 3520 ms on a throttled phone on a cold load (744 KB, 24 requests). Warm, through the service worker, it is 468 ms.
- Evidence: `perf.json`. The handover fixed home LCP (3.6 s to about 1.6 s live) but does not mention the works index.
- Why it matters: the works index is the main browsing surface of a publication. The first visit from a link lands on the slowest page.
- Affected: first-time visitors on mobile data.
- Principle: measurement.md cold-load budget per route.
- Opportunity: apply the home-page fix (sized, prioritised first image, smaller phone source) to the works index and confirm on the live host.

### B-SE-02 · Low · OBSERVED · The parody cookie banner returns on every client navigation
- Condition: the banner is 131 px and fixed at the bottom on 390. After "Accept all" it was still showing 600 ms later. It returns after a ClientRouter navigation and goes only after a reload.
- Evidence: `j6.mjs` "banner works 131px fixed", "after accept 131px fixed", "after reload 0px fixed". Screenshot `shots/j-se-works.png`.
- Why it matters: the joke lands once. On a phone it then covers about 15 percent of the screen on the browsing page. If persistence is intended as satire, it still costs reading space.
- Principle: content first, no blocking chrome.
- Opportunity: confirm intent with the owner. If unintended, dismiss on first press for the session.

### B-SE-03 · Low · OBSERVED · One small standalone link on Releases
- Condition: "Approval queue" is a 109 x 17 px link in a mono paragraph.
- Evidence: `probes.json` `light-390-/slop-editorial/releases/` tapTargets.
- Principle: WCAG 2.5.8 target size (24 px minimum unless spaced or inline).
- Opportunity: give it the 44 px capsule treatment used elsewhere.

### B-SE-04 · Low · HYPOTHESIS · Architecture notes for video, games and long-form
- The service worker skips range requests, which is right for future video. Video files would still enter `swr` caching under `img/` style rules if served from a matching path, so a byte budget and eviction rule is needed first (cache-policy.md: "bound entries and bytes").
- Games will need their own input handling. ClientRouter swaps the body, so a game route should own its lifecycle (pause on `astro:before-swap`, release pointer capture) or opt out of ClientRouter with `data-astro-reload`.
- Long-form needs reading progress and restored position. Back already restored scrollY 1806 on the works index, which is a good base.

### Slop strengths to preserve
- Repeat visits are near-instant: home warm 125 KB and FCP 504 ms against 845 KB and 888 ms cold (throttled phone).
- In-room navigation is quick: home to works 537 ms, works to a work 234 ms, Back 409 ms with scroll restored (throttled, `j3.mjs`).
- Its own intent prefetch (`src/scripts/intent.ts`, including `touchstart`) is the only touch-aware prefetch in the portfolio.
- The service worker returns early outside `/slop-editorial/` and never caches `evidence.json`, matching DIRECTION 4.6.
- Work pages have Previous, Index and Next, so browsing never dead-ends.

## Online Paluwagan

### B-OP-01 · High · OBSERVED · "Record a payment" lands above the form, not on it
- Condition: the primary button opens `#/g/demo-weekly/ledger` at scrollY 0 with focus on the page body. The form sits below the contributions table. The ledger page is 12.9 screens tall at 390 with 76 interactive elements.
- Evidence: `journeys.log` "record a payment -> /paluwagan/#/g/demo-weekly/ledger scrollY 0 focus BODY". `probes.json` `light-390-/paluwagan/#/g/demo-weekly/ledger` screensOfScroll 12.9, interactiveTotal 76. Screenshot `shots/j-op-record-landing.png`.
- Why it matters: a user in their 60s presses "Record a payment" and sees a table, not a form. They have to know to scroll past it. The label promised an action and delivered a page.
- Affected: the treasurer, the most frequent and most important journey.
- Principle: owner goal (explicit, predictable money actions), interface.md "put context close to the dominant action".
- Opportunity: send the button straight to the form (its own route or the form first), with the member pre-selected when it comes from a row.

### B-OP-02 · High · OBSERVED · Recording a payment gives no confirmation
- Condition: after "Add ledger entry" the ledger gains a row (25 to 26) but nothing says so. No status message appears, focus stays on the button, and the new row is far below in the entry table. The arrears form, by contrast, shows "Recorded ₱... from ... for cycle ...".
- Evidence: `journeys.log` "ledger rows 25 -> 26 statuses: [ '' ]", "focus Add ledger entry". Source `paluwagan/src/ui/LedgerTab.tsx` (`submit` sets only `error`, `submitArrears` sets `arrDone`). Screenshot `shots/j-op-after-record.png`.
- Why it matters: a money write with no visible result invites a second press. The app refuses the duplicate ("This cycle already has a payment. Reverse it first to correct it."), so the user who doubts gets an error instead of reassurance.
- Affected: every treasurer, worst for non-tech-confident users and screen reader users (nothing is announced).
- Principle: Gorges correctness ("confirm success", "never a false or silent state"), WCAG 4.1.3 status messages.
- Opportunity: reuse the arrears success pattern, with member, amount and cycle in words, announced by `role="status"`.

### B-OP-03 · High · OBSERVED · Confirmation dialogs can announce the wrong member
- Condition: every `ConfirmDialog` uses `aria-labelledby="confirm-h"` and renders `<h2 id="confirm-h">`. The Risk tab renders 4 dialogs, so there are 4 elements with that id. The browser resolves the label to the first one.
- Evidence: `j4.mjs`: the dialog opened from Noel Villanueva's card shows "Approve this reminder to Noel Villanueva?" but its accessible name is "Approve this reminder to Joel Bautista?". Source `paluwagan/src/ui/shared.tsx` (`ConfirmDialog`). The payout dialog in `LedgerTab.tsx` uses the same id.
- Why it matters: a screen reader user hears that they are approving a reminder to the wrong person, at the exact moment the app asks them to confirm. In a money product that is a trust failure.
- Affected: screen reader users approving reminders or releasing a short pot.
- Principle: WCAG 4.1.2 name, role, value and 1.3.1, interface.md "dialogs need an accessible name".
- Opportunity: give each dialog a unique heading id (React `useId`).

### B-OP-04 · Medium · OBSERVED · Focus drops to the page after reversing or approving
- Condition: after "Add reversing entry" and after "Approve reminder", the control that had focus is removed and focus lands on `<body>`.
- Evidence: `journeys.log` "after reverse rows 27 focus BODY", `journeys2.log` "after approve: Draft 3 / Approved 1 ... focus BODY".
- Why it matters: a keyboard or screen reader user is sent back to the top of the page with no sign of what happened. They must search for the result.
- Principle: WCAG 2.4.3 focus order, interface.md "restore the user's place".
- Opportunity: move focus to the new entry or to a status line that states the result.

### B-OP-05 · Medium · OBSERVED · A stale error stays on screen after the situation changes
- Condition: the form error "This cycle already has a payment. Reverse it first to correct it." stays visible while the user goes to the entry list and reverses that very payment. Two `role="alert"` messages showed at once.
- Evidence: `journeys.log` "reverse without reason: [ 'This cycle already has a payment...', 'A reason is required for a reversal.' ]". Source: the form error clears only when form fields change (`useEffect` on cycle, member, status, amount, date).
- Why it matters: after the reversal the first error is false. Users who read top to bottom see the app contradict itself.
- Principle: correctness.md (no false states), Nielsen "visibility of system status".
- Opportunity: clear form errors when the ledger changes.

### B-OP-06 · Medium · OBSERVED · Reversal, the strongest money action, has the lightest confirmation
- Condition: a reversal is committed by "Add reversing entry" after typing a reason, with no summary of member, amount and cycle. A short payout and a reminder approval both get a modal dialog that states the amounts.
- Evidence: `LedgerTab.tsx` (`doReverse` called directly), `shots/j-op-after-reverse.png`.
- Why it matters: the consequence model is inconsistent. The rarer, more serious action asks less of the user than a reminder draft.
- Principle: owner goal (unambiguous amounts and confirmations), DIRECTION "explicit over clever for money".
- Opportunity: one confirmation pattern for every money write, stating member, amount, cycle and how to undo.

### B-OP-07 · Medium · OBSERVED · "Edit entry" is a button that always refuses
- Condition: every active entry has "Edit entry". Pressing it shows "Entries cannot be edited. Write a reversal."
- Evidence: `journeys.log` "edit refusal: Entries cannot be edited. Write a reversal."
- Why it matters: it teaches the append-only rule to a developer, but to a 60-year-old treasurer a button that never works reads as a broken app. It also doubles the buttons in each row on a 12.9-screen page.
- Principle: interface.md "keep consequence labels explicit", one obvious action per row.
- Opportunity: show the rule as text beside "Write a reversal", or keep the refusal only inside the "Forge a line" toy where it is the point.

### B-OP-08 · Medium · OBSERVED · The tablet layout is a widened phone
- Condition: at 820 x 1180 the overview is one column. The donut sits alone on the left with empty space to its right, and the passbook rows stretch to 756 px.
- Evidence: `shots/v-820-no-preference-_paluwagan_.png`.
- Why it matters: shared family tablets are a likely device for this audience. The layout is scaled, not conceived for the device.
- Principle: owner goal (responsiveness conceived per device class).
- Opportunity: a two-column tablet layout with the summary and actions beside the passbook.

### B-OP-09 · Medium · HYPOTHESIS · In-app Back always lands at the top
- Condition: `App.tsx` calls `window.scrollTo(0, 0)` on every hash route change after the first, which includes Back and Forward.
- Evidence: `paluwagan/src/ui/App.tsx` (the `firstRoute` effect). Behaviour inferred from code, not driven here.
- Why it matters: a user who opens a group from the list and presses Back loses their place in the list.
- Principle: performance.md "restore list scroll and item context".
- Opportunity: reset scroll on forward navigation only and restore it on `popstate`.

### B-OP-10 · Low · OBSERVED · Small standalone link to the full ledger
- Condition: "See all 25 lines in the ledger" is 181 x 17 px and not inside running text.
- Evidence: `probes.json` `light-390-/paluwagan/` tapTargets.
- Principle: WCAG 2.5.8, owner goal of large targets.
- Opportunity: make it a 44 px button below the passbook.

### B-OP-11 · Low · OBSERVED · The amount field and the amounts on screen use different formats
- Condition: the field label is "Amount in PHP" with the value "1000.00". Everywhere else money reads "₱1,000.00". No helper text on 6 of 6 ledger fields.
- Evidence: `shots/j-op-after-record.png`, `probes.json` microcopy withoutHelperText 6.
- Why it matters: small, but money input should look like the money it records.
- Opportunity: a ₱ prefix in the field and grouping on blur.

### Paluwagan strengths to preserve
- The first screen is clear: truth chip, group name, pot total in large type, two labelled actions, tabs (8 targets, Hick 3.17).
- The form states consequences before commit ("will owe ... in arrears, and the payout ... will be short").
- Duplicate payments are refused with a plain reason. Reversal requires a reason.
- Native `<dialog>` with real focus trap and return (once ids are fixed).
- Badges always pair a dot with text. Money is tabular Inter.
- "Check the books" responds in one press (max event 56 ms throttled) and explains its three-way check in plain words.
- No gestures are used for money actions, which matches the owner goal.

## Cross-cutting

### B-X-01 · Medium · HYPOTHESIS · Hosting caps the cache policy
- Condition: GitHub Pages ignores `_headers` (Slop's file says so). Pages is generally reported to serve every file with a short `max-age` (about 10 minutes) and an ETag. If so, Vite and Astro hashed assets cannot be cached as immutable, and a repeat visit after that window revalidates every asset at 150 ms RTT. Only Slop hides this with a service worker.
- Evidence: `slop-editorial/site/dist/_headers` comment. Headers could not be fetched from this sandbox.
- Principle: cache-policy.md "fingerprinted static assets: long-lived public caching".
- Opportunity: record the live headers once with `curl -I` and decide per room whether a scoped service worker (Slop's pattern) is worth its stale-client cost.

### B-X-02 · Medium · OBSERVED · Slop downloads fonts the house already serves
- Condition: on Slop home the browser loads house Fraunces and house JetBrains Mono 400, plus Slop's own copies of Inter (`_astro/inter-latin-wght-normal.Dx4kXJAl.woff2`, the same 48,256 bytes as the house file) and JetBrains Mono 400 and 500. JetBrains Mono 400 is fetched twice on one page.
- Evidence: `perf.json` fonts list for `/slop-editorial/`, file sizes in `slop-editorial/site/dist/_astro/`.
- Why it matters: DIRECTION 4.2 promises one cached copy of house fonts for all sites. About 90 KB of duplicate fonts load on a Slop first visit, even when the visitor came from the hub with the house fonts already cached.
- Principle: performance.md "prioritise essential fonts", house distribution rule.
- Opportunity: point Slop's Inter and JetBrains Mono at `/house/2.0.1/fonts/` and keep only Bricolage Grotesque local.

### B-X-03 · Medium · OBSERVED · Success feedback is not a shared pattern
- Condition: the house ships `house-toast` (`role="status"`, one at a time). The hub uses it for "Copied.". Paluwagan's arrears form uses an inline success line, its contribution form uses nothing, and reversal and approval move focus to the body. PaperLab and Slop have no write actions that need it.
- Evidence: B-OP-02 and B-OP-04, `/house/2.0.1/house.js`.
- Why it matters: the owner asked for coherent press, release, loading, success and error states. Today each form invents its own, and the money product has the gaps.
- Opportunity: define one success and one error pattern in the house and use it everywhere a write happens.

### B-X-04 · Low · OBSERVED · Prefetch exists only at the edges
- Condition: Speculation Rules appear only on the hub, for door links. Rooms have none, so room to room through Menu fetches on press. Slop has its own intent prefetch. The two SPAs route by hash, so in-room navigation is instant.
- Evidence: `perf.json` spec field, grep of each `dist/index.html`.
- Opportunity: decide one prefetch policy for cross-room links, taking care that Paluwagan never speculates a write.

### Cross-cutting strengths
- 0 contrast failures and 0 unnamed controls in 44 probe runs across light, dark, 390 and 1440.
- No horizontal overflow at 390, 820, 1024 and 1440 on any room home.
- No running animation after 6.5 s on any room, with or without reduced motion.
- One crumb, one menu, one footer, one focus style across all four sites.
- CLS 0 on every measured cold load.

## Cross-project UX comparison

| Convention | Hub | PaperLab | Slop | Paluwagan |
| --- | --- | --- | --- | --- |
| Navigation model | Static pages, cross-document view transitions | Single page, state in query string | Astro ClientRouter, multi-page | Hash routes, tabs |
| Back restores place | Yes (scroll and focus, live gated) | Not applicable (replaceState) | Yes (scrollY 1806 restored) | Code resets to top (B-OP-09) |
| Prefetch | Door links, moderate | None needed in room | Intent prefetch incl. touch | None |
| Repeat-visit cache | HTTP only | HTTP only | Service worker | HTTP only |
| Success feedback | Toast ("Copied.") | Live readout | Not applicable | Mixed, partly missing |
| Confirmation for consequences | Not applicable | Not applicable | Spend cap | Dialog for some, none for reversal |
| Direct manipulation | Hover glyph field | Tap word, switches | Browse, rate | None, by design |

Where they converge: the house layer gives every site the same crumb, menu, focus style, Calm mode and contrast floor, and that floor is solid. Where they diverge on purpose: PaperLab is an instrument, Slop a publication, Paluwagan a form-driven ledger, and those differences fit the owner's "four unmistakably different products". Where they diverge by accident: navigation memory (Back), prefetch, caching and success feedback are each solved per repo. Those are engineering standards, so they should converge.

## Uncertainties and validation needs

- No live-host measurement was possible. Every timing here is local. The handover's live gate covers LCP, CLS and INP budgets but not tap-to-useful-room or the works index.
- GitHub Pages cache headers were not observed (B-X-01).
- Input during the doorway transition was not tested (B-PF-04).
- Screen reader output was inferred from the accessibility tree in Chromium. No VoiceOver, TalkBack or NVDA run. The owner checklist already lists iOS Safari 26 with VoiceOver.
- No real devices, no WebKit or Firefox runs in this pass, no 200 percent zoom or large-text pass, which matters most for Paluwagan's older users.
- Paluwagan was not tested with real users. Findings about users in their 60s are heuristic and should be checked with three to five sessions with the target group, in Filipino and English.
- Slop's banner persistence (B-SE-02) may be intended satire.
- Local cold numbers are upper bounds because the local server sends no cache headers.
