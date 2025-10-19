"use client"

import { useState } from 'react'
import { Search, Download, CheckCircle, Clock, Users, Mail, Phone } from 'lucide-react'

const bookings = [
  {
    id: 1,
    eventName: 'Tech Startup Workshop',
    attendeeName: 'Meron Tadesse',
    email: 'meron.tadesse@email.com',
    phone: '+251911123456',
    ticketType: 'Regular',
    paymentStatus: 'paid',
    checkInStatus: 'checked-in',
    bookingDate: '2024-12-10',
    amount: 500
  },
  {
    id: 2,
    eventName: 'Tech Startup Workshop',
    attendeeName: 'Daniel Bekele',
    email: 'daniel.bekele@email.com',
    phone: '+251922234567',
    ticketType: 'VIP',
    paymentStatus: 'paid',
    checkInStatus: 'pending',
    bookingDate: '2024-12-12',
    amount: 800
  },
  {
    id: 3,
    eventName: 'Business Networking Event',
    attendeeName: 'Sara Mohammed',
    email: 'sara.mohammed@email.com',
    phone: '+251933345678',
    ticketType: 'Regular',
    paymentStatus: 'pending',
    checkInStatus: 'pending',
    bookingDate: '2024-12-14',
    amount: 1200
  },
  {
    id: 4,
    eventName: 'Cultural Heritage Exhibition',
    attendeeName: 'Yohannes Alemu',
    email: 'yohannes.alemu@email.com',
    phone: '+251944456789',
    ticketType: 'Free',
    paymentStatus: 'free',
    checkInStatus: 'checked-in',
    bookingDate: '2024-11-25',
    amount: 0
  }
]

const events = ['All Events', 'Tech Startup Workshop', 'Business Networking Event', 'Cultural Heritage Exhibition']

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState('All Events')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [checkInFilter, setCheckInFilter] = useState('all')

  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = booking.attendeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesEvent = selectedEvent === 'All Events' || booking.eventName === selectedEvent
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter
    const matchesCheckIn = checkInFilter === 'all' || booking.checkInStatus === checkInFilter
    
    return matchesSearch && matchesEvent && matchesPayment && matchesCheckIn
  })

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'free': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCheckInStatusColor = (status: string) => {
    switch (status) {
      case 'checked-in': return 'bg-green-100 text-green-800'
      case 'pending': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const handleCheckIn = (bookingId: number) => {
    // TODO: Implement check-in functionality
    console.log('Check in booking:', bookingId)
  }

  const handleDownloadList = () => {
    // TODO: Implement download functionality
    console.log('Download attendee list')
  }

  // Calculate summary stats
  const totalAttendees = filteredBookings.length
  const checkedInCount = filteredBookings.filter(b => b.checkInStatus === 'checked-in').length
  const totalRevenue = filteredBookings.reduce((sum, b) => sum + b.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Bookings & Attendees</h1>
          <p className="text-muted mt-1">Manage event attendees and check-ins</p>
        </div>
        <button 
          onClick={handleDownloadList}
          className="btn-primary px-4 py-2 rounded-lg flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <Download className="h-5 w-5" />
          <span>Download List</span>
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Total Attendees</p>
              <p className="text-2xl font-bold text-primary mt-1">{totalAttendees}</p>
            </div>
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Checked In</p>
              <p className="text-2xl font-bold text-primary mt-1">{checkedInCount}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${totalAttendees > 0 ? (checkedInCount / totalAttendees) * 100 : 0}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-primary mt-1">{totalRevenue.toLocaleString()} ETB</p>
            </div>
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">₿</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="relative lg:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted" />
            <input
              type="text"
              placeholder="Search attendees..."
              className="w-full pl-10 pr-4 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Event Filter */}
          <select
            className="px-4 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
          >
            {events.map(event => (
              <option key={event} value={event}>{event}</option>
            ))}
          </select>

          {/* Payment Filter */}
          <select
            className="px-4 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="px-4 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
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
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface border-b border-muted">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-primary">Attendee</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Event</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Ticket Type</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Payment</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Check-in</th>
                <th className="text-left py-4 px-6 font-medium text-primary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="border-b border-muted hover:bg-surface/50">
                  <td className="py-4 px-6">
                    <div>
                      <div className="font-medium text-primary">{booking.attendeeName}</div>
                      <div className="text-sm text-muted flex items-center mt-1">
                        <Mail className="h-3 w-3 mr-1" />
                        {booking.email}
                      </div>
                      <div className="text-sm text-muted flex items-center">
                        <Phone className="h-3 w-3 mr-1" />
                        {booking.phone}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-medium text-primary">{booking.eventName}</div>
                    <div className="text-sm text-muted">Booked: {new Date(booking.bookingDate).toLocaleDateString()}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-medium text-primary">{booking.ticketType}</span>
                    {booking.amount > 0 && (
                      <div className="text-sm text-muted">{booking.amount} ETB</div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(booking.paymentStatus)}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCheckInStatusColor(booking.checkInStatus)}`}>
                      {booking.checkInStatus === 'checked-in' ? 'Checked In' : 'Pending'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {booking.checkInStatus === 'pending' && (
                      <button
                        onClick={() => handleCheckIn(booking.id)}
                        className="btn-primary px-3 py-1 text-sm rounded-lg flex items-center space-x-1"
                      >
                        <CheckCircle className="h-4 w-4" />
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
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted mx-auto mb-4" />
          <h3 className="text-lg font-medium text-primary mb-2">No bookings found</h3>
          <p className="text-muted">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}