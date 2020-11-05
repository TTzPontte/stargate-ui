import React from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '@pontte/stargate-ui-styles';
import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    radius,
    spacing,
  } = theme;

  const dropdown = {
    minWidth: 'fit-content',
    color: palette.darkest,
    borderColor: palette.default.lighter.color,
    borderRadius: radius(),
    padding: [spacing(1), spacing(3), spacing(1), spacing(1)],
    '-webkit-appearance': 'none',
    '-moz-appearance': 'none',
  };

  const dropdownArrow = {
    position: 'absolute',
    top: '0',
    right: '8px',
    pointerEvents: 'none',
    '&:after': {
      pointerEvents: 'none',
      display: 'inline-block',
      content: '""',
      color: 'black',
      padding: '3px',
      border: ['solid', palette.darkest],
      borderWidth: [0, '2px', '2px', 0],
      transform: 'rotate(45deg)',
      borderRadius: radius(.5),
    },
  }

  const dropdownWrapper = {
    position: 'relative',
  }

  return {
    dropdown,
    dropdownArrow,
    dropdownWrapper,
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

  const [{
    dropdown: classDropdown,
    dropdownArrow: classDropdownArrow,
    dropdownWrapper: classDropdownWrapper,
  }] = useStyles(styles);

  return (
    <Factory element="span" className={classDropdownWrapper}>
      <Factory
        {...factoryProps}
        disabled={disabled}
        element="select"
        className={classDropdown}
        onChange={handleChange}
        value={value}
        aria-label="Dropdown"
      >
        <Factory element="option" value="">{placeholder}</Factory>
        {options.map((option) =>
          <Factory element="option" value={option.value} key={option.label}>
            {option.label}
          </Factory>
        )}
      </Factory>
      <Factory className={classDropdownArrow}/>
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
