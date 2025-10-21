import { Calendar, Target, Eye, Heart, Users, Zap, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      {/* Hero Section */}
      <div className="gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Calendar className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            About EventAddis
          </h1>
          <p className="text-xl opacity-90">
            Connecting communities through amazing events in Addis Ababa
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-6 text-center">Our Story</h2>
          <div className="bg-surface rounded-lg border border-muted p-8">
            <p className="text-muted text-lg leading-relaxed mb-6">
              EventAddis was born from a simple observation: Addis Ababa is a vibrant city full of 
              incredible events, but discovering and attending them was often challenging. People 
              missed out on amazing conferences, workshops, cultural events, and networking opportunities 
              simply because they didn't know they existed.
            </p>
            <p className="text-muted text-lg leading-relaxed mb-6">
              Founded in 2024, we set out to bridge this gap by creating a centralized platform 
              where event organizers can showcase their events and attendees can easily discover, 
              explore, and participate in the experiences that matter to them.
            </p>
            <p className="text-muted text-lg leading-relaxed">
              Today, EventAddis serves as the go-to platform for events in Ethiopia's capital, 
              fostering connections, learning, and community engagement across diverse industries 
              and interests.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-surface rounded-lg border border-muted p-8 text-center">
              <Target className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-muted leading-relaxed">
                To democratize event discovery and participation in Addis Ababa by providing 
                a seamless, user-friendly platform that connects event organizers with their 
                ideal audiences, fostering community growth and knowledge sharing.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-surface rounded-lg border border-muted p-8 text-center">
              <Eye className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-muted leading-relaxed">
                To become the leading event platform in Ethiopia, empowering communities 
                to connect, learn, and grow together while showcasing the rich cultural 
                and professional landscape of our beautiful country.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface rounded-lg border border-muted p-6 text-center">
              <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-primary mb-2">Community First</h4>
              <p className="text-muted text-sm">
                We prioritize building strong, inclusive communities where everyone can 
                participate and contribute.
              </p>
            </div>

            <div className="bg-surface rounded-lg border border-muted p-6 text-center">
              <Zap className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-primary mb-2">Innovation</h4>
              <p className="text-muted text-sm">
                We continuously improve our platform with cutting-edge technology 
                to enhance user experience.
              </p>
            </div>

            <div className="bg-surface rounded-lg border border-muted p-6 text-center">
              <Globe className="w-10 h-10 text-primary mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-primary mb-2">Accessibility</h4>
              <p className="text-muted text-sm">
                We believe great events should be accessible to everyone, regardless 
                of background or experience level.
              </p>
            </div>
          </div>
        </section>

        {/* What We Do */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">What We Do</h2>
          <div className="bg-surface rounded-lg border border-muted p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-primary mb-4">For Event Organizers</h4>
                <ul className="space-y-2 text-muted">
                  <li>• Easy event creation and management</li>
                  <li>• Integrated payment processing</li>
                  <li>• Real-time analytics and insights</li>
                  <li>• Attendee management tools</li>
                  <li>• Marketing and promotion support</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold text-primary mb-4">For Attendees</h4>
                <ul className="space-y-2 text-muted">
                  <li>• Discover events by category and interest</li>
                  <li>• Secure online booking and payments</li>
                  <li>• Digital ticket management</li>
                  <li>• Event reminders and updates</li>
                  <li>• Community networking opportunities</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted">Happy Attendees</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">200+</div>
              <div className="text-muted">Event Organizers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted">Event Categories</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="bg-surface rounded-lg border border-muted p-8">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-primary mb-4">Join Our Community</h3>
            <p className="text-muted mb-6">
              Whether you're an event organizer looking to reach more people or someone 
              seeking amazing experiences, EventAddis is here for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/signup" 
                className="px-6 py-3 text-white rounded-lg gradient-primary hover:opacity-90 transition-opacity"
              >
                Get Started Today
              </Link>
              <Link 
                href="/discover" 
                className="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
              >
                Explore Events
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}