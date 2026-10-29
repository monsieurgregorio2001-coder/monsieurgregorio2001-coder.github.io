# Agent A: brand identity, creative direction and anti-slop audit

Pass 1, audit only. Date 2026-10-29. Auditor: Claude (Agent A). Nothing here is approved. Garfield owns creative acceptance.

## Framework

All six skills were loaded with the Skill tool and applied as one framework. The slop-patterns and uxkin MCP servers failed to connect, so their rules were applied by hand.

- slop-patterns check-ui: the list of AI-default visual patterns (gradient headlines, badge above hero, identical feature cards, indigo-violet palettes). Used for the visual anti-slop read. `check_design` did not run, so a clean read is not a full design review. Credit: Slop Patterns by Precious Studio, sloppatterns.com.
- uxkin no-ui-slop: read the existing system first, one task per screen, a small palette with one accent, no grids of identical cards, no fake stats, specific copy, and a rendered check at phone and desktop width. It raised A-PF-04 to High and framed A-SE-07 and A-OP-03.
- slop-stopper final-review: `scripts/scan.py --channel web` was run on the visible text of five pages (`agent-a/copy-*.txt`). The hub came back clean. Slop hits ("Delve", "Tapestry", star ratings) are the satire itself and are not defects. Its rule that headings must name their content and its claim-integrity guardrail feed A-PF-08 and A-SE-07.
- unslop: three levels (word, rhythm, structure), plus the portability test, slogan cadence, negative parallelism and load-bearing metaphor rules. These surfaced A-PF-08, A-SE-10 and A-X-05.
- brand-studio brand-review: allowed variation versus drift, pass or fail only against stated authority. The owner's brief is the authority here, so verdicts are provisional until Garfield accepts them.
- brand-studio brand-strategy, read only: positioning of each product, its promise, audience and difference. It surfaced A-X-04. No strategy was written.

Evidence base. All four sites were built from origin/main (hub c831674, paperlab 97496f6, slop-editorial ca11efd, paluwagan 51a11c3) with `HOUSE_DIR` set to the hub, then served together under their real paths with `/house/` from the hub. Screenshots at 390, 1024 and 1440, light and dark, live in `/tmp/claude-0/-home-user/64d8fb9e-1614-54db-87bf-29b299ef88b5/scratchpad/agent-a/shots/` (below: `shots/`). Script: `.../agent-a/shoot.mjs` and `vp.mjs`. All nine source images in `slop-editorial/incoming/` were viewed as a contact sheet (`shots/incoming-grid.jpg`).

## Summary

The four sites read as one website with four accent colours. That is by design: `docs/portfolio/design/DIRECTION.md` principle 7 says "One vocabulary. Type, colour, radii, and motion live once, in the house", and calls the house "quiet and identical everywhere". The owner's new goal reverses that principle. So the main finding is not a defect in execution. It is that the adopted direction and the new brief conflict, and the direction needs a superseding ADR before any redesign.

The house is good engineering. Tokens, contrast, reduced motion, fonts self-hosted, the honesty labels. It is the identity layer that flattens. Every room carries the same "Garfield Lim / Room" crumb in Fraunces, the same Email and Menu capsules, the same footer with "House 2.0.1, Colophon, llms.txt, Plain text", the same Calm motion toggle and the same "Live receipts" drawer. On three of the four sites the footer stack is the last thing a visitor sees. The only per-room difference set by the house is seven colour tokens (`house/2.0.1/tokens.css` lines 129 to 137).

Inside the rooms, quality is uneven. Paluwagan is closest to its brief. PaperLab has one strong idea (the attention arcs) inside a generic app shell. Slop Editorial has the best raw material of the four, real satirical wit in the images, but its page frame is a neutral house gallery that does not look camp, theatrical or fashion-editorial. The hub is credible and specific, but it shows evidence as tables of test counts rather than as engineering you can see.

Finding count: 40 (Critical 2, High 16, Medium 17, Low 5). Breakdown in the final section.

## Cross-cutting finding

