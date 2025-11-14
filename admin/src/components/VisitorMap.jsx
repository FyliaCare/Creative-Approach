import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Users,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  Eye,
  Activity,
  Radio,
  Maximize2,
  Minimize2,
  RefreshCw,
} from 'lucide-react';
import { analyticsAPI } from '../services/api';
import toast from 'react-hot-toast';

const VisitorMap = () => {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState({
    totalVisitors: 0,
    activeVisitors: 0,
    countries: 0,
    devices: { desktop: 0, mobile: 0, tablet: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [selectedVisitor, setSelectedVisitor] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [period, setPeriod] = useState('24h');
  const [showActiveOnly, setShowActiveOnly] = useState(false);
  const mapRef = useRef(null);
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    fetchMapData();

    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        fetchMapData(true);
      }, 15000); // Refresh every 15 seconds
    }

    return () => {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }
    };
  }, [period, showActiveOnly, autoRefresh]);

  const fetchMapData = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      
      const response = await analyticsAPI.getVisitorMap(period, showActiveOnly);
      
      if (response.data.success) {
        setVisitors(response.data.data.visitors);
        setStats(response.data.data.stats);
      }
    } catch (error) {
      console.error('Error fetching map data:', error);
      if (!silent) {
        toast.error('Failed to load visitor map data');
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  const handleRefresh = () => {
    toast.promise(
      fetchMapData(),
      {
        loading: 'Refreshing map data...',
        success: 'Map data updated!',
        error: 'Failed to refresh data'
      }
    );
  };

  const getDeviceIcon = (device) => {
    switch(device) {
      case 'mobile': return Smartphone;
      case 'tablet': return Tablet;
      default: return Monitor;
    }
  };

  const getMarkerColor = (visitor) => {
    if (!visitor.isActive) return '#94a3b8'; // gray
    if (visitor.device === 'mobile') return '#10b981'; // green
    if (visitor.device === 'tablet') return '#f59e0b'; // orange
    return '#3b82f6'; // blue
  };

  // Simple world map using SVG
  const worldMap = `
    <svg viewBox="0 0 2000 1000" xmlns="http://www.w3.org/2000/svg">
      <rect width="2000" height="1000" fill="#f8fafc"/>
      <path d="M 0 500 Q 500 300 1000 500 T 2000 500" stroke="#cbd5e1" stroke-width="1" fill="none"/>
      <path d="M 0 600 Q 500 400 1000 600 T 2000 600" stroke="#cbd5e1" stroke-width="1" fill="none"/>
      <path d="M 0 400 Q 500 200 1000 400 T 2000 400" stroke="#cbd5e1" stroke-width="1" fill="none"/>
      <!-- Continents simplified -->
      <ellipse cx="300" cy="300" rx="200" ry="150" fill="#e2e8f0" opacity="0.5"/>
      <ellipse cx="600" cy="400" rx="180" ry="120" fill="#e2e8f0" opacity="0.5"/>
      <ellipse cx="1000" cy="500" rx="220" ry="140" fill="#e2e8f0" opacity="0.5"/>
      <ellipse cx="1400" cy="350" rx="250" ry="180" fill="#e2e8f0" opacity="0.5"/>
      <ellipse cx="1700" cy="600" rx="180" ry="140" fill="#e2e8f0" opacity="0.5"/>
    </svg>
  `;

  // Convert lat/lng to SVG coordinates
  const latLngToPoint = (lat, lng) => {
    const x = ((lng + 180) / 360) * 2000;
    const y = ((90 - lat) / 180) * 1000;
    return { x, y };
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''}`}>
      <div className="space-y-6">
        {/* Header Controls */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Globe className="w-7 h-7 text-blue-600" />
              Live Visitor Map
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Real-time geographic tracking of website visitors
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Period Selector */}
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="px-4 py-2 border-2 border-gray-300 rounded-xl font-medium focus:outline-none focus:border-blue-500"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>

            {/* Active Only Toggle */}
            <button
              onClick={() => setShowActiveOnly(!showActiveOnly)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                showActiveOnly
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Radio className={`w-4 h-4 ${showActiveOnly ? 'animate-pulse' : ''}`} />
              Active Only
            </button>

            {/* Auto Refresh */}
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                autoRefresh
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
              Auto-refresh
            </button>

            {/* Manual Refresh */}
            <button
              onClick={handleRefresh}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <RefreshCw className="w-5 h-5 text-gray-700" />
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              {isFullscreen ? (
                <Minimize2 className="w-5 h-5 text-gray-700" />
              ) : (
                <Maximize2 className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-6 h-6 opacity-80" />
              <span className="text-2xl font-bold">{stats.totalVisitors}</span>
            </div>
            <p className="text-sm opacity-90">Total Visitors</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Radio className="w-6 h-6 opacity-80 animate-pulse" />
              <span className="text-2xl font-bold">{stats.activeVisitors}</span>
            </div>
            <p className="text-sm opacity-90">Active Now</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-6 h-6 opacity-80" />
              <span className="text-2xl font-bold">{stats.countries}</span>
            </div>
            <p className="text-sm opacity-90">Countries</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <Monitor className="w-6 h-6 opacity-80" />
              <span className="text-2xl font-bold">{stats.devices.desktop + stats.devices.mobile + stats.devices.tablet}</span>
            </div>
            <p className="text-sm opacity-90">Total Devices</p>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200">
          {loading ? (
            <div className="h-[600px] flex items-center justify-center">
              <div className="text-center">
                <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Loading visitor map...</p>
              </div>
            </div>
          ) : (
            <div ref={mapRef} className="relative h-[600px] bg-gradient-to-br from-blue-50 to-indigo-50">
              {/* SVG Map */}
              <svg viewBox="0 0 2000 1000" className="w-full h-full">
                {/* Background */}
                <rect width="2000" height="1000" fill="url(#oceanGradient)" />
                
                <defs>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#e0f2fe', stopOpacity: 1}} />
                    <stop offset="100%" style={{stopColor: '#bfdbfe', stopOpacity: 1}} />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Simplified continents */}
                <g opacity="0.4">
                  {/* North America */}
                  <ellipse cx="300" cy="250" rx="180" ry="140" fill="#94a3b8" />
                  {/* South America */}
                  <ellipse cx="400" cy="550" rx="120" ry="180" fill="#94a3b8" />
                  {/* Europe */}
                  <ellipse cx="900" cy="200" rx="150" ry="100" fill="#94a3b8" />
                  {/* Africa */}
                  <ellipse cx="950" cy="500" rx="140" ry="200" fill="#94a3b8" />
                  {/* Asia */}
                  <ellipse cx="1400" cy="300" rx="280" ry="200" fill="#94a3b8" />
                  {/* Australia */}
                  <ellipse cx="1600" cy="650" rx="120" ry="100" fill="#94a3b8" />
                </g>

                {/* Grid lines */}
                <g stroke="#cbd5e1" strokeWidth="1" opacity="0.3">
                  {[...Array(10)].map((_, i) => (
                    <line key={`v${i}`} x1={i * 200} y1="0" x2={i * 200} y2="1000" />
                  ))}
                  {[...Array(5)].map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 200} x2="2000" y2={i * 200} />
                  ))}
                </g>

                {/* Visitor markers */}
                {visitors.map((visitor) => {
                  const point = latLngToPoint(visitor.lat, visitor.lng);
                  const DeviceIcon = getDeviceIcon(visitor.device);
                  const color = getMarkerColor(visitor);
                  
                  return (
                    <g
                      key={visitor.id}
                      transform={`translate(${point.x}, ${point.y})`}
                      onClick={() => setSelectedVisitor(visitor)}
                      className="cursor-pointer hover:opacity-80 transition-opacity"
                      filter={visitor.isActive ? "url(#glow)" : ""}
                    >
                      {/* Pulse animation for active visitors */}
                      {visitor.isActive && (
                        <>
                          <circle r="15" fill={color} opacity="0.3">
                            <animate attributeName="r" from="8" to="25" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.5" to="0" dur="2s" repeatCount="indefinite" />
                          </circle>
                          <circle r="12" fill={color} opacity="0.4">
                            <animate attributeName="r" from="8" to="20" dur="2s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                          </circle>
                        </>
                      )}
                      
                      {/* Main marker */}
                      <circle r="8" fill={color} stroke="white" strokeWidth="2" />
                      <circle r="3" fill="white" />
                    </g>
                  );
                })}
              </svg>

              {/* Visitor Details Popup */}
              <AnimatePresence>
                {selectedVisitor && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute top-4 right-4 bg-white rounded-xl shadow-2xl p-6 w-80 border-2 border-gray-200"
                  >
                    <button
                      onClick={() => setSelectedVisitor(null)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                    >
                      ✕
                    </button>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <h3 className="font-bold text-lg">Visitor Details</h3>
                        </div>
                        {selectedVisitor.isActive && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            <Radio className="w-3 h-3 animate-pulse" />
                            Active Now
                          </span>
                        )}
                      </div>

                      <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">Location:</span>
                          <span>{selectedVisitor.city}, {selectedVisitor.country}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {(() => {
                            const DeviceIcon = getDeviceIcon(selectedVisitor.device);
                            return <DeviceIcon className="w-4 h-4 text-gray-400" />;
                          })()}
                          <span className="font-semibold">Device:</span>
                          <span className="capitalize">{selectedVisitor.device}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Monitor className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">Browser:</span>
                          <span>{selectedVisitor.browser} ({selectedVisitor.os})</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">Page Views:</span>
                          <span>{selectedVisitor.pageViews}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="font-semibold">Duration:</span>
                          <span>{Math.floor(selectedVisitor.duration / 60)}m {selectedVisitor.duration % 60}s</span>
                        </div>

                        {selectedVisitor.currentPage && (
                          <div className="pt-3 border-t border-gray-200">
                            <p className="font-semibold text-gray-700 mb-1">Current Page:</p>
                            <p className="text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded truncate">
                              {selectedVisitor.currentPage}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200">
                <h4 className="font-bold text-sm mb-3">Legend</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>Desktop (Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-green-500"></div>
                    <span>Mobile (Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span>Tablet (Active)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                    <span>Inactive</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisitorMap;
