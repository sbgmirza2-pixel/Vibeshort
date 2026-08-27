import React from 'react';

export default function Premium() {
  return (
    <section id="premium" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort <span className="text-[#B8F000]">Premium</span>
        </h2>

        {/* Simple Text without Box */}
        <div className="space-y-1 text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          <p>
            VibeShort offers paid options for users who want more from the platform. Premium access can provide additional benefits beyond the standard experience.
          </p>
          <p>
            Before choosing a subscription, check the price, billing period, included benefits, and cancellation terms shown inside the app. This is especially important because subscription offers can change.
          </p>
        </div>

      </div>
    </section>
  );
}