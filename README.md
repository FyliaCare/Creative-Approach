# Creative Approach - Drone Services Platform# Creative Approach - Full-Stack Web Application



A modern, full-stack web application for Creative Approach, showcasing professional drone services including aerial photography, videography, inspections, surveys, and mapping.A modern, professional full-stack website for Creative Approach - Ghana's leading provider of drone-based geospatial and visual media solutions.



## 🚀 Tech Stack## 🚀 Live Demo



### Frontend- **Website:** [https://creative-approach.onrender.com](https://creative-approach.onrender.com)

- **React 18** with Vite for fast development- **Repository:** [GitHub](https://github.com/FyliaCare/Creative-Approach)

- **Tailwind CSS** for styling

- **Framer Motion** for animations---

- **React Router** for navigation

- **Axios** for API calls## ✨ Features Overview

- **Socket.IO** for real-time chat

### Frontend (React + Vite + Tailwind CSS)

### Backend- ✅ Modern, responsive design with Framer Motion animations

- **Node.js** with Express- ✅ Homepage with dronegenuity.com-inspired layout

- **MongoDB** with Mongoose- ✅ 12+ animated drones throughout pages

- **JWT** authentication- ✅ Services, About, Industries, Contact pages (fully redesigned)

- **Socket.IO** for real-time features- ✅ Newsletter subscription component

- **Nodemailer** for email services- ✅ Real-time live chat widget

- **Multer** for file uploads- ✅ Mobile-responsive on all devices



### Admin Panel### Backend (Node.js + Express + MongoDB + Socket.io)

- Separate React application- ✅ Comprehensive REST API (40+ endpoints)

- Advanced analytics with Recharts- ✅ JWT authentication with bcrypt password hashing

- Blog management with React Quill- ✅ Real-time live chat with Socket.io

- Portfolio management with image optimization- ✅ Newsletter management system

- Live chat system- ✅ Blog/CMS with categories, tags, and SEO

- Quotation/Invoice generator with PDF export- ✅ Quote request handling with status workflow

- ✅ Visitor analytics with GeoIP country tracking

## 📁 Project Structure- ✅ File upload system (images/documents)

- ✅ Security (Helmet, CORS, rate limiting, validation)

```

Creative-Approach/### Key Integrations

├── src/                    # Main frontend application- 💬 **Live Chat** - Real-time visitor support via Socket.io

│   ├── components/         # Reusable React components- 📧 **Newsletter** - Email subscriptions with country tracking

│   ├── pages/             # Page components- 📊 **Analytics** - Track visitors from different countries, page views, conversions

│   ├── services/          # API service layer- 💼 **Quotations** - Automated quote request management

│   └── utils/             # Utility functions- 🔐 **Authentication** - Secure admin access with JWT

├── admin/                 # Admin panel application

│   └── src/               # Admin source files---

├── backend/               # Express API server

│   ├── models/            # MongoDB models## 📚 Documentation

│   ├── routes/            # API routes

│   ├── middleware/        # Custom middleware**Quick Access:**

│   └── socket/            # Socket.IO handlers- 🚀 **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete installation and setup instructions

├── assets/                # Static assets- ⚡ **[backend/QUICKSTART.md](./backend/QUICKSTART.md)** - Backend 5-minute setup

│   ├── images/            # Images for services, portfolio, etc.- 🔗 **[INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)** - Frontend-backend integration

│   └── videos/            # Video assets- 🧪 **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** - Complete testing scenarios

└── public/                # Public static files- 📦 **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Comprehensive project overview

```- 🚢 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment instructions

- 📖 **[backend/README.md](./backend/README.md)** - Backend API documentation

## 🛠️ Installation

---

### Prerequisites

- Node.js 18+ and npm## 🎯 Quick Start

- MongoDB database

- SMTP server for emails### Prerequisites

- Node.js v18+ and npm v9+

### Setup- MongoDB (local or MongoDB Atlas)



1. **Clone the repository**### Installation

```bash

git clone https://github.com/FyliaCare/Creative-Approach.git```powershell

cd Creative-Approach# Clone repository

```git clone https://github.com/FyliaCare/Creative-Approach.git

Set-Location Creative-Approach

2. **Install dependencies**

```bash# Install frontend dependencies

# Install frontend dependenciesnpm install

npm install

# Install backend dependencies

# Install admin dependenciesSet-Location backend

cd adminnpm install

npm install

cd ..# Setup environment files

Copy-Item .env.example .env

# Install backend dependencies# Edit backend/.env with your MongoDB URI and secrets

cd backend

npm install# Seed admin user

cd ..npm run seed

```

# Start backend (in backend folder)

3. **Environment Configuration**npm run dev  # Runs on port 5000



Create `.env` files:# Start frontend (in project root, new terminal)

npm run dev  # Runs on port 5173

**Root `.env` (Frontend)**```

```env

VITE_API_URL=http://localhost:5000**See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed instructions.**

VITE_SOCKET_URL=http://localhost:5000

```---



**Backend `.env`**## 📁 Project Structure

```env

PORT=5000```

MONGODB_URI=your_mongodb_connection_stringCreative-Approach/

JWT_SECRET=your_jwt_secret_key├── backend/                      # Node.js Backend

SMTP_HOST=your_smtp_host│   ├── models/                  # Mongoose models (User, Newsletter, Blog, etc.)

SMTP_PORT=587│   ├── routes/                  # API routes (auth, newsletter, blog, etc.)

SMTP_USER=your_email@domain.com│   ├── middleware/              # Custom middleware (auth, analytics, errors)

SMTP_PASS=your_email_password│   ├── socket/                  # Socket.io handlers (live chat)

FRONTEND_URL=http://localhost:5173│   ├── seeders/                 # Database seeders

ADMIN_URL=http://localhost:3001│   ├── uploads/                 # File uploads storage

```│   ├── server.js                # Main Express server

│   ├── package.json

**Admin `.env`**│   └── README.md

```env│

VITE_API_URL=http://localhost:5000├── src/                         # React Frontend

VITE_SOCKET_URL=http://localhost:5000│   ├── components/

```│   │   ├── chat/

│   │   │   └── LiveChat.jsx    # Real-time chat widget

4. **Initialize Database**│   │   └── Newsletter.jsx       # Newsletter subscription

```bash│   ├── pages/

cd backend│   │   ├── Home.jsx            # Homepage with animations

npm run seed│   │   ├── About.jsx           # About page

```│   │   ├── Services.jsx        # Services page

│   │   ├── Industries.jsx      # Industries page

## 🚀 Development│   │   └── Contact.jsx         # Contact with quote form

│   ├── services/

Run all services concurrently:│   │   └── api.js              # API service layer

│   ├── App.jsx

```bash│   └── main.jsx

# Terminal 1 - Backend│

cd backend├── public/                      # Static assets

npm run dev├── SETUP_GUIDE.md              # Complete setup instructions

├── INTEGRATION_GUIDE.md        # Integration documentation

# Terminal 2 - Frontend├── TESTING_GUIDE.md            # Testing scenarios

npm run dev├── PROJECT_STATUS.md           # Project overview

├── DEPLOYMENT.md               # Deployment guide

# Terminal 3 - Admin Panel├── package.json

cd admin├── vite.config.js

npm run dev└── tailwind.config.js

``````



- Frontend: http://localhost:5173---

- Admin Panel: http://localhost:3001

- Backend API: http://localhost:5000## 🎯 Core Features



## 📦 Production Build### 1. Newsletter System

- Email subscriptions with validation

```bash- Country detection via GeoIP

# Build frontend- Admin management interface (backend ready)

npm run build- Unsubscribe functionality

- Statistics dashboard

# Build admin panel

cd admin### 2. Live Chat

npm run build- Real-time Socket.io connection

cd ..- Visitor-admin conversations

- Typing indicators

# Backend runs without build- Read receipts

cd backend- Message history

npm start- Online/offline status

```- Mobile responsive chat window



## 🌐 Deployment (Render.com)### 3. Quote Request System

- Comprehensive contact form

### Backend Deployment- Service and project type selection

1. Create a new **Web Service** on Render- Budget and timeline tracking

2. Connect your GitHub repository- Status workflow (new → quoted → accepted/rejected)

3. Configure:- Admin notes and assignments

   - **Root Directory**: `backend`- Conversion tracking

   - **Build Command**: `npm install`

   - **Start Command**: `npm start`### 4. Visitor Analytics

4. Add environment variables from backend `.env`- GeoIP country detection

- Page view tracking

### Frontend Deployment- Session duration

1. Create a new **Static Site** on Render- Device/browser/OS detection

2. Configure:- Bounce rate calculation

   - **Build Command**: `npm install && npm run build`- Conversion tracking

   - **Publish Directory**: `dist`- Real-time active visitors

3. Add environment variables:- Referrer tracking

   - `VITE_API_URL`: Your backend URL

   - `VITE_SOCKET_URL`: Your backend URL### 5. Blog/CMS (Backend Ready)

- Full CRUD operations

### Admin Panel Deployment- Categories and tags

1. Create a new **Static Site** on Render- SEO fields (meta title, description, keywords)

2. Configure:- Draft/publish workflow

   - **Root Directory**: `admin`- Featured posts

   - **Build Command**: `npm install && npm run build`- View and like counters

   - **Publish Directory**: `admin/dist`- Slug auto-generation

3. Add environment variables:

   - `VITE_API_URL`: Your backend URL### 6. File Upload System

   - `VITE_SOCKET_URL`: Your backend URL- Image uploads (10MB limit)

- Document uploads (PDF, DOC, DOCX)

### Important: SPA Routing- File validation

Both frontend and admin have `public/_redirects` files for proper SPA routing on Render.- Secure storage

- Multiple file support

## 🔑 Default Admin Credentials

---

```

Email: admin@creativeapproach.gh## 🔒 Security Features

Password: admin123

```- ✅ JWT authentication with secure tokens

- ✅ bcrypt password hashing (10 rounds)

⚠️ **Change these immediately after first login!**- ✅ Rate limiting (100 requests per 15 minutes)

- ✅ CORS configuration

## ✨ Key Features- ✅ Helmet security headers

- ✅ Input validation (express-validator)

### Public Website- ✅ File upload restrictions

- Dynamic hero section with video background- ✅ MongoDB injection protection

- Service showcase (Aerial Photography, Inspections, Surveys, etc.)- ✅ XSS protection

- Portfolio gallery with filtering- ✅ Environment variable management

- Blog with search and categories

- Contact form with email integration---

- Newsletter subscription

- Live chat with admin## 🚀 API Endpoints

- SEO optimized

- Fully responsive design### Public Endpoints

```

### Admin DashboardPOST   /api/auth/register           - Register user

- **Analytics**: Visitor tracking, page views, conversion metricsPOST   /api/auth/login              - Login user

- **Blog Management**: Create, edit, delete posts with rich text editorPOST   /api/newsletter/subscribe    - Subscribe to newsletter

- **Portfolio Management**: Upload and organize project imagesGET    /api/blog                    - Get all blog posts

- **Newsletter**: Send campaigns to subscribersGET    /api/blog/:slug              - Get single blog post

- **Quotations**: Generate professional invoices with PDF exportPOST   /api/quotations              - Submit quote request

- **Live Chat**: Real-time messaging with website visitorsGET    /health                      - Health check

- **Settings**: Manage site configuration```



### Advanced Features### Protected Admin Endpoints

- **WhatsApp-style Chat**: Read receipts, typing indicators, message status```

- **Invoice Generator**: Dual-language (English/French) with PDF exportGET    /api/auth/me                      - Get current user

- **Image Optimization**: Automatic compression on uploadGET    /api/newsletter/subscribers       - Get all subscribers

- **SEO Tools**: Built-in SEO analyzer and optimizationGET    /api/newsletter/stats             - Newsletter statistics

- **Real-time Updates**: Socket.IO for instant notificationsPOST   /api/blog                         - Create blog post

PUT    /api/blog/:id                     - Update blog post

## 📚 API DocumentationDELETE /api/blog/:id                     - Delete blog post

GET    /api/quotations                   - Get all quotes

### AuthenticationPUT    /api/quotations/:id               - Update quote

```GET    /api/analytics/overview           - Analytics dashboard

POST /api/auth/login      # Admin loginGET    /api/analytics/countries          - Visitors by country

POST /api/auth/register   # Register new adminGET    /api/analytics/realtime           - Real-time visitors

```POST   /api/upload/image                 - Upload image

... and 15+ more endpoints

### Blog```

```

GET    /api/blog          # Get all posts**See [backend/README.md](./backend/README.md) for complete API documentation.**

GET    /api/blog/:id      # Get single post

POST   /api/blog          # Create post (auth required)---

PUT    /api/blog/:id      # Update post (auth required)

DELETE /api/blog/:id      # Delete post (auth required)## 🧪 Testing

```

Run comprehensive tests following the [TESTING_GUIDE.md](./TESTING_GUIDE.md):

### Portfolio

```1. ✅ Newsletter subscription

GET    /api/portfolio     # Get all projects2. ✅ Live chat functionality

POST   /api/portfolio     # Create project (auth required)3. ✅ Quote request submission

PUT    /api/portfolio/:id # Update project (auth required)4. ✅ Analytics tracking

DELETE /api/portfolio/:id # Delete project (auth required)5. ✅ API health checks

```6. ✅ Socket.io connections

7. ✅ Mobile responsiveness

### Quotations8. ✅ Error handling

```

GET    /api/quotations           # Get all quotations---

POST   /api/quotations           # Create quotation

POST   /api/quotations/save-detailed # Save detailed invoice## 🚢 Deployment

```

### Quick Start: Deploy to Render + MongoDB Atlas (FREE)

### Contact & Newsletter

```**Complete step-by-step guide:** [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)

POST   /api/contact/submit       # Submit contact form

POST   /api/newsletter/subscribe # Subscribe to newsletter#### 1. Setup MongoDB Atlas (5 minutes)

```- Create free cluster at https://cloud.mongodb.com

- Create database user and get connection string

## 🤝 Contributing- Whitelist all IPs (0.0.0.0/0)



1. Fork the repository#### 2. Deploy Backend to Render (10 minutes)

2. Create a feature branch (`git checkout -b feature/AmazingFeature`)```powershell

3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)# Generate secure secrets

4. Push to the branch (`git push origin feature/AmazingFeature`)./generate-secrets.ps1

5. Open a Pull Request

# Push to GitHub

## 📝 Licensegit add .

git commit -m "Ready for production"

This project is proprietary software owned by Creative Approach Ghana.git push origin main

```

## 📧 Contact

- Create Web Service on Render

**Creative Approach**- Connect GitHub repo

- Website: https://creativeapproach.gh- Set Root Directory: `backend`

- Email: info@creativeapproach.gh- Add environment variables (see RENDER_DEPLOYMENT.md)

- Phone: +233 XX XXX XXXX- Deploy! 🚀



## 🙏 Acknowledgments#### 3. Deploy Frontend (5 minutes each)



- Built with React and modern web technologies**Main Website:**

- Deployed on Render.com- Create Static Site on Render

- Icons by Lucide React- Build Command: `npm install && npm run build`

- UI animations by Framer Motion- Publish Directory: `dist`

- Add env: `VITE_API_URL=https://your-backend.onrender.com`

**Admin Dashboard:**
- Create Static Site on Render
- Root Directory: `admin`
- Build Command: `npm install && npm run build`
- Publish Directory: `dist`
- Add env: `VITE_API_URL=https://your-backend.onrender.com`

**Total Cost: $0/month on free tier!**

**See [RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md) for complete guide with screenshots and troubleshooting.**

---

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Vite 7.2.2
- Tailwind CSS 3.4.17
- Framer Motion 12.23.24
- Socket.io Client 4.8.1
- React Router DOM 7.9.5

### Backend
- Node.js + Express.js 4.18.2
- MongoDB with Mongoose 8.0.3
- Socket.io 4.6.1
- JWT + bcryptjs
- Nodemailer 6.9.7
- Multer 1.4.5
- GeoIP-lite 1.4.7
- Helmet, CORS, Rate Limiting

---

## 📊 Project Statistics

- **Total Files:** 80+
- **Lines of Code:** 15,000+
- **React Components:** 20+
- **API Endpoints:** 40+
- **Database Models:** 6
- **Socket.io Events:** 14
- **Features Completed:** 95%

---

## 🎯 What's Working Now

✅ Frontend website with animations  
✅ Backend API (all endpoints)  
✅ Newsletter subscriptions  
✅ Live chat (real-time)  
✅ Quote requests  
✅ Visitor analytics with country tracking  
✅ File uploads  
✅ Authentication system  
✅ MongoDB data persistence  
✅ Security measures  
✅ Mobile responsive design  

---

## ❌ Pending Features

- [ ] Admin Dashboard UI (React app for managing everything)
- [ ] Blog frontend pages
- [ ] Email notifications (Nodemailer configured, needs credentials)
- [ ] Payment integration

**Note:** Backend for all features is 100% complete. Only admin dashboard frontend UI needs to be built.

---

## 📞 Support & Contact

- **GitHub Issues:** [Create an issue](https://github.com/FyliaCare/Creative-Approach/issues)
- **Documentation:** Check the guide files in this repository
- **Email:** info@creativeapproach.gh

---

## 📄 License

ISC License - See LICENSE file for details

---

## 🎉 Acknowledgments

Built with modern web technologies for Creative Approach - Ghana's premier drone services company.

**Features:**
- Real-time visitor chat
- Newsletter management
- Quote request system
- Analytics from different countries
- Secure authentication
- File uploads
- Mobile responsive design

---

**Ready to fly?** 🚁 Follow the [SETUP_GUIDE.md](./SETUP_GUIDE.md) to get started!

```
Creative-approach/
├── index.html              # Main HTML file
├── css/
│   └── styles.css         # All styles with CSS variables
├── js/
│   └── script.js          # All JavaScript functionality
├── assets/
│   ├── images/           # Image assets
│   │   ├── portfolio/    # Portfolio images
│   │   ├── testimonials/ # Client photos
│   │   └── README.md     # Image guidelines
│   └── videos/           # Video assets
│       └── README.md     # Video guidelines
├── manifest.json         # PWA manifest
├── sw.js                # Service worker
├── sitemap.xml          # SEO sitemap
├── robots.txt           # Search engine instructions
└── README.md            # This file
```

## 🎨 Sections

1. **Hero Section** - Video background with compelling CTA
2. **About Section** - Company background, vision, and mission
3. **Services Section** - 5 comprehensive service offerings
4. **Portfolio Section** - Filterable project gallery
5. **Values Section** - 6 core company values
6. **Testimonials Section** - Client reviews with slider
7. **Contact Section** - Contact form and information
8. **Footer** - Complete site navigation and social links

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **JavaScript (ES6+)** - Interactive functionality
- **AOS Library** - Scroll animations
- **Font Awesome** - Icon library
- **Google Fonts** - Inter & Playfair Display
- **Google Maps API** - Location integration

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎯 SEO Features

### On-Page SEO
- Optimized title tags and meta descriptions
- Header hierarchy (H1-H4) properly structured
- Alt text on all images
- Internal linking structure
- Fast loading times
- Mobile-friendly design

### Technical SEO
- Schema.org Organization markup
- Schema.org Service markup
- Open Graph tags for social sharing
- Twitter Card integration
- Canonical URLs
- XML sitemap
- Robots.txt configuration

### Local SEO
- Ghana-focused content
- Takoradi location emphasis
- Local business schema
- Contact information clearly displayed
- Google Maps integration

## 🚀 Getting Started

1. **Add Your Content**:
   - Replace placeholder images in `assets/images/`
   - Add videos to `assets/videos/`
   - Update contact information in `index.html`
   - Add your social media links

2. **Customize Branding**:
   - Update colors in CSS variables (`:root` in styles.css)
   - Replace logo and favicon
   - Adjust fonts if needed

3. **Deploy**:
   - Upload all files to your web hosting
   - Update URLs in `sitemap.xml`
   - Update domain in meta tags
   - Configure SSL certificate (HTTPS)

## 📦 Required Assets

### Images
- Logo (300x100px)
- Favicon (32x32px, 16x16px)
- Apple touch icon (180x180px)
- OG image for social sharing (1200x630px)
- About section image (800x600px)
- 6 portfolio images (1200x900px)
- 3 client testimonial photos (300x300px)

### Videos
- Hero background video (1920x1080, 10-30 seconds)
- Company showreel (1920x1080, 2-5 minutes)

## 🎨 Color Scheme

- **Primary Blue**: #0066cc
- **Primary Dark**: #004999
- **Primary Light**: #3399ff
- **Secondary Orange**: #ff6b35
- **Accent Gold**: #ffd700
- **Dark Background**: #0a0e27
- **Dark Surface**: #1a1f3a

## 📧 Contact Integration

The contact form is ready for backend integration. Options:
1. **Formspree** - https://formspree.io
2. **EmailJS** - https://www.emailjs.com
3. **Custom PHP script**
4. **Backend API integration**

## 🔧 Customization

### Change Colors
Edit CSS variables in `styles.css`:
```css
:root {
    --primary-color: #0066cc;
    --secondary-color: #ff6b35;
    /* etc... */
}
```

### Add More Services
Duplicate a `.service-card` in HTML and add corresponding modal data in JavaScript.

### Modify Animations
Adjust AOS attributes or customize in `script.js`:
```javascript
AOS.init({
    duration: 1000,  // Animation duration
    once: true,      // Animation plays once
    offset: 100      // Trigger offset
});
```

## 📊 Performance Tips

1. Compress images before uploading
2. Use WebP format for modern browsers
3. Enable Gzip compression on server
4. Use a CDN for static assets
5. Minimize CSS/JS files for production
6. Enable browser caching

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## 📈 Analytics Integration

Add Google Analytics or similar:
```html
<!-- Add before </head> -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
```

## 🔒 Security

- All external scripts from CDN use SRI (Subresource Integrity)
- Form validation on both client and server side
- HTTPS recommended for production
- Regular updates of dependencies

## 📝 License

This website is proprietary to Creative Approach. All rights reserved.

## 👥 Credits

- **Design & Development**: Custom built for Creative Approach
- **Icons**: Font Awesome
- **Fonts**: Google Fonts (Inter, Playfair Display)
- **Animations**: AOS Library

## 📞 Support

For technical support or questions:
- Email: info@creativeapproach.gh
- Phone: 0541 500 716 / 0203 865 717
- Location: Racecourse, Takoradi, Ghana

---

**Built with ❤️ for Creative Approach - Elevating Perspectives Through Innovation**
