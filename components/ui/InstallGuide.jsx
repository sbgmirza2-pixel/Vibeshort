import React from 'react';

export default function InstallGuide() {
  const steps = [
    'Download the VibeShort APK or XAPK.',
    'Open the downloaded file.',
    'If Android blocks the installation, review the permission for installing apps from that source.',
    'For an XAPK, use a compatible installer.',
    'Complete the installation.',
    'Open VibeShort and check that the app starts normally.',
    'If Android reports a package conflict, remove an incompatible copy first. Keep a backup of important app data before replacing an existing installation.'
  ];

  return (
    <section id="install-guide" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          How to Install VibeShort <span className="text-[#B8F000]">APK on Android</span>
        </h2>

        {/* Content Paragraphs & List */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            A standard APK can usually be installed directly through the downloaded file. XAPK packages need an installer that supports the format.
          </p>

          <div className="pt-2 text-left space-y-2 max-w-lg mx-auto">
            <ul className="list-decimal list-inside space-y-2 text-gray-400 text-xs sm:text-sm">
              {steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        </div>

      </div>
    </section>
  );
}