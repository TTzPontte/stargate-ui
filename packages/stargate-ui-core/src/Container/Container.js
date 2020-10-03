import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
  const container = {
    width: '100%',
    marginLeft: 'auto',
    boxSizing: 'border-box',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
    maxWidth: ({ maxWidth }) => (
      maxWidth
    ),
  };

  return {
    container,
  };
};

const Container = (props) => {
  const {
    maxWidth = 1280,
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
