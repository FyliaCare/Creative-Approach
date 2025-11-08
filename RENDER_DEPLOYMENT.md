# Creative Approach Backend - Deployment Guide

## 🚀 Deploying to Render

This guide walks you through deploying the Creative Approach backend to Render with MongoDB Atlas.

### Prerequisites

1. ✅ GitHub account with your code pushed
2. ✅ Render account (free) - https://render.com
3. ✅ MongoDB Atlas account (free) - https://cloud.mongodb.com

---

## Step 1: Setup MongoDB Atlas (Free)

### 1.1 Create MongoDB Atlas Cluster

1. Go to https://cloud.mongodb.com and sign up/login
2. Click **"Build a Database"**
3. Choose **"M0 Free"** tier
4. Select region closest to your users (e.g., AWS us-east-1)
5. Name your cluster (e.g., "creative-approach")
6. Click **"Create"**

### 1.2 Create Database User

1. Go to **Database Access** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Username: `creativeadmin` (or your choice)
5. Click **"Autogenerate Secure Password"** - SAVE THIS!
6. Set role: **"Atlas admin"** or **"Read and write to any database"**
7. Click **"Add User"**

### 1.3 Whitelist IP Addresses

1. Go to **Network Access** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This is safe for MongoDB Atlas, it still requires username/password
4. Click **"Confirm"**

### 1.4 Get Connection String

1. Go to **Database** (left sidebar)
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string:
   ```
   mongodb+srv://creativeadmin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with the password you saved earlier
6. Add database name: `mongodb+srv://creativeadmin:PASSWORD@cluster0.xxxxx.mongodb.net/creative-approach?retryWrites=true&w=majority`

---

## Step 2: Prepare Backend for Deployment

### 2.1 Generate Secure Keys

Run these commands in PowerShell to generate secure random strings:

```powershell
# Generate JWT Secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate Session Secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save these outputs - you'll need them for Render.

### 2.2 Update Package.json (Already Done)

Your `backend/package.json` should have:
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

### 2.3 Push to GitHub

```powershell
cd backend
git add .
git commit -m "Prepare backend for production deployment"
git push origin main
```

---

## Step 3: Deploy to Render

### 3.1 Create Web Service

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: **FyliaCare/Creative-Approach**
4. Configure the service:

   **Basic Settings:**
   - Name: `creative-approach-backend`
   - Region: Choose closest to your users (Oregon, Frankfurt, etc.)
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`

   **Advanced Settings:**
   - Plan: `Free`
   - Auto-Deploy: `Yes`

### 3.2 Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"** and add these:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://creativeadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/creative-approach?retryWrites=true&w=majority
JWT_SECRET=<paste-your-generated-jwt-secret>
SESSION_SECRET=<paste-your-generated-session-secret>
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Creative Approach <noreply@creativeapproach.gh>
ADMIN_EMAIL=admin@creativeapproach.gh
ADMIN_PASSWORD=SecureAdmin@123
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Important Notes:**
- Replace `YOUR_PASSWORD` with your MongoDB Atlas password
- Replace JWT_SECRET and SESSION_SECRET with generated values
- CLIENT_URL and ADMIN_URL will be updated after deploying frontends
- For EMAIL_PASSWORD, use Gmail App Password (not regular password)

### 3.3 Deploy

1. Click **"Create Web Service"**
2. Render will start building and deploying
3. Wait 5-10 minutes for first deployment
4. Your backend URL will be: `https://creative-approach-backend.onrender.com`

---

## Step 4: Seed Admin User

After successful deployment:

1. Go to your Render dashboard
2. Click on your service → **"Shell"** tab
3. Run the seeder:
   ```bash
   npm run seed
   ```

This creates the admin user with credentials from your environment variables.

---

## Step 5: Test Your Deployment

### 5.1 Health Check

Visit: `https://creative-approach-backend.onrender.com/health`

You should see:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123,
  "mongodb": "connected"
}
```

### 5.2 Test API Endpoint

Using PowerShell or Postman:

```powershell
# Test login
$body = @{
    email = "admin@creativeapproach.gh"
    password = "SecureAdmin@123"
} | ConvertTo-Json

Invoke-RestMethod -Uri "https://creative-approach-backend.onrender.com/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

Should return:
```json
{
  "success": true,
  "data": {
    "token": "...",
    "user": { ... }
  }
}
```

---

## Step 6: Deploy Frontend Apps

### 6.1 Update Frontend Environment Variables