**A-X-01. The adopted direction forbids the goal.** OBSERVED. Critical.
- Condition: DIRECTION.md principle 7 and section 3 put type, colour, radii and motion in one house layer, with room faces limited to Recursive (PaperLab, not yet shipped, ADR 0010 pending) and Bricolage (Slop). Paluwagan and Mindmap use house faces only.
- Why: four distinct brands cannot exist while chrome, type ramp, radii and motion are shared by rule. Any redesign done under this direction would be another skin.
- Evidence: `docs/portfolio/design/DIRECTION.md` sections 2 and 3.1, `house/2.0.1/tokens.css`, `house/2.0.1/house.css`. Screenshots `shots/pf-1440-light.png`, `pl-1440-light.png`, `se-1440-dark.png`, `op-390-light.png` share header, footer and controls pixel for pixel.
- Affects: every visitor and every future design task.
- Principle: brand distinctiveness. Deliberate variation versus drift (brand-review).
- Opportunity: a portfolio ADR that splits the house into an engineering layer (fonts loader, a11y primitives, reduced-motion contract, receipts data, focus rules, build checks) and lets each product own its type, colour, shape, motion character and chrome. Keep one thin, consistent "by Garfield Lim" return link as the only shared visible element.

**A-X-02. Shared chrome dominates the end of every room.** OBSERVED. High.
- Condition: footer links "House 2.0.1, Colophon, llms.txt, Plain text", Calm motion switch, Live receipts drawer and "Measured in your browser. Nothing is stored or sent." appear identically on all four.
- Why: the last impression of a satire magazine, a learning lab and a savings app is a developer colophon. For Paluwagan's older users "llms.txt" and "House 2.0.1" are noise.
- Evidence: bottom of `shots/pl-1440-light.png`, `se-1440-dark.png`, `op-390-light.png`.
- Opportunity: keep the receipts and motion controls, but restyle and reword them per product, or move developer links behind the hub only.

**A-X-03. The crumb makes every product a sub-page of a person.** OBSERVED. High.
- Condition: "Garfield Lim / PaperLab" in Fraunces leads each room. The product name is set smaller, in Inter.
- Why: the owner wants independent products. The crumb tells the visitor they are inside a portfolio, before the product says what it is.
- Evidence: top of every room screenshot.
- Opportunity: each product leads with its own wordmark. Authorship moves to a small, consistent credit.

**A-X-04. The hub's thesis has become every product's positioning.** OBSERVED. High.
- Condition: each room carries a receipt block, a "How this was built" block, the Live receipts drawer and an evidence footer. The hub's promise ("I build AI tools you can check") is the reason each room exists.
- Why: through the brand-strategy lens, a learning lab promises curiosity, a satire magazine promises wit, and a savings app promises safety. "Checkable engineering" is the portfolio's promise, not theirs. While it is the first and last thing in every room, each product is positioned as evidence for a person.
- Evidence: `shots/pl-1440-light.png`, `op-1024-light.png`, `se-1440-dark.png`, `sew-1440-light.png`.
- Opportunity: give each product its own promise and audience. Keep the proof on the hub case pages (`/work/<room>/`), which already do this well (`shots/pfc-1024-dark.png`).

**A-X-05. Copy is broken into one-line paragraphs.** OBSERVED (scan), partly a UI artefact. Low.
- Condition: the slop-stopper scan counts 14 of 18 paragraphs on PaperLab and 32 of 45 on Paluwagan as single short lines. Many are labels, which are fine. The prose blocks ("How this was built" items) still read as staccato lists.
- Opportunity: when the process copy moves to the hub, write it as short connected paragraphs.

## 1. Personal Portfolio (hub)

Route `/`, case pages `/work/<room>/`. Screenshots `shots/pf-*.png`, `shots/pfc-*.png`.

| ID | Finding | Status | Severity |
| --- | --- | --- | --- |
| A-PF-01 | Evidence is shown as test-count tables, not as engineering | OBSERVED | High |
| A-PF-02 | The visual language is editorial-serif, not developer or experimental | OBSERVED | High |
| A-PF-03 | Project thumbnails are miniature screenshots of the same house | OBSERVED | High |
| A-PF-04 | Repeated label grid makes four projects look like one form | OBSERVED | High |
| A-PF-05 | "How I work" is three generic process claims | OBSERVED | Medium |
| A-PF-06 | The only motion signature is a faint glyph field behind the H1 | OBSERVED | Medium |
| A-PF-07 | Three link styles in the hero | OBSERVED | Low |
| A-PF-08 | Slogan cadence and portable lines in key headings | OBSERVED | Medium |

