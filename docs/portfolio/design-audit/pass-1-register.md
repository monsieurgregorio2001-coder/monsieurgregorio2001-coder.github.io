# Pass 1 register

Consolidation of [Agent A](02-agent-a-brand-audit.md) (brand, creative direction, anti-slop) and [Agent B](03-agent-b-ux-audit.md) (UI/UX, interaction, performance). 2026-10-29. No new findings. Severities are provisional until Garfield accepts them. Principles: [universal design principles](01-universal-design-principles.md). Comparison: [cross-project differentiation](04-cross-project-differentiation.md).

## (a) Finding register

Status "Open" unless noted. Merged rows cite both IDs.

### Cross-cutting

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-X-01 | DIRECTION.md principle 7 forbids the goal of distinct brands | Critical | OBSERVED | A | Open |
| A-X-02 | Shared developer chrome ends every room | High | OBSERVED | A | Open |
| A-X-03 | "Garfield Lim / Room" crumb makes each product a sub-page of a person | High | OBSERVED | A | Open |
| A-X-04 | The hub's "checkable" thesis is every product's positioning | High | OBSERVED | A | Open |
| A-X-05 | Process copy broken into one-line paragraphs | Low | OBSERVED | A | Open |
| B-X-01 | GitHub Pages cache headers may cap repeat-visit speed | Medium | HYPOTHESIS | B | Open |
| B-X-02 | Slop downloads fonts the house already serves (about 90 KB) | Medium | OBSERVED | B | Open |
| B-X-03 | Success feedback is not a shared pattern | Medium | OBSERVED | B | Open |
| B-X-04 | Prefetch policy exists only at the edges | Low | OBSERVED | B | Open |

### Personal Portfolio (hub)

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| B-PF-01 | Three of four door names truncated on desktop | High | OBSERVED | B | Resolved 2026-10-29, hub#24 |
| A-PF-04, B-PF-02 | Work section is a repeated dense label grid (4151 px at 390, target 3800) | High | OBSERVED | A, B | Open |
| A-PF-01 | Evidence shown as test-count tables, not engineering | High | OBSERVED | A | Open |
| A-PF-02 | Editorial-serif look, not developer or experimental | High | OBSERVED | A | Open |
| A-PF-03 | Thumbnails are miniature screenshots of the same house | High | OBSERVED | A | Open |
| A-PF-05 | "How I work" is three generic claims | Medium | OBSERVED | A | Open |
| A-PF-06 | Glyph field behind the H1 reads as texture | Medium | HYPOTHESIS | A | Open |
| A-PF-08 | Slogan cadence and portable lines in headings | Medium | OBSERVED | A | Open |
| B-PF-03 | Door to room is the slowest step (2301 ms local, cold) | Medium | OBSERVED (local) | B | Open |
| B-PF-04 | 600 ms clip reveal may swallow early taps | Medium | HYPOTHESIS | B | Open |
| A-PF-07 | Three link styles in the hero | Low | OBSERVED | A | Open |
| B-PF-05 | Chromium CLS 0.12 to 0.31 in room-to-room transitions | Low | OBSERVED (live, handover) | B | Open |
| B-PF-06 | Two primaries on the first phone screen go to PaperLab | Low | OBSERVED | B | Open |

A-PF-04 vs B-PF-02: A High, B Medium. Consolidated High because it is the hub's main content block and fails both the brand and the minimal-text principle.

### PaperLab

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-PL-01 | No brand of its own, a tool page inside the house shell | Critical | OBSERVED | A | Open |
| A-PL-02 | Not visually rich, one diagram, no illustration language | High | OBSERVED | A | Open |
| A-PL-03 | Planned Recursive face not shipped, house Inter in use | High | OBSERVED | A | Open |
| A-PL-04 | Sidebar of cards and toggles reads as SaaS settings | High | OBSERVED | A | Open |
| A-PL-08, B-PL-01 | One lesson only, nothing to discover | Medium | OBSERVED | A, B | Open |
| A-PL-05 | "How this was built" and ADR lists on the learning page | Medium | OBSERVED | A | Open |
| A-PL-06 | "Receipt: not measured yet" on the built page | Medium | HYPOTHESIS | A | Open |
| A-PL-07 | Coral accent does every job | Medium | OBSERVED | A | Open |
| B-PL-02 | Two live regions speak on every keystroke | Medium | OBSERVED | B | Open |
| A-PL-09 | First chip is a jargon disclaimer | Low | OBSERVED | A | Open |
| B-PL-03 | Head rail tight at 390 | Low | OBSERVED | B | Open |
| B-PL-04 | Transformer chunk preloaded before first interaction | Low | OBSERVED | B | Open |
| B-PL-05 | No scrub gesture across the sentence | Medium (raised in Pass 2, A and B agreed: the signature interaction) | HYPOTHESIS | B | Open |

