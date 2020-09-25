import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

const styles = (theme) => {
  const {
    spacing,
    palette,
    mode,
  } = theme;

  const factory = {
    maxWidth: '100%',
    color: ({ color }) => (
      palette?.[color]?.[mode].color
    ),
    margin: (props) => {
      const {
        margin,
        marginX,
        marginY,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      } = props;

      return [
        (margin && spacing(margin)) ?? [
          marginY ?? marginTop,
          marginX ?? marginRight,
          marginY ?? marginBottom,
          marginX ?? marginLeft
        ].map(spacing),
      ];
    },
    padding: (props) => {
      const {
        padding,
        paddingX,
        paddingY,
        paddingTop,
        paddingBottom,
        paddingLeft,
        paddingRight,
      } = props;

      return [
        (padding && spacing(padding)) ?? [
          paddingY ?? paddingTop,
          paddingX ?? paddingRight,
          paddingY ?? paddingBottom,
          paddingX ?? paddingLeft
        ].map(spacing),
      ];
    },
    textAlign: ({ textAlign }) => (
      textAlign
    )
  };

  return { factory };
};

const Factory = React.forwardRef((props, ref) => {
  const {
    children,
    element = 'div',
    textAlign = 'inherit',
    margin,
    marginTop = 0,
    marginRight = 0,
    marginBottom = 0,
    marginLeft = 0,
    marginY,
    marginX,
    paddingTop = 0,
    paddingRight = 0,
    paddingBottom = 0,
    paddingLeft = 0,
    paddingY,
    paddingX,
    padding,
    color,
    className: inheritedClassName,
    ...elementProps
  } = props;
  /**
   * segundo argumento volta apenas valores??
   */
  const [classes] = useStyles(styles, {
    margin,
    marginY,
    marginX,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
    paddingY,
    paddingX,
    padding,
    color,
    textAlign,
  });
  const className = clsx(Object.values(classes), inheritedClassName);

  /**
   * will accept props
   *
   * gutter as margin/padding
   * padding
   * margin
   * align
   */

  return createElement(element, {
    ref,
    className,
    ...elementProps,
  }, children);
});

Factory.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'error',
    'info',
  ]),
  /**
   * @default inherit
   */
  textAlign: PropTypes.oneOf([
    'inherit',
    'initial',
    'left',
    'right',
    'center',
    'justify',
  ]),
};

export default Factory;
