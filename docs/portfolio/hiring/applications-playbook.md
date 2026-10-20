# Applications playbook

Updated: 2026-10-20 (Asia/Manila). Process design; no job search, application, outreach, or submission is recorded as completed by this document.

Return to the [hiring index](README.md). Use the [tracker contract](tracker-contract.md) for canonical records, transitions, evidence, and recovery.

## Outcome and operating scope

Turn credible work into suitable opportunities, tailored applications, interviews, and offers. Learn from the funnel and change the next useful slice. Start sourcing alongside essential portfolio polish; a complete redesign of every project is not an application prerequisite.

The present task authorizes planning and handover preparation. Future execution must use the actual user delegation, candidate facts, and available tools. Record that scope privately before acting. A clear delegation can cover a batch or class of applications; this process adds no mandatory approval ceremony for every job. An unresolved factual answer or a declaration requiring personal knowledge must be resolved with actual user data. Never infer consent to accept an offer or make a new material commitment from consent to apply.

Keep candidate facts, target preferences, applications, correspondence, and employer material in the workspace's local `_career/` area, outside public repositories. This public guide contains reusable process only. A Git ignore is not privacy for material that has been committed.

## Candidate baseline

Use the [confirmed positioning brief](../roadmap/positioning.md) across all variants. Frame supported work through taste/judgment, problem conceptualization, communication, and system design. Adapt the examples to AI engineering, builder, architecture, or GTM responsibilities without inventing lane-specific experience or changing the candidate's actual employment history.


Before dependent execution, establish a private candidate profile with the source and confirmation date for:

- Confirmed broad role families from the positioning brief; remaining seniority, employment-type preferences, and exclusions. A narrow title commitment is not required before discovery.
- Location, work authorization, sponsorship requirements, and relocation preferences.
- Working-hour overlap, schedule limits, compensation floor/target with currency and units, notice period, and start availability.
- Current experience dates, contact details, public links, and evidence-backed claims.
- Recurring form answers and which declarations require the user's direct response.
- Execution scope: permitted application channels, outreach scope, and any explicit limits.

Unknown facts remain unknown. They should not prevent unrelated research or drafting. Keep one current profile; application records can reference its relevant version or dated facts.

## 1. Discover and preserve the source

Research roles using live information at execution time. Prefer the employer's career page or authoritative applicant-tracking-system posting. An aggregator can be a discovery source; verify the employer destination before tailoring or submitting.

For each plausible role:

1. Search the existing tracker for its employer and requisition before creating a record.
2. Assign a stable application ID and capture the original and canonical URLs.
3. Preserve a dated posting snapshot or relevant excerpts in `source/job.md`: responsibilities, requirements, location, employment arrangement, compensation if stated, closing date if stated, employer instructions, and the source checked.
4. Record whether the opening is active, closed, or uncertain. A search-engine result alone is not proof that it remains open.
5. Record the next action and owner in the canonical tracker.

Do not fabricate salary, dates, recruiter contacts, or eligibility details to fill empty fields. Preserve enough source evidence to understand later changes without copying unnecessary personal material.

## 2. Qualify before investing in tailoring

Check hard eligibility before ranking fit. Each check has `pass`, `fail`, or `unknown`, a reason, a source reference, and a checked date.

| Check | Decision rule |
| --- | --- |
| Opening active | Recheck before submission; closed roles cannot become ready |
| Location and authorization | Remote does not mean worldwide eligibility; confirm geography and any sponsorship/clearance conditions |
| Employment arrangement | Compare stated arrangement with candidate constraints |
| Schedule and start date | Use actual overlap, availability, and notice-period facts |
| Explicit non-negotiable requirements | Assess what the employer actually requires, including any stated equivalents; do not invent an equivalence |
| Compensation | A known violation of a hard floor is a failure; undisclosed pay remains unknown, with a clarification action where material |
| Application instructions | Respect requested channel, documents, duplicate-application rules, and applicable deadlines |

A hard failure is not rescued by a high fit score. An unknown essential eligibility condition prevents `ready`. Distinguish a true prerequisite from a preferred technology or aspirational years-of-experience line; document the interpretation and its evidence.

Use rubric `fit-v1` for prioritization once enough information exists:

