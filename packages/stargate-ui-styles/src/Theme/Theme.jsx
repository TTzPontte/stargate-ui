import React from 'react';
import PropTypes from 'prop-types';
import deepmerge from 'deepmerge';
import jssPluginIsolate from 'jss-plugin-isolate';
import {
  ThemeProvider,
  JssProvider,
  jss,
} from 'react-jss';

import { stargate } from '../themes';
import * as utils from '../utils';

import ThemeContext from './ThemeContext';

jss.use(jssPluginIsolate({ isolate: 'root' }));

const Theme = (props) => {
  const {
    children,
    theme: inheritedTheme = stargate,
    prefix = 'stargate-ui',
    minify = false,
  } = props;

  const theme = deepmerge(utils, inheritedTheme);
  const context = React.useMemo(() => ({ theme }), [theme]);

  return (
    <ThemeContext.Provider value={context}>
      <JssProvider
        id={{minify}}
        classNamePrefix={`${prefix}-`}
        jss={jss}
      >
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </JssProvider>
    </ThemeContext.Provider>
  );
};

Theme.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default Theme;
