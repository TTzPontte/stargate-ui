import React from 'react';
import PropTypes from 'prop-types';

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

  const checkedElements = {
    content: '""',
    display: 'inline-flex',
  };

  const radioChecked = {
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
      palette?.default[mode].color,
    ],
    '&:after': {
      ...checkedElements,
      '$radio:checked ~ &': {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '60%',
        height: '60%',
        position: 'absolute',
        borderRadius: radius(2),
        backgroundColor: (props) => {
          const {
            disabled,
            readonly,
            color,
          } = props;

          if (disabled || readonly) {
            return setLightness(.90, getColor(color));
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

const Radio = React.forwardRef((props, ref) => {
  const {
    disabled,
    readonly,
    label,
    value,
    color = 'default',
    ...factoryProps
  } = props;

  const innerRef = React.useRef(ref);

  const {
    name,
    onChange,
    value: radioGroupValue,
    disabled: radioGroupDisabled,
  } = React.useContext(RadioGroupContext);

  const handleChange = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onChange(event, [value]);
  };

  const [
    {
      radio: classRadio,
      radioChecked: classRadioChecked,
      radioWrapper: classRadioWrapper,
    }
  ] = useStyles(styles, {
    readonly,
    color,
    disabled: radioGroupDisabled ?? disabled,
  });

  const checked = value && radioGroupValue ? value === radioGroupValue : false;

  return (
    <Factory className={classRadioWrapper}>
      <Label>
        <Factory
          checked={checked}
          {...factoryProps}
          ref={innerRef}
          element="input"
          type="radio"
          className={classRadio}
          onChange={handleChange}
          value={value}
          disabled={radioGroupDisabled ?? disabled}
          name={name}
        />

        <Factory
          element="span"
          className={classRadioChecked}
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
   * Add input name.
   * @default undefined
   */
  name: PropTypes.string,
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
  label: PropTypes.oneOfType([
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
};

export default Radio;
