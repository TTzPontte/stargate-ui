import React, { useState } from 'react';
import { useStyles } from '@pontte/stargate-ui-styles';
import clsx from 'clsx';

import Factory from '../Factory';

const styles = (theme) => {
   /**
   * @todo improve dynamic properties
   */
  const {
    active,
    spacing,
    palette,
    border,
    radius,
    mode,
    resets,
  } = theme;
  const { setLightness } = palette;

  const getColor = (color, type = 'color') => (
    palette?.[color]?.[mode][type]
  );

  const getTextColor = (color) => (
    color && palette[color][mode].text
  );

  const card = {
    display: 'flex',
    maxWidth: 'max-content',
    border: ({borderColor, color}) => {
      const colorOfBorder = borderColor || color;
      return [
        [
          1,
          'solid',
          getColor(colorOfBorder),
        ],
      ]
    },
    cursor: ({ clickable }) => (
      clickable && 'pointer'
    ),
    borderRadius: radius(2),
    '&:not($cardSelected)': {
      backgroundColor: ({ color }) => (
        color === 'default' ? palette.colors.grey[100] : getColor(color)
        ),
      },
      color: ({ color }) => (
        getTextColor(color)
        ),
  };

  const cardSelected = {
    backgroundColor: 'red',
  };

  return {
    cardSelected,
    card,
  };
};

const Card = (props) => {
  const {
    selected: defaultValue = false,
    color = 'default',
    borderColor = 'default',
    onChange = () => {},
    clickable,
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

  const classCard = clsx({
    [cardSelected]: clickable && selected,
  }, card)

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

export default Card;
