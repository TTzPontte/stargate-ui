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
    radius,
    mode,
  } = theme;
  const { setLightness } = palette;

  const getColor = ({ color }) => (
    color && palette[color][mode].color
  );

  const getTextColor = ({ color }) => (
    color && palette[color][mode].text
  );

  const button = {
    display: 'inline-flex',
    border: [[2, 'solid', 'transparent']],
    borderRadius: radius(10),
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: 'transparent',
    transition: [['all', '.4s', 'ease']],
    margin: [0, spacing(.5)],
    padding: ({ large }) => {
      const n = !large ? 1 : 1.2;

      return [[spacing(1.5 * n), spacing(6 * n)]];
    },
    pointerEvents: ({ disabled }) => (
      disabled && 'none'
    )
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
    children,
    contained,
    outlined,
    disabled,
    large,
    color = 'default',
    onClick = () => {},
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

  return (
    <Factory
      element="button"
      className={className}
      onClick={handleClick}
      {...factoryProps}
    >
      <Typography
        element="span"
        variant={typographyVariant}
        gutter={0}
        transform="uppercase"
      >
        {children}
      </Typography>
    </Factory>
  );
};

export default Button;
