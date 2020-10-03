import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Typography from '../Typography';

const styles = (theme) => {
  const { active, transition } = theme;

  const link = {
    textDecoration: 'none',
    color: 'inherit',
    transition: transition('opacity').ease,
    [active()]: {
      opacity: .6,
    },
  };

  return { link };
};

const Button = (props) => {
  const {
    className: inheritedClasses,
    ...typographyProps
  } = props;

  const [
    {
      link: classLink,
    },
  ] = useStyles(styles);

  return (
    <Typography
      element="a"
      variant="body"
      transform="uppercase"
      display="inline-flex"
      className={clsx(classLink, inheritedClasses)}
      {...typographyProps}
    />
  );
};

export default Button;
