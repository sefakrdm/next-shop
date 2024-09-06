import withPlaiceholder from '@plaiceholder/next';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   appDir: true,
  //   runtime: 'nodejs',
  // },
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        // pathname: "**",
      },
      {
        protocol: "https",
        hostname: "www.bercostore.com",
        // pathname: "**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        // pathname: "**",
      },
    ],
  },
};

export default withPlaiceholder(nextConfig);
