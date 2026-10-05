import React from 'react';

export default function CompleteStatus() {
  return (
    <section id="complete-status" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Are VibeShort <span className="text-[#B8F000]">Dramas Complete?</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            Not every series should be assumed to be complete.
          </p>
          <p>
            Some VibeShort titles are marked as completed, while others continue to receive new episodes. User reviews also mention cases where viewers reached an episode and found that the next chapter was not yet available. The developer has responded to some of these complaints by explaining that certain shows were still being updated.
          </p>
          <p>
            If you want a finished story, check the episode list and completion status before you start. This simple check can save you from reaching the end of the available chapters and assuming the app has stopped working.
          </p>
        </div>

      </div>
    </section>
  );
}