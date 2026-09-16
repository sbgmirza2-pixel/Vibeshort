import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Disclaimer',
  description: 'Read our Disclaimer to understand the limits of our app information, APK guides, third-party links, downloads, and other website content.',
};

export default function DisclaimerPage() {
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
              Dis<span className="text-[#B8F000]">claimer</span>
            </h2>
          </div>

          {/* Structured Content Container */}
          <div className="text-gray-300 space-y-6 leading-relaxed text-base sm:text-lg [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4">
            
            <p>
              The information provided on this website is for general informational purposes only.
              <br /><br />
              We try to provide useful and accurate information, but we do not guarantee that all content will always be complete, accurate, or up to date.
            </p>

            <h2>APK Downloads</h2>
            <p>
              We publish information and guides about Android applications and APK files.
              <br /><br />
              Before downloading or installing an APK file, users should check the source, file compatibility, and security of the file.
              <br /><br />
              Users are responsible for the files they download and install on their devices.
            </p>

            <h2>App Information</h2>
            <p>
              App versions, features, file sizes, requirements, and other details can change over time.
              <br /><br />
              Some information may become outdated after publication. We may update our articles when new information becomes available.
            </p>

            <h2>Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites and services.
              <br /><br />
              We do not control these websites and are not responsible for their content, availability, security, or privacy practices.
              <br /><br />
              Users should review the policies of third-party websites before using them.
            </p>

            <h2>No Guarantee</h2>
            <p>
              We do not guarantee that every app, APK file, link, or service mentioned on this website will work on every device.
              <br /><br />
              Users should make their own decisions before downloading or installing any application.
            </p>

            <h2>Content Changes</h2>
            <p>
              We may update, change, or remove website content at any time without prior notice.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you find incorrect information or have a concern about any content, please contact us through our{' '}
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