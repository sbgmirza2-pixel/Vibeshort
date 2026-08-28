import React from 'react';

export default function FinalThoughts() {
  return (
    <section className="py-16 px-6 bg-[#0D0D12] text-white border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6">
        
        {/* Section Heading */}
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          Final <span className="text-[#B8F000]">Thoughts</span>
        </h2>

        {/* Content Card with Hover Effect */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/15 space-y-6 transition-all duration-300 hover:bg-white/10 hover:border-[#B8F000]/60 hover:shadow-xl hover:shadow-[#B8F000]/10">
          
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            <strong className="text-white">VibeShort</strong> has a clear focus: short AI-driven dramas that fit the way people watch content on a phone. Its quick episodes, vertical format, offline downloads, and wide range of genres make it different from traditional streaming apps.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            The free download does not mean every part of the service is free. Ads, coins, VIP access, subscriptions, and locked episodes are part of the current experience. Some dramas may also remain incomplete while new chapters are added.
          </p>

          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            Privacy deserves attention too. Google Play reports data collection and sharing details, while third-party APK files require an additional security check.
          </p>

          <div className="p-4 rounded-xl bg-black/40 border border-white/10 space-y-2">
            <h3 className="text-white font-bold text-base sm:text-lg text-[#B8F000]">
              Important APK Verification Details
            </h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              If you choose VibeShort APK instead of the official Play Store installation, verify the exact package, version, file format, and source first. The current third-party listing reports version <span className="text-white font-semibold">2.27.0</span> with package name <code className="text-[#B8F000] bg-black/60 px-2 py-0.5 rounded text-xs sm:text-sm">com.vibeshort.visualnovel.android</code> and Android 7.0+ support.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}