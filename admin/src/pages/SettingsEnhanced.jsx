import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import toast from 'react-hot-toast';
import { notificationAPI } from '../services/api';
import {
  UserCircleIcon,
  LockClosedIcon,
  BellIcon,
  BuildingOfficeIcon,
  EnvelopeIcon,
  ShieldCheckIcon,
  CogIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  DocumentDuplicateIcon,
  ClockIcon,
  SwatchIcon,
  ServerIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  SunIcon,
  MoonIcon
} from '@heroicons/react/24/outline';

const API_URL = import.meta.env.VITE_API_URL;

export const SettingsEnhanced = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);
  const [testingEmail, setTestingEmail] = useState(false);
  const [testingNotification, setTestingNotification] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [unsavedChanges, setUnsavedChanges] = useState(false);

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

  const [passwordStrength, setPasswordStrength] = useState(0);

  // Email Notifications
  const [notifications, setNotifications] = useState({
    newQuotes: true,
    newMessages: true,
    newSubscribers: true,
    newComments: true,
    weeklyReport: false,
    portfolioViews: true,
    systemAlerts: true,
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

  // Activity Log State
  const [activityLog, setActivityLog] = useState([]);
  const [systemHealth, setSystemHealth] = useState({
    status: 'healthy',
    uptime: '99.9%',
    responseTime: '120ms',
    database: 'connected',
    memory: '45%',
    cpu: '32%'
  });

  useEffect(() => {
    fetchProfile();
    fetchSystemSettings();
    fetchActivityLog();
  }, []);

  useEffect(() => {
    // Calculate password strength
    const calculateStrength = (password) => {
      let strength = 0;
      if (password.length >= 8) strength += 25;
      if (password.length >= 12) strength += 25;
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
      if (/[0-9]/.test(password)) strength += 12.5;
      if (/[^a-zA-Z0-9]/.test(password)) strength += 12.5;
      return strength;
    };
    setPasswordStrength(calculateStrength(passwordData.newPassword));
  }, [passwordData.newPassword]);

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
      if (response.data.success && response.data.data) {
        setSystemSettings(prev => ({
          ...prev,
          ...response.data.data,
          email: {
            ...prev.email,
            ...(response.data.data.email || {}),
            smtpPassword: '********'
          }
        }));
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const fetchActivityLog = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/settings/activity-log`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setActivityLog(response.data.logs || []);
      }
    } catch (error) {
      console.error('Error fetching activity log:', error);
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
      setUnsavedChanges(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const testNotification = async () => {
    setTestingNotification(true);
    try {
      await notificationAPI.createTest();
      toast.success('Test notification sent! Check your notification bell.');
    } catch (error) {
      console.error('Error sending test notification:', error);
      toast.error('Failed to send test notification');
    } finally {
      setTestingNotification(false);
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast.error('Password must be at least 8 characters');
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
      setUnsavedChanges(false);
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
    { id: 'profile', label: 'Profile', icon: UserCircleIcon, color: 'from-blue-500 to-cyan-500' },
    { id: 'password', label: 'Security', icon: LockClosedIcon, color: 'from-purple-500 to-pink-500' },
    { id: 'notifications', label: 'Notifications', icon: BellIcon, color: 'from-yellow-500 to-orange-500' },
    { id: 'company', label: 'Company', icon: BuildingOfficeIcon, color: 'from-green-500 to-emerald-500' },
    { id: 'email', label: 'Email', icon: EnvelopeIcon, color: 'from-red-500 to-rose-500' },
    { id: 'security', label: 'Advanced Security', icon: ShieldCheckIcon, color: 'from-indigo-500 to-purple-500' },
    { id: 'api', label: 'API', icon: CogIcon, color: 'from-gray-500 to-slate-500' },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon, color: 'from-teal-500 to-cyan-500' },
    { id: 'seo', label: 'SEO', icon: MagnifyingGlassIcon, color: 'from-lime-500 to-green-500' },
    { id: 'backup', label: 'Backup', icon: DocumentDuplicateIcon, color: 'from-amber-500 to-orange-500' },
    { id: 'appearance', label: 'Appearance', icon: SwatchIcon, color: 'from-pink-500 to-rose-500' },
    { id: 'activity', label: 'Activity Log', icon: ClockIcon, color: 'from-violet-500 to-purple-500' },
    { id: 'system', label: 'System Health', icon: ServerIcon, color: 'from-emerald-500 to-teal-500' },
  ];

  const filteredTabs = tabs.filter(tab =>
    tab.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50'}`}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-3`}>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Settings
              </span>
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Manage your account and system preferences
            </p>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-3 rounded-xl ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-700'} shadow-lg hover:scale-105 transition-transform`}
          >
            {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
          </button>
        </div>

        {/* Unsaved Changes Warning */}
        <AnimatePresence>
          {unsavedChanges && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg"
            >
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                <p className="ml-3 text-sm text-yellow-700">
                  You have unsaved changes. Don't forget to save before leaving.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="col-span-3">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-4 sticky top-6`}>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <MagnifyingGlassIcon className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                  <input
                    type="text"
                    placeholder="Search settings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                </div>
              </div>

              {/* Tab Navigation */}
              <nav className="space-y-1 max-h-[calc(100vh-200px)] overflow-y-auto">
                {filteredTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                        isActive
                          ? `bg-gradient-to-r ${tab.color} text-white shadow-lg scale-105`
                          : darkMode
                          ? 'text-gray-300 hover:bg-gray-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                      whileHover={{ x: isActive ? 0 : 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{tab.label}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl p-8`}
              >
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                        <UserCircleIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Information</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Update your personal details</p>
                      </div>
                    </div>

                    <form onSubmit={updateProfile} className="space-y-6">
                      {/* Avatar Section */}
                      <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                            {profileData.avatar ? (
                              <img src={profileData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover" />
                            ) : (
                              profileData.name?.charAt(0)?.toUpperCase() || 'U'
                            )}
                          </div>
                          <button
                            type="button"
                            className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                        <div>
                          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Profile Photo</h3>
                          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                            Click the edit icon to upload a new photo
                          </p>
                          <button type="button" className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium">
                            Change Avatar
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => {
                              setProfileData(prev => ({ ...prev, name: e.target.value }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => {
                              setProfileData(prev => ({ ...prev, email: e.target.value }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="your.email@example.com"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={profileData.phone}
                            onChange={(e) => {
                              setProfileData(prev => ({ ...prev, phone: e.target.value }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                            placeholder="+233 123 456 789"
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Bio
                        </label>
                        <textarea
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => {
                            setProfileData(prev => ({ ...prev, bio: e.target.value }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                          placeholder="Tell us about yourself..."
                        />
                        <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {profileData.bio?.length || 0} / 500 characters
                        </p>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            fetchProfile();
                            setUnsavedChanges(false);
                          }}
                          className={`px-8 py-3 ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'} rounded-lg hover:bg-gray-300 font-semibold transition-all`}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Password Tab - Enhanced with strength meter */}
                {activeTab === 'password' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
                        <LockClosedIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Change Password</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Ensure your account stays secure</p>
                      </div>
                    </div>

                    <form onSubmit={updatePassword} className="space-y-6 max-w-2xl">
                      <div className="p-6 bg-blue-50 dark:bg-gray-700 border-l-4 border-blue-500 rounded-lg">
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Password Requirements:</h4>
                        <ul className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon className={`w-4 h-4 ${passwordData.newPassword.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} />
                            At least 8 characters long
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon className={`w-4 h-4 ${/[A-Z]/.test(passwordData.newPassword) && /[a-z]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                            Contains uppercase and lowercase letters
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon className={`w-4 h-4 ${/[0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                            Contains at least one number
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircleIcon className={`w-4 h-4 ${/[^a-zA-Z0-9]/.test(passwordData.newPassword) ? 'text-green-500' : 'text-gray-400'}`} />
                            Contains at least one special character
                          </li>
                        </ul>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Current Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.currentPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                          placeholder="Enter current password"
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                          placeholder="Enter new password"
                        />
                        {passwordData.newPassword && (
                          <div className="mt-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Password Strength
                              </span>
                              <span className={`text-xs font-bold ${
                                passwordStrength < 25 ? 'text-red-500' :
                                passwordStrength < 50 ? 'text-orange-500' :
                                passwordStrength < 75 ? 'text-yellow-500' :
                                'text-green-500'
                              }`}>
                                {getPasswordStrengthText()}
                              </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${passwordStrength}%` }}
                                className={`h-full ${getPasswordStrengthColor()} transition-all`}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          required
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                          placeholder="Confirm new password"
                        />
                        {passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <XCircleIcon className="w-4 h-4" />
                            Passwords do not match
                          </p>
                        )}
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Updating...' : 'Change Password'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Notifications Tab - Enhanced with more options */}
                {activeTab === 'notifications' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl">
                        <BellIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notification Preferences</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage how you receive notifications</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Test Notification Card */}
                      <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border-2 border-blue-200 dark:border-gray-500">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} flex items-center gap-2 mb-2`}>
                              <span className="text-2xl">🧪</span>
                              Test Notification System
                            </h3>
                            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              Send a test notification to verify everything is working correctly
                            </p>
                          </div>
                          <button
                            onClick={testNotification}
                            disabled={testingNotification}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
                          >
                            {testingNotification ? (
                              <>
                                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                                Sending...
                              </>
                            ) : (
                              <>
                                <span>🚀</span>
                                Send Test
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Notification Settings */}
                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                          Email Notifications
                        </h3>
                        <div className="space-y-3">
                          {Object.entries(notifications).map(([key, value]) => (
                            <div key={key} className={`flex items-center justify-between p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow-md transition-all`}>
                              <div>
                                <p className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} capitalize`}>
                                  {key.replace(/([A-Z])/g, ' $1').trim()}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  Receive notifications for {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                                </p>
                              </div>
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={value}
                                  onChange={(e) => updateNotifications(key, e.target.checked)}
                                  className="sr-only peer"
                                />
                                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600"></div>
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Company Tab - More compact and visual */}
                {activeTab === 'company' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
                        <BuildingOfficeIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Company Information</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Update your company details</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Company Name
                          </label>
                          <input
                            type="text"
                            value={systemSettings.company.name}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                company: { ...prev.company, name: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Email
                          </label>
                          <input
                            type="email"
                            value={systemSettings.company.email}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                company: { ...prev.company, email: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={systemSettings.company.phone}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                company: { ...prev.company, phone: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Address
                          </label>
                          <input
                            type="text"
                            value={systemSettings.company.address}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                company: { ...prev.company, address: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                          />
                        </div>
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Description
                        </label>
                        <textarea
                          rows={3}
                          value={systemSettings.company.description}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              company: { ...prev.company, description: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 mt-8`}>
                          Social Media Links
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(systemSettings.socialMedia).map(([platform, url]) => (
                            <div key={platform}>
                              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 capitalize`}>
                                {platform}
                              </label>
                              <input
                                type="url"
                                value={url}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    socialMedia: { ...prev.socialMedia, [platform]: e.target.value }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all`}
                                placeholder={`https://${platform}.com/...`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Company Info'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Email Config Tab */}
                {activeTab === 'email' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl">
                        <EnvelopeIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Email Configuration</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configure SMTP settings</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-6">
                      <div className="bg-yellow-50 dark:bg-gray-700 border-l-4 border-yellow-400 p-4 rounded-lg mb-6">
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-yellow-800'}`}>
                          Configure your SMTP settings to enable email notifications
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>SMTP Host</label>
                          <input
                            type="text"
                            value={systemSettings.email.smtpHost}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, smtpHost: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                            placeholder="smtp.gmail.com"
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>SMTP Port</label>
                          <input
                            type="number"
                            value={systemSettings.email.smtpPort}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, smtpPort: parseInt(e.target.value) }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>SMTP Username</label>
                          <input
                            type="text"
                            value={systemSettings.email.smtpUser}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, smtpUser: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>SMTP Password</label>
                          <input
                            type="password"
                            value={systemSettings.email.smtpPassword}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, smtpPassword: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>From Email</label>
                          <input
                            type="email"
                            value={systemSettings.email.fromEmail}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, fromEmail: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                          />
                        </div>

                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>From Name</label>
                          <input
                            type="text"
                            value={systemSettings.email.fromName}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                email: { ...prev.email, fromName: e.target.value }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all`}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <input
                          type="checkbox"
                          id="smtpSecure"
                          checked={systemSettings.email.smtpSecure}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              email: { ...prev.email, smtpSecure: e.target.checked }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className="w-5 h-5 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                        />
                        <label htmlFor="smtpSecure" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Use secure connection (SSL/TLS)
                        </label>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:from-red-700 hover:to-rose-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Email Config'}
                        </button>

                        <button
                          type="button"
                          onClick={testEmailConfiguration}
                          disabled={testingEmail}
                          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {testingEmail ? 'Sending...' : 'Test Email'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Advanced Security Tab */}
                {activeTab === 'security' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                        <ShieldCheckIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Advanced Security</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configure security policies</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-8">
                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Password Requirements</h3>
                        <div className="space-y-4">
                          <div>
                            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                              Minimum Password Length
                            </label>
                            <input
                              type="number"
                              min="6"
                              max="32"
                              value={systemSettings.security.passwordMinLength}
                              onChange={(e) => {
                                setSystemSettings(prev => ({
                                  ...prev,
                                  security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className={`w-32 px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                            />
                          </div>

                          <div className="space-y-3">
                            <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                              <input
                                type="checkbox"
                                id="requireUppercase"
                                checked={systemSettings.security.passwordRequireUppercase}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    security: { ...prev.security, passwordRequireUppercase: e.target.checked }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                              />
                              <label htmlFor="requireUppercase" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Require uppercase letters
                              </label>
                            </div>

                            <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                              <input
                                type="checkbox"
                                id="requireNumbers"
                                checked={systemSettings.security.passwordRequireNumbers}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    security: { ...prev.security, passwordRequireNumbers: e.target.checked }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                              />
                              <label htmlFor="requireNumbers" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Require numbers
                              </label>
                            </div>

                            <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                              <input
                                type="checkbox"
                                id="requireSpecialChars"
                                checked={systemSettings.security.passwordRequireSpecialChars}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    security: { ...prev.security, passwordRequireSpecialChars: e.target.checked }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                              />
                              <label htmlFor="requireSpecialChars" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Require special characters
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Login Protection</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                              Max Login Attempts
                            </label>
                            <input
                              type="number"
                              min="3"
                              max="10"
                              value={systemSettings.security.maxLoginAttempts}
                              onChange={(e) => {
                                setSystemSettings(prev => ({
                                  ...prev,
                                  security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                              Lockout Duration (minutes)
                            </label>
                            <input
                              type="number"
                              min="5"
                              max="60"
                              value={systemSettings.security.lockoutDuration / 60000}
                              onChange={(e) => {
                                setSystemSettings(prev => ({
                                  ...prev,
                                  security: { ...prev.security, lockoutDuration: parseInt(e.target.value) * 60000 }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all`}
                            />
                          </div>
                        </div>
                      </div>

                      <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          id="twoFactor"
                          checked={systemSettings.security.twoFactorEnabled}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              security: { ...prev.security, twoFactorEnabled: e.target.checked }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className="w-5 h-5 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                        />
                        <label htmlFor="twoFactor" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Enable Two-Factor Authentication (Coming Soon)
                        </label>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Security Settings'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* API Tab */}
                {activeTab === 'api' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-gray-500 to-slate-500 rounded-xl">
                        <CogIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>API Settings</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configure API limits and permissions</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-8">
                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Rate Limiting</h3>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                              Window (minutes)
                            </label>
                            <input
                              type="number"
                              value={systemSettings.api.rateLimit.windowMs / 60000}
                              onChange={(e) => {
                                setSystemSettings(prev => ({
                                  ...prev,
                                  api: {
                                    ...prev.api,
                                    rateLimit: { ...prev.api.rateLimit, windowMs: parseInt(e.target.value) * 60000 }
                                  }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all`}
                            />
                          </div>

                          <div>
                            <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                              Max Requests
                            </label>
                            <input
                              type="number"
                              value={systemSettings.api.rateLimit.maxRequests}
                              onChange={(e) => {
                                setSystemSettings(prev => ({
                                  ...prev,
                                  api: {
                                    ...prev.api,
                                    rateLimit: { ...prev.api.rateLimit, maxRequests: parseInt(e.target.value) }
                                  }
                                }));
                                setUnsavedChanges(true);
                              }}
                              className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all`}
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>File Upload</h3>
                        <div>
                          <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                            Max File Size (MB)
                          </label>
                          <input
                            type="number"
                            value={systemSettings.api.fileUpload.maxFileSize / 1048576}
                            onChange={(e) => {
                              setSystemSettings(prev => ({
                                ...prev,
                                api: {
                                  ...prev.api,
                                  fileUpload: { ...prev.api.fileUpload, maxFileSize: parseFloat(e.target.value) * 1048576 }
                                }
                              }));
                              setUnsavedChanges(true);
                            }}
                            className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all`}
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-gray-600 to-slate-600 text-white rounded-lg hover:from-gray-700 hover:to-slate-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save API Settings'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Analytics Tab */}
                {activeTab === 'analytics' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl">
                        <ChartBarIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Analytics Integration</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Connect third-party analytics</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-6">
                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Google Analytics ID
                        </label>
                        <input
                          type="text"
                          value={systemSettings.analytics.googleAnalyticsId}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              analytics: { ...prev.analytics, googleAnalyticsId: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          placeholder="G-XXXXXXXXXX"
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Facebook Pixel ID
                        </label>
                        <input
                          type="text"
                          value={systemSettings.analytics.facebookPixelId}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              analytics: { ...prev.analytics, facebookPixelId: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          id="trackingEnabled"
                          checked={systemSettings.analytics.trackingEnabled}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              analytics: { ...prev.analytics, trackingEnabled: e.target.checked }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className="w-5 h-5 text-teal-600 rounded focus:ring-2 focus:ring-teal-500"
                        />
                        <label htmlFor="trackingEnabled" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Enable Analytics Tracking
                        </label>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:from-teal-700 hover:to-cyan-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Analytics Settings'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-lime-500 to-green-500 rounded-xl">
                        <MagnifyingGlassIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>SEO Settings</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Optimize for search engines</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-6">
                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Meta Title</label>
                        <input
                          type="text"
                          value={systemSettings.seo.metaTitle}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              seo: { ...prev.seo, metaTitle: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>Meta Description</label>
                        <textarea
                          rows={3}
                          value={systemSettings.seo.metaDescription}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              seo: { ...prev.seo, metaDescription: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                          Meta Keywords (comma-separated)
                        </label>
                        <input
                          type="text"
                          value={systemSettings.seo.metaKeywords}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              seo: { ...prev.seo, metaKeywords: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div>
                        <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>OG Image URL</label>
                        <input
                          type="url"
                          value={systemSettings.seo.ogImage}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              seo: { ...prev.seo, ogImage: e.target.value }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all`}
                        />
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-lg hover:from-lime-700 hover:to-green-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save SEO Settings'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Backup Tab */}
                {activeTab === 'backup' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl">
                        <DocumentDuplicateIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Backup Settings</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Configure automatic backups</p>
                      </div>
                    </div>

                    <form onSubmit={updateSystemSettings} className="space-y-8">
                      <div className={`flex items-center gap-3 p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                        <input
                          type="checkbox"
                          id="autoBackup"
                          checked={systemSettings.backup.autoBackup}
                          onChange={(e) => {
                            setSystemSettings(prev => ({
                              ...prev,
                              backup: { ...prev.backup, autoBackup: e.target.checked }
                            }));
                            setUnsavedChanges(true);
                          }}
                          className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
                        />
                        <label htmlFor="autoBackup" className={`text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Enable Automatic Backups
                        </label>
                      </div>

                      <AnimatePresence>
                        {systemSettings.backup.autoBackup && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="grid grid-cols-3 gap-6"
                          >
                            <div>
                              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Backup Frequency
                              </label>
                              <select
                                value={systemSettings.backup.backupFrequency}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    backup: { ...prev.backup, backupFrequency: e.target.value }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                              >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="monthly">Monthly</option>
                              </select>
                            </div>

                            <div>
                              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Backup Time
                              </label>
                              <input
                                type="time"
                                value={systemSettings.backup.backupTime}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    backup: { ...prev.backup, backupTime: e.target.value }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                              />
                            </div>

                            <div>
                              <label className={`block text-sm font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                                Retention (days)
                              </label>
                              <input
                                type="number"
                                min="1"
                                value={systemSettings.backup.retentionDays}
                                onChange={(e) => {
                                  setSystemSettings(prev => ({
                                    ...prev,
                                    backup: { ...prev.backup, retentionDays: parseInt(e.target.value) }
                                  }));
                                  setUnsavedChanges(true);
                                }}
                                className={`w-full px-4 py-3 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'} focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all`}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="border-t pt-6">
                        <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Manual Backup</h3>
                        <button
                          type="button"
                          onClick={createBackup}
                          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          Create Backup Now
                        </button>
                      </div>

                      <div className="flex gap-4 pt-4 border-t">
                        <button
                          type="submit"
                          disabled={loading}
                          className="px-8 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-lg hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          {loading ? 'Saving...' : 'Save Backup Settings'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
                
                {activeTab === 'activity' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl">
                        <ClockIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Activity Log</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Track all system activities</p>
                      </div>
                    </div>
                    
                    <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <ClockIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Activity logging will be implemented soon</p>
                    </div>
                  </div>
                )}

                {activeTab === 'system' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                        <ServerIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>System Health</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Monitor system performance</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {Object.entries(systemHealth).map(([key, value]) => (
                        <div key={key} className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-50 to-emerald-50'} border-2 border-green-200 dark:border-gray-600`}>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} capitalize mb-2`}>{key}</p>
                          <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'appearance' && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl">
                        <SwatchIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>Appearance</h2>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Customize your admin panel theme</p>
                      </div>
                    </div>
                    
                    <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <SwatchIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Theme customization coming soon</p>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsEnhanced;
