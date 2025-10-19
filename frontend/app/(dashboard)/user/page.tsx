"use client"

import Link from 'next/link'
import { Calendar, Ticket, DollarSign, Heart, Search, Clock, MapPin, Users } from 'lucide-react'

const stats = [
  { name: 'Upcoming Events', value: '3', icon: Calendar, change: 'Next: Dec 18' },
  { name: 'Total Tickets', value: '12', icon: Ticket, change: '8 this year' },
  { name: 'Total Spent', value: '4,200 ETB', icon: DollarSign, change: 'Avg: 350 ETB' },
  { name: 'Favorite Events', value: '5', icon: Heart, change: '2 new this month' },
]

const upcomingEvents = [
  {
    id: 1,
    name: 'Tech Startup Workshop',
    date: 'Dec 18, 2024',
    time: '2:00 PM',
    location: 'iCog Labs',
    image: '/event-two-min.jpg',
    ticketType: 'VIP',
    status: 'confirmed'
  },
  {
    id: 2,
    name: 'Business Networking Event',
    date: 'Dec 20, 2024',
    time: '6:00 PM',
    location: 'Sheraton Addis',
    image: '/event-three-min.jpg',
    ticketType: 'Regular',
    status: 'confirmed'
  },
  {
    id: 3,
    name: 'Cultural Heritage Exhibition',
    date: 'Dec 22, 2024',
    time: '10:00 AM',
    location: 'National Museum',
    image: '/event-four-min.jpg',
    ticketType: 'Free',
    status: 'pending'
  }
]

const recommendedEvents = [
  {
    id: 1,
    name: 'AI & Machine Learning Conference',
    date: 'Jan 15, 2025',
    location: 'Addis Ababa University',
    price: 800,
    attendees: 150,
    category: 'Technology'
  },
  {
    id: 2,
    name: 'Ethiopian Coffee Festival',
    date: 'Jan 20, 2025',
    location: 'Meskel Square',
    price: 0,
    attendees: 500,
    category: 'Culture'
  }
]

export default function UserDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Hi Meron 👋</h1>
        <p className="text-muted mt-2">Here&apos;s what&apos;s coming up for you.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
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
          {upcomingEvents.map((event) => (
            <div key={event.id} className="flex items-center space-x-4 p-4 border border-muted rounded-lg hover:bg-surface/50 transition-colors">
              <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                <div className="w-full h-full bg-primary/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{event.name}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {event.date} at {event.time}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-primary">{event.ticketType}</div>
                <div className={`text-xs px-2 py-1 rounded-full mt-1 ${
                  event.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {event.status}
                </div>
              </div>
            </div>
          ))}
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
          {recommendedEvents.map((event) => (
            <div key={event.id} className="border border-muted rounded-lg p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-primary">{event.name}</h3>
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                  {event.category}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-muted mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} interested
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
          ))}
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
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
            <div
              key={day}
              className={`p-2 text-sm rounded-lg transition-colors ${
                [18, 20, 22].includes(day)
                  ? 'bg-primary text-white font-medium'
                  : 'text-primary hover:bg-surface'
              }`}
            >
              {day}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}