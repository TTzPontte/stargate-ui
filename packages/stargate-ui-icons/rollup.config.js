/**
 * @todo create shared config with ../stargate-ui-core/rollup.config.js
 */
import rollupCommon from '../../rollup.config';

import pkg from './package.json';

const outputOptions = {
  sourcemap: true,
  freeze: false,
  esModule: true,
};

const production = {
  ...rollupCommon,
  input: 'src/index.js',
  // output: {
  //   globals,
  //   format: 'umd',
  //   file: 'dist/stargate-ui-icons.min.js',
  //   name: 'StargateUIIcons',
  // },
  output: [
    {
      file: pkg.module,
      format: 'es',
      ...outputOptions,
    },
    {
      file: pkg.main,
      format: 'cjs',
      ...outputOptions,
    },
  ],
};

/**
 * @todo create bundle for development
 */
const config = [production];

export default config;
