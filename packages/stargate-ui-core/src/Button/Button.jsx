import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Typography from '../Typography';

const styles = (theme) => {
  /**
   * @todo improve dynamic properties
   */
  const {
    active,
    spacing,
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
      disabled ? setLightness(.8, getColor(props)) : getTextColor(props)
    ),
    backgroundColor: ({ disabled, ...props }) => (
      disabled ? setLightness(.95, getColor(props)) : getColor(props)
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
      disabled ? setLightness(.85, getColor(props)) : getColor(props)
    ),
    borderColor: ({ disabled, ...props }) => (
      disabled ? setLightness(.85, getColor(props)) : getColor(props)
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
    element = 'button',
    color = 'default',
    onClick = () => {},
    children,
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
      marginX={.5}
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
        children={children}
      />
    </Factory>
  );
};

export default Button;
