import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Kripa Kunj Charitable Trust - Serving Beyond Humanity',
  description: 'Making a difference through education, healthcare, and community support. Join us in our mission to serve beyond humanity.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/logo-removebg-preview.png',
        type: 'image/png',
      },
    ],
    apple: '/logo-removebg-preview.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`font-sans antialiased ${poppins.variable} overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
