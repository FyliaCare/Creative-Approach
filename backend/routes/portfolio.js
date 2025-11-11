import express from 'express';
import Portfolio from '../models/Portfolio.js';
import { protect, authorize } from '../middleware/auth.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// @route   GET /api/portfolio
// @desc    Get all portfolio items (published for public, all for admin)
// @access  Public/Admin
router.get('/', async (req, res) => {
  try {
    const { category, featured, limit = 20, sort = '-date', status } = req.query;
    
    // Check if user is admin
    const token = req.headers.authorization?.split(' ')[1];
    let isAdmin = false;
    
    if (token) {
      try {
        const jwt = await import('jsonwebtoken');
        const decoded = jwt.default.verify(token, process.env.JWT_SECRET);
        if (decoded.role === 'admin') {
          isAdmin = true;
        }
      } catch (err) {
        // Token invalid or expired, treat as public
      }
    }
    
    // Build query - admins see all, public only sees published
    let query = isAdmin ? {} : { status: 'published' };
    
    if (category) query.category = category;
    if (featured) query.featured = featured === 'true';
    if (status && isAdmin) query.status = status;
    
    const portfolios = await Portfolio.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .select('-__v');
    
    res.json(portfolios);
  } catch (error) {
    console.error('Error fetching portfolios:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/portfolio/stats
// @desc    Get portfolio statistics
// @access  Public
router.get('/stats', async (req, res) => {
  try {
    const totalProjects = await Portfolio.countDocuments({ status: 'published' });
    const totalViews = await Portfolio.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, total: { $sum: '$views' } } }
    ]);
    const totalLikes = await Portfolio.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: null, total: { $sum: '$likes' } } }
    ]);
    
    const categories = await Portfolio.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      totalProjects,
      totalViews: totalViews[0]?.total || 0,
      totalLikes: totalLikes[0]?.total || 0,
      categories: categories.map(c => ({ category: c._id, count: c.count }))
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/portfolio/:slug
// @desc    Get single portfolio item by slug
// @access  Public
router.get('/:slug', async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ 
      slug: req.params.slug, 
      status: 'published' 
    });
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    // Increment views
    portfolio.views += 1;
    await portfolio.save();
    
    res.json(portfolio);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/portfolio
// @desc    Create new portfolio item
// @access  Private/Admin
router.post('/',
  protect,
  authorize('admin'),
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('client').notEmpty().withMessage('Client is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('date').notEmpty().withMessage('Date is required'),
    body('featuredImage').notEmpty().withMessage('Featured image is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const portfolio = new Portfolio(req.body);
      await portfolio.save();
      res.status(201).json(portfolio);
    } catch (error) {
      console.error('Error creating portfolio:', error);
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Portfolio with this slug already exists' });
      }
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// @route   PATCH /api/portfolio/:id
// @desc    Update portfolio item
// @access  Private/Admin
router.patch('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.json(portfolio);
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/portfolio/:id
// @desc    Delete portfolio item
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Error deleting portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/portfolio/:id/like
// @desc    Like a portfolio item
// @access  Public
router.post('/:id/like', async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);
    
    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio item not found' });
    }
    
    portfolio.likes += 1;
    await portfolio.save();
    
    res.json({ likes: portfolio.likes });
  } catch (error) {
    console.error('Error liking portfolio:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
