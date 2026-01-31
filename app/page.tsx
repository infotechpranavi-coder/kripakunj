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
import Image from 'next/image'
import Link from 'next/link'
import { VolunteerApplication } from '@/components/volunteer-application'

export default function Home() {
  const [dbCampaigns, setDbCampaigns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false)

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch('/api/campaigns')
        const result = await response.json()
        if (result.success) {
          setDbCampaigns(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch campaigns:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCampaigns()
  }, [])

  const heroSlides = [
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
            <AnimatedSection direction="up" delay={100} className="h-full">
              <div className="bg-linear-to-br from-accent/10 to-accent/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-accent/20">
                <AnimatedNumber value="9" className="text-3xl md:text-4xl font-bold text-primary mb-2" />
                <p className="text-foreground/70 font-medium">Cities Covered</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={200} className="h-full">
              <div className="bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-secondary/20">
                <AnimatedNumber value="1100+" className="text-3xl md:text-4xl font-bold text-secondary mb-2" />
                <p className="text-foreground/70 font-medium">Active Volunteers</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={300} className="h-full">
              <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-primary/20">
                <AnimatedNumber value="65K+" className="text-3xl md:text-4xl font-bold text-primary mb-2" />
                <p className="text-foreground/70 font-medium">Trees Planted</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={400} className="h-full">
              <div className="bg-linear-to-br from-accent/10 to-accent/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-accent/20">
                <AnimatedNumber value="20Cr+" className="text-3xl md:text-4xl font-bold text-accent mb-2" />
                <p className="text-foreground/70 font-medium">Funds Raised</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Past Events */}
      <section className="bg-white py-16 md:py-24 overflow-hidden relative">
        {/* Floating Icons */}
        <div className="absolute right-4 top-20 md:right-8 md:top-32 flex flex-col gap-6 z-10">
          <div className="w-12 h-12 bg-yellow-400/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0s' }}>
            <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '0.5s' }}>
            <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.375a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </div>
          <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12 relative">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins mb-4">
              Our Past Events
            </h2>
            {/* Wavy underline */}
            <div className="flex justify-center">
              <svg className="w-64 md:w-96 h-8" viewBox="0 0 400 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 20 Q100 5, 200 20 T400 20" stroke="#22c55e" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: 'URBAN ROOTS: MIYAWAKI FOREST PLANTED IN BHIWANDI',
                category: 'Shoonya',
                image: '/slider-environment.jpg',
              },
              {
                title: 'A DAY TO REMEMBER: INCLUSIVE PICNIC WITH HELEN',
                category: 'Gyan Daan',
                image: '/slider-education.jpg',
              },
              {
                title: 'SPARKING CHANGE: COMMUNITY SUPPORT',
                category: 'Gyan Daan',
                image: '/slider-community.jpg',
              },
            ].map((event, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 100}
                className="h-full"
              >
                <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 overflow-hidden border border-gray-100 h-full flex flex-col">
                  <div className="relative w-full h-48 md:h-56 overflow-hidden">
                    <Image
                      src={event.image}
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
                title: 'Community Development',
                description:
                  'Building sustainable solutions for underprivileged communities across India. Integrated development programs covering health, education, and livelihood.',
                icon: '🤝',
                stats: '100,000+ Beneficiaries',
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
          <div className="grid md:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full h-64 flex items-center justify-center text-foreground/50">Loading initiatives...</div>
            ) : initiatives.map((initiative, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 100}
                className="h-full"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 ease-in-out transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col relative">
                  <div className="relative h-54 overflow-hidden">
                    <img
                      src={initiative.image}
                      alt={initiative.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors duration-300">
                        {initiative.name}
                      </h3>
                      <p className="text-white/90 font-semibold text-sm mb-3">{initiative.focus}</p>
                      <p className="text-white/80 text-sm leading-relaxed line-clamp-2">{initiative.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
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
