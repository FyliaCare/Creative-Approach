import express from 'express';
import { body, validationResult } from 'express-validator';
import Blog from '../models/Blog.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/blog
// @desc    Get all blog posts
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { 
      status = 'published', 
      category, 
      tag, 
      featured,
      search,
      page = 1, 
      limit = 10,
      sort = '-publishedAt'
    } = req.query;
    
    const query = {};
    
    // Only show published posts to public (unless admin)
    if (!req.user || req.user.role !== 'admin') {
      query.status = 'published';
    } else if (status) {
      query.status = status;
    }
    
    if (category) query.category = category;
    if (tag) query.tags = tag;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } }
      ];
    }
    
    const posts = await Blog.find(query)
      .populate('author', 'name email avatar')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Blog.countDocuments(query);
    
    res.json({
      success: true,
      data: posts,
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

// @route   GET /api/blog/:slug
// @desc    Get single blog post by slug
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name email avatar');
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Only allow viewing published posts (unless admin)
    if (post.status !== 'published' && (!req.user || req.user.role !== 'admin')) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // Increment views
    post.views += 1;
    await post.save();
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/blog
// @desc    Create blog post
// @access  Private/Admin
router.post('/', protect, authorize('admin'), [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('excerpt').trim().notEmpty().withMessage('Excerpt is required'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('featuredImage').trim().notEmpty().withMessage('Featured image is required'),
  body('category').isIn([
    'Aerial Photography',
    'Drone Technology',
    'Industry News',
    'Case Studies',
    'Tutorials',
    'Company News',
    'Other'
  ]).withMessage('Valid category is required')
], async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }
    
    const postData = {
      ...req.body,
      author: req.user.id
    };
    
    const post = await Blog.create(postData);
    
    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/blog/:id
// @desc    Update blog post
// @access  Private/Admin
router.put('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    let post = await Blog.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    // If changing to published and not already published, set publishedAt
    if (req.body.status === 'published' && post.status !== 'published') {
      req.body.publishedAt = new Date();
    }
    
    post = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('author', 'name email avatar');
    
    res.json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/blog/:id
// @desc    Delete blog post
// @access  Private/Admin
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    await post.deleteOne();
    
    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/blog/:id/like
// @desc    Like a blog post
// @access  Public
router.post('/:id/like', async (req, res, next) => {
  try {
    const post = await Blog.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    post.likes += 1;
    await post.save();
    
    res.json({
      success: true,
      data: { likes: post.likes }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/blog/categories/list
// @desc    Get all categories with post counts
// @access  Public
router.get('/categories/list', async (req, res, next) => {
  try {
    const categories = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/blog/tags/popular
// @desc    Get popular tags
// @access  Public
router.get('/tags/popular', async (req, res, next) => {
  try {
    const tags = await Blog.aggregate([
      { $match: { status: 'published' } },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 20 }
    ]);
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
});

export default router;
