import React, { Fragment, useEffect, forwardRef } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
  const {
    spacing,
    radius,
    resets,
    mode,
    palette,
  } = theme;

  const commonButtonAction = {
    padding: spacing(1),
    borderRadius: radius(10),
  };

  const buttonAction = {
    ...commonButtonAction,
    lineHeight: 0,
    width: 42,
    height: 42,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: ({ color }) => (
      palette?.[color]?.[mode].color
    ),
    /**
     * This results in a class with specificity +1 than @const buttonAction so
     * it is necessary get props was overridden by @property resets.button.
     */
    'button&': {
      ...resets.button,
      ...commonButtonAction,
    },
  };

  return { buttonAction };
};

/**
 * @todo need to create `contained` style
 * @todo need to create `large` style
 * @todo need to create `disabled` style
 */
const ButtonAction = forwardRef((props, ref) => {
  const {
    element = 'button',
    color = 'primary',
    className: inheritedClassName,
    ...inheritedProps
  } = props;

  const [{ buttonAction: classButtonAction }] = useStyles(styles);
  const className = clsx(classButtonAction, inheritedClassName);

  return (
    <Factory
      element={element}
      {...inheritedProps}
      ref={ref}
      className={className}
    />
  );
});

export default ButtonAction;
