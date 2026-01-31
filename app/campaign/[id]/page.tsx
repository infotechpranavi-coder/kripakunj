'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// No longer using local Dialog here as we use DonationModal
import { Calendar, Users, Target, Award, Heart, MapPin, Clock, User, Tag, Eye, IndianRupee, Check } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { DonationModal } from '@/components/donation-modal'

// Mock data for campaigns - in a real app this would come from an API
const campaigns = [
  {
    id: 1,
    title: 'Project GyanDaan - Education for All',
    description: 'Providing quality education to underprivileged children in rural areas through scholarships, school supplies, and infrastructure development.',
    longDescription: 'Project GyanDaan aims to bridge the educational gap in rural India by providing quality education to underprivileged children. Our mission is to ensure that every child, regardless of their economic background, has access to quality education. Through this campaign, we are focusing on building schools, providing scholarships, distributing study materials, and training teachers in remote villages. The impact of this initiative extends beyond just education, as educated children become catalysts for change in their communities. With your support, we can transform the lives of hundreds of children and contribute to the overall development of rural areas.',
    image: '/slider-education.jpg',
    progress: 45,
    raised: 225000,
    goal: 500000,
    supporters: 450,
    daysLeft: 285,
    category: 'Education',
    featured: true,
    updates: [
      { date: '2024-01-15', title: 'Launched Scholarship Program', description: 'Started scholarship program for 50 students' },
      { date: '2024-01-20', title: 'School Infrastructure', description: 'Completed construction of 2 classrooms' },
      { date: '2024-02-01', title: 'Teacher Training', description: 'Trained 15 teachers on modern teaching methods' }
    ],
    impact: [
      { value: '200+', label: 'Children Benefited' },
      { value: '5', label: 'Schools Built' },
      { value: '15', label: 'Teachers Trained' },
      { value: '50', label: 'Scholarships Provided' }
    ],
    goals: [
      { title: 'Build 10 Schools', description: 'Constructing schools in remote villages to provide access to education', percentage: 65 },
      { title: 'Train 100 Teachers', description: 'Training local teachers with modern pedagogical techniques', percentage: 40 },
      { title: 'Provide 500 Scholarships', description: 'Offering scholarships to underprivileged students', percentage: 75 },
      { title: 'Distribute Learning Materials', description: 'Supplying books, stationery, and digital resources', percentage: 90 }
    ],
    locations: [
      { name: 'Uttar Pradesh', progress: 80 },
      { name: 'Bihar', progress: 60 },
      { name: 'Madhya Pradesh', progress: 45 },
      { name: 'Rajasthan', progress: 30 }
    ],
    details: {
      location: 'Multiple states across India',
      organizer: 'Kripa Kunj Charitable Trust',
      category: 'Education',
      status: 'Active'
    },
    expectedImpact: {
      beneficiaries: '5000+ children',
      duration: '12 months',
      description: 'Through this campaign, we expect to provide quality education to over 5000 underprivileged children across rural India. The initiative will establish 10 new schools, train 100+ teachers, and provide scholarships to 500+ students. The long-term impact includes improved literacy rates, enhanced employment opportunities for youth, and overall community development. We anticipate that educated children will become agents of change in their communities, creating a ripple effect that benefits future generations.'
    }
  },
  {
    id: 2,
    title: 'Ek Ped Maa Ke Naam',
    description: 'Our tree plantation initiative aimed at creating a greener environment and combating climate change.',
    longDescription: 'Ek Ped Maa Ke Naam is our ambitious tree plantation initiative aimed at creating a greener and healthier environment for future generations. This campaign focuses on planting native trees across urban and rural areas to combat air pollution, soil erosion, and climate change. We believe that every tree planted is a gift to Mother Earth and a promise to our future generations. Our approach includes community participation, involving local residents, schools, and organizations in planting and nurturing the trees. The initiative also includes awareness programs about the importance of trees and environmental conservation. With your support, we can create a sustainable ecosystem that benefits both nature and humanity.',
    image: '/slider-environment.jpg',
    progress: 32,
    raised: 63100,
    goal: 200000,
    supporters: 126,
    daysLeft: 255,
    category: 'Environment',
    featured: false,
    updates: [
      { date: '2024-01-10', title: 'Site Preparation', description: 'Prepared land for plantation in 5 locations' },
      { date: '2024-01-25', title: 'Community Involvement', description: 'Engaged 200+ community members in plantation drive' },
      { date: '2024-02-05', title: '1000 Trees Planted', description: 'Successfully planted 1000 saplings across the city' }
    ],
    impact: [
      { value: '1000+', label: 'Trees Planted' },
      { value: '5', label: 'Locations' },
      { value: '200+', label: 'Volunteers' },
      { value: '500', label: 'Families Involved' }
    ],
    goals: [
      { title: 'Plant 10,000 Trees', description: 'Native species plantation across urban and rural areas', percentage: 10 },
      { title: 'Create Green Corridors', description: 'Connecting fragmented forest areas with green pathways', percentage: 5 },
      { title: 'Water Conservation', description: 'Building structures to conserve rainwater', percentage: 15 },
      { title: 'Environmental Education', description: 'Awareness programs in schools and communities', percentage: 25 }
    ],
    locations: [
      { name: 'Delhi NCR', progress: 20 },
      { name: 'Mumbai', progress: 15 },
      { name: 'Bangalore', progress: 10 },
      { name: 'Chennai', progress: 5 }
    ],
    details: {
      location: 'Major cities across India',
      organizer: 'Kripa Kunj Charitable Trust',
      category: 'Environment',
      status: 'Active'
    },
    expectedImpact: {
      beneficiaries: '100,000+ community members',
      duration: '18 months',
      description: 'Our tree plantation campaign aims to create a significant environmental impact by planting 10,000 native trees across urban and rural areas. The expected outcomes include improved air quality, reduced soil erosion, enhanced biodiversity, and increased water conservation. The campaign will engage over 100,000 community members in environmental conservation efforts. Additionally, the initiative will raise awareness about environmental issues and promote sustainable living practices. The long-term impact includes contributing to carbon sequestration efforts and creating green corridors that support wildlife.'
    }
  },
  {
    id: 3,
    title: 'Kill Hunger Initiative',
    description: 'Addressing food insecurity by providing meals to homeless people and families in need.',
    longDescription: 'The Kill Hunger Initiative addresses one of the most pressing issues in our society - hunger and food insecurity. Our mission is to ensure that no one goes to bed hungry. Through this campaign, we distribute nutritious meals to homeless individuals, families facing financial difficulties, and communities affected by natural disasters. The initiative operates through multiple channels - mobile food kitchens, community kitchens, and partnerships with local restaurants and grocery stores to redistribute surplus food. Beyond just providing meals, we also focus on creating sustainable food security solutions and empowering communities to become self-reliant. Join us in our mission to eliminate hunger from our society.',
    image: '/slider-community.jpg',
    progress: 68,
    raised: 340000,
    goal: 500000,
    supporters: 680,
    daysLeft: 300,
    category: 'Community',
    featured: true,
    updates: [
      { date: '2024-01-05', title: 'Food Kitchen Launched', description: 'Opened our first community kitchen in the city center' },
      { date: '2024-01-18', title: 'Mobile Kitchen', description: 'Deployed mobile kitchen to reach more areas' },
      { date: '2024-02-10', title: '10,000 Meals Served', description: 'Celebrated serving 10,000 meals to those in need' }
    ],
    impact: [
      { value: '10K+', label: 'Meals Served' },
      { value: '3', label: 'Kitchen Centers' },
      { value: '25', label: 'Daily Volunteers' },
      { value: '500+', label: 'Families Supported' }
    ],
    goals: [
      { title: 'Serve 100,000 Meals', description: 'Nutritious meals to those in need across cities', percentage: 10 },
      { title: 'Establish 10 Kitchens', description: 'Permanent community kitchens in underserved areas', percentage: 30 },
      { title: 'Mobile Kitchen Fleet', description: 'Reaching remote and disaster-affected areas', percentage: 20 },
      { title: 'Food Security Programs', description: 'Creating sustainable food solutions', percentage: 15 }
    ],
    locations: [
      { name: 'Mumbai', progress: 40 },
      { name: 'Delhi', progress: 35 },
      { name: 'Bangalore', progress: 30 },
      { name: 'Hyderabad', progress: 25 }
    ],
    details: {
      location: 'Metropolitan cities across India',
      organizer: 'Kripa Kunj Charitable Trust',
      category: 'Community',
      status: 'Active'
    },
    expectedImpact: {
      beneficiaries: '50,000+ individuals',
      duration: '24 months',
      description: 'The Kill Hunger Initiative aims to address food insecurity affecting thousands of individuals across metropolitan cities. The expected impact includes providing 100,000+ nutritious meals, establishing 10 permanent community kitchens, and deploying mobile kitchen units to reach remote areas. The campaign anticipates supporting 50,000+ individuals facing food insecurity. Long-term outcomes include creating sustainable food security systems, establishing partnerships with local businesses for continued food redistribution, and developing community-led food assistance programs. The initiative also aims to raise awareness about food waste reduction and promote community solidarity.'
    }
  }
]

