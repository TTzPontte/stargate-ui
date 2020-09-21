import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@pontte/stargate-ui-core';

/**
 * @todo needs to add support for custom element.
 */
const InputHelper = (props) => {
  const {
    children,
    color,
    ...factoryProps
  } = props;

  return (
    <Typography
      element="small"
      variant="small"
      display="block"
      marginBottom={1}
      color={color}
      children={children}
      {...factoryProps}
    />
  );
};

InputHelper.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.oneOf([
    'default',
    'success',
    'warning',
    'error',
  ]),
};

export default InputHelper;
