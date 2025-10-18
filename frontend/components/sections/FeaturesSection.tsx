import { Search, Zap, BarChart3, Shield, Users, Calendar } from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'Smart Discovery',
    description: 'AI-powered event recommendations based on your interests, location, and past attendance.',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    icon: Zap,
    title: 'One-Click Registration',
    description: 'Secure instant booking with integrated payment processing and digital tickets.',
    gradient: 'from-amber-500 to-amber-600',
  },
  {
    icon: BarChart3,
    title: 'Creator Dashboard',
    description: 'Comprehensive analytics, attendee management, and revenue tracking for organizers.',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Bank-grade security with local payment methods including Chapa and mobile money.',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    icon: Users,
    title: 'Community Building',
    description: 'Connect with attendees, share experiences, and build lasting professional networks.',
    gradient: 'from-pink-500 to-pink-600',
  },
  {
    icon: Calendar,
    title: 'Smart Scheduling',
    description: 'Intelligent calendar integration with reminders and conflict detection.',
    gradient: 'from-indigo-500 to-indigo-600',
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Why Choose EventAddis?
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            We're revolutionizing how events are discovered, attended, and managed in Addis Ababa with cutting-edge technology and local expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border hover:border-purple-200 dark:hover:border-purple-700"
              >
                <div className="space-y-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}