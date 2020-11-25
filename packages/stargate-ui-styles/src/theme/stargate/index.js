import palette from './palette';
import grid from './grid';
import breakpoint from './breakpoint';
import typography from './typography';
import partners from './partners';

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

const checked = () => (
  '&:checked'
);

const theme = {
  active,
  checked,
  spacing,
  radius,
  palette,
  grid,
  breakpoint,
  typography,
  mode: 'lighter',
  dir: 'ltr',
  border: [2, 'solid'],
  partners,
};

export default theme;
