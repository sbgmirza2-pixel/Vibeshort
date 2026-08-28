import React from 'react';

export default function Privacy() {
  return (
    <section id="privacy" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort Privacy and <span className="text-[#B8F000]">Data Safety</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            The official Google Play data-safety information is more useful than a generic &ldquo;safe app&rdquo; statement.
          </p>
          <p>
            Google Play says VibeShort may share device or other IDs with third parties. It also states that the app may collect location, personal information, and other data. Google Play reports that data is encrypted in transit and that users can request deletion of their data.
          </p>
          <p>
            This does not automatically mean VibeShort is unsafe. It means users should understand the information associated with the app before creating an account or using paid features.
          </p>
          <p>
            A third-party APK adds another layer of risk because the file comes from a source outside the official store.
          </p>
        </div>

      </div>
    </section>
  );
}