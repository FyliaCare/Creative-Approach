import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileText,
  MessageSquare,
  ClipboardList,
  TrendingUp,
  Globe,
  Eye,
  Clock,
  ArrowUp,
  ArrowDown,
  Mail,
  CheckCircle,
  XCircle,
  Activity,
  Calendar,
  MapPin,
  Monitor,
  Smartphone,
  Tablet,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format, subDays } from 'date-fns';

const API_URL = import.meta.env.VITE_API_URL;

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalPageViews: 0,
    totalQuotes: 0,
    totalSubscribers: 0,
    pendingQuotes: 0,
    activeChats: 0,
    recentQuotes: [],
    recentSubscribers: [],
    topPages: [],
    deviceStats: [],
    recentActivity: [],
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    // Refresh data every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
  }, [timeRange]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch all data in parallel
      const [quotesRes, subscribersRes] = await Promise.all([
        axios.get(`${API_URL}/api/quotations`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/api/newsletter`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] })),
      ]);

      const quotes = Array.isArray(quotesRes.data) ? quotesRes.data : [];
      const subscribers = Array.isArray(subscribersRes.data) ? subscribersRes.data : [];

      // Calculate stats
      const pendingQuotes = quotes.filter(q => q.status === 'pending').length;
      const recentQuotes = quotes.slice(0, 5);
      const recentSubscribers = subscribers.slice(0, 5);

      // Generate mock chart data (replace with real analytics later)
      const chartData = generateChartData(timeRange);

      // Generate mock device stats
      const deviceStats = [
        { name: 'Desktop', value: 45, icon: Monitor, color: '#3B82F6' },
        { name: 'Mobile', value: 40, icon: Smartphone, color: '#10B981' },
        { name: 'Tablet', value: 15, icon: Tablet, color: '#F59E0B' },
      ];

      // Generate recent activity
      const recentActivity = [
        ...recentQuotes.map(q => ({
          type: 'quote',
          title: `New quote request from ${q.name}`,
          time: q.createdAt,
          icon: ClipboardList,
          color: 'blue',
        })),
        ...recentSubscribers.map(s => ({
          type: 'subscriber',
          title: `New subscriber: ${s.email}`,
          time: s.createdAt,
          icon: Mail,
          color: 'green',
        })),
      ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

      setStats({
        totalVisitors: Math.floor(Math.random() * 5000) + 1000,
        totalPageViews: Math.floor(Math.random() * 20000) + 5000,
        totalQuotes: quotes.length,
        totalSubscribers: subscribers.length,
        pendingQuotes,
        activeChats: Math.floor(Math.random() * 5),
        recentQuotes,
        recentSubscribers,
        deviceStats,
        recentActivity,
        topPages: [
          { page: '/services', views: 1243, bounce: '32%' },
          { page: '/portfolio', views: 987, bounce: '28%' },
          { page: '/contact', views: 765, bounce: '41%' },
          { page: '/about', views: 543, bounce: '35%' },
          { page: '/blog', views: 432, bounce: '45%' },
        ],
      });

      setChartData(chartData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      setLoading(false);
    }
  };

  const generateChartData = (range) => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      return {
        date: format(date, 'MMM dd'),
        visitors: Math.floor(Math.random() * 200) + 50,
        pageViews: Math.floor(Math.random() * 600) + 150,
        quotes: Math.floor(Math.random() * 15) + 1,
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Visitors',
      value: stats.totalVisitors,
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      name: 'Page Views',
      value: stats.totalPageViews,
      change: '+8.2%',
      trend: 'up',
      icon: Eye,
      color: 'bg-green-500',
      lightColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      name: 'Quote Requests',
      value: stats.totalQuotes,
      change: `${stats.pendingQuotes} pending`,
      trend: stats.pendingQuotes > 0 ? 'neutral' : 'up',
      icon: ClipboardList,
      color: 'bg-yellow-500',
      lightColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
    },
    {
      name: 'Newsletter Subscribers',
      value: stats.totalSubscribers,
      change: '+15 this week',
      trend: 'up',
      icon: Mail,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6 pb-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Admin! 👋</h1>
            <p className="text-blue-100">
              Here's what's happening with your drone services platform today.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-6 h-6 animate-pulse" />
            <span className="text-sm">{stats.activeChats} active chats</span>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Overview</h2>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.lightColor} p-3 rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.textColor}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : 'text-yellow-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : stat.trend === 'down' ? <ArrowDown className="w-4 h-4" /> : null}
                <span className="font-medium">{stat.change}</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mb-1">{stat.name}</p>
            <p className="text-3xl font-bold text-gray-900">
              {stat.value.toLocaleString()}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitors & Page Views Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Visitors & Page Views</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
              <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="visitors"
                stroke="#3B82F6"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorVisitors)"
                name="Visitors"
              />
              <Area
                type="monotone"
                dataKey="pageViews"
                stroke="#10B981"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorPageViews)"
                name="Page Views"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Device Statistics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Device Statistics</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.deviceStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.deviceStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {stats.deviceStats.map((device) => {
              const Icon = device.icon;
              return (
                <div key={device.name} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Icon className="w-5 h-5" style={{ color: device.color }} />
                  </div>
                  <p className="text-sm text-gray-600">{device.name}</p>
                  <p className="text-lg font-bold" style={{ color: device.color }}>
                    {device.value}%
                  </p>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Quote Requests Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quote Requests Trend</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="date" stroke="#6B7280" style={{ fontSize: '12px' }} />
            <YAxis stroke="#6B7280" style={{ fontSize: '12px' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              }}
            />
            <Legend />
            <Bar dataKey="quotes" fill="#F59E0B" name="Quote Requests" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Bottom Row - Activity & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {stats.recentActivity.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No recent activity</p>
            ) : (
              stats.recentActivity.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className={`p-2 rounded-lg ${
                      activity.color === 'blue' ? 'bg-blue-100' :
                      activity.color === 'green' ? 'bg-green-100' :
                      'bg-yellow-100'
                    }`}>
                      <Icon className={`w-4 h-4 ${
                        activity.color === 'blue' ? 'text-blue-600' :
                        activity.color === 'green' ? 'text-green-600' :
                        'text-yellow-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 font-medium">{activity.title}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.time).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Pages</h3>
          <div className="space-y-3">
            {stats.topPages.map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{page.page}</p>
                    <p className="text-xs text-gray-500">Bounce: {page.bounce}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white"
      >
        <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => window.location.href = '/blog/new'}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-center"
          >
            <FileText className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">New Blog Post</span>
          </button>
          <button
            onClick={() => window.location.href = '/quotations'}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-center"
          >
            <ClipboardList className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">View Quotes</span>
          </button>
          <button
            onClick={() => window.location.href = '/portfolio'}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-center"
          >
            <Globe className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Add Project</span>
          </button>
          <button
            onClick={() => window.location.href = '/chat'}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg p-4 transition-all text-center"
          >
            <MessageSquare className="w-6 h-6 mx-auto mb-2" />
            <span className="text-sm font-medium">Live Chat</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
