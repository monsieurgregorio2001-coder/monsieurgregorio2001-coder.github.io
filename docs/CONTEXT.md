# Portfolio hub: Local context

Updated: 2026-10-20 (Asia/Manila). Facts come from local README/layout inspection; historical app metrics were not rerun.

## Implementation

Static HTML, CSS, and vanilla JavaScript. index.html, style.css, and main.js serve the public site from the root. projects.json supplies project cards; assets/ contains fonts, screenshots, and Open Graph media.

See [README](../README.md) for setup and detailed architecture.

## Current context

docs/portfolio/ is the shared portfolio memory. [The hiring roadmap](portfolio/roadmap/README.md) now directs portfolio readiness and the application workflow; private operational files stay in the workspace _career/ folder. CONTRIBUTING.md and .editorconfig define conventions. scripts/check-docs.py validates shared documentation without app dependencies; .github/workflows/documentation.yml runs it and its failure-case tests. Screenshot/OG tooling under scripts/ still has its own npm dependencies and may require sibling projects and local Chrome.

[Shared current state](portfolio/CURRENT-STATE.md) holds cross-project priorities. [Workflow](portfolio/WORKFLOW.md) keeps documentation proportional. Formatting defaults are in .editorconfig. This checkpoint's documentation/config changes are local and uncommitted.

## Verification entry points

Use `python3 scripts/check-docs.py` for standalone docs, `python3 scripts/check-docs.py --workspace` for local sibling context and image integrity, and the validator unit tests when changing the checker. For UI changes, serve over HTTP and review phone/desktop, keyboard/focus, links, and project-card loading.

## Standalone checkout

Local facts are usable without sibling repositories. Shared context lives in the [portfolio hub repository](https://github.com/monsieurgregorio2001-coder/monsieurgregorio2001-coder.github.io), under docs/portfolio/. New files may not be committed there yet. Record unavailable context instead of inventing decisions. Update this file only when project facts change.
