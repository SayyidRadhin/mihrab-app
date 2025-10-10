/** @type {import('next').NextConfig} */
const nextConfig = {
     reactStrictMode:true,
  swcMinify:true,
  output:"export",
  images: {
    unoptimized: true, // Required for <Image> in static exports
  },
};

export default nextConfig;
