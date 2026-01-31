'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Clock, Users, Heart, Share2, ArrowLeft, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { upcomingEvents } from '@/lib/events-data'

export default function EventDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const unwrappedParams = React.use(params)
    const [event, setEvent] = useState<any>(null)
    const [otherEvents, setOtherEvents] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (unwrappedParams.id) {
            fetchEventDetails()
            fetchOtherEvents()
        }
    }, [unwrappedParams.id])

    const fetchEventDetails = async () => {
        try {
            setIsLoading(true)
            const response = await fetch(`/api/events/${unwrappedParams.id}`)
            const result = await response.json()
            if (result.success) {
                const e = result.data
                setEvent({
                    ...e,
                    id: e._id,
                    date: new Date(e.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                    })
                })
            }
        } catch (error) {
            console.error('Failed to fetch event:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const fetchOtherEvents = async () => {
        try {
            const response = await fetch('/api/events')
            const result = await response.json()
            if (result.success) {
                const mapped = result.data
                    .filter((e: any) => e._id !== unwrappedParams.id)
                    .slice(0, 3)
                    .map((e: any) => ({
                        ...e,
                        id: e._id,
                        date: new Date(e.date).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })
                    }))
                setOtherEvents(mapped)
            }
        } catch (error) {
            console.error('Failed to fetch other events:', error)
        }
    }

    if (isLoading) {
        return (
            <>
                <Navigation />
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading event details...</p>
                </div>
                <Footer />
            </>
        )
    }

    if (!event) {
        return (
            <>
                <Navigation />
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has passed.</p>
                        <Button asChild>
                            <Link href="/events">Back to Events</Link>
                        </Button>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

    return (
        <>
            <Navigation />

            {/* Hero Section */}
            <section className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white z-10">
                    <AnimatedSection>
                        <Badge className="mb-4 bg-primary hover:bg-primary/90 text-white border-none px-4 py-1">
                            {event.category}
                        </Badge>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6">
                            {event.title}
                        </h1>
                        <div className="flex flex-wrap justify-center gap-6 text-lg opacity-90">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-primary" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-primary" />
                                <span>{event.location}</span>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <AnimatedSection>
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                        About This Event
                                    </h2>
                                    <p className="text-lg text-foreground/70 leading-relaxed mb-6">
                                        {event.description}
                                    </p>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.2}>
                                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                                    <h2 className="text-2xl font-bold mb-6 text-foreground">Event Highlights</h2>
                                    <ul className="grid md:grid-cols-2 gap-4">
                                        {event.highlights && event.highlights.length > 0 ? (
                                            event.highlights.map((item: string, index: number) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                                    <span className="text-foreground/70">{item}</span>
                                                </li>
                                            ))
                                        ) : (
                                            <p className="text-foreground/50 italic col-span-2 text-center py-4 bg-gray-50 rounded-lg">No custom highlights specified for this event.</p>
                                        )}
                                    </ul>
                                </div>
                            </AnimatedSection>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            <AnimatedSection delay={0.4}>
                                <Card className="border-none shadow-xl overflow-hidden">
                                    <CardHeader className="bg-primary text-white p-6">
                                        <CardTitle className="text-xl">Event Details</CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-6 space-y-6 bg-white text-foreground">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Calendar className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Date</p>
                                                <p className="font-semibold">{event.date}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <Clock className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Time</p>
                                                <p className="font-semibold">{event.time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                                <MapPin className="w-6 h-6 text-primary" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Location</p>
                                                <p className="font-semibold">{event.location}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                                                <Users className="w-6 h-6 text-accent" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-500">Attendance</p>
                                                <p className="font-semibold">{event.interested} Interested</p>
                                            </div>
                                        </div>

                                        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-bold shadow-lg">
                                            <Link href="/contact">Register for Event</Link>
                                        </Button>

                                        <p className="text-xs text-center text-gray-500">
                                            Standard registration applies. For bulk or group registrations, please contact us.
                                        </p>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>

                            <AnimatedSection delay={0.6}>
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
                                    <h3 className="font-bold mb-4 text-foreground">Share this Event</h3>
                                    <div className="flex gap-4">
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors border-primary/20">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors border-primary/20">
                                            <Heart className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>

                    </div>
                </div>
            </section>

            {/* Other Events */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-3xl font-bold text-foreground">Other <span className="text-primary">Upcoming Events</span></h2>
                        <Button asChild variant="ghost" className="text-primary hover:text-primary/80">
                            <Link href="/events">View All Events</Link>
                        </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {otherEvents.map((otherEvent) => (
                            <Link key={otherEvent.id} href={`/events/${otherEvent.id}`} className="group">
                                <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 group-hover:shadow-md group-hover:-translate-y-1">
                                    <div className="relative h-40">
                                        <Image src={otherEvent.image} alt={otherEvent.title} fill className="object-cover" />
                                    </div>
                                    <div className="p-4">
                                        <h3 className="font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                                            {otherEvent.title}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            <span>{otherEvent.date}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
