import React, { useEffect, useState } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Typography from '../Typography';

const styles = (theme) => {
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
    padding: [spacing(1.5), spacing(3)],
    border: [[2, 'solid', 'transparent']],
    borderRadius: radius(10),
    cursor: 'pointer',
    outline: 'none',
    backgroundColor: 'transparent',
    color: getColor,
    transition: [['all', '.4s', 'ease']],
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
      disabled ? setLightness(.6, getColor(props)) : getTextColor(props)
    ),
    backgroundColor: ({ disabled, ...props }) => (
      disabled ? setLightness(.96, getColor(props)) : getColor(props)
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
      disabled ? setLightness(.6, getColor(props)) : getColor(props)
    ),
    borderColor: ({ disabled, ...props }) => (
      disabled ? setLightness(.5, getColor(props)) : getColor(props)
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

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    contained,
    outlined,
    disabled,
    color = 'default',
    className: inheritClassName,
    ...factoryProps
  } = props;

  const [
    {
      buttonText: classButtonText,
      buttonContained: classButtonContained,
      buttonOutlined: classButtonOutlined,
      ...classes
    },
  ] = useStyles(styles, { color, disabled });

  const className = clsx(
    Object.values(classes),
    {
      [classButtonText]: !contained && !outlined,
      [classButtonContained]: contained,
      [classButtonOutlined]: outlined,
    },
    inheritClassName,
  );

  return (
    <Factory type="button" className={className} {...factoryProps}>
      <Typography type="span" variant="small" transform="uppercase">
        {children}
      </Typography>
    </Factory>
  );
});

export default Button;
