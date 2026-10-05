import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
const SITE_URL = 'https://vibeshortapk.com';

export const metadata = {
  title: 'Privacy Policy',
  description: 'Read our Privacy Policy to understand how visitor information, cookies, analytics, advertising services, and third-party links may be handled.',
 alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow py-16 px-6">
        <div className="max-w-3xl mx-auto space-y-10">
          
          {/* Page Header */}
          <div className="space-y-4 border-b border-white/10 pb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Privacy <span className="text-[#B8F000]">Policy</span>
            </h2>
          </div>

          {/* Structured Content Container */}
          <div className="text-gray-300 space-y-6 leading-relaxed text-base sm:text-lg [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4">
            
            <p>
              Your privacy is important to us. This Privacy Policy explains how information may be collected and used when you visit and use this website.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We do not require visitors to provide personal information just to browse the website.
              <br /><br />
              Some basic information may be collected automatically when you visit, such as your browser type, device information, pages viewed, and general usage data.
              <br /><br />
              This information can help us understand how visitors use the website and improve our content.
            </p>

            <h2>Cookies</h2>
            <p>
              This website may use cookies to improve the browsing experience.
              <br /><br />
              Cookies are small files stored on your device by your web browser. They may help with website functions, preferences, analytics, and advertising.
              <br /><br />
              You can disable cookies through your browser settings if you prefer. Some parts of the website may not work as expected after cookies are disabled.
            </p>

            <h2>Advertising and Analytics</h2>
            <p>
              We may use third-party advertising or analytics services. These services can use cookies or similar technologies to collect information about website visits and usage.
              <br /><br />
              Third-party services have their own privacy policies and rules.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Some pages may contain links to external websites. We do not control these websites or their privacy practices.
              <br /><br />
              We recommend checking the privacy policy of any external website before using it.
            </p>

            <h2>Children's Privacy</h2>
            <p>
              We do not knowingly collect personal information from children.
              <br /><br />
              If you believe that a child has provided personal information through this website, please contact us so we can review the matter.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Any changes will be published on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us through our{' '}
              <Link href="/contact-us" className="text-[#B8F000] hover:underline font-medium">
                Contact Us
              </Link>{' '}
              page.
            </p>

          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}