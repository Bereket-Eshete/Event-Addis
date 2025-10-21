import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Meron Tadesse",
    role: "Software Developer",
    company: "Tech Startup",
    image: "/testimonial-1.jpg",
    rating: 5,
    text: "EventAddis has completely transformed how I discover tech events in Addis. The platform is intuitive, and I've attended some amazing workshops that boosted my career.",
    gradient: "from-purple-500 to-purple-600",
  },
  {
    id: 2,
    name: "Daniel Bekele",
    role: "Event Organizer",
    company: "Cultural Events ET",
    image: "/testimonial-2.jpg",
    rating: 5,
    text: "As an organizer, EventAddis has made my life so much easier. The analytics dashboard and payment integration are game-changers for managing large events.",
    gradient: "from-emerald-500 to-emerald-600",
  },
  {
    id: 3,
    name: "Sara Mohammed",
    role: "Marketing Manager",
    company: "Local Business",
    image: "/testimonial-3.jpg",
    rating: 5,
    text: "I love how EventAddis showcases the diversity of Addis Ababa's event scene. From business networking to cultural festivals, everything is in one place.",
    gradient: "from-pink-500 to-pink-600",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="py-24"
      style={{
        background: "color-mix(in srgb, var(--bg) 98%, var(--accent) 2%)",
      }}
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-3xl font-bold lg:text-5xl text-primary">
            What Our Community Says
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-muted">
            Join thousands of event enthusiasts and organizers who trust
            EventAddis to connect them with amazing experiences in Addis Ababa.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative p-8 transition-all duration-300 card rounded-2xl hover:shadow-2xl"
            >
              {/* Quote Icon */}
              <div
                className={`absolute -top-4 left-8 w-8 h-8 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center shadow-lg`}
              >
                <Quote className="w-4 h-4 text-white" />
              </div>

              <div className="space-y-6">
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg leading-relaxed text-primary">
                  "{testimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-600 dark:to-slate-700">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-primary">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.gradient} opacity-5 rounded-2xl`}
              ></div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}
