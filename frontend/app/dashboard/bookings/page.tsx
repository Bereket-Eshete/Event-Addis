"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Download,
  CheckCircle,
  Clock,
  Users,
  Mail,
  Phone,
  Loader,
} from "lucide-react";
import { dashboardAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [checkInFilter, setCheckInFilter] = useState("all");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  useEffect(() => {
    fetchBookings();
  }, [pagination.page]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await dashboardAPI.getOrganizerBookings({ 
        page: pagination.page, 
        limit: 10 
      });
      setBookings(response.data.bookings);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total
      });
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  // Get unique events from bookings
  const uniqueEvents = Array.from(
    new Set(bookings.map((booking: any) => booking.event?.title).filter(Boolean))
  );
  const events = ['All Events', ...uniqueEvents];

  const filteredBookings = bookings.filter((booking: any) => {
    const matchesSearch =
      booking.user?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent = selectedEvent === 'All Events' || booking.event?.title === selectedEvent;
    return matchesSearch && matchesEvent;
  });

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "free":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCheckInStatusColor = (status: string) => {
    switch (status) {
      case "checked-in":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCheckIn = (bookingId: number) => {
    // TODO: Implement check-in functionality
    console.log("Check in booking:", bookingId);
  };

  const handleDownloadList = () => {
    // TODO: Implement download functionality
    console.log("Download attendee list");
  };

  // Calculate summary stats
  const totalAttendees = filteredBookings.length;
  const checkedInCount = filteredBookings.filter(
    (b) => b.checkInStatus === "checked-in"
  ).length;
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">
            Bookings & Attendees
          </h1>
          <p className="mt-1 text-muted">
            Manage event attendees and check-ins
          </p>
        </div>
        <button
          onClick={handleDownloadList}
          className="flex items-center px-4 py-2 mt-4 space-x-2 rounded-lg btn-primary sm:mt-0"
        >
          <Download className="w-5 h-5" />
          <span>Download List</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Attendees</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {totalAttendees}
              </p>
            </div>
            <Users className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Checked In</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {checkedInCount}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-green-500 rounded-full"
                style={{
                  width: `${
                    totalAttendees > 0
                      ? (checkedInCount / totalAttendees) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Revenue</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {totalRevenue.toLocaleString()} ETB
              </p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <span className="font-bold text-primary">$</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search attendees..."
              className="w-full py-2 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
            />
          </div>

          {/* Event Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            suppressHydrationWarning
          >
            {events.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>

          {/* Payment Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            suppressHydrationWarning
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="free">Free</option>
          </select>

          {/* Check-in Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={checkInFilter}
            onChange={(e) => setCheckInFilter(e.target.value)}
            suppressHydrationWarning
          >
            <option value="all">All Status</option>
            <option value="checked-in">Checked In</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-hidden card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted">Loading bookings...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-surface border-muted">
                <tr>
                  <th className="px-6 py-4 font-medium text-left text-primary">
                    Attendee
                  </th>
                  <th className="px-6 py-4 font-medium text-left text-primary">
                    Event
                  </th>
                  <th className="px-6 py-4 font-medium text-left text-primary">
                    Amount
                  </th>
                  <th className="px-6 py-4 font-medium text-left text-primary">
                    Status
                  </th>
                  <th className="px-6 py-4 font-medium text-left text-primary">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking: any) => (
                  <tr
                    key={booking._id}
                    className="border-b border-muted hover:bg-surface/50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <div className="font-medium text-primary">
                          {booking.user?.fullName || 'Unknown User'}
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted">
                          <Mail className="w-3 h-3 mr-1" />
                          {booking.user?.email || 'No email'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-primary">
                        {booking.event?.title || 'Unknown Event'}
                      </div>
                      <div className="text-sm text-muted">
                        {booking.event?.location || 'No location'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-primary">
                        {booking.totalAmount || 0} ETB
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-muted">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {filteredBookings.length === 0 && (
        <div className="py-12 text-center">
          <Users className="w-12 h-12 mx-auto mb-4 text-muted" />
          <h3 className="mb-2 text-lg font-medium text-primary">
            No bookings found
          </h3>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
