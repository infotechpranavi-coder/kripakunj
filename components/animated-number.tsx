'use client'

import { useEffect, useRef, useState } from 'react'

interface AnimatedNumberProps {
  value: string
  duration?: number
  className?: string
}

export function AnimatedNumber({
  value,
  duration = 2000,
  className = '',
}: AnimatedNumberProps) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    // Extract number from value (handles formats like "65K+", "1100+", etc.)
    const numStr = value.replace(/[^\d.]/g, '')
    const num = parseFloat(numStr)
    const hasK = value.includes('K')
    const hasCr = value.includes('Cr')
    const hasPlus = value.includes('+')

    if (isNaN(num)) {
      setCount(0)
      return
    }

    const target = hasK ? num * 1000 : hasCr ? num * 10000000 : num
    const increment = target / (duration / 16) // 60fps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(current)
      }
    }, 16)

    return () => clearInterval(timer)
  }, [isVisible, value, duration])

  const formatNumber = (num: number) => {
    if (value.includes('Cr')) {
      return `${(num / 10000000).toFixed(0)}Cr+`
    }
    if (value.includes('K')) {
      return `${(num / 1000).toFixed(0)}K+`
    }
    if (value.includes('+')) {
      return `${Math.floor(num)}+`
    }
    return Math.floor(num).toString()
  }

  return (
    <div ref={ref} className={className}>
      {formatNumber(count)}
    </div>
  )
}
