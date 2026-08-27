import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/ui/Herosection';
import AppDetails from '../components/ui/AppDetails';
import Features from '../components/ui/Features';
import Categories from '../components/ui/Categories';
import WatchReadModes from '../components/ui/WatchReadModes';
import IsFree from '../components/ui/IsFree';
import Premium from '../components/ui/Premium';
import IsSafe from '../components/ui/IsSafe';
export default function Home() {
  return (
    <main className="min-h-screen bg-[#080A14] text-white">
      
      <Navbar />

      
      <HeroSection />

  
      <AppDetails />
      <Features />
<Categories />
      <WatchReadModes />
      <IsFree />
      <Premium />
      <IsSafe />
      
    </main>
  );
}