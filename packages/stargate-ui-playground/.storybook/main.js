const config = {
  stories: [
    '../../**/(src|docs)/**/*.story.mdx',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
    '@storybook/addon-links',
  ],
};

module.exports = config;
