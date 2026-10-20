# ADR-0002: Proportional documentation and stable project boundaries

Date: 2026-10-20 (Asia/Manila)
State: accepted
Authority: User requested cleanup and portfolio standards; the concrete conventions are agent implementation choices within that request.
Related spec: [SPEC-0003](../specs/SPEC-0003-portfolio-conventions.md)
Supersedes: The initial mandatory per-change paperwork in WORKFLOW.md; retains ADR-0001's shared documentation home.

## Context

The initial scaffold required specs plus multiple end-of-session records for all changes. This duplicates context and delays small improvements. Active projects are separate repositories; screenshot tooling relies on sibling folder names. The shared design source previously lived outside any repository.

## Decision

Use records proportional to the change. Small fixes use their diff and validation note. Material behavior gets a focused spec. Consequential choices get an ADR. Handover is for unfinished or transferred work. CURRENT-STATE.md is the single cross-project priority summary.

Keep project boundaries and public file paths stable. Add a shared project registry, contributor conventions, lightweight editor defaults, and documentation CI independent of app tooling. Preserve the original design source inside the existing hub repository and keep the workspace DESIGN.md as a pointer.

## Alternatives and consequences

A whole-workspace monorepo conversion or directory renaming would change tool assumptions without improving the current task. Deleting source/reference folders would discard context not yet evaluated. Requiring every app's dependencies for docs checks would make simple maintenance unnecessarily slow.

These choices reduce duplicate records and preserve local tooling. Source repositories remain independent, and Five Rooms remains local until separately versioned. Shared standards are maintained once; local context retains implementation facts. This record does not resolve the legacy/Five Rooms design direction or missing V3 brief.