**Main Website (.env):**
```env
VITE_API_URL=https://creative-approach-backend.onrender.com
```

**Admin Dashboard (admin/.env):**
```env
VITE_API_URL=https://creative-approach-backend.onrender.com
VITE_SOCKET_URL=https://creative-approach-backend.onrender.com
```

### 6.2 Deploy Main Website to Render

1. Create new **"Static Site"** on Render
2. Name: `creative-approach-website`
3. Branch: `main`
4. Root Directory: `.` (empty, use root)
5. Build Command: `npm install && npm run build`
6. Publish Directory: `dist`
7. Add environment variable: `VITE_API_URL=https://creative-approach-backend.onrender.com`

### 6.3 Deploy Admin Dashboard to Render

1. Create another **"Static Site"** on Render
2. Name: `creative-approach-admin`
3. Branch: `main`
4. Root Directory: `admin`
5. Build Command: `npm install && npm run build`
6. Publish Directory: `dist`
7. Add environment variables:
   - `VITE_API_URL=https://creative-approach-backend.onrender.com`
   - `VITE_SOCKET_URL=https://creative-approach-backend.onrender.com`

### 6.4 Update Backend CORS URLs

After getting frontend URLs from Render, update backend environment variables:

```bash
CLIENT_URL=https://creative-approach-website.onrender.com
ADMIN_URL=https://creative-approach-admin.onrender.com
```

Click **"Save Changes"** - Render will redeploy automatically.

---

## 🎯 Post-Deployment Checklist

- [ ] Backend health check returns "OK"
- [ ] Admin login works
- [ ] Newsletter subscription works
- [ ] Quote form submission works
- [ ] Live chat connects
- [ ] Analytics tracking works
- [ ] File uploads work
- [ ] All CORS origins configured
- [ ] Environment variables set correctly
- [ ] Admin password changed from default
- [ ] Email service configured
- [ ] MongoDB Atlas backup enabled

---

## 🔧 Troubleshooting

### Backend won't start
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set
- Ensure MongoDB URI is correct
- Check MongoDB Atlas IP whitelist includes 0.0.0.0/0

### CORS errors
- Verify CLIENT_URL and ADMIN_URL match your frontend URLs exactly
- Include `https://` in URLs
- Check backend logs for CORS errors

### MongoDB connection fails
- Test connection string locally first
- Verify username and password are correct
- Check MongoDB Atlas IP whitelist
- Ensure database user has correct permissions

### File uploads not working
- Render free tier has ephemeral storage
- Consider using Cloudinary or AWS S3 for production
- Temporary solution: Files work during session but reset on redeploy

### Socket.io not connecting
- Ensure VITE_SOCKET_URL is set correctly
- Check browser console for errors
- Verify WebSocket connections are allowed

---

## 💰 Cost Breakdown (Free Tier)

| Service | Cost | Limits |
|---------|------|--------|
| **Render (Backend)** | Free | 750 hours/month, sleeps after 15 min inactivity |
| **Render (Frontend x2)** | Free | Unlimited bandwidth on free tier |
| **MongoDB Atlas** | Free | 512 MB storage, shared cluster |
| **Total** | **$0/month** | Perfect for development and low traffic |

### Upgrade Considerations:
- **Render Starter ($7/mo)**: No sleep, better performance
- **MongoDB Atlas M10 ($57/mo)**: Better performance, backups
- **Cloudinary Free**: 25 GB storage, 25 GB bandwidth for images

---

## 🚀 Going Live Checklist

Before announcing to users:

1. **Security:**
   - [ ] Change all default passwords
   - [ ] Use strong JWT secrets
   - [ ] Enable MongoDB Atlas backup
   - [ ] Configure email properly

2. **Performance:**
   - [ ] Test all endpoints
   - [ ] Check response times
   - [ ] Monitor Render logs

3. **Features:**
   - [ ] Test newsletter signup
   - [ ] Test quote submissions
   - [ ] Test live chat
   - [ ] Test admin dashboard
   - [ ] Test file uploads

4. **DNS & Domain:**
   - [ ] Point domain to Render apps (optional)
   - [ ] Update environment variables with custom domains
   - [ ] Update CORS settings

---

## 📞 Support Resources

- **Render Docs**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Your Backend API Docs**: See `backend/README.md`

---

**You're all set!** 🎉

Your Creative Approach platform is now running in the cloud, ready to handle visitors, quotes, and grow your drone services business!
