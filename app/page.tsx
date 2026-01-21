import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSlider } from '@/components/hero-slider'
import { CampaignsSlider } from '@/components/campaigns-slider'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedNumber } from '@/components/animated-number'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
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

  const campaigns = [
    {
      id: '1',
      title: 'Celebrate your Special Day with the',
      image: '/slider-community.jpg',
      progress: 13,
      raised: 134847,
      goal: 1000000,
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
      title: 'Project - LAJJA',
      image: '/slider-education.jpg',
      progress: 72,
      raised: 144145,
      goal: 200000,
    },
    {
      id: '4',
      title: 'Project GyanDaan - Education for All',
      image: '/slider-education.jpg',
      progress: 45,
      raised: 225000,
      goal: 500000,
    },
    {
      id: '5',
      title: 'Kill Hunger Initiative',
      image: '/slider-community.jpg',
      progress: 68,
      raised: 340000,
      goal: 500000,
    },
    {
      id: '6',
      title: 'Project Kinaara - Beach Cleanup',
      image: '/slider-environment.jpg',
      progress: 55,
      raised: 110000,
      goal: 200000,
    },
    {
      id: '7',
      title: 'Blood Donation Drive',
      image: '/slider-community.jpg',
      progress: 80,
      raised: 160000,
      goal: 200000,
    },
    {
      id: '8',
      title: 'Women Empowerment Program',
      image: '/slider-education.jpg',
      progress: 60,
      raised: 300000,
      goal: 500000,
    },
    {
      id: '9',
      title: 'Project Shoonya - Waste Management',
      image: '/slider-environment.jpg',
      progress: 40,
      raised: 80000,
      goal: 200000,
    },
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
            <CampaignsSlider campaigns={campaigns} itemsPerView={3} autoPlay={true} interval={4000} />
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
            {[
              {
                name: 'Project GyanDaan',
                focus: 'Education Excellence',
                description: 'Providing comprehensive education support including school fees, uniforms, books, and study materials. Mentorship programs for academic advancement.',
              },
              {
                name: 'Project Lajja',
                focus: '#MenstruationMatters',
                description: 'Breaking menstrual taboos through awareness camps. Distributing menstrual health products and conducting monthly wellness sessions.',
              },
              {
                name: 'Kill Hunger',
                focus: 'Food & Nutrition',
                description: 'Monthly food distribution drives. Nutrition programs for children and pregnant women. Emergency relief during natural disasters.',
              },
              {
                name: 'Project Kinaara',
                focus: 'Coastal Conservation',
                description: 'Monthly beach cleanup drives with community volunteers. Marine life protection and plastic waste reduction campaigns.',
              },
              {
                name: 'Project Shoonya',
                focus: 'Waste Management',
                description: 'Educational awareness programs on waste segregation. Community collaboration for effective waste management and recycling.',
              },
              {
                name: 'Blood Donation Drive',
                focus: '#BloodDonation',
                description: 'Regular blood donation camps. Building a database of voluntary donors. Life-saving blood units collected and distributed.',
              },
            ].map((initiative, index) => (
              <AnimatedSection
                key={index}
                direction="up"
                delay={index * 100}
                className="h-full"
              >
                <div className="group bg-linear-to-br from-accent/5 via-white to-primary/5 rounded-2xl p-8 border border-accent/20 hover:border-primary/40 shadow-md hover:shadow-2xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 hover:scale-[1.02] h-full flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                  <h3 className="text-lg font-bold text-foreground mb-2 relative z-10 group-hover:text-primary transition-colors duration-500 ease-in-out">
                    {initiative.name}
                  </h3>
                  <p className="text-accent font-semibold text-sm mb-4 relative z-10">{initiative.focus}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed grow relative z-10">{initiative.description}</p>
                </div>
              </AnimatedSection>
            ))}
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
              <Link
                href="/volunteer"
                className="group relative px-8 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105 hover:shadow-xl overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Volunteer With Us
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
              <Link
                href="/contact"
                className="px-8 py-3 border-2 border-primary-foreground rounded-xl font-semibold hover:bg-primary-foreground/10 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Get In Touch
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  )
}
