import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { ClapSpinner } from 'react-spinners-kit';

import Factory from '../Factory';
import Typography from '../Typography';

const styles = (theme) => {
  /**
   * @todo improve dynamic properties
   */
  const {
    active,
    palette,
    border,
    radius,
    mode,
    resets,
  } = theme;
  const { setLightness } = palette;

  const getColor = ({ color }) => (
    color && palette[color][mode].color
  );

  const getTextColor = ({ color }) => (
    color && palette[color][mode].text
  );

  const button = {
    ...resets.button,
    display: 'inline-flex',
    border: [[...border, 'transparent']],
    borderRadius: radius(10),
    cursor: 'pointer',
    transition: [['all', '.4s', 'ease']],
    textDecoration: 'none',
    marginLeft: 0,
    marginRight: 0,
    width: ({ full }) => (
      full && '100%'
    ),
    pointerEvents: ({ disabled }) => (
      disabled && 'none'
    ),
    '& > *': {
      flexBasis: 'auto',
      flexGrow: 1,
      maxWidth: 'auto'
    },
  };

  const buttonText = {
    [active()]: {
      backgroundColor: ({ disabled, ...props }) => (
        !disabled && setLightness(.94, getColor(props))
      ),
      borderColor: ({ disabled, ...props }) => (
        !disabled && setLightness(.96, getColor(props))
      ),
    },
  };

  const buttonContained = {
    color: ({ disabled, ...props }) => (
      disabled ? palette.colors.grey[900] : getTextColor(props)
    ),
    backgroundColor: ({ disabled, ...props }) => (
      disabled ? palette.colors.grey[800] : getColor(props)
    ),
    [active()]: {
      color: ({ disabled, ...props }) => (
        !disabled && getColor(props)
      ),
      backgroundColor: ({ disabled }) => (
        !disabled && 'transparent'
      ),
      borderColor: ({ disabled, ...props }) => (
        !disabled && getColor(props)
      ),
    },
  };

  const buttonOutlined = {
    borderColor: getColor,
    color: ({ disabled, ...props }) => (
      disabled ? palette.colors.grey[900] : getColor(props)
    ),
    borderColor: ({ disabled, ...props }) => (
      disabled ? palette.colors.grey[800] : getColor(props)
    ),
    [active()]: {
      color: ({ disabled, ...props }) => (
        disabled ? setLightness(.6, getColor(props)) : getTextColor(props)
      ),
      backgroundColor: ({ disabled, ...props }) => (
        !disabled && getColor(props)
      ),
      borderColor: ({ disabled, ...props }) => (
        !disabled && getColor(props)
      ),
    },
  };

  return {
    button,
    buttonText,
    buttonContained,
    buttonOutlined,
  };
};

const Button = (props) => {
  const {
    contained,
    outlined,
    disabled,
    large,
    full,
    children,
    element = 'button',
    color = 'default',
    onClick = () => {},
    loading = false,
    className: inheritedClasses,
    ...factoryProps
  } = props;

  const [
    {
      buttonText: classButtonText,
      buttonContained: classButtonContained,
      buttonOutlined: classButtonOutlined,
      ...classes
    },
  ] = useStyles(styles, {
    color,
    disabled,
    large,
    full,
  });
  const className = clsx(
    Object.values(classes),
    {
      [classButtonText]: !contained && !outlined,
      [classButtonContained]: contained,
      [classButtonOutlined]: outlined,
    },
    inheritedClasses,
  );

  const typographyVariant = large ? 'body' : 'bodylower';

  const handleClick = ({ event }) => {
    if (disabled) {
      event.stopPropagation();
      return;
    }

    onClick();
  }

  const n = !large ? 1 : 1.2;
  const paddingY = (1.5 * n);
  const paddingX = (6 * n);

  return (
    <Factory
      paddingX={paddingX}
      paddingY={paddingY}
      {...factoryProps}
      element={element}
      className={className}
      onClick={handleClick}
    >
      <Typography
        element="span"
        variant={typographyVariant}
        gutter={0}
        transform="uppercase"
        children={
          (loading ? <ClapSpinner size={16} frontColor="#FFFFFF" backColor="#5C3B6B"/> : children)
        }
      />
    </Factory>
  );
};

Button.displayName = 'Button';

Button.propTypes = {
  /**
   * Add contained style.
   * @default undefined
   */
  contained: PropTypes.bool,
  /**
   * Add outlined style.
   * @default undefined
   */
  outlined: PropTypes.bool,
  /**
   * Add disable state.
   * @default undefined
   */
  disabled: PropTypes.bool,
  /**
   * Add large size.
   * @default undefined
   */
  large: PropTypes.bool,
  /**
   * Add full style.
   * @default undefined
   */
  full: PropTypes.bool,
  /**
   * Add DOM element. Can be a React component or HTML element.
   * @borrows Factory.propTypes.element as Button.propTypes.element
   * @default button
   */
  element: Factory.propTypes.element,
  /**
   * Add color style.
   * @default default
   */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
  ]),
  /**
   * Trigger when element is clicked.
   * @default Function
   */
  onClick: PropTypes.func,
  /**
   * Add node children.
   * @default Function
   */
  children: Typography.propTypes.children,
  /**
   * Add CSS class name.
   * @default undefined
   */
  className: PropTypes.string,
   /**
   * Add icon loading.
   * @default false
   */
  loading: PropTypes.bool,
};

/**
 * Add @property {object} factoryProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Button.defaultProps = {
  color: 'default',
  onClick: () => {},
  element: 'button',
  loading: false,
};

export default Button;
