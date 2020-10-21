const config = {
  stories: [
    '../../**/!(node_modules|.boilerplate)/**/*.story.mdx',
    '../../**/!(node_modules|.boilerplate)/**/*.story.js',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-jest',
    '@storybook/addon-links',
  ],
};

module.exports = config;
