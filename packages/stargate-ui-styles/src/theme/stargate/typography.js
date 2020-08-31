import 'typeface-lato';

const fontFamily = ['Lato'];
const fontHeight = '150%';

const fontCommon = {
  fontFamily,
  fontHeight,
};

const headingCommon = {
  ...fontCommon,
  lineSpacing: 1.2,
  fontWeight: 700,
};

const bodyCommon = {
  ...fontCommon,
  lineSpacing: 1.4,
  fontWeight: 500,
};

const fontVariants = {
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
  bodySmall: {
    ...bodyCommon,
    fontSize: 14,
  },
  small: {
    ...bodyCommon,
    fontSize: 14,
  },
  caption: {
    ...bodyCommon,
    fontSize: 13,
  },
};

const typography = {
  ...fontVariants,
};

export default typography;
