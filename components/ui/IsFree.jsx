import React from 'react';

export default function IsFree() {
  return (
    <section id="pricing" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Is VibeShort <span className="text-[#B8F000]">Free?</span>
        </h2>

        {/* Simple Text without Box */}
        <div className="space-y-1 text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          <p>
            VibeShort can be downloaded and used without paying for every basic part of the service, but it is not a completely ad-free platform. Google Play lists ads and in-app purchases, while premium options can provide additional access.
          </p>
          <p>
            The exact content available without payment can differ between stories and account options.
          </p>
        </div>

      </div>
    </section>
  );
}