import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('http://vibeshortapk.com/'), 
  title: {
    default: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
    template: '%s | VibeShort',
  },
  description: 'VibeShort MOD APK brings short dramas and mini-series to Android. See the latest version, key features, safety details, and APK download info.',
  
  authors: [{ name: 'VibeShort Team' }],
  creator: 'VibeShort',
  publisher: 'VibeShort',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://vibeshortapk.com/',
    siteName: 'VibeShort',
    title: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
  description: 'VibeShort MOD APK brings short dramas and mini-series to Android. See the latest version, key features, safety details, and APK download info.',
    images: [
      {
        url: '/vibeshort-apk.webp', 
        width: 800,
        height: 800,
        alt: 'VibeShort Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeShort — AI Dramas & Reels',
    description: 'Explore VibeShort AI-powered short dramas, game stories, and download the latest version APK safely.',
    images: ['/vibeshort-apk.webp'], 
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}