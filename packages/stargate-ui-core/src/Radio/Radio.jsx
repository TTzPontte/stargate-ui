import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { useStyles } from '@pontte/stargate-ui-styles';
import Label from '../Label';
import Factory from '../Factory';
import Typography from '../Typography';
import RadioGroupContext from './RadioGroupContext';

const styles = (theme) => {
  const {
    palette,
    radius,
    mode,
  } = theme;

  const radio = {
    position: 'absolute',
    width: 0,
    height: 0,
    userSelect: 'none',
    opacity: 0,
  };

  const radioDecoration = {
    cursor: 'pointer',
    width: 20,
    height: 20,
    display: 'inline-block',
    position: 'relative',
    borderRadius: radius(3),
    background: palette.lighter,
    margin: 0,
    overflow: 'hidden',
    border: [
      1,
      'solid',
      palette.default[mode].color,
    ],
    '$radio:checked ~ &:after': {
      content: '""',
      display: 'inline-flex',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      height: '60%',
      position: 'absolute',
      borderRadius: radius(2),
    },
    '$radio:checked:disabled ~ &:after': {
      background: palette.setLightness(.90, palette.default[mode].color),
    },
  };

  const radioDecorationSuccess = {
    '$radio:checked ~ &:after': {
      background: palette.success[mode].color,
    },
  };

  const radioDecorationWarning = {
    '$radio:checked ~ &:after': {
      background: palette.warning[mode].color,
    },
  };

  const radioDecorationError = {
    '$radio:checked ~ &:after': {
      background: palette.error[mode].color,
    },
  };

  return {
    radio,
    radioDecoration,
    radioDecorationSuccess,
    radioDecorationWarning,
    radioDecorationError,
  };
};

const Radio = React.forwardRef((props, ref) => {
  const {
    label,
    value,
    color: defaultColor,
    checked: defaultChecked,
    disabled: defaultDisabled,
    readOnly: defaultReadOnly,
    ...factoryProps
  } = props;

  const innerRef = React.useRef(ref);

  const {
    name,
    onChange,
    color: radioGroupColor,
    value: radioGroupValue,
    disabled: radioGroupDisabled,
    readOnly: radioGroupReadonly,
  } = React.useContext(RadioGroupContext);

  const checked = value && radioGroupValue ? value === radioGroupValue : defaultChecked;
  /**
   * Local properties has priority over @func RadioGroupContext.
   */
  const color = defaultColor || radioGroupColor || 'success';
  const disabled = defaultDisabled ?? radioGroupDisabled;
  const readOnly = defaultReadOnly ?? radioGroupReadonly;

  const handleChange = (event) => {
    if (disabled || readOnly) {
      event.preventDefault();
      return;
    }
    onChange(event, [value]);
  };

  const [{ radio: classRadio, ...classes }] = useStyles(styles);
  const classRadioDecoration = clsx(
    classes.radioDecoration,
    {
      [classes.radioDecorationSuccess]: color === 'success',
      [classes.radioDecorationError]: color === 'error',
      [classes.radioDecorationWarning]: color === 'warning',
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
          ref={innerRef}
          element="input"
          type="radio"
          className={classRadio}
          onChange={handleChange}
          value={value}
          disabled={disabled}
          name={name}
        />

        <Factory
          element="span"
          className={classRadioDecoration}
          marginX={1}
        />

        <Typography
          element="span"
          variant="body"
          children={label}
          gutter={0}
        />
      </Label>
    </Factory>
  );
});

Radio.displayName = 'Radio';

Radio.propTypes = {
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

export default Radio;
