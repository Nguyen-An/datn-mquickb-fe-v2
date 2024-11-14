const createNextIntlPlugin = require('next-intl/plugin');
/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
      silenceDeprecations: ['legacy-js-api'],
    },
    reactStrictMode: true,
    images: {
      domains: ['mquickb.s3.amazonaws.com'],
    },
  };

module.exports = nextConfig
