import React from 'react';
import PropTypes from "prop-types";
import clsx from 'clsx';

import { useStyles } from '@pontte/stargate-ui-styles';
import Label from '../Label';
import Typography from '../Typography';
import Factory from '../Factory';
import CheckboxGroupContext from './CheckboxGroupContext';

const styles = (theme) => {
  const {
    palette,
    radius,
    mode,
  } = theme;

  const { setLightness } = palette;

  const checkbox = {
    position: 'absolute',
    width: 0,
    height: 0,
    userSelect: 'none',
    opacity: 0,
  };

  const checkboxDecoration = {
    cursor: 'pointer',
    content: '""',
    display: 'inline-block',
    position: 'relative',
    minWidth: 20,
    minHeight: 20,
    borderRadius: radius(),
    backgroundColor: palette.lighter,
    margin: 0,
    overflow: 'hidden',
    border: [
      1,
      'solid',
      palette.default[mode].color,
    ],
    '$checkbox:checked': {
      background: palette.default[mode].color,
    },
    '$checkbox:checked:disabled ~ &:after, $checkbox:checked[readonly] ~ &:after': {
      borderBottomColor: palette.default[mode].color,
      borderRightColor: palette.default[mode].color,
    },
    '$checkbox:disabled ~ &, $checkbox[readonly] ~ &': {
      background: setLightness(.95, palette.default[mode].color),
    },
    '$checkbox:checked:disabled ~ &, $checkbox:checked[readonly] ~ &': {
      borderColor: palette.default[mode].color,
      background: setLightness(.95, palette.default[mode].color),
    },
    '&:after': {
      content: '""',
      display: 'inline-block',
      '$checkbox:checked ~ &': {
        top: '45%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        width: '32%',
        height: '56%',
        position: 'absolute',
        borderBottom: [2, 'solid', palette.lighter],
        borderRight: [2, 'solid', palette.lighter],
        borderTopLeftRadius: '2px',
        borderTopRightRadius: '2px',
        borderBottomLeftRadius: '2px',
        borderBottomRightRadius: '1px',
      },
    },
  };

  const checkboxDecorationSuccess = {
    '$checkbox:checked ~ &': {
      background: palette.success[mode].color,
      borderColor: palette.success[mode].color,
    },
  };

  const checkboxDecorationWarning = {
    '$checkbox:checked ~ &': {
      background: palette.warning[mode].color,
      borderColor: palette.warning[mode].color,
    },
  };

  const checkboxDecorationError = {
    '$checkbox:checked ~ &': {
      background: palette.error[mode].color,
      borderColor: palette.error[mode].color,
    },
  };

  return {
    checkbox,
    checkboxDecoration,
    checkboxDecorationSuccess,
    checkboxDecorationWarning,
    checkboxDecorationError,
  };
};

const Checkbox = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    color: inheritedColor,
    checked: inheritedChecked,
    disabled: inheritedDisabled,
    readOnly: inheritedReadOnly,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const inputInner = React.useRef(ref);

  const {
    name,
    onChange,
    value: checkboxGroupValue,
    color: checkboxGroupColor,
    disabled: checkboxGroupDisabled,
    readOnly: checkboxGroupReadonly,
  } = React.useContext(CheckboxGroupContext);

  /**
   * Inherited properties has priority over @func CheckboxGroupContext
   */
  const color = inheritedColor || checkboxGroupColor || 'success';
  const disabled = inheritedDisabled ?? checkboxGroupDisabled;
  const readOnly = inheritedReadOnly ?? checkboxGroupReadonly;
  const checked = value && checkboxGroupValue?.length ? checkboxGroupValue.includes(value) : inheritedChecked;

  const handleChange = (event) => {
    if (disabled || readOnly) {
      event.preventDefault();
      return;
    }

    if (onChange) {
      onChange(event, [value]);
    }
  };

  const [{ checkbox: classCheckbox, ...classes }] = useStyles(styles);
  const classCheckboxDecoration = clsx(
    classes.checkboxDecoration,
    {
      [classes.checkboxDecorationSuccess]: color === 'success',
      [classes.checkboxDecorationError]: color === 'error',
      [classes.checkboxDecorationWarning]: color === 'warning',
    },
    inheritedClassName,
  );

  return (
    <Factory display="flex">
      <Label>
        <Factory
          {...factoryProps}
          disabled={disabled}
          readOnly={readOnly}
          checked={checked}
          ref={inputInner}
          element="input"
          type="checkbox"
          className={classCheckbox}
          onChange={handleChange}
          value={value}
          name={name}
        />

        <Factory
          element="span"
          className={classCheckboxDecoration}
          marginX={1}
        />

        <Typography
          variant="body"
          element="span"
          gutter={0}
        >
          {label}
        </Typography>
      </Label>
    </Factory>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
  /**
   * Add input value.
   *
   * **@default** `undefined`
   */
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  /**
   * Disables button and add disabled CSS style.
   *
   * **@default** `undefined`
   */
  disabled: PropTypes.bool,
  /**
   * Add readonly CSS style.
   *
   * **@default** `undefined`
   */
  readonly: PropTypes.bool,
  /**
   * Add a label description for each radio.
   *
   * **@default** `undefined`
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]).isRequired,
  /**
   * Add color style.
   *
   * **@default** `success`
   */
  color: PropTypes.oneOf([
    'success',
    'warning',
    'error'
  ]),
};

export default Checkbox;
