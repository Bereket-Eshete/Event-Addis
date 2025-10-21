'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react'

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData = [
    {
      category: "General",
      questions: [
        {
          question: "What is EventAddis?",
          answer: "EventAddis is a comprehensive event discovery and management platform for Addis Ababa. We connect event organizers with attendees, making it easy to discover, book, and manage events across the city."
        },
        {
          question: "Is EventAddis free to use?",
          answer: "Yes! Creating an account and browsing events is completely free. Event organizers pay a small service fee only when they sell paid tickets through our platform."
        },
        {
          question: "How do I create an account?",
          answer: "Click the 'Sign Up' button in the top right corner, choose whether you're an attendee or event organizer, fill in your details, and verify your email address. You can also sign up using your Google account."
        }
      ]
    },
    {
      category: "For Attendees",
      questions: [
        {
          question: "How do I find events?",
          answer: "You can browse events on our Discover page, use the search function, or filter by category, type, date, and price. You can also browse events from your user dashboard."
        },
        {
          question: "How do I book an event?",
          answer: "Once you find an event you like, click 'Book Now', select the number of tickets, and proceed to payment. For free events, your booking is confirmed immediately."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major payment methods through Chapa, including bank transfers, mobile money, and credit/debit cards. All payments are secure and encrypted."
        },
        {
          question: "Can I cancel my booking?",
          answer: "Cancellation policies vary by event. Check the event details for specific cancellation terms. Generally, you can cancel free events anytime, while paid events may have specific deadlines."
        },
        {
          question: "How do I get my tickets?",
          answer: "After successful booking, you'll receive a confirmation email with your digital tickets. You can also access and download your tickets from your user dashboard."
        }
      ]
    },
    {
      category: "For Event Organizers",
      questions: [
        {
          question: "How do I create an event?",
          answer: "Sign up as an event organizer, go to your dashboard, click 'Create Event', fill in all the event details including title, description, date, venue, and pricing, then publish your event."
        },
        {
          question: "What are the fees for event organizers?",
          answer: "EventAddis charges a small service fee (typically 2-5%) only on paid ticket sales. Free events have no fees. The exact fee structure is displayed during event creation."
        },
        {
          question: "How do I manage attendees?",
          answer: "Your organizer dashboard provides comprehensive attendee management tools. You can view bookings, check attendee details, send messages, and track check-ins."
        },
        {
          question: "When do I receive payments?",
          answer: "Payments are processed and transferred to your account within 3-5 business days after the event concludes, minus our service fees and any applicable taxes."
        },
        {
          question: "Can I edit my event after publishing?",
          answer: "Yes, you can edit most event details before the event starts. However, major changes (like date or venue) should be communicated to attendees and may require approval."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble logging in",
          answer: "Try resetting your password using the 'Forgot Password' link. If you're still having issues, clear your browser cache or try a different browser. Contact support if problems persist."
        },
        {
          question: "My payment failed, what should I do?",
          answer: "Payment failures can occur due to insufficient funds, network issues, or bank restrictions. Try again with a different payment method or contact your bank. If issues persist, contact our support team."
        },
        {
          question: "I didn't receive my confirmation email",
          answer: "Check your spam/junk folder first. If it's not there, you can resend the confirmation from your account settings or contact support for assistance."
        },
        {
          question: "The website is not working properly",
          answer: "Try refreshing the page, clearing your browser cache, or using a different browser. Make sure you have a stable internet connection. Report persistent issues to our technical support team."
        }
      ]
    },
    {
      category: "Policies & Safety",
      questions: [
        {
          question: "What is your refund policy?",
          answer: "Refund policies are set by individual event organizers. Check the event details for specific refund terms. EventAddis facilitates refunds according to the organizer's policy."
        },
        {
          question: "How do you ensure event quality?",
          answer: "We have community guidelines and review processes for events. We also rely on user feedback and ratings to maintain quality standards across our platform."
        },
        {
          question: "What if an event is cancelled?",
          answer: "If an organizer cancels an event, all attendees are automatically notified and refunded (for paid events). We work with organizers to minimize cancellations and provide alternative solutions when possible."
        },
        {
          question: "How do you protect my personal information?",
          answer: "We take privacy seriously and follow strict data protection protocols. Your personal information is encrypted and never shared with third parties without your consent. Read our Privacy Policy for full details."
        }
      ]
    }
  ]

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const filteredFAQ = faqData.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

  return (
    <div className="min-h-screen" style={{backgroundColor: 'var(--bg)'}}>
      {/* Hero Section */}
      <div className="gradient-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl opacity-90">
            Find answers to common questions about EventAddis
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-5 h-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-muted rounded-lg bg-surface text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFAQ.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-muted mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary mb-2">No results found</h3>
            <p className="text-muted">Try adjusting your search terms</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFAQ.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold text-primary mb-6">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const globalIndex = categoryIndex * 100 + questionIndex
                    const isOpen = openItems.includes(globalIndex)
                    
                    return (
                      <div key={questionIndex} className="bg-surface rounded-lg border border-muted">
                        <button
                          onClick={() => toggleItem(globalIndex)}
                          className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-accent/5 transition-colors"
                        >
                          <span className="font-semibold text-primary pr-4">{faq.question}</span>
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-muted flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted flex-shrink-0" />
                          )}
                        </button>
                        
                        {isOpen && (
                          <div className="px-6 pb-4">
                            <div className="border-t border-muted pt-4">
                              <p className="text-muted leading-relaxed">{faq.answer}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-surface rounded-lg border border-muted p-8">
            <h3 className="text-xl font-bold text-primary mb-4">Still have questions?</h3>
            <p className="text-muted mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 text-white rounded-lg gradient-primary hover:opacity-90 transition-opacity"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}