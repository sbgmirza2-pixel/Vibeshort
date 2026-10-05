import React from 'react';

export default function DownloadGuide() {
  const steps = [
    'Open a reputable APK source.',
    'Search for VibeShort: AI Dramas & Reels.',
    'Confirm the package name: com.vibeshort.visualnovel.android.',
    'Check the version and file size.',
    'Confirm that the file matches your Android device.',
    'Download the APK or XAPK.',
    'Scan the file before installation.',
    'Avoid files that use the VibeShort name but have a different package name without a clear reason.'
  ];

  return (
    <section id="download-guide" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          How to Download <span className="text-[#B8F000]">VibeShort APK</span>
        </h2>

        {/* Content Paragraphs & List */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            Check the file information before you press the download button. The current third-party listing reports version 2.27.0, Android 7.0+, and a package size of about 120.5 MB.
          </p>

          <div className="pt-2 text-left space-y-2 max-w-lg mx-auto">
            <ul className="list-decimal list-inside space-y-2 text-gray-300 text-sm sm:text-base">
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