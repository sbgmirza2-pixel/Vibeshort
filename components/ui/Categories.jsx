import React from 'react';

export default function Categories() {
  return (
    <section id="categories" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort <span className="text-[#B8F000]">Drama Categories</span>
        </h2>

        {/* Adjusted width container to prevent single-word wrapping */}
        <div className="space-y-1 text-gray-300 text-sm sm:text-base leading-relaxed">
          <p>
            VibeShort covers several story styles for different tastes. Romance remains a major theme, while fantasy, revenge, dark romance, time travel, and billionaire stories add different types of plots.
          </p>
          <p>
            The short format also makes it easier to try a new category without committing to a long series.
          </p>
        </div>

      </div>
    </section>
  );
}