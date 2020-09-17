import PropTypes from "prop-types";
import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import { InputLabel } from '@pontte/stargate-ui-core';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    radius,
    spacing,
    border,
    active,
    mode,
  } = theme;

  const getColor = (color) => (
    palette?.[color][mode].color
  );

  const checkbox = {
    position: 'absolute',
    width: 0,
    height: 0,
    userSelect: 'none',
    opacity: 0,
    '&:checked ~ $checkboxMark:after': {
      borderColor: 'blue',
    }
    // width: '100%',
    // border: 0,
    // borderRadius: '50%',
    // backgroundColor: (props) => {
    //   const {
    //     disabled,
    //     readonly,
    //     color,
    //   } = props;

    //   return (disabled || readonly) && setLightness(.95, getColor(color));
    // },
  };

  const checkboxMark = {
    '&:after': {
      content: '""',
      display: 'inline-flex',
      width: 30,
      height: 30,
      border: [[1, 'solid', 'red']]
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
  const className = clsx(Object.values(classes));
  console.log(classCheckbox)

  return (
    <InputLabel>
      <Factory
        element="input"
        type="checkbox"
        className={classCheckbox}
        disabled={disabled}
        readOnly={readonly}
        {...factoryProps}
      />
      <Factory
        element="span"
        className={classCheckboxMark}
      >
        {label}
      </Factory>
    </InputLabel>
  );
};

Checkbox.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.any,
  label: PropTypes.any.isRequired,
  onChange: PropTypes.func,
  readonly: PropTypes.any,
  type: PropTypes.string
}

export default Checkbox;
