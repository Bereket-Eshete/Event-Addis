"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Calendar, Ticket, DollarSign, Heart, Search, Clock, MapPin, Users, Loader } from 'lucide-react'
import { dashboardAPI, eventsAPI } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import toast from 'react-hot-toast'







export default function UserDashboardPage() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    upcomingEvents: 0,
    favoriteEvents: 0,
    totalSpent: 0,
  })
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [recommendedEvents, setRecommendedEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        toast.error('Please login to continue')
        window.location.href = '/login'
        return
      }

      const [statsResponse, bookingsResponse, eventsResponse] = await Promise.all([
        dashboardAPI.getUserStats(),
        dashboardAPI.getUserBookings({ limit: 10 }),
        eventsAPI.getAllEvents({ limit: 10 })
      ])
      
      setStats(statsResponse.data)
      const bookings = bookingsResponse.data.bookings
      setUpcomingEvents(bookings.slice(0, 3))
      
      // Filter out events user already booked
      const bookedEventIds = bookings.map((booking: any) => booking.eventId?._id)
      const availableEvents = (eventsResponse.data.events || eventsResponse.data)
        .filter((event: any) => !bookedEventIds.includes(event._id))
      setRecommendedEvents(availableEvents.slice(0, 2))
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again')
        localStorage.removeItem('token')
        window.location.href = '/login'
      } else {
        toast.error('Failed to load dashboard data')
      }
      console.error('Dashboard error:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    { name: 'Upcoming Events', value: loading ? '...' : stats.upcomingEvents.toString(), icon: Calendar, change: 'Events booked' },
    { name: 'Total Tickets', value: loading ? '...' : stats.totalBookings.toString(), icon: Ticket, change: 'All time' },
    { name: 'Total Spent', value: loading ? '...' : `${stats.totalSpent} ETB`, icon: DollarSign, change: 'Total amount' },
    { name: 'Favorite Events', value: loading ? '...' : stats.favoriteEvents.toString(), icon: Heart, change: 'Saved events' },
  ]

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Hi {user?.fullName || 'User'} 👋</h1>
        <p className="text-muted mt-2">Here&apos;s what&apos;s coming up for you.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.name} className="card p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted text-sm font-medium">{stat.name}</p>
                  <p className="text-2xl font-bold text-primary mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-muted">{stat.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/user/browse" className="btn-primary px-6 py-3 rounded-lg flex items-center justify-center space-x-2 flex-1 sm:flex-none">
          <Search className="h-5 w-5" />
          <span>Browse Events</span>
        </Link>
        <Link href="/user/tickets" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors flex-1 sm:flex-none">
          <Ticket className="h-5 w-5" />
          <span>My Tickets</span>
        </Link>
      </div>

      {/* Upcoming Events */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Your Upcoming Events</h2>
          <Link href="/user/tickets" className="text-accent hover:text-primary font-medium">
            View all tickets
          </Link>
        </div>
        
        <div className="space-y-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted">Loading events...</span>
            </div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-8">
              <Ticket className="w-12 h-12 mx-auto text-muted mb-4" />
              <p className="text-muted">No upcoming events. Start exploring!</p>
              <Link href="/user/browse" className="btn-primary px-4 py-2 rounded-lg mt-4 inline-block">
                Browse Events
              </Link>
            </div>
          ) : (
            upcomingEvents.map((event: any) => (
              <div key={event._id} className="flex items-center space-x-4 p-4 border border-muted rounded-lg hover:bg-surface/50 transition-colors">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-primary">{event.eventId?.title}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-muted">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {new Date(event.eventId?.startAt).toLocaleDateString()} at {new Date(event.eventId?.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {event.eventId?.venue}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm font-medium text-primary">{event.totalAmount} ETB</div>
                  <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                    event.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {event.status}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Recommended Events */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Recommended for You</h2>
          <Link href="/user/browse" className="text-accent hover:text-primary font-medium">
            Browse more
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="border border-muted rounded-lg p-4 animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            recommendedEvents.map((event: any) => (
              <div key={event._id} className="border border-muted rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-primary">{event.title}</h3>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium capitalize">
                    {event.category}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-muted mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.startAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.venue}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {event.capacity} capacity
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="font-semibold text-primary">
                    {event.price === 0 ? 'Free' : `${event.price} ETB`}
                  </div>
                  <button className="btn-cta px-4 py-2 rounded-lg text-sm">
                    Book Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Calendar Preview */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-6">This Month</h2>
        <div className="grid grid-cols-7 gap-2 text-center">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-sm font-medium text-muted py-2">
              {day}
            </div>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const eventDays = upcomingEvents.map(event => 
              new Date(event.eventId?.startAt).getDate()
            ).filter(Boolean)
            
            return (
              <div
                key={day}
                className={`p-2 text-sm rounded-lg transition-colors ${
                  eventDays.includes(day)
                    ? 'bg-primary text-white font-medium'
                    : 'text-primary hover:bg-surface'
                }`}
              >
                {day}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}