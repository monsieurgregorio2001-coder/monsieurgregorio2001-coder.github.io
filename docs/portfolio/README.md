# Portfolio living documentation

Updated: 2026-10-20 (Asia/Manila)

This is the shared memory for Garfield's portfolio. Keep the current picture small, deliver work in useful slices, and retain the reasons behind consequential changes.

## Start here

1. [Current state](CURRENT-STATE.md): the active initiative, priorities and open owner decisions.
2. [Design direction](design/README.md) and the active plan it links, then the [project index](projects/README.md), then the relevant project's docs/CONTEXT.md.
3. The relevant active [spec](specs/README.md) and decision, if the task needs one.

Use [the workflow](WORKFLOW.md) to choose the amount of documentation. Use [contribution conventions](../../CONTRIBUTING.md) for structure, naming, branches, and verification. Read [the latest handover](handovers/LATEST.md) when resuming unfinished work.

## Where things belong

| Location | Responsibility |
| --- | --- |
| CURRENT-STATE.md | Single current cross-project priority list; no second roadmap or task tracker |
| projects/ | Project registry, stable paths, roles, and check commands |
| plans/ | Cross-project implementation plans: phases, scope, acceptance checks |
| specs/ | Intended behavior and observable acceptance criteria for material changes |
| decisions/ | Consequential choices, reasons, authority, and reversals |
| design/ | The active design direction, the house design system, and preserved earlier sources |
| research/ | Evidence and UI/UX inspiration provenance |
| assets/ | Asset inventory and selection/QA records, not copies of app assets |
| journal/ | Dated records of meaningful work and its evidence |
| handovers/ | Resume instructions for interrupted or transferred work |
| templates/ | Short starting points; omit irrelevant sections |

Each project keeps implementation facts in its own docs/CONTEXT.md. Shared standards live here once. Specs describe intended behavior; code and fresh checks establish current behavior; decisions explain why. Record conflicts without silently rewriting history.

## Local checks

From the portfolio hub repository:

```sh
python3 scripts/check-docs.py
python3 -m unittest discover -s scripts -p 'test_check_docs.py'
```

Add `--workspace` to the first command when all registered sibling folders are present. Standalone checks require no app dependencies, browser, or sibling repositories. Cross-project local paths are navigation aids for this workspace; the registry and project index also identify the source repositories.

## Evidence and history

Keep dated records, and append corrections or superseding decisions. A proposal is not a user decision. A README measurement is not a fresh test result. Do not reconstruct missing approvals from chat fragments. This repository's documentation is public. Job-search strategy, playbooks, application records and secrets stay in the private workspace `_career/` folder. The initial documentation setup is recorded in [SPEC-0001](specs/SPEC-0001-living-documentation.md).
