import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useStyles } from '@pontte/stargate-ui-styles';

import Factory from '../Factory';
import Svg from '../Svg';

const styles = (props) => {
  const {
    palette,
    mode,
    unit,
  } = props;

  /**
   * @todo change to rem func
   */
  const setDimensions = ({ size }) => {
    if (size === 'large') {
      return unit.rem(22);
    }

    if (size === 'medium') {
      return unit.rem(18);
    }

    return unit.rem(14);
  };

  const svgIcon = {
    overflow: 'hidden',
    userSelect: 'none',
    display: 'inline-block',
    textAlign: 'center',
    flexShrink: 0,
    width: setDimensions,
    height: setDimensions,
    lineHeight: 0,
    '& path': {
      fill: ({ color }) => (
        palette?.[color]?.[mode].color || 'currentColor'
      ),
    }
  };

  return { svgIcon };
};

const SvgIcon = (props) => {
  const {
    children,
    color,
    size = 'medium',
    viewBox = [0, 0, 24, 24],
    className: inheritedClassName,
    ...inheritedProps
  } = props;

  const [classes] = useStyles(styles, { color, size });
  const className = clsx(Object.values(classes), inheritedClassName);

  return (
    <Svg
      className={className}
      {...inheritedProps}
    >
      <Factory
        element="svg"
        viewBox={viewBox.join(',')}
        children={children}
      />
    </Svg>
  );
};

SvgIcon.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  /**
   * Color only works if each path of svg element has property fill as `currentColor`.
   * @default default
   */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
  ]),
  large: PropTypes.bool,
  viewBox: PropTypes.arrayOf(PropTypes.number),
};

export default SvgIcon;
