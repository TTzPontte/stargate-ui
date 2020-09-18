const { resolve } = require('path');
const jestConfig = require('../../jest.config');

const config = {
  displayName: 'stargate-ui-core',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@pontte/stargate-ui-styles(.*)$': resolve(__dirname, '../stargate-ui-styles/src$1'),
  },
};

/**
 * @todo needs improvement
 */
jestConfig.projects.push({
  ...config,
  moduleNameMapper: {
    ...config.moduleNameMapper,
    ...jestConfig.moduleNameMapper,
  },
})

module.exports = jestConfig;
