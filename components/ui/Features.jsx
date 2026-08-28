import React from 'react';

export default function Features() {
  const featuresList = [
    {
      title: 'AI Short Dramas',
      description: 'AI-generated storytelling sits at the center of VibeShort. The app uses short visual stories with fictional characters, dialogue, conflicts, and quick plot twists. This gives the platform a different identity from regular video apps that mainly depend on traditional television or movie content.'
    },
    {
      title: 'Short Episode Format',
      description: 'VibeShort breaks its stories into small episodes. Many chapters take only a minute or two, which suits quick viewing sessions. You can watch a few episodes during a short break without committing to a full-length program.'
    },
    {
      title: 'Multiple Drama Genres',
      description: 'The library covers a broad selection of genres. Romance, revenge, billionaire, fantasy, and werewolf stories appear among the main themes promoted by VibeShort. Other titles add comedy, action, family conflict, suspense, and supernatural plots.'
    },
    {
      title: 'Vertical Mobile Viewing',
      description: 'VibeShort uses a vertical format that fits the phone screen. You do not need to rotate your device for the main viewing experience. The layout also feels familiar to people who already watch reels and other short-form videos on mobile.'
    },
    {
      title: 'Offline Viewing',
      description: 'VibeShort supports episode downloads for offline viewing. This is useful during travel or in places with weak internet access. Download the episodes you need while connected to a stable network, then check the download list before going offline.'
    },
    {
      title: 'Updated Drama Library',
      description: 'The VibeShort catalog changes as new stories and episodes arrive. Recent releases have also included bug fixes and playback improvements. The current third-party listing reports version 2.27.0 as the latest release, dated August 23, 2026.'
    }
  ];

  return (
    <section id="features" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Main Features of <span className="text-[#B8F000]">VibeShort</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-400 max-w-xl mx-auto">
            Discover what makes VibeShort the ultimate platform for AI-powered short drama entertainment.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresList.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#B8F000]/60 hover:shadow-[0_0_20px_rgba(184,240,0,0.15)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                {/* Number Badge & Icon indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#B8F000] tracking-widest uppercase">
                    0{index + 1}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#B8F000]/40 group-hover:bg-[#B8F000] group-hover:shadow-[0_0_8px_#B8F000] transition-all duration-300"></div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-[#B8F000] transition-colors duration-300">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}