"use client";

import { useState } from "react";
import {
  Search,
  Download,
  CheckCircle,
  Clock,
  Users,
  Mail,
  Phone,
} from "lucide-react";

const bookings = [
  {
    id: 1,
    eventName: "Tech Startup Workshop",
    attendeeName: "Meron Tadesse",
    email: "meron12@email.com",
    phone: "+251911123456",
    ticketType: "Regular",
    paymentStatus: "paid",
    checkInStatus: "checked-in",
    bookingDate: "2024-12-10",
    amount: 500,
  },
  {
    id: 2,
    eventName: "Tech Startup Workshop",
    attendeeName: "Daniel Bekele",
    email: "daniel.bekele@email.com",
    phone: "+251922234567",
    ticketType: "VIP",
    paymentStatus: "paid",
    checkInStatus: "pending",
    bookingDate: "2024-12-12",
    amount: 800,
  },
  {
    id: 3,
    eventName: "Business Networking Event",
    attendeeName: "Sara Mohammed",
    email: "sara.mohammed@email.com",
    phone: "+251933345678",
    ticketType: "Regular",
    paymentStatus: "pending",
    checkInStatus: "pending",
    bookingDate: "2024-12-14",
    amount: 1200,
  },
  {
    id: 4,
    eventName: "Cultural Heritage Exhibition",
    attendeeName: "Yohannes Alemu",
    email: "yohannesalemu@email.com",
    phone: "+251944456789",
    ticketType: "Free",
    paymentStatus: "free",
    checkInStatus: "checked-in",
    bookingDate: "2024-11-25",
    amount: 0,
  },
];

const events = [
  "All Events",
  "Tech Startup Workshop",
  "Business Networking Event",
  "Cultural Heritage Exhibition",
];

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [paymentFilter, setPaymentFilter] = useState("all");
  const [checkInFilter, setCheckInFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEvent =
      selectedEvent === "All Events" || booking.eventName === selectedEvent;
    const matchesPayment =
      paymentFilter === "all" || booking.paymentStatus === paymentFilter;
    const matchesCheckIn =
      checkInFilter === "all" || booking.checkInStatus === checkInFilter;

    return matchesSearch && matchesEvent && matchesPayment && matchesCheckIn;
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
            />
          </div>

          {/* Event Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
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
          >
            <option value="all">All Status</option>
            <option value="checked-in">Checked In</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="overflow-hidden card">
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
                  Ticket Type
                </th>
                <th className="px-6 py-4 font-medium text-left text-primary">
                  Payment
                </th>
                <th className="px-6 py-4 font-medium text-left text-primary">
                  Check-in
                </th>
                <th className="px-6 py-4 font-medium text-left text-primary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-muted hover:bg-surface/50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-primary">
                        {booking.attendeeName}
                      </div>
                      <div className="flex items-center mt-1 text-sm text-muted">
                        <Mail className="w-3 h-3 mr-1" />
                        {booking.email}
                      </div>
                      <div className="flex items-center text-sm text-muted">
                        <Phone className="w-3 h-3 mr-1" />
                        {booking.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-primary">
                      {booking.eventName}
                    </div>
                    <div className="text-sm text-muted">
                      Booked:{" "}
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-primary">
                      {booking.ticketType}
                    </span>
                    {booking.amount > 0 && (
                      <div className="text-sm text-muted">
                        {booking.amount} ETB
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(
                        booking.paymentStatus
                      )}`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getCheckInStatusColor(
                        booking.checkInStatus
                      )}`}
                    >
                      {booking.checkInStatus === "checked-in"
                        ? "Checked In"
                        : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {booking.checkInStatus === "pending" && (
                      <button
                        onClick={() => handleCheckIn(booking.id)}
                        className="flex items-center px-3 py-1 space-x-1 text-sm rounded-lg btn-primary"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span>Check In</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
