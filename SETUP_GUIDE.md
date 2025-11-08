# 🚀 Complete Setup Guide - Creative Approach

## System Requirements

- **Node.js:** v18.0.0 or higher
- **npm:** v9.0.0 or higher
- **MongoDB:** v6.0 or higher (local) OR MongoDB Atlas account
- **Operating System:** Windows, macOS, or Linux

---

## 📦 Installation Steps

### Step 1: Clone the Repository (if not already)

```powershell
git clone https://github.com/FyliaCare/Creative-Approach.git
Set-Location Creative-Approach
```

### Step 2: Install Frontend Dependencies

```powershell
# In project root
npm install
```

**Dependencies installed:**
- react, react-dom, react-router-dom
- framer-motion (animations)
- socket.io-client (real-time chat)
- tailwindcss (styling)
- vite (build tool)

### Step 3: Install Backend Dependencies

```powershell
Set-Location backend
npm install
```

**Dependencies installed:**
- express, mongoose, socket.io
- jsonwebtoken, bcryptjs
- nodemailer, multer, geoip-lite
- helmet, cors, compression, express-rate-limit
- And more...

### Step 4: Configure Backend Environment

```powershell
# In backend folder
Copy-Item .env.example .env
```

**Edit `backend/.env` file:**

```env
# Environment
NODE_ENV=development
PORT=5000

# Database (Choose one option)
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/creative-approach

# Option 2: MongoDB Atlas (Cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creative-approach

# JWT Secret (CHANGE THIS!)
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long-please-change-this

# Admin Credentials (CHANGE THESE!)
ADMIN_EMAIL=admin@creativeapproach.com
ADMIN_PASSWORD=Admin123!ChangeThis

# Frontend URLs
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3002

# Email Configuration (Optional for now)
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
EMAIL_FROM=Creative Approach <noreply@creativeapproach.gh>

# Security
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
MAX_FILE_SIZE=10485760
SESSION_SECRET=another-random-secret-key-change-this-too
```

**Important:** Change `JWT_SECRET`, `ADMIN_PASSWORD`, and `SESSION_SECRET` to secure random values!

### Step 5: Configure Frontend Environment

```powershell
# Go back to project root
Set-Location ..
```

Create `.env` file in project root:

```env
VITE_API_URL=http://localhost:5000
```

### Step 6: Start MongoDB

**Option A - Local MongoDB:**
```powershell
# In a new terminal
mongod
```

**Option B - MongoDB Atlas:**
- No need to start anything, just use the connection string in `backend/.env`

### Step 7: Seed Admin User

```powershell
Set-Location backend
npm run seed
```

**Expected output:**
```
✅ Connected to MongoDB
✅ Admin user created successfully
📧 Email: admin@creativeapproach.com
🔑 Password: Admin123!ChangeThis

⚠️  IMPORTANT: Change the admin password after first login!
```

---

## 🎯 Running the Application

### Start Backend Server

```powershell
# In backend folder
npm run dev
```

**Expected output:**
```
🚀 Server running on port 5000
📊 Environment: development
🌐 Client URL: http://localhost:3000
🔧 Admin URL: http://localhost:3002
✅ MongoDB connected successfully
```

**Keep this terminal open!**

### Start Frontend Server

```powershell
# In new terminal, go to project root
Set-Location C:\Users\Jay Monty\Desktop\Projects\Creative-approach
npm run dev
```

**Expected output:**
```
VITE v7.2.2  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
➜  press h to show help
```

**Note:** Port might be 5173 or 3000 depending on availability.

### Access the Application

Open your browser and visit:
- **Main Website:** http://localhost:5173 (or shown port)
- **Backend API:** http://localhost:5000
- **Health Check:** http://localhost:5000/health

---

## ✅ Verify Installation

### 1. Check Backend Health

```powershell
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 5.234,
  "mongodb": "connected"
}
```

### 2. Test Newsletter Subscription

1. Open http://localhost:5173 in browser
2. Scroll to bottom (blue newsletter section)
3. Enter email: test@example.com
4. Click "Subscribe"
5. Should see green success message

**Check MongoDB:**
```powershell
mongosh
use creative-approach
db.newsletters.find()
```

### 3. Test Live Chat

1. Click floating blue chat button (bottom-right)
2. Enter name: "Test User"
3. Click "Start Chat"
4. Send a message
5. Should appear in chat window

**Check MongoDB:**
```javascript
db.chatmessages.find()
```

### 4. Test Quote Request

1. Go to Contact page
2. Fill out the form
3. Click "Send Message"
4. Should see green success message

**Check MongoDB:**
```javascript
db.quotations.find()
```

---

## 🗂️ Project Structure

