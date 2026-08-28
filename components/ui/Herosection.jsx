'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const [isShareOpen, setIsShareOpen] = useState(false);

  const appName = "VibeShort";
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = encodeURIComponent(`Check out ${appName} APK - amazing short dramas and stories!`);
  const shareUrl = encodeURIComponent(currentUrl);

  return (
    <section id="home" className="relative overflow-hidden py-12 px-6 lg:py-20 bg-[#0D0D12]">
      <div className="max-w-4xl mx-auto space-y-5 text-center flex flex-col items-center">

        {/* Main Title */}
        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-white">
          VibeShort <span className="text-[#B8F000]">APK</span>
        </h1>

        {/* Updated Description */}
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          VibeShort APK brings short dramas and reels to a mobile-first format. The app focuses on AI-generated stories, quick episodes, and mini-series that suit viewers who prefer short sessions instead of long TV episodes. Romance, fantasy, revenge, billionaire, werewolf, comedy, and other drama themes are part of its growing library. Many episodes take only a few minutes to finish, so it is easy to watch a few chapters during a break. The official Android listing also shows a large audience, with more than 10 million downloads and over 300,000 reviews.
        </p>

        {/* Buttons & Rating Container (Stacked: Download on top, Rating/Share below) */}
        <div className="flex flex-col items-center gap-3 pt-2">
          
          {/* Download Button (Top) - Now Clickable to Download Page */}
          <Link
            href="/vibeshort-apk"
            className="px-8 py-3.5 rounded-xl font-bold text-[#0D0D12] bg-[#B8F000] hover:bg-[#D0F000] transition shadow-lg shadow-[#B8F000]/30 inline-flex items-center justify-center gap-2"
          >
            Download VibeShort APK
          </Link>

          {/* Combined Rating & Share Box (Bottom) */}
          <div className="px-5 py-3 rounded-xl border border-[#B8F000]/50 hover:border-[#B8F000] hover:shadow-[0_0_15px_rgba(184,240,0,0.3)] transition flex items-center gap-4 bg-transparent text-sm text-gray-300">
            
            {/* Rating Section */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-[#B8F000]">
                {"★".repeat(5)}
              </div>
              <span className="font-semibold text-white">4.8 / 5.0</span>
            </div>

            {/* Divider */}
            <div className="h-4 w-[1px] bg-white/20"></div>

            {/* Share Button */}
            <button
              onClick={() => setIsShareOpen(true)}
              className="font-medium text-white hover:text-[#B8F000] transition inline-flex items-center gap-2 bg-transparent cursor-pointer"
            >
              <svg className="w-4 h-4 text-[#B8F000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share
            </button>

          </div>

        </div>

      </div>

      {/* Share Modal Popup (Dark Theme Adjusted) */}
      {isShareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121218] text-white rounded-2xl w-full max-w-sm shadow-2xl border border-white/10 overflow-hidden relative animate-in fade-in zoom-in duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#B8F000]"></span>
                <h3 className="text-xs font-black tracking-widest uppercase text-white">
                  SHARE THIS PAGE
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsShareOpen(false)}
                className="text-gray-400 hover:text-white transition p-1 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Icons Grid (3x3) */}
            <div className="p-5">
              <div className="grid grid-cols-3 gap-3">
                
                {/* LinkedIn */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-[#0077b5] hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span className="text-[10px] font-bold">LinkedIn</span>
                </a>

                {/* Facebook */}
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-[#1877f2] hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="Facebook"
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  <span className="text-[10px] font-bold">Facebook</span>
                </a>

                {/* Twitter / X */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-black hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white border border-white/10"
                  title="Twitter / X"
                >
                  <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  <span className="text-[10px] font-bold">Twitter</span>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-[#25d366] hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="WhatsApp"
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                  <span className="text-[10px] font-bold">WhatsApp</span>
                </a>

                {/* Telegram */}
                <a
                  href={`https://t.me/share/url?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-[#229ed9] hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="Telegram"
                >
                  <svg className="w-6 h-6 fill-current shrink-0" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.534.26l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.195 1.006.132.832.943z"/></svg>
                  <span className="text-[10px] font-bold">Telegram</span>
                </a>

                {/* Reddit */}
                <a
                  href={`https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-[#ff4500] hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="Reddit"
                >
                  <img
                    src="https://cdn.simpleicons.org/reddit/ffffff"
                    alt="Reddit"
                    className="w-6 h-6"
                  />
                  <span className="text-[10px] font-bold">Reddit</span>
                </a>

                {/* Pinterest */}
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-20 bg-[#e60023] hover:opacity-90 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="Pinterest"
                >
                  <img
                    src="https://cdn.simpleicons.org/pinterest/ffffff"
                    alt="Pinterest"
                    className="w-6 h-6"
                  />
                  <span className="text-[10px] font-bold">Pinterest</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:?subject=${shareText}&body=${shareUrl}`}
                  className="h-20 bg-[#2a2a35] hover:bg-[#333342] border border-white/10 rounded-xl flex flex-col items-center justify-center gap-1.5 transition shadow-sm text-white"
                  title="Email"
                >
                  <svg
                    className="w-6 h-6 text-gray-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 6.5C3 5.67157 3.67157 5 4.5 5H19.5C20.3284 5 21 5.67157 21 6.5V17.5C21 18.3284 20.3284 19 19.5 19H4.5C3.67157 19 3 18.3284 3 17.5V6.5Z"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 7L12 13L20 7"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[10px] font-bold">Email</span>
                </a>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}