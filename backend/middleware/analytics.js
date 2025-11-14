import geoip from 'geoip-lite';
import { v4 as uuidv4 } from 'uuid';
import Visitor from '../models/Visitor.js';

// Helper to extract device info from user agent
const parseUserAgent = (userAgent) => {
  const ua = userAgent || '';
  
  // Browser detection
  let browser = 'Unknown';
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edge')) browser = 'Edge';
  else if (ua.includes('Opera')) browser = 'Opera';
  
  // OS detection
  let os = 'Unknown';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  // Device detection
  let device = 'desktop';
  if (ua.includes('Mobile') || ua.includes('Android')) device = 'mobile';
  else if (ua.includes('Tablet') || ua.includes('iPad')) device = 'tablet';
  
  return { browser, os, device };
};

// Extract referrer domain
const getReferrerDomain = (referrer) => {
  if (!referrer) return null;
  try {
    const url = new URL(referrer);
    return url.hostname;
  } catch (error) {
    return null;
  }
};

// Extract UTM parameters
const getUTMParams = (query) => {
  return {
    utmSource: query.utm_source || null,
    utmMedium: query.utm_medium || null,
    utmCampaign: query.utm_campaign || null
  };
};

export const trackVisitor = async (req, res, next) => {
  try {
    // Skip tracking for admin routes, API calls, and static assets
    const skipPaths = [
      '/api/',
      '/admin',
      '/socket.io',
      '/uploads/',
      '/assets/',
      '/favicon',
      '/_redirects',
      '/manifest.json',
      '/robots.txt',
      '/sitemap.xml',
      '/sw.js',
      '/service-worker.js'
    ];

    const shouldSkip = skipPaths.some(path => req.originalUrl.startsWith(path));
    
    if (shouldSkip) {
      return next();
    }

    // Get IP address (handle proxies)
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() || 
                     req.headers['x-real-ip'] || 
                     req.connection.remoteAddress || 
                     req.socket.remoteAddress ||
                     '127.0.0.1';
    
    // Clean IP (remove ::ffff: prefix for IPv4)
    const cleanIP = ipAddress.replace(/^::ffff:/, '');
    
    // Get geolocation data
    const geo = geoip.lookup(cleanIP) || {};
    
    // Get session ID from cookie or create new one
    let sessionId = req.cookies?.sessionId;
    if (!sessionId) {
      sessionId = uuidv4();
      res.cookie('sessionId', sessionId, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000, // 30 minutes
        sameSite: 'lax'
      });
    }
    
    // Parse user agent
    const { browser, os, device } = parseUserAgent(req.headers['user-agent']);
    
    // Get referrer info
    const referrer = req.headers.referer || req.headers.referrer;
    const referrerDomain = getReferrerDomain(referrer);
    
    // Get UTM parameters
    const utmParams = getUTMParams(req.query);
    
    // Current page info
    const currentPage = {
      url: req.originalUrl,
      title: req.query.pageTitle || null,
      visitedAt: new Date(),
      referrer: referrer || null
    };
    
    // Find existing visitor by sessionId OR by IP (to handle cookie clearing)
    let visitor = await Visitor.findOne({ 
      $or: [
        { sessionId },
        { 
          ipAddress: cleanIP,
          lastActivity: { $gte: new Date(Date.now() - 30 * 60 * 1000) } // Active in last 30 mins
        }
      ]
    }).sort({ lastActivity: -1 }).limit(1);
    
    if (visitor) {
      // Update existing session
      
      // Check if this exact page was just visited (within last 5 seconds) to prevent duplicates
      const lastPage = visitor.pages[visitor.pages.length - 1];
      const isDuplicate = lastPage && 
                         lastPage.url === currentPage.url && 
                         (new Date() - new Date(lastPage.visitedAt)) < 5000;
      
      if (!isDuplicate) {
        // Only add page if it's not a duplicate refresh
        visitor.pages.push(currentPage);
        visitor.totalPageViews += 1;
      }
      
      // Update session tracking
      visitor.sessionId = sessionId; // Update to latest sessionId
      visitor.lastActivity = new Date();
      visitor.exitPage = currentPage.url;
      visitor.isActive = true;
      
      // Calculate session duration
      const duration = Math.floor((new Date() - visitor.firstVisit) / 1000);
      visitor.sessionDuration = duration;
      
      // Not bounced if more than 1 page view
      if (visitor.totalPageViews > 1) {
        visitor.bounced = false;
      }
      
      await visitor.save();
    } else {
      // Create new visitor record
      visitor = await Visitor.create({
        sessionId,
        ipAddress: cleanIP,
        country: geo.country || 'Unknown',
        city: geo.city || 'Unknown',
        region: geo.region || null,
        timezone: geo.timezone || null,
        coordinates: geo.ll ? {
          latitude: geo.ll[0],
          longitude: geo.ll[1]
        } : null,
        userAgent: req.headers['user-agent'],
        browser,
        os,
        device,
        pages: [currentPage],
        entryPage: currentPage.url,
        exitPage: currentPage.url,
        referrer: referrer || null,
        referrerDomain,
        ...utmParams,
        totalPageViews: 1,
        bounced: true, // Assume bounced until proven otherwise
        isActive: true
      });
    }
    
    // Attach visitor to request for use in routes
    req.visitor = visitor;
    req.sessionId = sessionId;
    
    next();
  } catch (error) {
    console.error('Analytics tracking error:', error);
    // Don't fail the request if analytics fails
    next();
  }
};

// Cleanup inactive sessions (run periodically)
export const cleanupInactiveSessions = async () => {
  try {
    const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000);
    
    await Visitor.updateMany(
      {
        isActive: true,
        lastActivity: { $lt: thirtyMinutesAgo }
      },
      {
        $set: { isActive: false }
      }
    );
    
    console.log('Inactive sessions cleaned up');
  } catch (error) {
    console.error('Session cleanup error:', error);
  }
};