```
Creative-Approach/
├── backend/                    # Node.js Backend
│   ├── models/                # Mongoose models
│   │   ├── User.js
│   │   ├── Newsletter.js
│   │   ├── Blog.js
│   │   ├── Quotation.js
│   │   ├── ChatMessage.js
│   │   └── Visitor.js
│   ├── routes/                # API routes
│   │   ├── auth.js
│   │   ├── newsletter.js
│   │   ├── blog.js
│   │   ├── quotations.js
│   │   ├── analytics.js
│   │   └── upload.js
│   ├── middleware/            # Custom middleware
│   │   ├── auth.js
│   │   ├── errorHandler.js
│   │   └── analytics.js
│   ├── socket/                # Socket.io handlers
│   │   └── chat.js
│   ├── seeders/               # Database seeders
│   │   └── admin.js
│   ├── uploads/               # File uploads
│   ├── server.js              # Main server file
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── src/                       # React Frontend
│   ├── components/
│   │   ├── chat/
│   │   │   └── LiveChat.jsx
│   │   └── Newsletter.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Industries.jsx
│   │   └── Contact.jsx
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── App.jsx
│   └── main.jsx
│
├── public/                    # Static files
├── .env                      # Frontend environment
├── .env.example
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

---

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Error:** `MongoServerError: connect ECONNREFUSED`

**Solutions:**
1. Check if MongoDB is running: `mongod`
2. Verify `MONGODB_URI` in `backend/.env`
3. Try using `127.0.0.1` instead of `localhost`:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/creative-approach
   ```

### Issue: Port Already in Use

**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solutions:**
1. Kill process on port 5000:
   ```powershell
   Get-NetTCPConnection -LocalPort 5000 | Select-Object -ExpandProperty OwningProcess | ForEach-Object { Stop-Process -Id $_ -Force }
   ```
2. Or change port in `backend/.env`:
   ```
   PORT=5001
   ```

### Issue: CORS Error in Browser Console

**Error:** `Access to fetch at 'http://localhost:5000/api/...' from origin 'http://localhost:5173' has been blocked by CORS policy`

**Solutions:**
1. Check `CLIENT_URL` in `backend/.env` matches your frontend port
2. Restart backend server after changing .env

### Issue: Socket.io Not Connecting

**Error:** Chat shows "Connecting..." but never connects

**Solutions:**
1. Check `VITE_API_URL` in frontend `.env`
2. Verify backend server is running
3. Check browser console for errors
4. Try: `VITE_API_URL=http://localhost:5000` (without /api)

### Issue: Newsletter Shows Error

**Error:** "Failed to subscribe. Please try again."

**Solutions:**
1. Check backend logs for detailed error
2. Verify MongoDB is connected
3. Check `VITE_API_URL` in frontend `.env`
4. Test backend directly:
   ```powershell
   $body = @{ email = "test@test.com" } | ConvertTo-Json
   Invoke-RestMethod -Uri "http://localhost:5000/api/newsletter/subscribe" -Method POST -Body $body -ContentType "application/json"
   ```

---

## 🎯 Quick Commands Reference

### Backend

```powershell
# Install dependencies
Set-Location backend
npm install

# Create environment file
Copy-Item .env.example .env

# Seed admin user
npm run seed

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start
```

### Frontend

```powershell
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### MongoDB

```powershell
# Start MongoDB
mongod

# Open MongoDB shell
mongosh

# Use database
use creative-approach

# List collections
show collections

# View data
db.newsletters.find()
db.quotations.find()
db.visitors.find()
db.chatmessages.find()

# Count documents
db.newsletters.countDocuments()

# Clear collection (for testing)
db.newsletters.deleteMany({})
```

---

## 🧪 Testing Checklist

- [ ] Backend server starts without errors
- [ ] Frontend server starts without errors
- [ ] MongoDB connection is successful
- [ ] Health check endpoint responds
- [ ] Newsletter subscription works
- [ ] Success message appears after subscription
- [ ] Live chat button appears
- [ ] Chat window opens when clicked
- [ ] Messages can be sent in chat
- [ ] Contact form submission works
- [ ] Quote request shows success message
- [ ] No console errors in browser
- [ ] Data appears in MongoDB collections
- [ ] Mobile layout looks correct
- [ ] All pages load properly

---

## 📚 Documentation

- **Backend API:** See `backend/README.md`
- **Quick Start:** See `backend/QUICKSTART.md`
- **Integration:** See `INTEGRATION_GUIDE.md`
- **Testing:** See `TESTING_GUIDE.md`
- **Project Status:** See `PROJECT_STATUS.md`
- **Deployment:** See `DEPLOYMENT.md`

---

## 🚀 Next Steps

### For Development

1. **Test all features** using `TESTING_GUIDE.md`
2. **Configure email** (optional) for notifications
3. **Build admin dashboard** (only remaining feature)
4. **Add more content** (blog posts, projects)

### For Production

1. **Deploy backend** to Render/Heroku/Railway
2. **Deploy frontend** to Render/Vercel/Netlify
3. **Use MongoDB Atlas** for database
4. **Set environment variables** on hosting platforms
5. **Configure custom domain**
6. **Enable HTTPS/SSL**

---

## 🎉 You're All Set!

Your Creative Approach website is now running with:
- ✅ Beautiful animated frontend
- ✅ Comprehensive backend API
- ✅ Real-time live chat
- ✅ Newsletter management
- ✅ Quote request system
- ✅ Visitor analytics with country tracking
- ✅ Security features enabled

**Access your site at:** http://localhost:5173

**Happy Developing!** 🚁✨

---

## 📞 Need Help?

Check these resources:
1. Look at browser console for frontend errors
2. Check terminal logs for backend errors
3. Review documentation files
4. Test API endpoints with Postman
5. Check MongoDB data with MongoDB Compass

**Most common fix:** Restart both servers and check .env files!
