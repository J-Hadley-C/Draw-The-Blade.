@echo off
echo Lancement du serveur Khen Fu...
start "API Khen Fu" cmd /k "cd /d "%~dp0backend" && php -S 127.0.0.1:8000 -t public/"
timeout /t 2 /nobreak >nul
start "" "http://localhost:5500/project/ui_kits/showcase/index.html"
echo Serveur PHP lance sur http://127.0.0.1:8000
echo Ouvre VS Code et clique sur "Go Live" pour le Showcase
