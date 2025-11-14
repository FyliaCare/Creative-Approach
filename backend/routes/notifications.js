import express from 'express';
import Notification from '../models/Notification.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/notifications
// @desc    Get all notifications for logged-in admin
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      unreadOnly = 'false',
      type 
    } = req.query;
    
    const query = { recipient: req.user._id };
    
    if (unreadOnly === 'true') {
      query.read = false;
    }
    
    if (type) {
      query.type = type;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip)
      .lean();
    
    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ 
      recipient: req.user._id, 
      read: false 
    });
    
    res.json({
      success: true,
      data: {
        notifications,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        },
        unreadCount
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/notifications/unread-count
// @desc    Get unread notification count
// @access  Private/Admin
router.get('/unread-count', protect, authorize('admin'), async (req, res, next) => {
  try {
    const count = await Notification.getUnreadCount(req.user._id);
    
    res.json({
      success: true,
      data: { count }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/notifications/:id
// @desc    Get single notification
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id
    });
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }
    
    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/notifications/:id/read
// @desc    Mark notification as read
// @access  Private/Admin
router.put('/:id/read', protect, authorize('admin'), async (req, res, next) => {
  try {
    const notification = await Notification.findOne({
      _id: req.params.id,
      recipient: req.user._id
    });
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }
    
    await notification.markAsRead();
    
    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/notifications/mark-all-read
// @desc    Mark all notifications as read
// @access  Private/Admin
router.put('/mark-all-read', protect, authorize('admin'), async (req, res, next) => {
  try {
    await Notification.markAllAsRead(req.user._id);
    
    res.json({
      success: true,
      message: 'All notifications marked as read'
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/notifications/:id
// @desc    Delete a notification
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const notification = await Notification.findOneAndDelete({
      _id: req.params.id,
      recipient: req.user._id
    });
    
    if (!notification) {
      return res.status(404).json({
        success: false,
        error: 'Notification not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Notification deleted'
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/notifications/clear-all
// @desc    Delete all read notifications
// @access  Private/Admin
router.delete('/clear-all', protect, authorize('admin'), async (req, res, next) => {
  try {
    const result = await Notification.deleteMany({
      recipient: req.user._id,
      read: true
    });
    
    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} notifications`
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/notifications/test
// @desc    Create a test notification (development only)
// @access  Private/Admin
router.post('/test', protect, authorize('admin'), async (req, res, next) => {
  try {
    const notification = await Notification.create({
      recipient: req.user._id,
      type: 'system_alert',
      title: 'Test Notification',
      message: 'This is a test notification to verify the system is working correctly.',
      priority: 'medium',
      icon: 'Bell'
    });
    
    res.json({
      success: true,
      data: notification
    });
  } catch (error) {
    next(error);
  }
});

export default router;
