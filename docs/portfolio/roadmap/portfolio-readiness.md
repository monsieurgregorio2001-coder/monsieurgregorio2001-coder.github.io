# Portfolio readiness workstream

Updated: 2026-10-20 (Asia/Manila)
State: planned. Every implementation task and launch check below is unrun.
Owner: the executing portfolio agent; Garfield owns career facts and design choices.

The outcome is a credible portfolio that helps a hiring reviewer understand the candidate, inspect relevant work, retrieve a usable resume, and make contact. The confirmed [positioning brief](positioning.md) adds the intended throughline: considered product choices, judgment, people skills, conceptualization, and systematic thinking, visible in evidence and the finish of the work. A complete visual reinvention is not the launch gate. Use this workstream with the [overall roadmap](README.md), [current state](../CURRENT-STATE.md), and [working protocol](../WORKFLOW.md).

This is a plan based on local source inspection. It does not establish that public demos are available today, that historical measurements still pass, or that any product change has shipped. Keep private career records and application documents in the private career workspace defined by the overall roadmap. This public file contains only implementation priorities and safe evidence requirements.

## Evidence baseline and uncertainties

| Surface | Observed source | Implication for the next agent |
| --- | --- | --- |
| Positioning | [Hub page](../../../index.html) describes applied AI, agents, RAG, MCP, and full-stack delivery. | Use this as the existing positioning hypothesis; confirm target roles in the career workstream before optimizing for a particular vacancy. |
| Portfolio entry | The hub has project cards, short about text, and contact links. No resume download appears in the inspected HTML. | Provide an approved public resume or a clear privacy-respecting request route; make the most relevant proof easy to identify without a redesign. |
| Public delivery | [Project data](../../../projects.json) uses live labels; `paperlab/README.md` and `slop-editorial/README.md` also contain statements that deployment workflows have not run. | Treat this as a documentation conflict. Check actual public routes and deployment evidence before deciding whether a deployment is missing or only the README is stale. |
| Project metrics | Slop's hub card says 147 browser checks; its README introduction says 143 and its measurement table says 150, dated 2026-10-14. Other project metrics are also inherited measurements. | Reconcile date, revision, method, and scope. No number becomes a fresh result because it appears in this roadmap. |
| Editorial curation provenance | `slop-editorial/site/src/pages/about.astro` states the images were personally checked and briefs/checks/rejects are in the repository, while this handover has no full V3 brief or QA trail. | Recover the actual provenance or qualify the wording. This is an unsubstantiated claim in the current handover, not proof that a prior review never happened. |
| AI reminder behavior | `paluwagan/src/domain/reminders.ts` labels Claude drafts as pre-generated and implements templates with no runtime model call. Its README says delivery is simulated. | AI-assisted authorship may be accurate; describe the implemented boundary explicitly. Do not imply a live LLM integration or real delivery. |
| MCP evidence | `mindmap-mcp/README.md` describes a local app and a scripted 160-call benchmark. There is no hosted demo. | A reliable quick start, sample graph, and honest walkthrough are sufficient. Hosting a stateful SQLite service is not required for credibility. Keep local benchmark context attached. |
| Resume source | `_resume-src/data.js` and `_resume-src/build.js` exist; no generated DOCX/PDF was found in the workspace artifact scan. The generator creates DOCX and HTML, depends on `docx`, and uses a home-directory font path. | Treat this as a source seed, not an approved deliverable. Verify dependencies, rendered output, readable extracted text, working links, and an intentional output location. Do not expose private source facts while adding a public download. |
| Redesign and images | [Design sources](../design/README.md) leave the relationship between the earlier style and Five Rooms unresolved. The [image inventory](../assets/IMAGE-INVENTORY.md) records nine unreviewed originals with an incomplete V3 brief. | Neither a design direction nor image approval is established. Preserve the current implementation while making independent usability fixes. |

Workspace paths in code refer to sibling folders or private source material; they are not assumed to exist in a standalone hub clone. Use the [project registry](../projects/registry.json) for repository identities and verification entry points.

