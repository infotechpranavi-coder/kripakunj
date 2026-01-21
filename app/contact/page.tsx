'use client'

import React from "react"

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ImageSlider } from '@/components/image-slider'
import { useState } from 'react'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form data:', formData)
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Head Office',
      details: [
        '4th Floor, Crystal Plaza',
        'Deepak Hospital Rd, Ramdev Park',
        'Mira Road East, Mumbai 401107',
        'Maharashtra, India',
      ],
    },
    {
      icon: '📍',
      title: 'Regional Office - Thane',
      details: [
        'Community Center, Thane West',
        'Maharashtra 400610',
        'Serving Thane & Navi Mumbai regions',
      ],
    },
    {
      icon: '📍',
      title: 'Field Centers',
      details: [
        '9 operational centers across 9 cities',
        'Direct community engagement locations',
        'School & program centers in slum areas',
      ],
    },
    {
      icon: '📞',
      title: 'Phone Lines',
      details: ['Toll Free: 1800-309-3337', 'Office: +91 22-2821-5555', 'Mobile: +91 9930-559-889', 'WhatsApp: +91 9930-559-889'],
    },
    {
      icon: '✉️',
      title: 'Email & Helpdesk',
      details: ['help@kripakunjngo.org', 'info@kripakunjngo.org', 'volunteer@kripakunjngo.org', 'support@kripakunjngo.org'],
    },
    {
      icon: '⏰',
      title: 'Office Hours',
      details: [
        'Monday - Friday: 9:00 AM - 6:00 PM IST',
        'Saturday: 10:00 AM - 4:00 PM IST',
        'Sunday: Closed',
        'Emergencies: 24/7 hotline available',
      ],
    },
    {
      icon: '🌐',
      title: 'Social Media',
      details: ['Facebook: @KripaKunjCharitableTrust', 'Instagram: @kripakunjngo', 'Twitter: @KripaKunjNGO', 'LinkedIn: KripaKunj Trust'],
    },
    {
      icon: '🏦',
      title: 'Bank Details (Donations)',
      details: ['Account: Kripa Kunj Charitable Trust', 'HDFC Bank - Mira Road Branch', 'IFSC: HDFC0000123', 'Contact for UPI & Online donation'],
    },
  ]

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
                Get in <span className="text-primary">Touch</span>
              </h1>
              <p className="text-lg text-foreground/70">
                Have questions about our programs? Want to donate or volunteer? We'd love to hear from you. Reach out to us today!
              </p>
            </div>
            <div>
              <ImageSlider
                images={[
                  {
                    src: '/slider-education.jpg',
                    alt: 'Contact us about programs',
                    caption: 'We\'re Here to Help',
                  },
                  {
                    src: '/slider-community.jpg',
                    alt: 'Join our team',
                    caption: 'Let\'s Connect',
                  },
                  {
                    src: '/slider-environment.jpg',
                    alt: 'Be part of our mission',
                    caption: 'Make a Difference',
                  },
                ]}
                autoPlay={true}
                interval={4000}
                height="h-72 md:h-80"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-8 text-center hover:shadow-md transition border border-border">
                <div className="text-4xl mb-4">{info.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-4">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-xs text-foreground/70 leading-relaxed">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-accent/10 border border-accent rounded-lg text-accent text-sm font-semibold">
                  Thank you! Your message has been sent successfully. We'll be in touch soon!
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="volunteer">Volunteering</option>
                    <option value="donation">Donation</option>
                    <option value="event">Event Registration</option>
                    <option value="partnership">Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Info & Quick Links */}
            <div>
              <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">We're Here to Help</h3>
                <p className="text-foreground/70 leading-relaxed mb-6">
                  Whether you want to contribute, volunteer, or simply learn more about our initiatives, we're excited to connect with you. Our team is ready to answer all your questions and guide you on how you can make a difference.
                </p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Quick Response Time</h4>
                    <p className="text-sm text-foreground/70">
                      We typically respond to all inquiries within 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Multiple Contact Options</h4>
                    <p className="text-sm text-foreground/70">
                      Reach out via email, phone, or visit us in person at our office.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-2">Join Our Newsletter</h4>
                    <p className="text-sm text-foreground/70">
                      Stay updated with our latest initiatives and events.
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-lg p-8">
                <h3 className="text-xl font-bold mb-4">Subscribe to Updates</h3>
                <p className="text-sm opacity-90 mb-6">
                  Get the latest news about our programs and events.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-lg text-foreground focus:outline-none"
                  />
                  <button className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-muted py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <div className="space-y-6">
            {[
              {
                q: 'How can I volunteer with Kripa Kunj?',
                a: 'You can visit our Volunteer page, select an opportunity that suits you, and fill out the application form. Our team will contact you for an initial interview. No prior experience required!',
              },
              {
                q: 'Is my donation tax-deductible?',
                a: 'Yes! We are registered as 80G and 12A certified NGO. You can claim tax benefits on your donations. A receipt will be provided for all donations.',
              },
              {
                q: 'How do I stay updated about events and programs?',
                a: 'You can subscribe to our newsletter, follow us on social media, or call our office for monthly event calendar. We also send WhatsApp updates to interested volunteers.',
              },
              {
                q: 'Can corporate organizations partner with us?',
                a: 'Absolutely! We welcome corporate partnerships for CSR initiatives. Please contact our partnership team at info@kripakunjngo.org to discuss collaboration opportunities.',
              },
              {
                q: 'What should I bring to volunteer events?',
                a: 'It depends on the event. For beach cleanups, bring gloves and enthusiasm. For education mentoring, bring passion and materials. Specific instructions are provided upon registration.',
              },
              {
                q: 'How transparent is the organization?',
                a: 'We maintain complete transparency through annual audits, impact reports, and financial disclosures. 80%+ of funds go directly to programs. Visit our website for detailed reports.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg p-6 border border-border hover:shadow-md transition">
                <h3 className="text-lg font-bold text-foreground mb-3">{faq.q}</h3>
                <p className="text-foreground/70 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to <span className="text-primary">Make an Impact?</span>
          </h2>
          <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
            Your support, whether through volunteering, donations, or partnerships, can transform lives and create lasting change in communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#donate"
              className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition"
            >
              Donate Now
            </a>
            <a
              href="/volunteer"
              className="inline-block px-8 py-3 border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition"
            >
              Volunteer With Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
