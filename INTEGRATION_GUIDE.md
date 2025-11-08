# Frontend-Backend Integration Guide

This guide explains how the Creative Approach website connects to the backend API.

## 🎯 What's Been Integrated

### ✅ Newsletter Subscription
- **Component:** `src/components/Newsletter.jsx`
- **Location:** Added to homepage (bottom section)
- **Features:**
  - Email and name collection
  - Real-time validation
  - Success/error messages with animations
  - Automatic form reset after submission
  - Country tracking (via backend)

### ✅ Live Chat Widget
- **Component:** `src/components/chat/LiveChat.jsx`
- **Location:** Floating button on all pages
- **Features:**
  - Real-time Socket.io connection
  - Visitor name/email collection
  - Message history
  - Typing indicators
  - Unread message badge
  - Online/offline status
  - Mobile responsive

### ✅ Quote Request Form
- **Location:** Contact page (`src/pages/Contact.jsx`)
- **Features:**
  - Full form with all fields (name, email, phone, company, service, project type, budget, timeline, location, message)
  - Real-time validation
  - API integration with backend
  - Success/error handling
  - Automatic conversion tracking

### ✅ API Service Layer
- **File:** `src/services/api.js`
- **Functions:**
  - `newsletterAPI.subscribe()` - Subscribe to newsletter
  - `newsletterAPI.unsubscribe()` - Unsubscribe
  - `blogAPI.getAllPosts()` - Get all blog posts
  - `blogAPI.getPostBySlug()` - Get single post
  - `blogAPI.likePost()` - Like a post
  - `blogAPI.getCategories()` - Get categories
  - `blogAPI.getPopularTags()` - Get tags
  - `quotationAPI.submitQuote()` - Submit quote request

## 🚀 Setup Instructions

### 1. Install Dependencies

```powershell
npm install
```

This will install:
- `socket.io-client` for live chat

### 2. Configure Environment

Create `.env` file (already done):
```
VITE_API_URL=http://localhost:5000
```

For production:
```
VITE_API_URL=https://your-backend-api.com
```

### 3. Start Backend Server

```powershell
cd backend
npm install
Copy-Item .env.example .env
# Edit backend/.env with MongoDB connection
npm run seed
npm run dev
```

Backend will run on: `http://localhost:5000`

### 4. Start Frontend

```powershell
# In project root
npm run dev
```

Frontend will run on: `http://localhost:3000` (or the port Vite assigns)

## 📡 How It Works

### Newsletter Subscription Flow

1. User enters email on homepage newsletter section
2. Frontend calls `newsletterAPI.subscribe(email, name)`
3. Backend receives request at `POST /api/newsletter/subscribe`
4. Backend tracks visitor IP and country using GeoIP
5. Backend saves to MongoDB
6. Backend returns success/error response
7. Frontend shows confirmation message

### Live Chat Flow

1. User clicks chat button (floating button bottom-right)
2. Socket.io connection established to `http://localhost:5000`
3. User enters name and optional email
4. Frontend emits `join` event with conversation ID
5. Backend adds user to chat room
6. Backend notifies admin room of new visitor
7. User sends message → `send-message` event
8. Backend saves message to MongoDB
9. Backend broadcasts message to conversation room
10. Admin receives real-time notification

### Quote Request Flow

1. User fills out contact form on Contact page
2. Frontend validates all required fields
3. Frontend calls `quotationAPI.submitQuote(formData)`
4. Backend receives request at `POST /api/quotations`
5. Backend tracks visitor IP and country
6. Backend saves quotation to MongoDB
7. Backend marks visitor as converted in analytics
8. Backend returns success response
9. Frontend shows success message
10. Form resets after 5 seconds

## 🔌 API Endpoints Used

### Public Endpoints (No Authentication)

```
POST /api/newsletter/subscribe
POST /api/newsletter/unsubscribe
GET /api/blog
GET /api/blog/:slug
POST /api/blog/:id/like
POST /api/quotations
```

### Socket.io Events

**Client → Server:**
- `join` - Join chat conversation
- `send-message` - Send message
- `typing` - Notify typing
- `stop-typing` - Stop typing indicator

**Server → Client:**
- `conversation-history` - Load message history
- `new-message` - New message received
- `user-typing` - User is typing
- `user-stop-typing` - User stopped typing

## 🧪 Testing

### Test Newsletter

1. Go to homepage: `http://localhost:3000`
2. Scroll to bottom newsletter section
3. Enter email and click Subscribe
4. Check backend terminal for log
5. Check MongoDB for new newsletter document

### Test Live Chat

1. Go to any page
2. Click floating chat button (bottom-right)
3. Enter name and start chat
4. Send a message
5. Check backend terminal for Socket.io logs
6. Check MongoDB `chatmessages` collection

### Test Quote Request

