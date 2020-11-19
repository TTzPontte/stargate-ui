import React, { useState } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Factory from '../Factory';

const styles = (theme) => {
  const {
    palette,
    radius,
    mode,
  } = theme;
  const getColor = (color, type = 'color') => (
    palette?.[color]?.[mode][type]
  );

  const getVariant = (variant, shade) => (
    palette?.colors[variant]?.[shade]
  );

  const getTextColor = (color) => (
    color && palette[color][mode].text
  );

  const card = {
    display: 'inline-block',
    cursor: ({ clickable }) => (
      clickable && 'pointer'
    ),
    borderRadius: ({ borderRadius }) => (
      borderRadius ? radius(borderRadius) : radius(2)
    ),
    '&:not($cardSelected)': {
      backgroundColor: ({...props}) => {
        const { color, variant, shade } = props;
        if (variant) {
          return getVariant(variant, shade);
        }
        return color === 'default' ? palette.colors.grey[100] : getColor(color)
      },
      color: ({ color, variant, shade }) => {
        if (variant && variant !== 'grey' && shade >= 700) {
          return palette.colors.grey[100]
        }
        return getTextColor(color)
      },
      border: ({ borderColor, color }) => {
        const colorOfBorder = borderColor || color;
        return [
          [
            1,
            'solid',
            getColor(colorOfBorder),
          ],
        ];
      },
    },
  };

  const cardSelected = {
    backgroundColor: getColor('primary'),
    borderColor: getColor('primary'),
    color: getTextColor('primary'),
  };

  return {
    card,
    cardSelected,
  };
};

const Card = (props) => {
  const {
    selected: defaultValue = false,
    color = 'default',
    variant,
    shade = 800,
    borderColor,
    borderRadius,
    onChange = () => {},
    clickable,
    className: inheritedClassName,
    ...factoryProps
  } = props;

  const cardProps = {};

  const [{
    card,
    cardSelected,
  }] = useStyles(styles, {
    color,
    shade,
    variant,
    clickable,
    borderColor,
    borderRadius,
  });

  const [selected, setSelected] = useState(defaultValue);

  const handleClick = () => {
    setSelected(!selected);
    onChange({ selected });
  }

  if (clickable) {
    cardProps.onClick = handleClick;
  }

  const classCard = clsx(card, {
    [cardSelected]: clickable && selected,
  },
    inheritedClassName,
  );

  return (
    <Factory
      {...factoryProps}
      {...cardProps}
      className={classCard}
    />
  );
};

Card.displayName = 'Card';

Card.propTypes = {
  /**
   * Add custom borderColor style.
   * **@default** `undefined`
   */
  borderColor: PropTypes.string,
  /**
   * Add custom variant of color style.
   * **@default** `undefined`
   */
  variant: PropTypes.string,
  /**
   * Set shade of variant color style.
   * **@default** `800`
   */
  shade: PropTypes.number,
  /**
   * Add custom borderRadius to style card.
   * **@default** `undefined`
   */
  borderRadius: PropTypes.number,
  /**
   * Enable card to be clicked as a button.
   * **@default** `undefined`
   */
  clickable: PropTypes.bool,
  /**
   * Add selected style.
   * **@default** `false`
   */
  selected: PropTypes.bool,
  /**
   * Add color style to background and border.
   * **@default** `default`
   */
  color: PropTypes.oneOf([
    'default',
    'primary',
    'secondary',
    'success',
    'warning',
    'info',
    'error',
    false,
  ]),
  /**
   * Trigger when element is changed.
   * **@default** `func`
   */
  onChange: PropTypes.func,
};

export default Card;
