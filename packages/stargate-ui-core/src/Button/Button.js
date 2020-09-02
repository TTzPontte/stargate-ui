import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Typography from '../Typography';

const styles = (theme) => {
  const {
    spacing,
    palette,
    radius,
  } = theme;

  const button = {
    display: 'inline-flex',
    padding: [spacing(), spacing(2)],
    border: [[1, 'solid', 'transparent']],
    borderRadius: radius(10),
    cursor: 'pointer',
    outline: 'none',
  };

  const buttonCommon = {
    color: palette.lighter,
  };

  const buttonColors = {
    primary: {
      ...buttonCommon,
      backgroundColor: palette.primary[0],
      borderColor: palette.primary[0],
    },
    secondary: {
      ...buttonCommon,
      color: palette.text[0],
      backgroundColor: palette.secondary[0],
      borderColor: palette.secondary[0],
    },
  };

  return {
    button,
    ...buttonColors,
  };
};

const Button = (props) => {
  const {
    children,
    color = '',
    variant = 'contained',
    ...factoryProps
  } = props;

  const classes = useStyles(styles);
  const className = clsx(classes.button, classes[color]);

  return (
    <Factory type="button" className={className} {...factoryProps}>
      <Typography type="span">
        {children}
      </Typography>
    </Factory>
  );
};

export default Button;
