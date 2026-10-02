import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = 'https://vibeshortapk.com';

export const metadata = {
  metadataBase: new URL(SITE_URL), 
  title: {
    default: 'VibeShort MOD APK 2.28.1 (Premium Unlocked) Free Download',
    template: '%s | VibeShort',
  },
  description: 'VibeShort MOD APK brings short dramas and mini-series to Android. See the latest version, key features, safety details, and APK download info.',
  authors: [{ name: 'VibeShort Team', url: `${SITE_URL}/about` }],
  creator: 'VibeShort',
  publisher: 'VibeShort',
  alternates: {
    canonical: '/',
  },
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
    url: SITE_URL,
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
  const currentDate = new Date().toISOString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": `${SITE_URL}/`,
        "name": "VibeShort",
        "publisher": {
          "@id": `${SITE_URL}/#organization`
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": "VibeShort",
        "url": `${SITE_URL}/`,
        "logo": {
          "@type": "ImageObject",
          "@id": `${SITE_URL}/#logo`,
          "url": `${SITE_URL}/vibeshort-apk.webp`,
          "contentUrl": `${SITE_URL}/vibeshort-apk.webp`,
          "caption": "VibeShort Logo"
        },
        "sameAs": [
          "https://github.com/",
          "https://twitter.com/"
        ]
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#author`,
        "name": "VibeShort Team",
        "url": `${SITE_URL}/about`,
        "sameAs": [
          "https://twitter.com/"
        ]
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        "name": "VibeShort MOD APK",
        "operatingSystem": "ANDROID",
        "applicationCategory": "EntertainmentApplication",
        "softwareVersion": "2.28.1",
        "datePublished": "2026-01-01T00:00:00Z",
        "dateModified": currentDate,
        "author": {
          "@id": `${SITE_URL}/#author`
        },
        "offers": {
          "@type": "Offer",
          "@id": `${SITE_URL}/#offer`,
          "price": "0",
          "priceCurrency": "USD"
        }
      }
    ]
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Google Analytics Tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZPSXR6RZNC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-ZPSXR6RZNC');
          `}
        </Script>

        {/* Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <div className="sr-only" aria-hidden="true">
          <cite>VibeShort Official Android Documentation</cite>
          <blockquote>
            <q>Official distribution channels provide verified software packages for secure mobile integration.</q>
          </blockquote>
        </div>
        
        {children}
      </body>
    </html>
  );
}