# 🚀 Quick Deployment Reference Card

## Backend ✅ DEPLOYED
**URL:** https://creative-approach-backend.onrender.com

---

## Frontend Website - Deploy Now!

### Quick Steps:
1. Render → "New +" → "Static Site"
2. Select: `FyliaCare/Creative-Approach`
3. Settings:
   - Name: `creative-approach-website`
   - Root: *empty*
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. Environment Variable:
   ```
   VITE_API_URL=https://creative-approach-backend.onrender.com
   ```
5. Click "Create Static Site"

---

## Admin Dashboard - Deploy After Website

### Quick Steps:
1. Render → "New +" → "Static Site"
2. Select: `FyliaCare/Creative-Approach`
3. Settings:
   - Name: `creative-approach-admin`
   - Root: `admin`
   - Build: `npm install && npm run build`
   - Publish: `dist`
4. Environment Variables:
   ```
   VITE_API_URL=https://creative-approach-backend.onrender.com
   VITE_SOCKET_URL=https://creative-approach-backend.onrender.com
   ```
5. Click "Create Static Site"

---

## After Both Frontends Deploy

### Update Backend CORS:
1. Go to backend service on Render
2. Environment → Edit these:
   ```
   CLIENT_URL=https://your-website-url.onrender.com
   ADMIN_URL=https://your-admin-url.onrender.com
   ```
3. Save → Auto-redeploys

---

## Test Everything:
- Website: Newsletter, Chat, Contact form
- Admin: Login → Dashboard → Newsletter list
- Backend: `/health` endpoint

---

**Full Guide:** See [FRONTEND_DEPLOYMENT.md](./FRONTEND_DEPLOYMENT.md)
