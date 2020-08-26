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
        '@pontte/stardust-ui-playground': path.resolve(
          __dirname,
          './components'
        ),
        '@pontte/stardust-ui-style': path.resolve(__dirname, './../src/styles'),
        '@pontte/stardust-ui-core': path.resolve(
          __dirname,
          './../src/components'
        ),
        '@pontte/stardust-ui-icon': path.resolve(__dirname, './../src/icons'),
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
