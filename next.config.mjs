/** @type {import('next').NextConfig} */
const nextConfig = {
   async headers() {
    return [
      {
        source: '/firebase-messaging-sw.js',
        headers: [
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
           {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
       {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
     reactStrictMode:true,
  swcMinify:true,
  output:"export",
  images: {
    unoptimized: true, // Required for <Image> in static exports
  },
};

export default nextConfig;
