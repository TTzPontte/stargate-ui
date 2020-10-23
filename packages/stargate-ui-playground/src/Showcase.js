import React from 'react';
import PropTypes from 'prop-types';
import { useStyles } from '@pontte/stargate-ui-styles';
import { Typography } from '@pontte/stargate-ui-core';

const styles = (theme) => {
  const {
    spacing,
  } = theme;

  return {
    card: {
      display: 'inline-block',
      marginRight: spacing(),
      width: 100,
      textAlign: 'center',
    },
    cardSquare: {
      width: 'inherit',
      marginBottom: spacing(),
    },
  };
};

const Showcase = ({ list }) => {
  const [classes] = useStyles(styles);

  return Object.keys(list).map((name) => (
    <div className={classes.card}>
      <div className={classes.cardSquare}>
        {React.createElement(list[name])}
      </div>

      <Typography variant="tiny">{name}</Typography>
    </div>
  ));
};

Showcase.propTypes = {
  list: PropTypes.objectOf(PropTypes.object),
};

export default Showcase;
