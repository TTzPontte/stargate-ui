import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

const styles = ({ layout }) => {
  const base = {
    display: 'inline-flex',
    padding: [layout.base(), layout.base(2)],
    border: 0,
    borderRadius: layout.radius(2),
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
