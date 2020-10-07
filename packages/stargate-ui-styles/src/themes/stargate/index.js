/**
 * @todo need organize utils outside `stargate` theme
 */
import deepmerge from 'deepmerge';

import palette from './palette';
import grid from './grid';
import breakpoints from './breakpoints';
import typography from './typography';

const THEME_BASE = 8;

const maxWidth = breakpoints.screens.lg;

const spacing = (n = 1) => (
  typeof n === 'string' ? n : (n * THEME_BASE)
);

const radius = (n = 1) => (
  spacing(.5) * n
);

const active = () => (
  '&:hover, &:active, &:focus'
);

const resets = {
  button: {
    cursor: 'pointer',
    outline: 'none',
    border: 0,
    padding: 0,
    background: 'transparent',
  },
};

const transition = (property, time = '.2s') => ({
  ease: [
    property,
    time,
    'ease',
  ],
});


const overrides = [
  palette,
  breakpoints,
  typography,
  grid,
].reduce((overrides, { overrides: props = {} }) => deepmerge(overrides, props), {});

const theme = {
  maxWidth,
  resets,
  transition,
  overrides,
  active,
  spacing,
  radius,
  palette,
  grid,
  breakpoints,
  typography,
  mode: 'lighter',
  dir: 'ltr',
  border: [2, 'solid'],
};

export default theme;
