import express from 'express';
import Visitor from '../models/Visitor.js';
import Portfolio from '../models/Portfolio.js';
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

// ============================================
// PORTFOLIO ANALYTICS ENDPOINTS
// ============================================

// @route   GET /api/analytics/portfolio/overview
// @desc    Get overall portfolio analytics
// @access  Private/Admin
router.get('/portfolio/overview', protect, authorize('admin'), async (req, res, next) => {
  try {
    const portfolios = await Portfolio.find({ status: 'published' });
    
    const totalViews = portfolios.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = portfolios.reduce((sum, p) => sum + (p.likes || 0), 0);
    const totalProjects = portfolios.length;
    const avgSeoScore = portfolios.reduce((sum, p) => sum + (p.seoScore || 0), 0) / totalProjects || 0;
    const avgQualityScore = portfolios.reduce((sum, p) => sum + (p.qualityScore || 0), 0) / totalProjects || 0;
    
    const topByViews = [...portfolios]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5)
      .map(p => ({ id: p._id, title: p.title, views: p.views || 0, likes: p.likes || 0 }));
    
    const categoryStats = portfolios.reduce((acc, p) => {
      const cat = p.category || 'other';
      if (!acc[cat]) acc[cat] = { count: 0, views: 0, likes: 0 };
      acc[cat].count++;
      acc[cat].views += p.views || 0;
      acc[cat].likes += p.likes || 0;
      return acc;
    }, {});
    
    res.json({
      success: true,
      data: {
        overview: {
          totalViews,
          totalLikes,
          totalProjects,
          avgSeoScore: Math.round(avgSeoScore),
          avgQualityScore: Math.round(avgQualityScore)
        },
        topPerformers: { byViews: topByViews },
        categoryStats
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/analytics/portfolio/track-view
// @desc    Track a portfolio view
// @access  Public
router.post('/portfolio/track-view', async (req, res, next) => {
  try {
    const { portfolioId, source, device, country } = req.body;
    
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    portfolio.views = (portfolio.views || 0) + 1;
    
    if (!portfolio.analytics) {
      portfolio.analytics = { totalViews: 0, trafficSources: {}, devices: {}, topLocations: [] };
    }
    
    portfolio.analytics.totalViews = (portfolio.analytics.totalViews || 0) + 1;
    
    if (source && ['direct', 'search', 'social', 'referral'].includes(source)) {
      if (!portfolio.analytics.trafficSources) portfolio.analytics.trafficSources = {};
      portfolio.analytics.trafficSources[source] = (portfolio.analytics.trafficSources[source] || 0) + 1;
    }
    
    if (device && ['desktop', 'mobile', 'tablet'].includes(device)) {
      if (!portfolio.analytics.devices) portfolio.analytics.devices = {};
      portfolio.analytics.devices[device] = (portfolio.analytics.devices[device] || 0) + 1;
    }
    
    await portfolio.save();
    
    res.json({ success: true, views: portfolio.views });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/analytics/portfolio/update-scores
// @desc    Update SEO and quality scores
// @access  Private/Admin
router.post('/portfolio/update-scores', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { portfolioId, seoScore, qualityScore, optimization } = req.body;
    
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ error: 'Portfolio not found' });
    }
    
    if (seoScore !== undefined) {
      portfolio.seoScore = Math.min(100, Math.max(0, seoScore));
    }
    
    if (qualityScore !== undefined) {
      portfolio.qualityScore = Math.min(100, Math.max(0, qualityScore));
    }
    
    if (optimization) {
      portfolio.optimization = {
        ...portfolio.optimization,
        ...optimization,
        lastOptimized: new Date()
      };
    }
    
    await portfolio.save();
    
    res.json({
      success: true,
      seoScore: portfolio.seoScore,
      qualityScore: portfolio.qualityScore
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/visitor-map
// @desc    Get visitor locations for map visualization with real-time tracking
// @access  Private/Admin
router.get('/visitor-map', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '24h', activeOnly = 'false' } = req.query;
    
    let query = {};
    
    if (activeOnly === 'true') {
      // Only active visitors (last 30 minutes)
      const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
      query.isActive = true;
      query.lastActivity = { $gte: thirtyMinutesAgo };
    } else {
      // Filter by period
      let startDate;
      switch(period) {
        case '1h':
          startDate = new Date(Date.now() - 60 * 60 * 1000);
          break;
        case '24h':
          startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
          break;
        case '7d':
          startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          break;
        case '30d':
          startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
          break;
        default:
          startDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
      }
      query.createdAt = { $gte: startDate };
    }
    
    // Fetch visitors with valid coordinates
    const visitors = await Visitor.find({
      ...query,
      'coordinates.latitude': { $exists: true, $ne: null },
      'coordinates.longitude': { $exists: true, $ne: null }
    })
    .select('sessionId country city coordinates device browser os isActive lastActivity pages entryPage totalPageViews')
    .sort({ lastActivity: -1 })
    .limit(1000)
    .lean();
    
    // Transform data for map markers
    const mapData = visitors.map(visitor => ({
      id: visitor.sessionId,
      lat: visitor.coordinates.latitude,
      lng: visitor.coordinates.longitude,
      country: visitor.country,
      city: visitor.city,
      device: visitor.device,
      browser: visitor.browser,
      os: visitor.os,
      isActive: visitor.isActive,
      lastActivity: visitor.lastActivity,
      currentPage: visitor.pages && visitor.pages.length > 0 
        ? visitor.pages[visitor.pages.length - 1].url 
        : visitor.entryPage,
      pageViews: visitor.totalPageViews,
      duration: Math.floor((new Date(visitor.lastActivity) - new Date(visitor.createdAt || visitor.lastActivity)) / 1000)
    }));
    
    // Get summary statistics
    const stats = {
      totalVisitors: visitors.length,
      activeVisitors: visitors.filter(v => v.isActive).length,
      countries: [...new Set(visitors.map(v => v.country))].length,
      devices: {
        desktop: visitors.filter(v => v.device === 'desktop').length,
        mobile: visitors.filter(v => v.device === 'mobile').length,
        tablet: visitors.filter(v => v.device === 'tablet').length
      }
    };
    
    res.json({
      success: true,
      data: {
        visitors: mapData,
        stats
      }
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/analytics/visitor-heatmap
// @desc    Get visitor density data for heatmap visualization
// @access  Private/Admin
router.get('/visitor-heatmap', protect, authorize('admin'), async (req, res, next) => {
  try {
    const { period = '7d' } = req.query;
    
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
      default:
        startDate = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    }
    
    // Aggregate visitor density by coordinates
    const heatmapData = await Visitor.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate },
          'coordinates.latitude': { $exists: true, $ne: null },
          'coordinates.longitude': { $exists: true, $ne: null }
        }
      },
      {
        $group: {
          _id: {
            lat: { $round: ['$coordinates.latitude', 1] },
            lng: { $round: ['$coordinates.longitude', 1] }
          },
          count: { $sum: 1 },
          avgDuration: { $avg: '$sessionDuration' },
          pageViews: { $sum: '$totalPageViews' }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 500 }
    ]);
    
    const formattedData = heatmapData.map(point => ({
      lat: point._id.lat,
      lng: point._id.lng,
      intensity: point.count,
      avgDuration: Math.round(point.avgDuration),
      pageViews: point.pageViews
    }));
    
    res.json({
      success: true,
      data: formattedData
    });
  } catch (error) {
    next(error);
  }
});

export default router;
