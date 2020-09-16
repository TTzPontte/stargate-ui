import PropTypes from "prop-types";
import React from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
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
    width: '100%',
    border: 0,
    borderRadius: '50%',
    backgroundColor: (props) => {
      const {
        disabled,
        readonly,
        color,
      } = props;

      return (disabled || readonly) && setLightness(.95, getColor(color));
    },
  };


  return {checkbox};
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
      <Factory
        element="input"
        type="checkbox"
        className={classCheckbox}
        disabled={disabled}
        readOnly={readonly}
        {...factoryProps}
      />
  );
};

Checkbox.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.any,
  label: PropTypes.any,
  onChange: PropTypes.func,
  readonly: PropTypes.any,
  type: PropTypes.string
}

export default Checkbox;
