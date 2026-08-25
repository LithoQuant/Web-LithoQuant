@echo off
REM Wrapper for backward compatibility - delegates to scripts/start-server.bat
echo [DEPRECATED] start-server.bat at root is deprecated. Use scripts/start-server.bat
call "%~dp0scripts\start-server.bat"
