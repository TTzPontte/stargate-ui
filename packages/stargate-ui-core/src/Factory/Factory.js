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
    color: ({ color }) => (
      palette?.[color]?.[mode].color
    ),
    marginLeft: (props) => {
      const {
        margin,
        marginX,
        marginLeft,
      } = props;
      const n = marginLeft ?? marginX ?? margin;

      return n && spacing(n);
    },
    marginRight: (props) => {
      const {
        margin,
        marginX,
        marginRight,
      } = props;
      const n = marginRight ?? marginX ?? margin;

      return n && spacing(n);
    },
    marginTop: (props) => {
      const {
        margin,
        marginY,
        marginTop,
      } = props;
      const n = marginTop ?? marginY ?? margin;

      return n && spacing(n);
    },
    marginBottom: (props) => {
      const {
        margin,
        marginY,
        marginBottom,
      } = props;
      const n = marginBottom ?? marginY ?? margin;

      return n && spacing(n);
    },
    paddingLeft: (props) => {
      const {
        padding,
        paddingX,
        paddingLeft,
      } = props;
      const n = paddingLeft ?? paddingX ?? padding;

      return n && spacing(n);
    },
    paddingRight: (props) => {
      const {
        padding,
        paddingX,
        paddingRight,
      } = props;
      const n = paddingRight ?? paddingX ?? padding;

      return n && spacing(n);
    },
    paddingTop: (props) => {
      const {
        padding,
        paddingY,
        paddingTop,
      } = props;
      const n = paddingTop ?? paddingY ?? padding;

      return n && spacing(n);
    },
    paddingBottom: (props) => {
      const {
        padding,
        paddingY,
        paddingBottom,
      } = props;
      const n = paddingBottom ?? paddingY ?? padding;

      return n && spacing(n);
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
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginY,
    marginX,
    paddingTop,
    paddingRight,
    paddingBottom,
    paddingLeft,
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
