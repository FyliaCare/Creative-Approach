import express from 'express';
import { body, validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter.js';
import EmailCampaign from '../models/EmailCampaign.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post('/subscribe', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('name').optional().trim()
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { email, name } = req.body;
    
    // Get IP and country from visitor tracking middleware
    const ipAddress = req.visitor?.ipAddress;
    const country = req.visitor?.country;
    
    // Check if already subscribed
    const existing = await Newsletter.findOne({ email });
    
    if (existing) {
      if (existing.status === 'active') {
        return res.status(400).json({
          success: false,
          message: 'Email is already subscribed'
        });
      } else {
        // Resubscribe
        existing.status = 'active';
        existing.subscribedAt = new Date();
        existing.unsubscribedAt = null;
        if (name) existing.name = name;
        await existing.save();
        
        return res.json({
          success: true,
          message: 'Successfully resubscribed to newsletter'
        });
      }
    }
    
    // Create new subscription
    const subscription = await Newsletter.create({
      email,
      name,
      ipAddress,
      country
    });
    
    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to newsletter',
      data: subscription
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/newsletter/unsubscribe
// @desc    Unsubscribe from newsletter
// @access  Public
router.post('/unsubscribe', [
  body('email').isEmail().withMessage('Valid email is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const { email } = req.body;
    
    const subscription = await Newsletter.findOne({ email });
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found'
      });
    }
    
    if (subscription.status === 'unsubscribed') {
      return res.status(400).json({
        success: false,
        message: 'Email is already unsubscribed'
      });
    }
    
    subscription.status = 'unsubscribed';
    subscription.unsubscribedAt = new Date();
    await subscription.save();
    
    res.json({
      success: true,
      message: 'Successfully unsubscribed from newsletter'
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/newsletter/subscribers
// @desc    Get all subscribers
// @access  Private/Admin
router.get('/subscribers', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    
    const query = {};
    if (status) query.status = status;
    
    const subscribers = await Newsletter.find(query)
      .sort({ subscribedAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Newsletter.countDocuments(query);
    
    res.json({
      success: true,
      data: subscribers,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/newsletter/stats
// @desc    Get newsletter statistics
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res, next) => {
  try {
    const totalSubscribers = await Newsletter.countDocuments({ status: 'active' });
    const totalUnsubscribed = await Newsletter.countDocuments({ status: 'unsubscribed' });
    
    // Subscribers by country
    const byCountry = await Newsletter.aggregate([
      { $match: { status: 'active' } },
      { $group: { _id: '$country', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);
    
    // Recent subscriptions (last 30 days)
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentSubscriptions = await Newsletter.countDocuments({
      status: 'active',
      subscribedAt: { $gte: thirtyDaysAgo }
    });
    
    res.json({
      success: true,
      data: {
        totalSubscribers,
        totalUnsubscribed,
        recentSubscriptions,
        byCountry
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/newsletter/send-bulk
// @desc    Send bulk email to subscribers
// @access  Private/Admin
router.post('/send-bulk', protect, authorize('admin'), [
  body('subject').notEmpty().withMessage('Subject is required'),
  body('body').notEmpty().withMessage('Email body is required'),
  body('recipients').isIn(['all', 'active', 'selected']).withMessage('Invalid recipients option')
], async (req, res, next) => {
  try {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: validationErrors.array()
      });
    }
    
    const { subject, body, recipients, selectedEmails = [] } = req.body;
    
    // Build query based on recipient selection
    let query = {};
    if (recipients === 'active') {
      query.status = 'active';
    } else if (recipients === 'selected' && selectedEmails.length > 0) {
      query.email = { $in: selectedEmails };
      query.status = 'active';
    } else if (recipients === 'all') {
      query.status = 'active';
    }
    
    // Get subscribers
    const subscribers = await Newsletter.find(query).select('email name');
    
    if (subscribers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No subscribers found for the selected criteria'
      });
    }
    
    // Create campaign record
    const campaign = await EmailCampaign.create({
      subject,
      body,
      recipientType: recipients,
      recipientCount: subscribers.length,
      sentBy: req.user._id,
      status: 'sending'
    });
    
    // Import nodemailer dynamically
    const nodemailer = (await import('nodemailer')).default;
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
    
    // Send emails
    let sentCount = 0;
    let failedCount = 0;
    const emailErrors = [];
    
    for (const subscriber of subscribers) {
      try {
        // Personalize email
        const personalizedBody = body
          .replace(/\{name\}/g, subscriber.name || 'Subscriber')
          .replace(/\{email\}/g, subscriber.email);
        
        // Add unsubscribe link
        const unsubscribeLink = `${process.env.CLIENT_URL}/unsubscribe?email=${encodeURIComponent(subscriber.email)}`;
        const emailBody = `
          ${personalizedBody}
          <br><br>
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            You are receiving this email because you subscribed to our newsletter.<br>
            <a href="${unsubscribeLink}" style="color: #3b82f6;">Unsubscribe</a> from future emails.
          </p>
        `;
        
        await transporter.sendMail({
          from: `"Creative Approach" <${process.env.EMAIL_USER}>`,
          to: subscriber.email,
          subject: subject,
          html: emailBody
        });
        
        sentCount++;
      } catch (error) {
        failedCount++;
        emailErrors.push({ email: subscriber.email, error: error.message });
        console.error(`Failed to send to ${subscriber.email}:`, error);
      }
    }
    
    // Update campaign record
    campaign.sentCount = sentCount;
    campaign.failedCount = failedCount;
    campaign.status = failedCount === 0 ? 'completed' : (sentCount > 0 ? 'completed' : 'failed');
    campaign.completedAt = new Date();
    campaign.errors = emailErrors.length > 0 ? emailErrors.slice(0, 10) : []; // Store first 10 errors
    await campaign.save();
    
    res.json({
      success: true,
      message: `Email campaign sent successfully`,
      data: {
        campaignId: campaign._id,
        total: subscribers.length,
        sent: sentCount,
        failed: failedCount,
        errors: emailErrors.length > 0 ? emailErrors : undefined
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/newsletter/campaigns
// @desc    Get email campaign history
// @access  Private/Admin
router.get('/campaigns', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const campaigns = await EmailCampaign.find()
      .sort({ sentAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate('sentBy', 'name email')
      .select('-body -errors'); // Exclude full body and errors from list
    
    const total = await EmailCampaign.countDocuments();
    
    res.json({
      success: true,
      data: campaigns,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/newsletter/campaigns/:id
// @desc    Get single campaign with full details
// @access  Private/Admin
router.get('/campaigns/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const campaign = await EmailCampaign.findById(req.params.id)
      .populate('sentBy', 'name email');
    
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: 'Campaign not found'
      });
    }
    
    res.json({
      success: true,
      data: campaign
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/newsletter/:id
// @desc    Delete subscriber
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const subscription = await Newsletter.findById(req.params.id);
    
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Subscription not found'
      });
    }
    
    await subscription.deleteOne();
    
    res.json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
