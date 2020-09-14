import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Factory from '../Factory';

const Svg = (props) => {
  const {
    children,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const className = clsx(inheritedClassName);

  return (
    <Factory
      element="span"
      className={className}
      aria-hidden
      {...factoryProps}
    >
      {children}
    </Factory>
  );
};

Svg.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

export default Svg;
