import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Eye,
  Clock,
  TrendingUp,
  TrendingDown,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Activity,
  Radio,
  MousePointerClick,
  BarChart3,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Navigation,
  Link as LinkIcon,
  ExternalLink,
  RefreshCw,
  Calendar,
  Target,
  Zap,
  Chrome,
  Award,
  FileText,
  Laptop,
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
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import toast from 'react-hot-toast';
import { format, formatDistance } from 'date-fns';
import { analyticsAPI } from '../services/api';

export const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [activeTab, setActiveTab] = useState('overview');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const refreshIntervalRef = useRef(null);

  // Analytics data states
  const [overview, setOverview] = useState({
    totalVisitors: 0,
    activeVisitors: 0,
    totalPageViews: 0,
    avgSessionDuration: 0,
    bounceRate: 0,
    conversionRate: 0,
  });

  const [liveVisitors, setLiveVisitors] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [countries, setCountries] = useState([]);
  const [topPages, setTopPages] = useState([]);
  const [referrers, setReferrers] = useState({ referrers: [], directTraffic: 0 });
  const [devices, setDevices] = useState({ byDevice: [], byBrowser: [], byOS: [] });

  useEffect(() => {
    fetchAllAnalytics();

    // Setup auto-refresh for live data
    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        fetchLiveVisitors();
        fetchOverview();
      }, 10000); // Refresh every 10 seconds
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [timeRange, autoRefresh]);

  const fetchAllAnalytics = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchOverview(),
        fetchLiveVisitors(),
        fetchTimeline(),
        fetchCountries(),
        fetchTopPages(),
        fetchReferrers(),
        fetchDevices(),
      ]);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const fetchOverview = async () => {
    try {
      const response = await analyticsAPI.getOverview(timeRange);
      if (response.data.success) {
        setOverview(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching overview:', error);
    }
  };

  const fetchLiveVisitors = async () => {
    try {
      const response = await analyticsAPI.getRealtime();
      if (response.data.success) {
        setLiveVisitors(response.data.data.visitors);
        // Update active visitors count
        setOverview(prev => ({ ...prev, activeVisitors: response.data.data.count }));
      }
    } catch (error) {
      console.error('Error fetching live visitors:', error);
    }
  };

  const fetchTimeline = async () => {
    try {
      const response = await analyticsAPI.getTimeline(timeRange);
      if (response.data.success) {
        setTimeline(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching timeline:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await analyticsAPI.getCountries();
      if (response.data.success) {
        setCountries(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchTopPages = async () => {
    try {
      const response = await analyticsAPI.getPages();
      if (response.data.success) {
        setTopPages(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching pages:', error);
    }
  };

  const fetchReferrers = async () => {
    try {
      const response = await analyticsAPI.getReferrers();
      if (response.data.success) {
        setReferrers(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching referrers:', error);
    }
  };

  const fetchDevices = async () => {
    try {
      const response = await analyticsAPI.getDevices();
      if (response.data.success) {
        setDevices(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching devices:', error);
    }
  };

  const handleManualRefresh = () => {
    toast.promise(
      fetchAllAnalytics(),
      {
        loading: 'Refreshing analytics...',
        success: 'Analytics updated!',
        error: 'Failed to refresh',
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading advanced analytics...</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      name: 'Total Visitors',
      value: overview.totalVisitors,
      change: '+12.5%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      name: 'Active Now',
      value: overview.activeVisitors,
      change: 'Live',
      trend: 'neutral',
      icon: Radio,
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      pulse: true,
    },
    {
      name: 'Page Views',
      value: overview.totalPageViews,
      change: '+18.2%',
      trend: 'up',
      icon: Eye,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      name: 'Avg. Session',
      value: `${Math.floor(overview.avgSessionDuration / 60)}m ${overview.avgSessionDuration % 60}s`,
      change: `${overview.bounceRate}% bounce`,
      trend: overview.bounceRate < 50 ? 'up' : 'down',
      icon: Clock,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
    },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'live', label: 'Live Visitors', icon: Radio },
    { id: 'geo', label: 'Geography', icon: Globe },
    { id: 'behavior', label: 'Behavior', icon: MousePointerClick },
    { id: 'technology', label: 'Technology', icon: Monitor },
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  const deviceIcons = {
    desktop: Monitor,
    mobile: Smartphone,
    tablet: Tablet,
  };

  const browserIcons = {
    Chrome: Chrome,
    Firefox: Firefox,
    Safari: Safari,
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Advanced Analytics</h1>
          <p className="text-gray-600 mt-1">Real-time insights and visitor tracking</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto-refresh toggle */}
          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
              autoRefresh
                ? 'bg-green-100 text-green-700 border-2 border-green-300'
                : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
            }`}
          >
            <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
            <span>Auto-refresh</span>
          </button>

          {/* Manual refresh button */}
          <button
            onClick={handleManualRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 font-medium transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>

          {/* Time range selector */}
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border-2 border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden group"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                {stat.pulse && (
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-semibold text-green-600">LIVE</span>
                  </div>
                )}
              </div>
              
              <p className="text-gray-600 text-sm font-medium mb-1">{stat.name}</p>
              <p className="text-3xl font-bold text-gray-900 mb-2">
                {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
              </p>
              <p className="text-sm text-gray-500">{stat.change}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl shadow-lg p-2">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <OverviewTab
            timeline={timeline}
            overview={overview}
            topPages={topPages}
            referrers={referrers}
          />
        )}

        {activeTab === 'live' && (
          <LiveVisitorsTab
            visitors={liveVisitors}
            activeCount={overview.activeVisitors}
          />
        )}

        {activeTab === 'geo' && (
          <GeographyTab countries={countries} />
        )}

        {activeTab === 'behavior' && (
          <BehaviorTab
            topPages={topPages}
            timeline={timeline}
            overview={overview}
          />
        )}

        {activeTab === 'technology' && (
          <TechnologyTab devices={devices} />
        )}
      </AnimatePresence>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ timeline, overview, topPages, referrers }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Timeline Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Visitor Trend</h3>
          <p className="text-sm text-gray-600">Track your website traffic over time</p>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={timeline}>
            <defs>
              <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="_id" 
              stroke="#6B7280" 
              style={{ fontSize: '12px' }}
            />
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
            <Area
              type="monotone"
              dataKey="conversions"
              stroke="#F59E0B"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorConversions)"
              name="Conversions"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Pages & Referrers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Eye className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Top Pages</h3>
              <p className="text-sm text-gray-600">Most visited pages</p>
            </div>
          </div>
          <div className="space-y-3">
            {topPages.slice(0, 8).map((page, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{page._id || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{page.uniqueVisitors} unique visitors</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-gray-900">{page.views.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Referrers */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 rounded-lg">
              <LinkIcon className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Traffic Sources</h3>
              <p className="text-sm text-gray-600">Where visitors come from</p>
            </div>
          </div>
          
          {/* Direct Traffic */}
          <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <Navigation className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Direct Traffic</p>
                  <p className="text-xs text-gray-600">Visitors with no referrer</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-600">{referrers.directTraffic}</p>
            </div>
          </div>

          <div className="space-y-3">
            {referrers.referrers.slice(0, 6).map((ref, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <ExternalLink className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{ref._id || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{ref.conversions} conversions</p>
                  </div>
                </div>
                <p className="text-sm font-bold text-gray-900 flex-shrink-0">{ref.visitors}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
          <Target className="w-12 h-12 mb-4 opacity-80" />
          <p className="text-white/80 text-sm font-medium mb-1">Conversion Rate</p>
          <p className="text-4xl font-bold">{overview.conversionRate}%</p>
          <p className="text-white/60 text-sm mt-2">Above industry average</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white">
          <TrendingDown className="w-12 h-12 mb-4 opacity-80" />
          <p className="text-white/80 text-sm font-medium mb-1">Bounce Rate</p>
          <p className="text-4xl font-bold">{overview.bounceRate}%</p>
          <p className="text-white/60 text-sm mt-2">Lower is better</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg p-6 text-white">
          <Zap className="w-12 h-12 mb-4 opacity-80" />
          <p className="text-white/80 text-sm font-medium mb-1">Engagement Score</p>
          <p className="text-4xl font-bold">
            {Math.round((100 - parseFloat(overview.bounceRate)) * (parseFloat(overview.conversionRate) / 100) * 10)}
          </p>
          <p className="text-white/60 text-sm mt-2">Based on metrics</p>
        </div>
      </div>
    </motion.div>
  );
};

// Live Visitors Tab Component
const LiveVisitorsTab = ({ visitors, activeCount }) => {
  const getCountryFlag = (country) => {
    const flags = {
      'Ghana': '🇬🇭',
      'Nigeria': '🇳🇬',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'South Africa': '🇿🇦',
      'Kenya': '🇰🇪',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'China': '🇨🇳',
      'India': '🇮🇳',
    };
    return flags[country] || '🌍';
  };

  const getDeviceIcon = (device) => {
    const icons = {
      desktop: Monitor,
      mobile: Smartphone,
      tablet: Tablet,
    };
    return icons[device] || Monitor;
  };

  const getBrowserIcon = (browser) => {
    // Using Chrome icon for all browsers since Firefox and Safari aren't available in lucide-react
    return Chrome;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Live Status Banner */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 rounded-2xl shadow-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-10 animate-pulse">
            <Radio className="w-32 h-32" />
          </div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-4 h-4 bg-white rounded-full animate-ping absolute"></div>
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="text-sm font-semibold uppercase tracking-wider">Live Now</span>
            </div>
          </div>
          
          <div className="flex items-end gap-4">
            <div>
              <h2 className="text-6xl font-bold mb-2">{activeCount}</h2>
              <p className="text-white/90 text-xl">Active Visitors Right Now</p>
            </div>
          </div>
          
          <div className="mt-6 flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              <span>Auto-updating every 10 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Last 5 minutes of activity</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Visitors Table */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Active Sessions</h3>
              <p className="text-sm text-gray-600 mt-1">Real-time visitor activity monitoring</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl font-semibold">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>{visitors.length} online</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Current Page
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Browser
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Last Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <AnimatePresence>
                {visitors.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Users className="w-16 h-16 mb-4 opacity-50" />
                        <p className="text-lg font-medium">No active visitors at the moment</p>
                        <p className="text-sm mt-2">Check back soon or wait for new visitors</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  visitors.map((visitor, index) => {
                    const DeviceIcon = getDeviceIcon(visitor.device);
                    const BrowserIcon = getBrowserIcon(visitor.browser);
                    
                    return (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{getCountryFlag(visitor.country)}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{visitor.city || 'Unknown'}</p>
                              <p className="text-xs text-gray-500">{visitor.country || 'Unknown'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <MousePointerClick className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            <p className="text-sm text-gray-900 truncate max-w-xs">
                              {visitor.currentPage || '/'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <DeviceIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700 capitalize">{visitor.device}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <BrowserIcon className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-700">{visitor.browser || 'Unknown'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {formatDistance(new Date(visitor.lastActivity), new Date(), { addSuffix: true })}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Activity Heat Map */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Activity Distribution</h3>
          <p className="text-sm text-gray-600">Visitor activity by device type</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          {['desktop', 'mobile', 'tablet'].map((deviceType) => {
            const count = visitors.filter(v => v.device === deviceType).length;
            const percentage = visitors.length > 0 ? ((count / visitors.length) * 100).toFixed(1) : 0;
            const DeviceIcon = getDeviceIcon(deviceType);
            
            return (
              <div key={deviceType} className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
                <DeviceIcon className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-sm font-medium text-gray-600 capitalize mb-2">{deviceType}</p>
                <p className="text-3xl font-bold text-gray-900 mb-1">{count}</p>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-blue-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{percentage}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Geography Tab Component
const GeographyTab = ({ countries }) => {
  const getCountryFlag = (country) => {
    const flags = {
      'Ghana': '🇬🇭',
      'Nigeria': '🇳🇬',
      'United States': '🇺🇸',
      'United Kingdom': '🇬🇧',
      'Canada': '🇨🇦',
      'South Africa': '🇿🇦',
      'Kenya': '🇰🇪',
      'Germany': '🇩🇪',
      'France': '🇫🇷',
      'China': '🇨🇳',
      'India': '🇮🇳',
      'Australia': '🇦🇺',
      'Brazil': '🇧🇷',
      'Japan': '🇯🇵',
      'Spain': '🇪🇸',
    };
    return flags[country] || '🌍';
  };

  // Calculate total metrics
  const totalVisitors = countries.reduce((sum, c) => sum + c.visitors, 0);
  const totalPageViews = countries.reduce((sum, c) => sum + c.pageViews, 0);
  const totalConversions = countries.reduce((sum, c) => sum + (c.conversions || 0), 0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* World Stats Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Globe className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Total Countries</p>
              <p className="text-4xl font-bold mt-1">{countries.length}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">Geographic reach across the world</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Global Visitors</p>
              <p className="text-4xl font-bold mt-1">{totalVisitors.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">Visitors from all countries</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Target className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Total Conversions</p>
              <p className="text-4xl font-bold mt-1">{totalConversions}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">
            {totalVisitors > 0 ? `${((totalConversions/totalVisitors) * 100).toFixed(1)}%` : '0%'} conversion rate
          </div>
        </div>
      </div>

      {/* Top Countries List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Top Countries</h3>
              <p className="text-sm text-gray-600 mt-1">Ranked by visitor count</p>
            </div>
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {countries.length === 0 ? (
              <div className="text-center py-12">
                <Globe className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 text-lg font-medium">No country data available</p>
                <p className="text-sm text-gray-400 mt-2">Data will appear once visitors access your site</p>
              </div>
            ) : (
              countries.slice(0, 15).map((country, index) => {
                const visitorPercentage = ((country.visitors / totalVisitors) * 100).toFixed(1);
                const avgDuration = country.avgDuration ? `${Math.round(country.avgDuration / 60)}m` : '0m';
                
                return (
                  <motion.div
                    key={country._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-100"
                  >
                    {/* Rank Badge */}
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm
                      ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                        index === 1 ? 'bg-gray-100 text-gray-700' : 
                        index === 2 ? 'bg-orange-100 text-orange-700' : 
                        'bg-blue-50 text-blue-600'}`}>
                      #{index + 1}
                    </div>

                    {/* Flag & Country */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <span className="text-3xl">{getCountryFlag(country._id)}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-semibold text-gray-900 truncate">{country._id}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {country.visitors.toLocaleString()} visitors
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {country.pageViews.toLocaleString()} views
                          </span>
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {avgDuration} avg
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3 w-48">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${visitorPercentage}%` }}
                          transition={{ duration: 0.5, delay: index * 0.05 }}
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full"
                        ></motion.div>
                      </div>
                      <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                        {visitorPercentage}%
                      </span>
                    </div>

                    {/* Conversions Badge */}
                    {country.conversions > 0 && (
                      <div className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <Target className="w-3 h-3" />
                        {country.conversions}
                      </div>
                    )}
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Regional Insights */}
      <div className="grid grid-cols-2 gap-6">
        {/* Top Performing Country */}
        {countries.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Top Performing</p>
                <p className="text-lg font-bold text-gray-900">{countries[0]._id}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Visitors</span>
                <span className="text-lg font-bold text-gray-900">{countries[0].visitors.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Page Views</span>
                <span className="text-lg font-bold text-gray-900">{countries[0].pageViews.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Session</span>
                <span className="text-lg font-bold text-gray-900">
                  {countries[0].avgDuration ? `${Math.round(countries[0].avgDuration / 60)}m` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Geographic Diversity */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Geographic Diversity</p>
              <p className="text-lg font-bold text-gray-900">Global Reach</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Countries Reached</span>
              <span className="text-lg font-bold text-gray-900">{countries.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Page Views</span>
              <span className="text-lg font-bold text-gray-900">{totalPageViews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. per Country</span>
              <span className="text-lg font-bold text-gray-900">
                {countries.length > 0 ? Math.round(totalVisitors / countries.length) : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Behavior Tab Component
const BehaviorTab = ({ topPages }) => {
  // Calculate metrics
  const totalViews = topPages.reduce((sum, p) => sum + p.views, 0);
  const totalUnique = topPages.reduce((sum, p) => sum + p.uniqueVisitors, 0);
  const avgViewsPerPage = topPages.length > 0 ? (totalViews / topPages.length).toFixed(1) : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Behavior Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <FileText className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Total Pages</p>
              <p className="text-4xl font-bold mt-1">{topPages.length}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">Unique pages visited</div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Eye className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Total Views</p>
              <p className="text-4xl font-bold mt-1">{totalViews.toLocaleString()}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">Across all pages</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Avg per Page</p>
              <p className="text-4xl font-bold mt-1">{avgViewsPerPage}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">Average page views</div>
        </div>
      </div>

      {/* Top Pages Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Most Visited Pages</h3>
          <p className="text-sm text-gray-600">Page performance ranked by views</p>
        </div>

        {topPages.length === 0 ? (
          <div className="text-center py-12">
            <MousePointerClick className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No page data available</p>
            <p className="text-sm text-gray-400 mt-2">Data will appear once visitors access your site</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={topPages.slice(0, 10)}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="_id" 
                tick={{ fontSize: 12 }} 
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
              />
              <Legend />
              <Bar dataKey="views" fill="#3B82F6" name="Total Views" radius={[8, 8, 0, 0]} />
              <Bar dataKey="uniqueVisitors" fill="#10B981" name="Unique Visitors" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Page Details List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Page Analytics</h3>
          <p className="text-sm text-gray-600">Detailed view metrics</p>
        </div>

        <div className="space-y-3">
          {topPages.slice(0, 15).map((page, index) => {
            const viewPercentage = totalViews > 0 ? ((page.views / totalViews) * 100).toFixed(1) : 0;
            const uniquePercentage = page.views > 0 ? ((page.uniqueVisitors / page.views) * 100).toFixed(0) : 0;

            return (
              <motion.div
                key={page._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border-2 border-gray-100"
              >
                {/* Rank */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm
                  ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                    index === 1 ? 'bg-gray-100 text-gray-700' : 
                    index === 2 ? 'bg-orange-100 text-orange-700' : 
                    'bg-blue-50 text-blue-600'}`}>
                  #{index + 1}
                </div>

                {/* Page Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <p className="text-sm font-semibold text-gray-900 truncate">{page._id}</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {page.views.toLocaleString()} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {page.uniqueVisitors.toLocaleString()} unique
                    </span>
                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-semibold">
                      {uniquePercentage}% unique rate
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3 w-40">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${viewPercentage}%` }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full"
                    ></motion.div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 w-12 text-right">
                    {viewPercentage}%
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
};

// Technology Tab Component
const TechnologyTab = ({ devices }) => {
  // Process device data
  const deviceTypes = devices.deviceType || [];
  const browsers = devices.browsers || [];
  const operatingSystems = devices.os || [];

  const totalDevices = deviceTypes.reduce((sum, d) => sum + d.count, 0);
  const totalBrowsers = browsers.reduce((sum, b) => sum + b.count, 0);
  const totalOS = operatingSystems.reduce((sum, o) => sum + o.count, 0);

  // Prepare pie chart data
  const deviceChartData = deviceTypes.map(d => ({
    name: d._id || 'Unknown',
    value: d.count,
    percentage: totalDevices > 0 ? ((d.count / totalDevices) * 100).toFixed(1) : 0
  }));

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Technology Summary */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Monitor className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Device Types</p>
              <p className="text-4xl font-bold mt-1">{deviceTypes.length}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">{totalDevices.toLocaleString()} total sessions</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Chrome className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Browsers</p>
              <p className="text-4xl font-bold mt-1">{browsers.length}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">{totalBrowsers.toLocaleString()} total sessions</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Laptop className="w-8 h-8 opacity-80" />
            <div className="text-right">
              <p className="text-sm font-medium opacity-90">Operating Systems</p>
              <p className="text-4xl font-bold mt-1">{operatingSystems.length}</p>
            </div>
          </div>
          <div className="text-sm opacity-75">{totalOS.toLocaleString()} total sessions</div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Device Distribution Pie Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Device Distribution</h3>
            <p className="text-sm text-gray-600">Usage by device type</p>
          </div>

          {deviceChartData.length === 0 ? (
            <div className="text-center py-12">
              <Monitor className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg font-medium">No device data</p>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <ResponsiveContainer width="50%" height={250}>
                <PieChart>
                  <Pie
                    data={deviceChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {deviceChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className="flex-1 space-y-3">
                {deviceChartData.map((device, index) => (
                  <div key={device.name} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-900 capitalize">{device.name}</span>
                        <span className="text-sm font-bold text-gray-700">{device.percentage}%</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full rounded-full"
                          style={{ 
                            width: `${device.percentage}%`,
                            backgroundColor: COLORS[index % COLORS.length]
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Browser Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-gray-900">Browser Distribution</h3>
            <p className="text-sm text-gray-600">Usage by browser</p>
          </div>

          {browsers.length === 0 ? (
            <div className="text-center py-12">
              <Chrome className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500 text-lg font-medium">No browser data</p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={browsers.slice(0, 8)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis type="number" />
                <YAxis dataKey="_id" type="category" width={100} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Bar dataKey="count" fill="#10B981" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Operating Systems */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-gray-900">Operating Systems</h3>
          <p className="text-sm text-gray-600">Distribution by OS</p>
        </div>

        {operatingSystems.length === 0 ? (
          <div className="text-center py-12">
            <Laptop className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No OS data</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {operatingSystems.slice(0, 8).map((os, index) => {
              const percentage = totalOS > 0 ? ((os.count / totalOS) * 100).toFixed(1) : 0;
              
              return (
                <motion.div
                  key={os._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border-2 border-gray-200"
                >
                  <Laptop className="w-6 h-6 text-purple-600 mb-2" />
                  <p className="text-sm font-medium text-gray-600 truncate mb-1">{os._id || 'Unknown'}</p>
                  <p className="text-2xl font-bold text-gray-900 mb-2">{os.count.toLocaleString()}</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className="bg-purple-600 h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{percentage}%</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Analytics;
