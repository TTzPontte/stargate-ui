import React from 'react';
import PropTypes from 'prop-types';
import { Label } from '@pontte/stargate-ui-core';

const InputLabel = ({ children }) => {
  if (children instanceof Object) {
    return children;
  }

  return <Label children={children} />
};

InputLabel.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputLabel;
