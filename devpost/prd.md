---
doc: prd
status: approved
created_at: 2026-10-25
---

# ShanX Site Studio — Product Requirements

An offline-capable website creator for small service businesses, helping owners shape business details into a responsive standalone page.
Source: `scope.md > The Unique Kernel`, `Who It's For`, and `The Core Loop`.

## The Core Journey

1. The owner opens ShanX Site Studio and is immediately asked, “What would you like to create today?”
2. The owner describes the business website they want and is guided into editing the business details.
3. The owner enters a business name, description, up to three services, an email address, telephone number, and a contact call to action.
4. The workspace shows editing controls on the left and a live website preview on the right on desktop. On mobile and tablet, the owner can switch between responsive Edit and Preview views.
5. The owner chooses either of two themes, sees that choice reflected in the preview, and adjusts details as needed.
6. The owner exports a responsive, standalone HTML file. The exported page opens without internet and contains the entered content as inert text, with working email and telephone link targets.
7. The owner can close the editor and reopen it on the same browser/device to find their locally saved business draft restored, change business information, and export an updated file. A Clear Saved Data action lets them deliberately erase their locally saved draft without affecting earlier exported HTML files.

Success means the user can complete this loop, open the exported page offline, verify its layout and contact links, and confirm HTML/JavaScript-shaped text does not execute in either preview or export. Both themes must create visibly distinct page structures; closing and reopening restores saved draft details and clearing them resets the editor.
Source: `scope.md > The Core Loop` and `What "Working" Looks Like`.

## Screens and Layout

- **Creation prompt:** The initial view asks “What would you like to create today?” and invites the owner to describe the business website they want. It guides them into editing details; it is not a dashboard.
- **Editor workspace:** One product workspace with an editing area and live preview. On desktop, editing is on the left and preview on the right. On mobile/tablet, responsive Edit and Preview views let the owner move between form editing and preview. Its presentation should be recognizably ShanX while remaining visually distinct from #01 Proof Before Done, designed around website creation rather than file verification.
- Theme selection and HTML export are easy to find from the workspace.
- No sign-in, subscription, or separate dashboard is part of this first version.

Source: owner PRD direction and `scope.md > The Core Loop`.

## Look and Feel

The editor should feel welcoming, creative, simple, and recognizably ShanX branded. Preserve family cues from the polished blue presentation the owner likes in #01 Proof Before Done, but give **ShanX Site Studio a distinct application identity and workspace layout**, not a recolored or cloned #01 screen. Its opening creation prompt, visually prominent live preview, editing controls, and site-creation workflow should define its own design.

The **two selectable exported website themes must look genuinely different in structure as well as color**:

- **Clean Professional:** Rich blue and navy, white surfaces, crisp readable typography, conventional orderly navigation, a restrained hero area, balanced spacing, and aligned service cards for professional businesses.
- **Bold Creative:** Charcoal base with emerald green and gold accents, oversized expressive headings, a dramatic hero area, asymmetrical or editorial service presentation, more adventurous section composition and stronger contrast. No pink or peach.

Differentiate typography character, hero composition, navigation treatment, spacing, and service-section layout, not merely color tokens. Both retain readability, accessibility, responsiveness, secure text treatment, and a recognizable ShanX level of polish. The editor's shared branding does **not** force the generated websites to look alike. These are owner-provided design directions, not completed implementations.

## Features and Behavior

### Creation and Business Details

- The opening prompt is “What would you like to create today?”
- The user can describe the business website they want and proceed into editing its details.
- The editor supports a business name and description, up to three services, email, telephone, and a contact call to action.
- The website represents one small service business on one page.
- Entered HTML or JavaScript-shaped text is displayed as inert content and does not execute in the preview or exported page.

Source: `scope.md > The Core Loop`, `The POC Boundary`, and `What "Working" Looks Like`.

### Live Preview and Themes

- Editing business details updates a live preview.
- The user can choose between two website themes.
- Theme selection and export remain easy to find.
- On desktop, editing appears left of the preview. On mobile/tablet, the user can switch between Edit and Preview views.
- **Theme differentiation:** Switching themes changes the exported website's visual structure, hero, typography, spacing, navigation treatment, and service presentation, not only colors. Clean Professional uses blue/navy/white and structured service cards; Bold Creative uses charcoal/emerald/gold, a dramatic hero, and expressive/asymmetrical layouts. The editor itself has a distinct ShanX Site Studio identity, not a copy of Proof Before Done.

Source: `scope.md > The Core Loop`; owner PRD direction.

### Locally Saved Drafts

- Save business details and the user's current editing choices locally in the same browser/device between editor sessions, without requiring a login, subscription, or network connection.
- On reopening the editor in that browser/device, restore the saved draft so editing and repeated exports can continue.
- Offer a clear **Clear Saved Data** action that resets locally saved draft information; it must not claim to erase previously downloaded HTML files.
- Test first use with no saved data, restoration after reopening, and explicit clearing. Choose the exact browser storage mechanism and fallback handling in `4-spec`.

Source: owner Stage 3 persistence choice.

### Standalone HTML Export

- The user can export a responsive standalone HTML website containing the current business details and selected theme.
- The exported file does not require internet access or a mandatory subscription or external dependency to open and use as a page.
- Email and telephone details appear as appropriate contact links. Offline page availability does not promise that calls or email can be delivered offline.
- The user can edit details and export again; each export represents the current edited information.
- Export does not host or publish the page.