export default function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = React.use(params)
  const id = unwrappedParams.id

  const [campaign, setCampaign] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false)

  useEffect(() => {
    if (!id) return
    const fetchCampaign = async () => {
      try {
        const response = await fetch(`/api/campaigns/${id}`)
        const result = await response.json()
        if (result.success) {
          setCampaign(result.data)
        } else {
          console.error('API Error:', result.error)
        }
      } catch (error) {
        console.error('Failed to fetch campaign:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchCampaign()
  }, [id])

  if (isLoading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Loading Campaign Details...</h1>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (!campaign) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Campaign Not Found</h1>
            <p className="text-gray-600 mb-6">The campaign you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/campaigns">Back to Campaigns</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const progress = ((campaign.raisedAmount || 0) / (campaign.goalAmount || 1)) * 100
  const daysLeft = campaign.endDate ? Math.ceil((new Date(campaign.endDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0

  return (
    <>
      <Navigation />

      {/* Hero Section with Full Width Image */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={campaign.images?.[0] || campaign.image || '/placeholder-campaign.jpg'}
            alt={campaign.title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Badge className="bg-primary hover:bg-primary/90 text-white border-0 mb-6 px-4 py-1.5 text-sm font-medium tracking-wide uppercase">
            {campaign.category}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 font-poppins leading-tight max-w-5xl mx-auto">
            {campaign.title}
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed">
            {campaign.shortDescription || campaign.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={() => setIsDonationModalOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Donate Now
            </Button>


          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">

            {/* About Section (formerly Overview) */}
            <section id="about">
              <h2 className="text-3xl font-bold text-foreground mb-6">About This Campaign</h2>
              <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
                <p className="mb-8">{campaign.aboutCampaign || campaign.longDescription}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Target className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">Our Mission</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70">
                        Our mission is to create lasting change through sustainable initiatives that empower communities and improve lives.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <Heart className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg text-foreground">Impact</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/70">
                        Every contribution makes a difference. Together, we can create a meaningful impact that lasts for generations.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Details Section */}
            <section id="details">
              <h2 className="text-3xl font-bold text-foreground mb-6">Campaign Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground/80">
                      <MapPin className="h-4 w-4 text-primary" />
                      Campaign Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-foreground">
                      {campaign.location?.isOnline ? 'Online' : `${campaign.location?.city || ''}, ${campaign.location?.state || ''}`}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground/80">
                      <User className="h-4 w-4 text-primary" />
                      Organizer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-foreground">{campaign.organizer?.name || campaign.details?.organizer}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground/80">
                      <Tag className="h-4 w-4 text-primary" />
                      Campaign Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-lg font-semibold text-foreground">{campaign.category}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground/80">
                      <Eye className="h-4 w-4 text-primary" />
                      Campaign Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="bg-primary/10 text-primary px-3 py-1 font-medium text-capitalize">
                      {campaign.status}
                    </Badge>
                  </CardContent>
                </Card>
              </div>
            </section>

            <div className="border-t border-gray-100" />

            {/* Expected Impact Section */}
            <section id="impact">
              <h2 className="text-3xl font-bold text-foreground mb-6">Expected Impact</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground/80">
                      <Users className="h-4 w-4 text-primary" />
                      Expected Beneficiaries
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">{campaign.beneficiariesCount || campaign.expectedImpact?.beneficiaries || 'N/A'}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base text-foreground/80">
                      <Clock className="h-4 w-4 text-primary" />
                      Expected Duration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-secondary">
                      {campaign.startDate && campaign.endDate
                        ? `${Math.ceil((new Date(campaign.endDate).getTime() - new Date(campaign.startDate).getTime()) / (1000 * 3600 * 24 * 30))} months`
                        : campaign.expectedImpact?.duration || 'N/A'}
                    </p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-foreground">Impact Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">{campaign.impactDescription || campaign.expectedImpact?.description || 'No impact description provided.'}</p>
                </CardContent>
              </Card>
            </section>

            <div className="border-t border-gray-100" />

            {/* Updates Section */}
            <section id="updates">
              <h2 className="text-3xl font-bold text-foreground mb-6">Updates</h2>
              <div className="space-y-6">
                {(campaign.updates || []).map((update: any, index: number) => (
                  <Card key={index} className="border-l-4 border-l-primary hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <CardTitle className="text-lg text-foreground">{update.title}</CardTitle>
                        <Badge variant="secondary" className="self-start bg-primary/10 text-primary flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1" />
                          {update.date ? new Date(update.date).toLocaleDateString() : 'N/A'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-foreground/70">{update.description}</p>
                    </CardContent>
                  </Card>
                ))}
                {(!campaign.updates || campaign.updates.length === 0) && (
                  <p className="text-foreground/50 italic">No updates available for this campaign yet.</p>
                )}
              </div>
            </section>

          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">

              {/* Donation & Goals Card */}
              <Card className="border-2 border-primary/10 shadow-xl overflow-hidden">
                <div className="bg-primary/5 p-4 border-b border-primary/10">
                  <h3 className="text-xl font-bold text-primary text-center">Support This Cause</h3>
                </div>
                <CardContent className="p-6 space-y-6">

                  {/* Progress Stats */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-foreground/70">Funding Progress Status</span>
                        <span className="text-primary">{progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-foreground/60 uppercase tracking-wide">Raised</p>
                        <p className="text-lg font-bold text-secondary">₹{(campaign.raisedAmount || 0).toLocaleString()}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-foreground/60 uppercase tracking-wide">Goal</p>
                        <p className="text-lg font-bold text-primary">₹{(campaign.goalAmount || 0).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Donate Button Trigger */}
                  <Button
                    size="lg"
                    onClick={() => setIsDonationModalOpen(true)}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                  >
                    Donate Now
                  </Button>

                  <div className="text-center text-xs text-muted-foreground">
                    All donations are tax-deductible under 80G.
                  </div>

                </CardContent>
              </Card>

              {/* Specific Goals Checklist (Moved from Goals Section) */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-foreground">What we are doing</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  {(campaign.goals || []).map((goal: any, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="bg-green-100 p-1 rounded-full mt-0.5">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{goal.title}</p>
                        <p className="text-xs text-foreground/70">{goal.description}</p>
                      </div>
                    </div>
                  ))}
                  {(!campaign.goals || campaign.goals.length === 0) && (
                    <p className="text-xs text-foreground/50 italic">No specific goals listed.</p>
                  )}
                </CardContent>
              </Card>

            </div>
          </div>

        </div>
      </div>

      {/* How to Help */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins mb-4">
              How You Can <span className="text-primary">Help</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              There are several ways you can contribute to the success of this campaign.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedSection direction="up" delay={100}>
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <CardTitle className="text-foreground mb-4">Donate</CardTitle>
                <p className="text-foreground/70 mb-6">
                  Your financial contribution can make a significant impact in advancing this cause.
                </p>
                <Button asChild className="bg-primary hover:bg-primary/90">
                  <Link href="#donate">Make a Donation</Link>
                </Button>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={200}>
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <CardTitle className="text-foreground mb-4">Volunteer</CardTitle>
                <p className="text-foreground/70 mb-6">
                  Join our team and contribute your time and skills to make a difference.
                </p>
                <Button asChild variant="outline" className="border-primary/20">
                  <Link href="/volunteer">Join as Volunteer</Link>
                </Button>
              </Card>
            </AnimatedSection>

            <AnimatedSection direction="up" delay={300}>
              <Card className="text-center p-8 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <CardTitle className="text-foreground mb-4">Spread Awareness</CardTitle>
                <p className="text-foreground/70 mb-6">
                  Share this campaign with your network to increase its reach and impact.
                </p>
                <Button asChild variant="outline" className="border-primary/20">
                  <Link href="#">Share Campaign</Link>
                </Button>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Related Campaigns */}
      <section className="bg-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground font-poppins mb-4">
              Related <span className="text-primary">Campaigns</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Explore other impactful campaigns that need your support.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.filter(c => c.id !== campaign.id).slice(0, 3).map((relatedCampaign, index) => (
              <AnimatedSection key={relatedCampaign.id} direction="up" delay={index * 100}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-gradient-to-b from-white to-gray-50">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedCampaign.image}
                      alt={relatedCampaign.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="bg-primary/80 backdrop-blur-sm">{relatedCampaign.category}</Badge>
                    </div>
                  </div>

                  <CardHeader>
                    <CardTitle className="text-foreground">{relatedCampaign.title}</CardTitle>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    <p className="text-foreground/70 mb-4 line-clamp-2">{relatedCampaign.description}</p>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-medium text-foreground mb-1">
                        <span>Funded</span>
                        <span>₹{relatedCampaign.raised.toLocaleString()} of ₹{relatedCampaign.goal.toLocaleString()}</span>
                      </div>
                      <Progress value={relatedCampaign.progress} className="h-2" />
                      <div className="flex justify-between text-xs text-foreground/50 mt-1">
                        <span>{relatedCampaign.progress}%</span>
                        <span>{relatedCampaign.daysLeft} days left</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button asChild className="flex-1 bg-primary hover:bg-primary/90">
                        <Link href={`/campaign/${relatedCampaign.id}`}>Donate</Link>
                      </Button>
                      <Button asChild variant="outline" className="border-primary/20">
                        <Link href={`/campaign/${relatedCampaign.id}`}>View Details</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Donate Button */}
      <Button
        onClick={() => setIsDonationModalOpen(true)}
        className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-2xl z-40 animate-bounce"
        aria-label="Donate Now"
      >
        <IndianRupee className="h-8 w-8" />
      </Button>

      <DonationModal
        isOpen={isDonationModalOpen}
        onOpenChange={setIsDonationModalOpen}
        campaignTitle={campaign.title}
      />
      <Footer />
    </>
  )
}