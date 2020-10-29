
module.exports = {
  extends: ['@pontte/commitlint-config'],
  rules: {
    'scope-enum': [
      2,
      'always',
      [
        '*',
        'core',
        'styles',
        'playground',
        'icons',
      ],
    ],
  },
};
