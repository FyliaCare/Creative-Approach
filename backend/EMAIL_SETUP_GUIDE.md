# Email Setup Guide for Contact Form

## Current Issue
The Gmail credentials in your `.env` file are being rejected by Gmail's SMTP server with error:
```
Invalid login: 535-5.7.8 Username and Password not accepted
```

## Solution: Generate a New Gmail App Password

### Step 1: Enable 2-Step Verification (if not already enabled)
1. Go to [Google Account](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to enable it

### Step 2: Generate App Password
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Click on **2-Step Verification** (must be enabled)
3. Scroll down to **App passwords** at the bottom
4. Click **App passwords**
5. You may need to sign in again
6. Select app: **Mail**
7. Select device: **Other (Custom name)**
8. Enter name: `CA Ghana Website`
9. Click **Generate**
10. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

### Step 3: Update .env File
Open `backend/.env` and update:
```env
EMAIL_USER=visuals@caghana.com
EMAIL_PASSWORD=your-16-character-app-password-here
```
**Important**: Remove all spaces from the app password when pasting.

### Step 4: Restart Backend Server
```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
cd backend
npm start
```

## Verify Email Configuration

After updating credentials, test the email:

```bash
cd backend
node test-email.js
```

You should see:
```
✅ Email server is ready to send messages
```

## Alternative: Use a Different SMTP Provider

If Gmail continues to have issues, consider these alternatives:

### Option 1: SendGrid (Recommended for production)
- Free tier: 100 emails/day
- More reliable for transactional emails
- Update `.env`:
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=your-sendgrid-api-key
```

### Option 2: Mailgun
- Free tier: 5,000 emails/month
- Update `.env`:
```env
EMAIL_HOST=smtp.mailgun.org
EMAIL_PORT=587
EMAIL_USER=your-mailgun-username
EMAIL_PASSWORD=your-mailgun-password
```

## Testing Contact Form

After fixing credentials:

1. **Test from terminal:**
```powershell
$body = @{
  name='Test User'
  email='your-test-email@gmail.com'
  phone='123456789'
  location='Accra'
  service='Aerial Photography'
  message='This is a test message'
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/contact -Method POST -Body $body -ContentType 'application/json'
```

2. **Check these emails:**
   - `visuals@caghana.com` - Should receive notification
   - Test email you used - Should receive confirmation

## Common Issues

### Error: "Invalid login"
- App password is incorrect or expired
- 2-Step Verification not enabled
- Using regular password instead of app password

### Error: "Connection timeout"
- Firewall blocking port 587
- Wrong SMTP host/port
- Try port 465 with `secure: true`

### Emails go to spam
- Add SPF and DKIM records to your domain
- Use a dedicated email service (SendGrid/Mailgun)
- Ensure "From" email matches authenticated user

## Current Configuration

**Email Account:** visuals@caghana.com  
**SMTP Server:** smtp.gmail.com:587  
**Security:** TLS (STARTTLS)

**Recipients:**
- Business notification: visuals@caghana.com
- Client confirmation: Sender's email

## Next Steps

1. ✅ Generate new Gmail app password
2. ✅ Update `backend/.env` file
3. ✅ Restart backend server
4. ✅ Test with `node test-email.js`
5. ✅ Submit test contact form
6. ✅ Verify emails received

---

**Need Help?**
If you continue having issues, consider switching to SendGrid or Mailgun for more reliable email delivery.
