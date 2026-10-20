# SPEC-0003: Portfolio structure and working conventions

State: verified locally, uncommitted
Date: 2026-10-20 (Asia/Manila)
Authority: Garfield requested repository/structure cleanup and a standard of proper practices, observing the portfolio felt like waterfall work.
Decision: [ADR-0002](../decisions/ADR-0002-proportional-workflow.md)

## Outcome and scope

Make the shared memory discoverable, versionable, portable, and proportional to the task. Keep the current public site and active project paths stable. Keep existing source/reference material and image originals.

## Acceptance criteria

| ID | Outcome | Evidence |
| --- | --- | --- |
| STD-01 | A reader can find the workspace map, conventions, active priorities, and project checks | Workspace/root READMEs, CONTRIBUTING.md, and project registry |
| STD-02 | Small fixes can proceed without a new spec/ADR/handover chain | Proportional workflow and concise AGENTS.md in six projects |
| STD-03 | New edits have formatting and file/branch/commit conventions | CONTRIBUTING.md and .editorconfig in six projects |
| STD-04 | Documentation checks run in a standalone hub clone and the full workspace | Stdlib checker, meaningful failure-case tests, and documentation CI |
| STD-05 | The legacy design source lives in a versionable location without choosing a new design direction | design/legacy-design-system.md and workspace compatibility pointer |
| STD-06 | No app source, image bytes, project directory, or prior dated record is removed or rewritten by cleanup | Scoped Git diff/status, unchanged image inventory, and retained historical records |

## Slice

Structure and workflow cleanup only. No project redesign, dependency upgrades, image generation, or deployment. Do not reorganize public files under src/ without a separate build/hosting change. Do not merge independent repositories into a monorepo.

## Verification

On 2026-10-20, standalone validation passed for 28 Markdown files and 56 local links. Full workspace validation passed for 43 Markdown files, 105 local links, and nine inventory size/hash checks. All 16 validator tests passed. A renamed standalone copy without siblings also passed. Tracked diffs are limited to README/ignore conventions; new files are documentation, editor defaults, and validation/review configuration. Whitespace checks passed in all five enrolled Git repositories. The preserved legacy design source retains its original 5,803 bytes. CI is configured but has not run on GitHub. See the [session record](../journal/2026-10-20-portfolio-conventions.md).
