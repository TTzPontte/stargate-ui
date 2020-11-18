import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import clsx from 'clsx';

import { useStyles } from '@pontte/stargate-ui-styles';
import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    radius,
    spacing,
    mode,
    breakpoints,
  } = theme;

  const dropdown = {
    minWidth: 252,
    maxWidth: 'fit-content',
    lineHeight: 1.1,
    borderRadius: radius(1.5),
    padding: [spacing(1), spacing(2)],
    cursor: 'pointer',
    display: 'grid',
    alignItems: 'center',
    textAlign: 'left',
    boxShadow: [0, 7, 64, '#00000012'],
    backgroundColor: palette.colors.grey[100],
    border: [1, 'solid', palette.default[mode].color],
    '& select': {
      '-webkit-appearance': 'none',
      '-moz-appearance': 'none',
      color: palette.darkest,
      fontSize: 16,
      border: 'none',
      minWidth: 240,
      cursor: 'inherit',
      lineHeight: 'inherit',
      outline: 'none',
      '-webkit-appearance': 'none',
      gridArea: 'select',
      [breakpoints.down('md')]: {
        fontSize: 14,
      }
    },
    '&:after': {
      pointerEvents: 'none',
      content: '""',
      color: 'black',
      width: '0.8em',
      height: '0.8em',
      border: ['solid', palette.darkest],
      borderWidth: [0, 2, 2, 0],
      transform: 'rotate(45deg)',
      borderRadius: radius(.5),
      gridArea: 'select',
      justifySelf: 'end',
    },
    [breakpoints.down('md')]: {
      minWidth: 284,
    }
  }

  return {
    dropdown,
  };
};

const Dropdown = (props) => {
  const {
    options,
    placeholder,
    disabled,
    value: defaultValue = '',
    onChange = () => {},
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const firstOption = props.options[0].value;
  const [value, setValue] = placeholder ? React.useState(defaultValue) : React.useState(firstOption);

  const handleChange = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    setValue(event.currentTarget.value);
    onChange(event);
  };

  const [classes] = useStyles(styles);
  const classDropdown = clsx(classes.dropdown, inheritedClassName);

  return (
    <Factory className={classDropdown} marginY={1}>
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
        {placeholder && (
          <Factory element="option" value="">{placeholder}</Factory>
        )}
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
   * **@default** `undefined`
   */
  placeholder: PropTypes.string,
  /**
   * Trigger when element is changed.
   * @default Function
   */
  onChange: PropTypes.func,
};

export default Dropdown;
