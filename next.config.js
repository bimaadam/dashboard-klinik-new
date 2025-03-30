/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true, // Biar build tetap lanjut walau ada error
  },
};

module.exports = nextConfig;
