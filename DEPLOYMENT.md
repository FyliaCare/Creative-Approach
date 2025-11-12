# Render.com Deployment Guide

Quick reference for deploying Creative Approach to Render.com.

## Services to Create

### 1. Backend API (Web Service)
```
Type: Web Service
Name: creative-approach-api
Root Directory: backend
Build Command: npm install
Start Command: npm start
Instance Type: Starter ($7/mo recommended)
```

**Environment Variables**:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
JWT_SECRET=your_secure_jwt_secret_minimum_32_characters
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_specific_password
FRONTEND_URL=https://creative-approach.onrender.com
ADMIN_URL=https://creative-approach-admin.onrender.com
NODE_ENV=production
```

### 2. Frontend (Static Site)
```
Type: Static Site
Name: creative-approach
Build Command: npm install && npm run build
Publish Directory: dist
Auto-Deploy: Yes
```

**Environment Variables**:
```
VITE_API_URL=https://creative-approach-api.onrender.com
VITE_SOCKET_URL=https://creative-approach-api.onrender.com
```

### 3. Admin Panel (Static Site)
```
Type: Static Site
Name: creative-approach-admin
Root Directory: admin
Build Command: npm install && npm run build
Publish Directory: admin/dist
Auto-Deploy: Yes
```

**Environment Variables**:
```
VITE_API_URL=https://creative-approach-api.onrender.com
VITE_SOCKET_URL=https://creative-approach-api.onrender.com
```

## Quick Deploy Checklist

- [ ] MongoDB Atlas cluster created and configured
- [ ] Gmail App Password generated for SMTP
- [ ] Code pushed to GitHub main branch
- [ ] Backend service created on Render
- [ ] Frontend static site created on Render
- [ ] Admin static site created on Render
- [ ] All environment variables configured
- [ ] Admin account seeded
- [ ] All services tested

## Default Admin Login
```
Email: admin@creativeapproach.gh
Password: admin123
```
**⚠️ Change immediately after first login!**

## Troubleshooting

**Backend won't start**: Check MongoDB connection string and environment variables
**404 on refresh**: Ensure `_redirects` file exists in public folders
**Socket.IO errors**: Verify VITE_SOCKET_URL matches backend URL exactly
**Images not loading**: Check uploads directory and Multer configuration

## Support
For issues, check logs in Render dashboard or MongoDB Atlas monitoring.
