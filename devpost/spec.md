---
doc: spec
status: approved
created_at: 2026-10-25
---

# ShanX Site Studio — Technical Spec

## How This Works, In Plain Language

ShanX Site Studio is a small set of web files opened in a browser. Python’s built-in web server gives the editor a stable local address on this computer. It is bound to this computer only; it does not publish the editor to the network. Python serves the editor files but does not power or appear in the websites customers export.

The browser keeps the business draft in its own local storage for the editor’s fixed local address. The page reads that draft when it opens and saves edits as they happen. A Clear Saved Data action removes only ShanX Site Studio’s saved draft. The editor turns the current details into one HTML file with its styles included, so that exported website can be opened offline without Python, a server, an account, or external files.

The live preview is built from safe text nodes and trusted layout templates. The two themes use different page structures as well as different styling. No framework, remote AI, font service, image service, or other runtime dependency is needed.

This approach fits the proof of concept because it keeps setup small, avoids a cloud account or paid service, and allows both the local editor and standalone exported page to work without internet. Its tradeoff is that the editor must be served from the same local address each time for the browser to find its saved draft; opening the editor HTML directly as a `file://` URL is unsupported.

## The Core Journey Through the System

1. The user opens the editor from the local Python server. The browser loads `app/index.html`, `styles.css`, and the JavaScript modules from the fixed local origin `http://127.0.0.1:8000`.
2. The opening screen asks, “What would you like to create today?” The user enters a plain-language website brief. The brief is kept as the user’s own note; it is not sent to an AI or automatically turned into business copy. Continue opens the editor, where the user enters or edits the actual business fields.
3. The editor reads the saved JSON draft from browser local storage, if present. Otherwise it starts with blank business fields and the Clean Professional theme selected.
4. Each business-field edit updates the in-memory draft, saves it under the app’s one storage key, and updates the preview. A storage failure leaves editing available in the current tab and shows a clear warning that the draft could not be saved.
5. The user can add or remove service entries up to the maximum of three, select Clean Professional or Bold Creative, and move between Edit and Preview on small screens. Each theme uses a distinct semantic page structure. Desktop keeps the editor left and preview right.
6. On export, the exporter reads the current draft, checks contact targets, escapes every user-provided text value for its output context, and creates a single HTML document with embedded CSS and no active scripts or remote references. The browser downloads that document.
7. The user opens the downloaded file in a browser with networking disabled. Its site content and layout remain available; email and telephone links can still hand off to an installed mail or phone app, but delivery may require connectivity.
8. The user closes the browser, reopens it with the same browser profile, and starts the editor again at the same local address. The saved draft and theme should be restored.
9. Clear Saved Data asks for confirmation, removes only the app’s local draft key, and resets the editor to first-use defaults. Previously downloaded HTML files are separate files and remain untouched.

PRD ref: `prd.md > The Core Journey`, `Features and Behavior > Locally Saved Drafts`, `Features and Behavior > Standalone HTML Export`, and `States and Boundaries`.

## Stack

- **HTML5, CSS, and browser JavaScript modules.** No application framework and no third-party runtime dependency. This matches the small single-user editor and standalone export requirement.
- **Python 3 standard library `http.server`.** Serves the editor files from loopback during local use. Python was verified on MONSTER on 2026-10-26 with `python --version`, returning Python 3.11.9, exit code 0, managed terminal `a2e84de9a17d4d23`. This verifies availability on the build host only.
- **Browser Web Storage API (`localStorage`).** Saves small text fields and theme choices for the stable local origin. Private browsing may clear data when the private session ends; users must use a normal browser profile for the promised between-session restoration.
- **Browser Blob and download link APIs.** Create and download the standalone HTML file without a server-side export service.
- **No external service, API key, third-party font, image host, analytics, account, or remote AI model.**

Documentation:

