"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  DollarSign,
} from "lucide-react";

const events = [
  {
    id: 1,
    name: "Tech Startup Workshop",
    date: "2024-12-18",
    time: "14:00",
    location: "iCog Labs",
    status: "upcoming",
    visibility: "public",
    ticketsSold: 45,
    totalTickets: 100,
    revenue: 22500,
    category: "Workshop",
  },
  {
    id: 2,
    name: "Business Networking Event",
    date: "2024-12-20",
    time: "18:00",
    location: "Sheraton Addis",
    status: "upcoming",
    visibility: "public",
    ticketsSold: 89,
    totalTickets: 150,
    revenue: 106800,
    category: "Business",
  },
  {
    id: 3,
    name: "Cultural Heritage Exhibition",
    date: "2024-11-28",
    time: "10:00",
    location: "National Museum",
    status: "completed",
    visibility: "public",
    ticketsSold: 156,
    totalTickets: 200,
    revenue: 0,
    category: "Culture",
  },
  {
    id: 4,
    name: "Private Company Meeting",
    date: "2024-12-25",
    time: "09:00",
    location: "Office Conference Room",
    status: "upcoming",
    visibility: "private",
    ticketsSold: 25,
    totalTickets: 30,
    revenue: 0,
    category: "Meeting",
  },
];

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || event.status === statusFilter;
    const matchesVisibility =
      visibilityFilter === "all" || event.visibility === visibilityFilter;
    return matchesSearch && matchesStatus && matchesVisibility;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Events Management</h1>
          <p className="mt-1 text-muted">Create and manage your events</p>
        </div>
        <Link
          href="/dashboard/events/new"
          className="flex items-center px-4 py-2 mt-4 space-x-2 rounded-lg btn-primary sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="p-6 card">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full py-2 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Visibility Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="p-6 transition-shadow card hover:shadow-lg"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              {/* Event Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {event.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        event.status
                      )}`}
                    >
                      {event.status}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        event.visibility === "public"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {event.visibility}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center text-muted">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(event.date).toLocaleDateString()} at{" "}
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-center text-muted">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-muted">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {event.ticketsSold}/{event.totalTickets} tickets
                    </span>
                  </div>
                  <div className="flex items-center text-muted">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{event.revenue.toLocaleString()} ETB.</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center mt-4 space-x-2 lg:mt-0 lg:ml-6">
                <button className="p-2 transition-colors rounded-lg text-primary hover:bg-surface">
                  <Eye className="w-5 h-5" />
                </button>
                <button className="p-2 transition-colors rounded-lg text-primary hover:bg-surface">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-1 text-sm text-muted">
                <span>Ticket Sales Progress</span>
                <span>
                  {Math.round((event.ticketsSold / event.totalTickets) * 100)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div
                  className="h-2 transition-all duration-300 rounded-full bg-primary"
                  style={{
                    width: `${(event.ticketsSold / event.totalTickets) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-12 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted" />
          <h3 className="mb-2 text-lg font-medium text-primary">
            No events found
          </h3>
          <p className="mb-4 text-muted">
            Try adjusting your search or filters
          </p>
          <Link
            href="/dashboard/events/new"
            className="inline-flex items-center px-4 py-2 space-x-2 rounded-lg btn-primary"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Event</span>
          </Link>
        </div>
      )}
    </div>
  );
}
