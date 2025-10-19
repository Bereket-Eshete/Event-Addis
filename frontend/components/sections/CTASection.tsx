import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      {/* Floating Elements */}
      <div className="absolute w-20 h-20 rounded-full top-20 left-20 bg-white/10 blur-xl"></div>
      <div className="absolute w-32 h-32 rounded-full bottom-20 right-20 bg-amber-400/20 blur-2xl"></div>
      <div className="absolute w-16 h-16 rounded-full top-1/2 left-1/4 bg-pink-400/20 blur-xl"></div>

      <div className="relative max-w-4xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold leading-tight text-white lg:text-6xl">
            Ready to discover amazing events?
          </h2>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-xl text-purple-100 lg:text-2xl">
            Join thousands of event enthusiasts in Addis Ababa. Create your
            account today and never miss out on the experiences that matter to
            you.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
            <button className="flex items-center justify-center px-8 py-4 text-lg font-medium text-purple-700 transition-all bg-white rounded-lg shadow-xl hover:bg-purple-50 hover:shadow-2xl group">
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button className="px-8 py-4 text-lg font-medium text-white transition-all border-2 border-white rounded-lg hover:bg-white hover:text-purple-700">
              Create Your Event
            </button>
          </div>

          {/* Trust Badge */}
          <div className="pt-8">
            <p className="text-sm text-purple-200">
              Trusted by 10,000+ users • Free to join • No hidden fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
