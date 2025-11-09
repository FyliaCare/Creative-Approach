import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export const AnalyticsDashboard = ({ portfolio }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (portfolio) {
      fetchAnalytics();
    }
  }, [portfolio, timeRange]);

  const fetchAnalytics = () => {
    setLoading(true);
    
    // Simulate API call - replace with actual API
    setTimeout(() => {
      const mockData = generateMockAnalytics(portfolio);
      setAnalytics(mockData);
      setLoading(false);
    }, 800);
  };

  const generateMockAnalytics = (portfolio) => {
    // Generate realistic mock data
    const views = portfolio?.views || Math.floor(Math.random() * 1000) + 100;
    const likes = portfolio?.likes || Math.floor(views * 0.15);
    const shares = Math.floor(likes * 0.4);
    const avgTime = Math.floor(Math.random() * 120) + 30; // 30-150 seconds
    const bounceRate = (Math.random() * 30 + 20).toFixed(1); // 20-50%
    
    // Daily views for the past 30 days
    const viewsData = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 50) + 10,
      likes: Math.floor(Math.random() * 8) + 2
    }));

    // Traffic sources
    const trafficSources = [
      { name: 'Direct', value: Math.floor(views * 0.35), color: '#3B82F6' },
      { name: 'Search', value: Math.floor(views * 0.3), color: '#10B981' },
      { name: 'Social', value: Math.floor(views * 0.2), color: '#8B5CF6' },
      { name: 'Referral', value: Math.floor(views * 0.15), color: '#F59E0B' }
    ];

    // Device breakdown
    const devices = [
      { name: 'Desktop', count: Math.floor(views * 0.55), percentage: 55 },
      { name: 'Mobile', count: Math.floor(views * 0.35), percentage: 35 },
      { name: 'Tablet', count: Math.floor(views * 0.1), percentage: 10 }
    ];

    // Top locations
    const locations = [
      { country: 'United States', views: Math.floor(views * 0.4), flag: '🇺🇸' },
      { country: 'United Kingdom', views: Math.floor(views * 0.2), flag: '🇬🇧' },
      { country: 'Canada', views: Math.floor(views * 0.15), flag: '🇨🇦' },
      { country: 'Australia', views: Math.floor(views * 0.12), flag: '🇦🇺' },
      { country: 'Germany', views: Math.floor(views * 0.08), flag: '🇩🇪' }
    ];

    // Engagement rate over time
    const engagementData = Array.from({ length: 7 }, (_, i) => ({
      day: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i],
      rate: (Math.random() * 20 + 10).toFixed(1)
    }));

    return {
      overview: {
        views,
        likes,
        shares,
        avgTime,
        bounceRate
      },
      viewsData,
      trafficSources,
      devices,
      locations,
      engagementData
    };
  };

  if (!portfolio) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
        Select a portfolio project to view analytics
      </div>
    );
  }

  if (loading || !analytics) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Time Range */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Analytics</h2>
        <div className="flex gap-2">
          {['7d', '30d', '90d', '1y'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' :
               range === '30d' ? 'Last 30 Days' :
               range === '90d' ? 'Last 90 Days' : 'Last Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Total Views</span>
            <span className="text-2xl">👁️</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics.overview.views.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">+12.5% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Likes</span>
            <span className="text-2xl">❤️</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics.overview.likes.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">+8.3% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Shares</span>
            <span className="text-2xl">🔗</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics.overview.shares.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">+15.7% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Avg. Time</span>
            <span className="text-2xl">⏱️</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics.overview.avgTime}s</p>
          <p className="text-sm text-green-600 mt-1">+3.2% from last period</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Bounce Rate</span>
            <span className="text-2xl">📊</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{analytics.overview.bounceRate}%</p>
          <p className="text-sm text-red-600 mt-1">-2.1% from last period</p>
        </motion.div>
      </div>

      {/* Views & Engagement Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Views & Engagement Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={analytics.viewsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="views" stroke="#3B82F6" strokeWidth={2} name="Views" />
            <Line type="monotone" dataKey="likes" stroke="#10B981" strokeWidth={2} name="Likes" />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Traffic Sources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analytics.trafficSources}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {analytics.trafficSources.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Device Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analytics.devices} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip />
              <Bar dataKey="count" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Locations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Top Locations</h3>
        <div className="space-y-3">
          {analytics.locations.map((location, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{location.flag}</span>
                <span className="font-medium text-gray-900">{location.country}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">{location.views.toLocaleString()} views</span>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(location.views / analytics.overview.views) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Engagement Rate */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white rounded-lg shadow p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Weekly Engagement Rate</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={analytics.engagementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="rate" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Performance Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-3">🚀 Performance Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Peak Traffic Time</p>
            <p className="text-lg text-blue-600">2:00 PM - 4:00 PM</p>
            <p className="text-xs text-gray-500 mt-1">Consider posting during these hours</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Best Day</p>
            <p className="text-lg text-green-600">Wednesday</p>
            <p className="text-xs text-gray-500 mt-1">25% higher engagement on Wednesdays</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Engagement Score</p>
            <p className="text-lg text-purple-600">{((analytics.overview.likes / analytics.overview.views) * 100).toFixed(1)}%</p>
            <p className="text-xs text-gray-500 mt-1">Above average for your category</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Recommendation</p>
            <p className="text-lg text-orange-600">Add More Images</p>
            <p className="text-xs text-gray-500 mt-1">Projects with 5+ images get 40% more views</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
