import React from 'react';
import PropTypes from 'prop-types';

import RadioGroupContext from './RadioGroupContext';

const RadioGroup = (props) => {
  const {
    children,
    name,
    value,
    disabled,
    readOnly,
    color,
    onChange = () => {},
  } = props;

  const handleChange = React.useCallback(onChange, [onChange]);
  const context = React.useMemo(() => ({
    name,
    value,
    disabled,
    readOnly,
    color,
    onChange: handleChange,
  }), [
    name,
    value,
    disabled,
    readOnly,
    color,
    handleChange,
  ]);

  return (
    <RadioGroupContext.Provider
      value={context}
      children={children}
    />
  );
};

RadioGroup.displayName = 'RadioGroup';

RadioGroup.propTypes = {};

export default RadioGroup;
