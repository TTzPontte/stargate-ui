import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import { InputLabel } from '@pontte/stargate-ui-core';
import { Close as SvgIconClose } from '@pontte/stargate-ui-icons';
import clsx from 'clsx';

import Factory from '../Factory';

/**
 * @todo check color pattern for input element
 */
const styles = (theme) => {
  const {
    palette,
    radius,
    border,
    active,
    mode,
  } = theme;
  const { setLightness } = palette;

  const getColor = (color) => (
    palette?.[color][mode].color
  );

  /**
   * @todo how to define private variables? __ maybe?
   */
  const inlineFlexToCenter = {
    display: 'inline-flex',
    alignItems: 'center',
  };

  const input = {
    textOverflow: 'ellipsis',
    width: '100%',
    border: 0,
    backgroundColor: 'transparent',
    height: 25,
    '&::placeholder': {
      color: () => (
        setLightness(.8, palette.default[mode].text)
      ),
    },
    [active()]: {
      /**
       * @todo find an accessible solution
       */
      outline: 'none',
    },
  };


  const inputGroup = {
    ...inlineFlexToCenter,
    overflow: 'hidden',
    borderRadius: radius(),
    width: '100%',
    border: ({ color }) => (
      [[...border, getColor(color)]]
    ),
    backgroundColor: (props) => {
      const {
        disabled,
        readonly,
        color,
      } = props;

      return (disabled || readonly) && setLightness(.95, getColor(color));
    },
  };

  const inputClear = {
    border: 0,
    lineHeight: 0,
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    [active()]: {
      /**
       * @todo find an accessible solution
       */
      outline: 'none',
      /**
       * @todo add support for transitions in ui-core
       */
      opacity: .5,
    },
  };

  const inputOrnament = {
    ...inlineFlexToCenter,
    userSelect: 'none',
  };

  return {
    input,
    inputGroup,
    inputClear,
    inputOrnament,
  };
};

const Input = (props) => {
  const {
    disabled,
    readonly,
    label,
    componentAtStart,
    componentAtEnd,
    gutter,
    clear,
    type = 'text',
    color = 'default',
    onClear = () => {},
    onChange = () => {},
    value: defaultValue = '',
    ...factoryProps
  } = props;

  const [
    {
      inputGroup: classInputGroup,
      inputClear: classInputClear,
      inputOrnament: classInputOrnament,
      ...classes
    }
] = useStyles(styles, {
    disabled,
    readonly,
    color,
    componentAtEnd,
  });
  const className = clsx(Object.values(classes));

  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef();

  const handleChange = ({ currentTarget: { value } }) => {
    if (disabled) {
      return;
    }

    setValue(value);
    onChange({ value });
  }

  /**
   * @todo create event manager
   */
  const handleClear = () => {
    if (disabled) {
      return;
    }

    setValue('');
    onClear();
  }

  const handleControlClick = () => {
    inputRef.current.focus();
  };

  return (
    <Factory onClick={handleControlClick}>
      <InputLabel children={label} />

      <Factory
        className={classInputGroup}
        marginBottom={gutter ?? 2}
        padding={1}
      >
        {componentAtStart && (
          <Factory
            element="span"
            className={classInputOrnament}
            paddingRight={1}
            children={componentAtStart}
          />
        )}

        <Factory
          ref={inputRef}
          element="input"
          type={type}
          className={className}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          onChange={handleChange}
          {...factoryProps}
        />

        {clear && (
          <Factory
            element="button"
            className={classInputClear}
            aria-label="Clear value"
            paddingX={1}
            onClick={handleClear}
          >
            <SvgIconClose color={color} />
          </Factory>
        )}

        {!clear && (componentAtEnd && (
          <Factory
            element="span"
            className={classInputOrnament}
            paddingLeft={1}
            children={componentAtEnd}
          />
        ))}
      </Factory>
    </Factory>
  );
};

Input.propTypes = {
  clear: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  onClear: PropTypes.func,
  /**
   * @default text
   */
  type: PropTypes.oneOf([
    'text',
    'number',
    'phone',
    'email',
  ]),
  disabled: PropTypes.bool,
  readonly: PropTypes.bool,
  /**
   * @default Function
   */
  onChange: PropTypes.func,
  /**
   * @default default
   */
  color: PropTypes.oneOf([
    'default',
    'success',
    'warning',
    'error',
  ]),
  /**
   * @borrows Input.propTypes.label as InputLabel.propTypes.children
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  componentAtStart: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
  componentAtEnd: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
  ]),
};

export default Input;
