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

    // Map service names from quote bot to model enum values
    const serviceMapping = {
      'Aerial Photography & Videography': 'Aerial Photography',
      'Drone Inspection & Monitoring': 'Drone Inspection',
      'Mapping, Surveying & 3D Modelling': 'Mapping & Surveying',
      'Documentary Films & Photography': 'Documentary Production',
      'Custom Data Services & Training': 'Training',
      'Emergency Response & Surveillance': 'Other'
    };
    
    const mappedService = serviceMapping[service] || service;
    
    // Map timeline to model enum values (flexible)
    const timelineMapping = {
      'ASAP': 'Urgent (Within 1 week)',
      'Within 1 week': 'Urgent (Within 1 week)',
      '1-2 weeks': '1-2 weeks',
      'Within 2 weeks': '1-2 weeks',
      '2-4 weeks': '2-4 weeks',
      'Within a month': '2-4 weeks',
      '1-2 months': '1-2 months',
      'Flexible': 'Flexible',
      'No rush': 'Flexible'
    };
    
    const mappedTimeline = timeline ? (timelineMapping[timeline] || 'Flexible') : 'Flexible';
    
    // For budget, store as string but don't validate enum since quote bot sends different formats
    // We'll store the raw value in additionalInfo and use "Not sure" for the enum field

    // Create quotation in database
    const quotation = await Quotation.create({
      name,
      email,
      phone: phone || 'Not provided',
      company,
      location,
      service: mappedService,
      projectType: 'Other', // Default since quote bot doesn't ask for this
      budget: 'Not sure', // Use default enum value
      timeline: mappedTimeline,
      message: projectDetails + (budget ? `\n\nBudget: ${budget}` : '') + (additionalInfo ? `\n\nAdditional Info: ${additionalInfo}` : ''), // Include budget and additional info in message
      status: 'new',
      priority: 'high', // Quote bot leads are high priority
    });

    // Send emails to sales and client
    try {
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
      console.log('✅ Quote request emails sent successfully to:', email);
    } catch (emailError) {
      console.error('❌ Failed to send quote request emails:', emailError);
      console.error('Email error details:', {
        message: emailError.message,
        code: emailError.code
      });
      
      // Quotation is saved, but email failed - return partial success
      return res.status(201).json({
        success: true,
        message: 'Quote request saved! However, we\'re experiencing email issues. We\'ll contact you at ' + email + ' or call ' + (phone || 'the number you provided') + ' within 2 hours.',
        quotationId: quotation._id,
        warning: 'Email notification delayed'
      });
    }

    res.status(201).json({
      success: true,
      message: 'Quote request received! Check your email for confirmation. We\'ll respond within 2 hours.',
      quotationId: quotation._id,
    });

  } catch (error) {
    console.error('Quote bot error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit quote request. Please try again or contact visuals@caghana.com',
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
