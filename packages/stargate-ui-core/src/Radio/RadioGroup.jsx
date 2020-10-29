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

RadioGroup.propTypes = {
  /**
   * Disables button and add disabled CSS style to Radio's components.
   *
   * **@default** `undefined`
   */
  disabled: PropTypes.bool,
  /**
   * Add readonly CSS style to Radio's components.
   *
   * **@default** `undefined`
   */
  readOnly: PropTypes.bool,
  /**
   * Add component dependencies.
   */
  children: PropTypes.oneOfType([
    PropTypes.instanceOf(RadioGroup),
  ]).isRequired,
  /**
   * Add color style to Radio's components.
   *
   * **@default** `success`
   */
  color: PropTypes.oneOf([
    'success',
    'warning',
    'error'
  ]),
  /**
   * Specify a name for the RadioGroup.
   *
   * **@default** `undefined`
   */
  name: PropTypes.string.isRequired,
  /**
   * Value of the chosen Radio.
   *
   * **@default** `undefined`
   */
  value: PropTypes.string.isRequired,
  /**
   * Trigger when `Radio` is changed.
   *
   * @param {object} event Default on change event
   * @param {array} value Value of the chosen Radio
   *
   * @default `() => {}`
   */
  onChange: PropTypes.func,
};

export default RadioGroup;
