@echo off
title Khen Fu — Lancement

echo.
echo  [Khen Fu] Demarrage des serveurs...
echo.

:: Backend Symfony — port 8000
start "Backend API :8000" /D "%~dp0backend" cmd /k "php -S 127.0.0.1:8000 -t public"

:: Frontend statique — port 3000
start "Frontend :3000" /D "%~dp0project" cmd /k "php -S 127.0.0.1:3000 -t ."

:: Attendre que les serveurs soient prets
timeout /t 2 /nobreak > nul

:: Ouvrir le Showcase dans le navigateur
start "" "http://127.0.0.1:3000/ui_kits/showcase/index.html"

echo  [OK] Backend  : http://127.0.0.1:8000
echo  [OK] Frontend : http://127.0.0.1:3000/ui_kits/showcase/index.html
echo.
echo  Autres pages :
echo    Codex   : http://127.0.0.1:3000/ui_kits/codex/index.html
echo    Contact : http://127.0.0.1:3000/ui_kits/contact/index.html
echo    Admin   : http://127.0.0.1:3000/ui_kits/admin/index.html
echo.
pause