### Slop Editorial

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-SE-01 | Sterile gallery frame, only the images carry the camp | High | OBSERVED | A | Open |
| A-SE-02 | Wordmark is a weight change, not a masthead | High | OBSERVED | A | Open |
| A-SE-03 | All images share one model look, no art direction | High | OBSERVED | A | Open |
| A-SE-04 | Weakest image leads as hero | High | OBSERVED | A | Open |
| A-SE-09, B-SE-04 | No layout or architecture for future video, games, long-form | Medium | HYPOTHESIS | A, B | Open |
| A-SE-05 | Release tracker styled as a product dashboard | Medium | OBSERVED | A | Open |
| A-SE-06 | Mono metadata block pushes the caption joke below the fold | Medium | OBSERVED | A | Open |
| A-SE-07 | Fake counters may read as dark pattern | Medium | HYPOTHESIS | A | Open |
| A-SE-10 | Tagline is stock AI cadence | Medium | OBSERVED | A | Open |
| B-SE-01 | Works index cold LCP 3520 ms throttled (local) | Medium | OBSERVED (local) | B | Open |
| A-SE-08 | Caps mono room toggles feel like a dev HUD | Low | OBSERVED | A | Open |
| B-SE-02 | Parody cookie banner returns on every client navigation | Low | OBSERVED | B | Open |
| B-SE-03 | "Approval queue" link 109 x 17 px | Low | OBSERVED | B | Open |

A-SE-09 vs B-SE-04: A Medium, B Low. Consolidated Medium because the system must be designed with these media in mind before it is rebuilt, or each becomes another skin.

### Online Paluwagan

| ID | Title | Severity | Kind | Source | Status |
| --- | --- | --- | --- | --- | --- |
| A-OP-01 | Brand is a portfolio demo, not a product users would trust | High | OBSERVED | A | Open |
| A-OP-03 | Demo and dev sections make a 7000 px phone page | High | OBSERVED | A | Open |
| B-OP-01 | "Record a payment" lands above the form, focus on body | High | OBSERVED | B | Open |
| B-OP-02 | Recording a payment gives no confirmation | High | OBSERVED | B | Open |
| B-OP-03 | Confirm dialogs share one id and announce the wrong member | High | OBSERVED | B | Open |
| A-OP-02 | Fraunces for group names and pot total feels literary | Medium | HYPOTHESIS (on user effect) | A | Open |
| A-OP-04 | Mixed language register | Medium | OBSERVED | A | Open |
| A-OP-05 | Jargon: "Check the books", "Forge a line", "Risk" tab | Medium | OBSERVED | A | Open |
| A-OP-06 | Donut is the only visual, no warmth or community cue | Medium | OBSERVED | A | Open |
| A-OP-08 | Receipt shows "not measured yet" four times | Medium | HYPOTHESIS | A | Open |
| B-OP-04 | Focus drops to body after reversing or approving | Medium | OBSERVED | B | Open |
| B-OP-05 | Stale error stays after the situation changes | Medium | OBSERVED | B | Open |
| B-OP-06 | Reversal has the lightest confirmation | Medium | OBSERVED | B | Open |
| B-OP-07 | "Edit entry" button always refuses | Medium | OBSERVED | B | Open |
| B-OP-08 | Tablet layout is a widened phone | Medium | OBSERVED | B | Open |
| B-OP-09 | In-app Back always lands at the top | Medium | HYPOTHESIS | B | Open |
| A-OP-07 | Status dot and word are small for the audience | Low | OBSERVED | A | Open |
| B-OP-10 | "See all 25 lines" link 181 x 17 px | Low | OBSERVED | B | Open |
| B-OP-11 | Amount field format differs from displayed money | Low | OBSERVED | B | Open |

A-OP-02 spot-check: `paluwagan/src/styles.css` sets `.display` (group name) and `.dial-pot` (pot total) in the house display face (Fraunces). Ledger and passbook amounts use the body face with tabular figures. So A and B are each right about different numbers.

### Counts after merging

| Project | Critical | High | Medium | Low | Total |
| --- | --- | --- | --- | --- | --- |
| Cross-cutting | 1 | 3 | 3 | 2 | 9 |
| Hub | 0 | 5 (1 resolved) | 5 | 3 | 13 |
| PaperLab | 1 | 3 | 5 | 4 | 13 |
| Slop Editorial | 0 | 4 | 6 | 3 | 13 |
| Paluwagan | 0 | 5 | 10 | 4 | 19 |
| Total | 2 | 20 | 29 | 16 | 67 |

70 source findings (A 40, B 30), 3 merged duplicates.

## (b) Strengths worth preserving

