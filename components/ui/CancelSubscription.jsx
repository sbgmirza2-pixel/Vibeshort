import React from 'react';

export default function CancelSubscription() {
  const steps = [
    'Open the VibeShort app.',
    'Navigate to Profile.',
    'Go to Settings.',
    'Select Manage Membership to handle your subscription.'
  ];

  return (
    <section id="cancel-subscription" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          How to Cancel a <span className="text-[#B8F000]">VibeShort Subscription</span>
        </h2>

        {/* Content Paragraphs & List */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            Subscription problems appear in recent user feedback, so this deserves a clear explanation.
          </p>
          <p>
            The developer has advised users to update the app and open Profile $\rightarrow$ Setting $\rightarrow$ Manage Membership to manage their membership.
          </p>

          <div className="pt-2 text-left space-y-2 max-w-lg mx-auto">
            <p className="text-white font-bold text-base md:text-lg uppercase tracking-wider text-center text-[#B8F000]">
              Follow these steps:
            </p>
            <ul className="list-decimal list-inside space-y-2 text-gray-300 text-sm sm:text-base">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>

          <p className="pt-2">
            Deleting VibeShort from your phone does not necessarily cancel a subscription. The cancellation method can also depend on where the purchase was made.
          </p>
          <p>
            After cancelling, keep the payment confirmation and check the membership status again.
          </p>
        </div>

      </div>
    </section>
  );
}