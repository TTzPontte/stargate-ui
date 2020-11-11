import React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@pontte/stargate-ui-styles';

const PictureSource = (props) => {
  const {
    fallback,
    xs,
    sm,
    md,
    lg,
    xl,
    src,
    ...elementProps
  } = props;

  if (fallback) {
    /* eslint-disable jsx-a11y/alt-text */
    return (
      <img
        {...elementProps}
        src={src}
      />
    );
    /* eslint-enable jsx-a11y/alt-text */
  }

  const theme = useTheme();
  const breakpoints = Object.entries({
    xs,
    sm,
    md,
    lg,
    xl,
  }).filter(([, value]) => value);
  const breakpoint = Object.fromEntries(breakpoints);
  /**
   * Get only first breakpoint defined. If any screen is defined,
   * `xs` will be assumed.
   */
  const [screen] = Object.keys(breakpoint) || ['xs'];

  const media = theme.breakpoints.up(screen).replace(/^@media\s/, '');

  if (!Array.isArray(src)) {
    /**
     * @todo add error management
     */
    throw 'Picture: src must be an array';
  }

  const srcset = src.map((name, i) => {
    const ratio = i + 1;

    return [
      name,
      ratio.toString().padEnd(2, 'x'),
    ].join(' ');
  });

  return (
    <source
      {...elementProps}
      srcSet={srcset}
      media={media}
    />
  );
};

PictureSource.displayName = 'PictureSource';

PictureSource.propTypes = {
  /**
   * Add image fallback.
   */
  fallback: PropTypes.bool,
  /**
   * Show image for x-small breakpoint.
   */
  xs: PropTypes.bool,
  /**
   * Show image for small breakpoint.
   */
  sm: PropTypes.bool,
  /**
   * Show image for medium breakpoint.
   */
  md: PropTypes.bool,
  /**
   * Show image for large breakpoint.
   */
  lg: PropTypes.bool,
  /**
   * Show image for x-large breakpoint.
   */
  xl: PropTypes.bool,
  /**
   * Add image source. If `fallback` is defined, `src` must be an string. For case with
   * array of files, the first value is for 1x ratio, or 92 dpi and second is for 2x radio
   * or 192dpi.
   */
  src: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  /**
   * Add properties to `source` or `img` element.
   */
  '...props': PropTypes.any
};

export default PictureSource;