**A-PF-01.** Condition: the work section prints rows like "47 of 47 Designed heads equal the kernel..." with the command beneath, four times. Why: it proves tests ran, not that the work is sophisticated. A hiring engineer sees a scoreboard. The brief asks for "real evidence of engineering ability". Architecture, a hard bug, a trade-off, a diagram of the pipeline or the ledger invariant would say more. Evidence: `shots/pf-1440-light.png` "Four projects I built and tested". Users: recruiters, engineers. Principle: show sophistication, avoid empty claims (numbers without meaning are a soft form of it). Opportunity: one picked number per project, and a visible technical artefact (system diagram, code excerpt, a live trace) behind progressive disclosure.

**A-PF-02.** Condition: Fraunces display at 88 px on warm paper `#FAF8F4`, black pill buttons. Why: it reads as a tasteful writer's or designer's site. It is not wrong, and it avoids every AI slop trope (no purple gradient, no neural net, no fake terminal). But it does not say "contemporary, experimental, developer-oriented". Evidence: hero in `pf-1440-light.png`, tokens `house/2.0.1/tokens.css`. Opportunity: a face and layout that carry engineering character (a grotesk or mono-forward system, a grid with visible structure), with one experimental interaction that earns its place.

**A-PF-03.** Condition: the hero and work section use small screenshots of each room, which all show the same crumb and capsules. Why: thumbnails cannot differentiate the projects because the projects look the same. The PaperLab thumbnail even renders in dark mode while the page is light. Evidence: `pf-1440-light.png` hero cards. Opportunity: once rooms are distinct, use a cropped signature moment from each (the arcs, a ledger catch, a gallery plate), not a full page.

**A-PF-04.** Condition: each card uses the same Proves, Problem, What I built, Result, Try this, How it is checked grid. Why: good for scanning, bad for story. Four different products are flattened into identical forms. uxkin lists grids of identical cards as a default to avoid, which is why this moved from Medium to High. Opportunity: keep the facts, vary the presentation per project.

**A-PF-05.** Condition: "Spec first. Measure everything. Humans approve what matters." Why: these are true but generic. Every senior engineer site says them. Opportunity: replace with one concrete example per claim, or cut.

**A-PF-06.** Condition: a faint mono glyph field sits behind the H1. HYPOTHESIS on intent (only one static frame inspected). Why: at screenshot weight it reads as texture, close to the "meaningless code background" trope the owner wants avoided. Opportunity: either make it carry information or remove it.

**A-PF-08.** Condition: the about H2 "Agents that earn their place in real work." (`index.html` line 205) is a load-bearing metaphor that fails the portability test. It would fit any AI agency site. "How I work" is three two-beat slogans, which meets unslop's threshold of three per document. Door proof "Generation is cheap. Spend is capped." copies the shape of Slop's tagline. Why: the H1 earns trust with a checkable claim, and these lines spend it on cadence. Opportunity: name the actual claim (what the agents did, for whom). OBSERVED.

**A-PF-07.** Pill buttons, underlined text links and blue links sit side by side in the hero ("Open PaperLab", "Email me", "Copy address", LinkedIn, GitHub). Small, but it weakens polish.

Responsive note: at 1024 the case pages (`shots/pfc-1024-dark.png`) are the hub's best work. An Architecture diagram, Decisions written as "Chose X over Y because", and "What this does not do". That is the evidence A-PF-01 asks the home page to show. OBSERVED.

Strengths to keep: the H1 "I build AI tools you can check." is specific and ownable. Copy is plain, first person, free of slop words. Labels like "Recorded demo" and "No evals. Nothing here is model output to score." are honest and memorable. No AI gradients, no stock illustrations. The About section states facts without inflation.

## 2. PaperLabs (paperlab)

Route `/paperlab/`. Screenshots `shots/pl-*.png`.

| ID | Finding | Status | Severity |
| --- | --- | --- | --- |
| A-PL-01 | No brand of its own: a tool page inside the house shell | OBSERVED | Critical |
| A-PL-02 | Not visually rich: one diagram, no illustration, no exploration map | OBSERVED | High |
| A-PL-03 | The face is house Inter, the planned Recursive is not shipped | OBSERVED | High |
| A-PL-04 | Sidebar of stacked cards and toggles reads as SaaS settings | OBSERVED | High |
| A-PL-05 | "How this was built" and ADR lists sit on the learning page | OBSERVED | Medium |
| A-PL-06 | "Receipt: not measured yet" in a dev-like state | OBSERVED | Medium |
| A-PL-07 | The coral accent is a single hue doing every job | OBSERVED | Medium |
| A-PL-08 | One lesson only, so "easy discovery" has nothing to discover | OBSERVED | Medium |
| A-PL-09 | Label "Real math · Designed heads · Toy size" opens on jargon | OBSERVED | Low |

