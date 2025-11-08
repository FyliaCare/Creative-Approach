import { useState, useEffect } from 'react';
import {
  Users,
  Mail,
  Send,
  TrendingUp,
  TrendingDown,
  Eye,
  MousePointerClick,
  UserPlus,
  Calendar,
  Search,
  Filter,
  MoreVertical,
  Clock,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Tag,
  Zap,
  BarChart3,
  PieChart,
  Globe,
  Sparkles,
  Target,
  ArrowRight,
} from 'lucide-react';
import { newsletterAPI } from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { motion } from 'framer-motion';

// Email Templates
const EMAIL_TEMPLATES = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'Start from scratch',
    preview: '<p>Start writing your email...</p>',
    icon: Sparkles,
    color: 'gray'
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    description: 'Monthly updates and news',
    preview: `
      <h2 style="color: #1e40af; margin-bottom: 20px;">📰 This Month's Highlights</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi {name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">We're excited to share our latest updates with you...</p>
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #1f2937; margin-bottom: 10px;">🎯 What's New</h3>
        <ul style="color: #4b5563; line-height: 1.8;">
          <li>Feature update 1</li>
          <li>Feature update 2</li>
          <li>Feature update 3</li>
        </ul>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Thank you for being part of our community!</p>
    `,
    icon: Mail,
    color: 'blue'
  },
  {
    id: 'promotion',
    name: 'Promotion',
    description: 'Special offers and deals',
    preview: `
      <div style="text-align: center;">
        <h1 style="color: #dc2626; font-size: 32px; margin-bottom: 10px;">🎉 Special Offer!</h1>
        <p style="font-size: 20px; color: #991b1b; font-weight: 600;">Limited Time Only</p>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #374151; margin-top: 30px;">Hi {name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">We have an exclusive offer just for you...</p>
      <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); color: white; padding: 30px; border-radius: 12px; text-align: center; margin: 30px 0;">
        <h2 style="font-size: 36px; margin: 0; color: white;">50% OFF</h2>
        <p style="font-size: 18px; margin: 10px 0; color: white;">All Services This Month</p>
        <a href="#" style="display: inline-block; background: white; color: #dc2626; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 10px;">Claim Offer</a>
      </div>
      <p style="font-size: 14px; color: #6b7280; text-align: center;">Offer expires in 7 days</p>
    `,
    icon: Target,
    color: 'red'
  },
  {
    id: 'announcement',
    name: 'Announcement',
    description: 'Important company news',
    preview: `
      <div style="border-left: 4px solid #10b981; padding-left: 20px; margin-bottom: 30px;">
        <h2 style="color: #059669; margin: 0;">📢 Important Announcement</h2>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Dear {name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">We're excited to announce...</p>
      <div style="background: #ecfdf5; border: 2px solid #10b981; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="color: #047857; margin-top: 0;">Key Highlights:</h3>
        <ul style="color: #065f46; line-height: 1.8;">
          <li>Point 1</li>
          <li>Point 2</li>
          <li>Point 3</li>
        </ul>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">We look forward to serving you better!</p>
    `,
    icon: Zap,
    color: 'green'
  },
  {
    id: 'welcome',
    name: 'Welcome Email',
    description: 'Greet new subscribers',
    preview: `
      <div style="text-align: center; padding: 40px 0;">
        <h1 style="color: #7c3aed; font-size: 36px; margin-bottom: 10px;">👋 Welcome Aboard!</h1>
        <p style="font-size: 18px; color: #6d28d9;">We're thrilled to have you with us</p>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Hi {name},</p>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Thank you for subscribing! Here's what you can expect from us:</p>
      <div style="display: grid; gap: 15px; margin: 30px 0;">
        <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <strong style="color: #6d28d9;">📧 Regular Updates</strong>
          <p style="margin: 5px 0 0 0; color: #6b7280;">Stay informed with our latest news</p>
        </div>
        <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <strong style="color: #6d28d9;">🎁 Exclusive Offers</strong>
          <p style="margin: 5px 0 0 0; color: #6b7280;">Special deals just for subscribers</p>
        </div>
        <div style="background: #faf5ff; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
          <strong style="color: #6d28d9;">💡 Expert Tips</strong>
          <p style="margin: 5px 0 0 0; color: #6b7280;">Learn from industry professionals</p>
        </div>
      </div>
      <p style="font-size: 16px; line-height: 1.6; color: #374151;">Let's get started on this journey together!</p>
    `,
    icon: UserPlus,
    color: 'purple'
  }
];

