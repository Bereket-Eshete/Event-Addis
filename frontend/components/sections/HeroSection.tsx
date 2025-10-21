"use client";

import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative flex items-center overflow-hidden" style={{height: 'calc(100vh - 4rem)'}}>
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/addis-ababa-min.jpg"
          alt="Addis Ababa cityscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/65 dark:from-slate-900/98 dark:via-slate-900/85 dark:to-slate-900/70"></div>
      </div>

      <div className="relative z-10 px-4 max-w-7xl sm:px-6 lg:px-8 ml-12">
        <div className="text-white max-w-4xl">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="block animate-slide-in-left">Find and join the best events</span>
              <span className="block animate-slide-in-right animation-delay-300">
                in{" "}
                <span className="text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text">
                  Addis Ababa
                </span>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-slate-200 max-w-2xl leading-relaxed animate-fade-in-up animation-delay-300">
              Discover amazing events, connect with like-minded people, and
              create unforgettable memories in Ethiopia's vibrant capital.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 animate-fade-in-up animation-delay-500">
              <Link 
                href="/discover"
                className="px-6 py-3 text-base font-semibold text-white rounded-full gradient-primary hover:opacity-90 transition-all transform hover:scale-105 shadow-2xl"
              >
                Explore Events
              </Link>
              <Link 
                href="/signup"
                className="px-6 py-3 text-base font-semibold text-white border-2 border-white rounded-full hover:bg-white hover:text-slate-900 transition-all transform hover:scale-105 backdrop-blur-sm"
              >
                Start Organizing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
