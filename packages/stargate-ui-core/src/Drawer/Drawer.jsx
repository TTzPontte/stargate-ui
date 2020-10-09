import React, { useEffect, forwardRef } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';
import Backdrop from '../Backdrop';

const styles = (theme) => {
  const {
    spacing,
    zIndex,
    palette,
    breakpoints,
    radius,
  } = theme;

  const drawer = {
    display: 'flex',
    flexFlow: [['column', 'wrap']],
    zIndex: zIndex.drawer,
    background: palette.lighter,
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100vh',
    transform: 'translateX(100%)',
    transition: [
      'transform',
      '.8s',
      'cubic-bezier(0.77, 0, 0.18, 1)',
    ],
    borderRadius: [
      radius(6),
      0,
      0,
      radius(6),
    ],
    boxShadow: [
      0,
      0,
      10,
      `rgba(0, 0, 0, .1)`,
    ],
    maxWidth: ({ maxWidth }) => (
      ['number', 'string'].includes(typeof maxWidth) ? maxWidth : breakpoints.screens?.[maxWidth]
    ),
    ...Object.keys(breakpoints.screens).reduce((acc, screen) => {
      const gutter = breakpoints.gutters[screen];

      return {
        ...acc,
        [breakpoints.up(screen)]: {
          width: `calc(100vw - ${spacing(gutter)}px)`,
        },
      };
    }, {}),
  };

  const drawerOpened = {
    transform: 'translateX(0)',
    overflow: 'hidden',
  };

  return { drawer, drawerOpened };
};

const Drawer = forwardRef((props, ref) => {
  const {
    children,
    maxWidth = 'xs',
    opened = false,
    close = () => {},
    onOpen = () => {},
    onClose = () => {},
    className: inheritedClassName,
    ...inheritedProps
  } = props;

  const [
    {
      drawer: classDrawer,
      drawerOpened: classDrawerOpened,
    },
  ] = useStyles(styles, { maxWidth });

  const className = clsx(
    classDrawer,
    {
      [classDrawerOpened]: opened,
    },
    inheritedClassName,
  );

  const handleOpen = () => {
    onOpen();
  };

  const handleClose = () => {
    onClose();
  };

  useEffect(() => {
    if (opened) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [opened]);

  return (
    <Backdrop
      opened={opened}
    >
      <Factory
        ref={ref}
        className={className}
        {...inheritedProps}
      >
        {children}
      </Factory>
    </Backdrop>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
