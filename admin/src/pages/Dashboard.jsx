import { useState, useEffect } from 'react';
import {
  Users,
  FileText,
  MessageSquare,
  ClipboardList,
  TrendingUp,
  Globe,
  Eye,
  Clock,
} from 'lucide-react';
import { analyticsAPI, quotationsAPI, newsletterAPI, blogAPI } from '../services/api';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [realtimeVisitors, setRealtimeVisitors] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    // Refresh realtime data every 30 seconds
    const interval = setInterval(fetchRealtimeData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [analytics, quotes, newsletter, blog] = await Promise.all([
        analyticsAPI.getOverview('7d').catch(() => ({ data: { data: {} } })),
        quotationsAPI.getStats().catch(() => ({ data: { data: {} } })),
        newsletterAPI.getStats().catch(() => ({ data: { data: {} } })),
        blogAPI.getAllPosts({ limit: 5 }).catch(() => ({ data: { data: [] } })),
      ]);

      setStats({
        analytics: analytics.data.data || {},
        quotes: quotes.data.data || {},
        newsletter: newsletter.data.data || {},
        blog: blog.data.data || [],
      });

      await fetchRealtimeData();
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
      // Set default empty stats
      setStats({
        analytics: {},
        quotes: {},
        newsletter: {},
        blog: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchRealtimeData = async () => {
    try {
      const response = await analyticsAPI.getRealtime();
      setRealtimeVisitors(response.data.data || []);
    } catch (error) {
      console.error('Error fetching realtime data:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      name: 'Total Visitors',
      value: stats?.analytics?.totalVisitors || 0,
      change: '+12.5%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      name: 'Page Views',
      value: stats?.analytics?.totalPageViews || 0,
      change: '+8.2%',
      icon: Eye,
      color: 'bg-green-500',
    },
    {
      name: 'New Quotes',
      value: stats?.quotes?.statusBreakdown?.find(s => s._id === 'new')?.count || 0,
      change: '+5',
      icon: ClipboardList,
      color: 'bg-yellow-500',
    },
    {
      name: 'Subscribers',
      value: stats?.newsletter?.totalSubscribers || 0,
      change: `+${stats?.newsletter?.recentSubscriptions || 0}`,
      icon: FileText,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back! 👋</h1>
        <p className="text-primary-100">
          Here's what's happening with your drone services platform today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-sm text-green-600 mt-2">
                  {stat.change} from last week
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent quotes */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Quote Requests
            </h2>
          </div>
          <div className="p-6">
            {stats?.quotes?.statusBreakdown && stats.quotes.statusBreakdown.length > 0 ? (
              <div className="space-y-4">
                {stats.quotes.statusBreakdown.map((status) => (
                  <div
                    key={status._id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <div
                        className={`h-3 w-3 rounded-full mr-3 ${
                          status._id === 'new'
                            ? 'bg-blue-500'
                            : status._id === 'quoted'
                            ? 'bg-yellow-500'
                            : status._id === 'accepted'
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                        }`}
                      ></div>
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {status._id}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-gray-900">
                      {status.count}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No quote requests yet
              </p>
            )}
          </div>
        </div>

        {/* Realtime visitors */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Active Visitors
              </h2>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <span className="text-sm text-gray-600">
                  {realtimeVisitors.length} online
                </span>
              </div>
            </div>
          </div>
          <div className="p-6">
            {realtimeVisitors.length > 0 ? (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {realtimeVisitors.map((visitor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <Globe className="h-5 w-5 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {visitor.country || 'Unknown'}
                        </p>
                        <p className="text-xs text-gray-500">
                          {visitor.pages?.[visitor.pages.length - 1]?.url || '/'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {format(new Date(visitor.lastActivity), 'HH:mm')}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                No active visitors right now
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Analytics Overview (Last 7 Days)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <TrendingUp className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {stats?.analytics?.avgSessionDuration
                ? `${Math.round(stats.analytics.avgSessionDuration / 60)}m`
                : '0m'}
            </p>
            <p className="text-sm text-gray-600">Avg. Session Duration</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <Eye className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {stats?.analytics?.bounceRate
                ? `${Math.round(stats.analytics.bounceRate)}%`
                : '0%'}
            </p>
            <p className="text-sm text-gray-600">Bounce Rate</p>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">
              {stats?.analytics?.conversionRate
                ? `${stats.analytics.conversionRate.toFixed(1)}%`
                : '0%'}
            </p>
            <p className="text-sm text-gray-600">Conversion Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
};
