import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
  const { breakpoints } = theme;

  const dropdown = {
    display: 'display',
    overflow: 'hidden',
    height: ({ collapse }) => (
      collapse ? '100%' : 0
    ),
  };

  const dropdownCollapse = ({ collapseUp, collapseDown }) => {
    if (collapseUp) {
      return {
        [breakpoints.up(collapseUp)]: {
          height: 'initial',
        }
      }
    }

    if (collapseDown) {
      return {
        [breakpoints.down(collapseDown)]: {
          display: 'initial',
        }
      }
    }
  };

  return {
    dropdown,
    dropdownCollapse,
  };
};

const MenuListDropdown = React.forwardRef((props, ref) => {
  const {
    collapse,
    collapseUp,
    collapseDown,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const [
    {
      dropdown: classDropdown,
      dropdownCollapse: classDropdownCollapse,
    },
  ] = useStyles(styles, {
    collapse,
    collapseUp,
    collapseDown,
  });
  const className = clsx(
    classDropdown,
    {
      [classDropdownCollapse]: collapseUp || collapseDown,
    },
    inheritedClassName,
  )

  return (
    <Factory
      {...factoryProps}
      ref={ref}
      className={className}
    />
  );
});

MenuListDropdown.propTypes = {
  collapseUp: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
  ]),
  collapseDown: PropTypes.oneOf([
    'xs',
    'sm',
    'md',
    'lg',
    'xl',
  ]),
};

export default MenuListDropdown;
