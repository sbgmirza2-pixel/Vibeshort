import React from 'react';

export default function IsSafe() {
  return (
    <section id="safety" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Is VibeShort <span className="text-[#B8F000]">APK Safe?</span>
        </h2>

        {/* Text with space-y-4 for readability and NO box */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            There is no good reason to label every VibeShort APK as either completely safe or completely unsafe.
          </p>
          <p>
            The official Google Play version has a known developer, package name, store listing, and published data-safety information. A third-party APK needs its own verification.
          </p>
          <p>
            The current APKPure listing identifies the package as <code className="text-[#B8F000] font-mono text-xs">com.vibeshort.visualnovel.android</code> and reports version 2.27.0. It also provides a SHA-256 value for file verification and recommends scanning the file with a service such as VirusTotal.
          </p>
          
          <div className="pt-2 text-left space-y-2 max-w-lg mx-auto">
            <p className="text-white font-bold text-sm uppercase tracking-wider text-center text-[#B8F000]">
              Before installing VibeShort APK:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-400 text-xs sm:text-sm">
              <li>Confirm the package name.</li>
              <li>Check the version number.</li>
              <li>Compare the reported file size.</li>
              <li>Scan the file with a trusted security tool.</li>
              <li>Use VirusTotal when appropriate.</li>
              <li>Check the file hash if a reliable reference is available.</li>
              <li>Be more cautious with modified or “premium unlocked” builds.</li>
            </ul>
          </div>

          <p className="pt-2 text-gray-300 text-sm sm:text-base text-center">
            Do not assume a MOD APK has the same security profile as the official release.
          </p>
        </div>

      </div>
    </section>
  );
}