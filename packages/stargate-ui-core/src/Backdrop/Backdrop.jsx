import React, {
  Fragment,
  forwardRef,
} from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

const styles = (theme) => {
  const {
    zIndex,
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
    overflow: 'hidden',
    animation: [
      [
        'show',
        '1.5s',
        'ease-out',
        '0s',
        'backwards',
      ],
    ],
  };

  return {
    ...keyframes,
    backdrop,
  };
};

const Backdrop = forwardRef((props, ref) => {
  const {
    children,
    opened = false,
    timeout = 1000,
    className: inheritedClassName,
    ...inheritedProps
  } = props;

  const [{ backdrop: classBackdrop }] = useStyles(styles);
  const className = clsx(classBackdrop, inheritedClassName);

  React.useEffect(() => {
    if (opened) {
      document.body.style.overflow = 'hidden';
    }

    return () => document.body.style.overflow = 'unset';
  }, [opened]);

  return (
    <Fragment>
      {
        opened && (
          <div
            ref={ref}
            {...inheritedProps}
            className={className}
          />
        )
      }

      {children}
    </Fragment>
  );
});

export default Backdrop;
