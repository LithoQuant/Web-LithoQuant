@echo off
REM LithoQuant Website - Local Preview
REM Moved to scripts/ for cleaner project structure

REM Change to project root (parent of scripts)
pushd "%~dp0.."

echo ========================================
echo   LithoQuant Website - Local Preview
echo ========================================
echo.
echo Starting local web server...
echo.
echo Website akan tersedia di:
echo   http://localhost:8000
echo.
echo Project root: %CD%
echo Tekan Ctrl+C untuk stop server
echo ========================================
echo.

python -m http.server 8000

popd
pause
