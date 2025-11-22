@echo off
setlocal enabledelayedexpansion

REM Add Node.js to PATH at the beginning
set PATH=C:\Program Files\nodejs;%PATH%

REM Get the arguments
set "args=%*"

REM Call npm with the arguments
"C:\Program Files\nodejs\npm.cmd" !args!
