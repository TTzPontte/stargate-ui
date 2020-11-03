import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroupContext from './CheckboxGroupContext';

const CheckboxGroup = (props) => {
  const {
    children,
    name,
    checkboxGroupValues,
    disabled,
    readOnly,
    color,
    onChange = () => {},
  } = props;

  const handleChange = React.useCallback(onChange, [onChange]);
  const context = React.useMemo(() => ({
    name,
    checkboxGroupValues,
    disabled,
    readOnly,
    color,
    onChange: handleChange,
  }), [
    name,
    checkboxGroupValues,
    disabled,
    readOnly,
    color,
    handleChange,
  ]);
  return (
    <CheckboxGroupContext.Provider
      value={context}
      children={children}
    />
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.propTypes = {
  /**
   * Disables button and add disabled CSS style to Checkbox's components.
   *
   * **@default** `undefined`
   */
  disabled: PropTypes.bool,
  /**
   * Add readonly CSS style to Checkbox's components.
   *
   * **@default** `undefined`
   */
  readOnly: PropTypes.bool,
  /**
   * Add component dependencies.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.instanceOf(CheckboxGroup),
  ]).isRequired,
  /**
   * Add color style to Checkbox's components.
   *
   * **@default** `success`
   */
  color: PropTypes.oneOf([
    'success',
    'warning',
    'error'
  ]),
  /**
   * Specify a name for the CheckboxGroup.
   *
   * **@default** `undefined`
   */
  name: PropTypes.string.isRequired,
  // /**
  //  * Values of the chosen Checkbox.
  //  *
  //  * @default `''`
  //  */
  // value: PropTypes.string,
    /**
   * Values of the chosen Checkbox.
   *
   * @default `[]`
   */
  checkboxGroupValues: PropTypes.array,
  /**
   * Trigger when `Checkbox` is changed.
   *
   * @param {object} event Default on change event
   * @param {array} value Values of the chosen Checkbox
   *
   * @default `() => {}`
   */
  onChange: PropTypes.func,
};

export default CheckboxGroup;
