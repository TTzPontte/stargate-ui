import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Typography } from '@pontte/stargate-ui-core';

const styles = (theme) => {
  const {
    palette,
    spacing,
    radius,
  } = theme;

  const border = 1;
  const borderRadius = radius();

  return {
    card: {
      borderRadius,
      display: 'inline-block',
      marginRight: spacing(),
      width: 100,
      border: [[border, 'solid', palette.neutral[800]]],
    },
    cardSwatch: {
      width: 102,
      height: 100,
      margin: [[-border, -border, 0]],
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius,
    },
    cardInfo: {
      padding: spacing(),
    },
  };
};

const Swatch = (props) => {
  const [classes] = useStyles(styles);
  const {
    name,
    color,
    shade = null,
  } = props;

  return (
    <div className={classes.card}>
      <div className={classes.cardSwatch} style={{ backgroundColor: color }} />
      <div className={classes.cardInfo}>
        {
          shade && (
            <Typography element="span" display="block">
              {shade}
            </Typography>
          )
        }
        <Typography element="span" display="block">
          {name}
        </Typography>
      </div>
    </div>
  );
};

Swatch.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  shade: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
};

export default Swatch;
