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
    large,
    children,
    color,
    viewBox = [0, 0, 24, 24],
    padding,
    paddingX,
    paddingY,
    paddingLeft,
    paddingRight,
    paddingTop,
    paddingBottom,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const [classes] = useStyles(styles, { color, large });
  const className = clsx(Object.values(classes), inheritedClassName);

  return (
    <Svg
      className={className}
      padding={padding}
      paddingX={paddingX}
      paddingY={paddingY}
      paddingLeft={paddingLeft}
      paddingRight={paddingRight}
      paddingTop={paddingTop}
      paddingBottom={paddingBottom}
    >
      <Factory
        element="svg"
        viewBox={viewBox.join(',')}
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
