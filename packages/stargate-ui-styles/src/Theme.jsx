import React from 'react';
import PropTypes from 'prop-types';
import deepmerge from 'deepmerge';

import ThemeProvider from './ThemeProvider';

import { stargate } from './themes';
import * as utils from './utils';

const Theme = (props) => {
  const {
    prefix = 'stargate-ui',
    theme: inheritedTheme = stargate,
    children,
  } = props;

  const theme = deepmerge(utils, inheritedTheme);

  return (
    <ThemeProvider
      theme={theme}
      prefix={prefix}
      children={children}
    />
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default Theme;
