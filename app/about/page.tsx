'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { HeroSlider } from '@/components/hero-slider'
import { AnimatedSection } from '@/components/animated-section'
import { AnimatedNumber } from '@/components/animated-number'
import Image from 'next/image'

export default function About() {
  const [team, setTeam] = useState<any[]>([])

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch('/api/team')
        const result = await response.json()
        if (result.success) {
          setTeam(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch team:', error)
      }
    }
    fetchTeam()
  }, [])

  const heroSlides = [
    {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80',
      alt: 'Environmental initiatives',
      title: 'About Kripa Kunj',
      subtitle: '10+ Years of Service',
      description: 'Established with a vision to bring meaningful change, Kripa Kunj Charitable Trust works towards creating a society where every person has access to basic resources, education, and opportunities for dignified living.',
    },
    {
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1920&q=80',
      alt: 'Our educational programs',
      title: 'Empowering Communities',
      subtitle: '1100+ Active Volunteers',
      description: 'We believe in breaking the vicious cycle of poverty and social isolation by restoring hope and enabling people to become active, contributing members of society.',
    },
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80',
      alt: 'Our community work',
      title: 'Making a Difference',
      subtitle: 'Impacting 100K+ Lives',
      description: 'Our mission encompasses quality education, healthcare awareness, environmental conservation, and women empowerment across 9 cities in India.',
    },
  ]

  return (
    <>
      <Navigation />

      {/* Hero Section with Slider */}
      <section className="relative">
        <HeroSlider slides={heroSlides} autoPlay={true} interval={5000} />
      </section>

      {/* Vision & Mission */}
      <section className="bg-linear-to-br from-primary/5 via-accent/5 to-primary/10 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <AnimatedSection direction="right" delay={100}>
              <div className="group bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">👁️</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-foreground/70 leading-relaxed mb-4 text-lg">
                  Our foresight of 50 years ahead is a country free of NGOs. We envision a society where every individual, regardless of their background, has access to quality education, healthcare, and opportunities for personal and professional growth.
                </p>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  We believe in breaking the vicious cycle of poverty and social isolation by restoring hope and enabling people to become active, contributing members of society.
                </p>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={200}>
              <div className="group bg-white rounded-2xl p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-foreground/70 leading-relaxed mb-6 text-lg">
                  We are committed to exterminating the miserable conditions prevalent in our nation so that people can live with dignity. Our mission encompasses:
                </p>
                <ul className="space-y-4">
                  {[
                    'Quality Education for underprivileged children',
                    'Healthcare and hygiene awareness programs',
                    'Environmental conservation and sustainability',
                    'Women empowerment and economic independence',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <span className="w-6 h-6 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold text-sm mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform">
                        ✓
                      </span>
                      <span className="text-foreground/80 font-medium text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Our Programs */}
      <section className="bg-linear-to-b from-gray-50/50 via-white to-gray-50/50 pt-4 md:pt-6 pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Our <span className="text-primary font-bold">Programs</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: 'Project GyanDaan',
                tagline: 'Education for All',
                description:
                  'Providing free education through our open schools all over India, sponsoring children\'s schooling and school supplies, and fighting illiteracy together.',
                stats: '400+ kids educating',
                icon: '📚',
                color: 'from-blue-500/10 to-cyan-500/10',
                borderColor: 'border-blue-200',
              },
              {
                name: 'Project Lajja',
                tagline: '#MenstruationMatters',
                description:
                  'Creating awareness through menstrual health drives and establishing a platform for women empowerment. Breaking taboos and ensuring dignified living for women.',
                stats: '32,000+ lives impacted',
                icon: '💜',
                color: 'from-pink-500/10 to-purple-500/10',
                borderColor: 'border-pink-200',
              },
              {
                name: 'Kill Hunger',
                tagline: 'Food Security',
                description:
                  'A collective fight against hunger and malnutrition for the underprivileged by providing rations, food packets, and nutrition programs.',
                stats: 'Supporting families across 9 cities',
                icon: '🍲',
                color: 'from-orange-500/10 to-red-500/10',
                borderColor: 'border-orange-200',
              },
              {
                name: 'Project Kinaara',
                tagline: 'Beach Cleaning',
                description:
                  'Collective, impactful, and fun beach and coastal clean-up drives to beautify our environment and beaches of Mumbai and surrounding coastal areas.',
                stats: 'Monthly cleanup drives',
                icon: '🌊',
                color: 'from-cyan-500/10 to-blue-500/10',
                borderColor: 'border-cyan-200',
              },
              {
                name: 'Project Shoonya',
                tagline: 'Waste Management',
                description:
                  'Collaborating with local bodies and the general public to bring awareness about waste disposal, waste management, and recycling for a cleaner future.',
                stats: '1,100+ awareness programs',
                icon: '♻️',
                color: 'from-green-500/10 to-emerald-500/10',
                borderColor: 'border-green-200',
              },
              {
                name: 'Blood Donation Drive',
                tagline: '#BloodDoNation',
                description:
                  'Organizing regular blood donation camps and creating awareness about the importance of blood donation in saving lives.',
                stats: '1,000+ units collected',
                icon: '🩸',
                color: 'from-red-500/10 to-pink-500/10',
                borderColor: 'border-red-200',
              },
            ].map((program, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 100} className="h-full">
                <div className={`group bg-linear-to-br ${program.color} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${program.borderColor} h-full flex flex-col`}>
                  <div className="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">
                    {program.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {program.name}
                  </h3>
                  <p className="text-primary font-semibold text-sm mb-3">{program.tagline}</p>
                  <p className="text-foreground/70 text-sm leading-relaxed mb-4 grow">
                    {program.description}
                  </p>
                  <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/50 mt-auto">
                    <p className="text-primary font-bold text-xs">{program.stats}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/50 to-black/60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Our Core <span className="text-primary">Values</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: '❤️',
                title: 'Compassion',
                desc: 'Deep empathy for those in need. We understand and address the root causes of poverty and suffering.',
                long: 'Every action is driven by genuine care for the wellbeing of the communities we serve.',
                color: 'from-red-500/10 to-pink-500/10',
                borderColor: 'border-red-200',
              },
              {
                icon: '💪',
                title: 'Empowerment',
                desc: 'Building capability and independence for sustainable change and self-reliance.',
                long: 'We believe in enabling people to become architects of their own destiny through skills and opportunities.',
                color: 'from-orange-500/10 to-yellow-500/10',
                borderColor: 'border-orange-200',
              },
              {
                icon: '🌍',
                title: 'Sustainability',
                desc: 'Long-term positive impact through programs designed for lasting change.',
                long: 'Our initiatives focus on creating systems that continue to benefit communities for generations.',
                color: 'from-green-500/10 to-emerald-500/10',
                borderColor: 'border-green-200',
              },
              {
                icon: '🤝',
                title: 'Collaboration',
                desc: 'Working together with communities, partners, and volunteers for greater impact.',
                long: 'We recognize that collective effort and diverse perspectives create more effective solutions.',
                color: 'from-blue-500/10 to-cyan-500/10',
                borderColor: 'border-blue-200',
              },
            ].map((value, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 100}>
                <div className={`group text-center bg-white/95 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 h-full`}>
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 inline-block">
                    {value.icon}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 text-sm mb-4 leading-relaxed">{value.desc}</p>
                  <p className="text-foreground/60 text-xs leading-relaxed italic">{value.long}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Track Record & Achievements */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              Our <span className="text-primary">Track Record</span>
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { number: '15+', label: 'Open Schools', desc: 'Providing free quality education' },
              { number: '1100+', label: 'Active Volunteers', desc: 'Community changemakers' },
              { number: '100K+', label: 'People Impacted', desc: 'Across 9 cities' },
              { number: '20Cr+', label: 'Funds Mobilized', desc: 'For social impact' },
              { number: '65K+', label: 'Trees Planted', desc: 'Environmental protection' },
              { number: '2000+', label: 'Families Fed', desc: 'Through Kill Hunger' },
              { number: '500+', label: 'Women Trained', desc: 'For economic independence' },
              { number: '10Yrs+', label: 'In Service', desc: 'Making continuous impact' },
            ].map((achievement, index) => (
              <AnimatedSection key={index} direction="up" delay={index * 100}>
                <div className="group bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border border-gray-100 hover:border-primary/30">
                  <AnimatedNumber
                    value={achievement.number}
                    className="text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent mb-3"
                  />
                  <h4 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {achievement.label}
                  </h4>
                  <p className="text-sm text-foreground/70">{achievement.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Governance & Transparency */}
      <section className="bg-linear-to-b from-gray-50 to-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground">
              <span className="text-primary">Governance</span> & Transparency
            </h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-8">
            <AnimatedSection direction="right" delay={100}>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">Our Commitment</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Transparent financial reporting and annual audits',
                    'Regular impact assessment and monitoring',
                    'Community feedback and suggestions welcomed',
                    'Ethical practices in all operations',
                    '80%+ funds allocated to programs (not overhead)',
                    'Professional team with years of experience',
                    'Registered as 80G and 12A certified NGO',
                    'NITI Aayog recognition for social impact',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 group/item">
                      <span className="w-6 h-6 bg-linear-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-sm mt-0.5 shrink-0 group-hover/item:scale-110 transition-transform">
                        ✓
                      </span>
                      <span className="text-foreground/80 font-medium text-lg leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={200}>
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">How We Work</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: 'Needs Assessment',
                      desc: 'Thorough ground research to understand community needs and challenges.',
                    },
                    {
                      title: 'Program Design',
                      desc: 'Collaborative design of sustainable, scalable, and impactful programs.',
                    },
                    {
                      title: 'Implementation',
                      desc: 'On-ground execution with regular monitoring and community participation.',
                    },
                    {
                      title: 'Impact Measurement',
                      desc: 'Regular evaluation of outcomes and adaptation for continuous improvement.',
                    },
                    {
                      title: 'Scaling & Sustainability',
                      desc: 'Building models for long-term sustainability and wider reach.',
                    },
                    {
                      title: 'Community Ownership',
                      desc: 'Ensuring communities drive their own development journey.',
                    },
                  ].map((process, idx) => (
                    <div key={idx} className="group bg-linear-to-r from-primary/5 via-accent/5 to-primary/5 rounded-xl p-5 border border-primary/10 hover:border-primary/30 transition-all duration-300 hover:shadow-md">
                      <h4 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors text-lg">
                        {process.title}
                      </h4>
                      <p className="text-sm text-foreground/70 leading-relaxed">{process.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-white py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection direction="fade" className="text-center mb-6">
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
              Our <span className="text-primary">Leadership Team</span>
            </h2>
          </AnimatedSection>
          <AnimatedSection direction="fade" delay={100} className="text-center mb-12">
            <p className="text-center text-foreground/70 max-w-2xl mx-auto text-lg">
              Led by passionate changemakers with decades of collective experience in social development, our team is committed to creating meaningful and sustainable impact.
            </p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.length > 0 ? (
              team.slice(0, 6).map((member, idx) => (
                <AnimatedSection key={member._id || idx} direction="up" delay={idx * 100}>
                  <div className="group bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/30 h-full flex flex-col">
                    <div className="w-20 h-20 bg-linear-to-br from-primary via-accent to-primary rounded-full mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <Image
                        src={member.imageUrl || '/placeholder-avatar.jpg'}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {member.name}
                    </h4>
                    <p className="text-sm text-primary font-semibold mb-3 bg-primary/10 px-3 py-1 rounded-lg inline-block">
                      {member.designation}
                    </p>
                    {member.bio && (
                      <p className="text-sm text-foreground/70 leading-relaxed grow line-clamp-2">{member.bio}</p>
                    )}
                  </div>
                </AnimatedSection>
              ))
            ) : (
              [
                {
                  role: 'Founder & Director',
                  exp: '15+ years in social development',
                  focus: 'Vision & Strategic Leadership',
                },
                {
                  role: 'Program Head',
                  exp: '12+ years in grassroots community work',
                  focus: 'Implementation & Community Relations',
                },
                {
                  role: 'Finance & Operations',
                  exp: '10+ years in NGO management',
                  focus: 'Transparency & Operational Excellence',
                },
              ].map((member, idx) => (
                <AnimatedSection key={idx} direction="up" delay={idx * 100}>
                  <div className="group bg-linear-to-br from-white to-gray-50 rounded-2xl p-6 md:p-8 text-center shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 hover:border-primary/30 h-full flex flex-col">
                    <div className="w-20 h-20 bg-linear-to-br from-primary via-accent to-primary rounded-full mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 to-transparent"></div>
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {member.role}
                    </h4>
                    <p className="text-sm text-primary font-semibold mb-3 bg-primary/10 px-3 py-1 rounded-lg inline-block">
                      {member.exp}
                    </p>
                    <p className="text-sm text-foreground/70 leading-relaxed grow">{member.focus}</p>
                  </div>
                </AnimatedSection>
              ))
            )}
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
