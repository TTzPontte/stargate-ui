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
      // '@pontte/stargate-ui-core': path.resolve(__dirname, 'packages/stargate-ui-core/src'),
      // '@pontte/stargate-ui-styles': path.resolve(__dirname, 'packages/stargate-ui-styles/src'),
      '@pontte/stargate-ui-playground': path.resolve(__dirname, 'packages/stargate-ui-playground/src'),
      // '@pontte/stargate-ui-icons': path.resolve(__dirname, 'packages/stargate-ui-icons/src'),
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
};

const development = {};

const production = {};

const config = {
  presets: [
    ['@pontte/babel-preset/dist/react', { inputSourceMap: true }],
  ],
  plugins: [
    resolver,
    ['@babel/plugin-transform-runtime', { useESModules: true }],
    ['babel-plugin-transform-react-remove-prop-types', {
      mode: 'unsafe-wrap',
    }],
  ],
  env: {
    test,
    development,
    production,
  },
};

module.exports = config;
