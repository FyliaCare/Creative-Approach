# Generate secure secrets for production
Write-Host "🔐 Generating secure secrets for production deployment..." -ForegroundColor Cyan
Write-Host ""

Write-Host "1️⃣ JWT_SECRET:" -ForegroundColor Yellow
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
Write-Host ""

Write-Host "2️⃣ SESSION_SECRET:" -ForegroundColor Yellow
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
Write-Host ""

Write-Host "✅ Copy these values to your Render environment variables!" -ForegroundColor Green
Write-Host ""
Write-Host "📖 See RENDER_DEPLOYMENT.md for complete deployment guide" -ForegroundColor Cyan
