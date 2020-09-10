const { STORYBOOK_URL: brandUrl } = process.env;

/**
 * Temporary vars.
 */
const color1 = '#3F3356';
const color2 = '#00A472';
const color3 = '#FCCD5C';
const color4 = '#3F3356';
const color5 = '#C3C3D5';
const color6 = '#FAF9FD';

const config = {
  brandUrl,
  base: 'light',
  brandTitle: 'Stargate UI',
  brandImage: 'images/logo-stargate.svg',
  colorPrimary: color1,
  colorSecondary: color3,
  appBg: 'white',
  appContentBg: color6,
  appBorderColor: color6,
  appBorderRadius: 8,
  barTextColor: color6,
  barSelectedColor: color3,
  barBg: color1,
  fontBase: 'Lato, sans-serif',
};

export default config;
