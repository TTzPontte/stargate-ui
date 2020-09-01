const dotenv = require('dotenv');
const path = require('path');
const { merge } = require('webpack-merge');
const webpack = require('webpack');

dotenv.config();

const env = {
  STORYBOOK_URL,
  STORYBOOK_URI,
  NODE_ENV,
} = process.env;

module.exports = async ({ config }) =>
  merge(config, {
    mode: NODE_ENV,
    module: {
      rules: [
        {
          test: /\.(mjs|jsx?)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '../babel.config.js'),
              },
            },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: ['file-loader'],
          // include: /node_modules\/typeface-/
        },
      ],
    },
    resolve: {
      alias: {
        '@pontte/stargate-ui-playground': path.resolve(__dirname, '../src'),
        '@pontte/stargate-ui-style': path.resolve(__dirname, '../../stargate-ui-styles/src'),
        '@pontte/stargate-ui-core': path.resolve(__dirname, '../../stargate-ui-core/src'),
      },
    },
    plugins: [
      new webpack.DefinePlugin(
        Object.keys(env).reduce((props, name) => ({
          ...props,
          [name]: JSON.stringify(env[name]),
        }), {}),
      ),
    ],
  });
