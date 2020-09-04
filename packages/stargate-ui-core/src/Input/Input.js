import React from 'react';
import { useStyles } from '../Select/node_modules/@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = () => {
  return {};
};

const Input = (props) => {
  const { children, ...factoryProps } = props;

  const classes = useStyles(styles, {});
  const className = clsx(classes);

  return (
    <Factory type="input" className={className} {...factoryProps}>
      {children}
    </Factory>
  );
};

export default Input;
