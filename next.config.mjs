/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["3000-" + (process.env.BASE44_PUBLIC_HOST_SUFFIX || "")],
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