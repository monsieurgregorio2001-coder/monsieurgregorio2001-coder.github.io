# ADR-0003: Hiring outcome, parallel work, and private operations

Date: 2026-10-20 (Asia/Manila)
State: accepted for planning architecture
Authority: Garfield explicitly asked for a roadmap to obtain jobs through portfolio polish, job search, customized documents, applications, and tracking. The sequencing and storage design below are agent choices within the planning request.
Related: [SPEC-0004](../specs/SPEC-0004-hiring-roadmap.md)
Supersedes: No prior record; extends ADR-0001/0002 without changing project boundaries.

## Context

A portfolio-only backlog can absorb time without creating hiring conversations. The workspace has public project proof and a resume seed, but no confirmed hiring constraints, reviewed document release, qualified opportunity queue, or established live tracker was found. Actual employment evidence, compensation preferences, and application records should not live in public project documentation.

## Decision

Use a hiring roadmap in which essential portfolio readiness and sourcing overlap. Start application execution when the selected public proof path and job-specific truthful packet are ready. Defer optional imagery, renames, and room migrations unless they solve a concrete hiring obstacle.

Keep public-safe strategy and process in docs/portfolio/roadmap/ and hiring/. Initialize private operational records in the local workspace _career/, outside the public repository. Keep application state once in tracker/applications.json, event history in events.jsonl, and exact final packets versioned by job. Do not build a custom job-tracking application before there is an operational need.

## Alternatives and consequences

Completing every redesign before searching would delay feedback. Generic mass applications would obscure fit and truthfulness. Putting live applications into the public repository would mix personal operations with portfolio documentation. Creating a new external task system would add setup and access dependencies before the workflow is tested.

The chosen approach supports a small first batch and evidence-led iteration with local files. The private workspace and uncommitted project work must be transferred explicitly at handover; no remote backup or automation is implied. A future agent may migrate the tracker or change defaults when useful, preserving IDs, history, and exact submission evidence.

## What remains proposed or unknown

Role lanes, seniority, compensation, geography, employment arrangement, availability, weekly capacity, scoring thresholds, and application volume are not established user preferences. The public-versus-private baseline resume disclosure choice also remains to be decided. Planning does not confirm current employment claims, accept an offer, or execute an application.
