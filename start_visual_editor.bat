@echo off
echo Starting Purple Hub with Visual Editing Mode...

cd %~dp0
cd frontend

echo 1. Stopping any running Vite or Netlify processes...
taskkill /f /im node.exe 2>nul

echo 2. Starting Vite server in development mode...
start cmd /k "npm run dev"

echo 3. Waiting for Vite to start...
timeout /t 5

echo 4. Starting Netlify local dev environment...
start cmd /k "netlify dev --live"

echo Visual Editor environment started!
echo Frontend: http://localhost:3001
echo Netlify: http://localhost:8888
echo.
echo IMPORTANT: To see edit mode, visit either:
echo - http://localhost:8888/?edit=true
echo - http://localhost:3001/?edit=true
echo.
echo You should see a "Edit Mode Active" indicator in the bottom right
echo corner and elements will be highlighted when you hover over them.
echo.
echo Press any key to close this window...
pause > nul
