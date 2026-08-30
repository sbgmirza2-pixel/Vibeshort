'use client';

import React from 'react';
import Image from 'next/image';

export default function AppScreenshots() {
  const screenshots = [
    { id: 1, src: '/pic1.webp', alt: 'VibeShort App Screenshot 1' },
    { id: 2, src: '/pic2.webp', alt: 'VibeShort App Screenshot 2' },
    { id: 3, src: '/pic3.webp', alt: 'VibeShort App Screenshot 3' },
    { id: 4, src: '/pic4.webp', alt: 'VibeShort App Screenshot 4' },
  ];

 return (
    <section className="py-12 bg-[#0D0D12] overflow-hidden relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          App <span className="text-[#B8F000]">Screenshots</span>
        </h2>
        <p className="text-gray-400 mt-2 text-base">
          Swipe through VibeShort interface on Android devices.
        </p>
      </div>

      {/* Horizontally Scrollable Container */}
      <div className="w-full overflow-x-auto no-scrollbar scroll-smooth px-4 sm:px-6">
        <div className="flex items-center gap-6 pb-4 w-max mx-auto md:mx-0">
          {screenshots.map((item) => (
            <div
              key={item.id}
              className="relative w-[280px] sm:w-[300px] h-[560px] sm:h-[600px] rounded-3xl overflow-hidden border-2 border-white/10 bg-black shadow-xl shadow-black/50 shrink-0 group transition-transform duration-300 hover:scale-[1.02]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 280px, 300px"
                className="object-cover group-hover:opacity-95 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}