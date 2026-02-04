import Link from 'next/link'
import { TermsModal } from './TermsModal'
import { PrivacyPolicyModal } from './PrivacyPolicyModal'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-3">Kripa Kunj Charitable Trust</h3>
              <div className="h-1 w-12 bg-white/30 rounded-full mb-4"></div>
              <p className="text-sm opacity-90 leading-relaxed">
                Serving Beyond Humanity - Making a difference in the lives of underprivileged communities through education, healthcare, and sustainable development.
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mt-8">
              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs opacity-75">Phone</p>
                  <p className="text-sm font-medium">9819887551</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs opacity-75">Email</p>
                  <p className="text-sm font-medium">kripakunjcharitabletrust@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-1 w-5 h-5 flex-shrink-0">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs opacity-75">Address</p>
                  <p className="text-sm font-medium">Office No. 02, New Sagar Samrat Bldg, Cabin Cross Rd, Narmada Nagar, Bhayandar East, Mumbai - 401105</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-white/20">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link href="/events" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Events</span>
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Volunteer</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Us */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-white/20">Support Us</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/campaigns" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Donate Now</span>
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Volunteer</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="flex items-center gap-2 hover:text-white/80 transition-colors duration-300 group">
                  <span className="w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/80 transition-colors duration-300"></span>
                  <span>Partner with Us</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Mission */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-white/20">Our Mission</h4>
            <p className="text-sm opacity-90 leading-relaxed mb-6">
              To empower underprivileged communities by providing quality education, accessible healthcare, and sustainable livelihood opportunities. We believe in creating a world where every individual has the chance to thrive and contribute to a better society.
            </p>
          </div>


          {/* Newsletter & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-6 pb-2 border-b border-white/20">Connect With Us</h4>

            {/* Social Media */}
            <div className="mb-8">
              <h5 className="text-sm font-medium mb-4 opacity-90">Follow Us</h5>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://youtube.com/@kripakunjtrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                  aria-label="YouTube"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/kripakunjtrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/kripakunjtrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a
                  href="https://x.com/kripakunjtrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black hover:bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                  aria-label="X (Twitter)"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://www.linkedin.com/in/kripakunjtrust"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-3"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className="border-t border-white/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm opacity-80 mb-4 md:mb-0">
            &copy; 2025 Kripa Kunj Charitable Trust. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6 justify-center">
            <PrivacyPolicyModal />
            <TermsModal />

          </div>
        </div>
      </div>
    </footer>
  )
}
