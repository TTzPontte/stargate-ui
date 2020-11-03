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
    display: 'inline-flex',
    position: 'relative',
    width: 20,
    height: 20,
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
    color: defaultColor,
    checked: defaultChecked,
    disabled: defaultDisabled,
    readOnly: defaultReadOnly,
    ...factoryProps
  } = props;

  const inputInner = React.useRef(ref);

  const {
    name,
    onChange,
    color: checkboxGroupColor,
    value: checkboxGroupValue,
    disabled: checkboxGroupDisabled,
    readOnly: checkboxGroupReadonly,
  } = React.useContext(CheckboxGroupContext);

  const checked = value && checkboxGroupValue ? value == checkboxGroupValue : defaultChecked;
  /**
   * Local properties has priority over @func CheckboxGroupContext.
   */
  const color = defaultColor || checkboxGroupColor || 'success';
  const disabled = defaultDisabled ?? checkboxGroupDisabled;
  const readOnly = defaultReadOnly ?? checkboxGroupReadonly;

  const handleChange = (event) => {
    if (disabled || readOnly) {
      event.preventDefault();
      return;
    }
    onChange(event, [value]);
  };

  const [{ checkbox: classCheckbox, ...classes }] = useStyles(styles);
  const classCheckboxDecoration = clsx(
    classes.checkboxDecoration,
    {
      [classes.checkboxDecorationSuccess]: color === 'success',
      [classes.checkboxDecorationError]: color === 'error',
      [classes.checkboxDecorationWarning]: color === 'warning',
    },
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
          aria-label="Checkbox"
        />

        <Factory
          element="span"
          className={classCheckboxDecoration}
          marginX={1}
        />

        <Typography
          variant="body"
          element="span"
          children={label}
          gutter={0}
        />
      </Label>
    </Factory>
  );
});

Checkbox.displayName = 'Checkbox';

Checkbox.propTypes = {
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
