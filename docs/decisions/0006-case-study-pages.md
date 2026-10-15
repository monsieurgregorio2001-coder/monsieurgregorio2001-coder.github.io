# ADR 0006 — One case-study page per project at `/work/<slug>/`

Status: accepted
Date: 2026-10-15

## Context

Cards give a reviewer 60 seconds of material. Interviewers and hiring managers for Applied AI / FDE roles want the next layer: what was decided, what was measured, what was hard. Today that layer is only in the repos.

## Decision

Each live project gets a static page at `/work/<slug>/index.html` with a fixed section order:

1. Header: title, one-line pitch, Proves line, links (demo, code), tags.
2. **Problem** — 2–3 paragraphs, who has it, why it is hard.
3. **Approach** — the shape of the solution in prose.
4. **Architecture** — one inline SVG diagram (components and what calls what), hand-drawn in site tokens, legible in both themes.
5. **Decisions** — 3–5 short "chose X over Y because" entries.
6. **Results** — the measured figures, each with how it was measured.
7. **Screens** — 2–4 cropped detail screenshots with captions.
8. **What I'd do next** — 2–3 bullets.
9. Footer nav: previous / next case, back to Work.

Pages are hand-written HTML sharing `style.css` plus a small `case.css`. The card on the hub links to the page; the page links out to demo and code. Slugs: `paperlab`, `mindmap`, `slop-editorial`, `paluwagan`.

Writing order: PaperLab (flagship, sets the template), Living Mindmap, Slop Editorial, Paluwagan. Drafts are generated from each project's README, tests and commit history, then corrected by the owner before publish.

## Consequences

- Four new pages in the sitemap; each gets its own OG image (title + proves line on the house template).
- Screenshot tooling grows a "detail crop" mode.
- The hub's noscript fallback links to the case pages instead of the raw repos.
- Content accuracy is on the owner: every number on a case page must trace to a command or file in the project repo, recorded in the page's HTML comments.
