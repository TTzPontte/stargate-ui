import breakpoints from './breakpoints';

const devices = {
  1: 96,
  2: 192,
};

const dpi = (ratio = 1, breakpoint) => {
  if (!devices[ratio]) {
    /**
     * @todo add error management
     */
    throw new Error(`
      Stargate UI Styles: ratio not supported.
    `);
  }

  const resolution = devices[ratio];
  const width = breakpoints.up(breakpoint).replace(/^@media\s/, '');
  const media = [
    `@media (min-device-pixel-ratio: ${ratio}) and ${width}`,
    `(min-resolution: ${resolution}dpi) and ${width}`,
  ].join(', ');

  return media;
};

const screen = { dpi };

export { screen };
export default screen;
