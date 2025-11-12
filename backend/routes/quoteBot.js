import express from 'express';
import { sendQuoteRequestEmails } from '../utils/emailService.js';
import Quotation from '../models/Quotation.js';

const router = express.Router();

// Handle quote bot submission
router.post('/', async (req, res) => {
  try {
    const { 
      name, 
      email, 
      phone, 
      company,
      location, 
      service, 
      projectDetails,
      budget,
      timeline,
      additionalInfo 
    } = req.body;

    // Validation
    if (!name || !email || !service || !projectDetails || !location) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all required information' 
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

    // Create quotation in database
    const quotation = await Quotation.create({
      name,
      email,
      phone,
      company,
      location,
      service,
      projectDetails,
      budget,
      timeline,
      additionalInfo,
      status: 'new',
      priority: 'high', // Quote bot leads are high priority
    });

    // Send emails to sales and client
    await sendQuoteRequestEmails({
      name,
      email,
      phone,
      company,
      location,
      service,
      projectDetails,
      budget,
      timeline,
      additionalInfo,
    });

    res.status(201).json({
      success: true,
      message: 'Quote request received! Check your email for confirmation. We\'ll respond within 2 hours.',
      quotationId: quotation._id,
    });

  } catch (error) {
    console.error('Quote bot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again or contact sales@caghana.com',
    });
  }
});

// Get quote bot conversation state (optional - for bot persistence)
router.get('/conversation/:sessionId', async (req, res) => {
  try {
    // This can be used to store/retrieve bot conversation state
    // For now, just return empty state
    res.json({ success: true, state: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
