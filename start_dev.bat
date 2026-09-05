@echo off
title Ayush Swain Portfolio - Dev Server
cd /d "%~dp0"
echo Starting Ayush Swain Portfolio on http://localhost:5050 ...
start "" "http://localhost:5050"
npm run dev
