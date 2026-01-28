'use client'

import React, { useState, useEffect } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import Image from 'next/image'

export default function MediaCoverage() {
  const [mediaItems, setMediaItems] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await fetch('/api/media')
        const result = await response.json()
        if (result.success) {
          setMediaItems(result.data)
        }
      } catch (error) {
        console.error('Failed to fetch media:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMedia()
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-primary/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Media <span className="text-primary">Coverage</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our journey and impact as featured in various news outlets and media platforms.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : mediaItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mediaItems.map((item, index) => (
                  <AnimatedSection key={item._id || index} direction="up" delay={index * 100}>
                    <a
                      href={item.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 aspect-[4/3]"
                    >
                      <Image
                        src={item.imageUrl || item.image || '/placeholder-media.jpg'}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <div className="overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <p className="text-sm text-gray-200 mt-2">
                            {new Date(item.date).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    </a>
                  </AnimatedSection>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-foreground/50">
                No media articles found.
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
