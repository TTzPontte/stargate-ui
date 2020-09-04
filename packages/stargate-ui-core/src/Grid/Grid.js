import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = () => {
  return {};
};

const Checkbox = (props) => {
  const { children, ...factoryProps } = props;

  const classes = useStyles(styles, {});
  const className = clsx(classes);

  return (
    <Factory type="input" className={className} {...factoryProps}>
      {children}
    </Factory>
  );
};

export default Checkbox;
