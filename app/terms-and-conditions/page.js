import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const SITE_URL = 'https://vibeshortapk.com';
export const metadata = {
  title: 'Terms & Conditions',
  description: 'Read the Terms and Conditions for using our website, including content, APK information, external links, downloads, and user responsibilities.',
 alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
};

export default function TermsAndConditionsPage() {
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
              Terms & <span className="text-[#B8F000]">Conditions</span>
            </h2>
          </div>

          {/* Structured Content Container */}
          <div className="text-gray-300 space-y-6 leading-relaxed text-base sm:text-lg [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4">
            
            <p>
              By using this website, you agree to follow these Terms and Conditions. If you do not agree with these terms, please stop using the website.
            </p>

            <h2>Website Content</h2>
            <p>
              The content published on this website is provided for general informational purposes.
              <br /><br />
              We try to keep our information useful and accurate, but we cannot guarantee that every detail will always be complete, current, or error-free.
              <br /><br />
              Content may be changed, updated, or removed at any time.
            </p>

            <h2>APK Information</h2>
            <p>
              We provide information and guides related to Android apps and APK files.
              <br /><br />
              Before downloading or installing any APK file, users should check the source, compatibility, and security of the file.
              <br /><br />
              Users are responsible for the files they download and install on their devices.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites.
              <br /><br />
              These links may be provided for additional information or convenience. We do not control third-party websites and are not responsible for their content, availability, policies, or services.
            </p>

            <h2>User Responsibility</h2>
            <p>
              You agree to use this website for lawful purposes.
              <br /><br />
              You should not misuse the website, attempt to damage its services, or use its content for illegal activities.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              Original text, graphics, designs, and other content published on this website may be protected by applicable intellectual property laws.
              <br /><br />
              Do not copy or republish our original content without permission.
            </p>

            <h2>Changes to These Terms</h2>
            <p>
              We may update these Terms and Conditions when necessary. Any changes will appear on this page.
            </p>

            <h2>Contact</h2>
            <p>
              If you have questions about these Terms and Conditions, please contact us through our{' '}
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