/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  compiler: {
    // Production build me console.log remove kar ke JS bundle optimize karega
    removeConsole: process.env.NODE_ENV === 'production',
  },
};

export default nextConfig;