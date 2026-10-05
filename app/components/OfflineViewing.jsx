import React from 'react';

export default function OfflineViewing() {
  return (
    <section id="offline-viewing" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Does VibeShort Support <span className="text-[#B8F000]">Offline Viewing?</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            Yes. VibeShort supports downloads for offline viewing.
          </p>
          <p>
            The useful part is that you can save episodes before you lose internet access. This can help during flights, road trips, or areas with weak mobile coverage.
          </p>
          <p>
            Offline support does not mean every app function works without an internet connection. Account features, fresh recommendations, new episodes, and some online services may still need a connection.
          </p>
        </div>

      </div>
    </section>
  );
}