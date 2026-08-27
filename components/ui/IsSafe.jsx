import React from 'react';

export default function IsSafe() {
  return (
    <section id="safety" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Is VibeShort <span className="text-[#B8F000]">APK Safe?</span>
        </h2>

        {/* Text with space-y-1 */}
        <div className="space-y-1 text-gray-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          <p>
            The safest option is the official VibeShort release from Google Play. If you use a third-party APK, check the package name, file size, version, permissions, and source before installation.
          </p>
          <p>
            You can also scan the APK with a trusted security tool or VirusTotal. Avoid files that show malware warnings, unusual permissions, or suspicious changes.
          </p>
        </div>

      </div>
    </section>
  );
}