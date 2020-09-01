import React from 'react';
import PropTypes from 'prop-types';

import Swatch from './Swatch';

const Palette = ({ name, colors }) => (
  Object.keys(colors).map((shade, i) => colors[shade] && (
    <Swatch
      key={i}
      name={name}
      shade={shade}
      color={colors[shade]}
    />
  ))
);

Palette.propTypes = {
  name: PropTypes.string.isRequired,
  colors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Palette;
