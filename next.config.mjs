/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Ignore specific errors
    config.ignoreWarnings = [
      // Example: Ignore a specific error by its message
      /some-error-message-to-ignore/,
      // Example: Ignore all errors of a certain type
      { module: /some-module-to-ignore/ },
      // Example: Ignore all errors
      // This is not recommended for production builds
      // as it might hide important issues
      { module: /./ },
    ];

    return config;
  },
};

export default nextConfig;