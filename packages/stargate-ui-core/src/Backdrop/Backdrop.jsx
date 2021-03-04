import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

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
    '& + *': {
      zIndex: zIndex.backdrop + 1,
    },
  };

  return {
    ...keyframes,
    backdrop,
  };
};

const Backdrop = React.forwardRef((props, ref) => {
  const {
    children,
    opened = false,
    onClick = () => {},
    className: inheritedClassName,
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
    <React.Fragment>
      {
        opened && (
          <div
            ref={ref}
            className={className}
            onClick={onClick}
            aria-hidden="true"
          />
        )
      }

      {children}
    </React.Fragment>
  );
});

Backdrop.displayName = 'Backdrop';

Backdrop.propTypes = {
  children: PropTypes.node.isRequired,
  /**
   * Specify when opened or not backdrop element.
   * @default false
   */
  opened: PropTypes.bool,
  /**
   * Add className for backdrop element.
   * @default undefined
   */
  className: PropTypes.string,
  /**
   * Handle onClick func.
   * @default undefined
   */
  onClick: PropTypes.func,
};

/**
 * Add @property {object} defaultProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Backdrop.defaultProps = {
  opened: false,
};

export default Backdrop;
