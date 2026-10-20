# Session: Portfolio structure and conventions

Date: 2026-10-20 (Asia/Manila)
Actor: Codex, with a read-only structure review and delegated documentation validator implementation.
Authority: Garfield requested repository/structure cleanup and a standard of proper practices.
Related: [SPEC-0003](../specs/SPEC-0003-portfolio-conventions.md), [ADR-0002](../decisions/ADR-0002-proportional-workflow.md).

## Outcome

Added a workspace map, contributor conventions, machine-readable project registry, concise project agent/context entry points, formatting defaults in six projects, generated-file ignores, a PR template, and documentation CI. Kept active paths and public files stable. Preserved the legacy design source in the hub and left a workspace pointer. Simplified the workflow and templates so small fixes do not require the full spec/ADR/journal/handover chain. Retained the initial dated history.

## Verification

Pending final integrated check. The validator's 12 regression cases have passed in isolation. Final results will be appended below before closing this checkpoint. App behavior did not change and app suites were not rerun. GitHub CI is configured, not remotely executed.

## Remaining work

Existing V3 brief/reference/approval gaps remain. See [the handover](../handovers/2026-10-20-portfolio-conventions.md). All changes remain local, uncommitted, and unpushed; Slop Editorial incoming/ was already untracked before this task.

## Final verification, 2026-10-20

This completes the pending verification checkpoint above.

- Standalone docs check: 28 Markdown files, 56 local links, zero issues.
- Full workspace check: 43 Markdown files, 105 local links, zero issues; nine recorded image sizes/hashes match.
- Validator regression suite: 16 tests passed, including missing links, registry boundaries, altered image hashes, and renamed clones.
- Isolated renamed checkout with no sibling repositories: passed.
- All five enrolled Git repositories: tracked changes limited to README.md and .gitignore; whitespace checks passed. New files are documentation, editor defaults, and validation/review configuration. Existing app source and public routes were not edited.
- Legacy design content retains the original 5,803 bytes at its new location.
- Independent read-only review found one checkout-name assumption in the validator; it was corrected using home_project_id and covered by regression tests. No other material issue remained.

SPEC-0003 is verified locally. No commit, push, deployment, app test suite, image generation, or visual image QA was performed.
