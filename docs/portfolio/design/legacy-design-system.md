# Portfolio design system

One identity across the hub and every project, so a viewer who clicks from the hub into PaperLab or Paluwagan feels they never left the same studio.

## Who is looking and what they need

| Viewer | Time | What they must leave with |
| --- | --- | --- |
| Recruiter / hiring manager | 30 seconds on the hub | Who Garfield is (Applied AI Engineer), three real proof points, four projects that each prove one thing |
| Hiring engineer | 2 to 5 minutes | A demo that works on first click, a one-paragraph case study (problem, build, result), the code |
| Peer on a phone (LinkedIn/X click) | 10 seconds | A clean first screen at 360 px that explains itself |

Rules that follow from this:
1. Every page answers "what is this and what do I do" in the first screen, in one sentence.
2. Every project shows Problem, Build, Result (three short lines) before any deep detail.
3. Every number shown is real and measured. No invented metrics.
4. Every project page has a quiet "Garfield Lim / Portfolio" link back to the hub in its header and the same footer.

## Tone

Editorial minimalism. Quiet confidence, lots of whitespace, one accent colour, real content as the decoration. Think a well-set technical journal, not a SaaS landing page. No gradients-as-decoration, no glassmorphism, no emoji, no stock illustrations, no bouncing animations.

## Type

- Display: **Fraunces** (variable, opsz on), weights 500 to 600, for page titles and project names only. Slight negative tracking (-0.01em) at large sizes.
- Body and UI: **Inter** (variable), 400/500/600. 16 px base on mobile, 17 px on desktop, line-height 1.6 for prose, 1.25 for headings.
- Numbers, code, formulas, ledger amounts: **JetBrains Mono**, tabular figures (`font-variant-numeric: tabular-nums`).
- Self-host the fonts (Vite projects: `@fontsource-variable/fraunces`, `@fontsource-variable/inter`, `@fontsource/jetbrains-mono` 400/500; the static hub: copy the latin woff2 subsets into `assets/fonts/` with `font-display: swap` and preload the two most used). No Google Fonts requests.
- Scale (rem): 0.8125, 0.875, 1, 1.125, 1.375, 1.75, 2.25, 3 (display on desktop), 2.25 display on mobile.

## Colour tokens

Define on `:root`, dark values under `@media (prefers-color-scheme: dark)`.

| Token | Light | Dark | Use |
| --- | --- | --- | --- |
| `--paper` | #FAF8F4 | #0F0F12 | page background |
| `--surface` | #FFFFFF | #17171C | cards, panels |
| `--ink` | #17171B | #ECEAE5 | primary text |
| `--muted` | #5F5F6B | #A3A1AA | secondary text (must stay AA on paper and surface) |
| `--rule` | #E6E2DA | #2A2A31 | hairlines, borders (1px) |
| `--accent` | #2340B8 | #9DB0FF | links, primary buttons, focus ring, one highlight per view |
| `--accent-ink` | #FFFFFF | #0F0F12 | text on accent |
| `--accent-wash` | #EEF1FC | #1B2140 | selected states, subtle highlight |
| `--positive` | #1E7A4F | #6FD3A0 | paid, low risk |
| `--warning` | #9A6200 | #F2C46B | late, medium risk |
| `--negative` | #B42318 | #FF8A80 | missed, high risk |

Data visualisation (PaperLab heatmaps): a single-hue sequential ramp from `--surface` to `--accent`, never rainbow. Diverging values (embeddings, signed numbers): accent blue for positive, a warm `#B5562B` / dark `#F0A07A` for negative, neutral at zero.

## Layout and components

- Content width 1120 px max for the hub, 960 px for reading pages, 16 px side gutter on mobile, 24 to 32 px on desktop. No horizontal page scroll at 360 px.
- Spacing scale 4, 8, 12, 16, 24, 32, 48, 72, 96 px. Generous vertical rhythm between sections (72 to 96 px desktop, 48 mobile).
- Radius 10 px for cards, 8 px for buttons and inputs, 999 px only for tags/chips.
- Borders are 1 px `--rule`. Shadows are almost absent: at most `0 1px 2px rgb(0 0 0 / 0.04)` on hover.
- Buttons: primary = `--accent` fill; secondary = 1 px `--rule` border with `--ink` text. 44 px minimum touch height. Visible 2 px `--accent` focus ring with 2 px offset.
- Tags: small Inter 500, 0.8125 rem, `--muted` text on transparent with 1px rule.
- Status badges: text plus a dot, never colour alone.
- Motion: 150 to 200 ms ease-out on hover/focus, a gentle fade/translate (8 px) for sections on first view only. Everything off under `prefers-reduced-motion: reduce`.

## Shared header and footer (every project)

Header: left `Garfield Lim` (Fraunces, links to https://monsieurgregorio2001-coder.github.io/) then a thin slash and the project name. Right: `Code` (GitHub repo link). Sticky only if it stays under 56 px.

Footer: `Built by Garfield Greg Lim III` · Portfolio · GitHub · LinkedIn https://www.linkedin.com/in/garfield-lim-8239242a9 · lim.ggreg@outlook.com. Plus any project-specific disclaimer above it.

## Project case-study block

Each project shows, near the top or in an "About this project" panel:

- **Problem**: one sentence.
- **Build**: one sentence naming the key technical decisions.
- **Result**: one sentence with a real measured number.

## README standard (GitHub is often the first click)

1. Title + one-line pitch.
2. Hero screenshot (real, 1600 px wide, light theme) linking to the live demo.
3. "In 30 seconds": Problem, Build, Result.
4. Live demo link, then features, architecture (mermaid), run locally, tests and measured results, credits, license.

## Writing style for all visible copy

No em dashes, no semicolons, no contractions, Oxford comma, sentences under 25 words, plain words.

## Quality bar (each site must pass before it ships)

- Lighthouse 95+ in all four categories (mobile preset).
- WCAG AA contrast in both themes, keyboard operable, visible focus.
- First screen at 360 px and at 1280 px explains the page without scrolling.
- Real screenshot captured for the hub card (1200 x 750, WebP and PNG fallback) and an Open Graph image (1200 x 630) per site.