**A-PL-01.** Condition: the page is the house crumb, an H1 "Attention", and a form. There is no PaperLabs wordmark, no promise of what the lab is, no sense of a place for learning. Why: the brief wants "I want to explore and learn something here". The first screen says "here is a widget". Evidence: `pl-1440-light.png`, `pl-390-dark-fold.png`. Users: curious learners, the hub's reviewers. Opportunity: a PaperLabs identity (name, mark, a home that shows the papers as explorable objects) before any single lab.

**A-PL-02.** Condition: the attention arcs over large words are the one visual idea, and they are good. Everything else is form controls and text. Why: "diagrams, illustrations, interactive explanations" is the core of the territory. Opportunity: an illustration language (drawn diagrams, annotated figures from the paper), used to explain, not decorate.

**A-PL-03.** Condition: ADR 0010 proposes Recursive, the room "uses the house Inter for now" (stated on the page). Why: the planned face was the one route to typographic identity and it has not landed. Evidence: PaperLab page text in `pl-1440-light.png`, DIRECTION.md 3.1.

**A-PL-04.** Condition: "Head" choice cards and "Break the math" switches stack in a right column with bordered rounded tiles. Why: it echoes settings panels, the LMS and SaaS look the owner wants avoided. Opportunity: make the controls part of the diagram (heads as lenses on the sentence, switches as physical knobs on the formula).

**A-PL-05.** Condition: three columns "What AI did, What I decided, What I rejected" plus a dashed box of proposed ADRs. Why: valuable for the portfolio case, wrong voice for a learner. It turns the lab back into a portfolio exhibit. Opportunity: move to the hub case page, keep a one-line link.

**A-PL-06.** Condition: "not measured yet. The receipt is written by the build, so it is missing in a dev server." appears on the built page. HYPOTHESIS on cause: the local static serve may not have the receipt the CI build writes. Validate on the live site. If it shows live, it is a credibility break.

**A-PL-07.** Coral `#E14C33` marks the selected head, the switches, the callout, links and labels. With one hue doing every job, the diagram's own emphasis is diluted.

**A-PL-08.** Only one lab is reachable. The ladder is deferred (ADR 0008 proposed). Discovery as a brand trait cannot be judged yet.

**A-PL-09.** The first chip a learner reads is a disclaimer in jargon. Honest labelling is required, but "Toy size" before any welcome is cold for an education brand.

Strengths to keep: the arcs over giant type are original and teach at a glance. The callout "Without the scaling, 'sat' puts 97% of its attention on one word. With it, 79%." is a great piece of learning copy. "Type a sentence. See what each word reads. Then break the math." is a clear invitation. No gamification, no childish visuals.

## 3. Slop Editorial

Routes `/slop-editorial/`, `/slop-editorial/works/`. Screenshots `shots/se-*.png`, `shots/sew-*.png`.

| ID | Finding | Status | Severity |
| --- | --- | --- | --- |
| A-SE-01 | The frame is sterile gallery minimalism, the images carry all the camp | OBSERVED | High |
| A-SE-02 | Wordmark is a weight change in Bricolage, not an editorial masthead | OBSERVED | High |
| A-SE-03 | Every image shares one model "look", so the issue has no art direction | OBSERVED | High |
| A-SE-04 | The hero still is the weakest image and it leads | OBSERVED | High |
| A-SE-05 | Release tracker and footer read as a product dashboard | OBSERVED | Medium |
| A-SE-06 | Mono metadata block is clever but competes with the joke | OBSERVED | Medium |
| A-SE-07 | Fake counters can read as dark pattern, not satire | HYPOTHESIS | Medium |
| A-SE-08 | Room toggles in caps mono feel like a dev HUD | OBSERVED | Low |
| A-SE-09 | Future video, games and long-form have no layout language yet | HYPOTHESIS | Medium |
| A-SE-10 | Tagline "Generation is cheap. Taste is not." is a stock AI cadence | OBSERVED | Medium |

