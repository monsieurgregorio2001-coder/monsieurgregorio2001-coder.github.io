# Application tracker contract

Updated: 2026-10-20 (Asia/Manila). Schema version 1. This is an implementation contract for the next execution agent, not a record of completed applications.

Return to the [hiring index](README.md) or follow the [applications playbook](applications-playbook.md).

## One current-state source

The private workspace uses:

```text
_career/
  tracker/
    applications.json
    events.jsonl
  applications/
    APP-YYYY-####-company-role/
      source/job.md
      requirements.md
      answers.md
      versions/
        v001/
          resume-source.<format>
          resume.pdf                 # when required
          resume.docx                # when required
          other-requested-document.* # when useful or required
          manifest.json
      evidence/
```

`applications.json` is the canonical current-state source. `events.jsonl` is an append-only audit and recovery log, not a second editable task board. Handovers, packet notes, and dashboards reference the canonical application ID; they must not introduce a competing current status. Derived views should identify their generation time.

All paths stored in private records are relative to `_career/`. Public documentation names the private area without linking to or reproducing its contents. Do not initialize the whole portfolio workspace as a Git repository to track this material. Decide private backup separately; local files alone are not a remote backup.

## File and identity rules

- `applications.json` contains exactly `{"schema_version": 1, "applications": []}` initially.
- Application IDs use `APP-YYYY-####`, where the year is the creation year in Asia/Manila and the four-digit number increases within that year. Never reuse an ID.
- The directory adds a lowercase kebab-case employer/role slug. The ID is identity; cosmetic title changes do not require a directory rename.
- Required fields exist even when unknown; unknown scalar values are `null`, not invented facts or empty strings. Empty collections use `[]`.
- Timestamps use ISO 8601 with an explicit offset. Use Asia/Manila for user-facing dates. Preserve an employer's original timezone/deadline wording in the source record.
- A date-only or timezone-uncertain deadline does not become a fabricated exact `closing_at`. Preserve the stated date in `source/job.md`, leave `closing_at` null, and set a prudent internal next action separately.
- Evidence references are relative private paths or authoritative source URLs, optionally with a fragment or short note. Check that local references actually exist.
- A due date is an intended internal action time; it is not evidence of an employer deadline.

## Canonical application fields

| Field | Type / allowed values | Meaning |
| --- | --- | --- |
| `id` | String | Stable application ID |
| `record_version` | Integer, starts at 1 | Increases once per accepted audit event affecting this record |
| `company` | String | Display employer name |
| `company_key` | String | Stable normalized employer identity; document ambiguous aliases |
| `role` | String | Posting's role title |
| `requisition_id` | String or null | Employer/ATS identifier, preserved without invented casing changes |
| `canonical_url` | String | Verified employer/ATS job URL |
| `source_urls` | Array of strings | Discovery URLs and cross-posts |
| `dedupe_key` | String | Computed identity under the deduplication rules below |
| `discovered_at` | Timestamp | When this opportunity entered the tracker |
| `last_verified_at` | Timestamp or null | Last live posting/essential-condition check; not an automatic freshness guarantee |
| `closing_at` | Timestamp or null | Exact employer deadline only when known |
| `location` | String or null | Stated location/geographic arrangement |
| `employment_type` | String or null | Stated arrangement |
| `lane` | String or null | Candidate's agreed target lane |
| `priority` | `high`, `normal`, `low`, or null | Work priority with rationale in the record |
| `status` | Enum below | Only canonical current status |
| `status_reason` | String | Why the current status is warranted |
| `resume_from_status` | Status or null | Prior working stage to reconsider after a block; never permission to bypass its checks |
| `owner` | String or null | Current responsible person/agent |
| `eligibility` | Object | Hard-check outcome and evidence |
| `fit` | Object | Rubric, numeric result where defensible, confidence, reasons |
| `packet` | Object | Application directory and currently selected immutable packet version |
| `submission_attempts` | Array of objects | All attempts, including ambiguous and unsuccessful ones |
| `submitted_at` | Timestamp or null | First confirmed successful submission time; do not replace with a later edit time |
| `next_action` | Object | One current action, owner, and due time |
| `last_event_id` | String or null | Last event incorporated into this snapshot; null only before initial registration |
| `updated_at` | Timestamp | Last accepted record update |

