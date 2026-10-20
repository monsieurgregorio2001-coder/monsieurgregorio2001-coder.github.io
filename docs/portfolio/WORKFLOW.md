# Working protocol

Updated: 2026-10-20. Replaces the initial all-changes paperwork rule, per [ADR-0002](decisions/ADR-0002-proportional-workflow.md).

## Start with the next useful outcome

Read AGENTS.md, current state, the local context, and the relevant active spec. Inspect Git status and the affected code. Read the latest handover when resuming unfinished work. Pick one bounded outcome, implement it, validate it, and update the context that changed. Feedback may revise the next slice at any point.

## Size the documentation to the change

| Change | Minimum record |
| --- | --- |
| Typo, broken link, formatting, or straightforward fix within known behavior | Clear diff and a concise verification note in the commit/PR or a journal entry while uncommitted; update context only if stale |
| New behavior, redesigned interaction, changed data flow, or a feature spanning projects | Short spec: problem, scope, observable acceptance criteria, intended slice, and verification |
| Consequential architecture, naming, design direction, dependencies, or hard-to-reverse tradeoff | Decision record with alternatives, reason, authority, and consequences; link the related spec if any |
| Work paused, incomplete, or transferred to another agent | Dated handover with exact resume steps and missing inputs; update LATEST.md |

Use the shortest record that lets another developer assess the change. A small fix does not need a new spec, ADR, session log, and handover. For significant work, one journal entry can hold the changes and validation; CURRENT-STATE.md holds priorities rather than copying the narrative.

## Spec-driven iterations

Use SPEC-####-short-purpose.md for material work. Keep requirement IDs stable when they are referenced by evidence. Implement one testable slice, record acceptance results, and revise the next slice from what was learned. No need to complete a master plan or wait for every room's redesign before delivering an independent improvement.

Spec states are draft, ready, implementing, verified, shipped, or superseded. Ready means concrete enough for work already authorized; it adds no new permission gate. Verified requires evidence for the accepted scope. Shipped requires a release or deployment reference. Drafts can stay in research without blocking unrelated work.

Use ADR-####-short-purpose.md only for material decisions. States are proposed, accepted, rejected, or superseded. Record who decided and the source. Separate explicit user choices from agent implementation choices. A reversal gets a new ADR and a supersedes link.

## Verification and completion

Run checks appropriate to what changed; the [registry](projects/registry.json) lists entry commands and each README supplies detail. Record the date, method, result, and evidence. Distinguish passed, failed, and unrun. UI changes need visual and interaction checks as well as code checks. A documentation-only change does not require every app's build.

Update only the spec acceptance evidence, project context, or current-state priorities that the work makes stale. Add a dated journal entry for meaningful work when no commit/PR carries the record. Leave a handover when there is work to resume. Do not claim deployment from local validation.

## Preserve shared memory

Allocate the next unused spec or ADR number in its index; never reuse an ID. Keep current summaries editable. Retain dated journal/handover records and append corrections. A materially changed decision is superseded, not erased. Dated filenames use Asia/Manila and a descriptive suffix to avoid same-day collisions.

Per-project facts live in local docs/CONTEXT.md, and cross-project coordination lives here. If the shared hub is unavailable in a standalone clone, use local context and record the gap. When implementing a design reference, record what was actually adopted and update the relevant public credits. Git history is available once changes are committed; local documentation is not a remote backup.
