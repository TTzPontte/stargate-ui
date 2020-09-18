const identityObjectProxy = 'identity-obj-proxy';

const configCommon = {
  coverageDirectory: '<rootDir>/coverage',
  testMatch: ['src/__tests__/**/*.{js,jsx}'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!node_modules',
  ],
  coveragePathIgnorePatterns: [
    'story',
    'stories',
    'index',
  ],
  transform: {
    '.*\\.jsx?$': 'babel-jest',
  },
  moduleDirectories: [
    'node_modules',
    '../packages',
  ],
  moduleNameMapper: {
    'typeface-lato': identityObjectProxy,
    '.*\\.css$': identityObjectProxy,
  },
};

const config = {
  ...configCommon,
  projects: [],
};

module.exports = config;