Nested shapes:

```json
{
  "eligibility": {
    "result": "unknown",
    "checks": [
      {
        "name": "location-and-work-authorization",
        "result": "unknown",
        "reason": "Essential condition has not been verified.",
        "source_ref": null,
        "checked_at": null
      }
    ]
  },
  "fit": {
    "rubric": "fit-v1",
    "score": null,
    "confidence": "unassessed",
    "reasons": []
  },
  "packet": {
    "path": "applications/APP-YYYY-####-company-role",
    "version": null,
    "manifest_path": null
  },
  "next_action": {
    "description": null,
    "owner": null,
    "due_at": null
  }
}
```

Eligibility results are `pass`, `fail`, or `unknown`. Overall `fail` means at least one applicable hard condition fails; overall `unknown` means an essential applicable condition remains unresolved; `pass` requires all applicable hard checks to pass. Explain conditions that do not apply rather than silently omitting an important check.

Fit confidence is `unassessed`, `provisional`, or `supported`. A score is a number from 0 to 100 or null. The detailed requirement map and score calculation live in `requirements.md`; the tracker stores concise reasons and the result. The [playbook](applications-playbook.md) defines `fit-v1`.

An active record needs a next action and owner. A terminal record can set them null when no further action remains. If active ownership or a necessary input is unavailable, represent the block explicitly rather than hiding an unowned task.

## Deduplication

Prefer `company_key + "::req::" + requisition_id` when a canonical employer/ATS identifier exists. Otherwise use `company_key + "::url::" + normalized_canonical_url` and perform a title/location/description comparison before registration.

Normalize cautiously: lowercase the URL scheme and host, remove a fragment where it does not identify the posting, and remove known tracking parameters such as `utm_*` and referral tags. Preserve path casing, meaningful job-identifying query parameters, and any uncertain parameters. Do not collapse distinct requisitions by dropping their IDs. Verify redirects to the authoritative posting.

Company keys collapse known aliases only with evidence; similar names do not prove the same employer. IDs from different ATS systems are not automatically equivalent. Multiple sources for the same opening belong in `source_urls` on one record. A new requisition with similar copy is reviewed as a possible repost, not automatically submitted again.

If duplicates are discovered later, keep the surviving application ID, archive the redundant record with the surviving ID in its reason/event, and preserve any submission history. Never delete evidence to make a duplicate disappear.

## Status meanings and allowed transitions

| Status | Required meaning | Ordinary next status |
| --- | --- | --- |
| `sourced` | Source and identity captured; not yet qualified | `qualifying` |
| `qualifying` | Eligibility and fit being assessed | `shortlisted`, `blocked`, `archived` |
| `shortlisted` | Worth tailored preparation, with a next action | `tailoring`, `blocked`, `archived` |
| `tailoring` | Requirement map and documents in progress | `ready`, `blocked`, `archived` |
| `ready` | Packet validated, essential facts resolved, execution scope covers submission | `submitting`, `tailoring`, `blocked`, `archived` |
| `submitting` | Owned attempt recorded before final external action | `submitted`, `submission-unknown`, `ready`, `blocked` |
| `submission-unknown` | Final action may have succeeded; outcome must be reconciled | `submitted`, `ready`, `blocked` |
| `submitted` | Authoritative completion evidence saved | `screening`, `interviewing`, `offer`, `rejected`, `withdrawn`, `archived`, `blocked` |
| `screening` | Employer screening is active | `interviewing`, `offer`, `rejected`, `withdrawn`, `blocked` |
| `interviewing` | One or more interview rounds active | `offer`, `rejected`, `withdrawn`, `blocked` |
| `offer` | Actual offer received; terms recorded privately | `accepted`, `withdrawn`, `rejected`, `blocked` |
| `accepted` | User explicitly accepted; decision source recorded | Terminal unless a real later change is documented |
| `blocked` | Necessary fact, access, ownership, or other dependency unavailable | Prior appropriate stage after its checks are re-evaluated |
| `rejected` | Employer explicitly rejected or rescinded; evidence recorded | Terminal unless employer reopens |
| `withdrawn` | Candidate ended pursuit or declined an offer; reason recorded | Terminal unless genuinely resumed |
| `archived` | Closed, unsuitable, duplicate, or administratively inactive; reason recorded | Requalification if genuinely reopened |

