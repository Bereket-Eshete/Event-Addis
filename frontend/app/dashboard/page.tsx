"use client";

import { useState, useEffect } from 'react';
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
  Loader,
} from "lucide-react";
import { dashboardAPI } from '@/lib/api';
import { useAuth } from '@/lib/auth';
import toast from 'react-hot-toast';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalEvents: 0,
    activeEvents: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, eventsResponse] = await Promise.all([
        dashboardAPI.getOrganizerStats(),
        dashboardAPI.getOrganizerEvents({ limit: 5 })
      ]);
      
      setStats(statsResponse.data);
      setRecentEvents(eventsResponse.data.events);
    } catch (error: any) {
      toast.error('Failed to load dashboard data');
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statsCards = [
    {
      name: "Total Events",
      value: loading ? "..." : stats.totalEvents.toString(),
      icon: Calendar,
      change: "All time",
    },
    {
      name: "Active Events",
      value: loading ? "..." : stats.activeEvents.toString(),
      icon: Clock,
      change: "Currently active"
    },
    {
      name: "Total Bookings",
      value: loading ? "..." : stats.totalBookings.toString(),
      icon: Ticket,
      change: "All events",
    },
    {
      name: "Total Revenue",
      value: loading ? "..." : `${stats.totalRevenue} ETB`,
      icon: DollarSign,
      change: "Total earned",
    },
  ];
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Welcome back, {user?.fullName || 'Organizer'} 👋
        </h1>
        <p className="mt-2 text-muted">
          Here&apos;s what&apos;s happening with your events today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat) => {
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
          href="/dashboard/events/create"
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
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted">Loading events...</span>
            </div>
          ) : recentEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 mx-auto text-muted mb-4" />
              <p className="text-muted">No events found. Create your first event!</p>
              <Link href="/dashboard/events/create" className="btn-primary px-4 py-2 rounded-lg mt-4 inline-block">
                Create Event
              </Link>
            </div>
          ) : (
            recentEvents.map((event: any) => (
              <div
                key={event._id}
                className="flex items-center justify-between p-4 transition-colors border rounded-lg border-muted hover:bg-surface/50"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{event.title}</h3>
                  <div className="flex items-center mt-1 space-x-4 text-sm text-muted">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(event.startAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.venue}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="flex items-center text-muted">
                      <Users className="w-4 h-4 mr-1" />
                      {event.capacity || 0}
                    </div>
                    <div className="text-xs text-muted">capacity</div>
                  </div>

                  <div className="text-center">
                    <div className="font-semibold text-primary">
                      {event.price} ETB
                    </div>
                    <div className="text-xs text-muted">price</div>
                  </div>

                  <div className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Upcoming Timeline */}
      <div className="p-6 card">
        <h2 className="mb-6 text-xl font-bold text-primary">
          Upcoming Events Timeline
        </h2>
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <Loader className="w-5 h-5 animate-spin text-primary" />
              <span className="ml-2 text-muted">Loading timeline...</span>
            </div>
          ) : recentEvents.filter((event: any) => new Date(event.startAt) > new Date()).length === 0 ? (
            <p className="text-center text-muted py-4">No upcoming events scheduled</p>
          ) : (
            recentEvents
              .filter((event: any) => new Date(event.startAt) > new Date())
              .slice(0, 3)
              .map((event: any, index: number) => (
                <div key={event._id} className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-primary' : 'bg-accent'}`}></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-primary">
                        {event.title}
                      </span>
                      <span className="text-sm text-muted">
                        {new Date(event.startAt).toLocaleDateString()}, {new Date(event.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                    <p className="text-sm text-muted">
                      {event.capacity} capacity • {event.venue}
                    </p>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
