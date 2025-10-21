'use client'

import { Calendar, MapPin, Users, Clock } from 'lucide-react';

import Image from 'next/image';

const events = [
  {
    id: 1,
    title: 'Addis Music Festival 2024',
    date: 'Dec 15, 2024',
    time: '7:00 PM',
    location: 'Millennium Hall',
    price: 'Free',
    category: 'Music',
    categoryColor: 'bg-purple-500',
    attendees: 234,
    image: '/event-one-min.jpg',
    organizer: 'Addis Events Co.',
  },
  {
    id: 2,
    title: 'Tech Startup Workshop',
    date: 'Dec 18, 2024',
    time: '2:00 PM',
    location: 'iCog Labs',
    price: '500 ETB',
    category: 'Workshop',
    categoryColor: 'bg-emerald-500',
    attendees: 45,
    image: '/event-two-min.jpg',
    organizer: 'Tech Hub Addis',
  },
  {
    id: 3,
    title: 'Business Networking Event',
    date: 'Dec 20, 2024',
    time: '6:00 PM',
    location: 'Sheraton Addis',
    price: '1200 ETB',
    category: 'Business',
    categoryColor: 'bg-amber-500',
    attendees: 89,
    image: '/event-three-min.jpg',
    organizer: 'Business Network ET',
  },
  {
    id: 4,
    title: 'Cultural Heritage Exhibition',
    date: 'Dec 22, 2024',
    time: '10:00 AM',
    location: 'National Museum',
    price: 'Free',
    category: 'Culture',
    categoryColor: 'bg-pink-500',
    attendees: 156,
    image: '/event-four-min.jpg',
    organizer: 'Heritage Foundation',
  },
];

export function PopularEventsSection() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-primary mb-6">
            Popular Events This Week
          </h2>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Discover the most exciting events happening in Addis Ababa. From tech meetups to cultural celebrations, there's something for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {events.map((event) => (
            <div
              key={event.id}
              className="group card rounded-2xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:border-primary/30 hover:shadow-primary/20 hover:shadow-2xl"
              style={{
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(139, 92, 246, 0.3), 0 0 60px rgba(236, 72, 153, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '';
              }}
            >
              {/* Event Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Category Badge */}
                <div className={`absolute top-4 left-4 ${event.categoryColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                  {event.category}
                </div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-surface text-primary px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                  {event.price}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Event Details */}
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-lg text-primary group-hover:text-accent transition-colors line-clamp-2">
                  {event.title}
                </h3>
                
                <div className="space-y-2 text-sm text-muted">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs text-muted mb-3">
                    by {event.organizer}
                  </p>
                  
                  <button 
                    type="button"
                    className="w-full bg-amber-500 dark:bg-amber-500 text-white hover:bg-amber-600 dark:hover:bg-amber-600 group-hover:scale-105 transition-all shadow-md rounded-lg py-2 px-4 font-medium text-sm"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/discover"
            className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg rounded-lg font-medium transition-all cursor-pointer hover:scale-105 hover:shadow-lg"
          >
            View All Events
          </a>
        </div>
      </div>
    </section>
  );
}