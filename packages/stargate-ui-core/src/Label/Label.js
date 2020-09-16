import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@pontte/stargate-ui-core';

const Label = (props) => {
  const { children, ...factoryProps } = props;

  return (
    <Typography
      element="label"
      variant="body"
      children={children}
      {...factoryProps}
    />
  );
};

Label.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Label;
