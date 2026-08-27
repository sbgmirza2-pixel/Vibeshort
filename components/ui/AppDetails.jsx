import React from 'react';

export default function AppDetails() {
  const details = [
    { label: 'App Name', value: 'VibeShort' },
    { label: 'Package Name', value: 'com.vibeshort.visualnovel.android' },
    { label: 'Developer', value: 'AGILE QUADRANT MEDIA LIMITED' },
    { label: 'Category', value: 'Entertainment' },
    { label: 'Content Rating', value: 'Mature 17+' },
    { label: 'Downloads', value: '5M+' },
    { label: 'Ads', value: 'Yes' },
    { label: 'In-App Purchases', value: 'Yes' },
    { label: 'Platform', value: 'Android' },
  ];

  return (
    <section id="about" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Section Heading */}
        <div className="text-center space-y-3">
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            VibeShort <span className="text-[#B8F000]">App Details</span>
          </h2>
          <p className="text-sm lg:text-base text-gray-400 max-w-xl mx-auto">
            Quick overview of technical specifications, publisher information, and store metadata.
          </p>
        </div>

        {/* Connected Grid Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 -space-y-[1px] sm:-space-y-0 sm:-space-x-[1px]">
          {details.map((item, index) => (
            <div
              key={index}
              className="p-5 bg-white/[0.02] border border-white/10 hover:border-[#B8F000]/60 hover:shadow-[0_0_15px_rgba(184,240,0,0.15)] hover:z-20 transition-all duration-300 flex flex-col justify-between"
            >
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-1">
                {item.label}
              </span>
              <span className="text-sm lg:text-base font-medium text-white break-all">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}