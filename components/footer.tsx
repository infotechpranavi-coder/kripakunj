import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Kripa Kunj</h3>
            <p className="text-sm opacity-90">
              Serving Beyond Humanity - Making a difference in the lives of underprivileged communities.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-80 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:opacity-80 transition">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/volunteer" className="hover:opacity-80 transition">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:opacity-80 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-sm opacity-90">
              <li>Email: help@kripakunjngo.org</li>
              <li>Phone: 1800-309-3337</li>
              <li>Address: Mumbai, India</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="hover:opacity-80 transition"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition"
                aria-label="Twitter"
              >
                𝕏
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition"
                aria-label="Instagram"
              >
                📷
              </a>
              <a
                href="#"
                className="hover:opacity-80 transition"
                aria-label="LinkedIn"
              >
                in
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2025 Kripa Kunj Charitable Trust. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:opacity-100 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:opacity-100 transition">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
