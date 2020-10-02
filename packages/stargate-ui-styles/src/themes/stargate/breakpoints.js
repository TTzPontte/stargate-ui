const screens = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const up = (key) => {
  return `@media (min-width: ${screens[key]}px)`;
};

const down = (key) => {
  return `@media (max-width: ${screens[key]}px)`;
};

const between = (startKey, endKey) => {
  return `@media (min-width: ${screens[startKey]}px) and (max-width: ${screens[endKey]}px)`;
};

const only = (key) => {
  const matchPreviousScreen = Object.keys(screens).indexOf(n);
  const previousKey = screens[matchPreviousScreen - 1] || 0;

  return `@media (min-width: ${screens[previousKey]}px) and (max-width: ${screens[key]}px)`;
};

const breakpoints = {
  up,
  down,
  between,
  only,
  screens,
};

export default breakpoints;
