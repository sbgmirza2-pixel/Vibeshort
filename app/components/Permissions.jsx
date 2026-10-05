import React from 'react';

export default function Permissions() {
  return (
    <section id="permissions" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort APK <span className="text-[#B8F000]">Permissions Explained</span>
        </h2>

        {/* Content Paragraphs & List */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            Permissions deserve attention when you install an APK outside Google Play.
          </p>
          <p>
            The exact permission list can change between releases, so check the Android permission screen after installation instead of relying on an old APK listing.
          </p>
          
          <div className="pt-2 text-left space-y-2 max-w-lg mx-auto">
            <p className="text-white font-bold text-base md:text-lg uppercase tracking-wider text-center text-[#B8F000]">
              Pay particular attention to permissions related to:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-300 text-sm sm:text-base">
              <li>Storage or media access</li>
              <li>Notifications</li>
              <li>Network access</li>
              <li>Device information</li>
              <li>Location, if requested</li>
              <li>Other permissions that do not appear necessary for video playback</li>
            </ul>
          </div>

          <p className="pt-2">
            A permission should have a reasonable connection to the app&apos;s function. If a modified APK requests unusual access that the official version does not need, treat it as a warning sign.
          </p>
        </div>

      </div>
    </section>
  );
}