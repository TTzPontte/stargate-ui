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
    ),
    display: ({ display }) => (
      display
    ),
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
    display,
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
    display,
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
  /**
   * @default undefined
   */
  children: PropTypes.node,
  /**
   * Add CSS `margin` property based on spacing base theme.
   * @default undefined
   */
  margin: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-top` property based on spacing base theme.
   * @default undefined
   */
  marginTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-bottom` property based on spacing base theme.
   * @default undefined
   */
  marginBottom: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-left` property based on spacing base theme.
   * @default undefined
   */
  marginLeft: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-right` property based on spacing base theme.
   * @default undefined
   */
  marginRight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-top` and `margin-bottom` property based on spacing base theme.
   * @default undefined
   */
  marginY: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-left` and `margin-right` property based on spacing base theme.
   * @default undefined
   */
  marginX: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `padding` property based on spacing base theme.
   * @default undefined
   */
  padding: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `padding-top` property based on spacing base theme.
   * @default undefined
   */
  paddingTop: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `margin-bottom` property based on spacing base theme.
   * @default undefined
   */
  paddingBottom: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `padding-left` property based on spacing base theme.
   * @default undefined
   */
  paddingLeft: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `padding-right` property based on spacing base theme.
   * @default undefined
   */
  paddingRight: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `padding-top` and `padding-bottom` property based on spacing base theme.
   * @default undefined
   */
  paddingY: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Add CSS `padding-left` and `padding-right` property based on spacing base theme.
   * @default undefined
   */
  paddingX: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf([
      'auto',
      'initial',
    ]),
  ]),
  /**
   * Hide when screen size is down of breakpoint.
   * @default undefined
   */
  hideDown: PropTypes.oneOf(THEME_BREAKPOINTS_TYPES),
  /**
   * Hide when screen size is up of breakpoint.
   * @default undefined
   */
  hideUp: PropTypes.oneOf(THEME_BREAKPOINTS_TYPES),
  /**
   * Add DOM element. Can be a React component or HTML element.
   * @default div
   */
  element: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
  ]),
  /**
   * Add a new CSS class to `className` property.
   * @default undefined
   */
  className: PropTypes.string,
  /**
   * Add CSS `color` property.
   * @default undefined
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
  /**
   * Add CSS `text-align` property.
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
  /**
   * Add CSS `display` property.
   * @default undefined
   */
  display: PropTypes.oneOf([
    'initial',
    'inherit',
    'block',
    'inline',
    'inline-flex',
    'inline-block',
  ]),
};

/**
 * Add @property {object} factoryProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Factory.defaultProps = {
  element: 'div',
  textAlign: 'inherit',
};

export default Factory;
