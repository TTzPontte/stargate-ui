import React, { useState } from 'react';
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

  const radioSelected = {
    '&:after': {
      content: '""',
      display: 'inline-flex',
      cursor: 'pointer',
      width: 20,
      height: 20,
      borderRadius: radius(),
      backgroundColor: palette.lighter,
      border: ({color}) => ([[1, 'solid', getColor(color)]]),
    },
    '& ~ $radioSelected:selected': {
      backgroundColor: (props) => {
        const {
          disabled,
          readonly,
          color,
        } = props;

        return (disabled || readonly) ? setLightness(.95, getColor(color)) : getColor(color)
      },
    }
  };

  return {
    radio,
    radioSelected,
  };
};

const Radio = (props) => {
  const {
    disabled,
    readonly,
    label,
    color = 'default',
    selected: defaultValue = false,
    onChange = () => {},
    ...factoryProps
  } = props;

  const [
    {
      radio: classRadio,
      radioSelected: classRadioSelected,
      ...classes
    }
  ] = useStyles(styles, {
    disabled,
    readonly,
    color,
  });
  const className = clsx(Object.values(classes));

  const [selected, setSelected] = useState(defaultValue);

  const handleClick = ({ currentTarget: { selected } }) => {
    if (disabled) {
      return;
    }

    setSelected(selected);
    onClick({ selected });
  }

  return (
    <InputLabel>
      <Factory
        element="input"
        type="radio"
        className={classRadio}
        />
      <Factory
        element="span"
        className={classRadioSelected}
        onClick={handleClick}
        selected={selected}
        marginRight={1}
        {...factoryProps}
        >
      </Factory>
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
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  readonly: PropTypes.bool,
  type: PropTypes.string
}

export default Radio;
