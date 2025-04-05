@echo off
echo Restarting Netlify with updated configuration...

cd %~dp0

echo 1. Stopping any running node processes...
taskkill /f /im node.exe 2>nul

echo 2. Starting Netlify with the correct configuration...
cd frontend
start cmd /k "netlify dev --port 8888 --targetPort 3001 --live"

echo Netlify should now be properly configured!
echo Try visiting: http://localhost:8888/?edit=true
echo.
echo Press any key to close this window...
pause > nul
