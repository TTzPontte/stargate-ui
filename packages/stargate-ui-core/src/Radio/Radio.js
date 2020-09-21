import React, { useRef, useState } from 'react';
import PropTypes from "prop-types";
import { useStyles } from '@pontte/stargate-ui-styles';
import { InputLabel } from '@pontte/stargate-ui-core';
import clsx from 'clsx';

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

  const radio = {
    position: 'absolute',
    width: 0,
    height: 0,
    userSelect: 'none',
    opacity: 0,
  };

  const radioChecked = {
    cursor: 'pointer',
    '&:before': {
      content: '""',
      display: 'inline-flex',
      width: 20,
      height: 20,
      borderRadius: radius(3),
      backgroundColor: palette.lighter,
      border: ({color}) => (
        [[1, 'solid', getColor(color)]]
      ),
    },
    '&:after': {
      content: '""',
      display: 'inline-flex',
      '$radio:checked ~ &': {
        bottom: 6,
        right: 18,
        width: 8,
        height: 8,
        position: 'relative',
        borderRadius: radius(2),
        border: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;
          return (disabled || readonly) ? [['solid', setLightness(.95, getColor(color))]] : [['solid', (color !== 'default' ? getColor(color) : getColor('success'))]]
        },
        backgroundColor: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;

          return (disabled || readonly) ? setLightness(.95, getColor(color)) : (color !== 'default' ? getColor(color) : getColor('success'))
        },
      },
    },
  };

  return {
    radio,
    radioChecked,
  };
};

const Radio = (props) => {
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
      radio: classRadio,
      radioChecked: classRadioChecked,
      ...classes
    }
  ] = useStyles(styles, {
    disabled,
    readonly,
    color,
  });
  const className = clsx(Object.values(classes));

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
        type="radio"
        className={classRadio}
        checked={checked}
      />

      <Factory
        element="span"
        className={classRadioChecked}
        onClick={handleClick}
        marginX={1}
        {...factoryProps}
      />

      {label}
    </InputLabel>
  );
};

Radio.propTypes = {
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

export default Radio;
