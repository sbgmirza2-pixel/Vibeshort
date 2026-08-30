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

export const metadata = {
  title: 'VibeShort APK - Download AI Short Dramas & Reels for Android',
  description: 'VibeShort APK brings AI short dramas, reels and mini-series to Android. Check the latest version, features, download steps, safety, coins, offline viewing and more.',
  alternates: {
    canonical: '/vibeshort-apk',
  },
};
export default function Home() {
  return (
    <main className="min-h-screen bg-[#080A14] text-white">
      
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
      <Footer/>

      
      
    </main>
  );
}