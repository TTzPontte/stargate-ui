import React from 'react';
import { ThemeProvider as JssThemeProvider, JssProvider, jss } from 'react-jss';
import PropTypes from 'prop-types';
import jssPluginIsolate from 'jss-plugin-isolate';

jss.use(jssPluginIsolate({ isolate: 'root' }));

const ThemeProvider = (props) => {
  const {
    theme,
    prefix,
    children,
  } = props;
  const minify = false;
  // const minify = process.env.NODE_ENV === 'production';

  return (
    <JssProvider
      id={{minify}}
      classNamePrefix={`${prefix}-`}
      jss={jss}
    >
      <JssThemeProvider
        theme={theme}
        children={children}
      />
    </JssProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.object,
};

export default ThemeProvider;