- [Python `http.server`](https://docs.python.org/3/library/http.server.html) — built-in static file serving. Python documents this as a basic server, not production hosting; this project binds it to loopback for local use only.
- [MDN: `localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) — persists per origin across browser sessions. MDN notes behavior for `file:` URLs is undefined, which is why the editor uses a fixed local HTTP origin.
- [MDN: Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API) — storage interface reference.
- [MDN: Blob URLs](https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/blob) and [MDN: URL API](https://developer.mozilla.org/en-US/docs/Web/API/URL) — browser-generated download content.
- [MDN: HTML anchor element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/a) — download link behavior.
- [OWASP Cross Site Scripting Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html) — context-aware output encoding and safe DOM text insertion.

## Where It Runs and How Someone Tries It

**Editor runtime:** Windows browser plus Python 3.11.9 or a compatible Python 3 installation. No internet access is required after files are present. The editor is opened from the project folder at a fixed loopback origin so browser storage remains associated with the same origin. Because the server binds to 127.0.0.1, this URL is accessible locally on MONSTER only; it does not provide direct editor access from a physical phone or tablet. Browser viewport simulation on MONSTER can verify responsive layouts but is not physical-device operation. No physical-device access method is established in this spec. Any later method must be independently verified and separately authorized before changing the loopback-only binding or otherwise exposing the server. The static HTML/CSS/JavaScript files preserve future portability without adding a dependency now.

Planned user steps:

1. Double-click `start-studio.bat` in the project folder. The script changes to the project folder and runs:
   `python -m http.server 8000 --bind 127.0.0.1 --directory app`
2. Keep the server window open and open `http://127.0.0.1:8000/` in the browser. Always use this same address; switching between `localhost`, another hostname, or another port creates a different browser origin and will not see the same saved draft.
3. When finished, focus the server window and press Ctrl+C, then confirm the window closes.

The startup script must not download packages, start a public/LAN-facing server, or silently launch duplicate server processes. If Python is unavailable, the script/README must show a plain instruction to install Python from the official [Python downloads page](https://www.python.org/downloads/) and restart the app; it must not attempt an automatic install. If port 8000 is already occupied, show the server error clearly and explain how to stop the earlier app instance before retrying.

**Exported customer website:** Open the downloaded `.html` file directly in a browser. It is self-contained and requires no Python, local server, network, account, or remote resource.

**Demo / submission tryout:** A local browser demonstration is sufficient for technical review. Responsive behavior will be checked with browser viewport simulation on MONSTER and reported as simulation, not as a physical-device test. Actual phone/tablet operation remains unverified until an independently verified access method is approved. The official submission later requires a short demo video and a public GitHub repository; deployment is optional and is not selected for this PoC. No repository publication or contest submission is authorized by this spec approval.

Python command availability is verified; the app startup flow and browser behavior are not yet tested.

## Look and Feel

Implements `prd.md > Look and Feel` and `Screens and Layout`.

- **Editor identity:** Welcoming, creative, and simple, with the ShanX family’s polished blue cue. Its own creation prompt, editing controls, and visible live preview define a website-making product, not a recolored Proof Before Done interface.
- **Editor layout:** On wide screens, a distinct editor panel on the left and preview on the right. On phone/tablet widths, accessible Edit and Preview controls switch the main workspace view. Theme and export controls remain easy to locate.
- **Clean Professional website:** Rich blue/navy/white palette, crisp readable type, conventional horizontal navigation, restrained hero, balanced spacing, and aligned service cards.
- **Bold Creative website:** Charcoal base, emerald and gold accents, oversized expressive headings, dramatic hero, editorial/asymmetrical service layout, and stronger contrast. Never use pink or peach.
- **Structural difference:** Clean Professional uses a familiar horizontal header and orderly single-column hero followed by an even service-card grid. Bold Creative uses a more expressive brand/contact header, a visually dominant editorial hero, and an asymmetrical service composition. The DOM structure and order of major page regions differ; changing color tokens alone does not satisfy the spec.
- Both generated themes use semantic headings and links, keyboard-visible focus, responsive layouts, readable contrast, and escaped user text. No externally loaded font or imagery.

## Components

### App Shell and Creation Prompt

Shows the exact prompt “What would you like to create today?” and a free-text website brief. Continue opens the editor and keeps the brief available as a reference. The brief is user-authored text, stored with the draft, never treated as a command or converted by AI, and not included in the exported website unless the user separately places that information in a business field.

PRD ref: `prd.md > The Core Journey`, `Screens and Layout`, and `Features and Behavior > Creation and Business Details`.

### Business Details Editor

Edits business name, description, up to three service names/descriptions, email, telephone, and CTA label/target. Add Service is disabled after three entries. Removing a service removes it from both draft and preview. The user may edit and preview incomplete information; no sample business is inserted.

PRD ref: `prd.md > Features and Behavior > Creation and Business Details` and `States and Boundaries`.

### Responsive Workspace Navigation

Keeps editing on the left and preview on the right on desktop. At phone/tablet widths, provides keyboard-accessible Edit and Preview views without creating separate application routes. Theme and export actions remain reachable in either view.

PRD ref: `prd.md > Screens and Layout`.

### Draft Model and Local Storage

Uses one versioned storage key, `shanx-site-studio:draft:v1`, at the fixed origin. Saves the brief, business fields, service list, selected theme, CTA label, and CTA target after edits. On load, validates the stored shape before restoring it. Storage reads and writes are wrapped in error handling. When storage is blocked, malformed, or full, editing and export remain available in memory for the current tab and a visible warning explains that changes may not survive closing.

Clear Saved Data presents a confirmation, removes only `shanx-site-studio:draft:v1`, resets the in-memory state and preview to the blank creation prompt, and reports that the draft was cleared. It does not call `localStorage.clear()` and cannot remove downloaded exports.

PRD ref: `prd.md > Features and Behavior > Locally Saved Drafts` and `States and Boundaries`.

### Theme Renderer and Live Preview

Renders current fields into safe DOM text nodes and a selected theme template. It does not put user strings into `innerHTML`, inline event handlers, CSS, or script text. Theme switching selects separate Clean Professional and Bold Creative component trees, so structural differences appear in the preview as well as the export.

Clean Professional renders horizontal navigation, restrained hero, aligned service-card grid, and contact footer. Bold Creative renders its editorial header, dramatic hero, asymmetric service layout, and distinct closing contact section. Both adjust to available viewport width.

PRD ref: `prd.md > Features and Behavior > Live Preview and Themes`, `Look and Feel`, and `States and Boundaries`.

### Contact Validation and Link Builder

Treats email, telephone, CTA text, and free-text business content as untrusted input. Email and telephone are displayed as text even when invalid; only valid targets become clickable links. Email validation trims surrounding whitespace, rejects control characters and whitespace inside the address, and accepts a practical single-address format; it is not a guarantee that the mailbox exists. Telephone validation accepts digits with common human formatting characters (spaces, parentheses, period, hyphen, and one leading plus), normalizes the clickable target to `tel:+?[digits]`, and rejects other schemes or characters. Validation is done before constructing a fixed `mailto:` or `tel:` URL; user input cannot select a URL scheme.

The CTA has an editable label and an explicit Email or Phone target selector. The selector offers only targets that currently validate. If neither target is valid, the CTA is shown as non-clickable text in the preview/export with a short editor hint; it never produces an empty or unsafe link. These validation details are proposed spec behavior for owner review because the PRD leaves exact contact validation to Stage 4.

PRD ref: `prd.md > Features and Behavior > Creation and Business Details`, `Features and Behavior > Standalone HTML Export`, and `States and Boundaries`.

### Standalone HTML Exporter

Creates the current website as one UTF-8 `.html` download with viewport metadata, inline CSS, semantic markup, and no scripts, external URLs, external fonts, or images. It uses the selected theme’s distinct page structure. User text is escaped for HTML text or quoted attribute context; link targets come only from the validated link builder. The export is inert static HTML; no application editor state or local-storage key is carried into it.

The business name is reduced to safe filename characters for the download name, with a neutral fallback if empty. The browser receives the document via a Blob URL and a temporary anchor with the download attribute; the generated object URL is revoked after the download has been initiated. Browser-specific download prompts may vary.

PRD ref: `prd.md > Features and Behavior > Standalone HTML Export` and `States and Boundaries`.

### Local Server Launcher

Provides `start-studio.bat` at the project root. It runs Python’s standard-library server bound only to 127.0.0.1, serving the `app/` directory. README instructions state the URL, how to stop it, and that Python is required for the editor only; exported customer pages need no server.

PRD ref: `prd.md > The Core Journey` and `Non-Goals`.

### Verification and Evidence

Stage 5 will preserve command output, browser observations, screenshots where useful, exported-file hashes, and concise pass/fail records under the project’s evidence folder. Proof Before Done may provide receipts only for file-level checks it actually supports; those receipts will supplement, not replace, independent browser and functional checks. Project #01 is not to be modified.

PRD ref: `prd.md > The Core Journey`, `Features and Behavior > Locally Saved Drafts`, `Features and Behavior > Standalone HTML Export`, and `States and Boundaries`.

## Data Model

The browser draft is one JSON object stored as a string:

```text
{
  schemaVersion: 1,
  websiteBrief: string,
  businessName: string,
  description: string,
  services: [{ name: string, description: string }],  // 0–3 entries
  email: string,
  telephone: string,
  ctaLabel: string,
  ctaTarget: "email" | "phone",
  theme: "clean-professional" | "bold-creative"
}
```

- Source: user typing and theme/service controls.
- In memory: the current browser tab’s JavaScript object; every edit updates it and rerenders the preview.
- Persisted copy: `localStorage["shanx-site-studio:draft:v1"]` for the local origin `http://127.0.0.1:8000`.
- On startup: parse JSON inside a try/catch, validate types, clamp services to three, and accept only known theme/CTA values. If unusable, start blank and show a draft recovery notice; never execute or render stored strings as markup.
- On edits: synchronously attempt to update the local storage key. If unavailable/quota is exceeded, continue in memory and show the unsaved warning.
- On clear: remove only the app-owned key and reset to defaults. Export files are downloaded separately by the browser and are outside this storage.
- On browser close/reopen: the same origin and normal browser profile should restore the draft. Private browsing, cleared site data, or a changed origin may not retain it.

## File Structure

Planned fresh application files; existing curriculum and evidence are preserved.

```text
02_FIVE_DOLLAR_SITE_STUDIO_SKILL_FIRST/
├── app/
│   ├── index.html              # Creation prompt, editor and preview roots
│   ├── styles.css              # Editor shell, responsive behavior, theme styling
│   ├── main.js                 # App startup, events, state coordination
│   ├── draft.js                # Defaults, shape validation and service limits
│   ├── storage.js              # Versioned localStorage read/write/clear and fallback
│   ├── preview.js              # Safe DOM preview and responsive view switching
│   ├── themes.js               # Structurally distinct site theme renderers
│   ├── contacts.js             # Email/phone validation and safe link targets
│   └── export.js               # Escaped standalone HTML generation and download
├── start-studio.bat            # Loopback-only Python editor server launcher
├── README.md                   # Startup, URL, stop steps, and runtime boundary
├── devpost/
│   ├── learner-profile.md
│   ├── scope.md
│   ├── prd.md
│   ├── prd-approval-evidence.md
│   ├── scope-approval-evidence.md
│   ├── private-evidence/
│   └── spec.md                 # This Stage 4 technical blueprint
├── .agents/skills/             # Installed official curriculum skills
└── .gitignore                  # Existing protections for private evidence/profile
```

This tree is the intended Stage 5 application layout. Existing prototype code is not copied or refactored into it.

## External Services and Dependencies

- **Runtime server:** Python standard-library `http.server`; no package installation or external service. Bind only to 127.0.0.1. Python documents that `http.server` is basic and not production hosting; no production exposure is planned.
- **Browser APIs:** localStorage, Blob, URL object URLs, and anchor downloads are built into modern browsers; no API key or network request.
- **External services:** None. No remote fonts, AI service, database, hosting, analytics, or image service.
- **Customer export:** None of the editor’s Python/browser-server requirements travel with the exported file.

## Important Failure Modes

- **Python missing or wrong command:** Launcher prints an install/help message and exits; README links to the official Python download page. It does not auto-install.
- **Port 8000 in use:** Python prints a clear error; README instructs the user to close the earlier server window and retry. The app does not spawn another port or background process automatically.
- **Browser storage blocked, invalid, or full:** Keep the current tab usable, show an unsaved-draft warning, and do not claim restoration will work. A failed save must not erase the current in-memory draft.
- **Corrupt or outdated stored JSON:** Ignore invalid fields, recover to safe blank defaults, show a concise recovery notice, and never render stored values as executable markup.
- **Invalid contact data:** Show the entered value as plain text; omit its link and do not let it alter the CTA’s URL scheme.
- **Export/download blocked by browser policy:** Keep the editor and draft intact and show instructions to allow the browser download; do not report success until the browser produces a file.

## What Was Simplified and Why

- **One local JSON draft in browser storage** instead of accounts, cloud sync, or a database — the product is single-user and must work offline without a subscription.
- **A single static HTML export with embedded CSS** instead of a hosted site or multi-file export — one file is portable and directly supports offline viewing.
- **Manual editing after the opening website brief** instead of AI-generated copy — keeps the first version offline and avoids mislabeling templates as AI.
- **Local recording instead of deployment** — the PRD’s proof is a working editor and offline export; a public deployment is optional and not chosen.

## Decisions and Open Issues

### Agreed owner technical direction

- Plain HTML, CSS, and JavaScript, with no third-party runtime dependencies.
- Python’s local HTTP server serves the editor; the exported customer site does not require Python or a server.
- Browser local storage restores the draft.
- Exported standalone HTML opens offline.

### Verified and derived details

- **Python availability:** Verified on MONSTER: Python 3.11.9, command `python --version`, exit code 0, terminal `a2e84de9a17d4d23`. Evidence: `devpost/private-evidence/10_STAGE4_PYTHON_VERSION.txt`. This does not verify launch or application behavior.
- **Storage origin:** Use exactly `http://127.0.0.1:8000` for editor sessions; MDN documents that localStorage behavior for `file:` URLs is undefined and origin-specific.
- **CTA interpretation for review:** Provide a CTA label and explicit Email/Phone destination selector. Only currently valid destinations are selectable. This makes the contact action concrete while allowing the owner to choose which supplied contact method it uses.
- **Website brief behavior for review:** The opening prompt captures a user-authored brief, keeps it visible as a reference in the editor, and does not imply automatic or AI interpretation. The user manually fills business fields.
- **Clear action:** Ask before clearing; remove only the app-owned storage key; preserve downloads.
- **Useful uncertainty / learning check:** The owner specifically raised browser local-draft restoration and file:// variability. MDN documents that localStorage for file URLs is undefined and varies, so the design uses a fixed loopback HTTP origin. During Stage 5, verify persistence by closing and reopening the browser in the same normal profile and exact URL.
- **Open implementation verification:** Verify Python 3 version compatibility, download behavior, storage-failure display, responsive breakpoints, and actual browser file:// export behavior during Stage 5. Physical phone/tablet access to the editor is UNKNOWN; the loopback-only server does not establish it. No LAN/internet exposure or physical-device access method is selected. Future portability is retained through standard static files without adding a dependency.
- **Stage 4 approval record:** X explicitly approved this complete specification, including device-access clarifications, as recorded in `spec-approval-evidence.md`. The next gate is the Stage 5 build checklist: no application code begins until the owner approves the checklist.

## Independent Verification Plan for Stage 5

These are planned checks, not tests already run:

1. **Startup:** Double-click launcher, confirm Python serves only on loopback, open the documented URL, stop with Ctrl+C; verify the README matches the actual flow.
2. **Creation and editing:** Enter all fields, update preview, add/remove services, confirm a fourth service cannot be added, and verify blank fields do not invent sample content.
3. **Responsive behavior:** Inspect desktop split layout and simulate phone/tablet viewport sizes in a real browser on MONSTER; verify keyboard focus and usable labels. Record this as viewport simulation. Do not claim physical-device operation; access from an actual phone/tablet requires an independently verified access method, and loopback-only serving remains in place.
4. **Theme structure:** Generate both theme previews and exports. Verify separate DOM structures and visibly different navigation, hero, typography, spacing, and service layout—not only palette changes.
5. **Persistence:** In a normal browser profile, enter unique test data, close the browser fully, reopen it, return to the exact same URL, and confirm every field and theme restores. Repeat with Clear Saved Data, confirm reset after browser restart, and confirm a previously downloaded export still exists.
6. **Storage failure:** Exercise blocked and quota/error paths; confirm current-tab editing/export remains available and the unsaved warning is truthful.
7. **Security:** Try markup/script-shaped values such as `<script>`, event-handler attributes, `javascript:` link text, quotes, ampersands, and Unicode. Confirm preview displays them as text; export source is correctly escaped; no script executes; contact links use only validated `mailto:` or `tel:` targets.
8. **Contact handling:** Check valid and invalid email/telephone inputs, CTA destination switching, empty targets, and text-only fallback.
9. **Real offline export:** Export each theme, record file hashes, disable network access, open each actual downloaded HTML file directly, and verify layout, content, responsiveness, contact targets, and absence of remote requests.
10. **Independent evidence:** Preserve browser/version, steps, expected and observed results, screenshots or screen recording where useful, console/network observations, output hashes, and failure/repair history. Use Proof Before Done only for file checks it supports and preserve its genuine receipt; independently perform all browser, security, persistence, and offline checks. Do not reopen or modify the submitted #01 project.

No Stage 5 tests or app code have been run in this Stage 4 turn.
