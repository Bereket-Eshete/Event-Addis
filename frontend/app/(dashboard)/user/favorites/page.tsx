import { Heart, Calendar, MapPin, Clock, Users } from 'lucide-react'

export default function FavoritesPage() {
  const favoriteEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: 'Dec 15, 2024',
      time: '9:00 AM',
      location: 'Addis Ababa Convention Center',
      price: 2500,
      attendees: 150
    },
    {
      id: 2,
      title: 'Art Exhibition Opening',
      date: 'Dec 18, 2024',
      time: '6:00 PM',
      location: 'National Museum',
      price: 500,
      attendees: 80
    }
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary">Favorite Events</h1>
        <p className="text-sm text-muted">{favoriteEvents.length} events saved</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoriteEvents.map((event) => (
          <div key={event.id} className="bg-surface border border-muted rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-red-500 fill-current" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-primary mb-2">{event.title}</h3>
              
              <div className="space-y-2 text-sm text-muted mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-primary">{event.price} ETB</span>
                <button className="px-4 py-2 gradient-primary text-white rounded-lg text-sm hover:opacity-90 transition-opacity">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}