"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Loader,
} from "lucide-react";
import { dashboardAPI, eventsAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import { DeleteModal } from '@/components/ui/DeleteModal';

export default function EventsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [visibilityFilter, setVisibilityFilter] = useState("all");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, eventId: '', eventTitle: '' });
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetchEvents();
  }, [statusFilter, pagination.page]);

  // Refresh data when window gains focus (when returning from create page)
  useEffect(() => {
    const handleFocus = () => {
      fetchEvents();
    };
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchEvents();
      }
    };
    
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchEvents();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params: any = { page: pagination.page, limit: 10 };
      if (statusFilter !== 'all') params.status = statusFilter;
      
      const response = await dashboardAPI.getOrganizerEvents(params);
      setEvents(response.data.events);
      setPagination({
        page: response.data.page,
        pages: response.data.pages,
        total: response.data.total
      });
    } catch (error) {
      toast.error('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  const openDeleteModal = (eventId: string, eventTitle: string) => {
    setDeleteModal({ isOpen: true, eventId, eventTitle });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, eventId: '', eventTitle: '' });
  };

  const handleDeleteEvent = async () => {
    try {
      setDeleting(true);
      await eventsAPI.deleteEvent(deleteModal.eventId);
      toast.success('Event deleted successfully');
      closeDeleteModal();
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    } finally {
      setDeleting(false);
    }
  };

  const filteredEvents = events.filter((event: any) => {
    const matchesSearch = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-primary">Events Management</h1>
          <p className="mt-1 text-muted">Create and manage your events</p>
        </div>
        <Link
          href="/dashboard/events/create"
          className="flex items-center px-4 py-2 mt-4 space-x-2 rounded-lg btn-primary sm:mt-0"
        >
          <Plus className="w-5 h-5" />
          <span>Create Event</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="p-6 card">
        <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:space-y-0 lg:space-x-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full py-2 pl-10 pr-4 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>

          {/* Visibility Filter */}
          <select
            className="px-4 py-2 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value)}
          >
            <option value="all">All Visibility</option>
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid gap-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 animate-spin text-primary" />
            <span className="ml-2 text-muted">Loading events...</span>
          </div>
        ) : filteredEvents.map((event: any) => (
          <div
            key={event._id}
            className="p-6 transition-shadow card hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              {/* Event Image & Info */}
              <div className="flex flex-1 space-x-4">
                {event.bannerUrl && (
                  <img 
                    src={event.bannerUrl} 
                    alt={event.title}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-primary">
                    {event.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {event.category || 'Event'}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="flex items-center text-muted">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(event.startAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-muted">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{event.venue}</span>
                  </div>
                  <div className="flex items-center text-muted">
                    <Users className="w-4 h-4 mr-2" />
                    <span>
                      {event.capacity || 0} capacity
                    </span>
                  </div>
                  <div className="flex items-center text-muted">
                    <DollarSign className="w-4 h-4 mr-2" />
                    <span>{event.price || 0} ETB</span>
                  </div>
                </div>
              </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-6">
                <Link href={`/dashboard/events/${event._id}`} className="p-2 transition-colors rounded-lg text-primary hover:bg-surface">
                  <Eye className="w-5 h-5" />
                </Link>
                <Link href={`/dashboard/events/${event._id}/edit`} className="p-2 transition-colors rounded-lg text-primary hover:bg-surface">
                  <Edit className="w-5 h-5" />
                </Link>
                <button 
                  onClick={() => openDeleteModal(event._id, event.title)}
                  className="p-2 text-red-600 transition-colors rounded-lg hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="py-12 text-center">
          <Calendar className="w-12 h-12 mx-auto mb-4 text-muted" />
          <h3 className="mb-2 text-lg font-medium text-primary">
            No events found
          </h3>
          <p className="mb-4 text-muted">
            Try adjusting your search or filters
          </p>
          <Link
            href="/dashboard/events/create"
            className="inline-flex items-center px-4 py-2 space-x-2 rounded-lg btn-primary"
          >
            <Plus className="w-5 h-5" />
            <span>Create Your First Event</span>
          </Link>
        </div>
      )}

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteEvent}
        title="Delete Event"
        message={`Are you sure you want to delete "${deleteModal.eventTitle}"? This action cannot be undone and will remove all associated bookings.`}
        loading={deleting}
      />
    </div>
  );
}
