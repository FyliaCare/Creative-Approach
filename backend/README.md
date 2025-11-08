# Creative Approach Backend

Comprehensive Node.js backend for Creative Approach drone services website with newsletter, blog, live chat, quotations, and analytics.

## Features

- 🔐 **Authentication** - JWT-based authentication with bcrypt password hashing
- 📧 **Newsletter** - Subscription management with email tracking
- 📝 **Blog/CMS** - Full-featured blog with categories, tags, and SEO
- 💬 **Live Chat** - Real-time chat with Socket.io for visitor support
- 📋 **Quotations** - Quote request management with status tracking
- 📊 **Analytics** - Visitor tracking with country detection and engagement metrics
- 📤 **File Upload** - Secure image and document uploads
- 🛡️ **Security** - Helmet, rate limiting, CORS, input validation
- 🌍 **GeoIP** - Country detection from visitor IP addresses

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Real-time:** Socket.io
- **Authentication:** JWT + bcryptjs
- **Email:** Nodemailer
- **File Upload:** Multer
- **Validation:** express-validator
- **Security:** Helmet, CORS, express-rate-limit
- **Logging:** Morgan

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Create environment file:**
```bash
cp .env.example .env
```

3. **Configure environment variables in `.env`:**
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/creative-approach
JWT_SECRET=your-super-secret-jwt-key-change-this
ADMIN_EMAIL=admin@creativeapproach.com
ADMIN_PASSWORD=Admin123!ChangeThis
CLIENT_URL=http://localhost:3001
ADMIN_URL=http://localhost:3002
```

4. **Start MongoDB** (if running locally):
```bash
mongod
```

5. **Seed admin user:**
```bash
npm run seed
```

6. **Start development server:**
```bash
npm run dev
```

The server will run on `http://localhost:5000`.

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register new user
- `POST /login` - Login user
- `GET /me` - Get current user (protected)
- `PUT /profile` - Update profile (protected)
- `PUT /password` - Change password (protected)

### Newsletter (`/api/newsletter`)
- `POST /subscribe` - Subscribe to newsletter
- `POST /unsubscribe` - Unsubscribe from newsletter
- `GET /subscribers` - Get all subscribers (admin)
- `GET /stats` - Get newsletter statistics (admin)
- `DELETE /:id` - Delete subscriber (admin)

### Blog (`/api/blog`)
- `GET /` - Get all posts (with filters)
- `GET /:slug` - Get single post by slug
- `POST /` - Create post (admin)
- `PUT /:id` - Update post (admin)
- `DELETE /:id` - Delete post (admin)
- `POST /:id/like` - Like a post
- `GET /categories/list` - Get categories
- `GET /tags/popular` - Get popular tags

### Quotations (`/api/quotations`)
- `POST /` - Submit quotation request
- `GET /` - Get all quotations (admin)
- `GET /:id` - Get single quotation (admin)
- `PUT /:id` - Update quotation (admin)
- `POST /:id/notes` - Add note to quotation (admin)
- `GET /stats/overview` - Get quotation statistics (admin)
- `DELETE /:id` - Delete quotation (admin)

### Analytics (`/api/analytics`)
- `GET /overview` - Get analytics overview (admin)
- `GET /countries` - Get visitor stats by country (admin)
- `GET /pages` - Get most visited pages (admin)
- `GET /referrers` - Get top referrers (admin)
- `GET /devices` - Get device statistics (admin)
- `GET /realtime` - Get real-time active visitors (admin)
- `GET /timeline` - Get visitor timeline (admin)

### Upload (`/api/upload`)
- `POST /image` - Upload single image (admin)
- `POST /images` - Upload multiple images (admin)
- `POST /document` - Upload document (admin)

### Socket.io Events (Chat)

**Client → Server:**
- `join` - Join a conversation
- `send-message` - Send a message
- `typing` - Notify typing
- `stop-typing` - Stop typing
- `mark-read` - Mark messages as read
- `join-admin` - Admin joins admin room
- `get-active-conversations` - Get active conversations
- `get-conversation` - Get conversation messages

