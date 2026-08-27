import React from 'react';

export default function Features() {
  const featuresList = [
    {
      title: 'Short Drama Episodes',
      description: 'VibeShort keeps its stories short, with episodes designed for quick viewing. Instead of sitting through a long program, you can finish an episode in a few minutes and continue the story later. This format works well when you want entertainment during a break, commute, or spare moment.'
    },
    {
      title: 'Comic-Style Visuals',
      description: 'Stories use a comic-inspired visual style that gives scenes a distinct look. Characters, dialogue, backgrounds, and story moments appear in a format that feels different from regular streaming shows. The visual approach also helps keep each episode easy to follow, especially when the story moves through several short chapters.'
    },
    {
      title: 'Watch & Read Mode',
      description: 'VibeShort gives you two ways to follow selected stories. Watch Mode focuses on the visual episode experience, while Read Mode presents the story in a reading format. Having both options lets you choose the style that feels more comfortable without leaving the same story.'
    },
    {
      title: 'Multiple Drama Genres',
      description: 'The library covers several themes, including romance, fantasy, revenge, dark romance, time travel, and billionaire stories. This range gives you more choices when one type of drama does not match your mood. You can move between different story themes instead of staying with one category.'
    },
    {
      title: 'Daily New Episodes',
      description: 'New story content gives regular users more reasons to return to the app. Fresh episodes can add another chapter to an ongoing series or introduce a different story. If you enjoy short dramas, a steady flow of new content can make the library feel less repetitive over time.'
    },
    {
      title: 'Offline Viewing',
      description: 'Selected content can support offline access, which helps when you do not want to rely on a constant internet connection. You can prepare episodes in advance and watch them later. This can be useful during travel, weak network coverage, or times when mobile data is limited.'
    }
  ];

  return (
    <section id="features" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            VibeShort <span className="text-[#B8F000]">Features</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-400 max-w-xl mx-auto">
            Discover what makes VibeShort the ultimate platform for short-form drama entertainment.
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