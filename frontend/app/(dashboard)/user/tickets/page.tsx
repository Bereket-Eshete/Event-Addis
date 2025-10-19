import { Calendar, MapPin, Clock, Download } from 'lucide-react'

export default function MyTicketsPage() {
  const tickets = [
    {
      id: 1,
      event: 'Tech Conference 2024',
      date: 'Dec 15, 2024',
      time: '9:00 AM',
      location: 'Addis Ababa Convention Center',
      ticketType: 'VIP',
      price: 2500,
      status: 'confirmed'
    },
    {
      id: 2,
      event: 'Music Festival',
      date: 'Dec 20, 2024',
      time: '6:00 PM',
      location: 'Meskel Square',
      ticketType: 'General',
      price: 800,
      status: 'pending'
    }
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary mb-6">My Tickets</h1>
      
      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="bg-surface border border-muted rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-primary">{ticket.event}</h3>
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  ticket.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {ticket.status}
                </span>
              </div>
              <button className="flex items-center space-x-2 px-3 py-2 bg-primary text-white rounded-lg hover:bg-primary/90">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span>{ticket.time}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{ticket.location}</span>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-muted">{ticket.ticketType} Ticket</span>
              <span className="font-semibold text-primary">{ticket.price} ETB</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}