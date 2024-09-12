import createNextIntlPlugin from 'next-intl/plugin';
import withPlaiceholder from '@plaiceholder/next';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
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

export default withPlaiceholder(withNextIntl(nextConfig));
