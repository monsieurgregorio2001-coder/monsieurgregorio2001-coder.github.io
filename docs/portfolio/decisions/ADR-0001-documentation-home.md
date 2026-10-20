# ADR-0001: Spec-driven documentation and its home

Date: 2026-10-20
State: accepted
Supersedes: none

## Authority and source

Garfield explicitly requested: “setup the directory structure for living documentaiton/specs that AI agents/devs will reference/read/use as memory/context.” The same message requested a long-term decision audit and easy agent handover. That establishes the workflow decision. The folder design below is an agent implementation choice within that request, not a separate user preference.

## Decision

Keep cross-project documentation in the portfolio hub repository under docs/portfolio/. Add AGENTS.md and docs/CONTEXT.md to each enrolled project, plus a workspace AGENTS.md. Keep specs, dated decisions, research provenance, asset review, session history, and handovers separately linked.

## Alternatives and rationale

- Chat-only memory is hard to transfer and audit.
- A workspace-only docs folder would sit outside the existing project repositories.
- Full copies of shared documentation in every repository would drift.

The chosen location can be committed with an existing repository while local context remains available in standalone clones.

## Consequences

Sibling-relative links work in the present workspace. Standalone clones may lack the shared hub. Root DESIGN.md remains an external legacy source that needs reconciliation with Five Rooms. Documentation is local until committed and pushed. No credits, rename, design, or image decisions are implied by this ADR.
