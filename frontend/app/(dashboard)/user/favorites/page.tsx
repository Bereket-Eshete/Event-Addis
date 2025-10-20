"use client";

import { useState, useEffect } from "react";
import { Heart, Calendar, MapPin, Clock, Users } from "lucide-react";
import { dashboardAPI } from "@/lib/api";
import { toast } from "react-hot-toast";

export default function FavoritesPage() {
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const response = await dashboardAPI.getUserFavorites();
      setFavoriteEvents(response.data.favorites || []);
    } catch (error) {
      toast.error('Failed to fetch favorites');
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavorites = async (eventId) => {
    try {
      await dashboardAPI.removeFromFavorites(eventId);
      setFavoriteEvents(prev => prev.filter(event => event._id !== eventId));
      toast.success('Removed from favorites');
    } catch (error) {
      toast.error('Failed to remove from favorites');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Favorite Events</h1>
        <p className="text-sm text-muted">
          {favoriteEvents.length} events saved
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteEvents.map((event) => (
          <div
            key={event._id}
            className="overflow-hidden transition-shadow border rounded-lg bg-surface border-muted hover:shadow-lg"
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <button 
                onClick={() => removeFromFavorites(event._id)}
                className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full top-3 right-3 bg-white/90 hover:bg-white"
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="mb-2 font-semibold text-primary">{event.title}</h3>

              <div className="mb-4 space-y-2 text-sm text-muted">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(event.startAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(event.startAt).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{event.capacity} capacity</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  {event.price} ETB
                </span>
                <button className="px-4 py-2 text-sm text-white transition-opacity rounded-lg gradient-primary hover:opacity-90">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {favoriteEvents.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-primary">
            No favorite events
          </h3>
          <p className="text-muted">
            You haven't added any events to your favorites yet.
          </p>
        </div>
      )}
    </div>
  );
}
