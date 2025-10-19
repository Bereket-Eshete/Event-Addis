"use client";

import { Search, Calendar, MapPin, Users } from "lucide-react";

import Image from "next/image";

const filterChips = [
  { label: "Today", active: false },
  { label: "This Week", active: true },
  { label: "Free", active: false },
  { label: "Music", active: false },
  { label: "Tech", active: false },
];

export function HeroSection() {
  return (
    <section className="relative flex items-center min-h-screen overflow-hidden">
      {/* Background Image for the hero section */}
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

      <div className="relative z-10 px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left Column - Content */}
          <div className="space-y-8 text-white">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold leading-tight lg:text-6xl">
                Find and join the best events in{" "}
                <span className="text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text">
                  Addis Ababa
                </span>
              </h1>

              <p className="max-w-lg text-xl lg:text-2xl text-slate-200">
                Discover amazing events, connect with like-minded people, and
                create unforgettable memories in Ethiopia's vibrant capital.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <div className="flex overflow-hidden border shadow-2xl rounded-2xl bg-white/95 dark:bg-slate-800/95 border-white/20 backdrop-blur-sm">
                <div className="flex items-center flex-1 px-6">
                  <Search className="w-5 h-5 mr-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search events, venues, or organizers..."
                    className="flex-1 py-4 text-lg bg-transparent text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <button className="px-8 py-4 m-2 text-lg font-medium text-white transition-colors bg-amber-500 hover:bg-amber-600 rounded-xl">
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
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white/20 text-white border border-white/30 hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <button className="px-8 py-4 text-lg font-medium text-white transition-colors rounded-lg bg-amber-500 hover:bg-amber-600">
                Browse Events
              </button>
              <button className="px-8 py-4 text-lg font-medium text-white transition-all border-2 border-white rounded-lg hover:bg-white hover:text-slate-900">
                Create Event
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center pt-8 space-x-8">
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
          <div className="relative hidden lg:block">
            <div className="p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-3xl border-white/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white">
                  Trending Events
                </h3>

                {/* Sample Event Cards */}
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-white">
                          Tech Meetup {i}
                        </h4>
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
