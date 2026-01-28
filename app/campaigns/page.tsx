'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedNumber } from '@/components/animated-number'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'

const campaigns = [
  {
    id: 1,
    title: 'Project GyanDaan - Education for All',
    description: 'Providing quality education to underprivileged children in rural areas through scholarships, school supplies, and infrastructure development.',
    image: '/slider-education.jpg',
    progress: 45,
    raised: 225000,
    goal: 500000,
    supporters: 450,
    daysLeft: 285,
    category: 'Education',
    featured: true
  },
  {
    id: 2,
    title: 'Ek Ped Maa Ke Naam',
    description: 'Our tree plantation initiative aimed at creating a greener environment and combating climate change.',
    image: '/slider-environment.jpg',
    progress: 32,
    raised: 63100,
    goal: 200000,
    supporters: 126,
    daysLeft: 255,
    category: 'Environment',
    featured: false
  },
  {
    id: 3,
    title: 'Kill Hunger Initiative',
    description: 'Addressing food insecurity by providing meals to homeless people and families in need.',
    image: '/slider-community.jpg',
    progress: 68,
    raised: 340000,
    goal: 500000,
    supporters: 680,
    daysLeft: 300,
    category: 'Community',
    featured: true
  },
  {
    id: 4,
    title: 'Women Empowerment Program',
    description: 'Empowering women through skill development, financial literacy, and entrepreneurship programs.',
    image: '/slider-education.jpg',
    progress: 60,
    raised: 300000,
    goal: 500000,
    supporters: 500,
    daysLeft: 200,
    category: 'Community',
    featured: false
  },
  {
    id: 5,
    title: 'Project Kinaara - Beach Cleanup',
    description: 'Monthly beach cleanup drives with community participation to protect marine life and environment.',
    image: '/slider-environment.jpg',
    progress: 55,
    raised: 110000,
    goal: 200000,
    supporters: 220,
    daysLeft: 150,
    category: 'Environment',
    featured: false
  },
  {
    id: 6,
    title: 'Blood Donation Drive',
    description: 'Organizing blood donation camps to help save lives and create awareness about blood donation.',
    image: '/slider-community.jpg',
    progress: 80,
    raised: 160000,
    goal: 200000,
    supporters: 320,
    daysLeft: 45,
    category: 'Healthcare',
    featured: true
  }
]

export default function CampaignsPage() {
  const [dbCampaigns, setDbCampaigns] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')

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

  const filteredCampaigns = activeFilter === 'all'
    ? dbCampaigns
    : dbCampaigns.filter(campaign => campaign.category?.toLowerCase() === activeFilter)

  const categories = ['all', 'education', 'environment', 'community', 'health', 'social-welfare', 'technology']

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 via-white to-accent/5 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection direction="up">
            <div className="text-center max-w-4xl mx-auto">
              <Badge className="bg-primary/10 text-primary mb-6 px-4 py-2 rounded-full text-sm font-medium">
                Our Impact Initiatives
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 font-poppins">
                Join Our <span className="text-primary">Campaigns</span> for Change
              </h1>
              <p className="text-xl text-foreground/70 mb-10 leading-relaxed">
                Be part of meaningful initiatives that create lasting impact in education, environment, healthcare, and community development. Every contribution matters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg">
                  <Link href="/contact">Start a Campaign</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-primary/20 px-8 py-6 text-lg">
                  <Link href="/contact">Donate Now</Link>
                </Button>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <AnimatedSection direction="up" delay={100} className="h-full">
              <div className="bg-linear-to-br from-accent/10 to-accent/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-accent/20">
                <AnimatedNumber value="24" className="text-3xl md:text-4xl font-bold text-primary mb-2" />
                <p className="text-foreground/70 font-medium">Active Campaigns</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={200} className="h-full">
              <div className="bg-linear-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-secondary/20">
                <AnimatedNumber value="12K+" className="text-3xl md:text-4xl font-bold text-secondary mb-2" />
                <p className="text-foreground/70 font-medium">Supporters</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={300} className="h-full">
              <div className="bg-linear-to-br from-primary/10 to-primary/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-primary/20">
                <AnimatedNumber value="₹24M+" className="text-3xl md:text-4xl font-bold text-primary mb-2" />
                <p className="text-foreground/70 font-medium">Funds Raised</p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="up" delay={400} className="h-full">
              <div className="bg-linear-to-br from-accent/10 to-accent/5 rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-105 border border-accent/20">
                <AnimatedNumber value="180+" className="text-3xl md:text-4xl font-bold text-accent mb-2" />
                <p className="text-foreground/70 font-medium">Success Stories</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Campaigns Filter */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                onClick={() => setActiveFilter(category)}
                className={activeFilter === category ? "bg-primary hover:bg-primary/90" : "border-primary/20"}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Campaigns Grid */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins mb-4">
              Active <span className="text-primary">Campaigns</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Support our ongoing initiatives that are making a real difference in communities across the country.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-20 text-foreground/50">Loading campaigns...</div>
            ) : filteredCampaigns.length === 0 ? (
              <div className="col-span-full text-center py-20 text-foreground/50">No campaigns found in this category.</div>
            ) : filteredCampaigns.map((campaign, index) => (
              <AnimatedSection key={campaign._id || campaign.id} direction="up" delay={index * 100}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-b from-white to-gray-50 h-full flex flex-col">
                  {campaign.featured && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-primary text-primary-foreground">Featured</Badge>
                    </div>
                  )}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={campaign.images?.[0] || campaign.image || '/placeholder-campaign.jpg'}
                      alt={campaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-primary/80 backdrop-blur-sm">{campaign.category}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-foreground line-clamp-1">{campaign.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6 flex-1 flex flex-col">
                    <p className="text-foreground/70 mb-6 line-clamp-2 h-12">{campaign.shortDescription || campaign.description}</p>

                    <div className="mb-4 mt-auto">
                      <div className="flex justify-between text-sm font-medium text-foreground mb-1">
                        <span>Funded</span>
                        <span>₹{(campaign.raisedAmount || 0).toLocaleString()} of ₹{(campaign.goalAmount || 0).toLocaleString()}</span>
                      </div>
                      <Progress value={((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100} className="h-2" />
                      <div className="flex justify-between text-xs text-foreground/50 mt-1">
                        <span>{(((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100).toFixed(0)}%</span>
                        <span>{campaign.endDate ? Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0} days left</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-foreground/70">{campaign.supporters || 0} supporters</span>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        {campaign.status}
                      </Badge>
                    </div>

                    <div className="flex gap-3">
                      <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                        <Link href={`/campaign/${campaign._id || campaign.id}`}>Donate</Link>
                      </Button>
                      <Button asChild variant="outline" className="border-primary/20">
                        <Link href={`/campaign/${campaign._id || campaign.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-primary/80 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection direction="fade">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-poppins mb-6">
              Start Your Own <span className="text-white/80">Campaign</span>
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Have a cause you're passionate about? Create your own campaign and mobilize support for your initiative.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg">
                <Link href="/contact">Create Campaign</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="bg-transparent border-2 border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  )
}