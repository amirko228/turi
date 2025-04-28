/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'golden39.ru',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tripster.ru',
      },
      {
        protocol: 'https',
        hostname: 'edge.travelatacdn.ru',
      },
      {
        protocol: 'https',
        hostname: 'news.store.rambler.ru',
      },
      {
        protocol: 'https',
        hostname: 'cf.bstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
      },
      {
        protocol: 'https',
        hostname: 'moihottur.ru',
      },
      {
        protocol: 'https',
        hostname: 'cf.youtravel.me',
      },
      {
        protocol: 'https',
        hostname: 'media.rsrv.me',
      },
      {
        protocol: 'https',
        hostname: 'q-xx.bstatic.com',
      }
    ],
  },
}

module.exports = nextConfig 