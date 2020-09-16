import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import { InputLabel } from '@pontte/stargate-ui-core';
import clsx from 'clsx';

import Factory from '../Factory';

/**
 * @todo check color pattern for input element
 */
const styles = (theme) => {
  const {
    palette,
    radius,
    spacing,
    border,
    active,
    mode,
  } = theme;
  const { setLightness } = palette;

  const getColor = (color) => (
    palette?.[color][mode].color
  );

  /**
   * @todo update `color` for `text` when colors shades be completed
   */
  const getColorText = (color) => (
    palette?.[color][mode].color
  );

  const input = {
    textOverflow: 'ellipsis',
    width: '100%',
    border: 0,
    '&::placeholder': {
      color: ({ color }) => (
        setLightness(.8, getColorText(color))
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
    overflow: 'hidden',
    borderRadius: radius(),
    padding: [spacing()],
    display: 'inline-flex',
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

  return {
    input,
    inputGroup,
  };
};

const Input = (props) => {
  const {
    disabled,
    readonly,
    label,
    componentAtStart,
    componentAtEnd,
    type = 'text',
    color = 'default',
    onChange = () => {},
    ...factoryProps
  } = props;

  const [
    {
      inputGroup: classInputGroup,
      ...classes
    }
  ] = useStyles(styles, {
    disabled,
    readonly,
    color,
    componentAtEnd,
  });
  const className = clsx(Object.values(classes));

  return (
    <div>
      <InputLabel children={label} />

      <div className={classInputGroup}>
        {componentAtStart}

        <Factory
          element="input"
          type={type}
          className={className}
          disabled={disabled}
          readOnly={readonly}
          {...factoryProps}
        />

        {componentAtEnd}
      </div>
    </div>
  );
};

Input.propTypes = {
  /**
   * @default text
   */
  type: PropTypes.oneOf([
    'text',
    'hidden',
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
   * @borrows Input.propTypes.label as Label.propTypes.children
   */
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
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
