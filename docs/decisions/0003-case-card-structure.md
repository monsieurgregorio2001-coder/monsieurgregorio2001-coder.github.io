# ADR 0003 — Every case card follows Proves → Problem → Build → Result

Status: accepted (retroactive, documents the state at `3f90e8e`)
Date: 2026-10-14

## Context

Reviewers of a portfolio for applied-AI roles skim. They want to know what each project demonstrates, what was hard, what was built, and whether it worked, in that order, with numbers.

## Decision

Each entry in `projects.json` carries `proves`, `problem`, `build`, `result`, `tags`, `image`, links and `status`. `result` must contain at least one measured figure from a reproducible check. The renderer wraps numbers in `.num` (JetBrains Mono, tabular).

## Consequences

- Copy stays disciplined; a project without a measured result is shown as "coming soon", not with vague claims.
- The same fields seed the case-study pages (ADR 0006), so cards and pages never disagree.
- The structure is a constraint on new projects: if it cannot be described this way, it probably does not belong on the hub.
