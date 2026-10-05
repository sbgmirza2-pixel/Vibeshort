import React from 'react';

export default function UpdateHistory() {
  const versions = [
    { version: '2.27.0', date: 'Aug. 23, 2026', size: '120.5 MB' },
    { version: '2.26.0', date: 'Aug. 6, 2026', size: '120.5 MB' },
    { version: '2.25.0', date: 'Jul. 23, 2026', size: '110.5 MB' },
    { version: '2.24.1', date: 'Jul. 16, 2026', size: '100.4 MB' },
  ];

  return (
    <section id="update-history" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-6 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          VibeShort Latest Version and <span className="text-[#B8F000]">Update History</span>
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed text-left sm:text-center max-w-2xl mx-auto">
          <p>
            The latest third-party listing currently shows VibeShort 2.27.0, dated August 23, 2026. Its update notes mention bug fixes and improvements to the viewing experience.
          </p>
          <p className="text-white font-bold text-sm uppercase tracking-wider text-center text-[#B8F000] pt-2">
            Recent versions reported by the same listing include:
          </p>

          {/* Table */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[#B8F000] text-xs uppercase tracking-wider">
                  <th className="py-3 px-4 text-center">Version</th>
                  <th className="py-3 px-4 text-center">Reported Date</th>
                  <th className="py-3 px-4 text-center">Reported Size</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-gray-400 text-xs sm:text-sm">
                {versions.map((item, index) => (
                  <tr key={index} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 px-4 text-center font-mono text-white">{item.version}</td>
                    <td className="py-3 px-4 text-center">{item.date}</td>
                    <td className="py-3 px-4 text-center">{item.size}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="pt-4">
            File size can change between releases, so an older VibeShort APK should not be assumed to have the same storage requirements as the latest build.
          </p>
        </div>

      </div>
    </section>
  );
}