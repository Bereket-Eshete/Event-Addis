import { Search, Ticket, Calendar } from 'lucide-react';
import Image from 'next/image';

const steps = [
  {
    id: 1,
    icon: Search,
    title: 'Browse & Discover',
    description: 'Find your perfect event using our smart search and personalized recommendations.',
    image: '/meskel-square.jpg',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    id: 2,
    icon: Ticket,
    title: 'Quick Registration',
    description: 'Secure your spot with one-click booking and instant confirmation.',
    image: '/african-union.jpg',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    id: 3,
    icon: Calendar,
    title: 'Attend & Enjoy',
    description: 'Get reminders, connect with attendees, and create unforgettable memories.',
    image: '/beherawi.jpg',
    gradient: 'from-emerald-500 to-emerald-600',
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-purple-50 dark:from-slate-900 dark:to-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            How EventAddis Works
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Getting started is simple. Follow these three easy steps to discover and attend amazing events in Addis Ababa.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.id} className="relative">
                {/* Step Number */}
                <div className="flex items-center mb-8">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {step.id}
                  </div>
                  <div className="ml-4 h-px bg-gradient-to-r from-slate-300 to-transparent dark:from-slate-600 flex-1 lg:hidden"></div>
                </div>

                {/* Content Card */}
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
                  {/* Image */}
                  <div className="relative h-48 rounded-xl overflow-hidden mb-6">
                    <Image
                      src={step.image}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    
                    {/* Icon Overlay */}
                    <div className={`absolute bottom-4 left-4 w-12 h-12 rounded-xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connecting Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-12 h-px bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500 z-10"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}