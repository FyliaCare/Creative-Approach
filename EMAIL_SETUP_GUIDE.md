# Email Setup Guide for CA Ghana Website

This guide will help you set up automated emails for the contact form and quote bot.

## 📧 Choose Your Email Provider

### Option 1: Gmail (Recommended - Easiest)

#### Step 1: Create/Use Gmail Account
- Use an existing Gmail account or create a new one specifically for the website
- Example: `creativeapproachgh@gmail.com`

#### Step 2: Enable 2-Step Verification
1. Go to https://myaccount.google.com/security
2. Click "2-Step Verification"
3. Follow the setup process

#### Step 3: Generate App Password
1. Go to https://myaccount.google.com/apppasswords
2. Select "Mail" and "Other (Custom name)"
3. Name it "CA Ghana Website"
4. Click "Generate"
5. **Copy the 16-character password** (you won't see it again!)

#### Step 4: Update Backend .env File
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  (the app password from step 3)
```

### Option 2: Outlook/Microsoft 365

#### Step 1: Use Your Business Email
- Use your Microsoft 365 business email: `sales@caghana.com`

#### Step 2: Get SMTP Credentials
1. Go to https://account.microsoft.com/security
2. Enable 2-factor authentication
3. Generate app password for "Mail"

#### Step 3: Update Backend .env File
```env
EMAIL_HOST=smtp.office365.com
EMAIL_PORT=587
EMAIL_USER=sales@caghana.com
EMAIL_PASS=your-app-password
```

## 🚀 Deploy to Render

### Add Environment Variables on Render:

1. Go to your backend service on Render
2. Click "Environment" tab
3. Add these variables:

```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

4. Click "Save Changes"
5. Render will automatically redeploy

## ✅ Test the Setup

### Test Contact Form:
1. Go to https://caghana.com/contact
2. Fill out and submit the form
3. Check:
   - ✅ You receive email at sales@caghana.com
   - ✅ Client receives confirmation email

### Test Quote Bot:
1. Click the floating "Get Quote" button (bottom right)
2. Complete the interactive chat
3. Check:
   - ✅ Quote saved in admin dashboard
   - ✅ Email sent to sales@caghana.com with quote details
   - ✅ Client receives confirmation email

## 📋 What Emails Are Sent?

### Contact Form Submission:
- **To sales@caghana.com**: Full details of the inquiry, formatted professionally
- **To client**: Confirmation with "we'll respond within 2 hours" message

### Quote Bot Request:
- **To sales@caghana.com**: High-priority lead notification with all project details
- **To client**: Confirmation with timeline and next steps
- **To admin dashboard**: Quotation record saved for tracking

## 🔧 Troubleshooting

### Email not sending?
1. **Check credentials**: Make sure EMAIL_USER and EMAIL_PASS are correct
2. **Check Gmail security**: Gmail might block "less secure apps" - use app password instead
3. **Check Render logs**: `View Logs` on your Render backend service
4. **Test locally first**: Run backend locally and test before deploying

### "Authentication failed" error?
- Double-check your app password (not your regular password!)
- Ensure 2-step verification is enabled
- Try generating a new app password

### Emails going to spam?
- Add `sales@caghana.com` to your contacts
- Check SPF/DKIM records for your domain (advanced)
- Consider using a dedicated email service like SendGrid for production

## 🎯 Recommended: SendGrid for Production

For high-volume or production use, consider SendGrid:

1. Sign up at https://sendgrid.com (100 emails/day free)
2. Get your API key
3. Update .env:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASS=your-sendgrid-api-key
```

Benefits:
- ✅ Better deliverability
- ✅ Email tracking and analytics
- ✅ Higher sending limits
- ✅ Professional sender reputation

## 📞 Support

If you need help with email setup:
1. Check backend logs in Render dashboard
2. Test locally with `npm run dev` in backend folder
3. Verify email credentials are correct
4. Contact development team if issues persist

---

**Current Setup:**
- Contact form: `/api/contact` - sends to sales@caghana.com + client
- Quote bot: `/api/quote-bot` - sends to sales@caghana.com + client + saves to database
- Response time promise: 2 hours

**Email Templates:**
- Professional HTML designs
- Branded with CA Ghana colors
- Mobile-responsive
- Clear call-to-actions
