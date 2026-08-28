import React from 'react';
import Navbar from '@/components/ui/Navbar';

export default function FaqsPage() {
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

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white">
      <Navbar />

      <main className="py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Page Heading */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Frequently Asked <span className="text-[#B8F000]">Questions</span>
            </h1>
            <p className="text-gray-400 text-sm sm:text-base">
              Everything you need to know about VibeShort, APK installations, and subscriptions.
            </p>
          </div>

          {/* All FAQs List with Hover Effect */}
          <div className="space-y-4 text-left">
            {allFaqs.map((faq, index) => (
              <div 
                key={index} 
                className="p-5 rounded-xl bg-white/5 border border-white/15 space-y-2 transition-all duration-300 hover:bg-white/10 hover:border-[#B8F000]/60 hover:shadow-lg hover:shadow-[#B8F000]/10"
              >
                <h2 className="text-white font-bold text-base sm:text-lg">
                  {faq.q}
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
}