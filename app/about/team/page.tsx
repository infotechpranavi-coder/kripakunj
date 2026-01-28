'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import Image from 'next/image'

export default function TeamMembers() {
  const [team, setTeam] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      } finally {
        setIsLoading(false)
      }
    }
    fetchTeam()
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="bg-accent/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Team</span> Members
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Meet the dedicated professionals who work tirelessly behind the scenes to drive our mission forward.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : team.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
                {team.map((member, index) => {
                  const colors = [
                    'from-[#FF9D2E] to-[#FFB86C]', // Orange
                    'from-[#13B9A6] to-[#2DD4BF]', // Teal
                    'from-[#4F46E5] to-[#818CF8]', // Indigo
                    'from-[#EF4444] to-[#F87171]', // Red
                  ]
                  const colorClass = colors[index % colors.length]

                  return (
                    <AnimatedSection key={member._id || index} direction="up" delay={index * 100}>
                      <div className="relative group max-w-xs mx-auto overflow-hidden rounded-[40px] shadow-2xl hover:scale-105 transition-all duration-500">
                        {/* Image Container */}
                        <div className="relative aspect-[4/5] w-full">
                          <Image
                            src={member.imageUrl || member.image || '/placeholder-avatar.jpg'}
                            alt={member.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        {/* Slanted Overlay */}
                        <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-linear-to-br ${colorClass} transition-transform duration-500`}
                          style={{ clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0 100%)' }}>
                          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 px-4 text-center">
                            <h3 className="text-2xl font-bold text-white mb-3">
                              {member.name}
                            </h3>
                            <div className="px-6 py-2 rounded-full border-2 border-white/50 bg-white/10 backdrop-blur-sm">
                              <span className="text-white font-semibold text-sm">
                                {member.designation || member.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-20 text-foreground/50">
                No team members found.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
