import React, { Fragment, useEffect, forwardRef } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Close as SvgIconClose } from '@pontte/stargate-ui-icons';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
  const {
    spacing,
    zIndex,
    palette,
    breakpoints,
    radius,
    resets,
  } = theme;

  const keyframes = {
    '@keyframes show': {
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
    },
  };

  const backdrop = {
    zIndex: zIndex.backdrop,
    position: 'fixed',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    WebkitTapHighlightColor: 'transparent',
    opacity: 1,
  };

  const backdropVisible = {
    animation: [
      [
        'show',
        '1.5s',
        'ease-out',
        '0s',
        'forwards',
      ],
    ],
  };

  return {
    ...keyframes,
    backdrop,
    backdropVisible,
  };
};

const Backdrop = forwardRef((props, ref) => {
  const {
    open = false,
    children,
    ...inheritedProps
  } = props;

  const [
    {
      backdrop,
      backdropVisible: classBackdropVisible,
    },
  ] = useStyles(styles);
  const classBackdrop = clsx(
    backdrop,
    {
      [classBackdropVisible]: open,
    },
  );

  return (
    <Fragment>
      {
        open && (
          <div
            ref={ref}
            {...inheritedProps}
            className={classBackdrop}
          />
        )
      }
      {children}
    </Fragment>
  );
});

export default Backdrop;
