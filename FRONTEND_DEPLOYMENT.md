# 🌐 Frontend Deployment Guide - Render

**Backend URL:** https://creative-approach-backend.onrender.com

---

## 📋 Deploy Main Website (Public Frontend)

### Step 1: Create Static Site on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Static Site"**
3. Select repository: **`FyliaCare/Creative-Approach`**

### Step 2: Configure Static Site

**Basic Settings:**
- **Name:** `creative-approach-website`
- **Branch:** `main`
- **Root Directory:** *leave empty* (or just `.`)
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Step 3: Add Environment Variable

Click **"Advanced"** → **"Add Environment Variable"**

Add this ONE variable:

```
Key: VITE_API_URL
Value: https://creative-approach-backend.onrender.com
```

**⚠️ Important:** NO trailing slash!

### Step 4: Deploy

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build and deployment
3. Your website URL will be something like: `https://creative-approach-website.onrender.com`

### Step 5: Test Website

Visit your website URL and test:
- ✅ Homepage loads with animations
- ✅ All pages navigate correctly
- ✅ Scroll down to newsletter section
- ✅ Enter email and click subscribe → Should see success message
- ✅ Click chat icon (bottom right) → Chat widget opens
- ✅ Go to Contact page → Submit test quote
- ✅ Check mobile responsiveness

---

## ⚙️ Deploy Admin Dashboard

### Step 1: Create Another Static Site

1. Go back to Render dashboard
2. Click **"New +"** → **"Static Site"**
3. Select repository: **`FyliaCare/Creative-Approach`** (same repo)

### Step 2: Configure Admin Dashboard

**Basic Settings:**
- **Name:** `creative-approach-admin`
- **Branch:** `main`
- **Root Directory:** `admin`
- **Build Command:** `npm install && npm run build`
- **Publish Directory:** `dist`

### Step 3: Add Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these TWO variables:

```
Key: VITE_API_URL
Value: https://creative-approach-backend.onrender.com

Key: VITE_SOCKET_URL
Value: https://creative-approach-backend.onrender.com
```

**⚠️ Important:** NO trailing slash on either!

### Step 4: Deploy

1. Click **"Create Static Site"**
2. Wait 3-5 minutes for build and deployment
3. Your admin URL will be something like: `https://creative-approach-admin.onrender.com`

### Step 5: Test Admin Dashboard

1. Visit your admin dashboard URL
2. Login with:
   - **Email:** `admin@creativeapproach.gh`
   - **Password:** `CreativeAdmin2025!`
3. Check that:
   - ✅ Dashboard loads with real-time stats
   - ✅ Newsletter page shows any test subscribers
   - ✅ Real-time visitors appear
   - ✅ Navigation works
   - ✅ Can logout and login again

---

## 🔄 Update Backend CORS (CRITICAL!)

After both frontends are deployed, you MUST update the backend:

### Step 1: Get Your Frontend URLs

- **Website URL:** `https://creative-approach-website.onrender.com` (or your actual URL)
- **Admin URL:** `https://creative-approach-admin.onrender.com` (or your actual URL)

### Step 2: Update Backend Environment Variables

1. Go to Render dashboard
2. Click on your **backend** service (`creative-approach-backend`)
3. Click **"Environment"** in the left sidebar
4. Find and UPDATE these two variables:

```
CLIENT_URL=https://creative-approach-website.onrender.com
ADMIN_URL=https://creative-approach-admin.onrender.com
```

Replace with YOUR actual URLs from Render!

5. Click **"Save Changes"**
6. Backend will automatically redeploy (1-2 minutes)

---

## ✅ Final Testing Checklist

### Website Tests:
- [ ] Homepage loads and animations work
- [ ] Newsletter signup works (check MongoDB or admin dashboard)
- [ ] Live chat widget appears and connects
- [ ] Contact form submits successfully
- [ ] All pages load without errors
- [ ] Mobile view works correctly

### Admin Dashboard Tests:
- [ ] Login successful
- [ ] Dashboard shows real statistics
- [ ] Newsletter subscribers list loads
- [ ] Can see visitors from website
- [ ] Real-time updates work
- [ ] Chat interface shows connections

### Backend Tests:
- [ ] Visit: `https://creative-approach-backend.onrender.com/health`
- [ ] Should return: `{"status":"OK","mongodb":"connected"}`
- [ ] No CORS errors in browser console

---

## 🎉 Your Live URLs

After deployment, you'll have:

1. **Main Website:** `https://creative-approach-website.onrender.com`
2. **Admin Dashboard:** `https://creative-approach-admin.onrender.com`
3. **Backend API:** `https://creative-approach-backend.onrender.com`

**Share the website URL with your team and clients!** 🚀

---

## 🐛 Troubleshooting

### "Network Error" or "Failed to fetch"
- Check that `VITE_API_URL` is set correctly (no trailing slash)
- Verify backend is live and healthy
- Check browser console for CORS errors
- Ensure CLIENT_URL and ADMIN_URL are updated in backend

### Newsletter signup doesn't work
- Open browser DevTools (F12) → Console
- Look for error messages
- Verify API URL in environment variables
- Test backend directly: `https://creative-approach-backend.onrender.com/api/newsletter/subscribe`

### Admin login fails
- Check backend logs for errors
- Verify you ran the seed command: `npm run seed`
- Try resetting password in backend environment variables
- Check JWT_SECRET is set in backend

### Chat widget doesn't connect
- Check VITE_SOCKET_URL is set correctly
- Verify Socket.io is running (backend logs)
- Open browser console for WebSocket errors
- Ensure no firewall blocking WebSocket connections

### Build fails
- Check build logs in Render dashboard
- Verify build command is correct
- Ensure all dependencies are in package.json
- Try building locally first: `npm run build`

---

## 📊 Free Tier Limits

All three services on **FREE** tier:
- Backend: 750 hours/month (sleeps after 15 min inactivity)
- Frontend Website: Unlimited bandwidth
- Admin Dashboard: Unlimited bandwidth

**Total Cost: $0/month** 🎉

---

## 🔒 Post-Deployment Security

1. **Change admin password** immediately:
   - Login to admin dashboard
   - Go to Settings
   - Update password from `CreativeAdmin2025!`

2. **Setup email service:**
   - Get Gmail App Password
   - Update `EMAIL_USER` and `EMAIL_PASSWORD` in backend
   - Test email notifications

3. **Monitor your apps:**
   - Check Render dashboard regularly
   - Review MongoDB Atlas metrics
   - Watch for errors in logs

---

## 🎯 Next Steps

- [ ] Test all features end-to-end
- [ ] Share website URL with stakeholders
- [ ] Change admin password
- [ ] Configure email service
- [ ] Add custom domain (optional)
- [ ] Setup uptime monitoring
- [ ] Enable MongoDB backups

---

**Need help?** Check the comprehensive guides:
- [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)
- [TESTING_GUIDE.md](./TESTING_GUIDE.md)
- [backend/README.md](./backend/README.md)

**Ready to go live!** 🚀✨
