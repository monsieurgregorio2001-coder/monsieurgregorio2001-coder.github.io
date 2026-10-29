# Brand strategy: Slop Editorial

Agent A, Pass 2 draft, 2026-10-29. Proposed, not accepted. Implements against A-SE-01 to A-SE-10, B-SE-01 to B-SE-04, register conflict 6, and the per-image audit in [02](../02-agent-a-brand-audit.md) section 6.

## Positioning and personality

- Audience: people who live online and are tired of AI filler. Designers, writers, culture readers. Secondary: the hub's reviewers.
- Promise: a glossy magazine that treats AI slop as couture. It hangs the worst of the feed with a straight face and a perfect frame, so you laugh and then notice.
- Personality: deadpan, theatrical, overdressed on purpose. A fashion editor who has seen everything and is not impressed.
- Tension to preserve: elegance and mockery at once. The frame is immaculate, the specimens are slop. Camp works only when the craft is visibly deliberate.

## Design philosophy

Two layers, never mixed:
1. **The specimens:** AI-generated slop, shown as found objects, always labelled.
2. **The magazine:** human-art-directed masthead, covers, typography, captions, staging. This is where the taste lives (A-SE-03).

Pacing is theatrical: one plate per screen on the works pages, a curtain (cover) on each issue, captions set like a fashion spread. Text is minimal. The joke is in the caption, the label and the price, never explained.

## Visual identity direction

"Couture catalogue for garbage." Bone paper or a deep oxblood-black stage, extreme-scale didone headlines, full-bleed plates with generous margins, thin rules, and one hot accent (lipstick red) plus the existing sticker yellow used only for "price" and "offer" parodies. Dark mode is the default evening edition, light mode the day edition.

## Typography

| Role | Face | Licence | Why |
| --- | --- | --- | --- |
| Masthead | custom lettering or a modified Bodoni Moda | OFL base, commission | A satire magazine lives on its masthead (A-SE-02). Commission a drawn masthead, or as a fallback set "SLOP" in Bodoni Moda 900 italic with tightened spacing and a hand-adjusted ligature |
| Display and headlines | Bodoni Moda variable (opsz 6 to 96, wght 400 to 900, italic) | SIL OFL 1.1 | The fashion-magazine didone. High contrast at large sizes reads as Vogue-grade seriousness, which is the joke |
| Body and long-form | Newsreader variable (opsz, wght, italic) | SIL OFL 1.1 | Comfortable reading for future essays, with optical sizes for captions |
| Museum labels, prices, metadata | Courier Prime | SIL OFL 1.1 | Typewriter press-release voice, a little camp, clearly not the hub's engineering mono |

Retire Bricolage Grotesque, Inter and JetBrains Mono from Slop. Display sizes up to 160 px on desktop, 56 px on phones, set with `text-wrap: balance`. Body 18/29 at a 62ch measure. Captions in Newsreader italic 15/22.

## Colour

| Role | Day (light) | Evening (dark) | Contrast on bg |
| --- | --- | --- | --- |
| bg | bone #F3EDE4 | stage #120E10 | |
| ink | #141012 | #F3EDE4 | 16.2 / 16.5 |
| ink-2 | #5A4E50 | #B9ACA9 | 6.8 / 8.7 |
| lipstick (links, issue numbers, the single headline word) | #9E1030 | #FF6F8E | 7.0 / 7.2 |
| sticker yellow (price and offer stickers only, fill) | #F2CF3B fill with ink text | #F2CF3B (12.6 on stage) | fill |
| gilt (rules, frames, small ornament) | #6B4E00 | #F2CF3B | 6.6 / 12.6 |

No gradients in the frame. The specimens may be as garish as they like, which is why the frame must be disciplined.

## Imagery and media plan

### Per-image plan

| # | Image | Plan | Notes |
| --- | --- | --- | --- |
| 01 | The Still (hero.png, "Sunset Point") | Demote, keep in the issue as a minor plate | Weakest gag, should not lead (A-SE-04). Drop the page's "Free. Limited availability." overlay sticker from the hero use |
| 02 | Six Fingers, Five Stars | Keep, re-crop | Crop to the hand so the extra finger reads at 480 px. Verify the count is visible |
| 03 | Certainly! Here Is Your Image | Keep | Best text gag of the three sunsets |
| 04 | I Am Sorry, But I Cannot Fulfill This Request | Keep, re-art-direct presentation | Present as a found screenshot in a device or a torn printout, so the flat UI looks chosen |
| 05 | Why Do Pictures Like This Never Trend? | Keep, re-art-direct presentation | Third sunset. Pair it on a spread with 03, so the repetition becomes the joke instead of an accident |
| 06 | Tokenmaxxer of the Year | Keep, promote to cover | Strongest, most cultural, legible at every size |
| 07 | Delve Into the Tapestry | Keep, show larger | Needs a full plate so the stitched text reads |
| 08 | Thirsty AI (humbled.png) | Keep, hold for long-form | The one serious image. Pair it with an essay later rather than mid-gallery |
| 09 | Certificate of Human Touch | Keep, second cover option | Gold and velvet already fit the new palette |

