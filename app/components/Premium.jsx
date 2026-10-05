import React from 'react';

export default function Premium() {
  return (
    <section id="premium" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort <span className="text-[#B8F000]">Coins, VIP and Premium Access</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            VibeShort is free to download, but it is not a completely free service.
          </p>
          <p>
            Google Play currently lists ads and in-app purchases for the app. User reviews also mention coins, VIP access, and paid subscriptions. Some later episodes may require payment or another form of access.
          </p>
          <p>
            This creates an important difference between free download and free access to every episode. Installing VibeShort does not automatically mean every drama and chapter is available at no cost.
          </p>
          <p>
            Prices can also vary by platform and region. Check the purchase screen inside the app before confirming a payment.
          </p>
        </div>

      </div>
    </section>
  );
}