'use client'

import React, { useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Briefcase,
  Landmark,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  Youtube,
  MessageSquare,
  Send,
  Sparkles,
  Headphones,
  Check,
  ChevronRight,
  HelpCircle
} from 'lucide-react'
import { AnimatedSection } from '@/components/animated-section'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DonationModal } from '@/components/donation-modal'
import { VolunteerApplication } from '@/components/volunteer-application'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          category: formData.subject // Map subject to category or keep separate
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to send message')
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err) {
      setError('Something went wrong. Please try again later.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-8 h-8 text-primary" />,
      title: 'Head Office',
      details: [
        'Office No. 02, New Sagar Samrat Bldg',
        'Cabin Cross Rd, Narmada Nagar',
        'Bhayandar East, Mumbai - 401105',
        'Maharashtra, India',
      ],
      color: 'from-blue-500/10 to-cyan-500/10',
    },
    {
      icon: <Landmark className="w-8 h-8 text-accent" />,
      title: 'Regional Office',
      details: [
        'Community Center, Thane West',
        'Maharashtra 400610',
        'Serving Thane & Navi Mumbai',
      ],
      color: 'from-purple-500/10 to-pink-500/10',
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: 'Field Centers',
      details: [
        '9 operational centers across 9 cities',
        'Direct community engagement',
        'School & program centers',
      ],
      color: 'from-green-500/10 to-emerald-500/10',
    },
    {
      icon: <Phone className="w-8 h-8 text-accent" />,
      title: 'Phone Lines',
      details: [
        'Mobile: +91 98198 87551',
        'WhatsApp: +91 98198 87551',
      ],
      color: 'from-orange-500/10 to-yellow-500/10',
    },
    {
      icon: <Mail className="w-8 h-8 text-primary" />,
      title: 'Email',
      details: [
        'kripakunjcharitabletrust@gmail.com',
        'info@kripakunjngo.org',
      ],
      color: 'from-blue-500/10 to-indigo-500/10',
    },
    {
      icon: <Clock className="w-8 h-8 text-accent" />,
      title: 'Office Hours',
      details: [
        'Mon - Fri: 9:00 AM - 6:00 PM',
        'Sat: 10:00 AM - 4:00 PM',
        'Sun: Closed',
      ],
      color: 'from-red-500/10 to-orange-500/10',
    },
  ]

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <AnimatedSection direction="fade">
              <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1 text-sm font-semibold uppercase tracking-wider rounded-full">
                Get In Touch
              </Badge>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-6 sm:mb-8 leading-tight tracking-tight">
                Let's Start a <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-accent to-primary animate-gradient-x font-extrabold italic">Conversation</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-foreground/70 mb-8 sm:mb-10 leading-relaxed font-medium">
                Whether you're looking to volunteer, donate, or just want to learn more about our mission, our team is here to help you make an impact.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white py-24 md:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {contactInfo.map((info, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 100}>
                <div className={`group relative bg-linear-to-br ${info.color} rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 h-full border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden`}>
                  {/* Background Glow */}
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>

                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg mb-4 sm:mb-6 md:mb-8 transform group-hover:rotate-6 transition-transform duration-300">
                      {info.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">{info.title}</h3>
                    <div className="space-y-3">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-foreground/70 font-medium leading-relaxed">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="relative py-24 md:py-32 bg-linear-to-b from-gray-50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Contact Form */}
            <AnimatedSection direction="right">
              <div className="bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 lg:p-12 shadow-2xl border border-gray-100">
                <div className="mb-6 sm:mb-8 md:mb-10">
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4">Send a Message</h2>
                  <p className="text-sm sm:text-base text-foreground/60 font-medium">Have a specific inquiry? Fill out the form below and our team will get back to you within 24 hours.</p>
                </div>

                {submitted && (
                  <div className="mb-8 p-5 bg-green-50 border border-green-200 rounded-2xl text-green-700 text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shrink-0">
                      <Check className="w-5 h-5" />
                    </div>
                    Thank you! Your message has been received. We'll be in touch shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-bold text-foreground/80 ml-1">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="h-12 sm:h-14 rounded-xl border-gray-200 focus:ring-primary focus:border-primary px-4 sm:px-5 font-medium text-sm sm:text-base"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-bold text-foreground/80 ml-1">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="h-12 sm:h-14 rounded-xl border-gray-200 focus:ring-primary focus:border-primary px-4 sm:px-5 font-medium text-sm sm:text-base"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-bold text-foreground/80 ml-1">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="h-12 sm:h-14 rounded-xl border-gray-200 focus:ring-primary focus:border-primary px-4 sm:px-5 font-medium text-sm sm:text-base"
                        placeholder="+91 XXXXX XXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-bold text-foreground/80 ml-1">Subject</Label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="flex h-12 sm:h-14 w-full rounded-xl border border-gray-200 bg-transparent px-4 sm:px-5 py-2 text-sm sm:text-base font-medium ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select Inquiry Type</option>
                        <option value="general">General Support</option>
                        <option value="volunteer">Volunteer Opportunity</option>
                        <option value="donation">Donation Inquiry</option>
                        <option value="partnership">Corporate Partnership</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-bold text-foreground/80 ml-1">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you today?"
                      className="min-h-[120px] sm:min-h-[160px] rounded-xl sm:rounded-2xl border-gray-200 focus:ring-primary focus:border-primary p-4 sm:p-5 font-medium resize-none text-sm sm:text-base"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 sm:h-14 md:h-16 bg-primary hover:bg-primary/90 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-primary/20 transition-all hover:-translate-y-1"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    Send Message
                  </Button>
                </form>
              </div>
            </AnimatedSection>

            {/* Side Info & Socials */}
            <div className="space-y-8 sm:space-y-12 mt-8 md:mt-0">
              <AnimatedSection direction="left" delay={200}>
                <div className="bg-primary/5 rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 border border-primary/10">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6">Support & Assistance</h3>
                  <div className="space-y-6 sm:space-y-8">
                    {[
                      {
                        title: 'Fast Response',
                        desc: 'We typically respond to all inquiries within 24 business hours.',
                        icon: <Clock className="w-6 h-6 text-primary" />
                      },
                      {
                        title: 'Multiple Channels',
                        desc: 'Reach us via email, phone, or visit our local field centers.',
                        icon: <MessageSquare className="w-6 h-6 text-primary" />
                      },
                      {
                        title: 'Global Outreach',
                        desc: 'Operating across 9 cities with a dedicated volunteer network.',
                        icon: <Globe className="w-6 h-6 text-primary" />
                      }
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                          <p className="text-sm text-foreground/60 font-medium">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="left" delay={400}>
                <div className="bg-accent/5 rounded-[2rem] p-10 border border-accent/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Sparkles className="w-20 h-20 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-4">Join Our Community</h3>
                  <p className="text-sm text-foreground/70 font-medium mb-8">
                    Follow us on social media for daily updates on our initiatives and upcoming events.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {[
                      { icon: <Facebook className="w-5 h-5" />, href: 'https://www.facebook.com/kripakunjtrust' },
                      { icon: <Instagram className="w-5 h-5" />, href: 'https://www.instagram.com/kripakunjtrust' },
                      { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/kripakunjtrust' },
                      { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/kripakunjtrust' },
                      { icon: <Youtube className="w-5 h-5" />, href: 'https://youtube.com/@kripakunjtrust' }
                    ].map((social, i) => (
                      <a
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-foreground/60 hover:bg-accent hover:text-white shadow-sm transition-all"
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-24 md:py-32 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20 border-0 px-4 py-1 text-sm font-semibold rounded-full">
              Support Center
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </AnimatedSection>

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
                a: 'Absolutely! We welcome corporate partnerships for CSR initiatives. Please contact our partnership team at kripakunjcharitabletrust@gmail.com to discuss collaboration opportunities.',
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
              <AnimatedSection key={idx} direction="up" delay={idx * 50}>
                <div className="group bg-gray-50/50 hover:bg-white rounded-2xl p-8 border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  <div className="flex gap-6">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                      <HelpCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-3">{faq.q}</h3>
                      <p className="text-foreground/60 leading-relaxed font-medium">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-r from-primary to-accent opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <AnimatedSection direction="fade">
            <h2 className="text-4xl md:text-6xl font-extrabold text-foreground mb-8 leading-tight">
              Ready to <span className="text-primary">Make an Impact?</span>
            </h2>
            <p className="text-xl text-foreground/70 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Join thousands of supporters who are transforming lives and creating lasting change in communities across India. Every contribution counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="h-16 px-10 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => setIsDonationModalOpen(true)}
              >
                Donate Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-16 px-10 rounded-2xl border-2 border-primary/20 hover:border-primary hover:bg-primary/5 text-primary font-bold text-lg transition-all hover:scale-105 active:scale-95 cursor-pointer"
                onClick={() => setIsVolunteerModalOpen(true)}
              >
                Volunteer With Us
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <DonationModal
        isOpen={isDonationModalOpen}
        onOpenChange={setIsDonationModalOpen}
        campaignTitle="General Donation (Contact Page)"
      />

      <VolunteerApplication
        isOpen={isVolunteerModalOpen}
        onOpenChange={setIsVolunteerModalOpen}
      />

      <Footer />
    </>
  )
}
