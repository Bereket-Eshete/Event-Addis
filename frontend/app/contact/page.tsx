'use client'

import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.subject) {
      newErrors.subject = 'Please select a subject'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      toast.error('Please fix the errors below')
      return
    }
    
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Thank you for your message! We\'ve received your inquiry and will get back to you within 24 hours.', {
        duration: 5000,
        icon: '✉️'
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setErrors({})
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      {/* Hero Section */}
      <div className="gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <MessageSquare className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl opacity-90">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-primary mb-6">Get in Touch</h2>
            <p className="text-muted mb-8">
              Have questions about EventAddis? Need help with your event or booking? 
              We're here to help you every step of the way.
            </p>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <Mail className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">Email</h4>
                  <p className="text-muted">support@eventaddis.com</p>
                  <p className="text-muted">info@eventaddis.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Phone className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">Phone</h4>
                  <p className="text-muted">+251 911 123 456</p>
                  <p className="text-muted">+251 922 654 321</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">Address</h4>
                  <p className="text-muted">
                    Bole Road, Atlas Building<br />
                    3rd Floor, Office 301<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Clock className="w-6 h-6 text-primary mt-1" />
                <div>
                  <h4 className="font-semibold text-primary">Business Hours</h4>
                  <p className="text-muted">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-muted">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-muted">Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* FAQ Link */}
            <div className="mt-8 p-4 bg-surface rounded-lg border border-muted">
              <h4 className="font-semibold text-primary mb-2">Quick Answers</h4>
              <p className="text-muted text-sm mb-3">
                Looking for quick answers? Check out our FAQ section.
              </p>
              <a 
                href="/faq" 
                className="text-primary hover:text-accent font-medium text-sm"
              >
                Visit FAQ →
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-lg border border-muted p-8">
              <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-red-500 focus:ring-red-500/20' : 'border-muted focus:ring-primary/20'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-muted focus:ring-primary/20'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-primary mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 ${
                      errors.subject ? 'border-red-500 focus:ring-red-500/20' : 'border-muted focus:ring-primary/20'
                    }`}
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="event-organizer">Event Organizer Support</option>
                    <option value="attendee">Attendee Support</option>
                    <option value="technical">Technical Issue</option>
                    <option value="billing">Billing & Payments</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="feedback">Feedback & Suggestions</option>
                  </select>
                  {errors.subject && <p className="mt-1 text-sm text-red-500">{errors.subject}</p>}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-primary mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-primary focus:outline-none focus:ring-2 resize-none ${
                      errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-muted focus:ring-primary/20'
                    }`}
                    placeholder="Please describe your inquiry in detail..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex items-center justify-center px-6 py-3 text-white rounded-lg gradient-primary hover:opacity-90 disabled:opacity-50 transition-opacity"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 p-4 bg-accent/10 rounded-lg">
                <p className="text-sm text-muted">
                  <strong>Response Time:</strong> We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}