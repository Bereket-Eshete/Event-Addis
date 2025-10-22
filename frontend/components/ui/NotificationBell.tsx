"use client";

import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { notificationsAPI } from '@/lib/api';

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await notificationsAPI.getNotifications({ limit: 5 });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (error) {
      // Silently fail
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await notificationsAPI.markAsRead(id);
      fetchNotifications();
    } catch (error) {
      // Silently fail
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-muted hover:text-primary transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface rounded-lg shadow-xl border border-muted z-50 max-w-[calc(100vw-2rem)] sm:max-w-none">
            <div className="p-4 border-b border-muted">
              <h3 className="font-semibold text-primary">Notifications</h3>
            </div>
            <div className="max-h-80 sm:max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-muted">
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.map((notification: any) => (
                  <div
                    key={notification._id}
                    className={`p-4 border-b border-muted hover:bg-accent/10 cursor-pointer transition-colors ${
                      !notification.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                    }`}
                    onClick={() => {
                      if (!notification.isRead) {
                        markAsRead(notification._id);
                      }
                      setIsOpen(false);
                    }}
                  >
                    <div className="font-medium text-primary text-sm mb-1">
                      {notification.title}
                    </div>
                    <div className="text-sm text-muted mb-2 line-clamp-2">
                      {notification.message}
                    </div>
                    <div className="text-xs text-muted">
                      {new Date(notification.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-muted">
              <button 
                className="w-full text-sm text-primary hover:text-accent font-medium"
                onClick={() => setIsOpen(false)}
              >
                View All Notifications
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}