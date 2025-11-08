# 🚀 Quick Start Guide - Backend

## Setup in 5 Minutes

### 1. Install Dependencies
```powershell
cd backend
npm install
```

### 2. Create Environment File
```powershell
Copy-Item .env.example .env
```

### 3. Edit `.env` File
Open `.env` and update these critical values:
```
MONGODB_URI=mongodb://localhost:27017/creative-approach
JWT_SECRET=change-this-to-a-random-secret-key-min-32-chars
ADMIN_EMAIL=admin@creativeapproach.com
ADMIN_PASSWORD=Admin123!ChangeThis
```

### 4. Start MongoDB
If using local MongoDB:
```powershell
mongod
```

Or use MongoDB Atlas (cloud):
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/creative-approach
```

### 5. Create Admin User
```powershell
npm run seed
```

### 6. Start Server
```powershell
npm run dev
```

Server will run on: **http://localhost:5000**

## Verify Installation

Test the health endpoint:
```powershell
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.45,
  "mongodb": "connected"
}
```

## Test Admin Login

Using PowerShell:
```powershell
$body = @{
    email = "admin@creativeapproach.com"
    password = "Admin123!ChangeThis"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/auth/login" -Method POST -Body $body -ContentType "application/json"
```

Or use Postman:
- **URL:** `POST http://localhost:5000/api/auth/login`
- **Body (JSON):**
  ```json
  {
    "email": "admin@creativeapproach.com",
    "password": "Admin123!ChangeThis"
  }
  ```

## Available Endpoints

### Public Endpoints
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `GET /api/blog` - Get blog posts
- `GET /api/blog/:slug` - Get single blog post
- `POST /api/quotations` - Submit quote request

### Admin Endpoints (Require Token)
- `GET /api/analytics/overview` - Dashboard analytics
- `GET /api/analytics/countries` - Visitors by country
- `GET /api/analytics/realtime` - Real-time visitors
- `GET /api/newsletter/subscribers` - All subscribers
- `POST /api/blog` - Create blog post
- `GET /api/quotations` - All quotations
- `POST /api/upload/image` - Upload image

## Socket.io Testing (Live Chat)

Use this HTML file to test chat:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Test Chat</title>
  <script src="https://cdn.socket.io/4.6.1/socket.io.min.js"></script>
</head>
<body>
  <h1>Live Chat Test</h1>
  <input id="message" type="text" placeholder="Type message...">
  <button onclick="sendMessage()">Send</button>
  <div id="messages"></div>

  <script>
    const socket = io('http://localhost:5000');
    const conversationId = 'test-' + Date.now();

    socket.emit('join', {
      conversationId,
      user: {
        name: 'Test Visitor',
        type: 'visitor'
      }
    });

    socket.on('new-message', (msg) => {
      document.getElementById('messages').innerHTML += 
        `<p>${msg.senderName}: ${msg.message}</p>`;
    });

    function sendMessage() {
      const message = document.getElementById('message').value;
      socket.emit('send-message', {
        conversationId,
        senderName: 'Test Visitor',
        senderType: 'visitor',
        message
      });
      document.getElementById('message').value = '';
    }
  </script>
</body>
</html>
```

## Common Issues

### MongoDB Connection Failed
- Make sure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env`
- Try using `127.0.0.1` instead of `localhost`

### Port Already in Use
Change `PORT` in `.env`:
```
PORT=5001
```

### CORS Errors
Update `CLIENT_URL` and `ADMIN_URL` in `.env`:
```
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001
```

### JWT Errors
Make sure `JWT_SECRET` is set and at least 32 characters long.

## Next Steps

1. ✅ Backend is running
2. 📱 Connect your React frontend
3. 🎨 Build admin dashboard
4. 📧 Configure email service (see README.md)
5. 🚀 Deploy to production

## Production Checklist

Before deploying:
- [ ] Change `JWT_SECRET` to strong random value
- [ ] Change admin password after first login
- [ ] Set `NODE_ENV=production`
- [ ] Use MongoDB Atlas for database
- [ ] Configure real email service (Gmail/SendGrid)
- [ ] Set proper CORS origins
- [ ] Enable HTTPS/SSL
- [ ] Set up environment variables on hosting platform

## Get Help

- Check `README.md` for full documentation
- Review `.env.example` for all config options
- Test endpoints with Postman
- Check logs in terminal for errors

---

**Important:** Change default passwords before going to production!
