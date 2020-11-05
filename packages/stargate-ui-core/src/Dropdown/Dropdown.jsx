import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useStyles } from '@pontte/stargate-ui-styles';
import Label from '../Label';
import Factory from '../Factory';
import Typography from '../Typography';

const styles = (theme) => {
  const {
    palette,
    radius,
    mode,
  } = theme;

  const dropdown = {
      color: 'black',
      width: '50%'
  };

  return {
    dropdown,
  };
};

const Dropdown = (props) => {
  const {
    options,
    placeholder = 'Selecione',
    disabled,
    value: defaultValue = '',
    onChange = () => {},
    ...factoryProps
  } = props;

  const [value, setValue] = React.useState(defaultValue);

  const handleChange = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }
    setValue(event.currentTarget.value);
    onChange(event);
  };

  console.log(value)
  const [{ dropdown: classDropdown }] = useStyles(styles);

  return (
      <Factory
        {...factoryProps}
        disabled={disabled}
        element="select"
        className={classDropdown}
        onChange={handleChange}
        value={value}
        aria-label="Dropdown"
      >
        <Factory element="option">{placeholder}</Factory>
        {options.map((option) =>
          <Factory element="option" value={option.value} key={option.label}>
            {option.label}
          </Factory>
        )}
      </Factory>
  );
};

Dropdown.displayName = 'Dropdown';

Dropdown.propTypes = {
  /**
   * Disables button and add disabled CSS style.
   *
   * **@default** `undefined`
   */
  disabled: PropTypes.bool,
  /**
   * Value of chosen option.
   *
   * **@default** `''`
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  /**
   * Options to select with key: label and value.
   *
   * **@default** `undefined`
   */
  options: PropTypes.array.isRequired,
  /**
   * Placeholder to Dropdown.
   *
   * **@default** `'Selecione'`
   */
  placeholder: PropTypes.string,
  /**
   * Trigger when element is changed.
   * @default Function
   */
  onChange: PropTypes.func,
};

export default Dropdown;
