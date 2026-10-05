import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import AppDetails from './components/AppDetails';
import Features from './components/Features';
import Premium from './components/Premium';
import IsSafe from './components/IsSafe';
import WhatIsVibeShort from './components/WhatIsVibeShort';
import HowItWorks from './components/HowItsWorks';
import Generes from './components/Generes';
import EpisodeLength from './components/EpisodeLength';
import CompleteStatus from './components/CompleteStatus';
import LockedEpisodes from './components/LockedEpisodes';
import Platforms from './components/Platforms';
import OfflineViewing from './components/OfflineViewing';
import Permissions from './components/Permissions';
import Privacy from './components/Privacy';
import CompareVersion from './components/CompareVersion';
import DownloadGuide from './components/DownloadGuide';
import InstallGuide from './components/InstallGuide';
import UpdateHistory from './components/UpdateHistory';
import CancelSubscription from './components/CancelSubscription';
import TroubleshootingAndTips from './components/TroubleshootingAndTips';
import VibeShortVsReelShort from './components/VibeShortVsReelShort';
import Faqs from './components/Faqs';
import FinalThoughts from './components/FinalThoughts';
import Footer from './components/Footer';
import AppScreenshots from './components/AppScreenshots';
import BackToHome from './components/BackToHome';

const SITE_URL = 'https://vibeshortapk.com';

export const metadata = {
  title: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
  description: 'VibeShort MOD APK brings short dramas and mini-series to Android. See the latest version, key features, safety details, and APK download info.',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
    description: 'VibeShort MOD APK brings short dramas and mini-series to Android. See the latest version, key features, safety details, and APK download info.',
    url: SITE_URL,
    siteName: 'VibeShort',
    images: [
      {
        url: `${SITE_URL}/vibeshort-apk.webp`,
        width: 800,
        height: 800,
        alt: 'VibeShort MOD APK Download',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
    description: 'VibeShort MOD APK brings short dramas and mini-series to Android.',
    images: [`${SITE_URL}/vibeshort-apk.webp`],
  },
};

export default function Home() {
  // Enhanced Content Schema (FAQ, HowTo, and BreadcrumbList added)
  const contentSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          }
        ]
      },
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
      {/* Injecting Content Schema (Breadcrumb, FAQ & HowTo) */}
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