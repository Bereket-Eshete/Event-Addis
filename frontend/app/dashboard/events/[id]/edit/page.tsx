"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Calendar, MapPin, Clock, DollarSign, Users, Save, ArrowLeft } from 'lucide-react';
import { eventsAPI } from '@/lib/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

export default function EditEventPage() {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    type: 'in-person',
    venue: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    capacity: '',
    price: '',
    registrationDeadline: '',
    status: 'published'
  });

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'business', label: 'Business' },
    { value: 'education', label: 'Education' },
    { value: 'networking', label: 'Networking' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'seminar', label: 'Seminar' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'sports', label: 'Sports' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'other', label: 'Other' }
  ];

  useEffect(() => {
    if (params.id) {
      fetchEvent();
    }
  }, [params.id]);

  const fetchEvent = async () => {
    try {
      setInitialLoading(true);
      const response = await eventsAPI.getEvent(params.id as string);
      const event = response.data;
      
      const startDate = new Date(event.startAt);
      const endDate = new Date(event.endAt);
      const regDeadline = new Date(event.registrationDeadline);
      
      setFormData({
        title: event.title,
        description: event.description,
        category: event.category,
        type: event.type,
        venue: event.venue,
        startDate: startDate.toISOString().split('T')[0],
        startTime: startDate.toTimeString().slice(0, 5),
        endDate: endDate.toISOString().split('T')[0],
        endTime: endDate.toTimeString().slice(0, 5),
        capacity: event.capacity.toString(),
        price: event.price.toString(),
        registrationDeadline: regDeadline.toISOString().split('T')[0],
        status: event.status
      });
    } catch (error) {
      toast.error('Failed to load event');
      router.push('/dashboard/events');
    } finally {
      setInitialLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const eventData = {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        type: formData.type,
        venue: formData.venue,
        startAt: new Date(`${formData.startDate}T${formData.startTime}`).toISOString(),
        endAt: new Date(`${formData.endDate}T${formData.endTime}`).toISOString(),
        capacity: parseInt(formData.capacity),
        price: parseFloat(formData.price) || 0,
        registrationDeadline: new Date(`${formData.registrationDeadline}T23:59`).toISOString(),
        status: formData.status
      };

      await eventsAPI.updateEvent(params.id as string, eventData);
      toast.success('Event updated successfully!');
      router.push('/dashboard/events');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2 text-muted">Loading event...</span>
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
        <div>
          <h1 className="text-3xl font-bold text-primary">Edit Event</h1>
          <p className="mt-1 text-muted">Update your event details</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-4xl">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="p-6 card">
              <h3 className="text-lg font-semibold text-primary mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Event Title</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Category</label>
                  <select
                    required
                    className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Description</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="p-6 card">
              <h3 className="text-lg font-semibold text-primary mb-4">Event Details</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Start Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Start Time</label>
                    <input
                      type="time"
                      required
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">End Date</label>
                    <input
                      type="date"
                      required
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">End Time</label>
                    <input
                      type="time"
                      required
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Venue</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Registration Deadline</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    value={formData.registrationDeadline}
                    onChange={(e) => setFormData({ ...formData, registrationDeadline: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary mb-2">Event Type</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'in-person' })}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.type === 'in-person'
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <span className="font-medium text-primary">In-Person</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, type: 'online' })}
                      className={`p-3 border-2 rounded-lg text-center transition-all ${
                        formData.type === 'online'
                          ? 'border-primary bg-primary/10'
                          : 'border-muted hover:border-primary/50'
                      }`}
                    >
                      <span className="font-medium text-primary">Online</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Price (ETB)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-2">Capacity</label>
                    <input
                      type="number"
                      min="1"
                      className="w-full px-4 py-3 border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-8 space-x-4">
          <Link
            href="/dashboard/events"
            className="px-6 py-3 border rounded-lg border-muted text-primary hover:bg-surface transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center px-6 py-3 space-x-2 rounded-lg btn-primary disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Updating...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Update Event</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}