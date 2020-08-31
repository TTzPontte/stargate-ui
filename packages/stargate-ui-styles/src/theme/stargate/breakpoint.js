const screens = {
  xs: 0,
  sm: 600,
  md: 960,
  lg: 1280,
  xl: 1920,
};

const up = (key) => {
  return `@media (min-width: ${screens[key]})`;
};

const down = (key) => {
  return `@media (max-width: ${screens[key]})`;
};

const between = (startKey, endKey) => {
  return `@media (min-width: ${screens[startKey]}) and (max-width: ${screens[endKey]})`;
};

const only = (key) => {
  const matchPreviousScreen = Object.keys(screens).indexOf(n);
  const previousKey = screens[matchPreviousScreen - 1] || 0;

  return `@media (min-width: ${screens[previousKey]}) and (max-width: ${screens[key]})`;
};

const breakpoint = {
  up,
  down,
  between,
  only,
  screens,
};

export default breakpoint;
