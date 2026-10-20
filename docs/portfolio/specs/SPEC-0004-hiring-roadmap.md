# SPEC-0004: Hiring roadmap and execution handover

State: verified locally (planning deliverable only)
Date: 2026-10-20 (Asia/Manila)
Authority: Garfield requested a thorough, organized roadmap to hand to another agent: portfolio polish, job discovery, customized documents, applications, and tracking.
Decision: [ADR-0003](../decisions/ADR-0003-hiring-outcome-and-private-operations.md)

## Intended outcome

A successor can execute the next bounded hiring task without reconstructing chat history, inventing candidate preferences, delaying applications for optional redesign, or losing the evidence of what was actually sent.

## Planning scope

Create a phased roadmap, portfolio readiness requirements, search/qualification method, document/submission/tracking playbooks, sensible review measures, private starter records, and a precise handover. Inspect existing source material and a small employer-description sample to ground the plan. Actual product polish, resume rendering, shortlist qualification, submissions, interviews, and offer decisions are execution work, not achievements of this planning checkpoint.

## Requirements and acceptance

| ID | Requirement | Verification evidence |
| --- | --- | --- |
| HIRE-01 | The four requested workstreams connect to interviews/offers with clear dependencies and milestones | roadmap/README.md includes owners, exit evidence, windows, capacity assumptions, and first three sessions |
| HIRE-02 | Initial portfolio work is scoped by hiring value rather than completing every visual idea | roadmap/portfolio-readiness.md includes P0/P1/P2, launch gate, actual source gaps, and timebox assumptions |
| HIRE-03 | Job qualification separates hard eligibility from scored fit and preserves sources | hiring/search-playbook.md defines checks, rubric, deduplication, rechecks, and first five qualified opportunities |
| HIRE-04 | Tailored facts and final documents are traceable, and ambiguous sends cannot become false success | hiring/applications-playbook.md and tracker-contract.md define provenance, packet QA, immutable hashes, attempts, confirmation, and recovery |
| HIRE-05 | Private candidate/application records have a usable clean starting point | Local _career/ contains profile/claim starters, zero-record canonical tracker, empty event log, packet/review templates, and START-HERE |
| HIRE-06 | The successor knows what is unknown, unrun, uncommitted, and next | CURRENT-STATE.md and dated public/private handover instructions retain outstanding inputs and actual local state |
| HIRE-08 | The confirmed broad role direction and candidate thesis translate into concrete evidence and role-specific framing | roadmap/positioning.md, ADR-0004, search/application playbooks, and private profile/handover |
| HIRE-07 | The documentation is portable and internally consistent | Default/workspace local link checks, validator tests, private JSON/link integrity, and cross-document review |

## Boundaries

The user chose the hiring outcome, workstream intent, broad role-family direction, and taste/judgment narrative. The agent proposes title aliases, effort estimates, scoring weights, throughput, and sequencing; these remain adjustable defaults. At the initial baseline, candidate preferences had been requested but were not yet provided. The later user response confirms broad AI/builder/solutions/GTM role families and the taste/judgment narrative; see [the positioning brief](../roadmap/positioning.md) and ADR-0004. Practical constraints and seniority remain unconfirmed. No new factual career claims or seniority level are validated by planning.

No application emails, employer forms, profile edits, tracking-service writes, or automations are performed. Planning does not create a mandatory per-job approval step for future applications if actual delegation already covers them. Required unknown facts and personal decisions still require real answers.

## Verification

Verified on 2026-10-20: 40 standalone Markdown files / 101 local links; 55 workspace Markdown files / 150 local links; nine existing inventory image hashes/sizes; 16 validator regression tests; seven private JSON starter files; ten private/workspace Markdown targets; empty application/event state; ten source-asserted claims; two resume-seed fingerprints; and a renamed standalone hub copy without sibling/private folders. Independent reviews resolved initial-batch, undated-submission metrics, substantive ATS response, and source-transfer inconsistencies. See [the session record](../journal/2026-10-20-hiring-roadmap.md). Completion of this specification means the planning package is verified, not that hiring milestones have been achieved.
