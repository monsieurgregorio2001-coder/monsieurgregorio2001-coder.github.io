# Journal: Documentation reconciliation

Date: 2026-10-20 (Asia/Manila)

The October 20 documentation had been written on a hub checkout that was 32 commits behind `origin/main`, so it described a site that no longer existed and duplicated the October 15 docs system. Work done:

- Committed the local documentation on `docs/reconcile-2026-10-20` and merged `origin/main`.
- Kept both scopes with a clear boundary: `docs/` for the hub site, `docs/portfolio/` for the whole portfolio. Rewrote `docs/README.md` as a map of both.
- Merged `CLAUDE.md` rules into `AGENTS.md` and made `CLAUDE.md` an import, so one rule set serves every agent.
- Moved job-search material to the private workspace and retired its IDs here, because GitHub Pages publishes everything in this repository.
- Rewrote `docs/CONTEXT.md`, `CURRENT-STATE.md` and the latest handover to match the deployed site.

Verification: `python3 scripts/check-docs.py` and `--workspace` (results recorded in the commit).
