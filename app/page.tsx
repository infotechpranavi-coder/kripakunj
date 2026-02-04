'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSlider } from '@/components/hero-slider'
import { CampaignsSlider } from '@/components/campaigns-slider'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedNumber } from '@/components/animated-number'
import { SocialMediaFloatingIcons } from '@/components/social-media-floating-icons'
import { TestimonialCarousel } from '@/components/testimonial-carousel'
import { InitiativesCarousel } from '@/components/initiatives-carousel'
import { CollaboratorsSection } from '@/components/collaborators-section'
import Image from 'next/image'
import Link from 'next/link'
import { VolunteerApplication } from '@/components/volunteer-application'

export default function Home() {
  const [dbCampaigns, setDbCampaigns] = useState<any[]>([])
  const [dbEvents, setDbEvents] = useState<any[]>([])
  const [dbBanners, setDbBanners] = useState<any[]>([])
  const [dbImpactStats, setDbImpactStats] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns', { cache: 'no-store' })
        const result = await response.json()
        if (result.success) {
          setDbCampaigns(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      }
    }

    const fetchEvents = async () => {
      try {
        const response = await fetch('/api/events', { cache: 'no-store' })
        const result = await response.json()
        if (result.success) {
          setDbEvents(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch events:', error)
      }
    }

    const fetchImpactStats = async () => {
      try {
        const response = await fetch('/api/impact-stats', { cache: 'no-store' })
        const result = await response.json()
        if (result.success) {
          setDbImpactStats(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch impact stats:', error)
      }
    }

    const fetchBanners = async () => {
      try {
        const response = await fetch('/api/banners', { cache: 'no-store' })
        const result = await response.json()
        if (result.success) {
          setDbBanners(result.data.filter((b: any) => b.isActive))
        }
      } catch (error) {
        console.error('Failed to fetch banners:', error)
      }
    }

    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([fetchCampaigns(), fetchEvents(), fetchBanners(), fetchImpactStats()])
      setIsLoading(false)
    }

    loadData()
  }, [])

  const heroSlides = dbBanners.length > 0
    ? dbBanners.flatMap(b => {
      const slides = [];

      // Add direct URL if present
      if (b.imageUrl) {
        slides.push({
          src: b.imageUrl,
          alt: b.alt || b.title,
          title: b.title,
          subtitle: b.subtitle,
          description: b.description,
          link: b.link,
        });
      }

      // Add uploaded images
      if (b.images && b.images.length > 0) {
        b.images.forEach((img: string) => {
          slides.push({
            src: img,
            alt: b.alt || b.title,
            title: b.title,
            subtitle: b.subtitle,
            description: b.description,
            link: b.link,
          });
        });
      }

      // Legacy support
      if (!b.imageUrl && (!b.images || b.images.length === 0) && b.image) {
        slides.push({
          src: b.image,
          alt: b.alt || b.title,
          title: b.title,
          subtitle: b.subtitle,
          description: b.description,
          link: b.link,
        });
      }

      return slides;
    })
    : [
      {
        src: '/slider-education.jpg',
        alt: 'Children learning in classroom',
        title: 'Serving Beyond Humanity',
        subtitle: 'Quality Education for All',
        description: 'Kripa Kunj Charitable Trust is dedicated to making a difference in the lives of underprivileged communities through education, healthcare, and sustainable development initiatives.',
      },
      {
        src: '/slider-community.jpg',
        alt: 'Community volunteers helping',
        title: 'Empowering Communities',
        subtitle: 'Together We Make a Difference',
        description: 'Join us in creating positive change through community-driven initiatives that impact thousands of lives across India.',
      },
      {
        src: '/slider-environment.jpg',
        alt: 'Environmental conservation',
        title: 'Protecting Our Planet',
        subtitle: 'Environmental Care & Conservation',
        description: 'Tree plantation, beach cleaning drives, and raising awareness about waste management. Monthly Kinaara beach cleanups with community participation.',
      },
    ]

  // Map DB campaigns to Slider format
  const mappedCampaigns = dbCampaigns.map(c => ({
    id: c._id,
    title: c.title,
    image: c.images?.[0] || '/placeholder-campaign.jpg',
    progress: Math.min(100, Math.round(((c.raisedAmount || 0) / (c.goalAmount || 1)) * 100)),
    raised: c.raisedAmount || 0,
    goal: c.goalAmount || 0
  }))

  const displayCampaigns = mappedCampaigns.length > 0 ? mappedCampaigns : [
    {
      id: '1',
      title: 'Project GyanDaan - Education for All',
      image: '/slider-education.jpg',
      progress: 45,
      raised: 225000,
      goal: 500000,
    },
    {
      id: '2',
      title: 'Ek Ped Maa Ke Naam',
      image: '/slider-environment.jpg',
      progress: 32,
      raised: 63100,
      goal: 200000,
    },
    {
      id: '3',
      title: 'Kill Hunger Initiative',
      image: '/slider-community.jpg',
      progress: 68,
      raised: 340000,
      goal: 500000,
    }
  ]

  // Initiatives use the same data but original structure
  const initiatives = dbCampaigns.length > 0
    ? dbCampaigns.slice(0, 6).map(c => ({
      name: c.title,
      focus: c.category,
      description: c.shortDescription || c.aboutCampaign?.substring(0, 150) + '...',
      image: c.images?.[0] || '/placeholder-campaign.jpg'
    }))
    : [
      {
        name: 'Project GyanDaan',
        focus: 'Education Excellence',
        description: 'Providing comprehensive education support including school fees, uniforms, books, and study materials. Mentorship programs for academic advancement.',
        image: '/slider-education.jpg',
      },
      {
        name: 'Project Lajja',
        focus: '#MenstruationMatters',
        description: 'Breaking menstrual taboos through awareness camps. Distributing menstrual health products and conducting monthly wellness sessions.',
        image: '/slider-community.jpg',
      },
      {
        name: 'Kill Hunger',
        focus: 'Food & Nutrition',
        description: 'Monthly food distribution drives. Nutrition programs for children and pregnant women. Emergency relief during natural disasters.',
        image: '/slider-community.jpg',
      }
    ]

  return (
    <>
      <Navigation />

      {/* Hero Section with Slider */}
      <section className="relative">
        <HeroSlider slides={heroSlides} autoPlay={true} interval={5000} />
      </section>

      {/* Campaigns Section */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" delay={100}>
            {isLoading ? (
              <div className="h-64 flex items-center justify-center text-foreground/50">Loading campaigns...</div>
            ) : (
              <CampaignsSlider campaigns={displayCampaigns} itemsPerView={3} autoPlay={true} interval={4000} />
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-linear-to-b from-gray-50 via-white to-gray-50 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins">
              Our <span className="text-primary">Impact</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {(dbImpactStats.length > 0 ? dbImpactStats : [
              { label: 'Cities Covered', value: '9', color: 'accent' },
              { label: 'Active Volunteers', value: '1100+', color: 'secondary' },
              { label: 'Trees Planted', value: '65K+', color: 'primary' },
              { label: 'Funds Raised', value: '20Cr+', color: 'accent' }
            ]).map((stat, index) => (
              <AnimatedSection key={index} direction="up" delay={(index + 1) * 100} className="h-full">
                <div className={`rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border ${stat.color === 'secondary' ? 'bg-linear-to-br from-secondary/10 to-secondary/5 border-secondary/20' :
                  stat.color === 'accent' ? 'bg-linear-to-br from-accent/10 to-accent/5 border-accent/20' :
                    'bg-linear-to-br from-primary/10 to-primary/5 border-primary/20'
                  }`}>
                  <AnimatedNumber
                    value={stat.value}
                    className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color === 'secondary' ? 'text-secondary' :
                      stat.color === 'accent' ? 'text-accent' :
                        'text-primary'
                      }`}
                  />
                  <p className="text-foreground/70 font-medium">{stat.label}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Past Events */}
      <section className="bg-white py-16 md:py-24 overflow-hidden relative">


        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins mb-4">
              Our Events
            </h2>
            {/* Wavy underline */}
            <div className="flex justify-center">
              <svg className="w-64 md:w-96 h-8" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20 Q100 5, 200 20 T400 20" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {(dbEvents.length > 0 ? dbEvents : [
              {
                id: '1',
                title: 'URBAN ROOTS: MIYAWAKI FOREST PLANTED IN BHIWANDI',
                category: 'Shoonya',
                image: '/slider-environment.jpg',
              },
              {
                id: '2',
                title: 'A DAY TO REMEMBER: INCLUSIVE PICNIC WITH HELEN',
                category: 'Gyan Daan',
                image: '/slider-education.jpg',
              },
              {
                id: '3',
                title: 'SPARKING CHANGE: COMMUNITY SUPPORT',
                category: 'Gyan Daan',
                image: '/slider-community.jpg',
              },
            ]).slice(0, 3).map((event, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 100}
                className="h-full"
              >
                <Link href={`/events/${event._id || event.id}`} className="block h-full group">
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className="relative w-full h-48 md:h-56 overflow-hidden">
                      <Image
                        src={event.image || '/placeholder.svg'}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 flex flex-col grow">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-green-500 rotate-45"></div>
                        <span className="text-green-600 font-semibold text-sm">{event.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                        {event.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection direction="fade" className="text-center">
            <Link
              href="/events"
              className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl uppercase tracking-wide"
            >
              SEE ALL EVENTS
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/5824fe76bebafb532872eb89/1479340361073-OUBOAMM04RUT30MMW3B5/volunteer-image.jpg?format=750w')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins">
              Our <span className="text-primary">Focus Areas</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality Education',
                description: 'Providing free education through our open schools and sponsoring schooling for underprivileged children. We currently run 15+ open schools across 9 cities.',
                icon: '📚',
                stats: '400+ Children',
              },
              {
                title: 'Healthcare & Hygiene',
                description:
                  'Creating awareness about menstrual health, blood donation, and hygiene practices in communities. Monthly health camps and awareness drives.',
                icon: '⚕️',
                stats: '32,000+ Lives Impacted',
              },
              {
                title: 'Environmental Care',
                description:
                  'Tree plantation, beach cleaning drives, and raising awareness about waste management. Monthly Kinaara beach cleanups with community participation.',
                icon: '🌱',
                stats: '65,000+ Trees Planted',
              },
              {
                title: 'Women Empowerment',
                description:
                  'Training women, widows, and transgenders in sewing, tailoring, and handicrafts. Providing employment opportunities and economic independence.',
                icon: '👩',
                stats: '500+ Women Trained',
              },
              {
                title: 'Food Security',
                description:
                  'Fighting hunger and malnutrition through food distribution and nutrition programs. Kill Hunger Initiative serves families across multiple cities.',
                icon: '🍲',
                stats: '2,000+ Families Fed',
              },
              {
                title: 'Animal Welfare',
                description:
                  'Dedicated to the rescue, rehabilitation, and protection of animals. Providing medical care, shelter, and advocating for animal rights and welfare.',
                icon: '🐾',
                stats: '500+ Animals Rescued',
              },
            ].map((area, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 100}
                className="h-full"
              >
                <div className="group bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-700 ease-in-out transform hover:-translate-y-3 hover:scale-[1.02] border border-white/20 h-full flex flex-col">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 ease-in-out inline-block">
                    {area.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-500 ease-in-out">
                    {area.title}
                  </h3>
                  <p className="text-foreground/70 mb-4 grow">{area.description}</p>
                  <p className="text-primary font-semibold text-sm bg-primary/10 px-3 py-1.5 rounded-lg inline-block w-fit">
                    {area.stats}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Initiatives */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins">
              Our <span className="text-primary">Latest Initiatives</span>
            </h2>
          </AnimatedSection>
          <div className="mt-8">
            {isLoading ? (
              <div className="h-64 flex items-center justify-center text-foreground/50 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                  <p className="font-medium">Loading initiatives...</p>
                </div>
              </div>
            ) : (
              <AnimatedSection direction="up" delay={100}>
                <InitiativesCarousel initiatives={initiatives} />
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-linear-to-b from-gray-50 via-white to-gray-50 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins mb-4">
              What People <span className="text-primary">Say</span>
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Hear from our volunteers, beneficiaries, and supporters about their experiences with Kripa Kunj Charitable Trust
            </p>
          </AnimatedSection>

          <div className="max-w-7xl mx-auto">
            <TestimonialCarousel
              testimonials={[
                {
                  name: 'Priya Sharma',
                  role: 'Volunteer',
                  image: '/placeholder-user.jpg',
                  testimonial: 'Volunteering with Kripa Kunj has been a life-changing experience. The impact we create together in education and community development is truly inspiring. Every event brings new hope and smiles.',
                  rating: 5,
                },
                {
                  name: 'Rajesh Kumar',
                  role: 'Beneficiary',
                  image: '/placeholder-user.jpg',
                  testimonial: 'Thanks to Project GyanDaan, my children are now receiving quality education. The support for school fees, books, and uniforms has lifted a huge burden from our family. We are forever grateful.',
                  rating: 5,
                },
                {
                  name: 'Dr. Anjali Mehta',
                  role: 'Supporter & Donor',
                  image: '/placeholder-user.jpg',
                  testimonial: 'I have been supporting Kripa Kunj for over 3 years. Their transparency, dedication, and real impact on the ground is remarkable. Every donation truly makes a difference in someone\'s life.',
                  rating: 5,
                },
                {
                  name: 'Sunita Devi',
                  role: 'Women Empowerment Program',
                  image: '/placeholder-user.jpg',
                  testimonial: 'The tailoring training program gave me skills and confidence. Now I run my own small business and can support my family. This organization truly empowers women to become independent.',
                  rating: 5,
                },
                {
                  name: 'Amit Patel',
                  role: 'Community Volunteer',
                  image: '/placeholder-user.jpg',
                  testimonial: 'Being part of Project Kinaara beach cleanups has been amazing. The community spirit and environmental impact we create together is incredible. Kripa Kunj brings people together for a cause.',
                  rating: 5,
                },
                {
                  name: 'Meera Nair',
                  role: 'Education Program Coordinator',
                  image: '/placeholder-user.jpg',
                  testimonial: 'Working with the open schools initiative has shown me the power of education. Seeing children who couldn\'t afford school now learning and growing fills my heart with joy. This is real change.',
                  rating: 5,
                },
              ]}
            />
          </div>
        </div>
      </section>

      <CollaboratorsSection />

      {/* Call to Action */}
      <section className="relative text-primary-foreground py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-no-repeat"
          style={{
            backgroundImage: `url('/OIP.webp')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100%',
          }}
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <AnimatedSection direction="fade" delay={100}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">Join Our Mission</h2>
          </AnimatedSection>
          <AnimatedSection direction="fade" delay={200}>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Together, we can make a real difference in the lives of those who need it most. Whether you want to volunteer, donate, or support our cause, your contribution matters.
            </p>
          </AnimatedSection>
          <AnimatedSection direction="up" delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsVolunteerModalOpen(true)}
                className="group relative px-8 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Volunteer With Us
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>

            </div>
          </AnimatedSection>
        </div>
      </section>

      <SocialMediaFloatingIcons />
      <Footer />
      <VolunteerApplication
        isOpen={isVolunteerModalOpen}
        onOpenChange={setIsVolunteerModalOpen}
      />
    </>
  )
}
