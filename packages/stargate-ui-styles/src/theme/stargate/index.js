import palette from './palette';
import grid from './grid';
import breakpoint from './breakpoint';
import typography from './typography';

const THEME_BASE = 8;

const spacing = (n = 1) => (
  THEME_BASE * n
);

const radius = (n = 1) => (
  spacing(.5) * n
);

const active = () => (
  '&:hover, &:active, &:focus'
);

const theme = {
  active,
  spacing,
  radius,
  palette,
  grid,
  breakpoint,
  typography,
  mode: 'lighter',
  dir: 'ltr',
  border: [2, 'solid'],
};

export default theme;
