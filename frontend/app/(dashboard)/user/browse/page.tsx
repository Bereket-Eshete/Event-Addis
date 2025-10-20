"use client";

import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Heart,
  Calendar,
  MapPin,
  Users,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { eventsAPI, dashboardAPI } from "@/lib/api";
import { toast } from "react-hot-toast";



const categories = [
  "All",
  "Technology",
  "Culture",
  "Business",
  "Workshop",
  "Music",
  "Sports",
];
const priceRanges = [
  "All",
  "Free",
  "Under 500 ETB",
  "500-1000 ETB",
  "Above 1000 ETB",
];

export default function BrowseEventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriceRange, setSelectedPriceRange] = useState("All");
  const [events, setEvents] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchFavorites();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAllEvents();
      setEvents(response.data.events || []);
    } catch (error) {
      toast.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const response = await dashboardAPI.getUserFavorites();
      const favoriteIds = new Set(response.data.favorites.map(fav => fav._id));
      setFavorites(favoriteIds);
    } catch (error) {
      console.error('Failed to fetch favorites');
    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.venue?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesPrice =
      selectedPriceRange === "All" ||
      (selectedPriceRange === "Free" && event.price === 0) ||
      (selectedPriceRange === "Under 500 ETB" &&
        event.price > 0 &&
        event.price < 500) ||
      (selectedPriceRange === "500-1000 ETB" &&
        event.price >= 500 &&
        event.price <= 1000) ||
      (selectedPriceRange === "Above 1000 ETB" && event.price > 1000);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleFavorite = async (eventId: string) => {
    try {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(eventId)) {
        await dashboardAPI.removeFromFavorites(eventId);
        newFavorites.delete(eventId);
        toast.success('Removed from favorites');
      } else {
        await dashboardAPI.addToFavorites(eventId);
        newFavorites.add(eventId);
        toast.success('Added to favorites');
      }
      setFavorites(newFavorites);
    } catch (error) {
      toast.error('Failed to update favorites');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Discover Events</h1>
        <p className="mt-1 text-muted">
          Find amazing events happening in Addis Ababa
        </p>
      </div>

      {/* Search and Filters */}
      <div className="p-6 card">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search events, locations, or organizers..."
              className="w-full py-3 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
            {/* Category Filter */}
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-primary">
                Category
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="flex-1">
              <label className="block mb-2 text-sm font-medium text-primary">
                Price Range
              </label>
              <select
                className="w-full px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
              >
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted">
          Showing {filteredEvents.length} event
          {filteredEvents.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Events Grid */}
      {!loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="overflow-hidden transition-shadow card hover:shadow-lg"
          >
            {/* Event Image */}
            <div className="relative h-48">
              <Image
                src={event.image || "/event-one-min.jpg"}
                alt={event.title}
                fill
                className="object-cover"
              />

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(event._id)}
                className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full top-4 right-4 bg-white/90 hover:bg-white"
              >
                <Heart
                  className={`h-4 w-4 ${
                    favorites.has(event._id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }`}
                />
              </button>

              {/* Category Badge */}
              <div className="absolute px-2 py-1 text-xs font-medium text-white rounded-full top-4 left-4 bg-primary">
                {event.category}
              </div>

              {/* Price Badge */}
              <div className="absolute px-2 py-1 text-xs font-bold rounded-full bottom-4 right-4 bg-white/90 text-primary">
                {event.price === 0 ? "Free" : `${event.price} ETB`}
              </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
              <h3 className="mb-2 text-lg font-bold text-primary line-clamp-2">
                {event.title}
              </h3>

              <p className="mb-4 text-sm text-muted line-clamp-2">
                {event.description}
              </p>

              <div className="mb-4 space-y-2 text-sm text-muted">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-primary" />
                  <span>
                    {new Date(event.startAt).toLocaleDateString()} at {new Date(event.startAt).toLocaleTimeString()}
                  </span>
                </div>

                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-primary" />
                  <span>{event.venue}</span>
                </div>

                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-primary" />
                  <span>{event.capacity} capacity</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-xs text-muted">by {event.organizerId?.organizationName || event.organizerId?.fullName || 'Unknown Organizer'}</div>
                <button className="px-4 py-2 text-sm rounded-lg btn-primary">
                  View Details
                </button>
              </div>
            </div>
          </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!loading && filteredEvents.length === 0 && (
        <div className="py-12 text-center">
          <Search className="w-12 h-12 mx-auto mb-4 text-muted" />
          <h3 className="mb-2 text-lg font-medium text-primary">
            No events found
          </h3>
          <p className="mb-4 text-muted">
            Try adjusting your search or filters
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("All");
              setSelectedPriceRange("All");
            }}
            className="px-4 py-2 rounded-lg btn-primary"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
