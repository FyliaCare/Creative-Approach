import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);

  // Profile Settings
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '',
  });

  // Password Change
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Email Notifications
  const [notifications, setNotifications] = useState({
    newQuotes: true,
    newMessages: true,
    newSubscribers: true,
    newComments: true,
    weeklyReport: false,
  });

  // All System Settings from backend
  const [systemSettings, setSystemSettings] = useState({
    company: {
      name: 'Creative Approach',
      email: 'info@creativeapproach.gh',
      phone: '+233 123 456 789',
      address: 'Accra, Ghana',
      description: '',
      logo: '',
      favicon: ''
    },
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
      tiktok: ''
    },
    email: {
      smtpHost: '',
      smtpPort: 587,
      smtpSecure: false,
      smtpUser: '',
      smtpPassword: '',
      fromEmail: '',
      fromName: ''
    },
    api: {
      rateLimit: {
        windowMs: 900000,
        maxRequests: 100
      },
      fileUpload: {
        maxFileSize: 5242880,
        allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
      }
    },
    security: {
      twoFactorEnabled: false,
      passwordMinLength: 8,
      passwordRequireUppercase: true,
      passwordRequireNumbers: true,
      passwordRequireSpecialChars: true,
      maxLoginAttempts: 5,
      lockoutDuration: 900000
    },
    maintenance: {
      enabled: false,
      message: '',
      allowedIPs: []
    },
    analytics: {
      googleAnalyticsId: '',
      facebookPixelId: '',
      trackingEnabled: true
    },
    backup: {
      autoBackup: false,
      backupFrequency: 'daily',
      backupTime: '02:00',
      retentionDays: 30
    },
    seo: {
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      ogImage: ''
    }
  });

  useEffect(() => {
    fetchProfile();
    fetchSystemSettings();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSystemSettings = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/settings`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data) {
        // Merge with existing state to preserve structure
        setSystemSettings(prev => ({
          ...prev,
          ...response.data,
          email: {
            ...prev.email,
            ...(response.data.email || {}),
            smtpPassword: '********' // Mask password
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      // Don't show error if settings don't exist yet
      if (error.response?.status !== 404) {
        toast.error('Failed to load system settings');
      }
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/api/auth/profile`, profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/api/auth/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Password updated successfully');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error updating password:', error);
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  const updateNotifications = async (key, value) => {
    const updated = { ...notifications, [key]: value };
    setNotifications(updated);

    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_URL}/api/auth/notifications`, updated, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Notification preferences updated');
    } catch (error) {
      console.error('Error updating notifications:', error);
      toast.error('Failed to update notifications');
    }
  };

  const updateSystemSettings = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${API_URL}/api/settings`, systemSettings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('System settings updated successfully');
      // Refresh settings
      if (response.data.settings) {
        setSystemSettings(prev => ({
          ...prev,
          ...response.data.settings,
          email: {
            ...prev.email,
            ...(response.data.settings.email || {}),
            smtpPassword: '********'
          }
        }));
      }
    } catch (error) {
      console.error('Error updating system settings:', error);
      toast.error(error.response?.data?.message || 'Failed to update system settings');
    } finally {
      setLoading(false);
    }
  };

  const testEmailConfiguration = async () => {
    const testEmail = prompt('Enter email address to send test email:');
    if (!testEmail) return;

    setTestingEmail(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/settings/test-email`, 
        { to: testEmail },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success('Test email sent successfully! Check your inbox.');
    } catch (error) {
      console.error('Test email error:', error);
      toast.error(error.response?.data?.message || 'Failed to send test email');
    } finally {
      setTestingEmail(false);
    }
  };

  const clearCache = async () => {
    if (!confirm('Are you sure you want to clear the cache?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/api/settings/clear-cache`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Cache cleared successfully');
    } catch (error) {
      console.error('Clear cache error:', error);
      toast.error('Failed to clear cache');
    }
  };

  const createBackup = async () => {
    if (!confirm('Create a database backup now?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/settings/backup`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Download backup as JSON
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `backup-${new Date().toISOString()}.json`;
      link.click();
      URL.revokeObjectURL(url);
      
      toast.success('Backup created and downloaded');
    } catch (error) {
      console.error('Backup error:', error);
      toast.error('Failed to create backup');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'company', label: 'Company' },
    { id: 'email', label: 'Email Config' },
    { id: 'security', label: 'Security' },
    { id: 'api', label: 'API Settings' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'seo', label: 'SEO' },
    { id: 'backup', label: 'Backup' },
    { id: 'system', label: 'System' },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab.id
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
              <form onSubmit={updateProfile} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Update Profile'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Change Password</h2>
              <form onSubmit={updatePassword} className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Updating...' : 'Change Password'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Email Notifications</h2>
              <div className="space-y-4">
                {Object.entries(notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b">
                    <div>
                      <p className="text-sm font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Receive email notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => updateNotifications(key, e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Company Tab */}
          {activeTab === 'company' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Company Information</h2>
              <form onSubmit={updateSystemSettings} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                    <input
                      type="text"
                      value={systemSettings.company.name}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, name: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={systemSettings.company.email}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, email: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={systemSettings.company.phone}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, phone: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                      type="text"
                      value={systemSettings.company.address}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        company: { ...prev.company, address: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={systemSettings.company.description}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      company: { ...prev.company, description: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mt-6">Social Media Links</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(systemSettings.socialMedia).map(([platform, url]) => (
                    <div key={platform}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {platform}
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          socialMedia: { ...prev.socialMedia, [platform]: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={`https://${platform}.com/...`}
                      />
                    </div>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Company Info'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Email Configuration Tab */}
          {activeTab === 'email' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Email Configuration</h2>
              <form onSubmit={updateSystemSettings} className="space-y-4">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-sm text-yellow-800">
                    Configure your SMTP settings to enable email notifications
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={systemSettings.email.smtpHost}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpHost: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="smtp.gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Port</label>
                    <input
                      type="number"
                      value={systemSettings.email.smtpPort}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpPort: parseInt(e.target.value) }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Username</label>
                    <input
                      type="text"
                      value={systemSettings.email.smtpUser}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpUser: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Password</label>
                    <input
                      type="password"
                      value={systemSettings.email.smtpPassword}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, smtpPassword: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                    <input
                      type="email"
                      value={systemSettings.email.fromEmail}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, fromEmail: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">From Name</label>
                    <input
                      type="text"
                      value={systemSettings.email.fromName}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        email: { ...prev.email, fromName: e.target.value }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="smtpSecure"
                    checked={systemSettings.email.smtpSecure}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      email: { ...prev.email, smtpSecure: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="smtpSecure" className="text-sm font-medium text-gray-700">
                    Use secure connection (SSL/TLS)
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Saving...' : 'Save Email Config'}
                  </button>

                  <button
                    type="button"
                    onClick={testEmailConfiguration}
                    disabled={testingEmail}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                  >
                    {testingEmail ? 'Sending...' : 'Test Email'}
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
              <form onSubmit={updateSystemSettings} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Password Requirements</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Minimum Password Length
                      </label>
                      <input
                        type="number"
                        min="6"
                        max="32"
                        value={systemSettings.security.passwordMinLength}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                        }))}
                        className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="requireUppercase"
                          checked={systemSettings.security.passwordRequireUppercase}
                          onChange={(e) => setSystemSettings(prev => ({
                            ...prev,
                            security: { ...prev.security, passwordRequireUppercase: e.target.checked }
                          }))}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="requireUppercase" className="text-sm font-medium text-gray-700">
                          Require uppercase letters
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="requireNumbers"
                          checked={systemSettings.security.passwordRequireNumbers}
                          onChange={(e) => setSystemSettings(prev => ({
                            ...prev,
                            security: { ...prev.security, passwordRequireNumbers: e.target.checked }
                          }))}
                          className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="requireNumbers" className="text-sm font-medium text-gray-700">
                          Require numbers
                        </label>
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="requireSpecialChars"
                          checked={systemSettings.security.passwordRequireSpecialChars}
                          onChange={(e) => setSystemSettings(prev => ({
                            ...prev,
                            security: { ...prev.security, passwordRequireSpecialChars: e.target.checked }
                          }))}
                          className="w-4 h-4 text-blue-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                        <label htmlFor="requireSpecialChars" className="text-sm font-medium text-gray-700">
                          Require special characters
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Login Protection</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Login Attempts
                      </label>
                      <input
                        type="number"
                        min="3"
                        max="10"
                        value={systemSettings.security.maxLoginAttempts}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lockout Duration (minutes)
                      </label>
                      <input
                        type="number"
                        min="5"
                        max="60"
                        value={systemSettings.security.lockoutDuration / 60000}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          security: { ...prev.security, lockoutDuration: parseInt(e.target.value) * 60000 }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="twoFactor"
                    checked={systemSettings.security.twoFactorEnabled}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="twoFactor" className="text-sm font-medium text-gray-700">
                    Enable Two-Factor Authentication
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Security Settings'}
                </button>
              </form>
            </motion.div>
          )}

          {/* API Settings Tab */}
          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">API Settings</h2>
              <form onSubmit={updateSystemSettings} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limiting</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Window (minutes)
                      </label>
                      <input
                        type="number"
                        value={systemSettings.api.rateLimit.windowMs / 60000}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          api: {
                            ...prev.api,
                            rateLimit: { ...prev.api.rateLimit, windowMs: parseInt(e.target.value) * 60000 }
                          }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Max Requests
                      </label>
                      <input
                        type="number"
                        value={systemSettings.api.rateLimit.maxRequests}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          api: {
                            ...prev.api,
                            rateLimit: { ...prev.api.rateLimit, maxRequests: parseInt(e.target.value) }
                          }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">File Upload</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      value={systemSettings.api.fileUpload.maxFileSize / 1048576}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        api: {
                          ...prev.api,
                          fileUpload: { ...prev.api.fileUpload, maxFileSize: parseFloat(e.target.value) * 1048576 }
                        }
                      }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save API Settings'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Analytics Integration</h2>
              <form onSubmit={updateSystemSettings} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={systemSettings.analytics.googleAnalyticsId}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, googleAnalyticsId: e.target.value }
                    }))}
                    placeholder="G-XXXXXXXXXX"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Facebook Pixel ID
                  </label>
                  <input
                    type="text"
                    value={systemSettings.analytics.facebookPixelId}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, facebookPixelId: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="trackingEnabled"
                    checked={systemSettings.analytics.trackingEnabled}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      analytics: { ...prev.analytics, trackingEnabled: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="trackingEnabled" className="text-sm font-medium text-gray-700">
                    Enable Analytics Tracking
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Analytics Settings'}
                </button>
              </form>
            </motion.div>
          )}

          {/* SEO Tab */}
          {activeTab === 'seo' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">SEO Settings</h2>
              <form onSubmit={updateSystemSettings} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={systemSettings.seo.metaTitle}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaTitle: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <textarea
                    rows={3}
                    value={systemSettings.seo.metaDescription}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaDescription: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Meta Keywords (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={systemSettings.seo.metaKeywords}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaKeywords: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
                  <input
                    type="url"
                    value={systemSettings.seo.ogImage}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      seo: { ...prev.seo, ogImage: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save SEO Settings'}
                </button>
              </form>
            </motion.div>
          )}

          {/* Backup Tab */}
          {activeTab === 'backup' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Backup Settings</h2>
              <form onSubmit={updateSystemSettings} className="space-y-6">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="autoBackup"
                    checked={systemSettings.backup.autoBackup}
                    onChange={(e) => setSystemSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, autoBackup: e.target.checked }
                    }))}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="autoBackup" className="text-sm font-medium text-gray-700">
                    Enable Automatic Backups
                  </label>
                </div>

                {systemSettings.backup.autoBackup && (
                  <div className="grid grid-cols-2 gap-4 ml-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Backup Frequency
                      </label>
                      <select
                        value={systemSettings.backup.backupFrequency}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          backup: { ...prev.backup, backupFrequency: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Backup Time
                      </label>
                      <input
                        type="time"
                        value={systemSettings.backup.backupTime}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          backup: { ...prev.backup, backupTime: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Retention (days)
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={systemSettings.backup.retentionDays}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          backup: { ...prev.backup, retentionDays: parseInt(e.target.value) }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Manual Backup</h3>
                  <button
                    type="button"
                    onClick={createBackup}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Create Backup Now
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save Backup Settings'}
                </button>
              </form>
            </motion.div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Settings</h2>
              <form onSubmit={updateSystemSettings} className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance Mode</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="maintenanceMode"
                      checked={systemSettings.maintenance.enabled}
                      onChange={(e) => setSystemSettings(prev => ({
                        ...prev,
                        maintenance: { ...prev.maintenance, enabled: e.target.checked }
                      }))}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <label htmlFor="maintenanceMode" className="text-sm font-medium text-gray-700">
                      Enable Maintenance Mode
                    </label>
                  </div>

                  {systemSettings.maintenance.enabled && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Maintenance Message
                      </label>
                      <textarea
                        rows={3}
                        value={systemSettings.maintenance.message}
                        onChange={(e) => setSystemSettings(prev => ({
                          ...prev,
                          maintenance: { ...prev.maintenance, message: e.target.value }
                        }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="We're currently performing maintenance. We'll be back shortly!"
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                >
                  {loading ? 'Saving...' : 'Save System Settings'}
                </button>
              </form>

              <div className="mt-8 space-y-4 border-t pt-8">
                <h3 className="text-lg font-semibold text-gray-900">System Actions</h3>
                <div className="flex gap-4">
                  <button
                    onClick={clearCache}
                    className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                  >
                    Clear Cache
                  </button>
                  
                  <button
                    onClick={createBackup}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Create Backup
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
