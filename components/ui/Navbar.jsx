'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#0D0D12]/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Left Side: Logo in a circle */}
        <div className="flex items-center">
          <Link href="/#home" className="flex items-center">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#B8F000] bg-black flex items-center justify-center shadow-md shadow-[#B8F000]/20">
              <Image
                src="/vibeshort-apk.webp" 
                alt="VibeShort Logo"
                fill
                sizes="(max-width: 768px) 48px, 48px"
                className="object-cover"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/#home" className="text-base font-medium text-gray-200 hover:text-[#B8F000] transition">
            Home
          </Link>
          <Link href="/#about" className="text-base font-medium text-gray-200 hover:text-[#B8F000] transition">
            About
          </Link>
          <Link href="/blog" className="text-base font-medium text-gray-200 hover:text-[#B8F000] transition">
            Blog
          </Link>
        </nav>

        {/* Right Side: Download Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/vibeshort-apk"
            className="hidden sm:inline-flex px-6 py-3 rounded-xl text-base font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition shadow-lg shadow-[#B8F000]/25"
          >
            Download APK
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#0D0D12] border-b border-white/10 px-6 py-4 space-y-3">
          <Link
            href="/#home"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-[#B8F000]"
          >
            Home
          </Link>
          <Link
            href="/#about"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-[#B8F000]"
          >
            About
          </Link>
          <Link
            href="/blog"
            onClick={() => setIsOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-[#B8F000]"
          >
            Blog
          </Link>
          <div className="pt-2">
            <Link
              href="/vibeshort-apk"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center px-4 py-3 rounded-xl text-base font-bold text-[#0D0D12] bg-[#B8F000]"
            >
              Download APK
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}