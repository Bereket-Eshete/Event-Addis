import { Calendar, MapPin, Clock, Download } from "lucide-react";

export default function MyTicketsPage() {
  const tickets = [
    {
      id: 1,
      event: "Tech Conference 2024",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Addis Ababa Convention Center",
      ticketType: "VIP",
      price: 2500,
      status: "confirmed",
    },
    {
      id: 2,
      event: "Music Festival",
      date: "Dec 20, 2024",
      time: "6:00 PM",
      location: "Meskel Square",
      ticketType: "General",
      price: 800,
      status: "pending",
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-primary">My Tickets</h1>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="p-6 border rounded-lg bg-surface border-muted"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  {ticket.event}
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
              <button className="flex items-center px-3 py-2 space-x-2 text-white rounded-lg bg-primary hover:bg-primary/90">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-3 text-muted">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{ticket.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{ticket.location}</span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-muted">
                {ticket.ticketType} Ticket
              </span>
              <span className="font-semibold text-primary">
                {ticket.price} ETB
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
