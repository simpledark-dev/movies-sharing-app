/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
