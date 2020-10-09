import React, { useState, useEffect, forwardRef } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Close as SvgIconClose } from '@pontte/stargate-ui-icons';
import clsx from 'clsx';

import Factory from '../Factory';
import Backdrop from '../Backdrop';
import ButtonAction from '../ButtonAction';

const styles = (theme) => {
  const {
    spacing,
    zIndex,
    palette,
    breakpoints,
    radius,
    resets,
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
      '.9s',
      'ease',
    ],
    borderRadius: [
      radius(10),
      0,
      0,
      radius(10),
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
          paddingLeft: spacing(gutter),
          paddingRight: spacing(gutter),
        },
      };
    }, {}),
  };

  const drawerOpened = {
    transform: 'translateX(0)',
  };

  const drawerClose = {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 0,
  };

  const drawerContent = {
    flexGrow: 1,
  };

  return {
    drawer,
    drawerOpened,
    drawerClose,
    drawerContent,
  };
};

// https://github.com/ctrlplusb/react-sizeme
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
      drawerClose: classDrawerClose,
      drawerContent: classDrawerContent,
    },
  ] = useStyles(styles, { maxWidth });

  const className = clsx(
    classDrawer,
    {
      [classDrawerOpened]: opened,
    },
    inheritedClassName,
  );

  const handleOpen = () => {};

  const handleClose = () => {
    close();
    onClose();
  };

  useEffect(() => {
    if (opened) {
      handleOpen();
    }
  }, [opened]);

  return (
    <Backdrop open={opened}>
      <Factory
        ref={ref}
        className={className}
        {...inheritedProps}
      >
        <Factory
          className={classDrawerClose}
          paddingY={2}
        >
          <ButtonAction onClick={handleClose}>
            <SvgIconClose />
          </ButtonAction>
        </Factory>

        <div className={classDrawerContent}>
          {children}
        </div>
      </Factory>
    </Backdrop>
  );
});

Drawer.displayName = 'Drawer';

export default Drawer;