export const Newsletter = () => {
  // Data states
  const [subscribers, setSubscribers] = useState([]);
  const [campaigns, setCampaigns] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [activeTab, setActiveTab] = useState('overview'); // overview, subscribers, campaigns, compose
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSubscribers, setSelectedSubscribers] = useState([]);
  
  // Email composer states
  const [showComposer, setShowComposer] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');
  const [recipientType, setRecipientType] = useState('active');
  const [sending, setSending] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchData();
  }, [statusFilter]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const params = statusFilter !== 'all' ? { status: statusFilter } : {};
      
      const [subscribersRes, statsRes, campaignsRes] = await Promise.all([
        newsletterAPI.getSubscribers(params),
        newsletterAPI.getStats(),
        newsletterAPI.getCampaigns({ limit: 10 }).catch(() => ({ data: { data: [] } }))
      ]);

      setSubscribers(Array.isArray(subscribersRes.data.data) ? subscribersRes.data.data : []);
      setStats(statsRes.data.data || {});
      setCampaigns(Array.isArray(campaignsRes.data.data) ? campaignsRes.data.data : []);
    } catch (error) {
      console.error('Error fetching newsletter data:', error);
      toast.error('Failed to load data');
      setSubscribers([]);
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setEmailBody(template.preview);
    setShowComposer(true);
  };

  const handleSendEmail = async () => {
    if (!emailSubject.trim()) {
      toast.error('Please enter email subject');
      return;
    }
    
    if (!emailBody.trim() || emailBody === '<p><br></p>') {
      toast.error('Please enter email content');
      return;
    }
    
    if (recipientType === 'selected' && selectedSubscribers.length === 0) {
      toast.error('Please select at least one subscriber');
      return;
    }
    
    const recipientCount = getRecipientCount();
    if (!confirm(`Send email to ${recipientCount} subscribers?`)) {
      return;
    }
    
    try {
      setSending(true);
      
      const payload = {
        subject: emailSubject,
        body: emailBody,
        recipients: recipientType,
        selectedEmails: recipientType === 'selected' 
          ? subscribers.filter(s => selectedSubscribers.includes(s._id)).map(s => s.email)
          : []
      };
      
      const response = await newsletterAPI.sendBulkEmail(payload);
      
      toast.success(
        `🎉 Email sent to ${response.data.data.sent} subscribers!`,
        { duration: 5000 }
      );
      
      // Reset and refresh
      setShowComposer(false);
      setEmailSubject('');
      setEmailBody('');
      setRecipientType('active');
      setSelectedSubscribers([]);
      setSelectedTemplate(null);
      fetchData();
      setActiveTab('campaigns');
      
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error(error.response?.data?.message || 'Failed to send email');
    } finally {
      setSending(false);
    }
  };

  const getRecipientCount = () => {
    if (recipientType === 'all') return subscribers.length;
    if (recipientType === 'active') return subscribers.filter(s => s.status === 'active').length;
    if (recipientType === 'selected') return selectedSubscribers.length;
    return 0;
  };

  const getPreviewBody = () => {
    return emailBody
      .replace(/\{name\}/g, 'John Doe')
      .replace(/\{email\}/g, 'subscriber@example.com');
  };

  const exportToCSV = () => {
    const filteredList = filteredSubscribers();
    const headers = ['Email', 'Name', 'Status', 'Country', 'Subscribed Date'];
    const rows = filteredList.map((sub) => [
      sub.email,
      sub.name || '',
      sub.status,
      sub.country || '',
      format(new Date(sub.subscribedAt), 'yyyy-MM-dd HH:mm'),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success('📊 Subscribers exported successfully');
  };

  const filteredSubscribers = () => {
    return subscribers.filter((sub) => {
      const matchesSearch =
        sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCountry =
        selectedCountry === 'all' || sub.country === selectedCountry;

      return matchesSearch && matchesCountry;
    });
  };

  const countries = [...new Set(subscribers.map((s) => s.country).filter(Boolean))];
  
  const calculateGrowth = () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const recentSubs = subscribers.filter(s => new Date(s.subscribedAt) >= thirtyDaysAgo).length;
    const total = subscribers.length;
    if (total === 0) return 0;
    return Math.round((recentSubs / total) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading email system...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-600 rounded-xl shadow-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <Mail className="h-10 w-10" />
              Email Marketing Hub
            </h1>
            <p className="text-blue-100 text-lg">
              Engage your audience with powerful email campaigns
            </p>
          </div>
          <button
            onClick={() => {
              setShowComposer(true);
              setSelectedTemplate(null);
            }}
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Send className="h-5 w-5" />
            Compose Email
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex gap-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'subscribers', label: 'Subscribers', icon: Users },
            { id: 'campaigns', label: 'Campaigns', icon: Send },
            { id: 'templates', label: 'Templates', icon: Sparkles }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <Users className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <TrendingUp className="h-4 w-4" />
                  +{calculateGrowth()}%
                </div>
              </div>
              <p className="text-blue-100 text-sm font-medium mb-1">Total Subscribers</p>
              <p className="text-4xl font-bold">{subscribers.length}</p>
              <p className="text-blue-100 text-sm mt-2">
                +{stats?.recentSubscriptions || 0} this month
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <CheckCircle className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  {subscribers.length > 0
                    ? Math.round((subscribers.filter(s => s.status === 'active').length / subscribers.length) * 100)
                    : 0}%
                </div>
              </div>
              <p className="text-green-100 text-sm font-medium mb-1">Active Subscribers</p>
              <p className="text-4xl font-bold">{subscribers.filter(s => s.status === 'active').length}</p>
              <p className="text-green-100 text-sm mt-2">
                Engaged audience ready for campaigns
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <Send className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  Recent
                </div>
              </div>
              <p className="text-purple-100 text-sm font-medium mb-1">Campaigns Sent</p>
              <p className="text-4xl font-bold">{campaigns.length}</p>
              <p className="text-purple-100 text-sm mt-2">
                Reaching thousands of inboxes
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-xl p-6 text-white"
            >
              <div className="flex items-center justify-between mb-4">
                <Globe className="h-12 w-12 opacity-80" />
                <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-semibold">
                  Global
                </div>
              </div>
              <p className="text-orange-100 text-sm font-medium mb-1">Countries</p>
              <p className="text-4xl font-bold">{countries.length}</p>
              <p className="text-orange-100 text-sm mt-2">
                {countries[0] || 'N/A'} is top location
              </p>
            </motion.div>
          </div>

          {/* Recent Campaigns */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Clock className="h-6 w-6 text-blue-600" />
                Recent Campaigns
              </h2>
              <button
                onClick={() => setActiveTab('campaigns')}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2"
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {campaigns.length === 0 ? (
              <div className="text-center py-12">
                <Send className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium">No campaigns sent yet</p>
                <p className="text-gray-400 mt-2">Create your first email campaign to get started</p>
                <button
                  onClick={() => setShowComposer(true)}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.slice(0, 5).map((campaign) => (
                  <div
                    key={campaign._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        campaign.status === 'completed' ? 'bg-green-100' : 
                        campaign.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                      }`}>
                        {campaign.status === 'completed' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : campaign.status === 'failed' ? (
                          <XCircle className="h-6 w-6 text-red-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{campaign.subject}</h3>
                        <p className="text-sm text-gray-500">
                          Sent {format(new Date(campaign.sentAt), 'MMM dd, yyyy HH:mm')}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {campaign.sentCount} sent
                      </p>
                      {campaign.failedCount > 0 && (
                        <p className="text-sm text-red-600">
                          {campaign.failedCount} failed
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab('templates')}
              className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 rounded-xl shadow-lg text-left group"
            >
              <Sparkles className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Browse Templates</h3>
              <p className="text-purple-100">Choose from professional email designs</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => setActiveTab('subscribers')}
              className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-xl shadow-lg text-left group"
            >
              <Users className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Manage Audience</h3>
              <p className="text-blue-100">View and organize your subscribers</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={exportToCSV}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl shadow-lg text-left group"
            >
              <Download className="h-8 w-8 mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2">Export Data</h3>
              <p className="text-green-100">Download subscriber list as CSV</p>
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* Subscribers Tab */}
      {activeTab === 'subscribers' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Filters */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search subscribers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="unsubscribed">Unsubscribed</option>
                </select>

                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Countries</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>

                <button
                  onClick={exportToCSV}
                  className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 font-semibold"
                >
                  <Download className="h-4 w-4" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Subscribers Table */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Subscriber
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Country
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Subscribed
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSubscribers().length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                        <Users className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="font-medium">No subscribers found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredSubscribers().map((subscriber) => (
                      <tr key={subscriber._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {subscriber.email}
                            </p>
                            {subscriber.name && (
                              <p className="text-sm text-gray-500">{subscriber.name}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-bold rounded-full ${
                              subscriber.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {subscriber.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {subscriber.country || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {format(new Date(subscriber.subscribedAt), 'MMM dd, yyyy')}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold">{filteredSubscribers().length}</span> of{' '}
                <span className="font-semibold">{subscribers.length}</span> subscribers
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Campaigns Tab */}
      {activeTab === 'campaigns' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Send className="h-6 w-6 text-blue-600" />
              Campaign History
            </h2>

            {campaigns.length === 0 ? (
              <div className="text-center py-16">
                <Send className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">No campaigns yet</h3>
                <p className="text-gray-500 mb-6">Start engaging your audience with email campaigns</p>
                <button
                  onClick={() => {
                    setShowComposer(true);
                    setActiveTab('overview');
                  }}
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 inline-flex items-center gap-2"
                >
                  <Sparkles className="h-5 w-5" />
                  Create Your First Campaign
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div
                    key={campaign._id}
                    className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-4 rounded-xl ${
                          campaign.status === 'completed' ? 'bg-green-100' :
                          campaign.status === 'failed' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {campaign.status === 'completed' ? (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                          ) : campaign.status === 'failed' ? (
                            <XCircle className="h-8 w-8 text-red-600" />
                          ) : (
                            <Clock className="h-8 w-8 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{campaign.subject}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Sent on {format(new Date(campaign.sentAt), 'MMMM dd, yyyy \'at\' HH:mm')}
                          </p>
                        </div>
                      </div>
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                        campaign.status === 'completed' ? 'bg-green-100 text-green-800' :
                        campaign.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-600 font-medium mb-1">Recipients</p>
                        <p className="text-2xl font-bold text-blue-900">{campaign.recipientCount}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-600 font-medium mb-1">Delivered</p>
                        <p className="text-2xl font-bold text-green-900">{campaign.sentCount}</p>
                      </div>
                      <div className="bg-red-50 rounded-lg p-4">
                        <p className="text-sm text-red-600 font-medium mb-1">Failed</p>
                        <p className="text-2xl font-bold text-red-900">{campaign.failedCount}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Templates Tab */}
      {activeTab === 'templates' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-blue-600" />
              Email Templates
            </h2>
            <p className="text-gray-600 mb-8">Choose a template to get started quickly</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EMAIL_TEMPLATES.map((template) => {
                const IconComponent = template.icon;
                const colorClasses = {
                  gray: 'from-gray-500 to-gray-600',
                  blue: 'from-blue-500 to-blue-600',
                  red: 'from-red-500 to-red-600',
                  green: 'from-green-500 to-green-600',
                  purple: 'from-purple-500 to-purple-600'
                };
                
                return (
                  <motion.div
                    key={template.id}
                    whileHover={{ y: -8, scale: 1.02 }}
                    onClick={() => handleSelectTemplate(template)}
                    className="cursor-pointer group"
                  >
                    <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-blue-500 hover:shadow-2xl transition-all">
                      <div className={`bg-gradient-to-br ${colorClasses[template.color]} p-6 text-white`}>
                        <IconComponent className="h-12 w-12 mb-3" />
                        <h3 className="text-xl font-bold mb-2">{template.name}</h3>
                        <p className="text-sm opacity-90">{template.description}</p>
                      </div>
                      <div className="p-6 bg-gray-50 group-hover:bg-blue-50 transition-colors">
                        <button className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                          Use Template
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Email Composer Modal */}
      {showComposer && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 flex items-center justify-between rounded-t-2xl z-10">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Sparkles className="h-8 w-8" />
                  Compose Email Campaign
                </h2>
                {selectedTemplate && (
                  <p className="text-blue-100 mt-1">Using {selectedTemplate.name} template</p>
                )}
              </div>
              <button
                onClick={() => {
                  setShowComposer(false);
                  setSelectedTemplate(null);
                  setEmailSubject('');
                  setEmailBody('');
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
              >
                <XCircle className="h-8 w-8" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8 space-y-6">
              {/* Recipients */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-600" />
                  Target Audience
                </label>
                <div className="space-y-3">
                  {[
                    { value: 'active', label: `All Active Subscribers (${subscribers.filter(s => s.status === 'active').length})`, recommended: true },
                    { value: 'selected', label: `Selected Subscribers (${selectedSubscribers.length})` },
                    { value: 'all', label: `All Subscribers (${subscribers.length})` }
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-gray-200 hover:border-blue-500 cursor-pointer transition-all"
                    >
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="recipients"
                          value={option.value}
                          checked={recipientType === option.value}
                          onChange={(e) => setRecipientType(e.target.value)}
                          className="h-5 w-5 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </div>
                      {option.recommended && (
                        <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full">
                          Recommended
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Email Subject *
                </label>
                <input
                  type="text"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                  placeholder="Enter a compelling subject line..."
                  className="w-full px-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>

              {/* Email Body */}
              <div>
                <label className="block text-lg font-bold text-gray-900 mb-3">
                  Email Content *
                </label>
                <div className="border-2 border-gray-300 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all">
                  <ReactQuill
                    theme="snow"
                    value={emailBody}
                    onChange={setEmailBody}
                    placeholder="Craft your message here..."
                    style={{ height: '350px', marginBottom: '42px' }}
                    modules={{
                      toolbar: [
                        [{ header: [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ color: [] }, { background: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        [{ align: [] }],
                        ['link', 'image'],
                        ['clean'],
                      ],
                    }}
                  />
                </div>
                <div className="mt-3 flex items-center gap-4">
                  <p className="text-sm text-gray-600 flex items-center gap-2">
                    <Tag className="h-4 w-4 text-blue-600" />
                    Use <code className="px-2 py-1 bg-gray-100 rounded font-mono text-blue-600">&#123;name&#125;</code> for personalization
                  </p>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    <Eye className="h-4 w-4" />
                    {showPreview ? 'Hide' : 'Show'} Preview
                  </button>
                </div>
              </div>

              {/* Preview */}
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-2 border-blue-200 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-purple-50"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 pb-3 border-b-2 border-blue-200 flex items-center gap-2">
                    <Eye className="h-5 w-5 text-blue-600" />
                    {emailSubject || '(No Subject)'}
                  </h3>
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: getPreviewBody() }}
                  />
                  <div className="mt-6 pt-4 border-t-2 border-blue-200 text-xs text-gray-500 text-center">
                    <p>You are receiving this email because you subscribed to our newsletter.</p>
                    <a href="#" className="text-blue-600 hover:underline font-medium">Unsubscribe</a> from future emails.
                  </div>
                </motion.div>
              )}

              {/* Recipient Count */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-600 text-white p-3 rounded-lg">
                      <Users className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Ready to Send</p>
                      <p className="text-2xl font-bold text-blue-900">{getRecipientCount()} subscribers</p>
                    </div>
                  </div>
                  <TrendingUp className="h-12 w-12 text-blue-300" />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-100 border-t-2 border-gray-200 px-8 py-6 flex items-center justify-between rounded-b-2xl">
              <button
                onClick={() => {
                  setShowComposer(false);
                  setSelectedTemplate(null);
                  setEmailSubject('');
                  setEmailBody('');
                }}
                className="px-6 py-3 text-gray-700 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
                disabled={sending}
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                disabled={sending || !emailSubject.trim() || !emailBody.trim()}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed flex items-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                {sending ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending Campaign...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send to {getRecipientCount()} Subscribers
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
