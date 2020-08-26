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
      '@pontte/stargate-ui-core': 'packages/stargate-ui-core/src',
      '@pontte/stargate-ui-styles': 'packages/stargate-ui-styles/src',
      '@pontte/stargate-ui-playground': 'packages/stargate-ui-playground/src',
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

const production = {};

const config = {
  presets: ['@pontte/babel-preset/dist/react'],
  env: {
    test,
    development,
    production,
  },
};

module.exports = config;
