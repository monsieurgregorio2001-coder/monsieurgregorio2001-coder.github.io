# Changelog

All user-visible changes to the hub. Newest first. Follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## Unreleased

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
