import React from 'react';
import PropTypes from 'prop-types';

import Normalize from './Normalize';
import ThemeProvider from './ThemeProvider';

import stargate from './theme/stargate';

const Theme = ({ theme = stargate, children }) => (
  <Normalize>
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  </Normalize>
);

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object.isRequired,
};

export default Theme;
