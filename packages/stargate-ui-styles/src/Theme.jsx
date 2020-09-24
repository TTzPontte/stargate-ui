import React from 'react';
import PropTypes from 'prop-types';

import Baseline from './Baseline';
import ThemeProvider from './ThemeProvider';

import stargate from './theme/stargate';

const Theme = ({ theme = stargate, children }) => (
  <ThemeProvider theme={theme}>
    <Baseline />
    {children}
  </ThemeProvider>
);

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default Theme;
