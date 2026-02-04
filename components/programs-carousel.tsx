'use client'

import { useState, useEffect } from 'react'

interface Program {
    _id: string
    name: string
    tagline: string
    description: string
    stats: string
    icon: string
    color?: string
    borderColor?: string
}

interface ProgramsCarouselProps {
    programs: Program[]
    itemsPerView?: number
    mobileItemsPerView?: number
    autoPlay?: boolean
    interval?: number
}

export function ProgramsCarousel({
    programs,
    itemsPerView = 3,
    mobileItemsPerView = 1,
    autoPlay = true,
    interval = 5000,
}: ProgramsCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay)
    const [viewportWidth, setViewportWidth] = useState(0)

    useEffect(() => {
        setViewportWidth(window.innerWidth)
        const handleResize = () => setViewportWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const activeItemsPerView = viewportWidth < 768 ? mobileItemsPerView : itemsPerView
    const maxIndex = Math.max(0, programs.length - activeItemsPerView)

    useEffect(() => {
        if (!isAutoPlay || programs.length <= activeItemsPerView) return

        const timer = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= maxIndex) {
                    return 0
                }
                return prev + 1
            })
        }, interval)

        return () => clearInterval(timer)
    }, [isAutoPlay, programs.length, activeItemsPerView, maxIndex, interval])

    const goToPrevious = () => {
        setIsAutoPlay(false)
        setCurrentIndex((prev) => {
            if (prev <= 0) {
                return maxIndex
            }
            return prev - 1
        })
    }

    const goToNext = () => {
        setIsAutoPlay(false)
        setCurrentIndex((prev) => {
            if (prev >= maxIndex) {
                return 0
            }
            return prev + 1
        })
    }

    const goToSlide = (index: number) => {
        setIsAutoPlay(false)
        setCurrentIndex(index)
    }

    const totalPages = Math.ceil(programs.length / activeItemsPerView)
    const currentPage = Math.floor(currentIndex / activeItemsPerView)

    if (programs.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-500">No programs listed at the moment.</p>
            </div>
        )
    }

    return (
        <div className="relative">
            <div
                className="relative overflow-hidden p-2"
                onMouseEnter={() => setIsAutoPlay(false)}
                onMouseLeave={() => setIsAutoPlay(autoPlay)}
            >
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                        transform: `translateX(-${currentIndex * (100 / activeItemsPerView)}%)`,
                    }}
                >
                    {programs.map((program, index) => {
                        const isVisible = index >= currentIndex && index < currentIndex + activeItemsPerView
                        const cardIndex = index - currentIndex

                        return (
                            <div
                                key={program._id || index}
                                className="flex-shrink-0 px-3 h-full"
                                style={{ width: `${100 / activeItemsPerView}%` }}
                            >
                                <div className={`group bg-linear-to-br ${program.color || 'from-primary/10 to-accent/10'} rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border ${program.borderColor || 'border-primary/20'} h-full flex flex-col min-h-[400px]`}>
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
                                    <div className="bg-white/80 backdrop-blur-sm px-3 py-2 rounded-lg border border-white/50 mt-auto w-fit">
                                        <p className="text-primary font-bold text-xs">{program.stats}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Navigation Arrows */}
            {programs.length > activeItemsPerView && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3 hover:bg-white hover:scale-110 transition-all duration-300 z-10 border border-gray-100 group cursor-pointer"
                        aria-label="Previous programs"
                    >
                        <svg
                            className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors"
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
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 bg-white/95 backdrop-blur-sm shadow-xl rounded-full p-3 hover:bg-white hover:scale-110 transition-all duration-300 z-10 border border-gray-100 group cursor-pointer"
                        aria-label="Next programs"
                    >
                        <svg
                            className="w-5 h-5 text-gray-700 group-hover:text-primary transition-colors"
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

            {/* Pagination Dots */}
            {programs.length > activeItemsPerView && (
                <div className="flex justify-center gap-2.5 mt-8">
                    {Array.from({ length: totalPages }).map((_, index) => {
                        const isActive = currentPage === index

                        return (
                            <button
                                key={index}
                                onClick={() => goToSlide(index * activeItemsPerView)}
                                className={`transition-all duration-300 rounded-full cursor-pointer ${isActive
                                    ? 'bg-primary w-8 h-2.5 shadow-lg'
                                    : 'bg-gray-300 w-2.5 h-2.5 hover:bg-gray-400 hover:w-6'
                                    }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
