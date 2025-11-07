# Quick Deployment Commands

## Initial Setup (One-time only)

### 1. Initialize Git
```bash
git init
```

### 2. Stage All Files
```bash
git add .
```

### 3. Initial Commit
```bash
git commit -m "Initial commit - Ready for Render deployment"
```

### 4. Set Main Branch
```bash
git branch -M main
```

### 5. Add GitHub Remote
Replace YOUR_USERNAME with your GitHub username:
```bash
git remote add origin https://github.com/YOUR_USERNAME/creative-approach.git
```

### 6. Push to GitHub
```bash
git push -u origin main
```

---

## Future Updates

After making changes to your site:

```bash
# 1. Check what changed
git status

# 2. Stage changes
git add .

# 3. Commit with descriptive message
git commit -m "Update: [describe your changes]"

# 4. Push to GitHub (triggers auto-deploy on Render)
git push origin main
```

---

## Useful Commands

### Check Git Status
```bash
git status
```

### View Commit History
```bash
git log --oneline
```

### Test Build Locally
```bash
npm run build
npm run preview
```

### Check Current Remote
```bash
git remote -v
```

### Create New Branch for Features
```bash
git checkout -b feature/your-feature-name
```

### Merge Feature to Main
```bash
git checkout main
git merge feature/your-feature-name
git push origin main
```

---

## Emergency Rollback

If deployment breaks:

### 1. View Previous Commits
```bash
git log --oneline
```

### 2. Revert to Previous Commit
```bash
git revert HEAD
git push origin main
```

Or reset to specific commit:
```bash
git reset --hard <commit-hash>
git push origin main --force
```

---

## Files Ready for Deployment

✅ `render.yaml` - Render configuration
✅ `.gitignore` - Git ignore rules
✅ `public/_redirects` - SPA routing
✅ `package.json` - Updated with Node version
✅ `DEPLOYMENT.md` - Detailed deployment guide
✅ `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

---

## Next Steps

1. Create GitHub repository at: https://github.com/new
2. Run the commands above
3. Connect repository to Render: https://dashboard.render.com/
4. Your site will be live at: https://creative-approach.onrender.com

**Happy Deploying! 🚀**
