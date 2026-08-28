import React from 'react';

export default function WhatIsVibeShort() {
  return (
    <section id="about-app" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          What Is <span className="text-[#B8F000]">VibeShort?</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            VibeShort is an entertainment app built around short-form dramas, reels, and mini-series. Its main focus is AI-based storytelling, with short visual episodes that move through a larger story one chapter at a time.
          </p>
          <p>
            The catalog covers several popular themes, including romance, fantasy, revenge, billionaire stories, werewolf dramas, and other fictional genres. The format is aimed at phone users who want quick episodes without sitting through a traditional television-length show.
          </p>
          <p>
            One important detail is the difference between short episodes and short stories. An episode may last only one or two minutes, but a complete drama can contain dozens of episodes.
          </p>
        </div>

      </div>
    </section>
  );
}