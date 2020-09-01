import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

const styles = ({ spacing }) => {
  const base = {
    display: 'inline-flex',
    padding: [spacing(), spacing()],
    border: 0,
    borderRadius: spacing(2),
    cursor: 'pointer',
    outline: 'none',
    '&:hover': {
      opacity: .5,
    },
  };

  return {
    base,
  };
};

const Button = ({ children }) => {
  const classes = useStyles(styles);
  const className = clsx(classes.base);

  return (
    <button type="button" className={className}>
      {children}
    </button>
  );
};

export default Button;