### Commission (new, human art direction)

The magazine layer does not exist yet. Brief for the first commission:

- **Issue cover set (3 frames):** studio photography or 3D render on a seamless bone or oxblood backdrop. Subject: a single slop object (an extra-fingered glove, a framed "Certainly!" speech bubble, a trophy) lit like a perfume ad: one hard key light, deep shadow, gilt rim light. Shot square and 4:5, with clear headroom for the masthead.
- **Masthead lettering:** a high-contrast didone-style "SLOP" with an "Editorial" small-caps line. Delivered as SVG with an OFL or owned licence.
- **Plate frames:** a single gilt hairline frame and a typewriter label card, used on every specimen.
- **Rules for the commission:** human-made or human-art-directed with every generation credited. Never generic AI fashion faces. No meme templates. No chaos: one object, one light, one joke.

### Future media implications

- **Video:** plates are designed as 4:5 and 16:9 frames from the start. Video plays inside the same gilt frame with a caption card, muted by default with a visible play and pause control.
- **Games:** a game is an "attraction" in the issue (for example "Count the fingers") with its own cover plate. Same type and palette, full keyboard support, no timers without pause.
- **Long-form:** a Newsreader essay template with a drop cap in Bodoni Moda, pull quotes in lipstick italic, and specimens inset as plates.
- **Multimedia budget:** cover images under 200 KB at 1000 px, lazy below the first plate.

## Tone of voice

Deadpan curator. Short, dry, specific. Never explains the joke.

| Do (real copy) | Don't (real copy to change) |
| --- | --- |
| "The sign is the only thing in the picture that read its own copy." | "Generation is cheap. Taste is not." as tagline (stock cadence, A-SE-10). Write a masthead line in the caption voice, for example a line about the magazine dressing for an occasion that never comes. Owner writes or approves the final line |
| "Nine pictures nobody decided to make, each labelled as though someone had." | "Every piece waits for a human" release tracker styled as a status table (A-SE-05). Restyle as "The season" programme |
| "Every work is a labelled sample. Nothing is for sale. The prices are the joke." | "ROOM: GRAPHITE · MOTION: FULL · SOUND: OFF" as dev HUD caps (A-SE-08). Rename as "Evening edition", "Still", "Silent" |

## Distinctive motifs

1. Extreme-scale didone masthead.
2. Gilt hairline frames and typewriter label cards on every plate.
3. Price stickers in yellow, used only for the parody economy.
4. One plate per screen with a curtain-style cover on each issue.
5. Fake counters kept, but set in the label voice ("Viewed 1,204,331 times, mostly by itself") so they read as satire (A-SE-07).

## Anti-patterns

Meme-page layouts, impact font, random tilts and stickers everywhere, glitch effects, generic AI fashion models, neon gradients in the frame, sterile white gallery grids, explaining the joke, chaos that looks accidental.

## What distinguishes this brand from the other three

Only Slop is theatrical, high-contrast serif, gilt and lipstick, with full-bleed imagery as the main content. The hub is a cool diagram, PaperLabs is a warm notebook, Paluwagan is plain and safe. Slop is the one brand allowed to be excessive, and only in its specimens.

## Signature cost budget

- Fonts at launch: Bodoni Moda variable roman, Latin, display range only, plus Courier Prime regular. Total 129 KB or less (DIRECTION section 8). Bodoni italic only if it fits. Newsreader ships only with the first long-form piece.
- Masthead as inline SVG, not a font.
- Curtain cover and plate morphs on transform and opacity, interruptible by Back. No motion over 5 s without a pause.

## Changes after review

- Slop's faces are served from the shared font host, and Slop loads no other product's faces. Bricolage, Inter and JetBrains Mono are retired here. B's cache table needs this wording.
- Cookie banner: plays once per session, styled as a magazine page element, never returns after a client navigation (B-SE-02).
- Visible Previous and Next stay the primary page turn, styled as a programme strip. Swipe is secondary.
- Return link rule added (header, trailing, 44 px, product-styled). "Still" is the Slop name for Calm motion, in its menu.
- No video is commissioned until the media host is decided (owner item).
