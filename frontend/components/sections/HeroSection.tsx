"use client";

import { Search, Calendar, MapPin, Users } from 'lucide-react';

import Image from 'next/image';

const filterChips = [
  { label: 'Today', active: false },
  { label: 'This Week', active: true },
  { label: 'Free', active: false },
  { label: 'Music', active: false },
  { label: 'Tech', active: false },
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/addis-ababa-min.jpg"
          alt="Addis Ababa cityscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40 dark:from-slate-900/90 dark:via-slate-900/70 dark:to-slate-900/50"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Find and join the best events in{' '}
                <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                  Addis Ababa
                </span>
              </h1>
              
              <p className="text-xl lg:text-2xl text-slate-200 max-w-lg">
                Discover amazing events, connect with like-minded people, and create unforgettable memories in Ethiopia's vibrant capital.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="flex rounded-2xl bg-white/95 dark:bg-slate-800/95 shadow-2xl border border-white/20 overflow-hidden backdrop-blur-sm">
                <div className="flex-1 flex items-center px-6">
                  <Search className="h-5 w-5 text-slate-400 mr-3" />
                  <input
                    type="text"
                    placeholder="Search events, venues, or organizers..."
                    className="flex-1 py-4 bg-transparent text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none text-lg"
                  />
                </div>
                <button className="m-2 bg-amber-500 hover:bg-amber-600 text-white px-8 rounded-xl text-lg py-4 font-medium transition-colors">
                  Search
                </button>
              </div>
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap gap-3">
              {filterChips.map((chip) => (
                <button
                  key={chip.label}
                  className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                    chip.active
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm'
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-8 py-4 rounded-lg font-medium transition-colors">
                Browse Events
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 text-lg px-8 py-4 rounded-lg font-medium transition-all">
                Create Event
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">500+</div>
                <div className="text-sm text-slate-300">Events</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">10K+</div>
                <div className="text-sm text-slate-300">Attendees</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-400">200+</div>
                <div className="text-sm text-slate-300">Organizers</div>
              </div>
            </div>
          </div>

          {/* Right Column - Floating Card */}
          <div className="relative lg:block hidden">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">Trending Events</h3>
                
                {/* Sample Event Cards */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white/20 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">Tech Meetup {i}</h4>
                        <div className="flex items-center text-sm text-slate-300">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>Addis Ababa</span>
                          <Users className="w-3 h-3 ml-3 mr-1" />
                          <span>{50 + i * 10}+</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}