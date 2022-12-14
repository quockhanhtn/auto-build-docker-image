/** @type {{eslint: {dirs: string[], ignoreDuringBuilds: boolean}, distDir: string, reactStrictMode: boolean, cleanDistDir: boolean, generateBuildId: (function(): string), pageExtensions: string[], swcMinify: boolean, typescript: {ignoreBuildErrors: boolean, tsconfigPath: string}, i18n: {defaultLocale: string, locales: string[], localeDetection: boolean}}} */
const nextConfig = {
  i18n: {
    locales: ['en', 'vi'],
    defaultLocale: 'vi',
    localeDetection: true,
  },
  eslint: {
    dirs: ['./src'],
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },

  distDir: 'build',
  cleanDistDir: true,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    const buildTimeStamp = new Date().toISOString().replace(/-/g, '').replace(/T/g, '').replace(/:/g, '').slice(0, 14);
    return process.env.npm_package_name + '@' + process.env.npm_package_version + '@' + buildTimeStamp;
  },

  pageExtensions: ['ts', 'tsx'],
  reactStrictMode: true,
  swcMinify: true,

  output: 'standalone',
};

module.exports = nextConfig;
