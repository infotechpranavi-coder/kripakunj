'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { AnimatedSection } from './animated-section'

interface Collaborator {
  _id: string;
  name: string;
  logo: string;
  link?: string;
}

export function CollaboratorsSection() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await fetch('/api/collaborators')
        const result = await response.json()
        if (result.success) {
          setCollaborators(result.data)
        }
      } catch (error) {
        console.error('Error fetching collaborators:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCollaborators()
  }, [])

  if (isLoading) return null
  if (collaborators.length === 0) return null

  // Duplicate the list to ensure a seamless loop
  const duplicatedCollaborators = [...collaborators, ...collaborators]

  return (
    <section className="py-16 md:py-24 bg-gray-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection direction="fade" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground font-poppins">
            Our <span className="text-primary">Collaborators</span>
          </h2>
          <div className="w-20 h-1.5 bg-primary mx-auto mt-4 rounded-full" />
        </AnimatedSection>

        <div className="relative mt-8">
          {/* Gradient Overlays for Fade Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50/50 to-transparent z-10 hidden md:block" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50/50 to-transparent z-10 hidden md:block" />

          <div className="flex overflow-hidden group">
            <div className="flex animate-scroll hover:[animation-play-state:paused] whitespace-nowrap gap-12 md:gap-20 py-4">
              {duplicatedCollaborators.map((partner, index) => (
                <a
                  key={`${partner._id}-${index}`}
                  href={partner.link || '#'}
                  target={partner.link ? "_blank" : undefined}
                  rel={partner.link ? "noopener noreferrer" : undefined}
                  className="grayscale hover:grayscale-0 transition-all duration-500 transform hover:scale-110 opacity-60 hover:opacity-100 flex-shrink-0"
                >
                  <div className="relative w-32 h-16 md:w-40 md:h-20">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-50% - 2.5rem)); /* Adjust based on gap */
            }
          }
          .animate-scroll {
            animation: scroll 30s linear infinite;
            display: flex;
            width: max-content;
          }
          @media (min-width: 768px) {
            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(calc(-50% - 5rem)); /* Adjust for md:gap-20 (5rem) */
              }
            }
          }
        `}</style>
      </div>
    </section>
  )
}
