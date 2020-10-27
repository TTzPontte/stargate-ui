import React, { Fragment, useRef, useState } from 'react';
import PropTypes from "prop-types";
import { useStyles } from '@pontte/stargate-ui-styles';
import { InputLabel } from '@pontte/stargate-ui-core';

import { useStyles } from '@pontte/stargate-ui-styles';
import {
  InputLabel,
  Typography,
  Check as SvgIconCheck,
} from '@pontte/stargate-ui-core';
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
      border: (props) => {
        const {
          disabled,
          readonly,
          color,
        } = props;

        if (disabled || readonly) {
          return [[1, 'solid', setLightness(.75, getColor(color))]];
        }

        return [[1, 'solid', (color !== 'default' ? getColor(color) : getColor('success'))]];
      },
      '$checkbox:checked ~ &': {
        backgroundColor: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;

          if (disabled || readonly) {
            return setLightness(.95, getColor(color));
          }

          return color !== 'default' ? getColor(color) : getColor('success');
        },
      },
    },
    '&:after': {
      content: '""',
      display: 'inline-flex',
      '$checkbox:checked ~ &': {
        top: -6,
        left: -14,
        width: 8,
        height: 8,
        position: 'relative',
        backgroundImage: `url(${SvgIconCheck})`,
        border: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;

          if (disabled || readonly) {
            return [[1, 'solid', setLightness(.75, getColor(color))]];
          }

          return [[1, 'solid', 'white']];
        },
      },
    },
    '& ~ $checkboxMark:checked': {
      backgroundColor: (props) => {
        const {
          disabled,
          readonly,
          color,
        } = props;

        return (disabled || readonly) ? setLightness(.95, getColor(color)) : getColor(color)
      },
    },
    '&:after': {
      content: '""',
      display: 'inline-flex',
      '$checkbox:checked ~ &': {},
    },
  };

  const checkboxWrapper = {
    width: 'fit-content',
    display: 'flex',
  }

  return {
    checkbox,
    checkboxMark,
    checkboxWrapper
  };
};

const Checkbox = (props) => {
  const {
    disabled,
    readonly,
    label,
    checkboxLabel,
    color = 'default',
    checked: defaultValue = false,
    onClick = () => {},
    ...factoryProps
  } = props;

  let showLabel = false;

  if (label) {
    showLabel = true;
  }

  const [
    {
      checkbox: classCheckbox,
      checkboxMark: classCheckboxMark,
      checkboxWrapper: classCheckboxWrapper,
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
    onClick({ checked });
  }

  return (
    <Fragment>
      {showLabel && (
        <InputLabel children={label} />
      )}
      <Factory className={classCheckboxWrapper}>
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
            marginX={1}
            {...factoryProps}
          />

          <Typography
            variant="body"
            element="span"
            children={checkboxLabel}
          />
        </InputLabel>
      </Factory>
    </Fragment>
  );
};

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /**
   * Disables button and add disabled CSS style (color default).
   * @default undefined
   */
  disabled: PropTypes.bool,
  /**
   * Add readonly CSS style (color default).
   * @default undefined
   */
  readonly: PropTypes.bool,
  /**
   * Add checked state and CSS style.
   * @default false
   */
  checked: PropTypes.bool,
  /**
   * Add component label.
   * @default undefined
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * Add label description for checkbox.
   * @default undefined
   */
  checkboxLabel: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * Add color style.
   * @default default
   */
  color: PropTypes.oneOf([
    'default',
    'success',
    'warning',
    'info',
    'error'
  ]),
  /**
   * Trigger when element is clicked.
   * @default Function
   */
  onClick: PropTypes.func,
};

/**
 * Add @property {object} factoryProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Checkbox.defaultProps = {
  color: 'default',
  checked: false,
  onClick: () => {},
};

export default Checkbox;
