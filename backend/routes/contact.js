import express from 'express';
import { sendContactFormEmails } from '../utils/emailService.js';

const router = express.Router();

// Handle contact form submission
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, location, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid email address' 
      });
    }

    // Send emails - this is required for contact form to work
    await sendContactFormEmails({
      name,
      email,
      phone,
      location,
      service,
      message,
    });

    console.log('✅ Contact form emails sent successfully to:', email);

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent. We\'ll respond within 2 hours.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact us directly at visuals@caghana.com',
    });
  }
});

export default router;
