#!/usr/bin/env pwsh

Write-Host "🚀 Starting build process..." -ForegroundColor Green

# Install frontend dependencies and build
Write-Host "📦 Installing frontend dependencies..." -ForegroundColor Yellow
Set-Location frontend
npm install

Write-Host "🔨 Building frontend..." -ForegroundColor Yellow
npm run build

# Copy frontend build to backend directory for Render deployment
Write-Host "📁 Copying frontend build to backend directory..." -ForegroundColor Yellow
if (!(Test-Path "../backend/frontend/dist")) {
    New-Item -ItemType Directory -Path "../backend/frontend/dist" -Force | Out-Null
}
Copy-Item -Path "dist/app" -Destination "../backend/frontend/dist/" -Recurse -Force

# Install backend dependencies
Write-Host "📦 Installing backend dependencies..." -ForegroundColor Yellow
Set-Location ../backend
npm install

Write-Host "✅ Build completed successfully!" -ForegroundColor Green
Write-Host "📂 Frontend files copied to: backend/frontend/dist/app/" -ForegroundColor Cyan
