import React, { useRef, useEffect } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

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
  };

  const barSticky = {
    position: 'sticky',
    top: 0,
  };

  const barFixed = {
    width: '100%',
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
    children,
    onScroll = () => {},
    className: inheritedClassName,
    ...inheritedProps
  } = props;

  const barRef = useRef(ref);

  const handleScroll = () => {
    const scrollY = window.pageYOffset ?? window.scrollY;

    onScroll(scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
  }, [barRef]);

  const [
    {
      bar: classBar,
      barSticky: classBarSticky,
      barFixed: classBarFixed,
    },
  ] = useStyles(styles, { sticky });

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
      ref={barRef}
      className={className}
      {...inheritedProps}>
      {children}
    </Factory>
  );
});

Bar.displayName = 'Bar';

export default Bar;
