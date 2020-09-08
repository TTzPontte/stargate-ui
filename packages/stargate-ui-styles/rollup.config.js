/**
 * @todo create shared config with ../stargate-ui-core/rollup.config.js
 */
import path from 'path';
import dotenv from 'dotenv';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

dotenv.config();

const { NODE_ENV } = process.env;
const env = { NODE_ENV };

/**
 * @todo need to check all external dependencies
 */
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-is': 'ReactIs',
  'object-assign': 'Object.assign',
  'react-jss': 'ReactJss',
};

const external = Object.keys(globals);

const production = {
  external,
  input: 'src/index.js',
  output: {
    globals,
    format: 'umd',
    file: 'dist/stargate-ui-styles.min.js',
    name: 'StargateUIStyles',
  },
  plugins: [
    postcss({ extract: true, extensions: ['.css'] }),
    image(),
    nodeResolve({
      /**
       * @todo add in another config file
       */
      extensions: [
        '.js',
        '.jsx',
        '.json',
      ],
    }),
    commonjs({
      ignoreGlobal: true,
      include: /node_modules/,
    }),
    babel({
      configFile: path.resolve(__dirname, 'babel.config.js'),
      babelHelpers: 'runtime',
    }),
    replace(
      Object.keys(env).reduce((props, name) => ({
        ...props,
        [name]: JSON.stringify(env[name]),
      }), {}),
    ),
    terser(),
  ],
};

/**
 * @todo create bundle for development
 */
const config = [production];

export default config;
