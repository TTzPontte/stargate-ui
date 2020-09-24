import deepmerge from 'deepmerge';

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

const overrides = [
  palette,
  breakpoint,
  typography,
  grid,
].reduce((overrides, { overrides: props = {} }) => deepmerge(overrides, props), {});

const theme = {
  overrides,
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
