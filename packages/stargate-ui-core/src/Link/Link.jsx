import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Typography from '../Typography';

const styles = (theme) => {
  const {
    active,
    resets,
    palette,
    mode,
  } = theme;

  const link = {
    textDecoration: 'none',
    color: 'inherit',
    'button&': {
      ...resets.button,
    },
  };

  const linkUnderline = {
    display: 'inline',
    borderBottom: [
      [
        1,
        'solid',
        'transparent',
      ],
    ],
    transition: [
      [
        'border-color',
        '.2s',
        'ease-in-out',
      ],
    ],
    [active()]: {
      borderColor: ({ color }) => (
        palette?.[color]?.[mode].color || 'initial'
      ),
    },
  };

  return {
    link,
    linkUnderline,
  };
};

const Link = (props) => {
  const {
    color,
    underline = true,
    className: inheritedClasses,
    ...typographyProps
  } = props;

  const [
    {
      link: classLink,
      linkUnderline: classLinkUnderline,
    },
  ] = useStyles(styles, { color });
  const className = clsx(
    classLink,
    {
      [classLinkUnderline]: underline,
    },
    inheritedClasses,
  );

  return (
    <Typography
      element="a"
      variant="body"
      transform="uppercase"
      display="inline"
      gutter={0}
      {...typographyProps}
      color={color}
      className={className}
    />
  );
};

export default Link;
