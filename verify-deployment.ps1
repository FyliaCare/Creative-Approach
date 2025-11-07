# Pre-Deployment Verification Script
# Run this in PowerShell before deploying to Render

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "   RENDER DEPLOYMENT CHECKER" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

$allGood = $true

# Check Node.js version
Write-Host "Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
if ($nodeVersion -match "v(\d+)") {
    $majorVersion = [int]$matches[1]
    if ($majorVersion -ge 18) {
        Write-Host "  OK  Node.js $nodeVersion (OK)" -ForegroundColor Green
    }
    else {
        Write-Host "  X  Node.js $nodeVersion (Need 18+)" -ForegroundColor Red
        $allGood = $false
    }
}
else {
    Write-Host "  X  Node.js not found" -ForegroundColor Red
    $allGood = $false
}

# Check NPM version
Write-Host "Checking NPM version..." -ForegroundColor Yellow
$npmVersion = npm --version
Write-Host "  OK  NPM $npmVersion" -ForegroundColor Green

# Check required files
Write-Host ""
Write-Host "Checking deployment files..." -ForegroundColor Yellow
$requiredFiles = @(
    'render.yaml',
    '.gitignore',
    'package.json',
    'vite.config.js',
    'index.html',
    'public\_redirects'
)

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "  OK  $file" -ForegroundColor Green
    }
    else {
        Write-Host "  X  $file (MISSING)" -ForegroundColor Red
        $allGood = $false
    }
}

# Check source files
Write-Host ""
Write-Host "Checking source files..." -ForegroundColor Yellow
$sourceFiles = @(
    'src\main.jsx',
    'src\App.jsx',
    'src\pages\Home.jsx',
    'src\pages\Services.jsx',
    'src\pages\About.jsx',
    'src\pages\Industries.jsx',
    'src\pages\Contact.jsx'
)

foreach ($file in $sourceFiles) {
    if (Test-Path $file) {
        Write-Host "  OK  $file" -ForegroundColor Green
    }
    else {
        Write-Host "  X  $file (MISSING)" -ForegroundColor Red
        $allGood = $false
    }
}

# Check public assets
Write-Host ""
Write-Host "Checking public assets..." -ForegroundColor Yellow
$publicAssets = @(
    'public\creative-approach-white.png',
    'public\creative-approach-black.png',
    'public\drone-animated.svg'
)

foreach ($asset in $publicAssets) {
    if (Test-Path $asset) {
        Write-Host "  OK  $asset" -ForegroundColor Green
    }
    else {
        Write-Host "  !  $asset (Optional)" -ForegroundColor Yellow
    }
}

# Test build
Write-Host ""
Write-Host "Testing production build..." -ForegroundColor Yellow
Write-Host "Running: npm run build" -ForegroundColor Cyan
Write-Host ""

$buildOutput = npm run build 2>&1
$buildSuccess = $LASTEXITCODE -eq 0

if ($buildSuccess) {
    Write-Host "  OK  Build completed successfully" -ForegroundColor Green
    
    # Check dist folder
    if (Test-Path "dist\index.html") {
        Write-Host "  OK  dist\index.html created" -ForegroundColor Green
    }
    else {
        Write-Host "  X  dist\index.html not found" -ForegroundColor Red
        $allGood = $false
    }
    
    # Check bundle size
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "  OK  Bundle size: $([math]::Round($distSize, 2)) MB" -ForegroundColor Green
    
    if ($distSize -gt 10) {
        Write-Host "  !  Warning: Bundle is large (>10MB)" -ForegroundColor Yellow
    }
}
else {
    Write-Host "  X  Build failed" -ForegroundColor Red
    Write-Host $buildOutput -ForegroundColor Red
    $allGood = $false
}

# Check git status
Write-Host ""
Write-Host "Checking Git status..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "  OK  Git initialized" -ForegroundColor Green
    
    $gitStatus = git status --porcelain
    $uncommittedFiles = ($gitStatus | Measure-Object).Count
    
    if ($uncommittedFiles -gt 0) {
        Write-Host "  !  $uncommittedFiles uncommitted files" -ForegroundColor Yellow
        Write-Host "      Run: git add . ; git commit -m 'message'" -ForegroundColor Cyan
    }
    else {
        Write-Host "  OK  All files committed" -ForegroundColor Green
    }
    
    $remotes = git remote -v
    if ($remotes) {
        Write-Host "  OK  Remote repository configured" -ForegroundColor Green
    }
    else {
        Write-Host "  !  No remote repository set" -ForegroundColor Yellow
        Write-Host "      Run: git remote add origin YOUR_REPO_URL" -ForegroundColor Cyan
    }
}
else {
    Write-Host "  !  Git not initialized" -ForegroundColor Yellow
    Write-Host "      Run: git init" -ForegroundColor Cyan
}

# Final summary
Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
if ($allGood) {
    Write-Host "     ALL CHECKS PASSED!" -ForegroundColor Green
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Ready to deploy! Follow these steps:" -ForegroundColor Green
    Write-Host "1. Push to GitHub: git push origin main" -ForegroundColor Cyan
    Write-Host "2. Go to Render: https://dashboard.render.com/" -ForegroundColor Cyan
    Write-Host "3. Create new Static Site" -ForegroundColor Cyan
    Write-Host "4. Connect your repository" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "See DEPLOYMENT_CHECKLIST.md for detailed steps" -ForegroundColor Yellow
}
else {
    Write-Host "   SOME CHECKS FAILED" -ForegroundColor Red
    Write-Host "================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Please fix the issues above before deploying." -ForegroundColor Red
}

Write-Host ""
