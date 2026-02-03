'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { AnimatedSection } from './animated-section'

interface Initiative {
    name: string
    focus: string
    description: string
    image: string
}

interface InitiativesCarouselProps {
    initiatives: Initiative[]
    autoPlay?: boolean
    interval?: number
}

export function InitiativesCarousel({
    initiatives,
    autoPlay = true,
    interval = 5000,
}: InitiativesCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(autoPlay)

    useEffect(() => {
        if (!isAutoPlay || initiatives.length <= 1) return

        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % initiatives.length)
        }, interval)

        return () => clearInterval(timer)
    }, [isAutoPlay, initiatives.length, interval])

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + initiatives.length) % initiatives.length)
        setIsAutoPlay(false)
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % initiatives.length)
        setIsAutoPlay(false)
    }

    const goToSlide = (index: number) => {
        setCurrentIndex(index)
        setIsAutoPlay(false)
    }

    if (initiatives.length === 0) return null

    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsAutoPlay(false)}
            onMouseLeave={() => setIsAutoPlay(autoPlay)}
        >
            <div className="overflow-hidden rounded-2xl">
                <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {initiatives.map((initiative, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 h-full flex flex-col md:flex-row relative group/card">
                                <div className="relative w-full md:w-1/2 h-64 md:h-96 overflow-hidden">
                                    <img
                                        src={initiative.image}
                                        alt={initiative.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:bg-gradient-to-r" />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center w-full md:w-1/2 bg-white">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-8 h-1 bg-primary rounded-full" />
                                        <span className="text-primary font-bold uppercase tracking-wider text-sm">{initiative.focus}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-4xl font-bold text-foreground mb-6 transition-colors duration-300 group-hover/card:text-primary">
                                        {initiative.name}
                                    </h3>
                                    <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                                        {initiative.description}
                                    </p>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary group-hover/card:bg-primary group-hover/card:text-white transition-all duration-300">
                                            <ChevronRight className="w-6 h-6" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            {initiatives.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-xl rounded-full p-4 hover:bg-primary hover:text-white transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm shadow-xl rounded-full p-4 hover:bg-primary hover:text-white transition-all duration-300 z-10 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicators */}
                    <div className="flex justify-center gap-3 mt-8">
                        {initiatives.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-500 rounded-full ${index === currentIndex
                                        ? 'bg-primary w-10 h-2'
                                        : 'bg-gray-300 w-2 h-2 hover:bg-gray-400'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}
