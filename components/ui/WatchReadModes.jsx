import React from 'react';

export default function WatchReadModes() {
  return (
    <section id="modes" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-12 text-center">
        
        {/* Section Heading & Intro Text */}
        <div className="space-y-1 max-w-2xl mx-auto">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Watch Mode vs <span className="text-[#B8F000]">Read Mode</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            The two modes give VibeShort a different feel from a standard short-video platform. Watch Mode puts more attention on the visual presentation, while Read Mode suits users who prefer to follow dialogue and story details at their own pace.
          </p>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            You can use whichever option feels more natural for a particular story.
          </p>
        </div>

        {/* Watch Mode & Read Mode Centered */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-4 text-center">
          
          {/* Watch Mode */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2 max-w-xs mx-auto">
              Watch Mode
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>Visual episode format</li>
              <li>Comic-style scenes</li>
              <li>Quick viewing</li>
              <li>Good for casual watching</li>
            </ul>
          </div>

          {/* Read Mode */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white border-b border-white/10 pb-2 max-w-xs mx-auto">
              Read Mode
            </h3>
            <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
              <li>Reading-focused format</li>
              <li>Story and dialogue</li>
              <li>Slower reading pace</li>
              <li>Good for following details</li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}