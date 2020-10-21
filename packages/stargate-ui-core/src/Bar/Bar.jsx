import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';

const styles = (theme) => {
  const {
    spacing,
    zIndex,
    palette,
  } = theme;

  const bar = {
    paddingTop: spacing(2),
    paddingBottom: spacing(2),
    zIndex: zIndex.bar,
    background: palette.lighter,
    width: '100%',
  };

  const barSticky = {
    position: 'sticky',
    top: 0,
  };

  const barFixed = {
    position: 'fixed',
    top: 0,
    left: 0,
  };

  return {
    bar,
    barSticky,
    barFixed,
  };
};

const Bar = React.forwardRef((props, ref) => {
  const {
    sticky,
    fixed,
    onScroll = () => {},
    className: inheritedClassName,
    ...inheritedProps
  } = props;

  const barRef = React.useRef(ref);

  const handleScroll = () => {
    const scrollY = window.pageYOffset ?? window.scrollY;

    onScroll(scrollY);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [barRef]);

  const [
    {
      bar: classBar,
      barSticky: classBarSticky,
      barFixed: classBarFixed,
    },
  ] = useStyles(styles);

  const className = clsx(
    inheritedClassName,
    classBar,
    {
      [classBarSticky]: sticky,
      [classBarFixed]: fixed,
    },
  );

  return (
    <Factory
      paddingX={2}
      {...inheritedProps}
      ref={barRef}
      className={className}
    />
  );
});

Bar.displayName = 'Bar';

/**
 * Bar is built under the @func Factory and accepts all features of it as well.
 * Check out the spec @see {@file ../Factory/Factory.jsx}
 */
Bar.propTypes = {
  /**
   * Define `sticky` as kind of position.
   * @default undefined
   */
  sticky: PropTypes.bool,
  /**
   * Define `fixed` as kind of position.
   * @default undefined
   */
  fixed: PropTypes.bool,
  /**
   * Trigger when window has been scrolled.
   * @default Function
   */
  onScroll: PropTypes.func,
};

/**
 * Add @property {object} factoryProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Bar.defaultProps = {
  onScroll: () => {},
};

export default Bar;
