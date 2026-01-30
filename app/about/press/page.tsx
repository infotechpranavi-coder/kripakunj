'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'

interface PressReleaseItem {
  _id: string
  title: string
  imageUrl: string
  date: string
}

export default function PressRelease() {
  const [releases, setReleases] = useState<PressReleaseItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/press')
        const data = await res.json()
        if (data.success) {
          setReleases(data.data)
        }
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="bg-accent/10 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Press <span className="text-primary">Releases</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Official announcements, reports, and statements from Kripa Kunj Charitable Trust.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <p className="text-center text-foreground/60">Loading press releases...</p>
            ) : releases.length === 0 ? (
              <p className="text-center text-foreground/60">
                No press releases have been published yet. Please check back soon.
              </p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {releases.map((release, index) => (
                  <AnimatedSection key={release._id} direction="up" delay={index * 100}>
                    <article className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 w-80 mx-auto">
                      <div className="relative aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                        <img
                          src={release.imageUrl}
                          alt={release.title}
                          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                          {new Date(release.date).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {release.title}
                        </h3>
                        <p className="text-foreground/60 text-sm">
                          Official press release from Kripa Kunj Charitable Trust.
                        </p>
                      </div>
                    </article>
                  </AnimatedSection>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
