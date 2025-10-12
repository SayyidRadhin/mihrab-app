import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22rgba(255,255,255,0.1)%22 stroke-width=%222%22/%3E%3C/svg%23%3E')] opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10 py-4">
        <div className='flex gap-[10%] max-sm:flex-col ' >
        <div className="flex flex-row sm:flex-col justify-between items-center mb-6 max-sm:mb-10 px-4">
          <div className="text-2xl font-bold mb-4 md:mb-0">MEHRAB</div>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-3xl hover:bg-orange-600 transition duration-300">
            Join now
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 max-sm:text-lg m max-md:w-full justify-around  gap-8  text-sm max-sm:justify-center">
          {/* Academy Column */}
            <ul className="space-y-1 flex flex-col max-sm:items-center">
                            <h3 className="font-semibold mb-2">Academy</h3>

              <li><Link href="/courses">Courses</Link></li>
              <li><Link href="/tutors">Tutors</Link></li>
              <li><Link href="/pricing">Pricing</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>

          {/* Support Column */}
            <ul className="space-y-1 flex flex-col max-sm:items-center">
                            <h3 className="font-semibold mb-2">Support</h3>

              <li><Link href="/help">Help</Link></li>
              <li><Link href="/guides">Guides</Link></li>
              <li><Link href="/policies">Policies</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>

          {/* Resources Column */}
          {/* <div>
            <h3 className="font-semibold mb-2">Resources</h3>
            <ul className="space-y-1">
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/events">Events</Link></li>
              <li><Link href="/news">News</Link></li>
              <li><Link href="/webinars">Webinars</Link></li>
              <li><Link href="/library">Library</Link></li>
            </ul>
          </div> */}

          {/* Connect Column */}
            <ul className="space-y-1 flex flex-col max-sm:items-center">
                            <h3 className="font-semibold mb-2">Connect</h3>

              <li><Link href="/email">Email</Link></li>
              <li><Link href="/whatsapp">WhatsApp</Link></li>
              <li><Link href="/zoom">Zoom</Link></li>
              <li><Link href="/careers">Careers</Link></li>
              <li><Link href="/partners">Partners</Link></li>
            </ul>
        </div>
</div>
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400">
            All rights reserved © 2025 MEHRAB
          </p>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <Link href="/legal">Legal</Link>
            <Link href="/cookies">Cookies</Link>
            <Link href="/sitemap">Sitemap</Link>
          </div>
          <div className="flex space-x-4 mt-2 md:mt-0">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
    </footer>
  )
}