"use client";

import { useState, useEffect } from "react";
import { Calendar, MapPin, Clock, Download } from "lucide-react";
import { dashboardAPI } from "@/lib/api";
import { toast } from "react-hot-toast";
import { generateTicketPDF } from "@/utils/ticketGenerator";
import { viewTicket } from "@/utils/ticketViewer";

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const response = await dashboardAPI.getUserBookings();
      setTickets(response.data.bookings || []);
    } catch (error) {
      toast.error('Failed to fetch tickets');
    } finally {
      setLoading(false);
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
      <h1 className="mb-6 text-2xl font-bold text-primary">My Tickets</h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket._id}
            className="p-6 border rounded-lg bg-surface border-muted"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {ticket.eventId?.title}
                </h3>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    ticket.status === "confirmed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => viewTicket(ticket)}
                  className="flex items-center px-3 py-2 space-x-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <span>View</span>
                </button>
                <button 
                  onClick={() => generateTicketPDF(ticket)}
                  className="flex items-center px-3 py-2 space-x-2 text-white rounded-lg bg-primary hover:bg-primary/90"
                >
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3 text-muted">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(ticket.eventId?.startAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{new Date(ticket.eventId?.startAt).toLocaleTimeString()}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{ticket.eventId?.venue}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted">
                {ticket.ticketType || 'General'} Ticket
              </span>
              <span className="font-semibold text-primary">
                {ticket.totalAmount} ETB
              </span>
            </div>
          </div>
        ))}
      </div>

      {tickets.length === 0 && (
        <div className="py-12 text-center">
          <h3 className="mb-2 text-lg font-medium text-primary">
            No tickets found
          </h3>
          <p className="text-muted">
            You haven't booked any events yet.
          </p>
        </div>
      )}
    </div>
  );
}
