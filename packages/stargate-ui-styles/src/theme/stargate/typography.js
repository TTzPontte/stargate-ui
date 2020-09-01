import 'typeface-lato';

const fontFamily = [
  'Lato',
  'Roboto',
  'Sans-serif',
];

const fontCommon = {
  fontFamily,
};

const headingCommon = {
  ...fontCommon,
  lineHeight: 1.2,
  fontWeight: 'bold',
};

const bodyCommon = {
  ...fontCommon,
  lineHeight: 1.4,
  fontWeight: 'regular',
};

const typographyVariant = {
  h1: {
    ...headingCommon,
    fontSize: 48,
  },
  h2: {
    ...headingCommon,
    fontSize: 40,
  },
  h3: {
    ...headingCommon,
    fontSize: 30,
  },
  h4: {
    ...headingCommon,
    fontSize: 24,
  },
  h5: {
    ...headingCommon,
    fontSize: 16,
  },
  h6: {
    ...headingCommon,
    fontSize: 14,
  },
  body: {
    ...bodyCommon,
    fontSize: 16,
  },
  bodylower: {
    ...bodyCommon,
    fontSize: 14,
  },
  small: {
    ...bodyCommon,
    fontSize: 14,
  },
  tiny: {
    ...bodyCommon,
    fontSize: 13,
  },
};

const typography = {
  ...typographyVariant,
  fontFamily,
};

export default typography;
