import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          How Does <span className="text-[#B8F000]">VibeShort Work?</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            VibeShort divides dramas into short chapters. You select a title, open its episode list, and continue the story one episode at a time.
          </p>
          <p>
            The official listing describes many episodes as around one to two minutes long. Individual series can vary, though. Some VibeShort titles contain 30 episodes, while others have 75 or more. Episode lengths can also vary within the same series.
          </p>
          <p>
            This format keeps each viewing session short, but a complete series can still take much longer than its individual episodes suggest.
          </p>
        </div>

      </div>
    </section>
  );
}