**Server → Client:**
- `conversation-history` - Conversation message history
- `new-message` - New message received
- `user-joined` - User joined conversation
- `user-left` - User left conversation
- `user-typing` - User is typing
- `user-stop-typing` - User stopped typing
- `messages-read` - Messages marked as read
- `visitor-joined` - New visitor joined (admin)
- `visitor-left` - Visitor left (admin)
- `active-conversations` - Active conversations list

## Project Structure

```
backend/
├── models/           # Mongoose models
│   ├── User.js
│   ├── Newsletter.js
│   ├── Blog.js
│   ├── Quotation.js
│   ├── ChatMessage.js
│   └── Visitor.js
├── routes/           # API routes
│   ├── auth.js
│   ├── newsletter.js
│   ├── blog.js
│   ├── quotations.js
│   ├── analytics.js
│   └── upload.js
├── middleware/       # Custom middleware
│   ├── auth.js       # JWT authentication
│   ├── errorHandler.js
│   └── analytics.js  # Visitor tracking
├── socket/           # Socket.io handlers
│   └── chat.js
├── seeders/          # Database seeders
│   └── admin.js
├── uploads/          # Uploaded files
├── .env.example      # Environment variables template
├── server.js         # Express server
└── package.json
```

## Database Models

### User
- Authentication and authorization
- Role-based access (admin/user)
- Password hashing with bcrypt

### Newsletter
- Email subscriptions
- Status tracking (active/unsubscribed)
- Country detection

### Blog
- Full CMS functionality
- Categories and tags
- SEO fields
- Draft/publish workflow
- View and like counters

### Quotation
- Quote request management
- Service type and project details
- Status tracking (new/reviewed/quoted/accepted/rejected/completed)
- Notes and follow-ups
- Assignment to team members

### ChatMessage
- Real-time messaging
- Support for visitors and users
- Read receipts
- Conversation grouping

### Visitor
- Session tracking
- GeoIP location
- Page views and engagement
- Device/browser detection
- Conversion tracking

## Security Features

- **Helmet** - Sets secure HTTP headers
- **CORS** - Configured for specific origins
- **Rate Limiting** - Prevents API abuse (100 req/15min)
- **JWT** - Secure token-based authentication
- **bcrypt** - Password hashing with salt
- **Input Validation** - express-validator for all inputs
- **File Upload Limits** - 10MB max file size
- **Environment Variables** - Sensitive data in .env

## Development

```bash
# Install dependencies
npm install

# Run in development mode (with nodemon)
npm run dev

# Run in production mode
npm start

# Seed admin user
npm run seed
```

## Production Deployment

1. Set `NODE_ENV=production` in environment
2. Use a strong `JWT_SECRET`
3. Change default admin credentials after first deployment
4. Configure MongoDB Atlas connection string
5. Set up proper email service (Gmail, SendGrid, etc.)
6. Configure proper CORS origins
7. Set up HTTPS/SSL
8. Consider using PM2 or similar for process management

## Environment Variables

See `.env.example` for all required environment variables.

**Critical variables:**
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret (CHANGE THIS!)
- `ADMIN_EMAIL` - Default admin email
- `ADMIN_PASSWORD` - Default admin password (CHANGE THIS!)
- `EMAIL_SERVICE` - Email service provider
- `EMAIL_USER` - Email account
- `EMAIL_PASSWORD` - Email password/app password

## Testing

Test the API using:
- **Postman** - Import endpoints and test
- **Thunder Client** (VS Code extension)
- **cURL** - Command line testing

Health check endpoint:
```bash
curl http://localhost:5000/health
```

## Socket.io Testing

Use Socket.io client or test with:
```javascript
const socket = io('http://localhost:5000', {
  withCredentials: true
});

socket.emit('join', {
  conversationId: 'test-123',
  user: {
    name: 'Test User',
    type: 'visitor'
  }
});
```

## Monitoring

- Check `/health` endpoint for server status
- Use Morgan for HTTP request logging
- Monitor MongoDB connection status
- Track active Socket.io connections

## License

ISC

## Author

Creative Approach

---

**Note:** This is a comprehensive backend system. Make sure to properly configure all environment variables and change default credentials before deploying to production!
