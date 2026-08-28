import React from 'react';

export default function EpisodeLength() {
  return (
    <section id="episode-length" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          How Long Are <span className="text-[#B8F000]">VibeShort Episodes?</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            VibeShort is built around short episodes, but there is no single runtime for every chapter.
          </p>
          <p>
            The official Android listing promotes many episodes as around one to two minutes. Individual series can go beyond that range. Some VibeShort pages show episodes that last under a minute, while others run for several minutes.
          </p>
          <p>
            The total viewing time also depends on the number of episodes. A drama with 70 or 80 short chapters can still require several hours to complete.
          </p>
        </div>

      </div>
    </section>
  );
}