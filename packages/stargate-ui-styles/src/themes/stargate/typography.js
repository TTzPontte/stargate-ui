import 'typeface-lato';
import { unit } from '../../utils';

const fontFamily = [
  'Lato',
  'Roboto',
  'Sans-serif',
];

const fontCommon = {
  fontFamily,
  fontSize: unit.rem(16, 10),
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
    fontSize: unit.rem(48, 10),
    fontSizeFluid: {
      max: unit.rem(48, 10),
      min: unit.rem(30, 10),
    },
  },
  h2: {
    ...headingCommon,
    fontSize: unit.rem(40, 10),
    fontSizeFluid: {
      max: unit.rem(40, 10),
      min: unit.rem(24, 10),
    },
  },
  h3: {
    ...headingCommon,
    fontSize: unit.rem(30, 10),
    fontSizeFluid: {
      max: unit.rem(30, 10),
      min: unit.rem(18, 10),
    },
  },
  h4: {
    ...headingCommon,
    fontSize: unit.rem(24, 10),
    fontSizeFluid: {
      max: unit.rem(24, 10),
      min: unit.rem(16, 10),
    },
  },
  h5: {
    ...headingCommon,
    fontSize: unit.rem(16, 10),
    fontSizeFluid: {
      max: unit.rem(16, 10),
      min: unit.rem(14, 10),
    },
  },
  h6: {
    ...headingCommon,
    fontSize: unit.rem(14, 10),
    fontSizeFluid: {
      max: unit.rem(14, 10),
      min: unit.rem(14, 10),
    },
  },
  body: {
    ...bodyCommon,
    fontSize: unit.rem(16, 10),
    fontSizeFluid: {
      max: unit.rem(18, 10),
      min: unit.rem(14, 10),
    },
  },
  bodylower: {
    ...bodyCommon,
    fontSize: unit.rem(14, 10),
    fontSizeFluid: {
      max: unit.rem(16, 10),
      min: unit.rem(12, 10),
    },
  },
  small: {
    ...bodyCommon,
    fontSize: unit.rem(14, 10),
    fontSizeFluid: {
      max: unit.rem(14, 10),
      min: unit.rem(12, 10),
    },
  },
  tiny: {
    ...bodyCommon,
    fontSize: unit.rem(12, 10),
    fontSizeFluid: {
      max: unit.rem(12, 10),
      min: unit.rem(12, 10),
    },
  },
};

const typography = {
  ...bodyCommon,
  ...typographyVariant,
};

export default typography;
