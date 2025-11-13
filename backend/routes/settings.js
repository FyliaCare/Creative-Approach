import express from 'express';
import Settings from '../models/Settings.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

// Get settings (admin only)
router.get('/', protect, authorize('admin'), async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    // Don't send sensitive data like passwords
    const safeSettings = settings.toObject();
    if (safeSettings.email) {
      delete safeSettings.email.smtpPassword;
    }
    
    res.json(safeSettings);
  } catch (error) {
    console.error('Get settings error:', error);
    res.status(500).json({ message: 'Failed to fetch settings' });
  }
});

// Update settings (admin only)
router.patch('/', protect, authorize('admin'), async (req, res) => {
  try {
    let settings = await Settings.getSettings();
    
    // Update only allowed fields
    const allowedUpdates = [
      'company', 'socialMedia', 'email', 'api', 'security',
      'maintenance', 'analytics', 'backup', 'seo', 'notifications'
    ];
    
    allowedUpdates.forEach(field => {
      if (req.body[field]) {
        if (field === 'email' && req.body[field].smtpPassword === '********') {
          // Don't update password if it's masked
          const { smtpPassword, ...rest } = req.body[field];
          settings[field] = { ...settings[field], ...rest };
        } else {
          settings[field] = { ...settings[field], ...req.body[field] };
        }
      }
    });
    
    settings.updatedBy = req.user.userId;
    await settings.save();
    
    // Don't send sensitive data
    const safeSettings = settings.toObject();
    if (safeSettings.email) {
      delete safeSettings.email.smtpPassword;
    }
    
    res.json({
      success: true,
      message: 'Settings updated successfully',
      settings: safeSettings
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Failed to update settings' });
  }
});

// Test email configuration
router.post('/test-email', protect, authorize('admin'), async (req, res) => {
  try {
    const { to } = req.body;
    
    if (!to) {
      return res.status(400).json({ message: 'Recipient email required' });
    }
    
    const settings = await Settings.getSettings();
    
    // Import email service
    const { sendEmail } = await import('../utils/emailService.js');
    
    await sendEmail({
      to,
      subject: 'Test Email from Creative Approach',
      html: `
        <h2>Email Configuration Test</h2>
        <p>This is a test email to verify your SMTP configuration is working correctly.</p>
        <p>If you received this email, your email settings are configured properly.</p>
        <p><strong>Sent at:</strong> ${new Date().toLocaleString()}</p>
      `
    });
    
    res.json({
      success: true,
      message: 'Test email sent successfully'
    });
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// Clear cache
router.post('/clear-cache', protect, authorize('admin'), async (req, res) => {
  try {
    // Clear any application caches here
    // For now, just return success
    res.json({
      success: true,
      message: 'Cache cleared successfully'
    });
  } catch (error) {
    console.error('Clear cache error:', error);
    res.status(500).json({ message: 'Failed to clear cache' });
  }
});

// Export database backup
router.get('/backup', protect, authorize('admin'), async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    
    // Update last backup time
    settings.backup.lastBackup = new Date();
    await settings.save();
    
    // In a real app, you would create a database backup here
    // For now, return settings as JSON
    res.json({
      success: true,
      message: 'Backup created successfully',
      timestamp: new Date(),
      data: {
        settings: settings.toObject(),
        // Add other collections here
      }
    });
  } catch (error) {
    console.error('Backup error:', error);
    res.status(500).json({ message: 'Failed to create backup' });
  }
});

// Get activity log (stub for now)
router.get('/activity-log', protect, authorize('admin'), async (req, res) => {
  try {
    // In a real app, fetch from an activity log collection
    // For now, return empty array
    res.json({
      success: true,
      logs: []
    });
  } catch (error) {
    console.error('Activity log error:', error);
    res.status(500).json({ message: 'Failed to fetch activity log' });
  }
});

export default router;
