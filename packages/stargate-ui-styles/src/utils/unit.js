import * as polished from 'polished';

const strip = polished.stripUnit;
/**
 * @todo `base` needs to be under theme config
 */
const rem = (n, base = 10) => (
  polished.rem(n, base)
);

/**
 * Generate a unit based on screen width.
 *
 * Inspired in article FLuid Typography from CSS-Tricks.
 * @see {@link https://css-tricks.com/snippets/css/fluid-typography/}
 *
 * @param {number} max
 * @param {number} min
 * @param {number} maxScreen
 * @param {number} [minScreen] - 320 is the minimum device width available
 */
const fluid = (max, min, maxScreen, minScreen = 320) => (
  `calc(${min} + ${strip(max) - strip(min)} * ((100vw - ${rem(minScreen)}) / ${maxScreen - minScreen}))`
);

const unit = {
  strip,
  fluid,
  rem,
};

export { unit };
export default unit;
