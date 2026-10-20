# Docs

Working records for the portfolio hub. Everything that explains *why* the site is the way it is lives here; the README at the root explains *how* to run it.

| Folder / file | What goes there |
| --- | --- |
| `plan/` | Implementation plans. One file per initiative, dated. A plan is a contract: scope, phases, acceptance checks. |
| `decisions/` | Architecture Decision Records (ADRs). Numbered, short, never edited after acceptance; superseded ones get a pointer to the replacement. |
| `audits/` | Dated reviews of the site: design, accessibility, performance, content. Each ends with ranked recommendations. |
| `TRACKER.md` | Live status of every planned item. Updated with each commit that moves an item. |
| `CHANGELOG.md` | User-visible changes, newest first, Keep-a-Changelog style. |

## Conventions

- Dates are ISO (`2026-10-15`). Times are Asia/Manila.
- Numbers in copy must come from a reproducible check (a test count, a Lighthouse run, a timing). Record the command or script beside the number in the plan or decision that introduced it.
- A decision that changes the look of the site gets a before/after screenshot in `audits/` or the PR.
- Plans are not edited after work starts; changes go in `TRACKER.md` notes and, if material, a new ADR.
