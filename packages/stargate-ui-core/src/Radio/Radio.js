import React, { useRef, useState, Fragment } from 'react';
import PropTypes from 'prop-types';

import { useStyles } from '@pontte/stargate-ui-styles';
import InputLabel from '../InputLabel';
import Typography from '../Typography';
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
      margin: 0,
      border: ({color}) => (
        [[1, 'solid', getColor(color)]]
      ),
    },
    '&:after': {
      content: '""',
      display: 'inline-flex',
      '$radio:checked ~ &': {
        bottom: 6,
        right: 16,
        width: 12,
        height: 12,
        position: 'relative',
        borderRadius: radius(2),
        border: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;

          if (disabled || readonly) {
            return [['solid', setLightness(.95, getColor(color))]];
          }

          return [['solid', (color !== 'default' ? getColor(color) : getColor('success'))]];
        },
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
  };

  const radioWrapper = {
    width: 'fit-content',
    display: 'flex',
  }

  return {
    radio,
    radioChecked,
    radioWrapper,
  };
};

const Radio = (props) => {
  const {
    disabled,
    readonly,
    label,
    radioLabel,
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
      radio: classRadio,
      radioChecked: classRadioChecked,
      radioWrapper: classRadioWrapper,
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
      <Factory className={classRadioWrapper}>
        <InputLabel>
          <Factory
            ref={inputRef}
            element="input"
            type="radio"
            className={classRadio}
            checked={checked}
            onClick={handleClick}
            aria-label="Radio Button"
          />

          <Factory
            element="span"
            className={classRadioChecked}
            marginX={1}
            onClick={handleClick}
            {...factoryProps}
          />

          <Typography
            variant="body"
            element="span"
            children={radioLabel}
          />
        </InputLabel>
      </Factory>
    </Fragment>
  );
};

Radio.displayName = 'Radio';

Radio.propTypes = {
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
   * Add label description for radio.
   * @default undefined
   */
  radioLabel: PropTypes.oneOfType([
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
Radio.defaultProps = {
  color: 'default',
  checked: false,
  onClick: () => {},
};

export default Radio;
