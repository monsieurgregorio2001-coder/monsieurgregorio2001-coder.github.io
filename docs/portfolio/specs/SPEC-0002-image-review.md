# SPEC-0002: Recover V3 brief and review incoming images

State: draft
Date: 2026-10-20
Source: historical task pasted by Garfield; not a complete image brief.

## Problem

The old conversation asks for nine generated images. Nine files already exist, but the exact prompts, slot mapping, QA, and approval evidence are missing.

## Proposed requirements

- IMG-01: Recover the full V3 prompt, filename, and QA mapping for all nine slots. Preserve source and version.
- IMG-02: Inspect existing files first. Record exact digit/sun counts and text checks only where the recovered brief requires them.
- IMG-03: Keep filename, hash, brief slot, reviewer, date, disposition, and review evidence for every candidate.
- IMG-04: Only integrate selected assets after the relevant review and authorization. Verify the site and record a release reference if publication is part of the authorized task.

## Acceptance criteria before calling this complete

All nine slots have a source brief and an explicit QA disposition. Selected assets have a traceable destination and verification result. Any missing or rejected slots are listed honestly.

## Missing inputs

The complete V3 brief, original slot mapping, and any prior approvals. The quoted priority order 1, 2, 5, 9 cannot be mapped confidently to filenames. Account limits have not been checked. Generation and publication are outside the current documentation setup.

Inventory: [existing files](../assets/IMAGE-INVENTORY.md).
