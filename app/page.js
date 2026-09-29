import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/ui/Herosection';
import AppDetails from '../components/ui/AppDetails';
import Features from '../components/ui/Features';
import Premium from '../components/ui/Premium'
import IsSafe from '../components/ui/IsSafe';
import WhatIsVibeShort from '../components/ui/WhatIsVibeShort';
import HowItWorks from '../components/ui/HowItsWorks';
import Generes from '../components/ui/Generes';
import EpisodeLength from '../components/ui/EpisodeLength';
import CompleteStatus from '../components/ui/CompleteStatus';
import LockedEpisodes from '../components/ui/LockedEpisodes';
import Platforms from '../components/ui/Platforms';
import OfflineViewing from '../components/ui/OfflineViewing';
import Permissions from '../components/ui/Permissions';
import Privacy from '../components/ui/Privacy';
import CompareVersion from '../components/ui/CompareVersion'
import DownloadGuide from '../components/ui/DownloadGuide';
import InstallGuide from '../components/ui/InstallGuide';
import UpdateHistory from '../components/ui/UpdateHistory';
import CancelSubscription from '../components/ui/CancelSubscription';
import TroubleshootingAndTips from '../components/ui/TroubleshootingAndTips';
import VibeShortVsReelShort from '../components/ui/VibeShortVsReelShort';
import Faqs from '../components/ui/Faqs';
import FinalThoughts from '../components/ui/FinalThoughts';
import Footer from '../components/ui/Footer';
import AppScreenshots from '../components/ui/AppScreenshots';
import BackToHome from '../components/ui/BackToHome'

export const metadata = {
  title: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
  description: 'VibeShort MOD APK brings short dramas and mini-series to Android. See the latest version, key features, safety details, and APK download info.',
  alternates: {
    canonical: '/vibeshort-apk',
  },
};

export default function Home() {
  // Content Schema for FAQs and HowTo (Download Guide) to fix SEO warnings
  const contentSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Is VibeShort MOD APK safe to download?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, VibeShort MOD APK is thoroughly tested and safe to install on Android devices."
            }
          },
          {
            "@type": "Question",
            "name": "What does VibeShort Premium Unlocked offer?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "It unlocks all premium short dramas, mini-series, and removes episode locks without any payment."
            }
          }
        ]
      },
      {
        "@type": "HowTo",
        "name": "How to Download and Install VibeShort MOD APK",
        "description": "Step-by-step guide to safely download and install the latest VibeShort MOD APK on your Android phone.",
        "step": [
          {
            "@type": "HowToStep",
            "name": "Download APK file",
            "text": "Click on the download button on the page to get the latest VibeShort APK file."
          },
          {
            "@type": "HowToStep",
            "name": "Enable Unknown Sources",
            "text": "Go to your Android settings and allow installation from unknown sources."
          },
          {
            "@type": "HowToStep",
            "name": "Install and Enjoy",
            "text": "Open the downloaded file, tap install, and enjoy premium unlocked dramas."
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#080A14] text-white">
      {/* Injecting Content Schema (FAQ & HowTo) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contentSchema) }}
      />
      
      <Navbar />
      <HeroSection />
      <AppDetails />
      <AppScreenshots />
      <WhatIsVibeShort />
      <HowItWorks />
      <Features />
      <Generes />
      <EpisodeLength />
      <CompleteStatus />
      <Premium />
      <LockedEpisodes />
      <OfflineViewing />
      <Platforms />
      <Permissions />
      <Privacy />
      <IsSafe />
      <CompareVersion />
      <DownloadGuide />
      <InstallGuide />
      <UpdateHistory />
      <CancelSubscription />
      <TroubleshootingAndTips />
      <VibeShortVsReelShort />
      <Faqs />
      <FinalThoughts />
      <BackToHome />
      <Footer />
    </main>
  );
}