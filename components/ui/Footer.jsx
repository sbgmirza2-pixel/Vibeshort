import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#0A0A0E] text-gray-400 border-t border-white/10 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/10">
        
        {/* Brand Info */}
        <div className="space-y-4 md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B8F000] bg-black flex items-center justify-center shadow-md shadow-[#B8F000]/20">
              <Image
                src="/vibeshort-apk.webp" 
                alt="VibeShort Logo"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <span className="text-white font-extrabold text-lg tracking-wider">
              Vibe<span className="text-[#B8F000]">Short</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-gray-400">
            Discover short AI-driven dramas, vertical reels, and immersive storytelling tailored for your mobile phone experience.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h4 className="text-white font-bold text-sm uppercase tracking-wider text-[#B8F000]">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/#home" className="hover:text-[#B8F000] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-[#B8F000] transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <a href="/vibeshort-apk" className="hover:text-[#B8F000] transition-colors">
                Download APK
              </a>
            </li>
            <li>
              <span className="text-gray-500 text-xs block pt-1">Version 2.27.0</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <p>© {new Date().getFullYear()} VibeShort APK. All rights reserved.</p>
        <p className="text-gray-600">Built for mobile entertainment enthusiasts.</p>
      </div>
    </footer>
  );
}