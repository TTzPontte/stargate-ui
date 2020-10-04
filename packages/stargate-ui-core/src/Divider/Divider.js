import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';

const styles = (theme) => {
  const { palette } = theme;

  const divider = {
    position: 'relative',
    width: ({ vertical, full }) => (
      (!vertical || full) ? '100%' : 1
    ),
    height: ({ vertical, full }) => (
      (vertical || full) ? '100%' : 1
    ),
    '&:before': {
      content: '""',
      position: 'absolute',
      background: palette.colors.grey[900],
      transform: ({ vertical, full }) => (
        !full && (!vertical ? `translateX(-50%)` : `translateY(-50%)`)
      ),
      top: ({ vertical, full }) => (
        (full || !vertical) ? 0 : '50%'
      ),
      left: ({ vertical, full }) => (
        (full || vertical) ? 0 : '50%'
      ),
      width: ({ vertical, full }) => {
        if (!vertical) {
          return full ? '100%' : '80%';
        }

        return 1;
      },
      height: ({ vertical, full }) => {
        if (vertical) {
          return full ? '100%' : '80%';
        }

        return 1;
      },
    },
  };

  return { divider };
};

const Divider = (props) => {
  const {
    vertical,
    full,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const [
    {
      divider: classDivider,
    },
  ] = useStyles(styles, { vertical, full });
  const className = clsx(classDivider, inheritedClassName);

  return (
    <Factory
      {...factoryProps}
      children={null}
      className={className}
    />
  );
};

Divider.propTypes = {
  className: PropTypes.string,
  vertical: PropTypes.bool,
  full: PropTypes.bool,
};

export default Divider;
