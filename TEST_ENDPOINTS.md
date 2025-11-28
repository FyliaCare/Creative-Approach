# API Endpoint Testing Guide

## Prerequisites
1. Backend server must be running on http://localhost:5000
2. MongoDB must be connected

## Testing with PowerShell

### 1. Test Newsletter Subscription

```powershell
$body = @{
    email = "test@example.com"
    name = "Test User"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/newsletter/subscribe" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "data": { ... }
}
```

---

### 2. Test Contact Form

```powershell
$body = @{
    name = "John Doe"
    email = "john@example.com"
    phone = "+233 541 500 716"
    location = "Accra, Ghana"
    service = "Aerial Photography & Videography"
    message = "I need a quote for aerial photography services."
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/contact" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent. We'll respond within 2 hours."
}
```

---

### 3. Test Quote Bot

```powershell
$body = @{
    name = "Jane Smith"
    email = "jane@example.com"
    phone = "+233 541 500 716"
    company = "Tech Innovations"
    location = "Kumasi, Ghana"
    service = "Drone Inspection & Monitoring"
    projectDetails = "Need aerial inspection of solar farm"
    budget = "GH₵ 10,000 - 20,000"
    timeline = "Within 2 weeks"
    additionalInfo = "Urgent project"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/quote-bot" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Quote request received! Check your email for confirmation. We'll respond within 2 hours.",
  "quotationId": "..."
}
```

---

## Testing with cURL (Alternative)

### 1. Newsletter Subscription
```bash
curl -X POST http://localhost:5000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test User"}'
```

### 2. Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "phone":"+233 541 500 716",
    "location":"Accra, Ghana",
    "service":"Aerial Photography & Videography",
    "message":"I need a quote for aerial photography services."
  }'
```

### 3. Quote Bot
```bash
curl -X POST http://localhost:5000/api/quote-bot \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Jane Smith",
    "email":"jane@example.com",
    "phone":"+233 541 500 716",
    "company":"Tech Innovations",
    "location":"Kumasi, Ghana",
    "service":"Drone Inspection & Monitoring",
    "projectDetails":"Need aerial inspection of solar farm",
    "budget":"GH₵ 10,000 - 20,000",
    "timeline":"Within 2 weeks",
    "additionalInfo":"Urgent project"
  }'
```

---

## Testing from Browser Console

Open browser console (F12) and paste:

### Newsletter Test
```javascript
fetch('http://localhost:5000/api/newsletter/subscribe', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    email: 'test@example.com',
    name: 'Test User'
  })
})
.then(r => r.json())
.then(data => console.log('Newsletter:', data))
.catch(err => console.error('Error:', err));
```

### Contact Form Test
```javascript
fetch('http://localhost:5000/api/contact', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+233 541 500 716',
    location: 'Accra, Ghana',
    service: 'Aerial Photography & Videography',
    message: 'I need a quote for aerial photography services.'
  })
})
.then(r => r.json())
.then(data => console.log('Contact:', data))
.catch(err => console.error('Error:', err));
```

### Quote Bot Test
```javascript
fetch('http://localhost:5000/api/quote-bot', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    name: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+233 541 500 716',
    company: 'Tech Innovations',
    location: 'Kumasi, Ghana',
    service: 'Drone Inspection & Monitoring',
    projectDetails: 'Need aerial inspection of solar farm',
    budget: 'GH₵ 10,000 - 20,000',
    timeline: 'Within 2 weeks',
    additionalInfo: 'Urgent project'
  })
})
.then(r => r.json())
.then(data => console.log('Quote Bot:', data))
.catch(err => console.error('Error:', err));
```

---

## Health Check

Test if backend is running:

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/health"
```

**Expected Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-11-27T...",
  "uptime": 123.456,
  "mongodb": "connected"
}
```

---

## Common Issues & Solutions

### Issue: Connection Refused
**Solution:** Make sure backend server is running
```powershell
cd "c:\Users\Jay Monty\Desktop\Projects\Creative-approach\backend"
npm start
```

### Issue: CORS Error
**Solution:** Check that localhost:5173 is in CORS allowed origins (already fixed)

### Issue: MongoDB Connection Error
**Solution:** Ensure MongoDB is running locally or check connection string in backend/.env

### Issue: Email Sending Fails
**Solution:** Configure Gmail SMTP settings in backend/.env
- Set EMAIL_USER to your Gmail
- Set EMAIL_PASS to App Password (not regular password)
- Enable 2-Step Verification on Gmail account
- Generate App Password from Google Account Security settings

---

## Monitoring Logs

### Backend Logs
Watch backend terminal for logs:
- ✅ Success messages
- ❌ Error messages
- 📧 Email sending status
- 🔓 CORS warnings

### Browser Console
Check browser console (F12) for:
- API request/response logs
- Error messages
- Network tab for failed requests

---

## Success Indicators

✅ **Newsletter:** 
- Success message appears
- Email stored in MongoDB Newsletter collection
- Admin receives notification (if configured)

✅ **Contact Form:**
- Success message appears
- Email sent to visuals@caghana.com
- Confirmation email sent to user

✅ **Quote Bot:**
- Success message appears
- Quotation created in MongoDB
- Emails sent to sales and user
- Quotation appears in admin dashboard

---

## Next Steps After Testing

1. ✅ Confirm all three endpoints work
2. ✅ Test on frontend UI (http://localhost:5173)
3. ✅ Check email delivery
4. ✅ Verify data in MongoDB
5. ✅ Test admin dashboard shows new entries
6. 🚀 Ready for production deployment!
