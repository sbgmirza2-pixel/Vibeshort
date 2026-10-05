import DownloadClient from './DownloadClient';
const SITE_URL = 'https://vibeshortapk.com';
export const metadata = {
  title: 'Download VibeShort MOD APK 2.28.1',
  description: 'Download the VibeShort APK safely with the latest file details, Android requirements, version info, and a simple download process for your device.',
 alternates: {
    canonical: `${SITE_URL}/download`,
  },
};

export default function Page() {
  return <DownloadClient />;
}