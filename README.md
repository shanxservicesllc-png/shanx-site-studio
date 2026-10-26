# ShanX Site Studio

A local website editor for small service businesses. Fresh Project #02 implementation.

## Run on MONSTER

1. Install Python 3 if needed from https://www.python.org/downloads/ (verified here with Python 3.11.9).
2. Double-click `start-studio.bat` in this folder. Keep its window open.
3. Open **http://127.0.0.1:8000/** in your browser.
4. Stop the server with Ctrl+C in its window. If Windows asks to terminate the batch job, answer Y.

Equivalent command, from this folder:

```powershell
python -m http.server 8000 --bind 127.0.0.1 --directory app
```

If port 8000 is occupied, stop your earlier studio instance before retrying. Do not stop an unrelated service. The editor is only accessible on this computer; it is not published or exposed to the LAN. Opening app/index.html directly is unsupported.

## Using the editor

Enter your website brief, continue, and fill business details. Add up to three services. Changes update the live preview. Choose Clean Professional or Bold Creative from Website theme. Add a valid email/phone and choose the contact button destination. Invalid contact values remain plain text.

Click **Export HTML**, find the actual file in browser downloads, then open it directly. The exported page contains inline CSS, no scripts or remote dependencies, and needs no Python server or internet. Email/call delivery may still need connectivity and an installed app. Preview contact navigation is sandboxed; inspect/use links in the exported file.

Drafts now save in this browser at **http://127.0.0.1:8000/**. Use the same browser profile and exact address to restore them after closing/reopening. Private mode, cleared browser data, or storage restrictions can prevent restoration. Read the save status: if storage is unavailable, keep the tab open and export your work. Malformed saved data is recovered where possible with a visible notice.

**Clear Saved Data** asks for confirmation, removes only the application's draft, and returns to the opening prompt. Downloaded HTML files and other applications' saved data remain. If removal fails, current edits stay intact and a warning is shown.

Slice 2 review: enter details, choose Bold Creative, close/reopen the same browser and address, and confirm fields/theme restore. Export both themes. Clear the draft, reopen again, and confirm the blank start and retained downloaded files. Use sample data for this clear-data check.

Existing Slice 1 tabs do not have persistence until the updated page is loaded. Export any edits you want to retain before refreshing an old tab. No migration from that old in-memory tab is claimed.

Responsive Edit/Preview workspace controls and final integration review remain in Slice 3. No automatic AI writing, account, payment, or publication is performed.

## Tests

Node v24 is a development test tool only; customers do not need Node.

```powershell
node --test tests/*.test.mjs
```
