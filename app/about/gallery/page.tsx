import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import Image from 'next/image'

export default function Gallery() {
  const categories = ['All', 'Education', 'Environment', 'Events', 'Health']
  const images = [
    {
      src: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80',
      alt: 'Education program',
      category: 'Education',
    },
    {
      src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80',
      alt: 'Beach cleanup',
      category: 'Environment',
    },
    {
      src: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80',
      alt: 'Volunteer meeting',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80',
      alt: 'Food distribution',
      category: 'Events',
    },
    {
      src: 'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&q=80',
      alt: 'Medical camp',
      category: 'Health',
    },
    {
      src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
      alt: 'Classroom session',
      category: 'Education',
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        <section className="bg-primary/5 py-16 md:py-24 text-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Our <span className="text-primary">Gallery</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto mb-12">
              Visual stories of hope, change, and community impact captured across our various initiatives.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    cat === 'All'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-foreground hover:bg-primary/10 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {images.map((img, index) => (
                <AnimatedSection key={index} direction="fade" delay={index * 50}>
                  <div className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <span className="text-primary font-bold text-xs uppercase tracking-wider mb-2">
                        {img.category}
                      </span>
                      <p className="text-white font-bold text-lg">{img.alt}</p>
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
