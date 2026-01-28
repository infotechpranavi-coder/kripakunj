'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  testimonial: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex >= testimonials.length - visibleItems ? 0 : prevIndex + 1
        );
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlay, testimonials.length, visibleItems]);

  const dots = testimonials.length - visibleItems + 1;

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - visibleItems : Math.max(0, prevIndex - 1)
    );
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - visibleItems ? 0 : prevIndex + 1
    );
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <div 
      className="relative w-full overflow-hidden group"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="flex transition-transform duration-500 ease-in-out" 
           style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}>
        {testimonials.map((testimonial, index) => (
          <div key={index} 
               style={{ width: `${100 / visibleItems}%` }}
               className="flex-shrink-0 px-4">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-700 ease-in-out transform hover:-translate-y-2 border border-gray-100 h-full flex flex-col relative">
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors duration-300">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                </svg>
              </div>

              {/* Rating stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              {/* Testimonial text */}
              <p className="text-foreground/80 leading-relaxed mb-6 grow italic line-clamp-4">
                "{testimonial.testimonial}"
              </p>

              {/* Author info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-sm text-foreground/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all opacity-0 group-hover:opacity-100 z-10 -translate-x-1/2 hover:scale-110"
        aria-label="Previous testimonial"
      >
        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-3 shadow-md transition-all opacity-0 group-hover:opacity-100 z-10 translate-x-1/2 hover:scale-110"
        aria-label="Next testimonial"
      >
        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="flex justify-center mt-8 gap-2">
        {Array.from({ length: dots }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to testimonial group ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}