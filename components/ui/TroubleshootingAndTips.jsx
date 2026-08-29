import React from 'react';

export default function TroubleshootingAndTips() {
  const problems = [
    {
      title: 'VibeShort APK Will Not Install',
      description: 'Check your Android version first. The current third-party listing requires Android 7.0 or newer. If the downloaded file is XAPK, use an installer that supports that format.'
    },
    {
      title: 'VibeShort Keeps Crashing',
      description: 'Restart the phone and clear the app cache. Check your available storage and make sure the installed version matches your Android version. If the crashes began after an update, check for a newer release.'
    },
    {
      title: 'VibeShort Episodes Do Not Load',
      description: 'Test your internet connection first. Try another network if possible. If other episodes work but one title does not, the issue may be limited to that particular series.'
    },
    {
      title: 'VibeShort Shows a Missing Episode',
      description: 'Check the drama\'s episode list and completion status. Some shows are still receiving new chapters, so the next episode may simply not be available yet.'
    },
    {
      title: 'VibeShort Coins Are Missing',
      description: 'Confirm that you are signed into the account used for the purchase. Restart the app and check the balance again. Keep the payment receipt if the coins still do not appear. Recent user reviews include reports of coin-purchase problems.'
    },
    {
      title: 'VibeShort Subscription Will Not Cancel',
      description: 'Update the app and open Profile $\rightarrow$ Setting $\rightarrow$ Manage Membership. If the membership still appears active, check the platform used for payment and contact the developer with your purchase details.'
    }
  ];

  const tips = [
    'Check the episode count before starting a series.',
    'Look for the completed status if you want a finished story.',
    'Download episodes over Wi-Fi before travelling.',
    'Keep enough free storage for downloaded content.',
    'Check coin and membership prices before paying.',
    'Save receipts for paid purchases.',
    'Scan third-party APK files before installation.',
    'Keep the app updated when playback problems appear.'
  ];

  return (
    <section id="troubleshooting-tips" className="py-16 px-6 bg-[#0D0D12] border-t border-white/10">
      <div className="max-w-3xl mx-auto space-y-8 text-center">
        
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
          Common VibeShort <span className="text-[#B8F000]">Problems and Solutions</span>
        </h2>

        {/* Problems List */}
        <div className="space-y-6 text-left max-w-2xl mx-auto">
          {problems.map((item, index) => (
            <div key={index} className="space-y-1">
              <h3 className="text-white font-bold text-base sm:text-lg">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="space-y-4 pt-6 border-t border-white/10 max-w-2xl mx-auto text-left">
          <h3 className="text-xl font-extrabold tracking-tight text-white text-center">
            Tips for <span className="text-[#B8F000]">VibeShort Users</span>
          </h3>
          <p className="text-gray-300 text-sm sm:text-base text-center leading-relaxed">
            A few checks can save time before you start a new drama.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-300 text-sm sm:text-base pt-2">
            {tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}