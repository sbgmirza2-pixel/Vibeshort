import React from 'react';

export default function VibeShortVsReelShort() {
  return (
    <section id="vibeshort-vs-reelshort" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort <span className="text-[#B8F000]">vs ReelShort</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            VibeShort and ReelShort both target viewers who prefer short dramas, but their libraries are different.
          </p>
          <p>
            VibeShort places strong emphasis on AI-generated dramas, reels, and mini-series. ReelShort has its own short-drama catalog and payment model.
          </p>
          <p>
            The better option depends on the stories you like, episode availability, pricing in your region, and the way each platform handles free and paid content.
          </p>
          <p>
            For VibeShort, completion status is especially useful to check because some users have reported reaching the end of currently available episodes before a series was finished.
          </p>
        </div>

      </div>
    </section>
  );
}