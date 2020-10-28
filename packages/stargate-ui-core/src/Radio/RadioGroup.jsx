import React from 'react';

import RadioGroupContext from './RadioGroupContext';

const RadioGroup = (props) => {
  const {
    children,
    name,
    value,
    disabled,
    onChange,
  } = props;

  const handleChange = React.useCallback(onChange, [onChange]);
  const context = React.useMemo(() => ({
    name,
    value,
    disabled,
    onChange: handleChange,
  }), [
    value,
    disabled,
    handleChange,
  ]);
  return (
    <RadioGroupContext.Provider
      value={context}
      children={children}
    />
  );
};

export default RadioGroup;
