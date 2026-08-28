import React from 'react';

export default function Genres() {
  const genresList = [
    {
      title: 'Romance Dramas',
      description: 'Romance is one of the main themes on VibeShort. Stories often revolve around relationships, hidden identities, family pressure, betrayal, and unexpected love.'
    },
    {
      title: 'Fantasy and Werewolf Stories',
      description: 'Fantasy titles bring supernatural characters, magical settings, and unusual conflicts into the short-drama format. Werewolf stories are also part of the platform\'s catalog.'
    },
    {
      title: 'Revenge Stories',
      description: 'Revenge dramas usually begin with betrayal, family conflict, or an unfair situation. The main character then gets a reason to return, fight back, or reveal the truth.'
    },
    {
      title: 'Billionaire and CEO Stories',
      description: 'These dramas often combine romance with wealth, family disputes, status, secrets, and unexpected relationships. They are a recurring theme in VibeShort\'s short-form catalog.'
    }
  ];

  return (
    <section id="genres" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort <span className="text-[#B8F000]">Drama Genres</span>
        </h2>

        {/* Intro Paragraph */}
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          VibeShort does not stick to one type of story. Its catalog covers several genres that are common across short-drama platforms.
        </p>

        {/* Genres List */}
        <div className="space-y-6 text-left max-w-2xl mx-auto pt-2">
          {genresList.map((item, index) => (
            <div key={index} className="space-y-1">
              <h3 className="text-white font-bold text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}