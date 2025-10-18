
import { ArrowRight, Sparkles } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600 relative overflow-hidden">
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-400/20 rounded-full blur-xl"></div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
            Ready to discover amazing events?
          </h2>

          {/* Description */}
          <p className="text-xl lg:text-2xl text-purple-100 max-w-2xl mx-auto">
            Join thousands of event enthusiasts in Addis Ababa. Create your account today and never miss out on the experiences that matter to you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button className="bg-white text-purple-700 hover:bg-purple-50 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transition-all group rounded-lg font-medium flex items-center justify-center">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="border-2 border-white text-white hover:bg-white hover:text-purple-700 text-lg px-8 py-4 rounded-lg font-medium transition-all">
              Create Your Event
            </button>
          </div>

          {/* Trust Badge */}
          <div className="pt-8">
            <p className="text-purple-200 text-sm">
              Trusted by 10,000+ users • Free to join • No hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}