import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = import.meta.env.VITE_API_URL;

export const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

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

  // System Settings
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Creative Approach',
    contactEmail: 'info@creativeapproach.gh',
    phone: '+233 123 456 789',
    address: 'Accra, Ghana',
    socialMedia: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
      youtube: '',
    },
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
        setSystemSettings(response.data);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
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
      await axios.patch(`${API_URL}/api/settings`, systemSettings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('System settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setLoading(false);
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
      console.error('Error clearing cache:', error);
      toast.error('Failed to clear cache');
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile' },
    { id: 'password', label: 'Password' },
    { id: 'notifications', label: 'Notifications' },
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

          {/* System Tab */}
          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Settings</h2>
              <form onSubmit={updateSystemSettings} className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={systemSettings.siteName}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, siteName: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        value={systemSettings.contactEmail}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={systemSettings.phone}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        value={systemSettings.address}
                        onChange={(e) => setSystemSettings(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Social Media Links</h3>
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
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {loading ? 'Saving...' : 'Save Settings'}
                  </button>

                  <button
                    type="button"
                    onClick={clearCache}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Clear Cache
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
