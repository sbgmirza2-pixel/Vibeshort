import React from 'react';

export default function LockedEpisodes() {
  return (
    <section id="locked-episodes" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          What Happens When a VibeShort <span className="text-[#B8F000]">Episode Is Locked?</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            A locked episode can have several explanations.
          </p>
          <p>
            It may require coins or a membership. It may also be unavailable because the drama has not received that chapter yet. These are two different situations, but both can look similar to someone who simply wants to continue watching.
          </p>
          <p>
            Recent user feedback includes complaints about locked content, missing episodes, and paid access.
          </p>
          <p>
            Before purchasing coins or a subscription, check the episode list and see if the series is marked complete.
          </p>
        </div>

      </div>
    </section>
  );
}