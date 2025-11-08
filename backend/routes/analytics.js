import express from 'express';
import Visitor from '../models/Visitor.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/analytics/overview
// @desc    Get analytics overview
// @access  Private/Admin
router.get('/overview', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '7d' } = req.query;
    
    // Calculate date range
    let startDate;
    switch(period) {
      case '24h':
        startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }
    
    // Total visitors in period
    const totalVisitors = await Visitor.countDocuments({
      createdAt: { $gte: startDate }
    });
    
    // Active visitors (last 30 minutes)
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    const activeVisitors = await Visitor.countDocuments({
      isActive: true,
      lastActivity: { $gte: thirtyMinutesAgo }
    });
    
    // Total page views
    const pageViewsResult = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: null, total: { $sum: '$totalPageViews' } } }
    ]);
    const totalPageViews = pageViewsResult[0]?.total || 0;
    
    // Average session duration
    const avgDurationResult = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: null, avg: { $avg: '$sessionDuration' } } }
    ]);
    const avgSessionDuration = Math.round(avgDurationResult[0]?.avg || 0);
    
    // Bounce rate
    const bouncedVisitors = await Visitor.countDocuments({
      createdAt: { $gte: startDate },
      bounced: true
    });
    const bounceRate = totalVisitors > 0 
      ? ((bouncedVisitors / totalVisitors) * 100).toFixed(2) 
      : 0;
    
    // Conversion rate
    const conversions = await Visitor.countDocuments({
      createdAt: { $gte: startDate },
      converted: true
    });
    const conversionRate = totalVisitors > 0 
      ? ((conversions / totalVisitors) * 100).toFixed(2) 
      : 0;
    
    res.json({
      success: true,
      data: {
        totalVisitors,
        activeVisitors,
        totalPageViews,
        avgSessionDuration,
        bounceRate,
        conversionRate,
        period
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/countries
// @desc    Get visitor statistics by country
// @access  Private/Admin
router.get('/countries', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '30d', limit = 20 } = req.query;
    
    let startDate;
    switch(period) {
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
        startDate = new Date(0);
        break;
      default:
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    
    const countries = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: '$country',
          visitors: { $sum: 1 },
          pageViews: { $sum: '$totalPageViews' },
          avgDuration: { $avg: '$sessionDuration' },
          conversions: {
            $sum: { $cond: ['$converted', 1, 0] }
          }
        }
      },
      { $sort: { visitors: -1 } },
      { $limit: parseInt(limit) }
    ]);
    
    res.json({
      success: true,
      data: countries
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/pages
// @desc    Get most visited pages
// @access  Private/Admin
router.get('/pages', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '30d', limit = 20 } = req.query;
    
    let startDate;
    switch(period) {
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    
    const pages = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $unwind: '$pages' },
      { $match: { 'pages.visitedAt': { $gte: startDate } } },
      {
        $group: {
          _id: '$pages.url',
          views: { $sum: 1 },
          uniqueVisitors: { $addToSet: '$sessionId' }
        }
      },
      {
        $project: {
          _id: 1,
          views: 1,
          uniqueVisitors: { $size: '$uniqueVisitors' }
        }
      },
      { $sort: { views: -1 } },
      { $limit: parseInt(limit) }
    ]);
    
    res.json({
      success: true,
      data: pages
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/referrers
// @desc    Get top referrers
// @access  Private/Admin
router.get('/referrers', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '30d', limit = 20 } = req.query;
    
    let startDate;
    switch(period) {
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    
    const referrers = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          referrerDomain: { $ne: null, $ne: '' }
        }
      },
      {
        $group: {
          _id: '$referrerDomain',
          visitors: { $sum: 1 },
          conversions: {
            $sum: { $cond: ['$converted', 1, 0] }
          }
        }
      },
      { $sort: { visitors: -1 } },
      { $limit: parseInt(limit) }
    ]);
    
    // Direct traffic
    const directTraffic = await Visitor.countDocuments({
      createdAt: { $gte: startDate },
      $or: [
        { referrerDomain: null },
        { referrerDomain: '' }
      ]
    });
    
    res.json({
      success: true,
      data: {
        referrers,
        directTraffic
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/devices
// @desc    Get device statistics
// @access  Private/Admin
router.get('/devices', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;
    
    let startDate;
    switch(period) {
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    }
    
    // By device type
    const byDevice = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$device', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // By browser
    const byBrowser = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$browser', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    // By OS
    const byOS = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: '$os', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    
    res.json({
      success: true,
      data: {
        byDevice,
        byBrowser,
        byOS
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/realtime
// @desc    Get real-time active visitors
// @access  Private/Admin
router.get('/realtime', protect, authorize('admin'), async (req, res, next) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    
    const activeVisitors = await Visitor.find({
      isActive: true,
      lastActivity: { $gte: fiveMinutesAgo }
    })
      .select('country city device browser pages.url lastActivity')
      .sort({ lastActivity: -1 })
      .limit(50);
    
    const formattedVisitors = activeVisitors.map(v => ({
      country: v.country,
      city: v.city,
      device: v.device,
      browser: v.browser,
      currentPage: v.pages[v.pages.length - 1]?.url,
      lastActivity: v.lastActivity
    }));
    
    res.json({
      success: true,
      data: {
        count: activeVisitors.length,
        visitors: formattedVisitors
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/timeline
// @desc    Get visitor timeline (visits by day)
// @access  Private/Admin
router.get('/timeline', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '30d' } = req.query;
    
    let startDate;
    let groupBy;
    
    switch(period) {
      case '7d':
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      case '30d':
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      case '90d':
        startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
        break;
      default:
        startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        groupBy = { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };
    }
    
    const timeline = await Visitor.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      {
        $group: {
          _id: groupBy,
          visitors: { $sum: 1 },
          pageViews: { $sum: '$totalPageViews' },
          conversions: {
            $sum: { $cond: ['$converted', 1, 0] }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    res.json({
      success: true,
      data: timeline
    });
  } catch (error) {
    next(error);
  }
});

export default router;
