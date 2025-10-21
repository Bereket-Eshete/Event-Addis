'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Calendar, MapPin, Users, DollarSign, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { eventsAPI } from '@/lib/api'
import { useAuth } from '@/lib/auth'
import toast from 'react-hot-toast'

export default function EventDetailsPage() {
  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (params.id) {
      fetchEvent(params.id as string)
    }
  }, [params.id])

  const fetchEvent = async (eventId: string) => {
    try {
      const response = await eventsAPI.getEventById(eventId)
      setEvent(response.data)
    } catch (error: any) {
      toast.error('Event not found')
      router.push('/discover')
    } finally {
      setLoading(false)
    }
  }

  const handleBookEvent = () => {
    if (!user) {
      toast.error('Please login to book events')
      router.push('/login')
      return
    }
    router.push(`/user/events/${event._id}`)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-accent/20 rounded w-1/4 mb-6"></div>
            <div className="h-64 bg-accent/20 rounded-lg mb-6"></div>
            <div className="space-y-4">
              <div className="h-6 bg-accent/20 rounded w-3/4"></div>
              <div className="h-4 bg-accent/20 rounded w-1/2"></div>
              <div className="h-4 bg-accent/20 rounded w-2/3"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: 'var(--bg)'}}>
        <div className="text-center">
          <Calendar className="w-16 h-16 text-muted mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">Event Not Found</h2>
          <p className="text-muted mb-4">The event you're looking for doesn't exist.</p>
          <button
            onClick={() => router.push('/discover')}
            className="px-6 py-2 text-white rounded-lg gradient-primary"
          >
            Back to Discover
          </button>
        </div>
      </div>
    )
  }

  const availableSpots = event.capacity - (event.registeredCount || 0)
  const isEventPast = new Date() > new Date(event.endAt)
  const isRegistrationClosed = new Date() > new Date(event.registrationDeadline)

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary hover:text-accent mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Events
        </button>

        {/* Event Header */}
        <div className="bg-surface rounded-lg border border-muted overflow-hidden mb-8">
          {/* Event Image */}
          <div className="relative h-64 md:h-80 bg-accent/10">
            {event.bannerUrl ? (
              <img 
                src={event.bannerUrl} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Calendar className="w-16 h-16 text-muted" />
              </div>
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              <span className="px-3 py-1 bg-primary text-white text-sm rounded-full">
                {event.category}
              </span>
              <button
                onClick={handleShare}
                className="p-2 bg-white/90 text-primary rounded-full hover:bg-white"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Event Info */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-primary mb-4">{event.title}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-3">
                <div className="flex items-center text-muted">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p>{new Date(event.startAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-muted">
                  <Clock className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p>{new Date(event.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.endAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-muted">
                  <MapPin className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Venue</p>
                    <p>{event.venue}</p>
                  </div>
                </div>
                
                <div className="flex items-center text-muted">
                  <Users className="w-5 h-5 mr-3" />
                  <div>
                    <p className="font-medium">Capacity</p>
                    <p>{availableSpots} spots available of {event.capacity}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price and Booking */}
            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
              <div className="flex items-center">
                <DollarSign className="w-6 h-6 text-primary mr-2" />
                <div>
                  <p className="text-sm text-muted">Price</p>
                  <p className="text-2xl font-bold text-primary">
                    {event.price === 0 ? 'Free' : `${event.price} ETB`}
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleBookEvent}
                disabled={isEventPast || isRegistrationClosed || availableSpots === 0}
                className="px-8 py-3 text-white rounded-lg gradient-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isEventPast ? 'Event Ended' : 
                 isRegistrationClosed ? 'Registration Closed' :
                 availableSpots === 0 ? 'Sold Out' : 'Book Now'}
              </button>
            </div>
          </div>
        </div>

        {/* Event Description */}
        <div className="bg-surface rounded-lg border border-muted p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">About This Event</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-muted whitespace-pre-wrap">{event.description}</p>
          </div>
          
          {event.requirements && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-primary mb-2">Requirements</h3>
              <p className="text-muted">{event.requirements}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}