**A-SE-01.** Condition: dark graphite or warm paper ground, thin bordered frames, centred grid of three, sans headings "Now showing". Why: the brief says theatrical, fashion-editorial, camp done on purpose. This frame is a polite museum website. The wit lives only inside the pictures. That is close to the "sterile minimalism" the owner listed. Evidence: `se-1440-dark.png`, `se-390-light-fold.png`. Opportunity: a real art-directed system: an editorial serif or a fashion display face at extreme scale, full-bleed plates, captions set like a magazine, a deliberate palette beyond one yellow fill. Theatrical pacing (one plate per screen, curtain-like transitions) where motion is the joke, with a pause.

**A-SE-02.** Condition: "**Slop** Editorial" in Bricolage, bold then regular. Why: a satire magazine lives on its masthead. This looks like an app logo. Opportunity: commission or design a masthead with real character.

**A-SE-03.** Condition: all nine images share saturated sunset gradients, glossy model rendering, golden-hour light and the same text-rendering style. Why: when the subject is slop, imitating it works for single jokes. As a whole issue it reads as more slop, not commentary. There is no consistent photographic or illustrative point of view that frames the slop. Opportunity: separate two layers. The slop specimens stay slop, labelled. The editorial frame (covers, portraits, set photography, typography) is art-directed by a human and shot or illustrated in a coherent, controlled style.

**A-SE-04.** Condition: the hero "Sunset Point" is a busy generic landscape with a sticker "Free. LIMITED AVAILABILITY." overlaid. Why: the gag (the sign reads its own copy) is the weakest of the set and needs the caption to land. On phones the sticker covers the sky and the sign shrinks. Evidence: `se-390-light-fold.png`, `incoming/hero.png`. Opportunity: lead with the strongest concept (Tokenmaxxer or Certificate of Human Touch, see imagery audit).

**A-SE-05.** "Every piece waits for a human" with planning windows and status colours "Ready for a human, In review, Draft" is a real product feature styled as an admin table. It is honest, but out of voice. Restyle as a programme or a season schedule.

**A-SE-06.** MEDIUM, EDITION, PROMPT, RECORD in mono. A good parody of museum labels. On mobile it pushes the caption joke below the fold. Keep, shorten.

**A-SE-07.** uxkin and the slop-stopper claim guardrail both flag fake stats. Here they are the joke, so this stays a hypothesis. "Visitor no. 184 today" and "Viewed 1,204,331 times" are fake by design (`site/src/scripts/system.ts` line 120 computes a rank). HYPOTHESIS: some visitors will not read it as satire, and the hub promises every number has a source. Validate with readers. The footer note "Counters live in this browser only" covers it, but only at the bottom.

**A-SE-08.** "ROOM: GRAPHITE, MOTION: FULL, SOUND: OFF" mono capsules are fun but read as a developer HUD, not editorial.

**A-SE-09.** Implication for future media: a masthead, a grid that takes full-bleed video, a reading measure for long-form and a game frame do not exist yet. Design the system with these in mind so they do not each become a new skin.

**A-SE-10.** Condition: "Generation is cheap. Taste is not." is the hidden H1, the about H1 and the meta description (`site/src/pages/index.astro` lines 17 and 22, `about.astro` line 14, `layouts/Base.astro` line 14). Why: it is a negative parallelism in two-beat slogan cadence, the most common tagline shape of the moment. It is portable to any design studio. A satire brand needs a line only it could say. The captions prove the voice exists ("The sign is the only thing in the picture that read its own copy."). Opportunity: write a masthead line in that caption voice.

Strengths to keep: the concepts. "Tokenmaxxer of the Year. Tokens burned 8.4 billion. Tasks completed 0." is sharp, culturally aware satire. "Certificate of Human Touch... Generated in 0.8 seconds" and "Please do not generate" are witty and visual. Caption voice ("The sign is the only thing in the picture that read its own copy.") is dry and good. The honesty footer is right.

## 4. Online Paluwagan

Route `/paluwagan/`. Screenshots `shots/op-*.png`.

| ID | Finding | Status | Severity |
| --- | --- | --- | --- |
| A-OP-01 | The brand is a portfolio demo, not a product a Filipino user would trust | OBSERVED | High |
| A-OP-02 | Fraunces serif for money and group names feels literary | OBSERVED | Medium |
| A-OP-03 | Demo honesty copy and dev sections crowd a mobile page of 7000 px | OBSERVED | High |
| A-OP-04 | Mixed language register: "Barkada Weekly Ipon" but English everywhere else | OBSERVED | Medium |
| A-OP-05 | Jargon for the audience: "Check the books", "Forge a line", "Risk" tab | OBSERVED | Medium |
| A-OP-06 | Green ring is the only visual, no warmth or community cue | OBSERVED | Medium |
| A-OP-07 | Status uses small coloured dot plus small word | OBSERVED | Low |
| A-OP-08 | Receipt block shows "not measured yet" four times | HYPOTHESIS | Medium |

