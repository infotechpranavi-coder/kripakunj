'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { DonationModal } from '@/components/donation-modal'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const aboutOptions = [
    { name: 'About Us', href: '/about' },
    { name: 'Media Coverage', href: '/about/media' },
    { name: 'Team Members', href: '/about/team' },
    { name: 'Board Member', href: '/about/board' },
    { name: 'Gallery', href: '/about/gallery' },
    { name: 'Videos', href: '/about/videos' },
    { name: 'Press Release', href: '/about/press' },
    { name: 'Compliance', href: '/about/compliance' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Name */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition">
            <Image
              src="/logo.jpg"
              alt="Kripa Kunj Charitable Trust"
              width={70}
              height={70}
              className="rounded-full w-12 h-12 sm:w-[70px] sm:h-[70px]"
            />
            <div className="block">
              <div className="font-bold text-primary text-sm sm:text-lg">Kripa Kunj Charitable Trust</div>
              <div className="text-[10px] sm:text-xs text-accent">Serving Beyond Humanity</div>
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

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-foreground hover:text-primary font-medium transition cursor-pointer outline-none">
                About <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {aboutOptions.map((option) => (
                  <DropdownMenuItem key={option.name} asChild>
                    <Link href={option.href} className="w-full cursor-pointer">
                      {option.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/campaigns"
              className="text-foreground hover:text-primary font-medium transition"
            >
              Campaigns
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
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition cursor-pointer"
            >
              Donate
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5"
          >
            <span
              className={`h-0.5 w-6 bg-primary transition-transform ${isOpen ? 'rotate-45 translate-y-2' : ''
                }`}
            />
            <span
              className={`h-0.5 w-6 bg-primary transition-opacity ${isOpen ? 'opacity-0' : ''
                }`}
            />
            <span
              className={`h-0.5 w-6 bg-primary transition-transform ${isOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Home
            </Link>

            <div className="flex flex-col">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
              >
                About <ChevronDown className={`w-4 h-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div className="pl-6 flex flex-col gap-2 mt-1">
                  {aboutOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-2 text-foreground/80 hover:text-primary text-sm font-medium hover:bg-muted rounded"
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/campaigns"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Campaigns
            </Link>
            <Link
              href="/events"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Events
            </Link>
            <Link
              href="/volunteer"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Volunteer
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 text-foreground hover:text-primary font-medium hover:bg-muted rounded"
            >
              Contact
            </Link>
            <button
              onClick={() => {
                setIsOpen(false)
                setIsModalOpen(true)
              }}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded font-medium hover:opacity-90 text-center cursor-pointer"
            >
              Donate
            </button>
          </div>
        )}
      </div>

      <DonationModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        campaignTitle="General Donation"
      />
    </nav >
  )
}
