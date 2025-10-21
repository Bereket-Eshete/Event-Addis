'use client'

import { useState, useEffect } from 'react'
import { Search, Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react'
import { eventsAPI } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function DiscoverPage() {
  const [events, setEvents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedType, setSelectedType] = useState('')
  const [priceFilter, setPriceFilter] = useState('')
  const { user } = useAuth()
  const router = useRouter()

  const categories = ['Technology', 'Business', 'Arts', 'Sports', 'Education', 'Entertainment', 'Health', 'Food']
  const types = ['Conference', 'Workshop', 'Seminar', 'Networking', 'Exhibition', 'Concert', 'Festival']

  useEffect(() => {
    fetchEvents()
  }, [searchTerm, selectedCategory, selectedType, priceFilter])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) {
        params.append('search', searchTerm)
        params.append('title', searchTerm)
        params.append('description', searchTerm)
        params.append('venue', searchTerm)
      }
      if (selectedCategory) params.append('category', selectedCategory)
      if (selectedType) params.append('type', selectedType)
      if (priceFilter === 'free') {
        params.append('price', '0')
        params.append('maxPrice', '0')
      }
      if (priceFilter === 'paid') {
        params.append('minPrice', '1')
      }
      
      const response = await eventsAPI.getAllEvents(Object.fromEntries(params))
      setEvents(response.data.events || [])
    } catch (error: any) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBookEvent = (eventId: string) => {
    if (!user) {
      toast.error('Please login to book events')
      router.push('/login')
      return
    }
    router.push(`/user/events/${eventId}`)
  }

  const handleViewDetails = (eventId: string) => {
    router.push(`/discover/${eventId}`)
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      {/* Hero Section */}
      <div className="gradient-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover Amazing Events
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Find and join the best events happening in Addis Ababa
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-surface rounded-lg p-6 mb-8 border border-muted">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-muted rounded-full bg-background text-primary placeholder-muted focus:outline-none focus:border-primary transition-colors text-lg"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 border border-muted rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-muted rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-3 border border-muted rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value="">All Prices</option>
              <option value="free">Free Events</option>
              <option value="paid">Paid Events</option>
            </select>
          </div>
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-surface rounded-lg border border-muted animate-pulse">
                <div className="h-48 bg-accent/20 rounded-t-lg"></div>
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-accent/20 rounded w-3/4"></div>
                  <div className="h-3 bg-accent/20 rounded w-1/2"></div>
                  <div className="h-3 bg-accent/20 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No Events Found</h3>
            <p className="text-muted">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event._id} className="bg-surface rounded-lg border border-muted hover:shadow-lg transition-shadow">
                {/* Event Image */}
                <div className="relative h-48 bg-accent/10 rounded-t-lg overflow-hidden">
                  {event.bannerUrl ? (
                    <img 
                      src={event.bannerUrl} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-muted" />
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-1 bg-primary text-white text-xs rounded-full">
                      {event.category}
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-primary mb-2 line-clamp-2">
                    {event.title}
                  </h3>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.startAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-muted">
                      <Clock className="w-4 h-4 mr-2" />
                      {new Date(event.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                    <div className="flex items-center text-sm text-muted">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.venue}
                    </div>
                    <div className="flex items-center text-sm text-muted">
                      <Users className="w-4 h-4 mr-2" />
                      {event.capacity - (event.registeredCount || 0)} spots left
                    </div>
                    <div className="flex items-center text-sm font-semibold text-primary">
                      <DollarSign className="w-4 h-4 mr-2" />
                      {event.price === 0 ? 'Free' : `${event.price} ETB`}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewDetails(event._id)}
                      className="flex-1 py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleBookEvent(event._id)}
                      className="flex-1 py-2 px-4 text-white rounded-lg gradient-primary hover:opacity-90 transition-opacity"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}