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

## Slice 1 review

Enter your website brief, continue, and fill business details. Add up to three services. Changes update the Clean Professional preview. Add a valid email/phone and choose the contact button destination. Invalid contact values remain plain text.

Click **Export HTML**, find the actual file in browser downloads, then open it directly. The exported page contains inline CSS, no scripts or remote dependencies, and needs no Python server or internet. Email/call delivery may still need connectivity and an installed app. Preview contact navigation is sandboxed; inspect/use links in the exported file.

This first slice keeps edits **in the current tab only**. Export before closing. Local draft persistence, Clear Saved Data, Bold Creative, and responsive Edit/Preview controls belong to the next approved slices after owner feedback. No automatic AI writing, account, payment, or publication is performed.

## Tests

Node v24 is a development test tool only; customers do not need Node.

```powershell
node --test tests/*.test.mjs
```
