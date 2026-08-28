import React from 'react';

export default function Platforms() {
  return (
    <section id="platforms" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort for <span className="text-[#B8F000]">Android and iOS</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            The Android app is available through Google Play under the package name <code className="text-[#B8F000] font-mono text-xs">com.vibeshort.visualnovel.android</code>. Third-party APK listings provide separate Android packages for users who need an APK installation route.
          </p>
          <p>
            VibeShort also has an iOS listing under the name VibeShort: AI Short Dramas. The available features and pricing can differ between platforms, so an Android APK should not be treated as identical to the iPhone version.
          </p>
        </div>

      </div>
    </section>
  );
}