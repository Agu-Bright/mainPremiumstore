/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // Set to `true` for a 308 permanent redirect, `false` for a 307 temporary redirect
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["res.cloudinary.com", "shopviaclone22.com"],
  },
  webpack(config) {
    config.experiments = {  
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

module.exports = nextConfig;
