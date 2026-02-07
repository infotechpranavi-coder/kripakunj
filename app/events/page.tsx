'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSlider } from '@/components/hero-slider'
import Link from 'next/link'
import { upcomingEvents as staticUpcomingEvents } from '@/lib/events-data'
import { Button } from '@/components/ui/button'
import EventRegistrationModal from '@/components/EventRegistrationModal'
import { VolunteerApplication } from '@/components/volunteer-application'
import { useSearchParams } from 'next/navigation'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { shareLink } from '@/lib/share-utils'

export default function Events() {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([])
  const [pastEvents, setPastEvents] = useState<any[]>([])

  const [isLoading, setIsLoading] = useState(true)
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false)

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleShare = async (eventId: string, eventTitle: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const shareUrl = `${window.location.origin}/events/${eventId}`
    
    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventTitle,
          text: `Check out this event: ${eventTitle}`,
          url: shareUrl,
        })
        toast.success('Shared successfully!')
        return
      } catch (err) {
        // User cancelled or error occurred, fall back to clipboard
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  const fetchEvents = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/events')
      const result = await response.json()

      const now = new Date()
      // Reset time part to compare only dates properly if needed, but precise comp is okay
      now.setHours(0, 0, 0, 0)

      if (result.success && result.data.length > 0) {
        const mappedEvents = result.data.map((e: any) => ({
          ...e,
          id: e._id, // Ensure id is available for links
          rawDate: new Date(e.date), // Keep raw date for sorting
          date: new Date(e.date).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        }))

        const upcoming = mappedEvents.filter((e: any) => e.rawDate >= now)
          .sort((a: any, b: any) => a.rawDate.getTime() - b.rawDate.getTime())

        const past = mappedEvents.filter((e: any) => e.rawDate < now)
          .sort((a: any, b: any) => b.rawDate.getTime() - a.rawDate.getTime())

        setUpcomingEvents(upcoming)
        setPastEvents(past)
      } else {
        // Fallback for demo
        setUpcomingEvents(staticUpcomingEvents)
        setPastEvents([])
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
      setUpcomingEvents(staticUpcomingEvents)
    } finally {
      setIsLoading(false)
    }
  }

  const heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920&q=80',
      alt: 'Community events and gatherings',
      title: 'Our Events',
      subtitle: 'Join Us in Making a Difference',
      description: 'Be part of our community-driven events and help us create positive change in society. From educational workshops to environmental initiatives, every event is an opportunity to make an impact.',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&q=80',
      alt: 'Volunteers working together',
      title: 'Community Impact',
      subtitle: 'Monthly Events & Initiatives',
      description: 'Join hundreds of volunteers in our monthly events including beach cleanups, health camps, education drives, and community development programs across 9 cities.',
    },
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
      alt: 'Environmental and social events',
      title: 'Make an Impact',
      subtitle: 'Events That Change Lives',
      description: 'Participate in events that create lasting change - from tree plantation drives to women empowerment workshops, blood donation camps to food distribution initiatives.',
    },
  ]
  // upcomingEvents is now imported from lib/events-data.ts


  // pastEvents is now imported from lib/events-data.ts


  return (
    <>
      <Navigation />

      {/* Hero Section with Slider */}
      <section className="relative">
        <HeroSlider slides={heroSlides} autoPlay={true} interval={5000} />
      </section>

      {/* Upcoming Events */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
            Upcoming <span className="text-primary">Events</span>
          </h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 flex flex-col cursor-pointer"
                >
                  <Link href={`/events/${event.id}`} className="flex-grow">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary"></div>
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-primary rounded-full text-xs font-semibold whitespace-nowrap">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-4">{event.title}</h3>
                      <div className="space-y-3 mb-4 text-foreground/70">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary text-sm">📅</span>
                          </div>
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary text-sm">🕐</span>
                          </div>
                          <span className="text-sm">{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="text-primary text-sm">📍</span>
                          </div>
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      <p className="text-foreground/70 mb-6 text-sm leading-relaxed line-clamp-3">{event.description}</p>
                    </div>
                  </Link>
                  <div className="p-6 pt-0 flex gap-3 mt-auto">
                    <div className="flex-1" onClick={(e) => e.stopPropagation()}>
                      <EventRegistrationModal
                        event={{ id: event.id, title: event.title }}
                        trigger={
                          <Button className="w-full h-11 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold">
                            Register Now
                          </Button>
                        }
                      />
                    </div>
                    <Link
                      href={`/events/${event.id}`}
                      className="flex-1 h-11 flex items-center justify-center border border-primary text-primary rounded-lg font-bold hover:bg-primary/10 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Details
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 border-primary/20 shrink-0"
                      onClick={(e) => handleShare(event.id, event.title, e)}
                      title="Share event"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-lg text-foreground/60">No upcoming events scheduled at the moment.</p>
              <p className="text-sm text-foreground/40 mt-2">Check back later or view our past events below.</p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
              Our Past <span className="text-primary">Events</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 flex flex-col opacity-90 hover:opacity-100"
                >
                  <Link href={`/events/${event.id}`} className="flex-grow">
                    <div className="relative h-48 overflow-hidden filter grayscale-[30%] group-hover:grayscale-0 transition-all duration-500">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-gray-900/80 backdrop-blur-sm text-white rounded-full text-xs font-semibold whitespace-nowrap">
                          Completed
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-4">{event.title}</h3>
                      <div className="space-y-3 mb-4 text-foreground/60">
                        <div className="flex items-center gap-2">
                          <span className="text-primary/70 text-sm">📅</span>
                          <span className="text-sm">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-primary/70 text-sm">📍</span>
                          <span className="text-sm">{event.location}</span>
                        </div>
                      </div>
                      <p className="text-foreground/60 mb-6 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                    </div>
                  </Link>
                  <div className="p-6 pt-0 mt-auto flex gap-3">
                    <Link
                      href={`/events/${event.id}`}
                      className="flex-1 h-11 flex items-center justify-center bg-gray-100 text-foreground/80 rounded-lg font-semibold hover:bg-gray-200 transition"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Highlights
                    </Link>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-11 w-11 border-gray-300 shrink-0"
                      onClick={(e) => handleShare(event.id, event.title, e)}
                      title="Share event"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* Call to Action */}
      <section className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/slider-community.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Want to Participate?</h2>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            Every event is an opportunity to make a difference. Sign up for any event above or get in touch to volunteer!
          </p>
          <div className="flex items-center gap-2 justify-center">
            <button
              onClick={() => setIsVolunteerModalOpen(true)}
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
            >
              Join as Volunteer
            </button>
            <button
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                const shareUrl = `${window.location.origin}/events?volunteer=true`
                try {
                  await shareLink(shareUrl, 'Volunteer With Us', 'Join us as a volunteer and make a difference!')
                  toast.success('Link copied to clipboard!')
                } catch (error) {
                  toast.error('Failed to share link')
                }
              }}
              className="p-3 bg-secondary/20 hover:bg-secondary/30 rounded-lg transition-all duration-300 cursor-pointer"
              title="Share volunteer link"
            >
              <Share2 className="w-5 h-5 text-secondary" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
      <VolunteerApplication
        isOpen={isVolunteerModalOpen}
        onOpenChange={setIsVolunteerModalOpen}
      />
    </>
  )
}
