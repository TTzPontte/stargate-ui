import * as colors from './colors';

const THEME_SHADE_LIGHTER = 800;
const THEME_SHADE_DARKEST = 900;

const palette = {
  primary: [
    colors.purple[THEME_SHADE_LIGHTER],
    colors.purple[THEME_SHADE_DARKEST],
  ],
  secondary: [
    colors.yellow[THEME_SHADE_LIGHTER],
    colors.yellow[THEME_SHADE_DARKEST],
  ],
  text: [
    colors.purple[THEME_SHADE_DARKEST],
    colors.purple[THEME_SHADE_DARKEST],
  ],
  success: [
    colors.green[THEME_SHADE_LIGHTER],
    colors.green[THEME_SHADE_DARKEST],
  ],
  warning: [
    colors.yellow[THEME_SHADE_LIGHTER],
    colors.yellow[THEME_SHADE_DARKEST],
  ],
  error: [
    colors.pink[THEME_SHADE_LIGHTER],
    colors.pink[THEME_SHADE_DARKEST],
  ],
  info: [
    colors.indigo[THEME_SHADE_LIGHTER],
    colors.indigo[THEME_SHADE_DARKEST],
  ],
  darkest: colors.purple[900],
  lighter: colors.grey[100],
  neutral: colors.grey,
};

export default palette;
