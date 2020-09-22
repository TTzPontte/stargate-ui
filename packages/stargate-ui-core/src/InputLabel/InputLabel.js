import React from 'react';
import PropTypes from 'prop-types';
import Label from '../Label';

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
