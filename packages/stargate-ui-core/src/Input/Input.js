import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Close as SvgIconClose } from '@pontte/stargate-ui-icons';

import Factory from '../Factory';
import InputLabel from '../InputLabel';
import InputHelper from '../InputHelper';

/**
 * @todo check color pattern for input element
 * @todo needs pattern for disabled and readonly state
 */
const styles = (theme) => {
  const {
    palette,
    radius,
    active,
    mode,
  } = theme;
  const { setLightness } = palette;

  const getColor = (color, type = 'color') => (
    palette?.[color]?.[mode][type]
  );

  const getColorLight = (n, color) => (
    setLightness(n, getColor(color))
  );

  const inlineFlexCenter = {
    display: 'inline-flex',
    alignItems: 'center',
  };

  const inputGroup = {
    ...inlineFlexCenter,
    overflow: 'hidden',
    borderRadius: radius(),
    width: '100%',
    border: [[1, 'solid']],
    background: palette.lighter,
    borderColor: ({ color }) => (
      getColor(color)
    ),
    color: ({ color }) => (
      color === 'default' ? getColor(color, 'text') : getColor(color)
    ),
  };

  const inputElement = {
    textOverflow: 'ellipsis',
    width: '100%',
    border: 0,
    backgroundColor: 'transparent',
    height: 25,
    color: 'inherit',
    '&::placeholder': {
      color: () => (
        getColorLight(.75, 'default')
      ),
    },
    [active()]: {
      /**
       * @todo find an accessible solution
       */
      outline: 'none',
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
    ...inlineFlexCenter,
    userSelect: 'none',
  };

  return {
    inputGroup,
    inputClear,
    inputOrnament,
    inputElement,
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
    helper,
    error,
    errorMessage,
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
      inputElement: classInputElement,
      inputClear: classInputClear,
      inputOrnament: classInputOrnament,
    },
] = useStyles(styles, {
    disabled,
    readonly,
    componentAtEnd,
    color: error ? 'error' : color,
  });

  let showClear = false;
  let showError = false;
  let showLabel = false;
  let showComponentAtStart = false;
  let showComponentAtEnd = false;

  if (clear) {
    showClear = true;
  }

  if (error) {
    showError = true;
    showClear = true;
  }

  if (label) {
    showLabel = true;
  }

  if (componentAtStart) {
    showComponentAtStart = true;
  }

  if (!clear && componentAtEnd) {
    showComponentAtEnd = true;
  }

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
      {showLabel && (
        <InputLabel children={label} />
      )}

      <Factory
        className={classInputGroup}
        marginBottom={gutter ?? 2}
        padding={1}
      >
        {showComponentAtStart && (
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
          className={classInputElement}
          type={type}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          onChange={handleChange}
          {...factoryProps}
        />

        {showClear && (
          <Factory
            element="button"
            className={classInputClear}
            aria-label="Clear value"
            paddingX={1}
            onClick={handleClear}
          >
            <SvgIconClose
              color={error ? 'error' : color}
            />
          </Factory>
        )}

        {showComponentAtEnd && (
          <Factory
            element="span"
            className={classInputOrnament}
            paddingLeft={1}
            children={componentAtEnd}
          />
        )}
      </Factory>

      {showError && (
        <InputHelper
          color="error"
          children={errorMessage}
        />
      )}

      {helper && <InputHelper children={helper} />}
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
  /**
   * @borrows Input.propTypes.helper as InputHelper.propTypes.children
   */
  helper: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  error: PropTypes.bool,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};

export default Input;
