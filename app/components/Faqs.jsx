'use client'

import React from 'react';
import Link from 'next/link';

export default function FAQs() {
  const allFaqs = [
    {
      q: 'What is VibeShort APK?',
      a: 'VibeShort APK is the Android installation package for VibeShort: AI Dramas & Reels. Third-party APK versions can be installed outside Google Play after the file is verified.'
    },
    {
      q: 'Is VibeShort free?',
      a: 'VibeShort is free to download, but it contains ads and in-app purchases. Some episodes or features may require coins or a paid membership.'
    },
    {
      q: 'Is VibeShort APK safe?',
      a: 'Safety depends on the exact APK and its source. Check the package name, version, file size, hash when available, and scan the file before installation.'
    },
    {
      q: 'What Android version does VibeShort require?',
      a: 'The current third-party VibeShort listing reports Android 7.0 or newer.'
    },
    {
      q: 'Does VibeShort work offline?',
      a: 'Yes. VibeShort supports episode downloads for offline viewing. Some online functions still need an internet connection.'
    },
    {
      q: 'Does VibeShort have ads?',
      a: 'Yes. Google Play currently lists VibeShort as containing ads and in-app purchases.'
    },
    {
      q: 'Why are some VibeShort episodes locked?',
      a: 'An episode may require coins or membership, or it may not have been released yet. Check the series status before assuming there is a technical problem.'
    }
  ];

  // Homepage par sirf pehle 3 FAQs show honge
  const displayedFaqs = allFaqs.slice(0, 3);

  return (
    <section id="faqs" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Frequently Asked <span className="text-[#B8F000]">Questions</span>
        </h2>

        {/* FAQ List */}
        <div className="space-y-4 text-left max-w-2xl mx-auto">
          {displayedFaqs.map((faq, index) => (
            <div 
              key={index} 
              className="p-4 rounded-xl bg-white/5 border border-white/15 space-y-1 transition-all duration-300 hover:bg-white/10 hover:border-[#B8F000]/60 hover:shadow-lg hover:shadow-[#B8F000]/10"
            >
              <h3 className="text-white font-bold text-base sm:text-lg">
                {faq.q}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* View All Button - Redirects to a dedicated FAQs page using Next.js Link */}
        <div>
          <Link
            href="/faqs"
            className="inline-block px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase bg-[#B8F000] text-[#0D0D12] hover:bg-[#a3d500] transition-colors"
          >
            View All FAQs
          </Link>
        </div>

      </div>
    </section>
  );
}