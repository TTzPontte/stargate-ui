import React from 'react';
import PropTypes from 'prop-types';

import CheckboxGroupContext from './CheckboxGroupContext';

const CheckboxGroup = (props) => {
  const {
    children,
    name,
    disabled,
    readOnly,
    color,
    onChange = () => {},
    value: inheritedValue = [],
  } = props;

  const [groupValues, setGroupValues] = React.useState([...inheritedValue]);

  /**
   * Return a new array from @const groupValues after add or
   * remove a value.
   * @param {string|number} value
   * @return {Array}
   */
  const updateGroupValues = (value) => {
    const valuesIndex = groupValues.indexOf(value);

    if (valuesIndex < 0) {
      return [...groupValues, value];
    }

    return groupValues.filter((arr, i) => i !== valuesIndex);
  };

  const handleChange = React.useCallback(
    /**
     * @param {Checkbox#SyntheticEvent} event
     * @param {Array} result
     * @param {string|number} result[].value
     */
    (event, [value]) => {
      const groupValuesUpdated = updateGroupValues(value);

      setGroupValues(groupValuesUpdated);
      onChange(event, [value, groupValuesUpdated]);
    },
    [onChange],
  );

  const context = React.useMemo(() => ({
    name,
    disabled,
    readOnly,
    color,
    value: groupValues,
    onChange: handleChange,
  }), [
    name,
    disabled,
    readOnly,
    color,
    groupValues,
    handleChange,
  ]);

  return (
    <CheckboxGroupContext.Provider value={context}>
      {children}
    </CheckboxGroupContext.Provider>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

CheckboxGroup.propTypes = {
  /**
   * Disables button and add disabled CSS style to Checkbox components.
   *
   * **@default** `undefined`
   */
  disabled: PropTypes.bool,
  /**
   * Add readonly CSS style to Checkbox components.
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
   * Add color style to Checkbox components.
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
  /**
   * Values of the chosen Checkbox.
   *
   * @default `[]`
   */
  value: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  ),
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
