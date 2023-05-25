/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  env: {
    KEYCLOAK_URL: process.env.KEYCLOAK_URL,
    APP_URL: process.env.APP_URL,
    API_SERVER_URL: process.env.API_SERVER_URL,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['courses-top.ru', 'md-c.storage.yandexcloud.net', 'md-gal.storage.yandexcloud.net'],
  },
  webpack(config, options) {
    config.module.rules.push({
      loader: '@svgr/webpack',
      issuer: /\.[jt]sx?$/,
      options: {
        prettier: false,
        svgo: true,
        svgoConfig: {
          plugins: [{
            name: 'preset-default',
            params: {
              override: {
                removeViewBox: false
              }
            }
          }],
        },
        titleProp: true,
      },
      test: /\.svg$/,
    });

    return config;
  },
};

module.exports = nextConfig;
