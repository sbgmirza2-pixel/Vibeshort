import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const SITE_URL = 'https://vibeshortapk.com';

export const metadata = {
  title: 'About Us',
  description: 'Learn more about our website, the app information we provide, and how we help Android users find useful guides and download details.',
 alternates: {
    canonical: `${SITE_URL}/about-us`,
  },
};

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Page Header */}
          <div className="space-y-2 border-b border-white/10 pb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              About <span className="text-[#B8F000]">Us</span>
            </h2>
          </div>

          {/* Structured Content Container */}
          <div className="text-gray-300 space-y-6 leading-relaxed text-base sm:text-lg [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4">
            
            <p>
              Welcome to our website, where we share simple and useful information about Android apps and APK files.
              <br /><br />
              Our main goal is to help Android users find clear details about different apps without making things complicated. We cover app features, download information, installation guides, updates, and other useful details.
            </p>

            <h2>What We Provide</h2>
            <p>
              We publish easy-to-follow guides about Android apps and APK files. Our content may include app details, features, supported devices, download steps, installation instructions, and basic tips.
              <br /><br />
              We try to keep every article simple so users can quickly find the information they need.
            </p>

            <h2>Our Goal</h2>
            <p>
              Our goal is to provide useful and easy-to-understand content for Android users. We also try to keep our information updated when app details or features change.
              <br /><br />
              If you find incorrect information or have a suggestion, you can contact us through our{' '}
              <Link href="/contact-us" className="text-[#B8F000] hover:underline font-medium">
                Contact Us
              </Link>{' '}
              page.
              <br /><br />
              Thank you for visiting and supporting our website.
            </p>

          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}