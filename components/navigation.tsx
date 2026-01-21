'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Name */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <Image
              src="/logo.jpg"
              alt="Kripa Kunj Charitable Trust"
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="hidden sm:block">
              <div className="font-bold text-primary text-lg">Kripa Kunj</div>
              <div className="text-xs text-accent">Serving Beyond Humanity</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-foreground hover:text-primary font-medium transition"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground hover:text-primary font-medium transition"
            >
              About Us
            </Link>
            <Link
              href="/events"
              className="text-foreground hover:text-primary font-medium transition"
            >
              Events
            </Link>
            <Link
              href="/volunteer"
              className="text-foreground hover:text-primary font-medium transition"
            >
              Volunteer
            </Link>
            <Link
              href="/contact"
              className="text-foreground hover:text-primary font-medium transition"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-primary transition-transform ${
                isOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-primary transition-opacity ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-0.5 w-6 bg-primary transition-transform ${
                isOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/"
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              About Us
            </Link>
            <Link
              href="/events"
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Events
            </Link>
            <Link
              href="/volunteer"
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Volunteer
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Contact
            </Link>
            <Link
              href="/contact"
              className="block px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 text-center"
            >
              Donate
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
