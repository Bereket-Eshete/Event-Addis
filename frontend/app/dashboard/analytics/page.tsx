"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Ticket,
  MapPin,
  Clock,
  Loader,
} from "lucide-react";
import { dashboardAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState({
    bookingsOverTime: [],
    revenueByEvent: [],
    period: '30d'
  });
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [period]);

  // Auto-refresh functionality
  useEffect(() => {
    const handleFocus = () => {
      fetchAnalyticsData();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchAnalyticsData();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchAnalyticsData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const [statsResponse, analyticsResponse] = await Promise.all([
        dashboardAPI.getOrganizerStats(),
        dashboardAPI.getOrganizerAnalytics(period)
      ]);
      
      setStats(statsResponse.data);
      setAnalyticsData(analyticsResponse.data);
    } catch (error: any) {
      if (error.response?.status !== 401) {
        toast.error('Failed to load analytics data');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
          <p className="mt-1 text-muted">
            Insights and performance metrics for your events
          </p>
        </div>
        <select
          className="px-4 py-2 mt-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary sm:mt-0"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2 text-muted">Loading analytics...</span>
        </div>
      ) : (
        <>
          {/* KPI Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">Total Events</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {stats.totalEvents}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm text-muted">All time</span>
              </div>
            </div>

            <div className="p-6 card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">Total Bookings</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {stats.totalBookings.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm text-muted">All events</span>
              </div>
            </div>

            <div className="p-6 card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">Total Revenue</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {stats.totalRevenue.toLocaleString()} ETB
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm text-muted">Total earned</span>
              </div>
            </div>

            <div className="p-6 card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">Active Events</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {stats.activeEvents}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <span className="text-sm text-muted">Currently active</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Bookings Over Time */}
            <div className="p-6 card">
              <h2 className="mb-6 text-xl font-bold text-primary">
                Bookings Over Time ({period})
              </h2>
              <div className="space-y-4">
                {analyticsData.bookingsOverTime.length === 0 ? (
                  <p className="text-center text-muted py-8">No booking data available for this period</p>
                ) : (
                  analyticsData.bookingsOverTime.map((day: any, index: number) => {
                    const maxCount = Math.max(...analyticsData.bookingsOverTime.map((d: any) => d.count));
                    return (
                      <div
                        key={day._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-16 text-sm font-medium text-primary">
                            {new Date(day._id).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-muted">
                                {day.count} bookings
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div
                                className="h-2 rounded-full bg-primary"
                                style={{ width: `${maxCount > 0 ? (day.count / maxCount) * 100 : 0}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-primary">
                            {(day.revenue || 0).toLocaleString()} ETB
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Revenue by Event */}
            <div className="p-6 card">
              <h2 className="mb-6 text-xl font-bold text-primary">
                Top Revenue Events ({period})
              </h2>
              <div className="space-y-4">
                {analyticsData.revenueByEvent.length === 0 ? (
                  <p className="text-center text-muted py-8">No revenue data available for this period</p>
                ) : (
                  analyticsData.revenueByEvent.map((event: any) => {
                    const maxRevenue = Math.max(...analyticsData.revenueByEvent.map((e: any) => e.revenue));
                    return (
                      <div
                        key={event._id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-4 h-4 rounded-full bg-primary"></div>
                          <span className="font-medium text-primary">
                            {event.eventTitle?.[0] || 'Unknown Event'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-muted">
                            {event.bookings} bookings
                          </span>
                          <div className="w-20 h-2 bg-gray-200 rounded-full">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${maxRevenue > 0 ? (event.revenue / maxRevenue) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="w-20 text-sm font-medium text-primary text-right">
                            {event.revenue.toLocaleString()} ETB
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* Top Performing Events */}
          <div className="p-6 card">
            <h2 className="mb-6 text-xl font-bold text-primary">
              Top Performing Events ({period})
            </h2>
            <div className="overflow-x-auto">
              {analyticsData.revenueByEvent.length === 0 ? (
                <p className="text-center text-muted py-8">No event performance data available for this period</p>
              ) : (
                <table className="w-full">
                  <thead className="border-b bg-surface border-muted">
                    <tr>
                      <th className="px-4 py-3 font-medium text-left text-primary">
                        Event Name
                      </th>
                      <th className="px-4 py-3 font-medium text-left text-primary">
                        Bookings
                      </th>
                      <th className="px-4 py-3 font-medium text-left text-primary">
                        Revenue
                      </th>
                      <th className="px-4 py-3 font-medium text-left text-primary">
                        Avg. Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {analyticsData.revenueByEvent.map((event: any, index: number) => (
                      <tr
                        key={event._id}
                        className="border-b border-muted hover:bg-surface/50"
                      >
                        <td className="px-4 py-3">
                          <div className="font-medium text-primary">
                            {event.eventTitle?.[0] || 'Unknown Event'}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-muted" />
                            <span className="text-primary">{event.bookings}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-primary">
                            {event.revenue.toLocaleString()} ETB
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-primary">
                            {event.bookings > 0 ? Math.round(event.revenue / event.bookings) : 0} ETB
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="p-6 text-center card">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Period
              </h3>
              <p className="text-2xl font-bold text-primary">{period}</p>
              <p className="mt-1 text-sm text-muted">Analysis period</p>
            </div>

            <div className="p-6 text-center card">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <Ticket className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Avg. Revenue
              </h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalBookings > 0 ? Math.round(stats.totalRevenue / stats.totalBookings) : 0} ETB
              </p>
              <p className="mt-1 text-sm text-muted">Per booking</p>
            </div>

            <div className="p-6 text-center card">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
                <DollarSign className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-primary">
                Revenue Rate
              </h3>
              <p className="text-2xl font-bold text-primary">
                {stats.totalEvents > 0 ? Math.round(stats.totalRevenue / stats.totalEvents) : 0} ETB
              </p>
              <p className="mt-1 text-sm text-muted">Per event</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
