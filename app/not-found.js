'use client';

import React from 'react';
import Link from 'next/link';
import { Home, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-screen bg-[#0D0D12] flex items-center justify-center px-4 sm:px-6 relative overflow-hidden z-10">
      {/* Background Glow Effect */}
      <div className="absolute w-96 h-96 bg-[#B8F000]/10 rounded-full blur-3xl pointer-events-none -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none -bottom-20 -right-20"></div>

      <div className="max-w-md w-full bg-black/40 border-2 border-white/10 rounded-3xl p-8 sm:p-10 text-center shadow-2xl shadow-black/80 backdrop-blur-xl relative z-20">
        
        {/* Icon / Badge */}
        <div className="w-16 h-16 bg-[#B8F000]/10 border border-[#B8F000]/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-[#B8F000]">
          <AlertTriangle className="w-8 h-8" />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl sm:text-7xl font-extrabold text-white tracking-tight mb-2">
          4<span className="text-[#B8F000]">0</span>4
        </h1>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-sm sm:text-base mb-8 leading-relaxed">
          Oops! It looks like you followed a broken link or entered a URL that doesn&apos;t exist on this site.
        </p>

        {/* Action Button */}
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 rounded-xl bg-[#B8F000] text-black font-semibold text-base transition-all duration-300 hover:bg-[#a3d800] hover:scale-[1.02] shadow-lg shadow-[#B8F000]/20"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </section>
  );
}