/**
 * @todo create shared config with ../stargate-ui-core/rollup.config.js
 */
import path from 'path';
import dotenv from 'dotenv';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonJs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import nodeGlobals from 'rollup-plugin-node-globals';
import sourceMaps from 'rollup-plugin-sourcemaps';

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
  '@pontte/stargate-ui-styles': 'StargateUiStyles',
  '@pontte/stargate-ui-icons': 'StargateUiIcons',
  '@pontte/stargate-ui-core': 'StargateUiCore',
  'prop-types': 'PropTypes'
};

const external = Object.keys(globals);
// const outputOptions = {
//   sourcemap: true,
//   freeze: false,
//   esModule: true,
// };

const config = {
  external,
  input: 'src/index.js',
  // output: {
  //   globals,
  //   format: 'umd',
  //   file: 'dist/stargate-ui-icons.min.js',
  //   name: 'StargateUIIcons',
  // },
  // output: [
  //   {
  //     file: pkg.module,
  //     format: 'es',
  //     ...outputOptions,
  //   },
  //   {
  //     file: pkg.main,
  //     format: 'cjs',
  //     ...outputOptions,
  //   },
  // ],
  plugins: [
    postcss({ extract: true, extensions: ['.css'] }),
    // image(),
    nodeResolve({
      mainFields: ['module', 'main', 'browser'],
      /**
       * @todo add in another config file
       */
      extensions: [
        '.js',
        '.jsx',
        '.json',
      ],
    }),
    nodeGlobals(),
    // commonJs(),
    commonJs({
      ignoreGlobal: true,
      include: /node_modules/,
      // requireReturnsDefault: true,
    }),
    sourceMaps(),
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
    // terser(),
  ],
};

export default config;
