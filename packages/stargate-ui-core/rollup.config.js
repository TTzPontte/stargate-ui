/**
 * Thanks @juntossomosmais and @felipefialho for open the source of
 * the Venice and with that, helping us to build Stargate UI too.
 * {@link https://github.com/juntossomosmais/venice/blob/master/packages/react-ds/rollup.config.js}
 */
import configCommon from '../../rollup.config';
import {
  peerDependencies,
  module as fileEs,
  main as fileCjs,
} from './package.json';

const { NODE_ENV } = process.env;

const outputOptions = {
  sourcemap: NODE_ENV === 'development',
  freeze: false,
  esModule: true,
};

const config = {
  ...configCommon,
  input: 'src/index.js',
  output: [
    {
      ...outputOptions,
      ...configCommon.globals,
      file: fileEs,
      format: 'es',
    },
    {
      ...outputOptions,
      ...configCommon.globals,
      file: fileCjs,
      format: 'cjs',
    },
  ],
  external: [
    ...configCommon.external,
    ...Object.keys(peerDependencies),
  ],
};

export default config;
