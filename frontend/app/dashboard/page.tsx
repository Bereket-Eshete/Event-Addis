"use client"

import Link from 'next/link'
import { Calendar, Users, Ticket, DollarSign, Plus, TrendingUp, Clock, MapPin } from 'lucide-react'

const stats = [
  { name: 'Total Events', value: '12', icon: Calendar, change: '+2 this month' },
  { name: 'Upcoming Events', value: '5', icon: Clock, change: 'Next: Dec 15' },
  { name: 'Total Tickets Sold', value: '1,234', icon: Ticket, change: '+15% from last month' },
  { name: 'Total Revenue', value: '45,670 ETB', icon: DollarSign, change: '+12% from last month' },
]

const recentEvents = [
  {
    id: 1,
    name: 'Tech Startup Workshop',
    date: 'Dec 18, 2024',
    location: 'iCog Labs',
    attendees: 45,
    revenue: '22,500 ETB',
    status: 'upcoming'
  },
  {
    id: 2,
    name: 'Business Networking Event',
    date: 'Dec 20, 2024',
    location: 'Sheraton Addis',
    attendees: 89,
    revenue: '106,800 ETB',
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'Cultural Heritage Exhibition',
    date: 'Nov 28, 2024',
    location: 'National Museum',
    attendees: 156,
    revenue: '0 ETB',
    status: 'completed'
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Welcome back, Bereket 👋</h1>
        <p className="text-muted mt-2">Here&apos;s what&apos;s happening with your events today.</p>
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
              <div className="mt-4 flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-muted">{stat.change}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/dashboard/events/new" className="btn-primary px-6 py-3 rounded-lg flex items-center justify-center space-x-2 flex-1 sm:flex-none">
          <Plus className="h-5 w-5" />
          <span>Create New Event</span>
        </Link>
        <Link href="/dashboard/events" className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 rounded-lg flex items-center justify-center space-x-2 transition-colors flex-1 sm:flex-none">
          <Calendar className="h-5 w-5" />
          <span>View All Events</span>
        </Link>
      </div>

      {/* Recent Events */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Recent Events</h2>
          <Link href="/dashboard/events" className="text-accent hover:text-primary font-medium">
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {recentEvents.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 border border-muted rounded-lg hover:bg-surface/50 transition-colors">
              <div className="flex-1">
                <h3 className="font-semibold text-primary">{event.name}</h3>
                <div className="flex items-center space-x-4 mt-1 text-sm text-muted">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {event.location}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="text-center">
                  <div className="flex items-center text-muted">
                    <Users className="h-4 w-4 mr-1" />
                    {event.attendees}
                  </div>
                  <div className="text-xs text-muted">attendees</div>
                </div>
                
                <div className="text-center">
                  <div className="font-semibold text-primary">{event.revenue}</div>
                  <div className="text-xs text-muted">revenue</div>
                </div>
                
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  event.status === 'upcoming' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {event.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Timeline */}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-primary mb-6">Upcoming Events Timeline</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">Tech Startup Workshop</span>
                <span className="text-sm text-muted">Dec 18, 2:00 PM</span>
              </div>
              <p className="text-sm text-muted">45 registered • iCog Labs</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span className="font-medium text-primary">Business Networking Event</span>
                <span className="text-sm text-muted">Dec 20, 6:00 PM</span>
              </div>
              <p className="text-sm text-muted">89 registered • Sheraton Addis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}