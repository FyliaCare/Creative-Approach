import express from 'express';
import { sendContactFormEmails } from '../utils/emailService.js';
import ContactMessage from '../models/ContactMessage.js';
import User from '../models/User.js';
import NotificationService from '../utils/notificationService.js';

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

    // Save contact message to database
    const contactMessage = await ContactMessage.create({
      name,
      email,
      phone,
      location,
      service,
      message,
      source: 'website_contact_form',
      ipAddress: req.ip || req.connection.remoteAddress,
      userAgent: req.get('user-agent'),
      status: 'new',
      priority: 'high'
    });

    // Create notification for all admin users
    try {
      const admins = await User.find({ role: 'admin' });
      for (const admin of admins) {
        await NotificationService.createNotification({
          recipient: admin._id,
          type: 'contact_message',
          title: 'New Contact Form Submission',
          message: `${name} sent a message about ${service || 'General Inquiry'}`,
          link: `/contacts/${contactMessage._id}`,
          icon: 'Mail',
          priority: 'high',
          metadata: {
            contactId: contactMessage._id,
            email,
            name,
            service
          }
        });
      }
    } catch (notifError) {
      console.error('❌ Failed to create notification:', notifError);
      // Continue even if notification fails
    }

    // Send emails
    try {
      await sendContactFormEmails({
        name,
        email,
        phone,
        location,
        service,
        message,
      });
      console.log('✅ Contact form emails sent successfully to:', email);
    } catch (emailError) {
      console.error('❌ Failed to send contact form emails:', emailError);
      console.error('Email error details:', {
        message: emailError.message,
        code: emailError.code,
        command: emailError.command
      });
      
      // Return error to user when email fails
      return res.status(500).json({
        success: false,
        message: 'We\'re experiencing technical difficulties with our email system. Please contact us directly at visuals@caghana.com or call +233 541 500 716.',
        error: 'Email service unavailable'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent. We\'ll respond within 2 hours.',
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process your message. Please try again or contact us directly at visuals@caghana.com',
    });
  }
});

export default router;
