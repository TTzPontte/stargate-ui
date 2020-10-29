import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from '@pontte/stargate-ui-styles';

import Factory from '../Factory';

const styles = () => {
  const svg = {
    userSelect: 'none',
    pointerEvents: 'none',
  };

  return { svg };
};

const Svg = React.forwardRef((props, ref) => {
  const {
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const [{ svg }] = useStyles(styles);
  const className = clsx(svg, inheritedClassName);

  return (
    <Factory
      ref={ref}
      element="span"
      aria-hidden
      {...factoryProps}
      className={className}
    />
  );
});

Svg.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

export default Svg;
