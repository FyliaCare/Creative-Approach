import express from 'express';
import ContactMessage from '../models/ContactMessage.js';
import Quotation from '../models/Quotation.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/contacts
// @desc    Get all contact messages
// @access  Private/Admin
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      status,
      priority,
      search 
    } = req.query;
    
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (priority) {
      query.priority = priority;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } },
        { service: { $regex: search, $options: 'i' } }
      ];
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const contacts = await ContactMessage.find(query)
      .populate('assignedTo', 'name email')
      .populate('quotationId', 'status quotedAmount')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);
    
    const total = await ContactMessage.countDocuments(query);
    const unreadCount = await ContactMessage.countDocuments({ status: 'new' });
    
    const stats = {
      new: await ContactMessage.countDocuments({ status: 'new' }),
      read: await ContactMessage.countDocuments({ status: 'read' }),
      converted: await ContactMessage.countDocuments({ status: 'converted_to_quote' }),
      replied: await ContactMessage.countDocuments({ status: 'replied' }),
      total: await ContactMessage.countDocuments()
    };
    
    res.json({
      success: true,
      data: {
        contacts,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit))
        },
        unreadCount,
        stats
      }
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact messages'
    });
  }
});

// @route   GET /api/contacts/stats
// @desc    Get contact message statistics
// @access  Private/Admin
router.get('/stats', protect, authorize('admin'), async (req, res) => {
  try {
    const stats = {
      total: await ContactMessage.countDocuments(),
      new: await ContactMessage.countDocuments({ status: 'new' }),
      read: await ContactMessage.countDocuments({ status: 'read' }),
      converted: await ContactMessage.countDocuments({ status: 'converted_to_quote' }),
      replied: await ContactMessage.countDocuments({ status: 'replied' }),
      archived: await ContactMessage.countDocuments({ status: 'archived' }),
      spam: await ContactMessage.countDocuments({ status: 'spam' })
    };
    
    // Get messages by source
    const bySource = await ContactMessage.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Get recent conversion rate
    const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentMessages = await ContactMessage.countDocuments({
      createdAt: { $gte: last30Days }
    });
    const recentConverted = await ContactMessage.countDocuments({
      createdAt: { $gte: last30Days },
      status: 'converted_to_quote'
    });
    
    res.json({
      success: true,
      data: {
        stats,
        bySource,
        conversionRate: recentMessages > 0 ? (recentConverted / recentMessages * 100).toFixed(2) : 0
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// @route   GET /api/contacts/:id
// @desc    Get single contact message
// @access  Private/Admin
router.get('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await ContactMessage.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('quotationId')
      .populate('adminNotes.addedBy', 'name email');
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    // Mark as read if it's new
    if (contact.status === 'new') {
      contact.status = 'read';
      await contact.save();
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error('Error fetching contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact message'
    });
  }
});

// @route   POST /api/contacts/:id/convert-to-quote
// @desc    Convert contact message to quotation
// @access  Private/Admin
router.post('/:id/convert-to-quote', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    if (contact.status === 'converted_to_quote') {
      return res.status(400).json({
        success: false,
        message: 'This contact has already been converted to a quotation'
      });
    }
    
    // Map service to quotation enum
    const serviceMapping = {
      'Aerial Photography & Videography': 'Aerial Photography',
      'Aerial Photography': 'Aerial Photography',
      'Drone Inspection & Monitoring': 'Drone Inspection',
      'Drone Inspection': 'Drone Inspection',
      'Mapping, Surveying & 3D Modelling': 'Mapping & Surveying',
      'Mapping & Surveying': 'Mapping & Surveying',
      'Documentary Films & Photography': 'Documentary Production',
      'Documentary Production': 'Documentary Production',
      'Training': 'Training'
    };
    
    const mappedService = serviceMapping[contact.service] || 'Other';
    
    // Create quotation from contact
    const quotation = await Quotation.create({
      name: contact.name,
      email: contact.email,
      phone: contact.phone || 'Not provided',
      location: contact.location || 'Not specified',
      service: mappedService,
      projectType: 'Other',
      budget: 'Not sure',
      timeline: 'Flexible',
      message: contact.message,
      status: 'new',
      priority: contact.priority || 'medium',
      assignedTo: req.user._id
    });
    
    // Update contact message
    contact.status = 'converted_to_quote';
    contact.quotationId = quotation._id;
    contact.assignedTo = req.user._id;
    await contact.save();
    
    res.json({
      success: true,
      message: 'Contact converted to quotation successfully',
      data: {
        contact,
        quotation
      }
    });
  } catch (error) {
    console.error('Error converting to quote:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to convert to quotation'
    });
  }
});

// @route   PATCH /api/contacts/:id/status
// @desc    Update contact message status
// @access  Private/Admin
router.patch('/:id/status', protect, authorize('admin'), async (req, res) => {
  try {
    const { status } = req.body;
    
    const validStatuses = ['new', 'read', 'converted_to_quote', 'replied', 'archived', 'spam'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }
    
    const contact = await ContactMessage.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    contact.status = status;
    
    if (status === 'replied') {
      contact.replied = true;
      contact.repliedAt = new Date();
      contact.repliedBy = req.user._id;
    }
    
    await contact.save();
    
    res.json({
      success: true,
      message: 'Status updated successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error updating status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update status'
    });
  }
});

// @route   POST /api/contacts/:id/notes
// @desc    Add note to contact message
// @access  Private/Admin
router.post('/:id/notes', protect, authorize('admin'), async (req, res) => {
  try {
    const { note } = req.body;
    
    if (!note) {
      return res.status(400).json({
        success: false,
        message: 'Note is required'
      });
    }
    
    const contact = await ContactMessage.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    contact.adminNotes.push({
      note,
      addedBy: req.user._id,
      addedAt: new Date()
    });
    
    await contact.save();
    
    // Populate the added note
    await contact.populate('adminNotes.addedBy', 'name email');
    
    res.json({
      success: true,
      message: 'Note added successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error adding note:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note'
    });
  }
});

// @route   DELETE /api/contacts/:id
// @desc    Delete contact message
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const contact = await ContactMessage.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    await contact.deleteOne();
    
    res.json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete contact message'
    });
  }
});

// @route   POST /api/contacts/:id/assign
// @desc    Assign contact to admin user
// @access  Private/Admin
router.post('/:id/assign', protect, authorize('admin'), async (req, res) => {
  try {
    const { assignedTo } = req.body;
    
    const contact = await ContactMessage.findById(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }
    
    contact.assignedTo = assignedTo || null;
    await contact.save();
    
    await contact.populate('assignedTo', 'name email');
    
    res.json({
      success: true,
      message: 'Contact assigned successfully',
      data: contact
    });
  } catch (error) {
    console.error('Error assigning contact:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to assign contact'
    });
  }
});

export default router;
