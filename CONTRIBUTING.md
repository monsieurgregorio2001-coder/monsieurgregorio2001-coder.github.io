# Contribution conventions

These conventions apply to the portfolio hub and are the baseline for its sibling projects. Keep project-specific commands and architecture local. Start at [current state](docs/portfolio/CURRENT-STATE.md), then read the relevant context and spec.

## Keep changes small

Use a focused branch when preparing a change for review: `docs/short-purpose`, `fix/short-purpose`, or `feat/short-purpose`. Do not change an existing branch just to satisfy a naming rule. One change should have one clear reason and a reviewable diff.

Use commit subjects such as `docs: simplify portfolio workflow` or `fix(paperlab): handle empty input`. Keep formatting sweeps and unrelated work out of behavior changes. Stage explicit paths, especially around Slop Editorial's pre-existing incoming images. Commit lockfiles when dependency changes require them.

## Structure and naming

- Keep the hub's public entry files at the repository root and public media in assets/. Its static hosting setup depends on this layout.
- Put shared context in docs/portfolio/ and local implementation facts in each project's docs/CONTEXT.md. Do not duplicate shared policy in every repository.
- Use lowercase kebab-case for new ordinary files and folders. Keep the established README.md, AGENTS.md, CONTRIBUTING.md, CURRENT-STATE.md, and numbered SPEC/ADR names.
- Specs use SPEC-####-short-purpose.md. Decisions use ADR-####-short-purpose.md. Dated records use YYYY-MM-DD-short-purpose.md in Asia/Manila. Add a distinct suffix for two records on the same day.
- Use relative paths for repository files. The [registry](docs/portfolio/projects/registry.json) records stable sibling paths, roles, and check commands. Repository links in the [project index](docs/portfolio/projects/README.md) work without sibling clones.
- Use UTF-8, LF endings, a final newline, and spaces. Match surrounding code. The shared .editorconfig uses two spaces by default and four for Python. Do not mass-reformat existing files.

## Work proportional to the change

Follow the [workflow](docs/portfolio/WORKFLOW.md). Small fixes do not need a new spec or ADR. A meaningful behavior change needs a short spec with observable acceptance criteria. A decision record is for consequential choices and their reasons. Keep one bounded slice moving through implementation and validation at a time.

## Verification and review

From this repository, run:

```sh
python3 scripts/check-docs.py
python3 -m unittest discover -s scripts -p 'test_check_docs.py'
```

For the full sibling workspace, also run `python3 scripts/check-docs.py --workspace`. The default check must work in a standalone clone without Chrome, npm packages, or sibling repositories. It validates local Markdown targets and the project registry. Workspace mode also checks the enrolled project entry points and inventoried image bytes. It does not check external websites or execute registry commands. Use [the project registry](docs/portfolio/projects/registry.json) and each README to choose app checks appropriate to a change.

UI changes also need a browser review at phone and desktop widths, keyboard and focus checks, reduced-motion checks where relevant, and asset/license attribution when used. Record results with date and evidence. Mark unrun checks as unrun and never promote old measurements into fresh results.

## Done means

The requested behavior works, appropriate checks pass, relevant context reflects it, and material decisions have their sources recorded. Include a handover only when work remains or another agent must continue. Keep a release reference before claiming a change is deployed.

Assume documentation committed to a public repository is public. Keep private planning documents, credentials, and unrelated personal material outside it. Git ignores and site exclusions do not make committed material private.
