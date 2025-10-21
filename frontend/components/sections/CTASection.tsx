import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-16 overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      {/* Floating Elements */}
      <div className="absolute w-20 h-20 rounded-full top-20 left-20 bg-white/10 blur-xl"></div>
      <div className="absolute w-32 h-32 rounded-full bottom-20 right-20 bg-amber-400/20 blur-2xl"></div>
      <div className="absolute w-16 h-16 rounded-full top-1/2 left-1/4 bg-pink-400/20 blur-xl"></div>

      <div className="relative max-w-3xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <div className="space-y-6">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-2xl font-bold leading-tight text-white md:text-4xl">
            Ready to discover amazing events?
          </h2>

          {/* Description */}
          <p className="max-w-xl mx-auto text-base text-purple-100 md:text-lg">
            Join thousands of event enthusiasts in Addis Ababa. Create your
            account today and never miss out on the experiences that matter to
            you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
            <button className="flex items-center justify-center px-6 py-3 text-base font-medium text-purple-700 transition-all bg-white rounded-lg shadow-xl hover:bg-purple-50 hover:shadow-2xl group">
              Get Started Free
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button className="px-6 py-3 text-base font-medium text-white transition-all border-2 border-white rounded-lg hover:bg-white hover:text-purple-700">
              Create Your Event
            </button>
          </div>

          {/* Trust Badge */}
          <div className="pt-4">
            <p className="text-xs text-purple-200">
              Trusted by 10,000+ users • Free to join • No hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
