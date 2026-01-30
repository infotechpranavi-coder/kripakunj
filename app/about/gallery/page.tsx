'use client'

import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { AnimatedSection } from '@/components/animated-section'
import Image from 'next/image'
import { useState, useEffect } from 'react'

interface GalleryImage {
  _id: string;
  title: string;
  imageUrl: string;
  category: string;
  createdAt: string;
}

export default function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState<string[]>(['All'])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/gallery')
      const result = await response.json()
      if (result.success) {
        const data = result.data as GalleryImage[]
        setImages(data)
        setFilteredImages(data)

        // Extract unique categories from images
        const uniqueCategories: string[] = [
          'All',
          ...Array.from(new Set(data.map((img) => img.category))),
        ]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error('Error fetching gallery images:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category)
    if (category === 'All') {
      setFilteredImages(images)
    } else {
      setFilteredImages(images.filter(img => img.category === category))
    }
  }

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
                  onClick={() => handleCategoryFilter(cat)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${cat === selectedCategory
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
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary"></div>
              </div>
            ) : filteredImages.length === 0 ? (
              <div className="text-center py-20">
                <div className="bg-gray-100 p-8 rounded-full inline-block mb-4">
                  <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {selectedCategory === 'All' ? 'No images yet' : `No images in ${selectedCategory} category`}
                </h3>
                <p className="text-gray-600">
                  Check back soon for updates from our initiatives.
                </p>
              </div>
            ) : (
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredImages.map((img, index) => (
                  <AnimatedSection key={img._id} direction="fade" delay={index * 50}>
                    <div className="relative group overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 break-inside-avoid">
                      <Image
                        src={img.imageUrl}
                        alt={img.title}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <span className="text-primary font-bold text-xs uppercase tracking-wider mb-2">
                          {img.category}
                        </span>
                        <p className="text-white font-bold text-lg">{img.title}</p>
                        <p className="text-white/70 text-sm mt-1">
                          {new Date(img.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
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
