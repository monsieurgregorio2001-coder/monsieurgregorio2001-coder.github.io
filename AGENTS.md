# Agent conventions: portfolio hub

This repository is the personal portfolio of Garfield Greg Lim III at https://monsieurgregorio2001-coder.github.io/ and the shared documentation home for every portfolio project. `CLAUDE.md` imports this file, so Claude Code, Codex and other agents read the same rules.

## Start here

1. [Local context](docs/CONTEXT.md): what the hub is built from.
2. [Current state](docs/portfolio/CURRENT-STATE.md): cross-project priorities and the active plan.
3. [Docs map](docs/README.md): where plans, decisions, audits, the tracker and the shared memory live.
4. The active plan, spec or ADR for the task.

Inspect the code and `git status` before editing. Keep changes focused, preserve unrelated work, and update the docs that your change makes stale in the same commit.

## Stack rules

- No framework and no bundler. The site is static HTML, CSS and vanilla JS on GitHub Pages. `scripts/` may use Node for tooling only (card generator, screenshots, Open Graph images, checks).
- `projects.json` is the single source of truth for project data. After editing it run `node scripts/build.mjs` and commit the regenerated HTML. CI fails if they differ (ADR 0007).
- Fonts are self-hosted under the OFL and served from `/house/2.0.1/fonts/`. No Google Fonts or any other third-party request.
- No analytics, no cookies, no tracking.

## Copy rules

- Voice: first person, plain, specific. Short sentences. No em dashes, no semicolons. No "passionate", "leverage", "cutting-edge". Do not headline "vibe coding" or "Prompt Engineer"; say "AI-assisted development" or "context engineering".
- Every number traces to a command, test run or tool output. On case pages the source sits beside it in an HTML comment (`<!-- src: npm test, 2026-10-14, 19 passing -->`). No source, no number.
- Label what is not real: toy weights, demo data, simulated sends, pre-generated text, illustrative replays.
- Never state unverified career facts on a new surface.
- Project order and the flagship follow ADR 0004. Headline and Open Graph copy change together.

## Design rules

- Tokens live in `:root`. New colours go there first. No hex values in component rules.
- Both themes, widths 390, 820 and 1280. Nothing visual merges without screenshots.
- `prefers-reduced-motion: reduce` leaves the page complete and intentional. Anything that moves for more than 5 seconds has a pause.
- Numbers in running text use `.num` (JetBrains Mono, tabular).
- The active design direction is in [docs/portfolio/design/](docs/portfolio/design/README.md). It overrides older timing and style notes where they conflict.

## Process rules

- One phase or one focused change per branch and PR. Branch names: `phase-N/short-name` for plan phases, otherwise `feat/`, `fix/` or `docs/` plus a short purpose.
- Hub site changes update `docs/TRACKER.md` and add a line to `docs/CHANGELOG.md` under Unreleased.
- A decision that changes the hub's structure, stack or look gets an ADR in `docs/decisions/` (next number). A decision that spans projects gets an ADR in `docs/portfolio/decisions/`.
- Follow the [workflow](docs/portfolio/WORKFLOW.md) and [contribution conventions](CONTRIBUTING.md) to size the paperwork to the change.
- Private career material never enters this public repository. It lives in the workspace `_career/` folder.

## Checks

```
python3 scripts/check-docs.py            # docs links and registry, no dependencies
python3 scripts/check-docs.py --workspace  # also sibling projects, with the full workspace
cd scripts && npm ci && npm run check    # build diff, html-validate, axe, links (same as CI)
node shoot.mjs ../docs/audits/shots/<phase>   # review screenshots and page weight
```

CI runs the site checks (`check.yml`) and the docs checks (`documentation.yml`) on every push and pull request.