Source: `scope.md > The Unique Kernel`, `The Core Loop`, and `What "Working" Looks Like`.

### Future AI Assistance

- AI-powered writing and creative suggestions are desirable future options, not part of this first version.
- The first version must function offline without an AI subscription or remote service.
- Ordinary templates must not be presented as AI-powered.

Source: owner PRD direction.

## States and Boundaries

- **First use:** The user sees the creation prompt and can begin by describing the desired business website.
- **Partially completed details:** The editor and preview support working with the details entered so far; incomplete information does not prevent editing. Exact required-field and validation behavior is not yet defined.
- **No services:** A user may have entered no services yet; the interface should remain usable and guide them toward adding a service, without inventing sample business content.
- **Three-service limit:** Up to three services can be included. The interface should not allow a fourth service to enter the exported website.
- **Malformed or script-shaped text:** HTML/JavaScript-shaped user content remains inert in preview and export.
- **Successful export:** The user gets a standalone HTML file representing the current details and theme. Exact browser download/save feedback is a minor interaction detail for the specification.
- **Persistence between sessions:** The current business draft is saved locally and restored when the editor is reopened in the same browser/device. The Clear Saved Data action erases stored draft information and resets the editor; previously downloaded exports remain intact.
- **Contact activation:** Email/telephone links may invoke external mail or phone software. Offline export does not imply offline communication.

Source: `scope.md > The Core Loop`, `What "Working" Looks Like`, and `The POC Boundary`.

## Product Decisions

- The product name is **ShanX Site Studio**, spelled S H A N X. The existing workspace folder name stays unchanged. Source: owner approval and handoff.
- The opening prompt asks, “What would you like to create today?” Source: owner PRD direction.
- The user can describe their desired business website and is guided into editing. Source: owner PRD direction.
- Desktop places editing on the left and live preview on the right; mobile/tablet provide responsive Edit and Preview views. Source: owner PRD direction.
- Theme selection and HTML export should be easy to find. Source: owner PRD direction.
- The interface should feel welcoming, creative, and simple, but have a distinct ShanX Site Studio workspace while retaining family-brand polish and blue cues from #01. Source: owner Stage 3 visual guidance.
- Generated site themes differ in layout as well as palette: Clean Professional uses orderly blue/navy/white professional layouts; Bold Creative uses charcoal, emerald, and gold with dramatically different hero, typography and service composition, never pink/peach. Source: owner Stage 3 decisions.
- Save drafts locally across sessions and provide a Clear Saved Data control; no cloud storage/account requirement. Source: owner Stage 3 persistence choice.
- No unnecessary dashboard, sign-in, subscription, remote AI service, or AI claim for ordinary templates. Source: owner PRD direction.
- The product remains an offline-capable editor and standalone page export for small service businesses, with up to three services, two themes, inert HTML/script-shaped input, and no reused prototype code. Source: approved scope.

## What We're Building

A fresh implementation of a single-workspace, offline-capable editor for one small service-business page with a distinctive ShanX Site Studio workspace, not a clone of #01. It opens with the owner's creation prompt, lets the user edit a business name, description, up to three services, email, telephone and a contact call to action, previews the page live, and offers two genuinely different exported-site layouts: Clean Professional (structured blue/navy/white) and Bold Creative (expressive charcoal/emerald/gold). It exports responsive standalone HTML that opens offline; script-shaped input remains inert. The editor restores its locally saved business draft on reopening and has a Clear Saved Data action. The user can edit and export again.

## Deferred From the POC

- AI writing and creative suggestions: desirable later, but not required to prove the offline editor/export loop; no AI subscription or remote service in the first version.
- Hosting or publication: outside the approved scope; the exported file is not hosted.
- Payments, billing, subscriptions, or domain registration: excluded and unnecessary for this proof of concept.
- Reusing the earlier prototype source: excluded so this is a fresh implementation.

## Possible Later Enhancements

AI-powered writing and creative suggestions may be considered after this offline first version, if separately scoped. No other feature backlog is presumed.

## Non-Goals

- The exported page is not automatically hosted or published.
- The app does not process payments, bill users, sell subscriptions, or register domains.
- The first version does not depend on a remote AI service or mislabel ordinary templates as AI.
- The app does not copy, fork, or refactor the earlier prototype.
- Offline page use does not guarantee delivery of phone calls or email without connectivity.

## Open Questions

- **Resolved for PRD review:** Two visually and structurally distinct generated-site themes, Clean Professional (blue/navy/white, orderly) and Bold Creative (charcoal/emerald/gold, dramatic/editorial), both within the ShanX family; the ShanX Site Studio editor itself is visibly different from #01.
- **Resolved for PRD review:** Business details persist locally between editor sessions, with a Clear Saved Data action.
- **Can be resolved during 4-spec:** Exact validation and export feedback for incomplete or malformed business contact details, while preserving the approved core loop and inert-text requirement.

**Approval record:** X explicitly approved this complete PRD on 2026-10-25, as documented in `prd-approval-evidence.md`. This approval covers Stage 3 only; Stage 4, publication, and contest submission require their own applicable approvals.
