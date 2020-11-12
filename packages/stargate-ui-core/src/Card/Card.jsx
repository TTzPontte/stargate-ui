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

  const getTextColor = (color) => (
    color && palette[color][mode].text
  );

  const card = {
    display: 'block',
    maxWidth: 'max-content',
    cursor: ({ clickable }) => (
      clickable && 'pointer'
    ),
    borderRadius: radius(2),
    '&:not($cardSelected)': {
      backgroundColor: ({ color }) => (
        color === 'default' ? palette.colors.grey[100] : getColor(color)
      ),
      color: ({ color }) => (
        getTextColor(color)
      ),
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
    borderColor,
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
    borderColor,
    clickable,
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
      paddingX={2}
      paddingY={4}
      {...factoryProps}
      {...cardProps}
      className={classCard}
    />
  );
};

Card.displayName = 'Card';

Card.propTypes = {
  /**
   * Add borderColor style.
   * @default undefined
   */
  borderColor: PropTypes.string,
  /**
   * Add clickable style.
   * @default undefined
   */
  clickable: PropTypes.bool,
  /**
   * Add selected style.
   * @default false
   */
  selected: PropTypes.bool,
  /**
   * Add color style.
   * @default default
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
   * Trigger when element is clicked.
   * @default Function
   */
  onChange: PropTypes.func,
};

/**
 * Add @property {object} defaultProps made available properties information
 * for Props in the Storybook but do not use as major define for default properties.
 */
Card.defaultProps = {
  color: 'default',
  selected: false,
  onChange: () => {},
};

export default Card;
