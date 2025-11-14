import Notification from '../models/Notification.js';

/**
 * Notification service for creating and managing notifications
 */
class NotificationService {
  /**
   * Create a notification for an admin user
   */
  static async createNotification(data) {
    try {
      const notification = await Notification.create(data);
      
      // Emit via Socket.IO if available
      if (global.io) {
        global.io.to(`admin_${data.recipient}`).emit('new_notification', notification);
      }
      
      return notification;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  /**
   * Create notification for new quotation
   */
  static async notifyNewQuotation(adminId, quotation) {
    return this.createNotification({
      recipient: adminId,
      type: 'new_quotation',
      title: 'New Quotation Request',
      message: `${quotation.clientInfo?.name || 'A client'} has submitted a new quotation request for ${quotation.service}.`,
      link: `/quotations/${quotation._id}`,
      icon: 'ClipboardList',
      priority: 'high',
      metadata: {
        quotationId: quotation._id,
        service: quotation.service,
        clientName: quotation.clientInfo?.name
      }
    });
  }

  /**
   * Create notification for new newsletter subscriber
   */
  static async notifyNewSubscriber(adminId, subscriber) {
    return this.createNotification({
      recipient: adminId,
      type: 'new_newsletter_subscriber',
      title: 'New Newsletter Subscriber',
      message: `${subscriber.email} has subscribed to your newsletter.`,
      link: '/newsletter',
      icon: 'Users',
      priority: 'low',
      metadata: {
        subscriberId: subscriber._id,
        email: subscriber.email
      }
    });
  }

  /**
   * Create notification for new chat message
   */
  static async notifyNewChatMessage(adminId, message, visitorName) {
    return this.createNotification({
      recipient: adminId,
      type: 'new_chat_message',
      title: 'New Chat Message',
      message: `${visitorName} sent you a message: "${message.message.substring(0, 50)}${message.message.length > 50 ? '...' : ''}"`,
      link: '/chat',
      icon: 'MessageSquare',
      priority: 'high',
      metadata: {
        messageId: message._id,
        visitorName
      }
    });
  }

  /**
   * Create notification for portfolio view milestone
   */
  static async notifyPortfolioMilestone(adminId, portfolio, milestone) {
    return this.createNotification({
      recipient: adminId,
      type: 'portfolio_view_milestone',
      title: 'Portfolio Milestone Reached! 🎉',
      message: `"${portfolio.title}" has reached ${milestone} views!`,
      link: `/portfolio`,
      icon: 'Award',
      priority: 'medium',
      metadata: {
        portfolioId: portfolio._id,
        milestone,
        views: portfolio.views
      }
    });
  }

  /**
   * Create notification for visitor milestone
   */
  static async notifyVisitorMilestone(adminId, milestone) {
    return this.createNotification({
      recipient: adminId,
      type: 'visitor_milestone',
      title: 'Visitor Milestone Achieved! 🎊',
      message: `Your website has reached ${milestone} total visitors!`,
      link: '/analytics',
      icon: 'TrendingUp',
      priority: 'medium',
      metadata: {
        milestone
      }
    });
  }

  /**
   * Create notification for contact form submission
   */
  static async notifyContactMessage(adminId, contact) {
    return this.createNotification({
      recipient: adminId,
      type: 'contact_message',
      title: 'New Contact Message',
      message: `${contact.name} sent a message: "${contact.message.substring(0, 50)}${contact.message.length > 50 ? '...' : ''}"`,
      link: '/chat',
      icon: 'Mail',
      priority: 'high',
      metadata: {
        contactId: contact._id,
        email: contact.email,
        name: contact.name
      }
    });
  }

  /**
   * Create system alert notification
   */
  static async notifySystemAlert(adminId, title, message, priority = 'medium') {
    return this.createNotification({
      recipient: adminId,
      type: 'system_alert',
      title,
      message,
      icon: 'AlertTriangle',
      priority,
      metadata: {}
    });
  }

  /**
   * Get unread count for an admin
   */
  static async getUnreadCount(adminId) {
    return Notification.getUnreadCount(adminId);
  }

  /**
   * Clean up old notifications
   */
  static async cleanupOldNotifications(daysOld = 30) {
    return Notification.deleteOldNotifications(daysOld);
  }
}

export default NotificationService;