From pre-submission working stages, a discovered eligibility failure or closed role can move directly to `archived`; a deliberate candidate withdrawal can move to `withdrawn`. `sourced` can be archived immediately when obviously irrelevant. Working stages may return to an earlier preparation stage when new information invalidates readiness; explain why. Never use a backward transition to erase an external submission.

Employers sometimes skip stages. `submitted` may move directly to `interviewing`, `offer`, or `rejected` when evidence warrants it; do not invent intermediate events. Additional interview rounds are events while status remains `interviewing`.

`blocked` preserves `resume_from_status`; resolving a block re-evaluates the prior stage's gates. A block after an ambiguous final action must retain that ambiguity in the attempt history and cannot return to `ready` until non-submission is confirmed. `submission-unknown` is not a terminal outcome.

Declined offers use `withdrawn` with reason `offer-declined`. No response uses `archived` with reason `no-response` when administratively appropriate; it does not become a fabricated rejection. Reopening a terminal record requires evidence and a new event. If the employer creates a distinct requisition, assess whether a new linked application is needed.

## Packet versions and manifests

Mutable preparation files can live in the packet root. Each final packet lives under `versions/vNNN/`, with `manifest.json` alongside the files it describes. `packet.version` selects the current version and `packet.manifest_path` identifies its manifest. No mutable root-level manifest should compete with a versioned manifest.

Manifest shape:

```json
{
  "schema_version": 1,
  "application_id": "APP-YYYY-####",
  "packet_version": "v001",
  "frozen_at": "<ISO-8601 timestamp with offset>",
  "validated_by": "<person-or-agent>",
  "source_refs": ["applications/APP-YYYY-####-company-role/source/job.md"],
  "claim_refs": [],
  "files": [
    {
      "path": "applications/APP-YYYY-####-company-role/versions/v001/resume.pdf",
      "purpose": "resume",
      "sha256": "<64 lowercase hexadecimal characters>",
      "bytes": 0
    }
  ],
  "validation_ref": "<relative path to dated validation evidence>"
}
```

The example is illustrative, not a real packet. Hash the exact file bytes and record actual byte lengths. Include the actual answer snapshot and relevant source documents used by the attempt, not only the resume. Keep draft/source documents and exports tied together where they explain the submitted artifact. The manifest does not hash itself; the attempt records the manifest's SHA-256. Store manifests and referenced frozen files without later edits. A changed document or answer requires a new version and manifest.

## Submission attempt record

```json
{
  "attempt_id": "APP-YYYY-####-attempt-001",
  "owner": "<person-or-agent>",
  "started_at": "<ISO-8601 timestamp with offset>",
  "ended_at": null,
  "outcome": "in-progress",
  "packet_version": "v001",
  "manifest_sha256": "<64 lowercase hexadecimal characters>",
  "evidence_refs": []
}
```

Attempt outcomes are `in-progress`, `confirmed-submitted`, `confirmed-not-submitted`, or `unknown`. Preserve all attempts. Only one attempt per application can be in progress. A new attempt requires reconciliation of every earlier ambiguous attempt. A return from `submitting` or `submission-unknown` to `ready` requires evidence that the external submission did not complete, or that the final external action was never taken.

Evidence should identify the employer/role and completion state: a confirmation page, reference number, receipt, or authoritative portal history. Attach a screenshot or saved result where available and record its capture time. A form preview or button click does not establish success. Store the channel, submission URL, final answers, and any reference number in the attempt's evidence record. `submitted_at` uses the actual confirmed submission time if known; if evidence establishes only a date or time range, preserve it in evidence and leave the exact submitted_at null rather than inventing precision. Such a confirmed send still counts in total submissions; dated reporting uses a labelled approximate cohort when supportable or a date-unknown bucket.

