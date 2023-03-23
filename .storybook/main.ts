const viteTsconfig = require('vite-tsconfig-paths');
const tsconfigPaths = viteTsconfig.default;

const { mergeConfig } = require('vite');
module.exports = {
  stories: ['../packages/**/*.stories.mdx', '../packages/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  staticDirs: ['../libs/assets'],
  features: {
    storyStoreV7: true,
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
      server: {
        hmr: {
          overlay: false,
        },
      },
    });
  },
};