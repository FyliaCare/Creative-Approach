import express from 'express';
import { body, validationResult } from 'express-validator';
import Newsletter from '../models/Newsletter.js';
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
