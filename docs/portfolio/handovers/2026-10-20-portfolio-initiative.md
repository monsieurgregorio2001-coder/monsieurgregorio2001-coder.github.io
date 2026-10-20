# Handover: Portfolio initiative and docs reconciliation

Date: 2026-10-20 (Asia/Manila)

## What happened

- The local hub checkout was 32 commits behind the deployed site. The October 20 documentation was committed on branch `docs/reconcile-2026-10-20` and `origin/main` was merged into it. Conflicts in `.gitignore` and `README.md` were resolved by keeping both sides.
- The two documentation systems were reconciled: hub-site records stay in `docs/` (plan, decisions `0001` and up, audits, tracker, changelog), cross-project memory stays in `docs/portfolio/`. `CLAUDE.md` now imports `AGENTS.md`, which merges the October 15 conventions with the October 20 entry point.
- Job-search documents (roadmap, positioning, hiring playbooks, market calibration, ADR-0003, ADR-0004, SPEC-0004 and their journal and handover records) moved to the private workspace `_career/strategy/`. Their IDs are retired in the public indexes.
- Hands-on audits and research for the new initiative were run. Their raw outputs are session scratch files. The synthesis lives in the direction and plan documents.

## Resume

1. Read [current state](../CURRENT-STATE.md), then the direction in [design/](../design/README.md) and the active plan in [plans/](../plans/) once they exist.
2. Check `git status` in every repository. The hub reconciliation branch may not be pushed yet.
3. Use Node 22 for project work (`/opt/homebrew/opt/node@22/bin`). The default `nvm` Node 18 cannot run Astro 7, Playwright or the Living Mindmap native module.
