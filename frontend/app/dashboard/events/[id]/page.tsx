"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Clock } from 'lucide-react';
import { eventsAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      setLoading(true);
      const response = await eventsAPI.getEvent(params.id as string);
      setEvent(response.data);
    } catch (error) {
      toast.error('Failed to load event');
      router.push('/dashboard/events');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted">Loading event...</span>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-primary mb-2">Event not found</h3>
        <Link href="/dashboard/events" className="text-primary hover:text-accent">
          Back to Events
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link href="/dashboard/events" className="p-2 hover:bg-surface rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5 text-primary" />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary">{event.title}</h1>
          <p className="mt-1 text-muted">Event Details</p>
        </div>
        <div className="flex space-x-2">
          <Link
            href={`/dashboard/events/${event._id}/edit`}
            className="px-4 py-2 border rounded-lg border-muted text-primary hover:bg-surface transition-colors"
          >
            Edit Event
          </Link>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 card">
            <h3 className="text-lg font-semibold text-primary mb-4">Event Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Description</label>
                <p className="text-primary">{event.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-muted mb-1">Category</label>
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                  {event.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 card">
            <h3 className="text-lg font-semibold text-primary mb-4">Event Details</h3>
            <div className="space-y-4">
              <div className="flex items-center text-muted">
                <Calendar className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium text-primary">
                    {new Date(event.startAt).toLocaleDateString()}
                  </div>
                  <div className="text-sm">
                    {new Date(event.startAt).toLocaleTimeString()} - {new Date(event.endAt).toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-muted">
                <MapPin className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium text-primary">{event.venue}</div>
                  <div className="text-sm capitalize">{event.type}</div>
                </div>
              </div>
              
              <div className="flex items-center text-muted">
                <Users className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium text-primary">{event.capacity} attendees</div>
                  <div className="text-sm">{event.registeredCount || 0} registered</div>
                </div>
              </div>
              
              <div className="flex items-center text-muted">
                <DollarSign className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium text-primary">
                    {event.price === 0 ? 'Free' : `${event.price} ETB`}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-muted">
                <Clock className="w-5 h-5 mr-3" />
                <div>
                  <div className="font-medium text-primary">Registration Deadline</div>
                  <div className="text-sm">
                    {new Date(event.registrationDeadline).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}