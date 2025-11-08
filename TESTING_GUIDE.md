# 🧪 Testing Guide - Creative Approach Full Stack

## Quick Test Checklist

Use this checklist to verify everything is working:

### Backend Setup
- [ ] MongoDB is running (local or Atlas)
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Backend `.env` configured (copy from `.env.example`)
- [ ] Admin user seeded (`npm run seed`)
- [ ] Backend server running (`npm run dev` on port 5000)
- [ ] Health check passes: `http://localhost:5000/health`

### Frontend Setup
- [ ] Frontend dependencies installed (`npm install` in root)
- [ ] Frontend `.env` exists with `VITE_API_URL=http://localhost:5000`
- [ ] Frontend server running (`npm run dev`)

---

## 🎯 Test Scenarios

### 1. Newsletter Subscription Test

**Steps:**
1. Go to homepage: `http://localhost:3000` (or your Vite port)
2. Scroll to the bottom newsletter section (blue gradient background)
3. Enter your name (optional): "John Doe"
4. Enter your email: "test@example.com"
5. Click "Subscribe" button

**Expected Result:**
- ✅ Loading spinner appears
- ✅ Green success message: "Successfully subscribed to newsletter!"
- ✅ Form fields clear after 5 seconds
- ✅ Backend terminal shows: `POST /api/newsletter/subscribe 201`
- ✅ MongoDB `newsletters` collection has new document with:
  - email: "test@example.com"
  - name: "John Doe"
  - status: "active"
  - country: Your country (from IP)
  - ipAddress: Your IP

**Error Cases to Test:**
- Empty email → Shows error: "Please enter your email"
- Invalid email (e.g., "test@") → Shows error
- Duplicate subscription → Shows: "Email is already subscribed"
- Backend offline → Shows error message

**Check Backend:**
```powershell
# View terminal for log
POST /api/newsletter/subscribe 201

# Check MongoDB
mongosh
use creative-approach
db.newsletters.find()
```

---

### 2. Live Chat Test

**Steps:**
1. Go to any page
2. Look for floating blue chat button (bottom-right corner)
3. Verify green dot shows "Online" status
4. Click the chat button
5. Chat window opens
6. Enter name: "Test Visitor"
7. Enter email (optional): "visitor@example.com"
8. Click "Start Chat"
9. Type a message: "Hello, I need help"
10. Click send (paper plane icon)

**Expected Result:**
- ✅ Chat button has green online indicator
- ✅ Chat window opens with animation
- ✅ Form accepts name/email
- ✅ After submit, chat interface appears
- ✅ Message appears in blue bubble (right side)
- ✅ Timestamp shows below message
- ✅ Backend terminal shows Socket.io logs:
  ```
  New client connected: [socket-id]
  ```
- ✅ MongoDB `chatmessages` collection has message
- ✅ If admin was online, they'd receive notification

**Advanced Tests:**
- Type without sending → Typing indicator should work
- Close chat and reopen → Message history loads
- Send multiple messages → All appear in order
- Admin replies → Message appears in white bubble (left side)

**Simulate Admin Reply (Backend Testing):**
Open MongoDB Compass or mongosh:
```javascript
db.chatmessages.insertOne({
  conversationId: "visitor-[your-conversation-id]",
  senderName: "Support Team",
  senderType: "admin",
  message: "Hi! How can we help you?",
  isRead: false,
  createdAt: new Date()
})
```
Reload chat to see admin message.

---

### 3. Quote Request Test

**Steps:**
1. Go to Contact page: `http://localhost:3000/contact`
2. Fill out the form:
   - **Name:** John Smith (required)
   - **Email:** john@company.com (required)
   - **Phone:** +233 24 123 4567 (required)
   - **Company:** ABC Construction (optional)
   - **Service:** Select "Aerial Photography" (required)
   - **Project Type:** Select "Real Estate"
   - **Budget:** Select "GHS 5,000 - 10,000"
   - **Timeline:** Select "1-2 weeks"
   - **Location:** Accra, Ghana
   - **Message:** "We need aerial shots of our new property development" (required)
3. Click "Send Message"

**Expected Result:**
- ✅ Loading state: Button shows "Sending..." with spinner
- ✅ Green success box appears:
  - Checkmark icon
  - "Quote Request Sent!"
  - "We'll respond within 2 hours"
  - "Check your email for confirmation"
- ✅ Form resets after 5 seconds
- ✅ Backend terminal shows: `POST /api/quotations 201`
- ✅ MongoDB `quotations` collection has new document with:
  - All form data
  - status: "new"
  - priority: "medium"
  - country: Your country
  - ipAddress: Your IP
  - createdAt: Current timestamp
- ✅ MongoDB `visitors` collection updated:
  - converted: true
  - actions array has "quote_request"

**Error Cases:**
- Missing required fields → Red error messages appear
- Invalid email format → "Email is invalid"
- Backend offline → Red error box with message

**Verify in MongoDB:**
```javascript
db.quotations.find().sort({createdAt: -1}).limit(1)
db.visitors.find({converted: true})
```

---

### 4. Analytics Tracking Test

**Steps:**
1. Open browser in incognito/private mode
2. Visit homepage: `http://localhost:3000`
3. Navigate to different pages (About, Services, Contact)
4. Stay on site for 30+ seconds
5. Check MongoDB

**Expected Result:**
- ✅ MongoDB `visitors` collection has new document:
  ```javascript
  {
    sessionId: "uuid-generated",
    ipAddress: "your-ip",
    country: "Ghana" (or your country),
    browser: "Chrome" (or your browser),
    os: "Windows" (or your OS),
    device: "desktop" (or mobile/tablet),
    pages: [
      { url: "/", visitedAt: timestamp },
      { url: "/about", visitedAt: timestamp },
      // ... more pages
    ],
    entryPage: "/",
    totalPageViews: 3,
    isActive: true,
    bounced: false (because multiple pages),
    converted: false (until newsletter/quote),
    sessionDuration: 30+ seconds
  }
  ```

