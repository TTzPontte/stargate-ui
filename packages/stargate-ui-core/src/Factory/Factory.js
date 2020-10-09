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
    element: inheritedElement,
    className: inheritedClassName,
    ...inheritedProps
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

  /**
   * It able to use custom component as wrapper of Factory.
   * @example
   * <Factory element={<a href="/somewhere-out-space" />} />
   */
  if (element.$$typeof) {
    return createElement(element.type, {
      ...element.props,
      ...inheritedProps,
      ref,
      className,
      children,
    });
  }

  return createElement(element, {
    ...inheritedProps,
    ref,
    className,
    children,
  });
});

Factory.displayName = 'Factory';

Factory.propTypes = {
  children: PropTypes.node,
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  marginTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  marginBottom: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  marginLeft: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  marginRight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  marginY: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  marginX: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  paddingTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  paddingBottom: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  paddingLeft: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  paddingRight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  paddingY: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  paddingX: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  hideDown: PropTypes.oneOf(THEME_BREAKPOINTS_TYPES),
  hideUp: PropTypes.oneOf(THEME_BREAKPOINTS_TYPES),
  /**
   * @default div
   */
  element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
  ]),
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
