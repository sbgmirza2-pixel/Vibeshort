'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function DownloadPage() {
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [canDownload, setCanDownload] = useState(false);

  // Countdown timer logic
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanDownload(true);
    }
  }, [timeLeft]);

  const handleDownloadClick = () => {
    // Optional: Add download analytics or click tracking here if needed
  };

  // Static App Details for this page
  const appName = 'VibeShort MOD APK';
  const version = '2.27.0';
  const androidReq = 'Android 7.0+';
  const fileSize = '120.5 MB';
  const packageName = 'com.vibeshort.visualnovel.android';
  const mainDownloadUrl = '/downloads/vibeshort-v2.27.0.apk';

  return (
    <div className="min-h-screen bg-[#0D0D12] text-white flex flex-col justify-between">
      <Navbar />

      <main className="py-16 px-6 flex-grow">
        <div className="max-w-4xl mx-auto space-y-12">
          
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Download <span className="text-[#B8F000]">{appName}</span>
            </h1>
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Download{' '}
              <Link href="/#home" className="text-[#B8F000] hover:underline transition-colors">
                VibeShort
              </Link>{' '}
              MOD APK safely with the latest file details, Android requirements, version info, and verified download links.
            </p>
          </div>

          {/* Cyber Timer Box with Pulsing Light Effect */}
          <div className="p-8 rounded-2xl bg-[#0D0D12] border border-[#B8F000]/30 shadow-2xl shadow-[#B8F000]/10 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#B8F000] to-transparent animate-pulse"></div>
            
            <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto">
              Wait for the countdown to finish. Your verified download buttons will appear below.
            </p>

            <div className="flex justify-center items-center gap-4 py-4">
              <div className="relative w-28 h-28 rounded-2xl bg-black border-2 border-[#B8F000] flex items-center justify-center shadow-[0_0_30px_rgba(184,240,0,0.3)] animate-pulse">
                <span className="text-4xl sm:text-5xl font-black text-[#B8F000] font-mono">
                  {timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
                <span className="absolute bottom-1 text-[10px] tracking-widest uppercase text-gray-400 font-bold">
                  Seconds
                </span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {canDownload ? (
                <a
                  href={mainDownloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownloadClick}
                  download
                  className="inline-block px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base tracking-wider uppercase bg-[#B8F000] text-[#0D0D12] hover:bg-[#a3d500] transition-all transform hover:scale-105 shadow-lg shadow-[#B8F000]/40 animate-bounce"
                >
                  Download Main APK ({fileSize})
                </a>
              ) : (
                <button
                  disabled
                  className="inline-block px-10 py-4 rounded-xl font-bold text-sm sm:text-base tracking-wider uppercase bg-white/10 text-gray-400 cursor-not-allowed border border-white/5"
                >
                  Generating Download Links...
                </button>
              )}
            </div>
          </div>

          {/* File Information Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              {appName} File Information
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0D0D12]">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[#B8F000]">
                    <th className="p-4 font-bold">Detail</th>
                    <th className="p-4 font-bold">Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  <tr>
                    <td className="p-4 font-medium text-white">App Name</td>
                    <td className="p-4">{appName}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Version</td>
                    <td className="p-4 font-semibold text-[#B8F000]">{version}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Android</td>
                    <td className="p-4">{androidReq}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">File Size</td>
                    <td className="p-4">{fileSize}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Package Name</td>
                    <td className="p-4 font-mono text-xs sm:text-sm text-gray-400">{packageName}</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">File Type</td>
                    <td className="p-4">APK / XAPK</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Before Installing Checklist Table */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Before Installing {appName}
            </h2>
            <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#0D0D12]">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-white/10 bg-white/5 text-[#B8F000]">
                    <th className="p-4 font-bold">Check</th>
                    <th className="p-4 font-bold">What to Do</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-gray-300">
                  <tr>
                    <td className="p-4 font-medium text-white">Android Version</td>
                    <td className="p-4">Ensure your device meets requirements ({androidReq})</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Storage Space</td>
                    <td className="p-4">Keep sufficient free storage for seamless setup</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Trusted Source</td>
                    <td className="p-4">Downloaded directly from official secure servers</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium text-white">Previous Versions</td>
                    <td className="p-4">Uninstall conflicting older builds if errors occur</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Install Steps */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0D0D12] border border-white/10 space-y-6">
            <h2 className="text-2xl font-bold text-white">
              How to Install {appName} on Android
            </h2>
            <ol className="space-y-3 list-decimal list-inside text-gray-300 text-sm sm:text-base leading-relaxed">
              <li className="pl-2">Wait for the countdown timer and tap the download link.</li>
              <li className="pl-2">Open your device&apos;s File Manager or Downloads folder.</li>
              <li className="pl-2">Tap on the downloaded APK file.</li>
              <li className="pl-2">Enable &quot;Install from Unknown Sources&quot; if prompted by your system settings.</li>
              <li className="pl-2">Tap Install and wait for completion.</li>
              <li className="pl-2">Launch the app and enjoy!</li>
            </ol>
          </div>

          {/* Back Home Link */}
          <div className="text-center pt-2">
            <Link
              href="/"
              className="inline-block px-8 py-3 rounded-full font-bold text-xs sm:text-sm tracking-wider uppercase border border-[#B8F000]/50 text-white hover:bg-[#B8F000] hover:text-[#0D0D12] transition-colors"
            >
              Back to Home
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}