import { readableColor, setLightness } from 'polished';
import * as colors from './colors';

const THEME_SHADE_LIGHTER = 800;
const THEME_SHADE_DARKEST = 900;

const darkest = colors.purple[900];
const lighter = colors.grey[100];

const getReadableTextColor = (backgroundColor, color1 = darkest, color2 = lighter) => {
  if (!backgroundColor) return null;

  if (!/^#\w{3,6}$/g.test(backgroundColor)) {
    /**
     * @todo add custom error treatment
     */
    throw Error(`Cannot parse color format.`);
  }

  return readableColor(backgroundColor, color1, color2);
};

const palette = {
  getReadableTextColor,
  setLightness,
  lighter,
  darkest,
  default: {
    lighter: {
      color: colors.grey[900],
      text: getReadableTextColor(colors.grey[900]),
    },
    darkest: {
      color: colors.grey[700],
      text: getReadableTextColor(colors.grey[700]),
    },
  },
  primary: {
    lighter: {
      color: colors.purple[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.purple[THEME_SHADE_LIGHTER]),
    },
    darkest: {
      color: colors.purple[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.purple[THEME_SHADE_LIGHTER]),
    },
  },
  secondary: {
    lighter: {
      color: colors.yellow[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.yellow[THEME_SHADE_LIGHTER]),
    },
    darkest: {
      color: colors.yellow[THEME_SHADE_DARKEST],
      text: getReadableTextColor(colors.purple[THEME_SHADE_DARKEST]),
    },
  },
  success: {
    lighter: {
      color: colors.green[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.green[THEME_SHADE_LIGHTER]),
    },
    darkest: {
      color: colors.green[THEME_SHADE_DARKEST],
      text: getReadableTextColor(colors.green[THEME_SHADE_DARKEST]),
    },
  },
  warning: {
    lighter: {
      color: colors.yellow[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.yellow[THEME_SHADE_LIGHTER]),
    },
    darkest: {
      color: colors.yellow[THEME_SHADE_DARKEST],
      text: getReadableTextColor(colors.yellow[THEME_SHADE_DARKEST]),
    },
  },
  error: {
    lighter: {
      color: colors.pink[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.pink[THEME_SHADE_LIGHTER]),
    },
    darkest: {
      color: colors.pink[THEME_SHADE_DARKEST],
      text: getReadableTextColor(colors.pink[THEME_SHADE_DARKEST]),
    },
  },
  info: {
    lighter: {
      color: colors.indigo[THEME_SHADE_LIGHTER],
      text: getReadableTextColor(colors.indigo[THEME_SHADE_LIGHTER]),
    },
    darkest: {
      color: colors.indigo[THEME_SHADE_DARKEST],
      text: getReadableTextColor(colors.indigo[THEME_SHADE_DARKEST]),
    },
  },
  text: {
    darkest,
    lighter,
  },
  neutral: colors.grey,
};


export default palette;
