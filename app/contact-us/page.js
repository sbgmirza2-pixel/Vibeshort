import React from 'react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Contact Us',
  description: 'Have a question, suggestion, or concern? Get in touch with us about our content, app information, corrections, or other website-related matters.',
 alternates: {
    canonical: `${SITE_URL}/contact-us`,
  },
};

export default function ContactUsPage() {
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
              Contact <span className="text-[#B8F000]">Us</span>
            </h2>
          </div>

          {/* Structured Content Container */}
          <div className="text-gray-300 space-y-6 leading-relaxed text-base sm:text-lg [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-8 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2">
            
            <p>
              Have a question, suggestion, or concern? We would be happy to hear from you.
              <br /><br />
              You can contact us if you notice incorrect information, want to suggest a new topic, or have any other question about our website.
            </p>

            <h2>You Can Contact Us About</h2>
            <ul>
              <li>Incorrect or outdated information</li>
              <li>Content suggestions</li>
              <li>App-related questions</li>
              <li>Broken or incorrect links</li>
              <li>Copyright concerns</li>
              <li>General feedback</li>
            </ul>

            <h2>How to Contact Us</h2>
            <p>
              You can send your message through the contact method provided on our website.
              <br /><br />
              Please include the page name and explain your concern clearly. This helps us understand the issue and respond more easily.
              <br /><br />
              We review messages and try to reply as soon as possible.
              <br /><br />
              Thank you for helping us improve the website.
            </p>

          </div>

        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
}