1. Go to Contact page: `http://localhost:3000/contact`
2. Fill out the form (all required fields marked with *)
3. Click "Send Message"
4. Check for success message
5. Check backend terminal for API log
6. Check MongoDB `quotations` collection

## 🎨 Customization

### Change API URL

Edit `.env`:
```
VITE_API_URL=https://your-production-api.com
```

Restart frontend server.

### Customize Newsletter Section

Edit `src/components/Newsletter.jsx`:
- Change colors (Tailwind classes)
- Modify text
- Add more fields
- Change animations

### Customize Chat Widget

Edit `src/components/chat/LiveChat.jsx`:
- Change position (bottom-6 right-6)
- Modify colors
- Change avatar/icon
- Add file uploads
- Customize messages

### Modify Contact Form

Edit `src/pages/Contact.jsx`:
- Add/remove form fields
- Change service options
- Modify validation rules
- Customize success message

## 📊 Analytics Tracking

All frontend interactions are automatically tracked:
- **Page Views** - Every page visit is logged
- **Country Detection** - User's country from IP
- **Device Info** - Browser, OS, device type
- **Conversions** - Newsletter signups and quote requests
- **Session Duration** - Time spent on site
- **Referrers** - Where visitors come from

Check analytics in admin dashboard (to be built).

## 🐛 Troubleshooting

### CORS Errors

Make sure backend `.env` has correct frontend URL:
```
CLIENT_URL=http://localhost:3000
```

### Socket.io Connection Failed

1. Check backend is running
2. Verify `VITE_API_URL` in frontend `.env`
3. Check browser console for errors
4. Ensure no firewall blocking port 5000

### API 404 Errors

1. Verify backend is running on port 5000
2. Check `VITE_API_URL` matches backend URL
3. Ensure backend routes are loaded (check terminal)

### Newsletter Not Submitting

1. Check browser console for errors
2. Verify backend `/api/newsletter/subscribe` endpoint
3. Check MongoDB connection
4. Test with curl:
   ```powershell
   Invoke-RestMethod -Uri "http://localhost:5000/api/newsletter/subscribe" -Method POST -Body (@{email="test@example.com"} | ConvertTo-Json) -ContentType "application/json"
   ```

### Chat Not Connecting

1. Check Socket.io server is running (backend logs)
2. Verify Socket.io version matches (backend and frontend)
3. Check browser Network tab for WebSocket connection
4. Test Socket.io endpoint:
   ```javascript
   const socket = io('http://localhost:5000');
   socket.on('connect', () => console.log('Connected!'));
   ```

## 📱 Mobile Testing

All components are mobile-responsive:
- Newsletter: Full-width inputs on mobile
- Live Chat: Slides up from bottom on mobile
- Contact Form: Stacked layout on small screens

Test on:
- Chrome DevTools mobile emulator
- Real devices
- Different screen sizes (320px - 2560px)

## 🚀 Production Deployment

### Frontend

1. Update `.env`:
   ```
   VITE_API_URL=https://your-backend-api.com
   ```

2. Build:
   ```powershell
   npm run build
   ```

3. Deploy `dist/` folder to:
   - Render
   - Vercel
   - Netlify
   - AWS S3 + CloudFront

### Backend

1. Deploy backend separately (see backend/README.md)
2. Update frontend `VITE_API_URL` to production backend URL
3. Ensure CORS is configured for production frontend URL

## 🎯 Next Steps

### Still To Build

1. **Admin Dashboard** - React app for managing:
   - Newsletter subscribers
   - Blog posts (WYSIWYG editor)
   - Quote requests
   - Live chat (admin interface)
   - Analytics dashboard

2. **Blog Pages** - Frontend blog section:
   - Blog list page with pagination
   - Blog detail page
   - Category filtering
   - Tag filtering
   - Search functionality
   - Like button

3. **Email Integration** - Configure Nodemailer:
   - Welcome emails for newsletter
   - Quote request confirmations
   - Admin notifications
   - Newsletter campaigns

## 📝 Notes

- All API calls are logged to browser console (development)
- Errors are caught and displayed to user
- Forms auto-reset after successful submission
- Socket.io reconnects automatically on disconnection
- Visitor analytics tracked passively (no user action required)

## 🤝 Need Help?

- Check backend logs: `backend/` terminal
- Check frontend logs: Browser DevTools Console
- Check MongoDB: Use MongoDB Compass
- Test APIs: Use Postman or curl
- Socket.io debug: Enable debug mode in browser console:
  ```javascript
  localStorage.debug = 'socket.io-client:*';
  ```

---

**Integration Complete!** 🎉

Your Creative Approach website now has:
- ✅ Newsletter subscription
- ✅ Live chat support
- ✅ Quote request form
- ✅ Automatic analytics tracking
- ✅ Country detection
- ✅ Real-time messaging

All connected to a comprehensive Node.js backend!
