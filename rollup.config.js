import path from 'path';
import dotenv from 'dotenv';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonJs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import nodeGlobals from 'rollup-plugin-node-globals';
import sourceMaps from 'rollup-plugin-sourcemaps';
import postcss from 'rollup-plugin-postcss';
import svgr from '@svgr/rollup';

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

const extensions = [
  '.js',
  '.jsx',
];

const config = {
  external: [],
  plugins: [
    svgr(),
    postcss({
      extract: false,
      modules: true,
    }),
    nodeResolve({
      browser: true,
      extensions,
    }),
    nodeGlobals(),
    commonJs({
      extensions,
      ignoreGlobal: true,
      include: /node_modules/,
    }),
    sourceMaps(),
    babel({
      configFile: path.resolve(__dirname, 'babel.config.js'),
      babelHelpers: 'runtime'
    }),
    replace(
      Object.keys(env).reduce((props, name) => ({
        ...props,
        [name]: JSON.stringify(env[name]),
      }), {}),
    ),
  ],
};

export default config;
