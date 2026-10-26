---
doc: checklist
status: approved
created_at: 2026-10-25
---

# Build Checklist

Build mode: fast, explicitly selected by owner X on October 25, 2026. Fast mode retains mechanical verification and Git commits after every slice, early and final hands-on reviews, and the learning wrap-up; it reduces per-slice explanation rather than removing owner involvement. The owner also approved the existing three-slice order and git init within the isolated Project #02 workspace.

## Slices

- [ ] **1. Create and export a first business website**
  Becomes usable: The editor starts locally, asks “What would you like to create today?”, accepts a website brief and business details, previews a Clean Professional page, and exports a standalone HTML file that opens offline. Safe text handling, validated contact targets, and the three-service limit are included from the first usable version.
  Why now: This delivers the unique edit-preview-export kernel immediately while bootstrapping the app inside the same slice. Safe rendering and safe link construction are foundational and must not be postponed.
  PRD ref: `prd.md > The Core Journey`; `prd.md > Features and Behavior > Creation and Business Details`; `prd.md > Features and Behavior > Standalone HTML Export`; `prd.md > States and Boundaries`.
  Spec ref: `spec.md > Where It Runs and How Someone Tries It`; `spec.md > Components > App Shell and Creation Prompt`; `spec.md > Components > Business Details Editor`; `spec.md > Components > Theme Renderer and Live Preview`; `spec.md > Components > Contact Validation and Link Builder`; `spec.md > Components > Standalone HTML Exporter`; `spec.md > File Structure`.
  Build: Inspect the target project’s git status before edits; scaffold the approved static HTML/CSS/JavaScript structure; add the loopback-only launcher and simple README; implement the creation prompt, editable fields, service limit, Clean Professional preview, safe contact links, and standalone export. Add focused dependency-free automated tests using Node’s built-in test runner; Node v24.21.0 is present on MONSTER as a test tool only, not an app runtime.
  Verify (mechanical): Run `node --test tests/*.test.mjs` and require all assertions to pass; start the server using the documented command and verify it binds to 127.0.0.1; exercise a real browser to edit fields and download an HTML file; disconnect networking and open that actual file directly; confirm the content renders, remote requests are absent, and script-shaped text remains inert.
  Learner check: Start the app using the README, enter a sample business and service, inspect the preview, export the page, then open that file offline and confirm the displayed details and contact links.
  Commit: `Build first ShanX page and standalone export`

- [ ] **2. Drafts restore after browser restart and can be cleared**
  Becomes usable: Business information, website brief, selected theme, and contact choices persist locally across editor sessions at the documented origin; Clear Saved Data removes the draft and resets the editor without removing previous exports.
  Why now: Local browser storage is the key technical uncertainty identified during planning. Verify the real close-and-reopen journey before finishing the remaining design work.
  PRD ref: `prd.md > Features and Behavior > Locally Saved Drafts`; `prd.md > States and Boundaries`.
  Spec ref: `spec.md > Components > Draft Model and Local Storage`; `spec.md > Data Model`; `spec.md > Important Failure Modes`; `spec.md > Independent Verification Plan for Stage 5`.
  Build: Add versioned localStorage read/write/clear behavior, shape validation, graceful in-memory fallback, truthful unsaved warning, and confirmed Clear Saved Data action. Add dependency-free automated storage/model tests.
  Verify (mechanical): Run `node --test tests/*.test.mjs`; in a normal browser profile, enter unique draft data and theme, close the test browser fully, reopen it with the same profile, visit the exact same URL, and verify all fields restore. Clear the draft, close/reopen again, confirm reset, and confirm an earlier downloaded export remains. Exercise blocked/corrupt/quota storage paths and verify the warning and in-memory behavior.
  Learner check: Enter a business detail, close and reopen the browser at the same app address, and confirm it returns. Then use Clear Saved Data and confirm the editor resets while an exported file remains.
  Commit: `Persist and clear ShanX local draft`

