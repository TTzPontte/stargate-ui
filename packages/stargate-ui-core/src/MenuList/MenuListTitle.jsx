import React, { forwardRef } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';
import Typography from '../Typography';

const styles = (theme) => {
  const { resets } = theme;

  const titleButton = {
    ...resets.button,
    // cursorPOin
  };

  return {
    titleButton,
  };
};

const MenuListTitle = (props) => {
  const {
    dropdown,
    onClick = () => {},
    color = 'primary',
    variant = 'body',
    className: inheritedClassName,
    ...typographyProps
  } = props;

  const [
    {
      titleButton: classTitleButton,
    },
  ] = useStyles(styles);
  const className = clsx(
    {
      [classTitleButton]: dropdown,
    },
    inheritedClassName,
  );

  const titleProps = {
    element: 'a',
  };

  if (dropdown) {
    titleProps.element = 'button';
    titleProps.onClick = onClick;
  }

  return (
    <Typography
      marginBottom={1}
      {...typographyProps}
      {...titleProps}
      variant={variant}
      transform="uppercase"
      display="inline-flex"
      weight="bold"
      className={className}
      color={color}
    />
  );
};

MenuListTitle.propTypes = {
  dropdown: PropTypes.bool,
  /**
   * @default function
   */
  onClick: PropTypes.func,
  /**
   * @borrows MenuListTitle.propTypes.color as Typography.propTypes.color
   */
  color: Typography.propTypes.color,
  /**
   * @borrows MenuListTitle.propTypes.variant as Typography.propTypes.variant
   */
  variant: Typography.propTypes.variant,
  className: PropTypes.string,
};

export default MenuListTitle;
