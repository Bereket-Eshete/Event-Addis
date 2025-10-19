import { Users, Calendar, MapPin, Star } from 'lucide-react';
import Image from 'next/image';

const stats = [
  {
    id: 1,
    icon: Users,
    number: '10,000+',
    label: 'Active Users',
    description: 'Event enthusiasts trust EventAddis',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 2,
    icon: Calendar,
    number: '500+',
    label: 'Events Hosted',
    description: 'Successful events organized monthly',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    id: 3,
    icon: MapPin,
    number: '50+',
    label: 'Venues',
    description: 'Premium locations across Addis Ababa',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    id: 4,
    icon: Star,
    number: '4.9',
    label: 'User Rating',
    description: 'Consistently excellent user experience',
    gradient: 'from-pink-500 to-pink-600',
  },
];

export function StatsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/adwa-event (1).jpg"
          alt="Addis Ababa event"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-purple-800/80 to-pink-900/90"></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-6">
            EventAddis by the Numbers
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            Join a thriving community of event lovers and organizers making Addis Ababa's social scene more vibrant than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
                  {/* Icon */}
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    {stat.number}
                  </div>

                  {/* Label */}
                  <div className="text-lg font-semibold text-purple-100 mb-2">
                    {stat.label}
                  </div>

                  {/* Description */}
                  <div className="text-sm text-purple-200">
                    {stat.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 max-w-4xl mx-auto">
            <p className="text-lg text-purple-100 leading-relaxed">
              "EventAddis has become the go-to platform for discovering and organizing events in Addis Ababa. 
              Our community continues to grow as more people discover the power of connecting through shared experiences."
            </p>
            <div className="mt-6">
              <div className="text-white font-semibold">EventAddis Team</div>
              <div className="text-purple-200 text-sm">Building connections, one event at a time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}