import React from 'react';
import PropTypes from 'prop-types';

import Baseline from './Baseline';
import ThemeProvider from './ThemeProvider';

import { stargate } from './themes';

const Theme = (props) => {
  const {
    theme = stargate,
    prefix = 'stargate-ui',
    children,
  } = props;

  return (
    <ThemeProvider theme={theme} prefix={prefix}>
      <Baseline />
      {children}
    </ThemeProvider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default Theme;
