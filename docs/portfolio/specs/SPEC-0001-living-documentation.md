# SPEC-0001: Living documentation and agent handover

State: verified locally, uncommitted
Date: 2026-10-20
Authority: Garfield's continuation request for living documentation/specs, project memory, an audit log, and agent handover.
Decision: [ADR-0001](../decisions/ADR-0001-documentation-home.md)

## Problem and scope

Important context is scattered between chat, a private plan, READMEs, and a workspace design file. A successor needs a discoverable entry point and a way to distinguish decisions, proposals, implementation, and evidence. Cover the hub, Five Rooms, PaperLab, Paluwagan, Kuru, and Slop Editorial.

## Requirements and acceptance

| ID | Requirement | Acceptance and evidence |
| --- | --- | --- |
| DOC-01 | Agents can discover project context from each enrolled folder | Each has AGENTS.md linking docs/CONTEXT.md and this hub |
| DOC-02 | Intent and current behavior are separate | Specs include state and criteria; CURRENT-STATE.md distinguishes verified facts and missing inputs |
| DOC-03 | Decisions retain provenance and reversals | ADR index, initial ADR, and template include authority, rationale, alternatives, and supersession |
| DOC-04 | Another agent can resume without chat history | Latest handover links a dated checkpoint with actionable next steps and blockers |
| DOC-05 | Work has an audit trail | Dated journal entry and templates record changes, verification, and unresolved work |
| DOC-06 | Earlier suggestions are not promoted to user decisions | Inspirations remain proposed; V3 work remains draft; existing image presence is separate from QA |

## Implementation and verification

Implemented by the shared hub, six local context files, six project agent entry points, and the workspace AGENTS.md. File and local Markdown link checks completed on 2026-10-20. The check resolved relative links within this portfolio workspace and confirmed nine inventory entries against files and SHA-256 hashes. See the [session record](../journal/2026-10-20-documentation-setup.md).

## Exclusions and risks

No application changes, image generation, deployment, or historical decision reconstruction. Shared links assume sibling folders; standalone clones retain local context and may need to locate the hub separately. Local changes need Git commits and remote storage to preserve them beyond this machine. The prototype is not currently versioned.
