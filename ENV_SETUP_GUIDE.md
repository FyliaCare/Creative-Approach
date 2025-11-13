# Environment Variables Setup Guide

## 📋 Complete Environment Variables for Render

---

## 🔴 Backend Service: `creative-approach-backend`

**Service URL:** `https://creative-approach-api.onrender.com`  
**Custom Domain:** `https://api.caghana.com`

### Environment Variables:

```bash
NODE_ENV=production
PORT=5000

# Database
MONGODB_URI=mongodb+srv://admin:1YWYt4gqjQZukvJxAclusteY8_j1ka2fp.mongodb.net/creative-approach?retryWrites=true&w=majority&appName=Cluster0

# Security
JWT_SECRET=a16a8981e33e71ae593170bb1c28b03df155687a2cbf50a4ce6f899ff578086703f3dec55784b5dee5afa85c82a9eee804581cf473d98d25e2b8dbaf50ba448a
SESSION_SECRET=65ae535da8dd89b68aaf999f9949091017e7035ff24371b14be10d36a7b5d52

# Admin Credentials
ADMIN_EMAIL=admin@creativeapproach.gh
ADMIN_PASSWORD=CreativeAdmin2025!

# CORS URLs (CRITICAL!) - Use custom domains
ADMIN_URL=https://admin.caghana.com
CLIENT_URL=https://caghana.com

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=sales@caghana.com
EMAIL_PASS=iznqkvdjakovckva

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000
```

---

## 🟢 Frontend Service: `creative-approach-web`

**Service URL:** `https://creative-approach.onrender.com`  
**Custom Domain:** `https://caghana.com`

### Environment Variables:

```bash
VITE_API_URL=https://api.caghana.com
VITE_SOCKET_URL=https://api.caghana.com
```

---

## 🟡 Admin Service: `creative-approach-admin`

**Service URL:** `https://creative-approach-admin.onrender.com`  
**Custom Domain:** `https://admin.caghana.com`

### Environment Variables:

```bash
VITE_API_URL=https://api.caghana.com
VITE_SOCKET_URL=https://api.caghana.com
```

---

## ✅ Setup Instructions

### Step 1: Backend Service
1. Go to Render Dashboard → `creative-approach-backend`
2. Click **Environment** tab
3. Click **Edit** button
4. Copy ALL variables from the Backend section above
5. Click **Save Changes**
6. **Wait for automatic redeploy** (this is CRITICAL - backend needs to restart with new CORS settings)

### Step 2: Frontend Service
1. Go to Render Dashboard → `creative-approach`
2. Click **Environment** tab
3. Click **Edit** button
4. Add both VITE variables from Frontend section above
5. Click **Save Changes**
6. Click **Manual Deploy** → **Deploy latest commit** (REQUIRED for Vite env vars)

### Step 3: Admin Service
1. Go to Render Dashboard → `creative-approach-admin`
2. Click **Environment** tab
3. Click **Edit** button
4. Add both VITE variables from Admin section above
5. Click **Save Changes**
6. Click **Manual Deploy** → **Deploy latest commit** (REQUIRED for Vite env vars)

---

## 🔍 Verification Steps

### 1. Check Backend Health
```bash
curl https://creative-approach-api.onrender.com/health
```
Expected: `{"status":"OK","timestamp":"...","uptime":...,"mongodb":"connected"}`

### 2. Check CORS Headers
```bash
curl -I -X OPTIONS https://creative-approach-api.onrender.com/api/auth/me \
  -H "Origin: https://creative-approach-admin.onrender.com" \
  -H "Access-Control-Request-Method: GET"
```
Expected: Should see `Access-Control-Allow-Origin` header

### 3. Test Admin Login
1. Go to `https://creative-approach-admin.onrender.com/login`
2. Enter credentials:
   - Email: `admin@creativeapproach.gh`
   - Password: `CreativeAdmin2025!`
3. Should login successfully without CORS errors

### 4. Check Browser Console
- Open DevTools → Network tab
- Should see API calls to `creative-approach-api.onrender.com`
- Should NOT see any CORS errors
- Status codes should be 200 or 201 (not ERR_FAILED)

---

## 🚨 Common Issues & Solutions

### Issue: CORS errors after setting env vars
**Cause:** Backend hasn't redeployed with new variables  
**Fix:** Wait for backend redeploy to complete (~3-5 min)

### Issue: Admin/Frontend still using localhost
**Cause:** Vite env vars not rebuilt  
**Fix:** Trigger Manual Deploy for admin/frontend services

### Issue: "No Access-Control-Allow-Origin header"
**Cause:** CLIENT_URL or ADMIN_URL not set correctly in backend  
**Fix:** Double-check URLs match exactly (no trailing slashes):
- `https://creative-approach.onrender.com`
- `https://creative-approach-admin.onrender.com`

### Issue: Environment variables not showing
**Cause:** Typing error or spaces in variable names  
**Fix:** Copy-paste exactly from this document

---

## 🎯 Critical Notes

1. **Backend MUST redeploy** after adding CLIENT_URL and ADMIN_URL
2. **Frontend/Admin MUST rebuild** after adding VITE_* variables (use Manual Deploy)
3. **No trailing slashes** in URLs
4. **HTTPS only** in production URLs
5. **Wait for deployments** to complete before testing

---

## 📝 Quick Reference

| Service | Type | Rebuild Required? |
|---------|------|-------------------|
| Backend | Web Service | ✅ Auto (on env change) |
| Frontend | Static Site | ✅ Manual Deploy |
| Admin | Static Site | ✅ Manual Deploy |

---

## 🔗 Service URLs Summary

- **Backend API:** `https://api.caghana.com` (also: `https://creative-approach-api.onrender.com`)
- **Frontend:** `https://caghana.com` (also: `https://creative-approach.onrender.com`)
- **Admin Panel:** `https://admin.caghana.com` (also: `https://creative-approach-admin.onrender.com`)

All services are connected and CORS-enabled once environment variables are properly set!
