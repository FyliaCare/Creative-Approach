# Creative Approach - Admin Dashboard

Professional admin dashboard for managing Creative Approach's drone services platform.

## 🚀 Features

- **Dashboard Overview** - Real-time statistics and visitor tracking
- **Analytics** - Comprehensive visitor analytics with country tracking
- **Newsletter Management** - Manage subscribers and view statistics
- **Blog CMS** - Create, edit, and publish blog posts with WYSIWYG editor
- **Quotation Management** - Handle quote requests with status workflow
- **Live Chat** - Real-time chat interface to communicate with visitors
- **Settings** - Manage profile and application settings

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **React Router 6** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - API communication
- **Socket.io Client** - Real-time chat
- **React Quill** - Rich text editor for blog posts
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications
- **Lucide React** - Icons
- **date-fns** - Date formatting

## 📋 Prerequisites

- Node.js 18+ installed
- Backend server running on port 5000
- MongoDB database running
- Admin user created (use backend seeder)

## 🚀 Getting Started

### 1. Install Dependencies

\`\`\`powershell
cd admin
npm install
\`\`\`

### 2. Configure Environment

Create `.env` file (or copy from `.env.example`):

\`\`\`env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
\`\`\`

### 3. Start Development Server

\`\`\`powershell
npm run dev
\`\`\`

The admin dashboard will open at http://localhost:3001

### 4. Login

Use the default admin credentials:
- **Email**: admin@creativeapproach.gh
- **Password**: admin123

⚠️ **Important**: Change the default password immediately after first login!

## 📁 Project Structure

\`\`\`
admin/
├── src/
│   ├── components/
│   │   ├── DashboardLayout.jsx    # Main layout with sidebar
│   │   └── ProtectedRoute.jsx     # Route protection
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication context
│   ├── pages/
│   │   ├── Login.jsx              # Login page
│   │   ├── Dashboard.jsx          # Dashboard overview
│   │   ├── Analytics.jsx          # Analytics page
│   │   ├── Newsletter.jsx         # Newsletter management
│   │   ├── Blog.jsx               # Blog post list
│   │   ├── BlogEditor.jsx         # Blog post editor
│   │   ├── Quotations.jsx         # Quote requests list
│   │   ├── QuotationDetail.jsx    # Quote detail view
│   │   ├── Chat.jsx               # Live chat interface
│   │   └── Settings.jsx           # Settings page
│   ├── services/
│   │   ├── api.js                 # API service layer
│   │   └── socket.js              # Socket.io connection
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # Entry point
│   └── index.css                  # Global styles
├── .env                           # Environment variables
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
└── tailwind.config.js             # Tailwind configuration
\`\`\`

## 🔌 API Integration

The dashboard connects to the backend API at \`http://localhost:5000/api\`

### Available APIs

- **Auth**: \`/api/auth/*\` - Login, profile management
- **Newsletter**: \`/api/newsletter/*\` - Subscriber management
- **Blog**: \`/api/blog/*\` - Blog post CRUD
- **Quotations**: \`/api/quotations/*\` - Quote management
- **Analytics**: \`/api/analytics/*\` - Visitor analytics
- **Upload**: \`/api/upload/*\` - File uploads

## 🎨 Key Features

### Dashboard
- Real-time visitor tracking
- Quick statistics overview
- Recent quote requests
- Active visitors map
- Session analytics

### Analytics
- Visitor statistics by country
- Page view tracking
- Device/browser breakdown
- Referrer analysis
- Timeline charts

### Newsletter
- Subscriber list with search
- Country-based filtering
- Subscription statistics
- Bulk actions

### Blog Management
- Rich text editor (Quill)
- Category and tag management
- SEO fields (meta title, description, keywords)
- Draft/publish workflow
- Featured post selection
- Image uploads

### Quotation Management
- Status workflow (new → quoted → accepted/rejected)
- Priority levels
- Admin notes
- Email communication
- Service type filtering
- Timeline tracking

### Live Chat
- Real-time messaging
- Conversation list
- Typing indicators
- Message history
- Visitor information
- Session tracking

## 🔒 Security

- JWT token authentication
- Protected routes
- Automatic token refresh
- Secure API communication
- Role-based access control

## 🚀 Deployment

### Build for Production

\`\`\`powershell
npm run build
\`\`\`

The build output will be in the \`dist/\` folder.

### Deploy to Hosting

#### Render (Recommended)
1. Push code to GitHub
2. Create new "Static Site" on Render
3. Set build command: \`npm run build\`
4. Set publish directory: \`dist\`
5. Add environment variables
6. Deploy!

#### Vercel
\`\`\`powershell
npm install -g vercel
vercel
\`\`\`

#### Netlify
\`\`\`powershell
npm install -g netlify-cli
netlify deploy --prod
\`\`\`

### Environment Variables for Production

\`\`\`env
VITE_API_URL=https://your-backend-api.com
VITE_SOCKET_URL=https://your-backend-api.com
\`\`\`

## 📱 Development Commands

\`\`\`powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
\`\`\`

## 🐛 Troubleshooting

### Cannot connect to backend
- Ensure backend server is running on port 5000
- Check VITE_API_URL in .env file
- Verify CORS is configured correctly in backend

### Login fails
- Check backend logs for errors
- Verify admin user exists in database
- Ensure JWT_SECRET is set in backend .env

### Socket.io not connecting
- Check VITE_SOCKET_URL matches backend URL
- Verify Socket.io is running on backend
- Check browser console for errors

### Build errors
- Clear node_modules: \`rm -r node_modules; npm install\`
- Clear npm cache: \`npm cache clean --force\`
- Update dependencies: \`npm update\`

## 📊 Current Status

✅ **Completed:**
- Project setup and configuration
- Authentication system
- Dashboard layout and navigation
- Dashboard overview page with real-time stats
- Protected routes
- API service layer
- Socket.io integration

🚧 **In Progress:**
- Newsletter management page
- Analytics detailed page
- Blog management interface
- Quotation management
- Live chat interface

## 📞 Support

For issues or questions:
- Check backend logs
- Review API documentation in \`../backend/README.md\`
- Contact development team

## 📄 License

ISC License - See LICENSE file for details

---

**Built with ❤️ for Creative Approach**