| Category | Weight | What earns a strong assessment |
| --- | ---: | --- |
| Actual work and technical match | 30 | Responsibilities align with demonstrated capabilities |
| Strength of available evidence | 25 | Relevant work can be explained and supported with credible artifacts |
| Scope and seniority | 20 | Ownership and expected depth fit the candidate's actual experience |
| Practical preferences | 15 | Arrangement, schedule, and other known preferences fit |
| Career direction | 10 | The opportunity supports the user's stated direction |

Score assessed categories from 0 to 5 and calculate `sum(weight × category_score / 5)`. Record reasons and evidence in `requirements.md`; keep only the result and concise rationale in the tracker. Unknown categories are unassessed, not invented scores. Keep the total `null` until all five categories are assessed; qualitative priority can still guide research. Compensation is a separate explicit check rather than a fabricated numeric benefit for undisclosed pay.

Proposed initial thresholds are 75+ pursue, 60–74 selective review, below 60 defer unless a documented reason warrants an exception. Calibrate these defaults with real results; they are not a user-selected policy or a hiring prediction.

## 3. Shortlist and map requirements to proof

Select a bounded batch that can be tailored well. Prioritize deadlines, fit, evidence strength, and effort rather than the number of discovered links. Record one next action and owner for every active record.

For each shortlisted role, build `requirements.md` with:

| Employer need | Candidate claim IDs | Evidence | Placement in packet | Gap or question |
| --- | --- | --- | --- | --- |
| Specific requirement from the posting | Stable references to the claim registry | Source or artifact | Resume, project link, cover letter, or answer | Honest limitation or unresolved fact |

Choose relevant projects and experience. Demonstrate the ability to reason about decisions, tradeoffs, and reliability. Do not let decorative work or unrelated project completeness delay applications that already have sufficient proof.

## 4. Tailor documents from supported facts

Use a private claim registry. A claim should identify its text, type, source, verification status, checked date, scope/units, and any limits on public use. Useful statuses are `verified`, `user-confirmed`, `source-asserted`, `stale`, and `unsupported`.

Tailoring selects, orders, and explains real experience. It must not manufacture employment, technology usage, impact, team sizes, dates, qualifications, or results. Include the source ID for every consequential experience or quantified claim in the internal requirement map.

Check particularly:

- Roles marked Present and concurrent part-time or contract work.
- Quantified outcomes, including what was measured and over which scope and period.
- Project test/performance claims against dated evidence and the relevant code or deployment.
- Whether a proposed project rename actually shipped.
- The distinction between employer work, independent projects, demos, and prototypes.
- Whether employer information is permitted to appear in public case studies or application documents.

Store job-specific resume source and requested exports in the application packet. Produce PDF/DOCX according to employer requirements; use an appropriate artifact workflow and visual verification when generating those formats. Cover letters and supplementary documents should address a real request or benefit. Do not create paperwork solely to satisfy the directory tree.

Keep `answers.md` for the actual factual answers used or needed. Do not fill work-authorization, compensation, availability, background, or personal declarations from assumptions. Use user-provided data for attestations and direct declarations; personal-signature or consent steps should be handled according to their actual requirements.

## 5. Validate and freeze the packet

Before `ready`, verify:

1. The posting is active and essential eligibility checks pass.
2. The packet addresses the role's actual requirements, with gaps described honestly.
3. Contacts, dates, employer/role names, links, and factual answers agree with current sources.
4. Required files exist in the accepted formats; their visible layout and extracted text/read order are usable.
5. Filenames and contents contain no placeholders, accidental prior-employer references, or incorrect attachments.
6. Execution scope covers the intended application and channel.
7. Duplicate checks and required employer instructions are satisfied.

Freeze a version with a manifest listing the exact files and SHA-256 hashes. A packet is immutable after it is used in a submission attempt. Corrections create a new version; they never overwrite what was sent. The [tracker contract](tracker-contract.md) defines packet and manifest paths.

## 6. Submit with evidence and retry protection

An execution agent must reconcile any existing `submitting` or `submission-unknown` records before starting another attempt for that opportunity.

1. Recheck the opening, employer instructions, deduplication key, previous attempts, and application portal history where accessible.
2. Confirm the final packet and answers. Record an owned attempt and transition to `submitting` before the final external action.
3. Perform the intended submission once.
4. Save confirmation evidence immediately: confirmation page, receipt, reference number, or authoritative portal state.
5. Record the result and next action. Use `submitted` only when the evidence supports completion.