## P0: Credible hiring release

All seven requirements are planned. The estimates below assume installed tooling, working account access, mostly functioning demos, and small repairs. They are focus-hour planning allowances, not delivery promises.

| ID | Intended outcome and acceptance evidence | Affected repositories or sources | Dependencies | Initial allowance |
| --- | --- | --- | --- | --- |
| POL-01 | Every prominent demo, repository, resume, and contact route leads where its label promises. Record a dated public-route check, final destination, observed result, and deployment reference where available. Repair broken destinations or describe honest availability. | Hub; linked project repositories; profile README | None; account access only if a repair needs it | 0.75 h |
| POL-02 | Published claims agree across the hub, project READMEs, profile, and approved resume. Every retained exact metric has a dated method and scope; unsupported claims are qualified or removed. Keep sensitive employment substantiation private. | Hub; `paperlab/`; `paluwagan/`; `mindmap-mcp/`; `slop-editorial/`; `profile-readme/`; private resume source | Career facts confirmed where needed; source evidence or fresh check for contested claims | 1.5 h in claims/resume lane |
| POL-03 | A reviewed baseline resume exists for applications. The hub offers an approved public download or a clear resume request/contact route if Garfield keeps it private. Any downloaded/submitted file is legible, has selectable/extractable text and usable links, and agrees with confirmed claims. Record output version, disclosure choice, and checks. | Hub; `_resume-src/` as a legacy seed; private resume workspace | POL-02 for included facts; approved public content and output format | 1.5 h in claims/resume lane |
| POL-04 | The entry page clearly states the relevant role and leads to the strongest work, resume, and contact action. Each featured project explains its problem, individual contribution, a meaningful product/system choice, evidence, and limits without requiring a repository read. The overall presentation is edited and coherent, following the positioning brief. Verify the rendered page and data-loaded cards. | Hub; profile README if its summary becomes stale | Target-role hypothesis; POL-02; POL-03 for resume destination | 0.75 h |
| POL-05 | Core hiring journeys work on phone and desktop, with keyboard access, visible focus, readable text, no obstructive animation, and no page-level horizontal overflow. Check reduced motion where applicable, project-card loading and failure behavior, and contact actions. Record screenshots, browser/viewport, date, and unresolved defects. | Hub; only affected project interfaces | POL-01 identifies routes; product changes require focused acceptance criteria | 1.5 h |
| POL-06 | Each featured project has an inspectable, accurate proof path. Smoke-test the core scenario using sample data. For MCP, verify the documented local setup and a sample graph/tool interaction; a local app is a valid destination. Mark demo, toy-model, mock-provider, simulated-send, and benchmark limits where relevant. | Featured project repositories and their hub cards | Tooling and sample data; POL-02 defines claims to demonstrate | 1.5 h |
| POL-07 | The selected release has a reviewable diff, appropriate passing checks, a release/deployment reference, and a final check of the public hiring journey. Distinguish checked, failed, and unrun results. Preserve unrelated work and leave exact resume instructions for remaining tasks. | Hub and repositories changed in the slice | POL-01 through POL-06 for the advertised scope; release access/authorization | 1.5 h |

The initial usability/release lane totals about **6 focus hours** across POL-01 and POL-04 through POL-07. POL-02 and POL-03 add about **3 focus hours** for claims and a baseline resume. This 9-hour allocation can fit inside the overall roadmap's illustrative 15-hour first week, leaving room for job discovery and application operations. A broken build, missing deployment access, unclear career facts, or substantial resume repair can exceed it. If that happens, report the specific blocker, remaining effort, and the smallest credible scope; do not silently consume the sourcing/application allocation with redesign work.

### What POL-02 must reconcile

Use one claim identifier per assertion in the private claims record. Safe implementation measurements can have a public evidence summary. Capture the source, date, revision, method, limitations, owner, and disposition: retain, qualify, replace, or remove.

