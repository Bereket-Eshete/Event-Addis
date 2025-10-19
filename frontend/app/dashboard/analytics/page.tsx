"use client";

import {
  TrendingUp,
  Users,
  Calendar,
  DollarSign,
  Eye,
  Ticket,
  MapPin,
  Clock,
} from "lucide-react";

const analyticsData = {
  overview: {
    totalEvents: 12,
    totalAttendees: 1234,
    totalRevenue: 144970,
    avgTicketPrice: 650,
    conversionRate: 15.2,
    popularCategory: "Technology",
  },
  monthlyData: [
    { month: "Jan", events: 2, attendees: 180, revenue: 22500 },
    { month: "Feb", events: 1, attendees: 95, revenue: 11400 },
    { month: "Mar", events: 3, attendees: 245, revenue: 29400 },
    { month: "Apr", events: 2, attendees: 156, revenue: 18720 },
    { month: "May", events: 1, attendees: 89, revenue: 10680 },
    { month: "Jun", events: 3, attendees: 289, revenue: 34680 },
  ],
  topEvents: [
    {
      name: "Business Networking Event",
      attendees: 289,
      revenue: 34680,
      category: "Business",
    },
    {
      name: "Tech Startup Workshop",
      attendees: 245,
      revenue: 29400,
      category: "Technology",
    },
    {
      name: "Cultural Heritage Exhibition",
      attendees: 180,
      revenue: 22500,
      category: "Culture",
    },
  ],
  categoryBreakdown: [
    { category: "Technology", events: 5, percentage: 42 },
    { category: "Business", events: 3, percentage: 25 },
    { category: "Culture", events: 2, percentage: 17 },
    { category: "Workshop", events: 2, percentage: 16 },
  ],
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Analytics Dashboard</h1>
        <p className="mt-1 text-muted">
          Insights and performance metrics for your events
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Events</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {analyticsData.overview.totalEvents}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-sm text-muted">+2 this month</span>
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Attendees</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {analyticsData.overview.totalAttendees.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-sm text-muted">+15% growth</span>
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Revenue</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {analyticsData.overview.totalRevenue.toLocaleString()} ETB
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
            <span className="text-sm text-muted">+12% from last month</span>
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Conversion Rate</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {analyticsData.overview.conversionRate}%
              </p>
            </div>
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-amber-100">
              <TrendingUp className="w-6 h-6 text-amber-600" />
            </div>
          </div>
          <div className="flex items-center mt-4">
            <span className="text-sm text-muted">Views to bookings</span>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Performance */}
        <div className="p-6 card">
          <h2 className="mb-6 text-xl font-bold text-primary">
            Monthly Performance
          </h2>
          <div className="space-y-4">
            {analyticsData.monthlyData.map((month, index) => (
              <div
                key={month.month}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 text-sm font-medium text-primary">
                    {month.month}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted">
                        {month.events} events
                      </span>
                      <span className="text-sm font-medium text-primary">
                        {month.attendees} attendees
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-2 rounded-full bg-primary"
                        style={{ width: `${(month.attendees / 300) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-primary">
                    {month.revenue.toLocaleString()} ETB
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="p-6 card">
          <h2 className="mb-6 text-xl font-bold text-primary">
            Event Categories
          </h2>
          <div className="space-y-4">
            {analyticsData.categoryBreakdown.map((category) => (
              <div
                key={category.category}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="font-medium text-primary">
                    {category.category}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-muted">
                    {category.events} events
                  </span>
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-8 text-sm font-medium text-primary">
                    {category.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performing Events */}
      <div className="p-6 card">
        <h2 className="mb-6 text-xl font-bold text-primary">
          Top Performing Events
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b bg-surface border-muted">
              <tr>
                <th className="px-4 py-3 font-medium text-left text-primary">
                  Event Name
                </th>
                <th className="px-4 py-3 font-medium text-left text-primary">
                  Category
                </th>
                <th className="px-4 py-3 font-medium text-left text-primary">
                  Attendees
                </th>
                <th className="px-4 py-3 font-medium text-left text-primary">
                  Revenue
                </th>
                <th className="px-4 py-3 font-medium text-left text-primary">
                  Avg. Ticket Price
                </th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topEvents.map((event, index) => (
                <tr
                  key={index}
                  className="border-b border-muted hover:bg-surface/50"
                >
                  <td className="px-4 py-3">
                    <div className="font-medium text-primary">{event.name}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {event.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1 text-muted" />
                      <span className="text-primary">{event.attendees}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-primary">
                      {event.revenue.toLocaleString()} ETB
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-primary">
                      {Math.round(event.revenue / event.attendees)} ETB
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="p-6 text-center card">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
            <Eye className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Page Views
          </h3>
          <p className="text-2xl font-bold text-primary">8,124</p>
          <p className="mt-1 text-sm text-muted">Total event page views</p>
        </div>

        <div className="p-6 text-center card">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
            <Ticket className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Avg. Ticket Price
          </h3>
          <p className="text-2xl font-bold text-primary">
            {analyticsData.overview.avgTicketPrice} ETB
          </p>
          <p className="mt-1 text-sm text-muted">Across all events</p>
        </div>

        <div className="p-6 text-center card">
          <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
            <MapPin className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-primary">
            Popular Category
          </h3>
          <p className="text-2xl font-bold text-primary">
            {analyticsData.overview.popularCategory}
          </p>
          <p className="mt-1 text-sm text-muted">Most booked category</p>
        </div>
      </div>
    </div>
  );
}
