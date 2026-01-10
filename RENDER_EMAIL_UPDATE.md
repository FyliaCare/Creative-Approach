# 🚀 Update Email Password on Render (Production)

## Quick Steps to Update Production Email

### Option 1: Render Dashboard (Recommended - 2 minutes)

1. **Go to Render Dashboard:**
   - Visit: https://dashboard.render.com
   - Sign in to your account

2. **Select Your Backend Service:**
   - Click on your backend service (likely named: `creative-approach-backend` or similar)

3. **Go to Environment Variables:**
   - Click **"Environment"** tab in the left sidebar
   - OR scroll down to **"Environment Variables"** section

4. **Update EMAIL_PASSWORD:**
   - Find the variable: `EMAIL_PASSWORD`
   - Click **"Edit"** or the pencil icon
   - Replace the old password with: `qndlyyshmqalmcwv`
   - Click **"Save Changes"**

5. **Render Will Auto-Redeploy:**
   - Your service will automatically restart with the new password
   - Wait 2-3 minutes for the deployment to complete
   - Look for "Live" status with a green dot

### Option 2: Render CLI (Advanced)

```bash
# Install Render CLI (if not installed)
npm install -g @render/cli

# Login
render login

# Update environment variable
render env-var set EMAIL_PASSWORD=qndlyyshmqalmcwv --service=your-service-name

# Verify
render env-var list --service=your-service-name
```

## All Environment Variables You Should Have on Render

Make sure these are all set in your Render Dashboard:

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=<your-mongodb-atlas-uri>
JWT_SECRET=<your-jwt-secret>
CLIENT_URL=https://caghana.com
ADMIN_URL=https://admin.caghana.com

# Email Settings (IMPORTANT - UPDATE THESE)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=visuals@caghana.com
EMAIL_PASSWORD=qndlyyshmqalmcwv

# Cloudinary
CLOUDINARY_CLOUD_NAME=dur9awuao
CLOUDINARY_API_KEY=368951835448423
CLOUDINARY_API_SECRET=jEbCFJZBdjvqUryEsceO27n-x4M

# Admin
ADMIN_EMAIL=admin@creativeapproach.gh
ADMIN_PASSWORD=<your-admin-password>
```

## After Updating

### 1. Verify Deployment
- Check Render logs for: `✅ Email server is ready`
- Look for "Live" status in dashboard

### 2. Test Production Contact Form
Visit your live site and submit a test contact form:
- https://caghana.com/contact

### 3. Check Emails
- Check `visuals@caghana.com` inbox for notification
- Check test email inbox for confirmation

## Troubleshooting

### "Service not redeploying"
- Click **"Manual Deploy"** → **"Deploy latest commit"**

### "Still getting email errors"
Check Render logs:
1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. Look for email-related errors

### "Can't find EMAIL_PASSWORD variable"
Add it manually:
1. Click **"Environment"** tab
2. Click **"Add Environment Variable"**
3. Key: `EMAIL_PASSWORD`
4. Value: `qndlyyshmqalmcwv`
5. Click **"Save Changes"**

## Direct Link to Your Service

**Render Services:** https://dashboard.render.com/services

---

**Need Help?**
- Render Docs: https://render.com/docs/environment-variables
- Check deployment logs for specific errors
