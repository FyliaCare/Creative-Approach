import express from 'express';
import { body, validationResult } from 'express-validator';
import Quotation from '../models/Quotation.js';
import User from '../models/User.js';
import { protect, authorize } from '../middleware/auth.js';
import NotificationService from '../utils/notificationService.js';

const router = express.Router();

// @route   POST /api/quotations
// @desc    Create quotation request
// @access  Public
router.post('/', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').trim().notEmpty().withMessage('Phone is required'),
  body('service').notEmpty().withMessage('Service is required'),
  body('message').trim().notEmpty().withMessage('Message is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const quotationData = {
      ...req.body,
      ipAddress: req.visitor?.ipAddress,
      country: req.visitor?.country
    };
    
    const quotation = await Quotation.create(quotationData);
    
    // Track conversion in analytics
    if (req.visitor) {
      await req.visitor.markConverted('quote_request', {
        quotationId: quotation._id,
        service: quotation.service
      });
    }
    
    // Send notification to all admins
    try {
      const admins = await User.find({ role: 'admin' });
      for (const admin of admins) {
        await NotificationService.notifyNewQuotation(admin._id, quotation);
      }
    } catch (notifError) {
      console.error('Error sending notification:', notifError);
    }
    
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer
    
    res.status(201).json({
      success: true,
      message: 'Quotation request submitted successfully. We will contact you shortly.',
      data: quotation
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/quotations
// @desc    Get all quotations
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const {
      status,
      priority,
      service,
      search,
      page = 1,
      limit = 20,
      sort = '-createdAt'
    } = req.query;
    
    const query = {};
    
    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (service) query.service = service;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } }
      ];
    }
    
    const quotations = await Quotation.find(query)
      .populate('assignedTo', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Quotation.countDocuments(query);
    
    res.json({
      success: true,
      data: quotations,
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

// @route   GET /api/quotations/:id
// @desc    Get single quotation
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.createdBy', 'name email');
    
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }
    
    res.json({
      success: true,
      data: quotation
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/quotations/:id
// @desc    Update quotation
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    let quotation = await Quotation.findById(req.params.id);
    
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }
    
    // If status changed to quoted, set quotedAt
    if (req.body.status === 'quoted' && quotation.status !== 'quoted') {
      req.body.quotedAt = new Date();
    }
    
    quotation = await Quotation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('assignedTo', 'name email');
    
    res.json({
      success: true,
      data: quotation
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/quotations/:id/notes
// @desc    Add note to quotation
// @access  Private/Admin
router.post('/:id/notes', protect, authorize('admin'), [
  body('note').trim().notEmpty().withMessage('Note is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const quotation = await Quotation.findById(req.params.id);
    
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }
    
    quotation.notes.push({
      note: req.body.note,
      createdBy: req.user.id
    });
    
    await quotation.save();
    
    res.json({
      success: true,
      data: quotation
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/quotations/stats/overview
// @desc    Get quotation statistics
// @access  Private/Admin
router.get('/stats/overview', protect, authorize('admin'), async (req, res, next) => {
  try {
    const totalQuotations = await Quotation.countDocuments();
    
    // By status
    const byStatus = await Quotation.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    
    // By service
    const byService = await Quotation.aggregate([
      { $group: { _id: '$service', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // By priority
    const byPriority = await Quotation.aggregate([
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);
    
    // Recent quotations (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentQuotations = await Quotation.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });
    
    // Pending follow-ups
    const pendingFollowUps = await Quotation.countDocuments({
      followUpDate: { $lte: new Date() },
      status: { $nin: ['completed', 'rejected'] }
    });
    
    // Conversion rate (quoted/accepted vs total)
    const conversions = await Quotation.countDocuments({
      status: { $in: ['quoted', 'accepted', 'completed'] }
    });
    const conversionRate = totalQuotations > 0 
      ? ((conversions / totalQuotations) * 100).toFixed(2) 
      : 0;
    
    res.json({
      success: true,
      data: {
        totalQuotations,
        recentQuotations,
        pendingFollowUps,
        conversionRate,
        byStatus,
        byService,
        byPriority
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/quotations/save-detailed
// @desc    Save detailed quotation with items
// @access  Private/Admin
router.post('/save-detailed', protect, authorize('admin'), async (req, res, next) => {
  try {
    const quotationData = {
      name: req.body.clientInfo.name,
      email: req.body.clientInfo.email || 'noemail@provided.com',
      phone: req.body.clientInfo.phone || 'No phone',
      company: req.body.clientInfo.company,
      service: 'Custom Quotation',
      message: `Detailed quotation with ${req.body.items.length} items`,
      quotedAmount: req.body.total,
      status: 'quoted',
      quotedAt: new Date(),
      detailedQuote: {
        clientInfo: req.body.clientInfo,
        invoiceInfo: req.body.invoiceInfo,
        items: req.body.items,
        imageProcessing: req.body.imageProcessing,
        transport: req.body.transport,
        terms: req.body.terms,
        language: req.body.language,
        subtotal: req.body.subtotal,
        total: req.body.total
      }
    };
    
    const quotation = await Quotation.create(quotationData);
    
    res.status(201).json({
      success: true,
      message: 'Detailed quotation saved successfully',
      data: quotation
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/quotations/:id
// @desc    Delete quotation
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const quotation = await Quotation.findById(req.params.id);
    
    if (!quotation) {
      return res.status(404).json({
        success: false,
        message: 'Quotation not found'
      });
    }
    
    await quotation.deleteOne();
    
    res.json({
      success: true,
      message: 'Quotation deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
