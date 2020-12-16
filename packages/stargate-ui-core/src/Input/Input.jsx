import React, { useRef, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import { Close as SvgIconClose } from '../icons';
import Factory from '../Factory';
import InputLabel from '../InputLabel';
import InputHelper from '../InputHelper';
import {
  zipCodeMask,
  currencyMask,
  phoneMask,
  ageMask,
  cpfMask,
  cnpjMask,
 } from './masks';

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
    breakpoints,
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
    borderRadius: radius(1.5),
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
    fontSize: 16,
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
    [breakpoints.down('md')]: {
      fontSize: 14,
    }
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

const Input = React.forwardRef((props, ref) => {
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
    name,
    errorMessage,
    mask,
    type = 'text',
    color = 'default',
    onClear = () => {},
    onChange = () => {},
    onKeyUp= () => {},
    value: defaultValue = '',
    className: inheritedClassName,
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

  const className = clsx(classInputElement, inheritedClassName);

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

  const inputRef = useRef(ref);

  const handleChange = (e) => {
    if (disabled) {
      return;
    }

    setValue(e.currentTarget.value);
    onChange(e);
  }

  const handleKeyUp = useCallback((e, mask) => {
    if (disabled) {
      return;
    }

    if (mask) {
      switch (mask) {
        case 'zipCode':
          zipCodeMask(e);
          break;
        case 'cpf':
          cpfMask(e);
          break;
        case 'phone':
          phoneMask(e);
          break;
        case 'age':
          ageMask(e);
            break;
        case 'currency':
          currencyMask(e);
          break;
        case 'cnpj':
          cnpjMask(e);
          break;
        default:
          console.log(`Sorry, we are out of ${mask}s.`);
      }
    }

  }, [disabled]);

  const handleClear = () => {
    if (disabled) {
      return;
    }

    setValue('');
    onClear();
  }

  const handleControlClick = () => {
    inputRef?.current !== null && inputRef?.current?.focus();
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
          className={className}
          type={type}
          disabled={disabled}
          readOnly={readonly}
          value={value}
          name={name}
          onChange={handleChange}
          onKeyUp={(e) => handleKeyUp(e, mask)}
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
});

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
   * @default undefined
   */
  mask: PropTypes.string,
  /**
   * @default undefined
   */
  name: PropTypes.string.isRequired,
  /**
   * @default Function
   */
  onChange: PropTypes.func,
  /**
   * @default Function
   */
  onKeyUp: PropTypes.func,
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
