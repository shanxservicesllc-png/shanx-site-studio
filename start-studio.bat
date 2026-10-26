@echo off
cd /d "%~dp0"
python --version >nul 2>&1
if errorlevel 1 (
  echo Python 3 is required. Install it from https://www.python.org/downloads/ and try again.
  pause
  exit /b 1
)
echo Open http://127.0.0.1:8000/ in your browser.
echo Keep this window open. Press Ctrl+C to stop.
python -m http.server 8000 --bind 127.0.0.1 --directory app
if errorlevel 1 (
  echo Server could not start. If port 8000 is in use, stop the earlier studio server and try again.
  pause
  exit /b 1
)
