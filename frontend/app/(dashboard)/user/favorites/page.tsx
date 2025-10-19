import { Heart, Calendar, MapPin, Clock, Users } from "lucide-react";

export default function FavoritesPage() {
  const favoriteEvents = [
    {
      id: 1,
      title: "Tech Conference 2024",
      date: "Dec 15, 2024",
      time: "9:00 AM",
      location: "Addis Ababa Convention Center",
      price: 2500,
      attendees: 150,
    },
    {
      id: 2,
      title: "Art Exhibition Opening",
      date: "Dec 18, 2024",
      time: "6:00 PM",
      location: "National Museum",
      price: 500,
      attendees: 80,
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary">Favorite Events</h1>
        <p className="text-sm text-muted">
          {favoriteEvents.length} events saved
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {favoriteEvents.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden transition-shadow border rounded-lg bg-surface border-muted hover:shadow-lg"
          >
            <div className="relative">
              <div className="w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20"></div>
              <button className="absolute flex items-center justify-center w-8 h-8 transition-colors rounded-full top-3 right-3 bg-white/90 hover:bg-white">
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </button>
            </div>

            <div className="p-4">
              <h3 className="mb-2 font-semibold text-primary">{event.title}</h3>

              <div className="mb-4 space-y-2 text-sm text-muted">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4" />
                  <span>{event.attendees} attending</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-primary">
                  {event.price} ETB
                </span>
                <button className="px-4 py-2 text-sm text-white transition-opacity rounded-lg gradient-primary hover:opacity-90">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
