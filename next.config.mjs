/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/routes/full-circuit",
        destination: "/routes/classic-circuit",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;