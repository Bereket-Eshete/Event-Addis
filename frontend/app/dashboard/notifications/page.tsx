"use client";

import { useState, useEffect } from 'react';
import { Bell, Calendar, MessageSquare, CheckCircle, Clock, Send, Plus, X } from 'lucide-react';
import { notificationsAPI, eventsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

export default function OrganizerNotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [announcementData, setAnnouncementData] = useState({
    eventId: '',
    title: '',
    message: ''
  });
  const [sendingAnnouncement, setSendingAnnouncement] = useState(false);

  useEffect(() => {
    fetchNotifications();
    fetchEvents();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationsAPI.getNotifications({ limit: 50 });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      toast.error('Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await eventsAPI.getAllEvents({ limit: 100 });
      setEvents(response.data.events || []);
    } catch (error) {
      console.error('Failed to fetch events');
    }
  };

  const handleSendAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementData.eventId || !announcementData.title || !announcementData.message) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      setSendingAnnouncement(true);
      await notificationsAPI.sendAnnouncement(announcementData);
      toast.success('Announcement sent successfully!');
      setShowAnnouncementForm(false);
      setAnnouncementData({ eventId: '', title: '', message: '' });
      fetchNotifications();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to send announcement');
    } finally {
      setSendingAnnouncement(false);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      toast.error('Failed to mark as read');
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      fetchNotifications();
      toast.success('All notifications marked as read');
    } catch (error) {
      toast.error('Failed to mark all as read');
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'announcement':
        return <Bell className="w-5 h-5 text-blue-500" />;
      case 'message':
        return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'system':
        return <Calendar className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Notifications</h1>
          <p className="mt-1 text-muted">Stay updated with your events and messages</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowAnnouncementForm(true)}
            className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Send Announcement</span>
          </button>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 text-sm border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Notifications</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {notifications.length}
              </p>
            </div>
            <Bell className="w-8 h-8 text-primary" />
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Unread</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {unreadCount}
              </p>
            </div>
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Read</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {notifications.length - unreadCount}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Send Announcement Modal */}
      {showAnnouncementForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg border border-muted p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-primary">Send Announcement</h3>
              <button
                onClick={() => setShowAnnouncementForm(false)}
                className="p-1 hover:bg-muted/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>
            
            <form onSubmit={handleSendAnnouncement} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Select Event</label>
                <select
                  required
                  value={announcementData.eventId}
                  onChange={(e) => setAnnouncementData({ ...announcementData, eventId: e.target.value })}
                  className="w-full px-3 py-2 border border-muted rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Choose an event...</option>
                  {events.map((event: any) => (
                    <option key={event._id} value={event._id}>{event.title}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Title</label>
                <input
                  type="text"
                  required
                  value={announcementData.title}
                  onChange={(e) => setAnnouncementData({ ...announcementData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-muted rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                  placeholder="Announcement title..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-primary mb-2">Message</label>
                <textarea
                  required
                  rows={4}
                  value={announcementData.message}
                  onChange={(e) => setAnnouncementData({ ...announcementData, message: e.target.value })}
                  className="w-full px-3 py-2 border border-muted rounded-lg bg-background text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                  placeholder="Your announcement message..."
                />
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAnnouncementForm(false)}
                  className="px-4 py-2 text-sm border border-muted text-primary rounded-lg hover:bg-muted/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingAnnouncement}
                  className="flex items-center space-x-2 px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  {sendingAnnouncement ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notifications List */}
      <div className="card">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <span className="ml-2 text-muted">Loading notifications...</span>
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 mx-auto mb-4 text-muted" />
            <h3 className="mb-2 text-lg font-medium text-primary">No notifications</h3>
            <p className="text-muted">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-muted">
            {notifications.map((notification: any) => (
              <div
                key={notification._id}
                className={`p-6 hover:bg-surface/50 transition-colors cursor-pointer ${
                  !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                }`}
                onClick={() => {
                  if (!notification.isRead) {
                    markAsRead(notification._id);
                  }
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getTypeIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-primary">
                        {notification.title}
                      </h3>
                      {!notification.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-muted mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted">
                      <span>
                        {notification.senderId?.fullName || 'System'}
                      </span>
                      <span>
                        {new Date(notification.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {notification.eventId && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Event: {notification.eventId.title}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}