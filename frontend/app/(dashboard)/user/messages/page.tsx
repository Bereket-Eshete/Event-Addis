"use client";

import { useState, useEffect } from 'react';
import { MessageSquare, Clock, User } from 'lucide-react';
import { dashboardAPI } from '@/lib/api';
import { toast } from 'react-hot-toast';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await dashboardAPI.getUserMessages();
      setMessages(response.data.messages || []);
    } catch (error) {
      toast.error('Failed to fetch messages');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await dashboardAPI.markMessageAsRead(messageId);
      setMessages(prev => prev.map(msg => 
        msg._id === messageId ? { ...msg, read: true } : msg
      ));
    } catch (error) {
      toast.error('Failed to mark message as read');
    }
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = Math.floor((now - messageDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
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
      <h1 className="text-2xl font-bold text-primary mb-6">Messages</h1>
      
      <div className="space-y-2">
        {messages.map((message) => (
          <div 
            key={message._id} 
            onClick={() => !message.read && handleMarkAsRead(message._id)}
            className={`bg-surface border border-muted rounded-lg p-4 cursor-pointer hover:bg-accent/50 transition-colors ${
              !message.read ? 'border-l-4 border-l-primary' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className={`font-medium ${!message.read ? 'text-primary font-semibold' : 'text-primary'}`}>
                    {message.sender?.fullName || 'EventAddis System'}
                  </h3>
                  <p className={`text-sm ${!message.read ? 'text-primary font-medium' : 'text-muted'}`}>
                    {message.subject}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-xs text-muted">
                <Clock className="h-3 w-3" />
                <span>{getTimeAgo(message.createdAt)}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted ml-11 line-clamp-2">
              {message.content}
            </p>
            
            {!message.read && (
              <div className="ml-11 mt-2">
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              </div>
            )}
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-primary">
            No messages found
          </h3>
          <p className="text-muted">
            You don't have any messages yet.
          </p>
        </div>
      )}
    </div>
  )
}