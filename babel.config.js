const path = require('path');

const resolver = [
  'babel-plugin-module-resolver',
  {
    root: ['./'],
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.mdx',
    ],
    alias: {
      '@pontte/stargate-ui-core': path.resolve(__dirname, 'packages/stargate-ui-core/src'),
      '@pontte/stargate-ui-styles': path.resolve(__dirname, 'packages/stargate-ui-styles/src'),
      '@pontte/stargate-ui-playground': path.resolve(__dirname, 'packages/stargate-ui-playground/src'),
      '@pontte/stargate-ui-icons': path.resolve(__dirname, 'packages/stargate-ui-icons/src'),
    },
  },
];

const test = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [resolver],
};

const development = {
  plugins: [resolver],
};

const production = {
  /**
   * @todo remove when packages be published.
   */
  plugins: [],
};

const config = {
  presets: ['@pontte/babel-preset/dist/react'],
  env: {
    test,
    development,
    production,
  },
};

module.exports = config;
