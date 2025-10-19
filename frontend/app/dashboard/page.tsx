"use client";

import Link from "next/link";
import {
  Calendar,
  Users,
  Ticket,
  DollarSign,
  Plus,
  TrendingUp,
  Clock,
  MapPin,
} from "lucide-react";

const stats = [
  {
    name: "Total Events",
    value: "12",
    icon: Calendar,
    change: "+2 this month",
  },
  { name: "Upcoming Events", value: "5", icon: Clock, change: "Next: Dec 15" },
  {
    name: "Total Tickets Sold",
    value: "1,234",
    icon: Ticket,
    change: "+15% from last month",
  },
  {
    name: "Total Revenue",
    value: "45,670 ETB",
    icon: DollarSign,
    change: "+12% from last month",
  },
];

const recentEvents = [
  {
    id: 1,
    name: "Tech Startup Workshop",
    date: "Dec 18, 2024",
    location: "iCog Labs",
    attendees: 45,
    revenue: "22,500 ETB",
    status: "upcoming",
  },
  {
    id: 2,
    name: "Business Networking Event",
    date: "Dec 20, 2024",
    location: "Sheraton Addis",
    attendees: 89,
    revenue: "106,800 ETB",
    status: "upcoming",
  },
  {
    id: 3,
    name: "Cultural Heritage Exhibition",
    date: "Nov 28, 2024",
    location: "National Museum",
    attendees: 156,
    revenue: "0 ETB",
    status: "completed",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Welcome back, Bereket 👋
        </h1>
        <p className="mt-2 text-muted">
          Here&apos;s what&apos;s happening with your events today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="p-6 transition-shadow card hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted">{stat.name}</p>
                  <p className="mt-1 text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
                </div>
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" />
                <span className="text-sm text-muted">{stat.change}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/dashboard/events/new"
          className="flex items-center justify-center flex-1 px-6 py-3 space-x-2 rounded-lg btn-primary sm:flex-none"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Event</span>
        </Link>
        <Link
          href="/dashboard/events"
          className="flex items-center justify-center flex-1 px-6 py-3 space-x-2 transition-colors border-2 rounded-lg border-primary text-primary hover:bg-primary hover:text-white sm:flex-none"
        >
          <Calendar className="w-5 h-5" />
          <span>View All Events</span>
        </Link>
      </div>

      {/* Recent Events */}
      <div className="p-6 card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Recent Events</h2>
          <Link
            href="/dashboard/events"
            className="font-medium text-accent hover:text-primary"
          >
            View all
          </Link>
        </div>

        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between p-4 transition-colors border rounded-lg border-muted hover:bg-surface/50"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{event.name}</h3>
                <div className="flex items-center mt-1 space-x-4 text-sm text-muted">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center text-muted">
                    <Users className="w-4 h-4 mr-1" />
                    {event.attendees}
                  </div>
                  <div className="text-xs text-muted">attendees</div>
                </div>

                <div className="text-center">
                  <div className="font-semibold text-primary">
                    {event.revenue}
                  </div>
                  <div className="text-xs text-muted">revenue</div>
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    event.status === "upcoming"
                      ? "bg-blue-100 text-blue-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {event.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Timeline */}
      <div className="p-6 card">
        <h2 className="mb-6 text-xl font-bold text-primary">
          Upcoming Events Timeline
        </h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full bg-primary"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">
                  Tech Startup Workshop
                </span>
                <span className="text-sm text-muted">Dec 18, 2:00 PM</span>
              </div>
              <p className="text-sm text-muted">45 registered • iCog Labs</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 rounded-full bg-accent"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">
                  Business Networking Event.
                </span>
                <span className="text-sm text-muted">Dec 21, 6:00 PM</span>
              </div>
              <p className="text-sm text-muted">
                89 registered • Sheraton Addis
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
