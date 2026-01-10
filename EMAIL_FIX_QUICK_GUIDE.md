# 🚨 URGENT: Fix Email System - Quick Steps

## The Problem
- Contact form shows "success" but NO emails are being sent
- Gmail is rejecting the current password with error: `Invalid login: 535-5.7.8`
- Both visuals@caghana.com and customers are NOT receiving emails

## ⚡ Quick Fix (5 minutes)

### Step 1: Get New Gmail App Password
1. Go to: https://myaccount.google.com/apppasswords
2. Sign in with: **visuals@caghana.com**
3. If prompted, enable 2-Step Verification first
4. Create app password:
   - App: **Mail**
   - Device: **Other** → Enter: `CA Ghana Website`
5. **Copy the 16-character password** (looks like: `xxxx xxxx xxxx xxxx`)

### Step 2: Update Backend Configuration
Open: `backend/.env`

Replace line 14:
```env
EMAIL_PASSWORD=iznqkvdjakovckvg
```

With your new password (remove spaces):
```env
EMAIL_PASSWORD=xxxxxxxxxxxxxxxx
```

### Step 3: Restart Server
```powershell
# In backend terminal, press Ctrl+C to stop
# Then restart:
npm start
```

### Step 4: Test
```powershell
# In a new terminal:
cd backend
node -e "
import('dotenv').then(d => {
  d.config();
  import('nodemailer').then(n => {
    const t = n.default.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASSWORD }
    });
    t.verify((e, s) => {
      console.log(e ? '❌ Failed: ' + e.message : '✅ Email working!');
      process.exit();
    });
  });
});"
```

## What Was Changed

### 1. [contact.js](backend/routes/contact.js)
- ❌ **Before:** Showed success even when emails failed
- ✅ **Now:** Shows error with contact info when emails fail

### 2. [emailService.js](backend/utils/emailService.js)  
- ✅ Better error messages that explain what's wrong
- ✅ Specific help for authentication issues

### 3. New File: [EMAIL_SETUP_GUIDE.md](backend/EMAIL_SETUP_GUIDE.md)
- 📖 Complete guide for Gmail App Passwords
- 📖 Alternative SMTP providers (SendGrid, Mailgun)
- 📖 Troubleshooting common issues

## Expected Behavior After Fix

### When Contact Form Submitted:
1. ✅ Email sent to: **visuals@caghana.com** with inquiry details
2. ✅ Confirmation email sent to: **Customer's email**
3. ✅ Success message shown to customer

### If Email Still Fails:
- ❌ Error shown: "We're experiencing technical difficulties..."
- ❌ Alternative contact info displayed: visuals@caghana.com, +233 541 500 716

## Alternative: Use SendGrid (Recommended)

If Gmail continues to have issues:

1. **Sign up:** https://sendgrid.com (Free: 100 emails/day)
2. **Get API key** from SendGrid dashboard
3. **Update .env:**
   ```env
   EMAIL_HOST=smtp.sendgrid.net
   EMAIL_PORT=587
   EMAIL_USER=apikey
   EMAIL_PASSWORD=your-sendgrid-api-key
   ```
4. **Restart server**

## Need Help?
See full guide: [EMAIL_SETUP_GUIDE.md](backend/EMAIL_SETUP_GUIDE.md)