- [ ] **3. Switch between distinct themes and complete responsive verification**
  Becomes usable: Users can select Clean Professional or Bold Creative; each preview and export has distinct structure and styling. Desktop keeps editor left and preview right; phone/tablet layouts provide responsive Edit and Preview views, verified through browser viewport simulation on MONSTER.
  Why now: The core journey and persistence have already been proven. This completes the remaining approved visual behavior and allows a full cross-journey verification without delaying the unique kernel.
  PRD ref: `prd.md > Look and Feel`; `prd.md > Screens and Layout`; `prd.md > Features and Behavior > Live Preview and Themes`; `prd.md > The Core Journey`.
  Spec ref: `spec.md > Look and Feel`; `spec.md > Components > Responsive Workspace Navigation`; `spec.md > Components > Theme Renderer and Live Preview`; `spec.md > Components > Verification and Evidence`; `spec.md > Independent Verification Plan for Stage 5`.
  Build: Implement the Bold Creative semantic layout and distinct theme renderer; finish responsive editor views, keyboard navigation, and visible focus; complete browser security, theme, contact, persistence, and offline-export test coverage. Preserve test outputs, browser observations, downloaded-file hashes, and repair evidence. Check whether a supported Proof Before Done access path is available; use it only for its supported file checks, without modifying Project #01. No Proof Before Done connector is exposed in this Codex session; if no approved path is available, record that limitation and retain independent checks.
  Verify (mechanical): Run `node --test tests/*.test.mjs`; run the real browser through desktop and simulated phone/tablet viewport sizes; assert theme outputs differ in semantic structure as well as palette; test valid/invalid contact targets and hostile markup; reopen actual exports with networking disabled and check there are no remote requests. Record viewport simulation as simulation, not physical-device operation. Preserve output hashes and observed results; do not claim human acceptance.
  Learner check: In the running app, compare both themes and try the Edit/Preview views using the documented browser viewport simulation. Note any visual, confusing, or broken behavior for final review; physical phone/tablet access is not claimed.
  Commit: `Add Bold Creative theme and responsive workspace`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after slice 1; owner starts the local app, tries the editor/preview/export loop, and gives feedback before the remaining work continues.
- [ ] Final kick-the-tires exploration and feedback completed — after slice 3 and the independent verification pass; owner freely tries the completed core journey and reports anything broken, confusing, or worth changing. Do not mark done until feedback is resolved and the owner confirms readiness.

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship. Record requested fixes below as unchecked tasks; if none are needed, record that outcome and wait for explicit owner confirmation.

## Code Tour and App Map

- [ ] Learning activity complete — after final revisions, follow one real action through 2–3 actual code locations by default; use an evidence-based focused alternative or recap if appropriate.
- [ ] Optional edit and transfer reflection addressed — offer one safe, incidental edit and one optional transfer question; record tried/kept/reverted/declined honestly.
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse.

Activity and evidence: [record actual activity, tests, code references, and unfinished work]
Route and stops: [record actual paths/symbols and completed stops, or label as reference only]
Edit outcome: [record tried/kept/reverted/declined/not applicable plus verification]
Reflection: [record offered/answered/declined/already covered; personal answer belongs only in ignored learner profile]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions

### October 25, 2026 — Slice 1 recovery checkpoint

- Recovered the existing project without a second workspace. Approved PRD, spec, and checklist hashes matched the handoff before implementation. Current session command execution works; no additional Codex worker or account/configuration change was needed.
- Slice 1 implementation and mechanical verification passed: six Node tests; real Edge editing and downloads; clean and hostile exports opened as file URLs with browser-context networking disabled; no remote requests or page errors. Loopback listener verified at 127.0.0.1:8000. Evidence: `private-evidence/stage5-slice1/`.
- Browser automation initially could not find its bundled Chromium executable. Recovered using already-installed Edge in an isolated test context; no package/browser install or user browser restart.
- Early owner hands-on review is PENDING. Slice 1 remains unchecked and uncommitted until the scheduled owner check, per the build loop. Next: owner tries editor, preview and actual export; resolve feedback, review intended Git changes, commit with the planned message, then tick Slice 1 and proceed to Slice 2.
- Persistence, Bold Creative, and responsive Edit/Preview controls are not implemented yet. Offline testing used browser networking disabled, not a host-network change. Phone screenshot is viewport simulation only.
