/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
    ],
  },
  experimental: {
    // serverComponentsExternalPackages: ['@prisma/client'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude HTML files from being processed by Webpack
      config.module.rules.push({
        test: /\.html$/,
        use: "ignore-loader", // Use an appropriate loader or ignore loader if HTML files are not needed
      });
      config.externals = config.externals || {};
      config.externals['@mapbox/node-pre-gyp'] = '@mapbox/node-pre-gyp';
    }

    return config;
  },
};

module.exports = nextConfig;