- Resolve the Slop browser-count disagreement rather than selecting the largest value. Historical counts may describe different revisions or scopes.
- Attach machine and workload context to the MCP benchmark. It is a scripted local round trip, not evidence of production traffic or user adoption.
- Keep PaperLab's random toy weights and simplified tokenizer explicit. Its math and explanatory interface are the proof.
- Describe Paluwagan's pre-generated AI-assisted templates, local storage, simulated sends, and ledger invariants accurately. Its implemented engineering value does not require a runtime LLM.
- Reconcile Slop's public claim of personal image checks and available briefs/rejects with the actual evidence. Do not present verified curation as a taste proof while its trail is missing.
- Preserve Slop's mock/sample-data boundaries and unrun live-provider/WebGPU limits. Staged publication metrics are part of the satire, not candidate outcomes.
- Confirm private career statements with Garfield and available records. Do not invent business impact, adopt unsourced numbers, publish employer/client details, or imply permission to disclose internal work.
- Update contradictory README delivery language only after inspecting the actual public result. A local build and an existing workflow file do not establish deployment.

Do not rerun every untouched application suite merely to refresh a number for marketing. An old metric can remain as an explicitly dated observation with evidence, or be omitted. Run fresh checks when behavior changes, the claim is contested, or the launch journey needs verification.

### Launch gate

The portfolio is application-ready for a defined target-role slice when the executing agent can record all of the following as passed, with evidence:

1. The hub loads at its advertised public URL; featured work and repository links are accessible and accurately labelled. A blocked demo is repaired, replaced by a usable proof path, or removed from the launch scope.
2. A reviewer can understand the role, identify at least two relevant proof examples, retrieve the approved public resume or use its explicit request route, and reach the intended contact destination. A reviewed private baseline is available for applications; resume facts and public project copy match the confirmed claim set.
3. The core phone, desktop, keyboard, and relevant reduced-motion journeys have been exercised. There are no unresolved defects that prevent reading, navigation, demo access, resume retrieval, or contact.
4. A featured project's distinction between real computation and illustrative/sample behavior is explicit. Exact metrics have their date and scope; unavailable evidence is not presented as verified.
5. Required checks for changed code pass. The public release matches the verified change, and the final public smoke check records the release reference and date.
6. Public materials contain only approved public facts and assets. Private application documents, career evidence, internal production details, and credentials are absent from the public diff and outputs.

Record each item as passed, failed, or unrun, with the requirement IDs, method, artifact path, date, and revision. A failed launch requirement blocks calling the selected release ready; it does not block job discovery or private document preparation. A discovered issue that does not affect these journeys can move to P1 with its consequence recorded. A local check never substitutes for the public release check.

This plan does not itself publish a release or submit an application. Follow the active task's authorization when executing. Use the [working protocol](../WORKFLOW.md) to size specs and decisions; the roadmap is not a requirement to create paperwork for each small fix.

## P1: Strengthen proof after the first credible release

These tasks are planned and may move earlier only when a target vacancy or launch defect makes their value concrete.

| ID | Outcome and evidence method | Affected repositories or sources | Dependency / do-later criterion | Rough focus hours |
| --- | --- | --- | --- | --- |
| POL-08 | Publish two focused case studies for the strongest role-relevant work. Explain problem, ownership, concept, constraints, alternatives, collaboration where evidenced, implementation, validation, result, and limits. Make a real decision and its effect visible. Use real artifacts or clearly labelled diagrams, then check readability and links. | Hub; selected projects; private story evidence where applicable | Begin after the claims baseline. Prefer an existing credible project or permitted anonymized production story; do later if it merely repeats the card without adding proof. | 4–6 |
| POL-09 | Add a short, reproducible MCP walkthrough or captioned recording using sample data. Show a real tool interaction, provenance, and duplicate handling. Record setup version and distinguish a replay from an illustration. Retain quick-start access alongside it. | `mindmap-mcp/`; hub public media/case study | POL-06 first. Useful when reviewers otherwise cannot inspect the local app. No hosted SQLite deployment is required. | 1–2, assuming setup works |
| POL-10 | Refresh selected screenshots and thumbnails so cards accurately match the released UI. Optimize and inspect mobile/desktop crops, alt text, and load behavior. Record capture revision. | Hub assets; selected project media; `profile-readme/` if needed | After the relevant release. Do later while existing images remain accurate and legible. | 1–2 |
| POL-11 | Resolve the exact inspirations used by the selected release and update public credits for adopted work. Record source URL, specific idea, implementation location, and any reused asset/license in the [inspiration register](../research/INSPIRATIONS.md). | Hub; affected project READMEs | Depends on actual adoption, not named research leads. Credits required for assets used in the release belong in that release's P0 scope; broad historical reference recovery can wait. | 1–2 initially |

