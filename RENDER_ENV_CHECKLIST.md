# Render Environment Variables Checklist

## ⚠️ CRITICAL: Verify These Settings in Render Dashboard

All services are configured to use environment variables for production routing. **Localhost is only used as a fallback for local development.**

---

## 🔴 Backend Service: `creative-approach-api`

**Service URL:** `https://creative-approach-api.onrender.com`

### Required Environment Variables:

```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creative-approach?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-here
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
CLIENT_URL=https://creative-approach-web.onrender.com
ADMIN_URL=https://creative-approach-admin.onrender.com
```

### How to Set:
1. Go to Render Dashboard → `creative-approach-api` service
2. Click **Environment** tab
3. Add each variable above
4. Click **Save Changes**

---

## 🟢 Frontend Service: `creative-approach-web`

**Service URL:** `https://creative-approach-web.onrender.com`

### Required Environment Variables:

```bash
VITE_API_URL=https://creative-approach-api.onrender.com
VITE_SOCKET_URL=https://creative-approach-api.onrender.com
```

### How to Set:
1. Go to Render Dashboard → `creative-approach-web` service
2. Click **Environment** tab
3. Add both variables above
4. Click **Save Changes**
5. **Trigger Manual Deploy** (environment variables require rebuild)

---

## 🟡 Admin Service: `creative-approach-admin`

**Service URL:** `https://creative-approach-admin.onrender.com`

### Required Environment Variables:

```bash
VITE_API_URL=https://creative-approach-api.onrender.com
VITE_SOCKET_URL=https://creative-approach-api.onrender.com
```

### How to Set:
1. Go to Render Dashboard → `creative-approach-admin` service
2. Click **Environment** tab
3. Add both variables above
4. Click **Save Changes**
5. **Trigger Manual Deploy** (environment variables require rebuild)

---

## ✅ Verification Steps

### 1. Check Backend API Health
```bash
curl https://creative-approach-api.onrender.com/api/health
```
Expected response: `{"status":"ok","environment":"production"}`

### 2. Check Frontend Routing
- Open browser DevTools → Network tab
- Visit: `https://creative-approach-web.onrender.com`
- Check API calls - should go to `creative-approach-api.onrender.com`
- **NOT** `localhost:5000`

### 3. Check Admin Panel Routing
- Open browser DevTools → Network tab
- Visit: `https://creative-approach-admin.onrender.com`
- Check API calls - should go to `creative-approach-api.onrender.com`
- **NOT** `localhost:5000`

### 4. Check Socket.io Connections
- Open browser DevTools → Console
- Look for: `Socket connected to: creative-approach-api.onrender.com`
- **NOT** `localhost:5000`

---

## 🔧 Common Issues

### Issue: API calls still going to localhost
**Cause:** Environment variables not set in Render Dashboard  
**Fix:** Add `VITE_API_URL` to frontend/admin service and **trigger manual deploy**

### Issue: CORS errors
**Cause:** Backend `CLIENT_URL` and `ADMIN_URL` not configured  
**Fix:** Set both in backend environment variables

### Issue: Socket.io not connecting
**Cause:** `VITE_SOCKET_URL` not set or incorrect  
**Fix:** Set to same value as `VITE_API_URL`

### Issue: Changes not reflected after updating env vars
**Cause:** Static sites need rebuild when env vars change  
**Fix:** Click "Manual Deploy" → "Deploy latest commit"

---

## 📝 Current Configuration Summary

### Localhost Fallbacks (Development Only)
All services have localhost fallbacks for local development:
- `import.meta.env.VITE_API_URL || 'http://localhost:5000'`

These fallbacks are **ONLY used when environment variables are not set**.

### Production Configuration
When deployed to Render with proper environment variables:
- ✅ Frontend → Backend API: `https://creative-approach-api.onrender.com`
- ✅ Admin → Backend API: `https://creative-approach-api.onrender.com`
- ✅ Socket.io connections: `https://creative-approach-api.onrender.com`
- ✅ Backend CORS: Allows frontend and admin URLs

---

## 🚀 Quick Fix Command

If you haven't set environment variables yet, go to each service in Render Dashboard and add them now. Then trigger manual deploys for frontend and admin services.

**Remember:** Vite environment variables (VITE_*) are **build-time variables**, so you must rebuild when they change!