## Append-only events

Each line of `events.jsonl` is one complete JSON object. Event IDs are unique strings, such as a timestamp plus random suffix; they are not reused. Required shape:

```json
{
  "event_id": "<unique-event-id>",
  "application_id": "APP-YYYY-####",
  "record_version": 2,
  "at": "<ISO-8601 timestamp with offset>",
  "actor": "<person-or-agent>",
  "type": "transition",
  "from_status": "sourced",
  "to_status": "qualifying",
  "reason": "Begin eligibility checks against the captured posting.",
  "changes": {
    "status": "qualifying",
    "status_reason": "Begin eligibility checks against the captured posting."
  },
  "evidence_refs": []
}
```

Types are `created`, `transition`, `updated`, `attempt-started`, `attempt-reconciled`, `packet-frozen`, `response`, `interview`, `follow-up`, and `correction`. For a non-status-changing event, `from_status` and `to_status` are the same. `created` uses `from_status: null`, version 1, and `changes` containing the complete initial record fields except the derived metadata described below.

`changes` replaces named top-level application fields, including entire nested objects when changed. This deliberately avoids an undocumented nested merge algorithm. The event's `application_id`, `record_version`, `event_id`, and `at` derive the snapshot's `id`, `record_version`, `last_event_id`, and `updated_at`; do not put competing values for those fields in `changes`. A replay applies changes in version order and then sets those four derived fields.

Record both status transitions and meaningful non-status changes, including response evidence, next actions, ownership, and packet selection. An event does not need to repeat every unchanged field. Corrections append a new event that references the mistaken event; do not edit or delete valid historical lines. Minimize unnecessary copies of personal or employer-sensitive content in the event log.

## Safe updates and multi-agent handover

Keep one writer at a time. Before changing the tracker:

1. Acquire an exclusive local writer lock for `_career/tracker/` using a tool-supported exclusive-create or equivalent operation. Record its owner and time; do not treat a plain existence check as an atomic lock.
2. Read the current snapshot and last relevant events. Reconcile any logged-but-unapplied event before preparing another change.
3. Confirm the record version still matches the version the writer read. Allocate the next version and validate the proposed state and evidence.
4. Append and durably save the event first.
5. Write the resulting full `applications.json` to a temporary file, validate it, then atomically replace the snapshot.
6. Release the writer lock. Do not hold it while browsing, waiting for the user, or submitting an external form.

Application ownership and an `in-progress` attempt protect external work after the short filesystem lock is released. A second agent must reconcile the owner/attempt before acting. A stale lock or owner is not permission to submit again. Verify that the previous writer/agent is no longer active, inspect the log and evidence, then record an ownership transfer.

If a crash occurs after event append but before snapshot replacement, replay the unapplied valid event. If a log ends with an incomplete line, preserve the original bytes, isolate the incomplete tail, and recover the valid event sequence before proceeding; do not silently discard history. A version gap, duplicate version with different content, or malformed snapshot requires reconciliation under the writer lock. Never repair such conflicts by choosing whichever file has the latest modification time.

This contract specifies the behavior; it does not claim a lock manager, validator, replay tool, or dashboard has already been implemented. A future implementation should test duplicate prevention, ambiguous attempts, illegal transitions, hash mismatches, and crash recovery rather than only its happy path.

## Validation and completion criteria

Before handing control to another agent, verify:

- Unique application IDs and deduplication keys, with documented exceptions resolved.
- Valid field types, status values, timestamps, paths, and event-version sequence.
- Every active record has an owner and concrete next action or an explicit block.
- `ready` has current essential checks, supported facts, a validated packet, and applicable execution scope.
- `submitting` has an owned attempt and immutable packet references before any final external action.
- `submitted` has confirmation evidence; unresolved attempts remain visible.
- Packet and manifest hashes match the exact preserved bytes.
- Current tracker state agrees with the last applied event.
- Handover references canonical IDs and facts rather than copying a second task board.

Zero applications is a valid planning-stage tracker. No sample employer, fabricated submission, placeholder confirmation, or synthetic success event should be inserted to demonstrate progress.
