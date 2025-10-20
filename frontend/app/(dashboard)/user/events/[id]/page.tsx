"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Heart,
  Share2,
  ArrowLeft,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { eventsAPI, dashboardAPI } from "@/lib/api";
import { toast } from "react-hot-toast";
import BookingModal from "@/components/ui/BookingModal";

export default function EventDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchEvent();
      checkFavorite();
    }
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      const response = await eventsAPI.getEvent(params.id);
      setEvent(response.data);
    } catch (error) {
      toast.error("Failed to fetch event details");
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite = async () => {
    try {
      const response = await dashboardAPI.getUserFavorites();
      const favoriteIds = response.data.favorites.map(fav => fav._id);
      setIsFavorite(favoriteIds.includes(params.id));
    } catch (error) {
      console.error("Failed to check favorite status");
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await dashboardAPI.removeFromFavorites(params.id);
        toast.success("Removed from favorites");
      } else {
        await dashboardAPI.addToFavorites(params.id);
        toast.success("Added to favorites");
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      toast.error("Failed to update favorites");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-primary">Event not found</h3>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center space-x-2 text-muted hover:text-primary"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Events</span>
        </button>
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleFavorite}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-muted hover:bg-accent/50"
          >
            <Heart
              className={`w-5 h-5 ${
                isFavorite ? "text-red-500 fill-red-500" : "text-muted"
              }`}
            />
          </button>
          <button className="flex items-center justify-center w-10 h-10 rounded-full bg-surface border border-muted hover:bg-accent/50">
            <Share2 className="w-5 h-5 text-muted" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="relative h-96 md:h-[500px]">
          <Image
            src={event.bannerUrl || "/event-one-min.jpg"}
            alt={event.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Event Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="flex items-center space-x-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-primary rounded-full">
                {event.category}
              </span>
              <span className="px-3 py-1 text-sm font-medium bg-accent rounded-full">
                {event.type}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{event.title}</h1>
            <div className="flex flex-wrap items-center gap-6 text-lg">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(event.startAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>{new Date(event.startAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-4">About This Event</h2>
            <p className="text-muted leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Event Details */}
          <div className="card p-8">
            <h2 className="text-2xl font-bold text-primary mb-6">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Start Date</p>
                    <p className="text-muted">{new Date(event.startAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Start Time</p>
                    <p className="text-muted">{new Date(event.startAt).toLocaleTimeString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Capacity</p>
                    <p className="text-muted">{event.capacity} attendees</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">End Date</p>
                    <p className="text-muted">{new Date(event.endAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Venue</p>
                    <p className="text-muted">{event.venue}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-primary">Price</p>
                    <p className="text-muted">{event.price === 0 ? "Free" : `${event.price} ETB`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          {event.tags && event.tags.length > 0 && (
            <div className="card p-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-accent/20 text-primary rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Booking Card */}
          <div className="card p-6 sticky top-6">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {event.price === 0 ? "Free" : `${event.price} ETB`}
              </div>
              <p className="text-muted">per ticket</p>
            </div>
            
            <button 
              onClick={() => setShowBookingModal(true)}
              className="w-full py-3 text-white rounded-lg gradient-primary hover:opacity-90 mb-4"
            >
              Book Now
            </button>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted">Registration Deadline</span>
                <span className="text-primary font-medium">
                  {new Date(event.registrationDeadline).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Available Spots</span>
                <span className="text-primary font-medium">
                  {event.capacity - (event.registeredCount || 0)}
                </span>
              </div>
            </div>
          </div>

          {/* Organizer Info */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Organized by</h3>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {(event.organizerId?.organizationName || event.organizerId?.fullName)?.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-primary">
                  {event.organizerId?.organizationName || event.organizerId?.fullName}
                </p>
                <p className="text-sm text-muted">Event Organizer</p>
              </div>
            </div>
            <button className="w-full py-2 border border-muted rounded-lg text-primary hover:bg-accent/50">
              Contact Organizer
            </button>
          </div>

          {/* Event Stats */}
          <div className="card p-6">
            <h3 className="text-lg font-bold text-primary mb-4">Event Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted">Registered</span>
                <span className="text-primary font-medium">{event.registeredCount || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Capacity</span>
                <span className="text-primary font-medium">{event.capacity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted">Status</span>
                <span className="text-green-600 font-medium capitalize">{event.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        event={event}
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </div>
  );
}