**A-OP-01.** Condition: crumb "Garfield Lim / Online Paluwagan", house footer, "How this was built" with commit ids. Why: the brief is trust for people who are not tech-confident. A product brand (name, mark, a calm reassuring palette, a human face of the organiser) is missing. Opportunity: a named product identity with its own trust cues (who runs the group, what happens if someone is late), and the portfolio material moved to the hub case page.

**A-OP-02.** Condition: "Barkada Weekly Ipon", "Passbook" and "₱4,000.00" in Fraunces. Why: elegant, but literary. For fintech trust and older readers a sturdy, very legible sans with clear figures is more familiar. HYPOTHESIS that users read it as less credible. Validate.

**A-OP-03.** Condition: full page at 390 px is about 7000 px. After the passbook come a long explainer, cycle schedule, other groups, Receipt, How this was built, What AI did, What I decided, What I rejected. Why: a 60 year old member must scroll past developer process to find nothing they need. Evidence: `op-390-light.png`. Opportunity: progressive disclosure. Members see the pot, their turn, pay, history.

**A-OP-04.** "Ipon" and "Barkada" give real local warmth. The rest is English with idioms like "Forge a line". Decide a register (plain English, or Taglish, or a language switch) and hold it.

**A-OP-05.** "Check the books" and "Forge a line" are the portfolio's proof toy, not member tasks. "Risk" as a tab can alarm. Rename for the member, keep the proof as a clearly separate demo mode.

**A-OP-06.** The donut is clear. Beyond it there is no imagery, no illustration, nothing that says community savings in the Philippines. The brief asks for friendly but credible.

**A-OP-07.** "Paid" and "Late" use a 6 px dot and 13 px text. Colour is not the only cue (word present), but at this size it is weak for the audience.

**A-OP-08.** Condition: the Receipt rows (Tests, Evals, Budgets, What this does not do) each start with "not measured yet" in the local build (`shots/op-1024-light.png`). HYPOTHESIS, same cause as A-PL-06: CI may write the receipt. If it shows live, a trust product shows four unknowns on its main page.

Responsive note: at 1024 the layout moves the passbook beside the pot, and the cycle schedule becomes a real table. It is the most product-like width of any room. OBSERVED.

Strengths to keep: the first screen is clear. "Demo group · No real money · Sends are simulated" up front. Large pot amount with "in the pot of ₱6,000.00". Two clear actions, the primary filled. "Passbook" is a familiar, trust-building metaphor. No crypto or dashboard tropes. Amounts always carry the peso sign and centavos.

## 5. Cross-project differentiation comparison

| Dimension | Hub | PaperLab | Slop | Paluwagan | Where they converge |
| --- | --- | --- | --- | --- | --- |
| Typography | Fraunces + Inter + JetBrains Mono | Inter + JBM (Recursive planned) | Bricolage + Inter + JBM | Fraunces + Inter | Inter body everywhere, Fraunces crumb on all, JBM figures on all |
| Palette | warm paper `#FAF8F4`, ink, blue links | same paper, coral | same paper or graphite, yellow fill | same paper, green | identical neutrals, one accent each |
| Layout | centred 1120 column, cards with hairlines | same column, bordered tiles | same column, framed grid | same column, list rows | same max width, radii, hairlines, gutters |
| Chrome | crumb, Email, Menu pills | same | same | same (Menu only at 390) | identical header and footer |
| Imagery | room screenshots | one live diagram | nine generated images | one donut | no shared imagery, but none is art-directed except Slop's content |
| Motion | glyph field, doorway clip-path | arc transitions | HUD notices | ring | one house motion vocabulary and one Calm toggle |
| Content presentation | label grids, receipts | receipt, How this was built | tracker, footer receipts | receipt, How this was built | every room ends with the same process and receipts blocks |
| Tone | plain, honest | plain, curious | dry satire | plain, careful | honesty labels shared, good, but the same cadence |
| Emotional impression | calm credibility | tidy tool | polite gallery | calm app | all four feel calm, quiet, careful |
| Interaction conventions | pills, underlines | pills, switches, chips | pills, caps toggles | pills, tabs | same pill buttons and switches |

