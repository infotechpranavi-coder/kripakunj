'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Play } from 'lucide-react'

interface VideoItem {
  _id: string
  title: string
  videoUrl?: string
  fileUrl?: string
  createdAt: string
}

export default function Videos() {
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch('/api/videos')
        const data = await res.json()
        if (data.success) setVideos(data.data)
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [])

  const formatDuration = (video: VideoItem) => {
    // No duration stored yet, so just show a placeholder for uploaded videos
    if (video.fileUrl || video.videoUrl) return ''
    return ''
  }

  const renderMedia = (video: VideoItem) => {
    if (video.fileUrl) {
      return (
        <video
          controls
          src={video.fileUrl}
          className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
        />
      )
    }
    if (video.videoUrl) {
      return (
        <iframe
          src={video.videoUrl}
          title={video.title}
          className="w-full h-full border-0 opacity-90 group-hover:scale-105 transition-transform duration-500"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )
    }
    return (
      <div className="w-full h-full bg-gray-200" />
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <section className="bg-primary/10 py-16 md:py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Videos</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Watch our stories of impact, volunteer testimonials, and behind-the-scenes glimpses of our projects.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {isLoading ? (
              <p className="text-center text-gray-500">Loading videos...</p>
            ) : videos.length === 0 ? (
              <p className="text-center text-gray-500">No videos available yet.</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {videos.map((video, index) => (
                  <AnimatedSection key={video._id} direction="up" delay={index * 100}>
                    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                      <div className="relative aspect-video overflow-hidden bg-black">
                        {renderMedia(video)}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 fill-current" />
                          </div>
                        </div>
                        {formatDuration(video) && (
                          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold">
                            {formatDuration(video)}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {video.title}
                        </h3>
                        <p className="text-foreground/70 text-sm leading-relaxed">
                          {new Date(video.createdAt).toLocaleDateString()} • Uploaded video
                        </p>
                      </div>
                    </div>
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
