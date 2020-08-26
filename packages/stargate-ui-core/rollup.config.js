import path from 'path';
import dotenv from 'dotenv';
import resolve from 'rollup-plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import image from 'rollup-plugin-img';
import replace from 'rollup-plugin-replace';

dotenv.config();

const { NODE_ENV } = process.env;
const env = { NODE_ENV };

const config = [
  {
    input: 'src/index.js',
    output: {
      dir: 'dist',
      format: 'cjs',
      name: 'stargate-ui',
    },
    external: [
      'react',
      'react-dom',
      'prop-types',
      'react-is',
    ],
    plugins: [
      image(),
      resolve({ browser: true }),
      replace(
        Object.keys(env).reduce((props, name) => ({
          ...props,
          [name]: JSON.stringify(env[name]),
        }), {}),
      ),
      babel({
        configFile: path.resolve(__dirname, 'babel.config.js'),
        babelHelpers: 'runtime',
      }),
      commonjs({
        include: /node_modules/,
      }),
    ],
  },
];

export default config;
