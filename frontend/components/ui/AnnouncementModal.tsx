"use client";

import { useState } from 'react';
import { X, Send } from 'lucide-react';
import { notificationsAPI } from '@/lib/api';
import toast from 'react-hot-toast';

interface AnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventTitle: string;
}

export function AnnouncementModal({ isOpen, onClose, eventId, eventTitle }: AnnouncementModalProps) {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    try {
      setLoading(true);
      await notificationsAPI.sendAnnouncement({
        eventId,
        title: title.trim(),
        message: message.trim()
      });
      toast.success('Announcement sent successfully');
      setTitle('');
      setMessage('');
      onClose();
    } catch (error) {
      toast.error('Failed to send announcement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-muted">
          <h2 className="text-xl font-semibold text-primary">Send Announcement</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Event: {eventTitle}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Announcement title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Your announcement message..."
              required
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !title.trim() || !message.trim()}
              className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Sending...' : 'Send Announcement'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}