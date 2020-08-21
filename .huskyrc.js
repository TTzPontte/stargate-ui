/**
 * Run @commitizen/cz-cli under from `prepare-commit-msg` call
 * local editor. Prefer use `npm run commit`.
 * @see {@link https://github.com/commitizen/cz-cli/issues/558}
 */
module.exports = {
  hooks: {
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
