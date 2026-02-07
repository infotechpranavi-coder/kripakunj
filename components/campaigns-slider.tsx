'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { DonationModal } from '@/components/donation-modal'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

interface Campaign {
  id: string
  title: string
  image: string
  progress: number
  raised: number
  goal: number
}

interface CampaignsSliderProps {
  campaigns: Campaign[]
  itemsPerView?: number
  mobileItemsPerView?: number
  autoPlay?: boolean
  interval?: number
}

export function CampaignsSlider({
  campaigns,
  itemsPerView = 3,
  mobileItemsPerView = 1,
  autoPlay = true,
  interval = 4000,
}: CampaignsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay)
  const maxIndex = campaigns.length - itemsPerView

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDonate = (campaign: Campaign) => {
    setSelectedCampaign(campaign)
    setIsModalOpen(true)
  }

  const handleShare = async (campaignSlug: string, campaignTitle: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const shareUrl = `${window.location.origin}/campaign/${campaignSlug}`
    
    // Try Web Share API first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({
          title: campaignTitle,
          text: `Check out this campaign: ${campaignTitle}`,
          url: shareUrl,
        })
        toast.success('Shared successfully!')
        return
      } catch (err) {
        // User cancelled or error occurred, fall back to clipboard
      }
    }
    
    // Fallback to clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      toast.success('Link copied to clipboard!')
    } catch (err) {
      toast.error('Failed to copy link')
    }
  }

  // Auto-play functionality with infinite loop

  // Auto-play functionality with infinite loop
  useEffect(() => {
    if (!isAutoPlay || campaigns.length <= itemsPerView) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) {
          return 0 // Loop back to start
        }
        return prev + 1
      })
    }, interval)

    return () => clearInterval(timer)
  }, [isAutoPlay, campaigns.length, itemsPerView, maxIndex, interval])

  const goToPrevious = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => {
      if (prev <= 0) {
        return maxIndex // Loop to end
      }
      return prev - 1
    })
  }

  const goToNext = () => {
    setIsAutoPlay(false)
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) {
        return 0 // Loop to start
      }
      return prev + 1
    })
  }

  const goToSlide = (index: number) => {
    setIsAutoPlay(false)
    setCurrentIndex(index)
  }

  const totalPages = Math.ceil(campaigns.length / itemsPerView)
  const currentPage = Math.floor(currentIndex / itemsPerView)

  return (
    <div className="relative">
      {/* Title */}
      <div className="mb-8 md:mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground relative inline-block">
          Campaigns
          <svg
            className="absolute -bottom-2 left-0 w-full"
            height="8"
            viewBox="0 0 200 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 6C50 2 100 6 150 4C175 3 190 2 198 4"
              stroke="rgb(34, 197, 94)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </h2>
      </div>

      {/* Campaigns Container */}
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(autoPlay)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
          }}
        >
          {campaigns.map((campaign, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + itemsPerView
            const cardIndex = index - currentIndex

            return (
              <div
                key={campaign.id}
                className="flex-shrink-0 px-3"
                style={{ width: `${100 / itemsPerView}%` }}
              >
                <div
                  className={`group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 h-full transform hover:-translate-y-3 border border-gray-100 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
                    }`}
                  style={{
                    animationDelay: isVisible ? `${cardIndex * 0.1}s` : '0s',
                  }}
                >
                  {/* Card Content */}
                  <div className="relative h-full flex flex-col">
                    <Link href={`/campaign/${campaign.slug || campaign.id}`} className="flex-1 flex flex-col group/card transition-all duration-300">
                      {/* Orange Ribbon Badge - Top Left Corner */}
                      <div className="absolute -top-2 -left-2 z-20 bg-orange-500 text-white rounded-br-lg shadow-lg">
                        <div className="px-3 py-2 flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      </div>

                      {/* Rectangular Image */}
                      <div className="relative pt-8 px-4 pb-4">
                        <div className="relative w-full h-40 md:h-48 mx-auto rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={campaign.image || '/placeholder.svg'}
                            alt={campaign.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover/card:scale-110 group-hover:scale-110"
                          />
                        </div>
                      </div>

                      {/* Campaign Details */}
                      <div className="px-4 pb-2 flex-1 flex flex-col bg-white">
                        {/* Title */}
                        <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 text-center line-clamp-2 min-h-[3rem] transition-colors duration-300 group-hover:text-primary leading-tight">
                          {campaign.title}
                        </h3>

                        {/* Progress Bar with Percentage on Bar */}
                        <div className="mb-3">
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden relative">
                            <div
                              className="bg-blue-500 h-full rounded-full transition-all duration-500 relative flex items-center justify-end pr-2"
                              style={{ width: `${campaign.progress}%` }}
                            >
                              <span className="text-white text-xs font-bold whitespace-nowrap">
                                {campaign.progress}%
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Financial Info - Single Row */}
                        <div className="flex justify-between items-center mb-4 flex-grow gap-4">
                          <div className="flex flex-col items-start">
                            <span className="text-xs md:text-sm font-medium text-gray-700">Raised:</span>
                            <span className="text-sm md:text-base font-bold text-green-600">
                              ₹{campaign.raised.toLocaleString('en-IN')}
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-xs md:text-sm font-medium text-gray-700">Goal:</span>
                            <span className="text-sm md:text-base font-bold text-red-500">
                              ₹{campaign.goal.toLocaleString('en-IN')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Donate Button and Share */}
                    <div className="px-4 pb-4 bg-white flex gap-2">
                      <Link
                        href={`/campaign/${campaign.slug || campaign.id}?donate=true`}
                        className="group/btn relative flex-1 block bg-orange-500 text-white text-center py-2 px-3 rounded-lg font-bold text-xs md:text-sm hover:bg-orange-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-100 z-30"
                      >
                        <span className="relative z-10">DONATE</span>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-auto w-auto px-3 border-orange-500/30 hover:bg-orange-50 shrink-0"
                        onClick={(e) => handleShare(campaign.slug || campaign.id, campaign.title, e)}
                        title="Share campaign"
                      >
                        <Share2 className="h-4 w-4 text-orange-600" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation Arrows - Modern Design */}
      {campaigns.length > itemsPerView && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3 hover:bg-white hover:scale-110 transition-all duration-300 z-10 border border-gray-100 group"
            aria-label="Previous campaigns"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3 hover:bg-white hover:scale-110 transition-all duration-300 z-10 border border-gray-100 group"
            aria-label="Next campaigns"
          >
            <svg
              className="w-5 h-5 text-gray-700 group-hover:text-orange-500 transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Pagination Dots - Modern Design */}
      <div className="flex justify-center gap-2.5 mt-10">
        {Array.from({ length: totalPages }).map((_, index) => {
          const isActive = currentPage === index

          return (
            <button
              key={index}
              onClick={() => goToSlide(index * itemsPerView)}
              className={`transition-all duration-300 rounded-full ${isActive
                ? 'bg-gradient-to-r from-orange-500 to-red-500 w-8 h-2.5 shadow-lg'
                : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400 hover:w-6'
                }`}
              aria-label={`Go to page ${index + 1}`}
            />
          )
        })}
      </div>
      <DonationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        campaignTitle={selectedCampaign?.title || ''}
      />
    </div>
  )
}
