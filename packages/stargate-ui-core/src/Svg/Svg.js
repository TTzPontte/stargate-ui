import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Factory from '../Factory';

const Svg = (props) => {
  const {
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
    />
  );
};

Svg.propTypes = {
  children: PropTypes.element,
  className: PropTypes.string,
};

export default Svg;
