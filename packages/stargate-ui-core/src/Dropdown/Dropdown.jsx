import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';

import { useStyles } from '@pontte/stargate-ui-styles';
import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    radius,
    spacing,
  } = theme;

  const dropdown = {
    width: '100%',
    minWidth: 'fit-content',
    maxWidth: 'fit-content',
    lineHeight: 1.1,
    color: palette.darkest,
    border: [1, 'solid', palette.default.lighter.color],
    borderRadius: radius(),
    padding: [spacing(1)],
    cursor: 'pointer',
    display: 'grid',
    alignItems: 'center',
    '& select': {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      backgroundColor: 'transparent',
      border: 'none',
      padding: [0, '1em', 0, 0],
      margin: [0, '8px', 0, 0],
      width: '100%',
      cursor: 'inherit',
      lineHeight: 'inherit',
      outline: 'none',
      '-webkit-appearance': 'none',
      gridArea: 'select',
    },
      '&:after': {
        pointerEvents: 'none',
        content: '""',
        color: 'black',
        width: '0.8em',
        height: '0.8em',
        border: ['solid', palette.darkest],
        borderWidth: [0, '2px', '2px', 0],
        transform: 'rotate(45deg)',
        borderRadius: radius(.5),
        gridArea: 'select',
        justifySelf: 'end',
        marginLeft: 1,
      },
  }

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
    className: inheritedClassName,
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
    inheritedClassName,
  }] = useStyles(styles);

  return (
    <Factory className={classDropdown}>
      <Factory
        {...factoryProps}
        key={uuid()}
        disabled={disabled}
        element="select"
        type="select"
        onChange={handleChange}
        value={value}
        aria-label="Dropdown"
      >
        <Factory element="option" value="">{placeholder}</Factory>
        {options.map((option) =>
          <Factory element="option" value={option.value} key={uuid()}>
            {option.label}
          </Factory>
        )}
      </Factory>
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
