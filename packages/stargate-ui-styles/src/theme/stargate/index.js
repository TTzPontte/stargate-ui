import palette from './palette';
import grid from './grid';
import breakpoint from './breakpoint';

const THEME_BASE = 8;

const spacing = (n = 1) => THEME_BASE * n;
const radius = (n = 1) => spacing(.5) * n;

const theme = {
  spacing,
  radius,
  palette,
  grid,
  breakpoint,
  mode: 'light',
  dir: 'ltr',
};

export default theme;