Cross-cutting: 0 contrast failures and 0 unnamed controls in 44 probe runs. No horizontal overflow at 390 to 1440. Nothing animates after 6.5 s. CLS 0 on cold loads. One focus style. Self-hosted fonts, no tracking, no AI-slop visual tropes. Honesty labels throughout.

Hub: the H1 "I build AI tools you can check." Plain first-person copy with no slop words. Honest labels ("Recorded demo"). Case pages at `/work/<room>/` (architecture diagram, "Chose X over Y because", "What this does not do"). First screen at 390 has 10 targets, all 44 px or larger. Back restores scroll and focus to the door. Menu closes on Esc and returns focus.

PaperLab: attention arcs over giant type. The callout "Without the scaling, 'sat' puts 97% of its attention on one word. With it, 79%." The invitation "Type a sentence. See what each word reads. Then break the math." No gamification. Fast input (max event 56 ms throttled). State in the URL by `replaceState`. Real radiogroup with roving tabindex. Tables mount only when opened. Truth label in the static shell.

Slop Editorial: the concepts (Tokenmaxxer, Certificate of Human Touch, Delve tapestry, "Certainly!") and the dry caption voice. The honesty footer. Near-instant repeat visits via service worker. Quick in-room navigation with scroll restored. Touch-aware intent prefetch. Service worker scoped and never caches `evidence.json`. Previous, Index, Next on every work.

Paluwagan: clear first screen with the demo truth chip up front, large pot, two labelled actions. "Passbook" metaphor. Peso sign and centavos always. Consequences stated before commit. Duplicates refused with a plain reason. Reversal needs a reason. Native `<dialog>` with focus trap. Badges pair dot with text. "Check the books" responds in one press. No gestures for money. Best product-like layout at 1024.

## (c) Uncertainties and validation needs

| Uncertainty | Findings | How to validate |
| --- | --- | --- |
| All timings are local, no live-host run for tap-to-room or works index | B-PF-03, B-SE-01 | Throttled phone runs on the live host, cold and warm HTTP cache |
| GitHub Pages cache headers unknown | B-X-01 | `curl -I` on hashed assets on the live host |
| Input during the doorway transition | B-PF-04 | Tap and keypress at 100, 300, 500 ms after navigation, Chromium and WebKit |
| Chromium transition CLS is snapshot or real shift | B-PF-05 | Trace a room-to-room transition with layout-shift attribution |
| Receipts "not measured yet" may be a local build artefact | A-PL-06, A-OP-08 | Load the live PaperLab and Paluwagan pages |
| Motion judged from static frames only | A-PF-06, motion row in 04 | Screen-record doorway, glyph field and Slop transitions |
| Screen reader output inferred from the Chromium tree | B-OP-03, B-PL-02 | VoiceOver on iOS Safari 26, TalkBack, NVDA |
| No real devices, WebKit, Firefox, 200 percent zoom or large text | Paluwagan findings | Device and zoom pass at 390 and 820 |
| Paluwagan audience effects (serif money, jargon, small status, register) | A-OP-02, A-OP-04, A-OP-05, A-OP-07, B-OP-07 | Three to five sessions with users in their 60s, in Filipino and English |
| Whether fake counters read as satire | A-SE-07 | A few unbriefed readers |
| Banner persistence intended or a bug | B-SE-02 | Ask the owner |
| Six-finger joke legible at 480 px | Imagery audit in 02 | Direct crop check |
| slop-patterns and uxkin MCP checks did not run | All A visual findings | Rerun `check_design` when the servers connect |
| Mindmap shares the house and is out of scope | A-X-01, B-X-02 | Include it in any house change review |

Not a finding: blank Works plates and case-page screens in full-page captures are a lazy-load capture artefact (A verified all nine images load).

## (d) Conflicts for Pass 2

1. Shared chrome. B counts "one crumb, one menu, one footer" as a cross-cutting strength. A counts the same elements as the core identity failure (A-X-01 to A-X-03). Pass 2 decides which chrome is infrastructure and which is identity.
2. Where shared patterns live. B-X-03 asks for one success and error pattern "in the house". A wants the house reduced to an engineering layer. Pass 2 decides whether shared behaviour may carry a shared look.
3. Paluwagan type. A says money is set in Fraunces (A-OP-02). B lists "money is tabular Inter" as a strength. Spot-check: pot total and group name are Fraunces, ledger amounts are Inter. Pass 2 decides the face for money.
4. Paluwagan status badges. A rates the 6 px dot and 13 px word as weak for the audience (A-OP-07). B lists "badges pair a dot with text" as a strength.
5. Hub Work section severity. A High (brand, identical cards), B Medium (density). Consolidated High here, Pass 2 confirms.
6. Future media severity. A Medium, B Low (A-SE-09, B-SE-04). Consolidated Medium here, Pass 2 confirms.
