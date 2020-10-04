import React, { createElement } from 'react';
import PropTypes from 'prop-types';
import { useStyles, themes } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

const THEME_BREAKPOINTS_TYPES = Object.keys(themes.stargate.breakpoints.screens);

const styles = (theme) => {
  const {
    spacing,
    palette,
    mode,
    breakpoints,
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

  const factoryHidden = ({ hideDown, hideUp }) => {
    if (hideUp) {
      return {
        [breakpoints.up(hideUp)]: {
          display: 'none',
        }
      }
    }

    return {
      [breakpoints.down(hideDown)]: {
        display: 'none',
      }
    }
  };

  return {
    factory,
    factoryHidden,
  };
};

const Factory = React.forwardRef((props, ref) => {
  const {
    children,
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
    hideDown,
    hideUp,
    element = 'div',
    textAlign = 'inherit',
    className: inheritedClassName,
    ...elementProps
  } = props;

  const [
    {
      factory: classFactory,
      factoryHidden: classFactoryHidden,
    }
  ] = useStyles(styles, {
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
    hideDown,
    hideUp,
  });

  const className = clsx(
    classFactory,
    {
      [classFactoryHidden]: hideUp || hideDown,
    },
    inheritedClassName
  );

  return createElement(element, {
    ref,
    className,
    ...elementProps,
  }, children);
});

Factory.propTypes = {
  children: PropTypes.node,
//   margin: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   marginTop: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   marginBottom: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   marginLeft: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   marginRight: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   marginY: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   marginX: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   padding: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   paddingTop: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   paddingBottom: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   paddingLeft: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   paddingRight: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   paddingY: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//   ]),
//   paddingX: PropTypes.oneOf([
//     PropTypes.number,
//     'auto',
//     'initial',
//     ]),
//   ]),
  hideDown: PropTypes.oneOf(THEME_BREAKPOINTS_TYPES),
  hideUp: PropTypes.oneOf(THEME_BREAKPOINTS_TYPES),
  /**
   * @default element
   */
  element: PropTypes.elementType,
  className: PropTypes.string,
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
