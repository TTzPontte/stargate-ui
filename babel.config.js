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
      '@pontte/stargate-ui-icons': path.resolve(__dirname, 'packages/stargate-ui-icons/src'),
    },
  },
];

const test = {
  presets: [
    [
      '@pontte/babel-preset/dist/react',
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

const staging = {
  plugins: [resolver],
};

const production = {
  plugins: [
    [
      /**
       * @todo add as dependency from @pontte/babel-preset
       */
      'babel-plugin-transform-react-remove-prop-types', {
        mode: 'unsafe-wrap',
      },
    ],
  ],
};

const config = {
  presets: ['@pontte/babel-preset/dist/react'],
  env: {
    test,
    development,
    production,
    staging,
  },
};

module.exports = config;
