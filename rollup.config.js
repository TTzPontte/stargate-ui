import path from 'path';
import dotenv from 'dotenv';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonJs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import nodeGlobals from 'rollup-plugin-node-globals';
import sourceMaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';

dotenv.config();

const { NODE_ENV } = process.env;
const env = {
  NODE_ENV,
  /**
   * Required by babel-plugin-transform-react-remove-prop-types
   * to remove PropTypes from production build.
   */
  'process.env.NODE_ENV': NODE_ENV
};

const config = {
  plugins: [
    postcss({
      extract: false,
      modules: true,
    }),
    nodeResolve({
      extensions: [
        '.js',
        '.jsx',
      ],
    }),
    nodeGlobals(),
    commonJs({
      ignoreGlobal: true,
      include: /node_modules/,
    }),
    NODE_ENV === 'development' && sourceMaps(),
    babel({
      exclude: /node_modules/,
      configFile: path.resolve(__dirname, 'babel.config.js'),
      babelHelpers: 'runtime',
    }),
    replace(
      Object.keys(env).reduce((props, name) => ({
        ...props,
        [name]: JSON.stringify(env[name]),
      }), {}),
    ),
    NODE_ENV === 'production' && terser(),
  ],
};

export default config;
