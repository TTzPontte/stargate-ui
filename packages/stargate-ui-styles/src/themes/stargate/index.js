/**
 * @todo need organize utils outside `stargate` theme
 */
import deepmerge from 'deepmerge';

import palette from './palette';
import partners from './partners';
import grid from './grid';
import typography from './typography';

const THEME_BASE = 8;

const maxWidth = 1318;

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
    margin: 0,
  },
};

const transition = (property, time = '.2s') => ({
  ease: [
    property,
    time,
    'ease',
  ],
});

const zIndex = {
  bar: 1000,
  backdrop: 2000,
  drawer: 3000,
};

const boxShadow = [
  0,
  0,
  10,
  `rgba(0, 0, 0, .1)`,
];

const overrides = [
  palette,
  typography,
  grid,
].reduce((overrides, { overrides: props = {} }) => deepmerge(overrides, props), {});

const theme = {
  zIndex,
  boxShadow,
  maxWidth,
  resets,
  transition,
  overrides,
  active,
  spacing,
  radius,
  palette,
  grid,
  typography,
  mode: 'lighter',
  dir: 'ltr',
  border: [2, 'solid'],
  partners,
};

export default theme;
