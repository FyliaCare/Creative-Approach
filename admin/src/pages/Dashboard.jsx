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
  Video,
  Camera,
  Search,
  Map,
  Building2,
  Plane,
  Zap,
  DollarSign,
  Star,
  Target,
  Wind,
  CloudRain,
  Sun,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
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
    droneServices: {
      aerial: 0,
      inspection: 0,
      surveying: 0,
      mapping: 0,
    },
    projectsByIndustry: [],
    revenueData: [],
    flightHours: 0,
    projectsCompleted: 0,
    clientSatisfaction: 0,
  });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [chartData, setChartData] = useState([]);
  const [weatherData, setWeatherData] = useState({
    condition: 'Sunny',
    temp: 28,
    wind: 12,
    flyable: true,
  });

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

      // Drone service distribution
      const droneServices = {
        aerial: Math.floor(Math.random() * 50) + 30,
        inspection: Math.floor(Math.random() * 40) + 25,
        surveying: Math.floor(Math.random() * 35) + 20,
        mapping: Math.floor(Math.random() * 30) + 15,
      };

      // Projects by industry
      const projectsByIndustry = [
        { name: 'Real Estate', value: 35, color: '#3B82F6' },
        { name: 'Construction', value: 28, color: '#10B981' },
        { name: 'Agriculture', value: 18, color: '#F59E0B' },
        { name: 'Infrastructure', value: 12, color: '#EF4444' },
        { name: 'Media & Film', value: 7, color: '#8B5CF6' },
      ];

      // Revenue data
      const revenueData = generateRevenueData(timeRange);

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
        droneServices,
        projectsByIndustry,
        revenueData,
        flightHours: Math.floor(Math.random() * 500) + 200,
        projectsCompleted: Math.floor(Math.random() * 150) + 50,
        clientSatisfaction: 4.8,
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

  const generateRevenueData = (range) => {
    const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = subDays(new Date(), days - i - 1);
      return {
        date: format(date, 'MMM dd'),
        revenue: Math.floor(Math.random() * 5000) + 1000,
        projects: Math.floor(Math.random() * 10) + 2,
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
      name: 'Total Flight Hours',
      value: stats.flightHours,
      change: '+24 this month',
      trend: 'up',
      icon: Plane,
      color: 'bg-sky-500',
      lightColor: 'bg-sky-50',
      textColor: 'text-sky-600',
      gradient: 'from-sky-400 to-blue-500',
    },
    {
      name: 'Projects Completed',
      value: stats.projectsCompleted,
      change: `${stats.pendingQuotes} in progress`,
      trend: 'up',
      icon: CheckCircle,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      gradient: 'from-emerald-400 to-green-500',
    },
    {
      name: 'Client Satisfaction',
      value: stats.clientSatisfaction,
      suffix: '/5.0',
      change: '+0.2 this month',
      trend: 'up',
      icon: Star,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      gradient: 'from-amber-400 to-orange-500',
    },
    {
      name: 'Quote Requests',
      value: stats.totalQuotes,
      change: `${stats.pendingQuotes} pending`,
      trend: stats.pendingQuotes > 0 ? 'neutral' : 'up',
      icon: ClipboardList,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      gradient: 'from-purple-400 to-indigo-500',
    },
  ];

  const droneServiceCards = [
    {
      name: 'Aerial Photography & Videography',
      value: stats.droneServices.aerial,
      icon: Camera,
      color: '#3B82F6',
      description: 'High-quality drone footage',
    },
    {
      name: 'Inspections',
      value: stats.droneServices.inspection,
      icon: Search,
      color: '#10B981',
      description: 'Infrastructure & asset inspection',
    },
    {
      name: 'Survey & Mapping',
      value: stats.droneServices.surveying,
      icon: Map,
      color: '#F59E0B',
      description: 'Precision land surveying',
    },
    {
      name: 'Specialized Services',
      value: stats.droneServices.mapping,
      icon: Target,
      color: '#EF4444',
      description: 'Custom drone solutions',
    },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6 pb-8">
      {/* Drone-Themed Welcome Header */}
      <div className="relative bg-gradient-to-br from-sky-600 via-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-2xl overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 animate-pulse">
            <Plane className="w-32 h-32 transform rotate-45" />
          </div>
          <div className="absolute bottom-10 left-20 animate-bounce">
            <Camera className="w-24 h-24" />
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                  <Plane className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-1">Creative Approach Dashboard</h1>
                  <p className="text-sky-100 text-lg">
                    Professional Drone Services & Aerial Solutions
                  </p>
                </div>
              </div>
            </div>

            {/* Weather & Flight Status */}
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${weatherData.flyable ? 'bg-green-500/30' : 'bg-red-500/30'}`}>
                  {weatherData.condition === 'Sunny' ? <Sun className="w-6 h-6" /> : <CloudRain className="w-6 h-6" />}
                </div>
                <div>
                  <p className="text-sm opacity-90">Flight Conditions</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="font-bold text-lg">{weatherData.temp}°C</span>
                    <span className="text-sm">Wind: {weatherData.wind}km/h</span>
                  </div>
                  <p className="text-xs mt-1">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${
                      weatherData.flyable ? 'bg-green-500/30' : 'bg-red-500/30'
                    }`}>
                      <Zap className="w-3 h-3" />
                      {weatherData.flyable ? 'Safe to fly' : 'Poor conditions'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-green-300 animate-pulse" />
                <div>
                  <p className="text-sm opacity-80">Active Chats</p>
                  <p className="text-2xl font-bold">{stats.activeChats}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-blue-300" />
                <div>
                  <p className="text-sm opacity-80">Site Visitors</p>
                  <p className="text-2xl font-bold">{stats.totalVisitors.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-purple-300" />
                <div>
                  <p className="text-sm opacity-80">Subscribers</p>
                  <p className="text-2xl font-bold">{stats.totalSubscribers}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-amber-300" />
                <div>
                  <p className="text-sm opacity-80">Page Views</p>
                  <p className="text-2xl font-bold">{stats.totalPageViews.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Time Range Filter */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Business Performance</h2>
          <p className="text-gray-600 text-sm mt-1">Track your drone services metrics and analytics</p>
        </div>
        <div className="flex gap-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                timeRange === range
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/50'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'Last 90 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* Main KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Gradient background overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-4 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg transform group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold ${
                  stat.trend === 'up' ? 'bg-green-50 text-green-700' : 
                  stat.trend === 'down' ? 'bg-red-50 text-red-700' : 
                  'bg-yellow-50 text-yellow-700'
                }`}>
                  {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : 
                   stat.trend === 'down' ? <ArrowDown className="w-4 h-4" /> : null}
                  <span>{stat.change}</span>
                </div>
              </div>
              <p className="text-gray-600 text-sm font-medium mb-2">{stat.name}</p>
              <p className="text-4xl font-bold text-gray-900">
                {stat.value.toLocaleString()}{stat.suffix || ''}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drone Services Breakdown */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Service Distribution</h2>
        <p className="text-gray-600 text-sm mb-6">Overview of your drone service offerings</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {droneServiceCards.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="relative p-6">
                <div 
                  className="absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-20 transform translate-x-16 -translate-y-16"
                  style={{ backgroundColor: service.color }}
                ></div>
                
                <div className="relative">
                  <div 
                    className="inline-flex p-4 rounded-xl mb-4 transform group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon className="w-8 h-8" style={{ color: service.color }} />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-3xl font-bold" style={{ color: service.color }}>
                        {service.value}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Projects</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-green-600">+{Math.floor(Math.random() * 20 + 5)}%</p>
                      <p className="text-xs text-gray-500">vs last month</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue & Projects Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Revenue & Projects</h3>
              <p className="text-sm text-gray-600">Track your business growth</p>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-semibold text-gray-700">
                ${stats.revenueData.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()}
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={stats.revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
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
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue (GHS)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Projects by Industry */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Projects by Industry</h3>
            <p className="text-sm text-gray-600">Client industry distribution</p>
          </div>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.projectsByIndustry}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stats.projectsByIndustry.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-6">
            {stats.projectsByIndustry.map((industry) => (
              <div key={industry.name} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: industry.color }}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{industry.name}</p>
                  <p className="text-xs text-gray-500">{industry.value}%</p>
                </div>
              </div>
            ))}
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
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 text-white overflow-hidden"
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0">
            <Video className="w-40 h-40 transform rotate-12" />
          </div>
          <div className="absolute bottom-0 left-0">
            <Camera className="w-32 h-32 transform -rotate-12" />
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-bold">Quick Actions</h3>
              <p className="text-white/80 text-sm">Manage your drone services business</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <button
              onClick={() => window.location.href = '/portfolio/new'}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <Camera className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold">Add Project</span>
              </div>
            </button>
            
            <button
              onClick={() => window.location.href = '/quotations'}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <ClipboardList className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold">View Quotes</span>
              </div>
            </button>
            
            <button
              onClick={() => window.location.href = '/blog/new'}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold">New Blog</span>
              </div>
            </button>
            
            <button
              onClick={() => window.location.href = '/chat'}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold">Live Chat</span>
              </div>
            </button>

            <button
              onClick={() => window.location.href = '/analytics'}
              className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl p-5 transition-all border border-white/20 hover:border-white/40 hover:scale-105"
            >
              <div className="flex flex-col items-center gap-2">
                <div className="p-3 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold">Analytics</span>
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