Production-story evidence requires permission to disclose the particular content and an appropriate anonymization review. Use synthetic/sample records in screenshots. If disclosure is unavailable, document the limitation and use the public projects. Do not create a fictional RAG repository or invent production results to fill a positioning gap.

## P2: Optional design and expansion

| ID | Possible outcome and evidence method | Affected sources | Start only when / do-later criterion | Estimate assumptions |
| --- | --- | --- | --- | --- |
| POL-12 | Adopt a bounded Five Rooms or other visual slice with an explicit design decision, acceptance criteria, and preserved math/ledger behavior. Verify browser fallbacks, motion, accessibility, performance, and public delivery. | `five-rooms-poc/`; selected real project repositories; [design sources](../design/README.md) | Garfield chooses the direction for the relevant scope. Neither the earlier shared style nor Five Rooms is treated as approved by this roadmap. Wait while current presentation passes the hiring gate or sourcing has higher value. | Scope separately; roughly 8–20 h for one meaningful slice can still be exceeded. |
| POL-13 | Recover the V3 brief, map slots, inspect existing originals, record QA dispositions, and integrate selected images with traceable destinations and release evidence. | `slop-editorial/incoming/`; [SPEC-0002](../specs/SPEC-0002-image-review.md); [inventory](../assets/IMAGE-INVENTORY.md) | The selected Slop release actually needs the replacement. Existing assets that pass the hiring gate allow deferral. Do not generate replacements before inspecting originals and recovering requirements. | 2–4 h for recovery/QA if the brief is available; regeneration, waiting time, and integration are extra. |
| POL-14 | Resolve Living Mindmap/Kuru naming, intended reference, public credits, and cross-surface consistency through a documented decision and focused change. | `mindmap-mcp/`; hub; profile; resume references | An actual naming decision exists. Preserve the established name in the meantime; do not make a speculative rename a hiring dependency. | 1–2 h for a small consistent rename; route/repository changes need separate scoping. |
| POL-15 | Add or deepen technical proof against an observed target-job requirement, with a real evaluation and honest limitations. | Chosen existing project, or a separately scoped project only if justified | Several relevant vacancies or interview feedback reveal the same evidence gap. Prefer a focused addition to existing work over a new portfolio project. | Unknown until the gap and success measure are defined. |

## Execution and handover record

For the next slice, select the requirement IDs, affected files, expected outcome, dependencies, and a focus-hour limit. Inspect Git status first; the prior documentation changes and incoming images may be uncommitted. Preserve originals and stage only deliberate paths.

Use the [registry](../projects/registry.json) and local project READMEs to select checks. Hub-only copy/link changes need the documentation check and an actual rendered/public-route review. Changed calculations need their domain tests; changed MCP behavior needs MCP verification; changed project interactions need the affected browser walkthrough. Record the commands actually run and their results rather than copying README measurements.

At handover, update the current priorities and provide: completed/remaining requirement IDs, evidence and release references, unresolved defects, exact next action, missing inputs and who can resolve them, time spent against the allowance, and any changed estimate. Keep application or employer-specific facts in the private career workspace. No launch requirement is complete until its evidence exists.
