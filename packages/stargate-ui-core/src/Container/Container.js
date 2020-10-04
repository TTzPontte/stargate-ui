import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
  const { breakpoints, spacing } = theme;

  const container = {
    width: '100%',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    paddingLeft: spacing(2),
    paddingRight: spacing(2),
    [breakpoints.up('sm')]: {
      paddingLeft: spacing(3),
      paddingRight: spacing(3),
    },
    maxWidth: ({ maxWidth }) => (
      typeof maxWidth === 'number' ? maxWidth : breakpoints.screens?.[maxWidth]
    ),
  };

  return { container };
};

const Container = (props) => {
  const {
    maxWidth = 'lg',
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const [
    {
      container: classContainer,
    },
  ] = useStyles(styles, { maxWidth });
  const className = clsx(classContainer, inheritedClassName);

  return (
    <Factory
      className={className}
      marginX="auto"
      {...factoryProps}
    />
  );
};

export default Container;
