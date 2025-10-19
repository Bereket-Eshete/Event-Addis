"use client";

import { useState } from "react";
import {
  MessageSquare,
  Send,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const messages = [
  {
    id: 1,
    from: "Meron Tadesse",
    email: "meron.tadesse@email.com",
    subject: "Question about Tech Workshop",
    message:
      "Hi, I have a question about the parking arrangements for the tech workshop. Is there a free parking available?",
    eventName: "Tech Startup Workshop",
    timestamp: "2024-12-14T10:30:00",
    status: "unread",
    type: "attendee",
  },
  {
    id: 2,
    from: "System",
    email: "system@eventaddis.com",
    subject: "Event Approval Required",
    message:
      'Your event "Business Networking Event" requires admin approval before it can be published.',
    eventName: "Business Networking Event",
    timestamp: "2024-12-13T15:45:00",
    status: "read",
    type: "system",
  },
  {
    id: 3,
    from: "Daniel Bekele",
    email: "daniel.bekele@email.com",
    subject: "Ticket Transfer Request",
    message: "I need to transfer my ticket to my colleague. How can I do this?",
    eventName: "Tech Startup Workshop",
    timestamp: "2024-12-12T09:15:00",
    status: "replied",
    type: "attendee",
  },
  {
    id: 4,
    from: "Sara Mohammed",
    email: "sara.mohammed@email.com",
    subject: "Refund Request",
    message:
      "Due to a family emergency, I cannot attend the networking event. Can I get a refund?",
    eventName: "Business Networking Event",
    timestamp: "2024-12-11T14:20:00",
    status: "unread",
    type: "attendee",
  },
];

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [replyText, setReplyText] = useState("");

  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || message.status === statusFilter;
    const matchesType = typeFilter === "all" || message.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "unread":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "read":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "replied":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-red-100 text-red-800";
      case "read":
        return "bg-yellow-100 text-yellow-800";
      case "replied":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText);
      setReplyText("");
    }
  };

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">
          Messages & Communication
        </h1>
        <p className="mt-1 text-muted">
          Manage communications with attendees and system notifications
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Total Messages</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {messages.length}
              </p>
            </div>
            <MessageSquare className="w-8 h-8 text-primary" />
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
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Replied</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {messages.filter((m) => m.status === "replied").length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="p-6 card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted">Response Rate</p>
              <p className="mt-1 text-2xl font-bold text-primary">85%</p>
            </div>
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
              <span className="text-sm font-bold text-primary">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Interface */}
      <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
        {/* Messages List */}
        <div className="overflow-hidden lg:col-span-1 card">
          {/* Filters */}
          <div className="p-4 border-b border-muted">
            <div className="relative mb-4">
              <Search className="absolute w-4 h-4 transform -translate-y-1/2 left-3 top-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full py-2 pl-10 pr-4 text-sm border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <select
                className="flex-1 px-3 py-2 text-sm border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
              </select>

              <select
                className="flex-1 px-3 py-2 text-sm border rounded-lg border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="attendee">Attendee</option>
                <option value="system">System</option>
              </select>
            </div>
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`p-4 border-b border-muted cursor-pointer hover:bg-surface/50 transition-colors ${
                  selectedMessage.id === message.id
                    ? "bg-primary/5 border-l-4 border-l-primary"
                    : ""
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(message.status)}
                    <span className="text-sm font-medium text-primary">
                      {message.from}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      message.status
                    )}`}
                  >
                    {message.status}
                  </span>
                </div>

                <h4 className="mb-1 text-sm font-medium text-primary">
                  {message.subject}
                </h4>
                <p className="mb-2 text-xs text-muted line-clamp-2">
                  {message.message}
                </p>

                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{message.eventName}</span>
                  <span>
                    {new Date(message.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Detail */}
        <div className="flex flex-col lg:col-span-2 card">
          {selectedMessage ? (
            <>
              {/* Message Header */}
              <div className="p-6 border-b border-muted">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-primary">
                      {selectedMessage.subject}
                    </h2>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-muted">
                      <span>From: {selectedMessage.from}</span>
                      <span>Event: {selectedMessage.eventName}</span>
                      <span>
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedMessage.status
                    )}`}
                  >
                    {selectedMessage.status}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div className="flex-1 p-6">
                <div className="p-4 mb-6 rounded-lg bg-surface/50">
                  <p className="leading-relaxed text-primary">
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Reply Section */}
                {selectedMessage.type === "attendee" && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-primary">Reply</h3>
                    <textarea
                      className="w-full p-4 border rounded-lg resize-none border-muted bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                      rows={4}
                      placeholder="Type your reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <div className="flex justify-end">
                      <button
                        onClick={handleSendReply}
                        className="flex items-center px-6 py-2 space-x-2 rounded-lg btn-primary"
                        disabled={!replyText.trim()}
                      >
                        <Send className="w-4 h-4" />
                        <span>Send Reply</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1">
              <div className="text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-muted" />
                <h3 className="mb-2 text-lg font-medium text-primary">
                  Select a message
                </h3>
                <p className="text-muted">
                  Choose a message from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
