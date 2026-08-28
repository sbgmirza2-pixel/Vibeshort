import React from 'react';

export default function CompareVersion() {
  return (
    <section id="comparison" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort APK <span className="text-[#B8F000]">vs Google Play</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            The Google Play version comes directly through the official Android store. Updates, app information, and data-safety details are available through the store listing.
          </p>
          <p>
            A third-party VibeShort APK can be useful in situations where the Play Store version is unavailable, but the file source becomes your responsibility. You need to verify the package before installation.
          </p>
          <p>
            There is also a technical difference with some current APK listings. VibeShort 2.27.0 is shown as an XAPK, not a basic single APK. An XAPK may contain additional application files, so it may need a compatible installer.
          </p>
        </div>

      </div>
    </section>
  );
}