**Test Conversion Tracking:**
1. While still in incognito, submit a quote request
2. Check visitor document:
   - `converted: true`
   - `actions` array has entry

---

### 5. API Health Check Test

**Test Backend Health:**
```powershell
curl http://localhost:5000/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "mongodb": "connected"
}
```

---

### 6. CORS Test

**Test from Different Origin:**
```javascript
// Open browser console on google.com
fetch('http://localhost:5000/api/newsletter/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@example.com' })
})
```

**Expected Result:**
- ❌ CORS error (blocked) - This is correct! Backend only allows your frontend URL

**Fix if needed:**
Backend `.env` should have:
```
CLIENT_URL=http://localhost:3000
```

---

### 7. Socket.io Connection Test

**Test Socket.io Directly (Browser Console):**
```javascript
// On your frontend page, open DevTools Console
const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected!', socket.id);
});

socket.on('disconnect', () => {
  console.log('Disconnected!');
});

// Test join event
socket.emit('join', {
  conversationId: 'test-123',
  user: { name: 'Test', type: 'visitor' }
});

// Test send message
socket.emit('send-message', {
  conversationId: 'test-123',
  senderName: 'Test',
  senderType: 'visitor',
  message: 'Hello from console!'
});
```

**Expected Result:**
- ✅ Console logs "Connected!" with socket ID
- ✅ Backend terminal shows new connection
- ✅ Message appears in chat widget (if open)

---

### 8. Error Handling Test

**Test Newsletter with Backend Offline:**
1. Stop backend server (Ctrl+C)
2. Try to subscribe to newsletter
3. Expected: Red error message appears

**Test Chat with Backend Offline:**
1. Backend offline
2. Click chat button
3. Expected: Shows "Connecting..." but doesn't connect

**Test Quote with Invalid Data:**
1. Enter invalid email: "notanemail"
2. Expected: "Email is invalid" error

---

### 9. Mobile Responsive Test

**Test on Mobile:**
1. Open DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Test all features:
   - Newsletter signup
   - Chat widget (should be full-height on mobile)
   - Contact form (stacked layout)

**Expected Result:**
- ✅ All components adjust to screen size
- ✅ Text remains readable
- ✅ Buttons are tap-friendly
- ✅ Chat window takes more screen space
- ✅ Forms stack vertically

---

### 10. Performance Test

**Test Page Load Speed:**
1. Open DevTools Network tab
2. Hard reload (Ctrl+Shift+R)
3. Check "Load" time

**Expected:**
- ✅ Homepage loads in < 2 seconds
- ✅ API calls return in < 200ms (local)
- ✅ Socket.io connects in < 100ms

**Test Concurrent Users:**
```powershell
# Open 5 browser tabs
# All subscribe to newsletter
# Check backend handles all requests
```

---

## 🐛 Common Issues & Fixes

### Issue: "Cannot POST /api/newsletter/subscribe"
**Fix:** Backend not running. Start backend: `cd backend && npm run dev`

### Issue: CORS error in browser console
**Fix:** Check backend `.env` has correct `CLIENT_URL`

### Issue: MongoDB connection failed
**Fix:** 
1. Check MongoDB is running: `mongod`
2. Or update `MONGODB_URI` in backend `.env`

### Issue: Chat not connecting
**Fix:**
1. Check `VITE_API_URL` in frontend `.env`
2. Verify Socket.io server in backend logs
3. Check browser console for errors

### Issue: Newsletter shows "Email already exists"
**Fix:** Expected behavior! Use different email or clear DB:
```javascript
db.newsletters.deleteMany({})
```

### Issue: Quote form validation errors
**Fix:** Fill all required fields (marked with *)

---

## 📊 MongoDB Verification

**Check Collections:**
```javascript
mongosh
use creative-approach

// List all collections
show collections

// Count documents
db.newsletters.countDocuments()
db.quotations.countDocuments()
db.chatmessages.countDocuments()
db.visitors.countDocuments()

// View recent data
db.newsletters.find().limit(5)
db.quotations.find().limit(5)
db.visitors.find().sort({createdAt: -1}).limit(3)
```

---

## ✅ Success Criteria

All tests pass if:
- ✅ Backend health check returns 200 OK
- ✅ Newsletter subscription creates DB record
- ✅ Live chat sends/receives messages in real-time
- ✅ Quote requests saved to database
- ✅ Visitor analytics tracked automatically
- ✅ All forms show proper validation errors
- ✅ Success messages appear after submissions
- ✅ Socket.io shows online status
- ✅ Mobile layout works correctly
- ✅ CORS allows frontend, blocks others

---

## 🚀 Production Testing

Before deploying:
1. Test with production MongoDB Atlas URL
2. Test with production API URL
3. Test HTTPS connections
4. Test from real mobile devices
5. Test email notifications (when implemented)
6. Load test with multiple users

---

## 📝 Test Results Template

```
Date: __________
Tester: __________

✅ Newsletter subscription works
✅ Live chat connects and sends messages
✅ Quote request submitted successfully
✅ Analytics tracking visitors
✅ Mobile responsive
✅ Error handling works
✅ Socket.io real-time updates
✅ MongoDB data persists correctly

Issues Found:
- None / [List any issues]

Notes:
[Any observations or suggestions]
```

---

**Happy Testing!** 🧪

If all tests pass, your full-stack Creative Approach website is working perfectly!
