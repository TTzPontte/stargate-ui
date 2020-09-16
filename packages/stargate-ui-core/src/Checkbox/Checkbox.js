import React, { useRef, useState } from 'react';
import PropTypes from "prop-types";
import { useStyles } from '@pontte/stargate-ui-styles';
import { InputLabel } from '@pontte/stargate-ui-core';

import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    radius,
    mode,
  } = theme;

  const { setLightness } = palette;
  const getColor = (color) => (
    palette?.[color][mode].color
  );

  const checkbox = {
    position: 'absolute',
    width: 0,
    height: 0,
    userSelect: 'none',
    opacity: 0,
  };

  const checkboxMark = {
    cursor: 'pointer',
    '&:before': {
      content: '""',
      display: 'inline-flex',
      width: 20,
      height: 20,
      borderRadius: radius(),
      backgroundColor: palette.lighter,
      border: ({color}) => (
        [[1, 'solid', getColor(color)]]
      ),
      '$checkbox:checked ~ &': {
        backgroundColor: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;

          return (disabled || readonly) ? setLightness(.95, getColor(color)) : getColor(color)
        },
      },
    },
    '&:after': {
      content: '""',
      display: 'inline-flex',
      '$checkbox:checked ~ &': {
        top: -8,
        left: -16,
        width: 4,
        height: 8,
        position: 'relative',
        transform: [['rotate(45deg)', 'scale(1)' ]],
        border: ({color}) => (
          [['solid', setLightness(.45, getColor(color))]]
        ),
        borderWidth: [[0, 2, 2, 0]],
        borderRadius: 0,
        transition: [['all', '0.3s', 'ease-out']],
      },
    },
  };

  return {
    checkbox,
    checkboxMark,
  };
};

const Checkbox = (props) => {
  const {
    disabled,
    readonly,
    label,
    color = 'default',
    checked: defaultValue = false,
    onChange = () => {},
    ...factoryProps
  } = props;

  const [
    {
      checkbox: classCheckbox,
      checkboxMark: classCheckboxMark,
      ...classes
    }
  ] = useStyles(styles, {
    disabled,
    readonly,
    color,
  });

  const [checked, setChecked] = useState(defaultValue);
  const inputRef = useRef();

  const handleClick = () => {
    if (disabled) {
      return;
    }

    setChecked(!checked);
    onChange({ checked });
  }

  return (
    <InputLabel>
      <Factory
        ref={inputRef}
        element="input"
        type="checkbox"
        className={classCheckbox}
        checked={checked}
      />

      <Factory
        element="span"
        className={classCheckboxMark}
        onClick={handleClick}
        marginRight={1}
        {...factoryProps}
      />

      {label}
    </InputLabel>
  );
};

Checkbox.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  type: PropTypes.string
}

export default Checkbox;