The strongest convergence is chrome, neutrals, body type and the end-of-page process blocks. The only true divergence is Slop's image content and PaperLab's arc diagram.

## 6. Slop imagery audit (per image)

Source sizes: hero 1672 x 941, certificate 1254 x 1254, the rest 1122 x 1402. Web versions are WebP at 480, 800 and 1000 (hero wide to 1600). All are image-model generations (stated in the site footer). Recommendation key: Keep, Re-art-direct, Replace.

| Image (incoming, web) | What works | What undermines | Verdict |
| --- | --- | --- | --- |
| hero.png, hero-wide / hero-still | Sign "Sunset Point, open 24 hours of hours" is a fair gag | busiest, most generic picture. Orbs, purple sky, joke depends on caption. Sticker overlay in page adds noise | Replace as lead. Keep as a minor plate |
| six-fingers.png, work-fingers | Craft-fair mug, "100% handmade, no AI used" tag, caption "My son made this with his own hands" is warm and cruel | hand reads as normal at thumbnail, so the six-finger joke may be missed. HYPOTHESIS, count fingers at 480 px | Keep, re-crop so the hand is the subject |
| make-it-pop.png (Tokenmaxxer), work-pop | strongest concept, cultural, legible at every size | slick stage photo has the generic event look, which is the point | Keep, strong candidate for lead |
| certificate.png, seal-poster | gold frame, red velvet, "Generated in 0.8 seconds", "Please do not generate" | fine text inside certificate is model gibberish at full size. Acceptable as satire, check no misspelling distracts | Keep, candidate lead or cover |
| tapestry.png (Delve), work-delve | "A rich tapestry. A testament to. Delve. In today's fast-paced world" is a perfect writing-slop gag, rich texture | dense, dark, text is small at 480 | Keep, show larger |
| certainly.png, work-certainly | "Certainly! Here is your image:" over "No text in the image, please." lands instantly | purple-pink sunset again, same palette as hero and never-trend | Keep one of the three sunsets, not all |
| cannot-fulfill.png, work-sorry | product-page parody, refusal as product title, "$19.99 Best seller" | flat UI mock, the least photographic, styled like an app screenshot | Keep, frame as a found screenshot |
| never-trend.png, work-trend | social-post parody, triple suns, "Amen" comments, culturally exact | third sunset. Emoji and UI chrome generated, may age fast | Keep, deduplicate the sunsets |
| humbled.png ("Just one more prompt"), work-humbled | data centre draining a town fountain, a real argument with a rubber duck billboard | the only serious image, tone shifts, faint text | Keep, pair with long-form later |

Overall: the concepts are strong. Execution is unified only by the model's default look. Three of nine are saturated sunsets. What is missing is a human-art-directed layer: a cover, a masthead, staged photographs or illustrations that frame the specimens with a consistent camp sensibility (lighting, set, styling, type). Commission that layer. Keep specimens as specimens.

## 7. Uncertainties and validation needs

- Live receipts. The PaperLab "not measured yet" text may be an artefact of local serving. Check the live site.
- Motion. Only static frames were inspected. The doorway, the glyph field and Slop transitions need a recorded look before judging motion character.
- Paluwagan readers. The serif money, jargon and status size findings need a short test with users in their 60s.
- Slop satire reading. Whether fake counters read as satire needs a few unbriefed readers.
- Six-fingers legibility at 480 px needs a direct crop check.
- Lazy images. In full-page screenshots, Works plates 07 and 08 (`shots/sew-1440-light.png`) and the case-page Screens (`pfc-1024-dark.png`) render blank. A scroll test showed all nine Slop images load (`complete`, 800 px wide). This is a capture artefact, not a finding.
- Pattern check. The slop-patterns `check_design` tool did not run (MCP failed). The pattern judgements here are manual.
- Mindmap is out of scope, but it shares the house, so a house change touches it.

## Finding counts

| Project | Critical | High | Medium | Low |
| --- | --- | --- | --- | --- |
| Cross-cutting | 1 | 3 | 0 | 1 |
| Hub | 0 | 4 | 3 | 1 |
| PaperLab | 1 | 3 | 4 | 1 |
| Slop Editorial | 0 | 4 | 5 | 1 |
| Paluwagan | 0 | 2 | 5 | 1 |
| Total | 2 | 16 | 17 | 5 |
