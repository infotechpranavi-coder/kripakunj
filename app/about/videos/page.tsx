import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import { Play } from 'lucide-react'

export default function Videos() {
  const videos = [
    {
      title: 'Our Impact Story 2025',
      duration: '4:20',
      thumbnail: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      desc: 'A comprehensive look at how your support transformed lives across 9 cities.',
    },
    {
      title: 'Project GyanDaan: Transforming Rural Education',
      duration: '3:45',
      thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      desc: 'Journey into our open schools and meet the children building their future.',
    },
    {
      title: 'Kill Hunger Drive Highlights',
      duration: '2:15',
      thumbnail: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      desc: 'Go behind the scenes of our massive food distribution drives.',
    },
    {
      title: 'Project Kinaara: Marine Conservation',
      duration: '5:10',
      thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
      desc: 'The science and community effort behind our beach cleanup initiatives.',
    },
  ]

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
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              {videos.map((video, index) => (
                <AnimatedSection key={index} direction="up" delay={index * 100}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group">
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                          <Play className="w-8 h-8 fill-current" />
                        </button>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-white text-xs font-bold">
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-foreground/70 text-sm leading-relaxed">
                        {video.desc}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
