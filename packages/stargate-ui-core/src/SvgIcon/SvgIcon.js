import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Svg } from '@pontte/stargate-ui-core';

import Factory from '../Factory';

const styles = (props) => {
  const {
    palette,
    mode,
  } = props;

  /**
   * @todo change to rem func
   */
  const setDimensions = ({ large }) => (
    !large ? '1.2rem' : '1.6rem'
  );

  const svgIcon = {
    overflow: 'hidden',
    userSelect: 'none',
    display: 'inline-block',
    textAlign: 'center',
    flexShrink: 0,
    width: setDimensions,
    height: setDimensions,
    fill: ({ color }) => (
      palette?.[color]?.[mode].color || 'currentColor'
    ),
  };

  return { svgIcon };
};

const SvgIcon = (props) => {
  const {
    large,
    children,
    className: inheritedClassName,
    color = 'inherit',
    viewBox = '0 0 24 24',
    ...factoryProps
  } = props;

  const [classes] = useStyles(styles, { large });
  const className = clsx(Object.values(classes), inheritedClassName);

  return (
    <Svg className={className}>
      <Factory
        element="svg"
        viewBox={viewBox}
        children={children}
        {...factoryProps}
      />
    </Svg>
  );
};

SvgIcon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Color only works if each path of svg element has property fill as `currentColor`.
   * @default inherit
   */
  color: PropTypes.oneOf([
    'inherit',
    'initial',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
  ]),
  large: PropTypes.bool,
  viewBox: PropTypes.string,
};

export default SvgIcon;