A populated form or a clicked button is not a confirmed submission. If a browser times out after the final action, use `submission-unknown`. Check portal history and authorized confirmation-mail access before deciding whether another attempt is safe. Missing success UI is not evidence of failure. Record any correction to already-submitted material as a new event and preserve the original packet.

## 7. Follow through and prepare for interviews

At each work session, check responses and deadlines, reconcile ambiguous attempts, and advance the highest-value actionable item. A follow-up plan is not authorization to message someone; use the actual delegated outreach scope and available channels. Respect employer instructions and avoid repeated messages without a reason.

A proposed first follow-up review is approximately one business week after submission where appropriate. Set an actual next action rather than silently installing a reminder or automation. Silence is not employer rejection. If a role is administratively archived for inactivity, retain the last confirmed employer state and label the reason `no-response` or equivalent.

For a screening or interview:

- Save confirmed time, timezone, channel, attendees where known, format, and required preparation.
- Prepare relevant project walkthroughs, evidence-backed impact examples, technical tradeoffs, and questions for the role.
- Record rounds as events on the same application rather than creating duplicate applications.
- Afterward, record what was asked, what went well, gaps, stated feedback, deadlines, and the next action.
- Distinguish employer feedback from the candidate's or agent's interpretation.
- Feed recurring gaps back into interview practice, resume clarity, portfolio proof, or targeting.

Record offers and their actual terms privately. Do not mark an offer accepted or make a material commitment without the user's decision.

## 8. Review the funnel and change the next slice

Start with a small calibration batch; the first proposed batch is 1–2 high-fit applications, expanding to a cumulative 3–5 once actual effort and fit are observed. Set a sustainable throughput target after observing real tailoring time and response quality. Application count is an activity measure, not the goal.

Weekly review should cover:

| Measure | Definition and use |
| --- | --- |
| Eligible roles qualified | Count with completed hard checks; track exclusion reasons to improve sourcing |
| Shortlist age and blockers | Identify opportunities stuck before a packet exists |
| Validated submissions | Unique confirmed submissions, not attempts or clicks |
| Positive-response rate | Unique applications receiving a substantive positive employer response divided by the same submission cohort |
| Screening/interview progression | Unique applications reaching each stage, with the cohort and denominator stated |
| Offers | Actual offers, tracked separately from late-stage interviews |
| Tailoring effort | Time/effort per validated packet and where rework occurs |
| Overdue next actions | Deadlines missed or actions awaiting resolution |
| Evidence gaps | Repeated requirements or interview questions that lack convincing proof |

Use cohorts defined by submission date, role lane, and source where useful. Do not divide this week's replies by this week's new applications. A provisional 14–21-day response observation window can help compare mature cohorts; state the actual window, report pending records separately, and label small samples. Do not treat a lack of response in that window as a confirmed rejection.

Change one explainable part of the process when possible: sourcing, role fit, resume framing, proof, or interview preparation. Record the hypothesis and resulting evidence. Do not redesign the entire portfolio because a handful of applications received no answer.

## Recovery and handover

| Condition | Recovery |
| --- | --- |
| Posting expired | Preserve the snapshot and archive with source evidence |
| Missing factual answer | Block the dependent step; continue independent preparation |
| Portal access, verification, or CAPTCHA problem | Preserve work and give the user an exact resume step where their participation is required |
| Final action outcome ambiguous | Use `submission-unknown`; reconcile before retrying |
| Wrong attachment or answer already sent | Preserve the original; assess the employer's correction channel before acting |
| Source fact becomes stale or contradicted | Correct the source and affected drafts; assess submitted packets separately |
| No responses | Review mature-cohort targeting, evidence, and presentation |
| Screens without progression | Review role fit, screening answers, and interview evidence |
| Interviews without offers | Use specific feedback to adjust preparation and demonstrated depth |

A private handover names the canonical tracker, candidate baseline/version, current authorization scope, in-flight attempts, active IDs and next actions, deadlines, exact packet versions, unresolved questions, and the next recommended slice. It links records instead of copying statuses. The public roadmap can describe the stage of work without disclosing private application details.
